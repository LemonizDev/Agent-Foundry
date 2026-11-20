import test from "node:test";
import assert from "node:assert/strict";
import { bundledFetch } from "../src/source.js";

const url = p => "https://raw.githubusercontent.com/o/r/bundled-0.5.0-dev.1/" + p;

test("bundled source serves package files without network access", async () => {
  const response = await bundledFetch(url("registry/resources.yaml"));
  assert.equal(response.ok, true);
  assert.match(await response.text(), /schema_version/);
});

test("bundled source rejects traversal and missing files", async () => {
  assert.equal((await bundledFetch(url("../../etc/passwd"))).ok, false);
  assert.equal((await bundledFetch(url("nope.md"))).status, 404);
});
