import test from "node:test";
import assert from "node:assert/strict";
import { resolveResources } from "../src/registry.js";
import { safeRelative, mergeInstruction, sha256 } from "../src/utils.js";
import { classifyCapabilities } from "../src/project-scanner.js";

test("resource resolver includes dependencies before dependants", () => {
  const registry = { resources: [
    { id: "base", path: "base.md", type: "skill", version: "1" },
    { id: "child", path: "child.md", type: "skill", version: "1", dependencies: ["base"] }
  ] };
  assert.deepEqual(resolveResources(registry, ["child"]).map(x => x.id), ["base", "child"]);
  assert.throws(() => resolveResources(registry, ["missing"]), /Unknown/);
});

test("resource resolver detects dependency cycles", () => {
  const registry = { resources: [
    { id: "a", path: "a.md", type: "skill", version: "1", dependencies: ["b"] },
    { id: "b", path: "b.md", type: "skill", version: "1", dependencies: ["a"] }
  ] };
  assert.throws(() => resolveResources(registry, ["a"]), /cycle/);
});

test("safeRelative rejects traversal and absolute paths", () => {
  assert.equal(safeRelative("skills/a.md"), "skills/a.md");
  assert.throws(() => safeRelative("../../outside"), /Unsafe/);
  assert.throws(() => safeRelative("/etc/passwd"), /Unsafe/);
});

test("instruction block is idempotent and preserves existing content", () => {
  const original = "# Existing instructions\n\nKeep this.";
  const first = mergeInstruction(original);
  assert.equal(mergeInstruction(first), first);
  assert.ok(first.startsWith(original));
});

test("hashes are stable", () => {
  assert.equal(sha256("x"), sha256("x"));
  assert.notEqual(sha256("x"), sha256("y"));
});

test("capability classifier keeps existing project practices", () => {
  const result = classifyCapabilities({ capabilities: [{ id: "tests", label: "Tests", present: true, matches: ["tests"] }] });
  assert.equal(result[0].action, "KEEP");
});

test("registry loader resolves a moving ref to an immutable commit SHA", async () => {
  const { loadRegistry } = await import("../src/registry.js");
  const calls = [];
  const fetchText = async url => {
    calls.push(url);
    if (url.includes("/commits/")) return { ok: true, json: async () => ({ sha: "a".repeat(40) }) };
    return { ok: true, text: async () => "schema_version: 1\nresources:\n  - id: sample\n    type: skill\n    path: sample.md\n    version: 1.0.0\n" };
  };
  const result = await loadRegistry({ repository: "owner/repo", ref: "main", fetchText });
  assert.equal(result.commit_sha, "a".repeat(40));
  assert.equal(result.resolved_ref, "a".repeat(40));
  assert.equal(calls.length, 2);
});

test("registry loader fails closed when immutable source revision cannot be resolved", async () => {
  const { loadRegistry } = await import("../src/registry.js");
  const fetchText = async url => url.includes("/commits/")
    ? { ok: false, status: 403 }
    : { ok: true, text: async () => "schema_version: 1\nresources: []\n" };
  await assert.rejects(() => loadRegistry({ repository: "owner/repo", ref: "main", fetchText }), /immutable Foundry source revision/);
});
