import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const registry = yaml.load(await fs.readFile(path.join(root, "registry/resources.yaml"), "utf8"));

test("resource registry has unique IDs and valid resource paths", async () => {
  const ids = new Set();
  for (const resource of registry.resources) {
    assert.ok(resource.id, "resource id is required");
    assert.ok(!ids.has(resource.id), "duplicate resource id: " + resource.id);
    ids.add(resource.id);
    assert.ok(resource.path && !resource.path.startsWith("/") && !resource.path.includes(".."), "unsafe resource path: " + resource.path);
    await fs.access(path.join(root, resource.path));
  }
});

test("resource dependencies refer to registered IDs", () => {
  const ids = new Set(registry.resources.map(item => item.id));
  for (const resource of registry.resources) {
    for (const dependency of resource.dependencies ?? []) assert.ok(ids.has(dependency), resource.id + " has missing dependency " + dependency);
  }
});

test("default installer selection resolves entirely from registry", async () => {
  const { resolveResources } = await import("../src/registry.js");
  const { resourcesForPreset } = await import("../src/installer.js");
  const { scanProject } = await import("../src/project-scanner.js");
  const scan = await scanProject(root);
  for (const preset of ["minimal", "balanced", "autonomous-engineer", "visual-engineer", "research-engineer", "auto"]) {
    const resources = resourcesForPreset(preset, scan);
    assert.equal(resolveResources(registry, resources).length, resources.length, "preset " + preset + " contains unknown or duplicate resources");
  }
});
