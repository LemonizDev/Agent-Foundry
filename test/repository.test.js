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
    for (const core of ["global-instructions", "engineering-principles", "agent-communication", "context-management", "security-boundaries", "decision-making", "evidence-and-verification", "documentation-governance"]) assert.ok(resources.includes(core), "preset " + preset + " is missing core baseline " + core);
    const resolved = resolveResources(registry, resources);
    const resolvedIds = resolved.map(item => item.id);
    assert.ok(resources.every(id => resolvedIds.includes(id)), "preset " + preset + " contains an unknown resource");
    assert.equal(new Set(resolvedIds).size, resolvedIds.length, "preset " + preset + " resolves duplicate resources");
  }
});

test("GitHub Actions workflow YAML is parseable and release workflow is tag-gated", async () => {
  const yaml = (await import("js-yaml")).default;
  const ci = yaml.load(await fs.readFile(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8"));
  const release = yaml.load(await fs.readFile(new URL("../.github/workflows/release.yml", import.meta.url), "utf8"));
  assert.ok(ci.jobs.test.strategy.matrix.os.includes("windows-latest"));
  assert.ok(ci.jobs.test.strategy.matrix.os.includes("macos-latest"));
  assert.ok(release.on.push.tags.includes("v*"));
});

test("npm package allowlist includes every registered resource directory", async () => {
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  const included = new Set((pkg.files ?? []).map(item => item.replace(/\/$/, "")));
  for (const required of ["assets", "bootstrap"]) assert.ok(included.has(required), "npm package must include " + required);
  for (const resource of registry.resources) {
    const directory = resource.path.split("/")[0];
    assert.ok(included.has(directory), "npm package allowlist omits " + directory + " required by " + resource.id);
  }
});

test("package and CLI versions agree", async () => {
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  const cli = await fs.readFile(path.join(root, "bin/agent-foundry.js"), "utf8");
  assert.ok(cli.includes('const VERSION = "' + pkg.version + '";'), "package and CLI versions differ");
});
