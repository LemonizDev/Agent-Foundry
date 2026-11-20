import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const registry = yaml.load(await fs.readFile(path.join(root, "registry/resources.yaml"), "utf8"));
if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.resources)) {
  throw new Error("Invalid resource registry: expected schema_version 1 and a resources array.");
}

const byId = new Map();
for (const resource of registry.resources) {
  if (!resource || typeof resource.id !== "string" || !resource.id.trim()) throw new Error("Every resource needs a non-empty ID.");
  if (byId.has(resource.id)) throw new Error("Duplicate resource ID: " + resource.id);
  if (typeof resource.path !== "string" || !resource.path.trim()) throw new Error("Missing path for " + resource.id);
  const normalized = resource.path.replaceAll("\\", "/");
  if (normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized) || normalized.split("/").some(part => !part || part === "." || part === "..")) {
    throw new Error("Unsafe resource path for " + resource.id + ": " + resource.path);
  }
  const absolute = path.resolve(root, normalized);
  if (!absolute.startsWith(root + path.sep)) throw new Error("Resource path escapes repository: " + resource.path);
  const stat = await fs.lstat(absolute).catch(() => null);
  if (!stat?.isFile()) throw new Error("Resource is missing or not a regular file: " + resource.path);
  byId.set(resource.id, resource);
}

const visiting = new Set();
const visited = new Set();
function visit(id, chain = []) {
  if (visiting.has(id)) throw new Error("Resource dependency cycle: " + [...chain, id].join(" -> "));
  if (visited.has(id)) return;
  const resource = byId.get(id);
  if (!resource) throw new Error("Unknown resource dependency: " + id);
  visiting.add(id);
  for (const dependency of resource.dependencies ?? []) {
    if (!byId.has(dependency)) throw new Error(resource.id + " references missing dependency " + dependency);
    visit(dependency, [...chain, id]);
  }
  visiting.delete(id);
  visited.add(id);
}
for (const id of byId.keys()) visit(id);
console.log("Repository validation passed: " + byId.size + " resources, unique IDs, safe existing paths, valid dependencies and no dependency cycles.");
