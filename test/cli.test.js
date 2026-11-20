import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const BIN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../bin/agent-foundry.js");
const run = (args, cwd) => spawnSync(process.execPath, [BIN, ...args], { cwd, encoding: "utf8" });
const temp = () => fs.mkdtemp(path.join(os.tmpdir(), "af-cli-"));
const exists = p => fs.access(p).then(() => true, () => false);

test("CLI starts and lists the bundled registry without network access", () => {
  assert.equal(run(["version"]).stdout.trim(), "0.5.0-dev.1");
  const list = run(["list"]);
  assert.equal(list.status, 0, list.stderr);
  assert.ok(list.stdout.split("\n").filter(Boolean).length > 40);
});

test("existing project: preview is read-only and uninstall restores AGENTS exactly", async () => {
  const dir = await temp();
  const original = "# Mine\nKeep functions small.\n";
  await fs.writeFile(path.join(dir, "AGENTS.md"), original);
  const plan = run(["init", "--project", dir, "--preset", "minimal"]);
  assert.equal(plan.status, 0, plan.stderr);
  assert.match(plan.stdout, /INSTALLATION PLAN/);
  assert.equal(await exists(path.join(dir, ".agent-foundry")), false);
  const apply = run(["init", "--project", dir, "--preset", "minimal", "--apply", "--yes"]);
  assert.equal(apply.status, 0, apply.stderr);
  assert.ok((await fs.readFile(path.join(dir, "AGENTS.md"), "utf8")).startsWith(original));
  assert.equal(JSON.parse(run(["validate", "--project", dir]).stdout).valid, true);
  assert.match(run(["update", "--project", dir]).stdout, /Already up to date/);
  const un = run(["uninstall", "--project", dir, "--apply", "--yes"]);
  assert.equal(un.status, 0, un.stderr);
  assert.equal(await fs.readFile(path.join(dir, "AGENTS.md"), "utf8"), original);
  assert.equal(await exists(path.join(dir, ".agent-foundry")), false);
});

test("brand-new project installs, validates and uninstalls cleanly", async () => {
  const dir = await temp();
  assert.equal(run(["init", "--project", dir, "--preset", "minimal", "--apply", "--yes"]).status, 0);
  assert.equal(JSON.parse(run(["validate", "--project", dir]).stdout).valid, true);
  assert.equal(run(["uninstall", "--project", dir, "--apply", "--yes"]).status, 0);
  assert.deepEqual(await fs.readdir(dir), []);
});

test("update preserves locally modified resources", async () => {
  const dir = await temp();
  assert.equal(run(["init", "--project", dir, "--preset", "minimal", "--apply", "--yes"]).status, 0);
  const file = path.join(dir, ".agent-foundry/resources/skills/atomic-implementation/SKILL.md");
  await fs.appendFile(file, "\nlocal edit\n");
  const update = run(["update", "--project", dir]);
  assert.equal(update.status, 2);
  assert.ok((await fs.readFile(file, "utf8")).includes("local edit"));
});

test("default auto preset installs from the bundled package", async () => {
  const dir = await temp();
  await fs.writeFile(path.join(dir, "package.json"), '{"name":"demo"}');
  const apply = run(["init", "--project", dir, "--apply", "--yes"]);
  assert.equal(apply.status, 0, apply.stderr);
  assert.equal(JSON.parse(run(["validate", "--project", dir]).stdout).valid, true);
  const route = run(["route", "--project", dir, "--task", "review authentication changes"]);
  assert.ok([0, 2].includes(route.status), route.stderr);
});

\ntest("explicit host overrides are reflected in the installation plan", async () => {
  const dir = await temp();
  const plan = run(["init", "--project", dir, "--preset", "minimal", "--hosts", "codex"]);
  assert.equal(plan.status, 0, plan.stderr);
  assert.match(plan.stdout, /HOST INTEGRATION \(codex\)/);
  assert.match(plan.stdout, /\.agents\/skills\//);
  assert.equal(await exists(path.join(dir, ".agent-foundry")), false);
});
