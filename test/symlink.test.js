import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { assertNoSymlinkPath } from "../src/utils.js";

test("installer path guard refuses symlinked parent directories", async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "foundry-root-"));
  const outside = await fs.mkdtemp(path.join(os.tmpdir(), "foundry-outside-"));
  try {
    await fs.symlink(outside, path.join(root, ".agents"), "junction");
  } catch (error) {
    if (["EPERM", "EACCES", "ENOTSUP"].includes(error.code)) return t.skip("Symlink creation is unavailable in this environment.");
    throw error;
  }
  await assert.rejects(() => assertNoSymlinkPath(root, ".agents/skills/unsafe/SKILL.md"), /symlink/);
});
