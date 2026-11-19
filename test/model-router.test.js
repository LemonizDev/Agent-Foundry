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
