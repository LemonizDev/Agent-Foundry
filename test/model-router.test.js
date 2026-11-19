import test from "node:test";
import assert from "node:assert/strict";
import { classifyTask, selectModel } from "../src/model-router.js";

test("task classifier distinguishes fast work from architecture and security risk", () => {
  assert.equal(classifyTask("Find the function that parses the config").task_class, "FAST_LOOKUP");
  assert.equal(classifyTask("Rename these repetitive metadata keys").task_class, "MECHANICAL");
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
