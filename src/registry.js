import yaml from "js-yaml";
import { safeRelative } from "./utils.js";

export const DEFAULT_REPOSITORY = "LemonizDev/Agent-Foundry";
export const DEFAULT_REF = "main";

export async function loadRegistry({ repository = DEFAULT_REPOSITORY, ref = DEFAULT_REF, fetchText = globalThis.fetch } = {}) {
  if (!/^[A-Za-z0-9_.-]+\\/[A-Za-z0-9_.-]+$/.test(repository)) throw new Error("Repository must be specified as owner/repository.");
  const encodedRef = encodeURIComponent(ref);
  const url = "https://raw.githubusercontent.com/" + repository + "/" + encodedRef + "/registry/resources.yaml";
  const response = await fetchText(url);
  if (!response.ok) throw new Error("Could not fetch resource registry (" + response.status + "): " + url);
  const document = yaml.load(await response.text());
  if (!document || document.schema_version !== 1 || !Array.isArray(document.resources)) throw new Error("Unsupported or malformed Agent Foundry resource registry.");
  let commitSha = ref;
  if (!/^[a-f0-9]{40}$/i.test(ref)) {
    const commitResponse = await fetchText("https://api.github.com/repos/" + repository + "/commits/" + encodedRef);
    if (!commitResponse.ok) throw new Error("Could not resolve immutable Foundry source revision (" + commitResponse.status + ").");
    const commitData = await commitResponse.json();
    commitSha = commitData.sha;
  }
  if (!commitSha || !/^[a-f0-9]{40}$/i.test(commitSha)) throw new Error("GitHub did not return a valid commit SHA for the selected Foundry ref.");
  const ids = new Set();
  for (const resource of document.resources) {
    if (!resource.id || ids.has(resource.id)) throw new Error("Missing or duplicate resource id: " + resource.id);
    ids.add(resource.id);
    resource.path = safeRelative(resource.path);
    if (!resource.type || !resource.version) throw new Error("Incomplete registry entry: " + resource.id);
  }
  return { ...document, repository, ref, commit_sha: commitSha, resolved_ref: commitSha };
}

export function resolveResources(registry, ids) {
  const byId = new Map(registry.resources.map(resource => [resource.id, resource]));
  const selected = new Map();
  const visiting = new Set();
  const visit = id => {
    if (selected.has(id)) return;
    if (visiting.has(id)) throw new Error("Resource dependency cycle detected at: " + id);
    const resource = byId.get(id);
    if (!resource) throw new Error("Unknown Foundry resource: " + id);
    visiting.add(id);
    for (const dependency of resource.dependencies ?? []) visit(dependency);
    visiting.delete(id);
    selected.set(id, resource);
  };
  for (const id of ids) visit(id);
  return [...selected.values()];
}
