import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const registry = yaml.load(await fs.readFile(path.join(root, "registry/resources.yaml"), "utf8"));

test("resource registry has unique IDs and safe, existing resource paths", async () => {
  const ids = new Set();
  for (const resource of registry.resources) {
    assert.ok(resource.id, "resource ID is required");
    assert.ok(!ids.has(resource.id), "duplicate resource ID: " + resource.id);
    ids.add(resource.id);
    const normalized = resource.path.replaceAll("\\", "/");
    assert.ok(!normalized.startsWith("/") && !/^[A-Za-z]:/.test(normalized));
    assert.ok(!normalized.split("/").some(part => part === ".." || part === "." || !part));
    const stat = await fs.lstat(path.join(root, normalized));
    assert.ok(stat.isFile(), "resource must be a regular file: " + normalized);
  }
});

test("resource dependencies exist and are acyclic", () => {
  const ids = new Set(registry.resources.map(item => item.id));
  const byId = new Map(registry.resources.map(item => [item.id, item]));
  for (const resource of registry.resources) for (const dependency of resource.dependencies ?? []) {
    assert.ok(ids.has(dependency), resource.id + " has missing dependency " + dependency);
  }
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    assert.ok(!visiting.has(id), "dependency cycle at " + id);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id).dependencies ?? []) visit(dependency);
    visiting.delete(id); visited.add(id);
  }
  for (const id of ids) visit(id);
});

test("settings command dependencies resolve to registered resources", () => {
  const command = registry.resources.find(item => item.id === "foundry-settings");
  assert.ok(command);
  assert.ok(command.dependencies.includes("foundry-settings-spec"));
  assert.ok(command.dependencies.includes("foundry-response-templates"));
});

test("CI runs repository tests and validation without the removed executable", async () => {
  const ci = yaml.load(await fs.readFile(path.join(root, ".github/workflows/ci.yml"), "utf8"));
  const steps = ci.jobs.test.steps.map(step => step.run ?? "");
  assert.ok(steps.some(step => step.includes("npm test")));
  assert.ok(steps.some(step => step.includes("validate:repo")));
  assert.ok(!steps.some(step => /bin\/agent-foundry|npm pack/.test(step)));
});

test("package is private and exposes no executable or runtime dependencies", async () => {
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  assert.equal(pkg.private, true);
  assert.equal(pkg.bin, undefined);
  assert.deepEqual(pkg.dependencies ?? {}, {});
});
