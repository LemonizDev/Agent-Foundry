import test from "node:test";
import assert from "node:assert/strict";
import { classifyTask, selectModel } from "../src/model-router.js";

test("task classifier distinguishes fast work from architecture and security risk", () => {
  assert.equal(classifyTask("Find the function that parses the config").task_class, "FAST_LOOKUP");
  assert.equal(classifyTask("Rename these repetitive metadata keys").task_class, "MECHANICAL");
  assert.equal(classifyTask("Make a simple one-line typo fix").task_class, "SMALL_TASK");
  assert.equal(classifyTask("Design a cross-module architecture migration").task_class, "ARCHITECTURE");
  const security = classifyTask("Review authentication permissions and secret handling");
  assert.equal(security.task_class, "SECURITY_CRITICAL");
  assert.equal(security.risk, "HIGH");
});

test("selector filters unavailable and unsafe models before ranking", () => {
  const classification = classifyTask("Review authentication permissions and secret handling");
  const roster = { models: [
    { alias: "fast", provider: "p", model_id: "fast", availability: "available", capabilities: { reasoning: "medium", instruction_following: "high" }, evidence: { confidence: "high" } },
    { alias: "unknown", provider: "p", model_id: "x", availability: "unknown", capabilities: { reasoning: "high", instruction_following: "high" }, evidence: { confidence: "high" } },
    { alias: "expert", provider: "p", model_id: "expert", availability: "available", capabilities: { reasoning: "high", instruction_following: "high" }, evidence: { confidence: "high" } }
  ] };
  const result = selectModel(classification, roster);
  assert.equal(result.selected.alias, "expert");
  assert.equal(result.independent_review_recommended, true);
  assert.ok(result.rejected.some(x => x.alias === "fast"));
  assert.ok(result.rejected.some(x => x.alias === "unknown"));
});

test("selector does not invent a model when the roster is empty", () => {
  const result = selectModel(classifyTask("Fix a typo"), { models: [] });
  assert.equal(result.selected, null);
});

test("mechanical work prefers a smaller eligible model", () => {
  const classification = classifyTask("Rename these repetitive metadata fields");
  const base = { provider: "p", availability: "available", capabilities: { coding: "high", tool_calling: "high", instruction_following: "high" }, evidence: { confidence: "medium" } };
  const result = selectModel(classification, { models: [
    { ...base, alias: "large", model_id: "large", size_class: "large" },
    { ...base, alias: "small", model_id: "small", size_class: "small" }
  ] });
  assert.equal(result.selected.alias, "small");
});

test("long-context tasks reject models with insufficient or unknown context windows", () => {
  const classification = classifyTask("Synthesize the entire repository history and reconcile multiple documents");
  const base = { provider: "p", availability: "available", capabilities: { reasoning: "high", instruction_following: "high", context_window_tokens: 32000 }, evidence: { confidence: "high" } };
  const result = selectModel(classification, { models: [{ ...base, alias: "short", model_id: "short" }] });
  assert.equal(result.selected, null);
  assert.match(result.rejected[0].reasons.join(" "), /context window/);
});

test("project access policy is a hard filter", () => {
  const classification = classifyTask("Find the function that parses settings");
  const roster = { models: [
    { alias: "paid", provider: "p", model_id: "paid", availability: "available", access: "paid", capabilities: { instruction_following: "high" } },
    { alias: "free", provider: "p", model_id: "free", availability: "available", access: "free", capabilities: { instruction_following: "medium" } }
  ] };
  const result = selectModel(classification, roster, { model_selection: { allowed_access: ["free"] } });
  assert.equal(result.selected.alias, "free");
  assert.ok(result.rejected.some(x => x.alias === "paid"));
});

test("model roster validator catches duplicate aliases and malformed capability levels", async () => {
  const { validateModelRoster } = await import("../src/model-router.js");
  const roster = { schema_version: 1, models: [
    { alias: "same", provider: "p", model_id: "m1", availability: "available", capabilities: { reasoning: "excellent" } },
    { alias: "same", provider: "p", model_id: "m2", availability: "available", capabilities: {} }
  ] };
  const issues = validateModelRoster(roster);
  assert.ok(issues.some(x => x.path.endsWith(".reasoning")));
  assert.ok(issues.some(x => x.path.endsWith(".alias")));
});

test("explicit speed-sensitive tasks prefer owner-rated fast models", () => {
  const classification = classifyTask("Give me a fast, low-latency lookup of this symbol");
  const base = { provider: "p", availability: "available", capabilities: { reasoning: "medium", tool_calling: "medium", instruction_following: "high" } };
  const result = selectModel(classification, { models: [
    { ...base, alias: "balanced", model_id: "balanced", speed_tier: "balanced" },
    { ...base, alias: "fast", model_id: "fast", speed_tier: "fast" }
  ] });
  assert.equal(classification.latency_sensitive, true);
  assert.equal(result.selected.alias, "fast");
});
