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
  const defaults = [
    "atomic-implementation", "project-state-management", "progress-reporting",
    "evidence-and-verification", "documentation-governance", "session-learning",
    "close-session", "progress-report", "teach-implementation", "session-close",
    "foundry-settings", "edit-model-roster", "model-delegation-architecture",
    "model-roster-template", "foundry-settings-template", "lead-engineer",
    "independent-reviewer", "agent-execution-security"
  ];
  assert.equal(resolveResources(registry, defaults).length, defaults.length);
});
