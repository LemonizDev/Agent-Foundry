import fs from "node:fs/promises";
import path from "node:path";
import { loadRegistry, resolveResources } from "./registry.js";
import { FOUNDARY_DIR, atomicWrite, exists, mergeInstruction, safeRelative, sha256, walk } from "./utils.js";

const DEFAULT_RESOURCES = [
  "atomic-implementation", "project-state-management", "progress-reporting",
  "evidence-and-verification", "documentation-governance", "session-learning",
  "close-session", "progress-report", "teach-implementation", "session-close",
  "foundry-settings", "edit-model-roster", "model-delegation-architecture",
  "model-roster-template", "foundry-settings-template", "lead-engineer",
  "independent-reviewer", "agent-execution-security"
];

async function fetchSource(repository, ref, resource, fetchText) {
  const url = "https://raw.githubusercontent.com/" + repository + "/" + ref + "/" + resource.path;
  const response = await fetchText(url);
  if (!response.ok) throw new Error("Failed to fetch " + resource.id + " (" + response.status + ")");
  return response.text();
}

export async function buildPlan({ root = process.cwd(), registry, resources = DEFAULT_RESOURCES, repository, ref } = {}) {
  const projectFiles = await walk(root);
  const existing = new Set(projectFiles);
  const selected = resolveResources(registry, resources);
  const planned = selected.map(resource => {
    const destination = path.posix.join(FOUNDARY_DIR, "resources", resource.path);
    const conflict = existing.has(destination) || await exists(path.join(root, destination));
    return { id: resource.id, type: resource.type, source: resource.path, destination, version: resource.version, action: conflict ? "CONFLICT_CHECK" : "ADD" };
  });
  return {
    schema_version: 1,
    foundry: { repository, ref },
    project_root: path.resolve(root),
    selected_resource_ids: selected.map(item => item.id),
    resources: planned,
    project_entrypoint: existing.has("AGENTS.md") ? "AGENTS.md (additive pointer block)" : "AGENTS.md (new)",
    settings: [".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"],
    safety: ["No existing project file will be overwritten.", "Existing AGENTS.md content is preserved.", "Conflicts stop installation and require owner resolution."]
  };
}

