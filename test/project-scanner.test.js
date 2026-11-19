import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { scanProject } from "../src/project-scanner.js";

test("explicit host overrides support fresh projects without host configuration files", async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "foundry-host-scan-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.writeFile(path.join(root, "package.json"), '{"name":"fresh-project"}');
  const scan = await scanProject(root, { hosts: ["kilo", "cline"] });
  assert.ok(scan.hosts.includes("kilo"));
  assert.ok(scan.hosts.includes("cline"));
});

test("host scanner rejects unknown explicit host names", async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "foundry-host-scan-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await assert.rejects(() => scanProject(root, { hosts: ["made-up-agent"] }), /Unsupported host override/);
});
