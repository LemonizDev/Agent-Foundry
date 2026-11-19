import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { buildPlan, applyPlan, validateInstallation, uninstall } from "../src/installer.js";

async function temp() { return fs.mkdtemp(path.join(os.tmpdir(), "agent-foundry-")); }

test("plan selects only requested resources", async () => {
  const root = await temp();
  const registry = { resources: [{ id: "one", type: "skill", path: "skills/one.md", version: "1" }] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  assert.equal(plan.resources.length, 1);
  assert.equal(plan.resources[0].action, "ADD");
});

test("install preserves existing AGENTS and validation detects owner settings changes", async () => {
  const root = await temp();
  await fs.writeFile(path.join(root, "AGENTS.md"), "# Existing\nDo not remove.\n");
  const registry = { resources: [{ id: "one", type: "skill", path: "skills/one.md", version: "1" }] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# Installed skill\n" });
  const result = await applyPlan(plan, { root, registry, fetchText });
  assert.equal(result.installed_count, 1);
  assert.equal(result.host_artifact_count, 1);
  assert.ok(await fs.readFile(path.join(root, ".agents/skills/one/SKILL.md"), "utf8").then(x => x.includes("Installed skill")));
  const agents = await fs.readFile(path.join(root, "AGENTS.md"), "utf8");
  assert.match(agents, /# Existing/);
  assert.match(agents, /Do not remove/);
  assert.equal((await validateInstallation(root)).valid, true);
  await fs.writeFile(path.join(root, ".agent-foundry/settings/model-roster.yaml"), "models:\n  - alias: local\n");
  const validation = await validateInstallation(root);
  assert.equal(validation.valid, true);
  const removal = await uninstall(root);
  assert.deepEqual(removal.preserved, []);
  assert.ok(await fs.readFile(path.join(root, "AGENTS.md"), "utf8").then(x => x.includes("# Existing")));
  assert.ok(await fs.readFile(path.join(root, ".agent-foundry/settings/model-roster.yaml"), "utf8").then(x => x.includes("local")));
});

test("install refuses to overwrite a pre-existing resource path", async () => {
  const root = await temp();
  await fs.mkdir(path.join(root, ".agent-foundry/resources/skills"), { recursive: true });
  await fs.writeFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "local");
  const registry = { resources: [{ id: "one", type: "skill", path: "skills/one.md", version: "1" }] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async () => ({ ok: true, text: async () => "# source" });
  await assert.rejects(() => applyPlan(plan, { root, registry, fetchText }), /Refusing to overwrite/);
});

test("updater refreshes unchanged owned files but stops on local modifications", async () => {
  const root = await temp();
  const resourceV1 = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registryV1 = { resources: [resourceV1], repository: "owner/repo", ref: "v1" };
  const plan = await buildPlan({ root, registry: registryV1, resources: ["one"], repository: "owner/repo", ref: "v1" });
  const fetchV1 = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# version one\n" });
  await applyPlan(plan, { root, registry: registryV1, fetchText: fetchV1 });
  const registryV2 = { resources: [{ ...resourceV1, version: "2" }], repository: "owner/repo", ref: "v2" };
  const fetchV2 = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# version two\n" });
  const update = await (await import("../src/installer.js")).updateInstallation({ root, registry: registryV2, fetchText: fetchV2 });
  assert.equal(update.updated, 2);
  assert.match(await fs.readFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "utf8"), /version two/);
  await fs.writeFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "# owner change\n");
  const registryV3 = { resources: [{ ...resourceV1, version: "3" }], repository: "owner/repo", ref: "v3" };
  const blocked = await (await import("../src/installer.js")).updateInstallation({ root, registry: registryV3, fetchText: fetchV2 });
  assert.equal(blocked.updated, 0);
  assert.ok(blocked.conflicts.some(item => item.reason === "Local modifications detected"));
  assert.match(await fs.readFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "utf8"), /owner change/);
});
