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
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "schema_version: 1\nmodels: []\n" : url.endsWith("foundry-settings.yaml") ? "schema_version: 1\nmodel_selection:\n  allowed_access: []\n  preferred_access: []\n" : "# Installed skill\n" });
  const result = await applyPlan(plan, { root, registry, fetchText });
  assert.equal(result.installed_count, 1);
  assert.equal(result.host_artifact_count, 1);
  assert.ok(await fs.readFile(path.join(root, ".agents/skills/one/SKILL.md"), "utf8").then(x => x.includes("Installed skill")));
  const agents = await fs.readFile(path.join(root, "AGENTS.md"), "utf8");
  assert.match(agents, /# Existing/);
  assert.match(agents, /Do not remove/);
  assert.equal((await validateInstallation(root)).valid, true);
  await fs.writeFile(path.join(root, ".agent-foundry/settings/model-roster.yaml"), "schema_version: 1\nmodels:\n  - alias: local\n    provider: local\n    model_id: local/test\n    availability: available\n    access: local\n    capabilities: {}\n");
  const validation = await validateInstallation(root);
  assert.equal(validation.valid, true);
  const preview = await uninstall(root);
  assert.equal(preview.applied, false);
  await fs.access(path.join(root, ".agent-foundry/manifest.json"));
  const removal = await uninstall(root, { apply: true });
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
  const update = await (await import("../src/installer.js")).updateInstallation({ root, registry: registryV2, fetchText: fetchV2, apply: true });
  assert.equal(update.updated, 2);
  assert.match(await fs.readFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "utf8"), /version two/);
  await fs.writeFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "# owner change\n");
  const registryV3 = { resources: [{ ...resourceV1, version: "3" }], repository: "owner/repo", ref: "v3" };
  const blocked = await (await import("../src/installer.js")).updateInstallation({ root, registry: registryV3, fetchText: fetchV2, apply: true });
  assert.equal(blocked.updated, 0);
  assert.ok(blocked.conflicts.some(item => item.reason === "Local modifications detected"));
  assert.match(await fs.readFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "utf8"), /owner change/);
});

test("uninstall preserves locally modified resources and Foundry instructions", async () => {
  const root = await temp();
  const resource = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registry = { resources: [resource] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# source content\n" });
  await applyPlan(plan, { root, registry, fetchText });
  const resourcePath = path.join(root, ".agent-foundry/resources/skills/one.md");
  const instructionsPath = path.join(root, ".agent-foundry/instructions.md");
  await fs.writeFile(resourcePath, "# local resource customisation\n");
  await fs.appendFile(instructionsPath, "\nLocal owner note.\n");
  const preview = await uninstall(root);
  assert.ok(preview.preserved.includes(".agent-foundry/resources/skills/one.md"));
  assert.ok(preview.managed_files.some(x => x.path === ".agent-foundry/instructions.md" && x.action === "PRESERVE"));
  await uninstall(root, { apply: true });
  assert.match(await fs.readFile(resourcePath, "utf8"), /local resource customisation/);
  assert.match(await fs.readFile(instructionsPath, "utf8"), /Local owner note/);
});

test("installer adds host-specific instruction pointers without replacing existing files", async () => {
  const root = await temp();
  await fs.writeFile(path.join(root, "CLAUDE.md"), "# Existing Claude rules\nKeep these rules.\n");
  await fs.mkdir(path.join(root, ".clinerules"), { recursive: true });
  const resource = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registry = { resources: [resource] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  assert.ok(plan.detected_hosts.includes("claude-code"));
  assert.ok(plan.detected_hosts.includes("cline"));
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# host skill\n" });
  await applyPlan(plan, { root, registry, fetchText });
  const claude = await fs.readFile(path.join(root, "CLAUDE.md"), "utf8");
  assert.match(claude, /Existing Claude rules/);
  assert.match(claude, /agent-foundry:start/);
  assert.ok(await fs.readFile(path.join(root, ".clinerules/agent-foundry.md"), "utf8").then(x => x.includes("agent-foundry:start")));
  await uninstall(root, { apply: true });
  assert.match(await fs.readFile(path.join(root, "CLAUDE.md"), "utf8"), /Existing Claude rules/);
  await assert.rejects(() => fs.access(path.join(root, ".clinerules/agent-foundry.md")));
});

test("explicit skip-conflicts installs remaining resources without replacing existing files", async () => {
  const root = await temp();
  await fs.mkdir(path.join(root, ".agent-foundry/resources/skills"), { recursive: true });
  await fs.writeFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "# owner resource\n");
  const resource = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registry = { resources: [resource] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# source skill\n" });
  await assert.rejects(() => applyPlan(plan, { root, registry, fetchText }), /Refusing to overwrite/);
  const result = await applyPlan(plan, { root, registry, fetchText, skipConflicts: true });
  assert.equal(result.skipped_conflicts, 1);
  assert.match(await fs.readFile(path.join(root, ".agent-foundry/resources/skills/one.md"), "utf8"), /owner resource/);
  assert.ok(await fs.readFile(path.join(root, ".agents/skills/one/SKILL.md"), "utf8").then(x => x.includes("source skill")));
});

test("uninstall preserves owner edits inside the marked instruction block", async () => {
  const root = await temp();
  const resource = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registry = { resources: [resource] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async url => ({ ok: true, text: async () => url.endsWith("model-roster.yaml") ? "models: []\n" : url.endsWith("foundry-settings.yaml") ? "version: 1\n" : "# source\n" });
  await applyPlan(plan, { root, registry, fetchText });
  const agentsPath = path.join(root, "AGENTS.md");
  const original = await fs.readFile(agentsPath, "utf8");
  await fs.writeFile(agentsPath, original.replace("Existing project instructions and owner decisions remain authoritative.", "OWNER CUSTOMIZED THIS POINTER."));
  const preview = await uninstall(root);
  assert.ok(preview.entrypoints.some(x => x.action === "PRESERVE_MODIFIED_MARKER"));
  await uninstall(root, { apply: true });
  assert.match(await fs.readFile(agentsPath, "utf8"), /OWNER CUSTOMIZED THIS POINTER/);
});

test("installer fetches all resources before writing any project files", async () => {
  const root = await temp();
  const resource = { id: "one", type: "skill", path: "skills/one.md", version: "1" };
  const registry = { resources: [resource] };
  const plan = await buildPlan({ root, registry, resources: ["one"], repository: "owner/repo", ref: "main" });
  const fetchText = async url => url.endsWith("model-roster.yaml")
    ? { ok: false, status: 404, text: async () => "" }
    : { ok: true, text: async () => "# fetched resource\n" };
  await assert.rejects(() => applyPlan(plan, { root, registry, fetchText }), /settings template/);
  await assert.rejects(() => fs.access(path.join(root, "AGENTS.md")));
  await assert.rejects(() => fs.access(path.join(root, ".agent-foundry/manifest.json")));
});
