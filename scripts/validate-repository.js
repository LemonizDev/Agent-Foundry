import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";
import { resolveResources } from "../src/registry.js";
import { safeRelative } from "../src/utils.js";

const root = process.cwd();
const registry = yaml.load(await fs.readFile(path.join(root, "registry/resources.yaml"), "utf8"));
if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.resources)) throw new Error("Invalid resource registry.");
const ids = new Set();
for (const resource of registry.resources) {
  if (!resource.id || ids.has(resource.id)) throw new Error("Missing or duplicate resource id: " + resource.id);
  ids.add(resource.id);
  const normal = safeRelative(resource.path);
  await fs.access(path.join(root, normal));
}
for (const resource of registry.resources) {
  for (const dependency of resource.dependencies ?? []) if (!ids.has(dependency)) throw new Error(resource.id + " references missing dependency " + dependency);
}
resolveResources(registry, registry.resources.map(item => item.id));
console.log("Repository validation passed: " + registry.resources.length + " resources, unique IDs, existing paths, valid dependencies, no dependency cycles.");