export async function applyPlan(plan, { root = plan.project_root, registry, fetchText = globalThis.fetch } = {}) {
  const base = path.resolve(root);
  const foundryDir = path.join(base, FOUNDARY_DIR);
  if (await exists(path.join(foundryDir, "manifest.json"))) throw new Error("Agent Foundry is already installed. Use update after reviewing local modifications.");
  const destinations = [...plan.resources.map(x => x.destination), ".agent-foundry/instructions.md", ".agent-foundry/README.md", ".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"];
  for (const rel of destinations) if (await exists(path.join(base, safeRelative(rel)))) throw new Error("Refusing to overwrite existing file: " + rel);

  const staged = [];
  for (const item of plan.resources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    if (!resource) throw new Error("Resource missing from registry: " + item.id);
    const content = await fetchSource(plan.foundry.repository, plan.foundry.ref, resource, fetchText);
    staged.push({ id: item.id, source_path: resource.path, installed_path: item.destination, version: resource.version, content, source_sha256: sha256(content), installed_sha256: sha256(content) });
  }
  const fetchTemplate = async name => {
    const url = "https://raw.githubusercontent.com/" + plan.foundry.repository + "/" + plan.foundry.ref + "/templates/settings/" + name;
    const response = await fetchText(url);
    if (!response.ok) throw new Error("Unable to fetch Foundry settings template: " + name);
    return response.text();
  };
  const settings = [
    { path: ".agent-foundry/settings/foundry-settings.yaml", content: await fetchTemplate("foundry-settings.yaml") },
    { path: ".agent-foundry/settings/model-roster.yaml", content: await fetchTemplate("model-roster.yaml") }
  ];
  const instructions = [
    "# Agent Foundry project instructions", "",
    "This project has selected Agent Foundry resources installed under .agent-foundry/resources/.",
    "Read only the selected resources relevant to the current task. Do not load every resource on every turn.",
    "The project's own architecture, instructions, owner decisions and security constraints remain authoritative.", "",
    "## Installed resources",
    ...staged.map(item => "- " + item.id + " -> " + item.installed_path),
    "", "## Session discipline",
    "- Inspect the project and working tree before editing.",
    "- Use evidence-backed completion claims.",
    "- Preserve existing project work and ask before destructive or externally consequential actions.",
    "- Use the close-session command to capture durable learnings in the correct context files; do not create a transcript dump."
  ].join("\n") + "\n";
  const agentsPath = path.join(base, "AGENTS.md");
  const hadAgents = await exists(agentsPath);
  const oldAgents = hadAgents ? await fs.readFile(agentsPath, "utf8") : "";
  const newAgents = mergeInstruction(oldAgents);

  // All remote content and path conflicts are checked before the first project write.
  for (const item of staged) await atomicWrite(path.join(base, safeRelative(item.installed_path)), item.content);
  await atomicWrite(path.join(foundryDir, "instructions.md"), instructions);
  for (const item of settings) await atomicWrite(path.join(base, item.path), item.content);
  await atomicWrite(agentsPath, newAgents);

  const manifest = {
    manifest_version: 1,
    foundry_version: "0.4.0",
    source: plan.foundry,
    installed_at: new Date().toISOString(),
    entrypoint: "AGENTS.md",
    created_entrypoint: !hadAgents,
    entrypoint_marker: true,
    installed_resources: staged.map(({ content, ...item }) => item),
    settings: settings.map(item => ({ path: item.path, installed_sha256: sha256(item.content), template: true }))
  };
  await atomicWrite(path.join(foundryDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  const readme = "# Agent Foundry in this project\n\nRead instructions.md for the project entrypoint. manifest.json records installed resources and source revision. Settings are project-owned. Existing project instructions take precedence.\n";
  await atomicWrite(path.join(foundryDir, "README.md"), readme);
  return { manifest, installed_count: staged.length, entrypoint_created: !hadAgents };
}

export async function validateInstallation(root = process.cwd()) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  if (!await exists(manifestPath)) throw new Error("No Agent Foundry installation found.");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  if (manifest.manifest_version !== 1 || !Array.isArray(manifest.installed_resources)) throw new Error("Unsupported or malformed installation manifest.");
  const issues = [];
  for (const item of manifest.installed_resources) {
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) { issues.push({ path: item.installed_path, issue: "MISSING" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) issues.push({ path: item.installed_path, issue: "LOCALLY_MODIFIED", current_sha256: current });
  }
  for (const item of manifest.settings ?? []) {
    const file = path.join(base, safeRelative(item.path));
    if (!await exists(file)) issues.push({ path: item.path, issue: "MISSING" });
    
  }
  for (const file of ["instructions.md", "manifest.json"]) if (!await exists(path.join(base, FOUNDARY_DIR, file))) issues.push({ path: FOUNDARY_DIR + "/" + file, issue: "MISSING" });
  return { valid: issues.length === 0, resource_count: manifest.installed_resources.length, issues, manifest };
}

export async function updateInstallation({ root = process.cwd(), registry } = {}) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const changed = [], conflicts = [];
  for (const item of manifest.installed_resources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    if (!resource) { conflicts.push({ id: item.id, reason: "Resource no longer exists in registry" }); continue; }
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) { conflicts.push({ id: item.id, reason: "Installed file is missing" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) { conflicts.push({ id: item.id, reason: "Local modifications detected" }); continue; }
    const content = await fetchSource(registry.repository, registry.ref, resource, globalThis.fetch);
    if (sha256(content) !== item.source_sha256) changed.push({ item, resource, content });
  }
  if (conflicts.length) return { updated: 0, conflicts, pending: changed.map(x => x.item.id) };
  for (const change of changed) {
    await atomicWrite(path.join(base, safeRelative(change.item.installed_path)), change.content);
    change.item.version = change.resource.version;
    change.item.source_sha256 = sha256(change.content);
    change.item.installed_sha256 = sha256(change.content);
  }
  manifest.source.ref = registry.ref;
  manifest.updated_at = new Date().toISOString();
  await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  return { updated: changed.length, conflicts: [], pending: [] };
}

export async function uninstall(root = process.cwd()) {
  const base = path.resolve(root);
  const dir = path.join(base, FOUNDARY_DIR);
  const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
  const removed = [], preserved = [];
  for (const item of manifest.installed_resources ?? []) {
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) continue;
    if (sha256(await fs.readFile(file)) === item.installed_sha256) { await fs.rm(file); removed.push(item.installed_path); }
    else preserved.push(item.installed_path);
  }
  const agentsPath = path.join(base, "AGENTS.md");
  if (await exists(agentsPath)) {
    const text = await fs.readFile(agentsPath, "utf8");
    const startMarker = "<!-- agent-foundry:start -->";
    const endMarker = "<!-- agent-foundry:end -->";
    const start = text.indexOf(startMarker), end = text.indexOf(endMarker);
    if (start >= 0 && end > start) {
      const next = (text.slice(0, start) + text.slice(end + endMarker.length)).trim() + "\n";
      if (manifest.created_entrypoint && !next.trim()) await fs.rm(agentsPath);
      else await atomicWrite(agentsPath, next);
    }
  }
  for (const rel of [".agent-foundry/instructions.md", ".agent-foundry/README.md", ".agent-foundry/manifest.json"]) {
    const file = path.join(base, rel);
    if (await exists(file)) await fs.rm(file);
  }
  // Preserve settings and any owner-authored files. Empty directories are harmless.
  const leftovers = await walk(dir);
  return { removed, preserved, remaining_owner_files: leftovers, note: "Project-owned settings and modified resources are preserved." };
}
