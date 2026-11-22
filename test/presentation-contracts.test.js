import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const registry = yaml.load(await fs.readFile(path.join(root, "registry/resources.yaml"), "utf8"));
const byId = new Map(registry.resources.map(resource => [resource.id, resource]));

function frontmatter(markdown, label) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, label + " must have YAML frontmatter");
  return yaml.load(match[1]);
}

test("every registered command has a presentation contract and matching dependencies", async () => {
  const commands = registry.resources.filter(resource => resource.type === "command");
  assert.ok(commands.length > 0);
  for (const resource of commands) {
    const markdown = await fs.readFile(path.join(root, resource.path), "utf8");
    const metadata = frontmatter(markdown, resource.path);
    assert.equal(metadata.id, resource.id, "frontmatter ID drift: " + resource.id);
    assert.equal(metadata.version, resource.version, "frontmatter version drift: " + resource.id);
    assert.deepEqual(metadata.dependencies ?? [], resource.dependencies ?? [], "dependency drift: " + resource.id);
    assert.match(markdown, /^## Presentation$/m, "missing presentation contract: " + resource.id);
    assert.match(markdown, /standards\/response-presentation\.md/, "missing shared presentation standard: " + resource.id);
    for (const dependency of resource.dependencies ?? []) {
      assert.ok(byId.has(dependency), resource.id + " references missing dependency " + dependency);
    }
  }
});

test("new presentation templates have matching registered IDs", async () => {
  const ids = [
    "repository-audit-report", "installation-preview", "implementation-plan",
    "verification-report", "diagnostic-report", "resource-inventory",
    "session-handoff", "decision-prompt"
  ];
  for (const id of ids) {
    const resource = byId.get(id);
    assert.ok(resource, "template is missing from registry: " + id);
    const markdown = await fs.readFile(path.join(root, resource.path), "utf8");
    const metadata = frontmatter(markdown, resource.path);
    assert.equal(metadata.id, id);
    assert.equal(metadata.type, "template");
  }
});

test("progress report retains its established information model", async () => {
  const markdown = await fs.readFile(path.join(root, "templates/progress-report-template.md"), "utf8");
  for (const heading of [
    "## 1. Goal vs. today",
    "## 2. Overall progress",
    "## 3. Workstream checklist",
    "## 4. Safety and operating gates",
    "## 5. What works / what does not",
    "## 6. Next small step"
  ]) assert.ok(markdown.includes(heading), "progress report section was removed: " + heading);
  for (const field of ["Intended outcome", "Verified today", "How to read this", "Method", "Owner decision required"]) {
    assert.ok(markdown.includes(field), "progress report field was removed: " + field);
  }
});

test("installation workflow requires sequential owner input and a described resource inventory", async () => {
  const workflow = await fs.readFile(path.join(root, "bootstrap/INITIALIZE_PROJECT.md"), "utf8");
  assert.match(workflow, /one independent question per turn/i);
  assert.match(workflow, /do not append the next question/i);
  assert.match(workflow, /templates\/resource-inventory\.md/);
  assert.match(workflow, /what each actually contains/i);
});

test("Done remains the unified session-ending operation and Close stays a compatibility alias", async () => {
  const done = await fs.readFile(path.join(root, "commands/done.md"), "utf8");
  const close = await fs.readFile(path.join(root, "commands/close-session.md"), "utf8");
  const guide = await fs.readFile(path.join(root, "docs/USER_GUIDE.md"), "utf8");
  const global = await fs.readFile(path.join(root, "core/GLOBAL_INSTRUCTIONS.md"), "utf8");
  assert.match(done, /End the work session cleanly/);
  assert.match(done, /Preserve durable project learnings/);
  assert.match(close, /compatibility entrypoint for `\/done`/i);
  assert.match(close, /status: deprecated/);
  assert.match(guide, /deprecated compatibility aliases for the same `\/done` procedure/i);
  assert.match(global, /legacy aliases for the same `\/done` procedure/i);
  assert.doesNotMatch(guide, /Use `\/close` to preserve durable project context.*Use `\/done`/s);
});

test("command catalog documents the full lifecycle and canonical template map", async () => {
  const catalog = await fs.readFile(path.join(root, "docs/COMMAND_CATALOG.md"), "utf8");
  for (const command of ["/audit", "/implement", "/debug", "/review", "/verify", "/delegate", "/progress-report", "/next-task", "/project-health", "/resume", "/done", "/campaign-status", "contribute", "/settings", "/models edit", "/models explain", "/models test", "/teach-implementation"]) {
    assert.ok(catalog.includes(command), "command missing from catalog: " + command);
  }
  assert.match(catalog, //close.*legacy compatibility alias for.*/done/i);
});
