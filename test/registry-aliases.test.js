import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import yaml from "js-yaml";

const normalize = list => (list ?? []).map(value => String(value).trim().replace(/^\//, ""));

test("command frontmatter aliases match registry aliases", () => {
  const registry = yaml.load(fs.readFileSync("registry/resources.yaml", "utf8"));
  for (const resource of registry.resources.filter(item => item.type === "command")) {
    const frontmatter = fs.readFileSync(resource.path, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(frontmatter, "missing frontmatter in " + resource.path);
    const metadata = yaml.load(frontmatter[1]);
    const declared = normalize(metadata.aliases);
    assert.equal(metadata.id, resource.id, "frontmatter ID drift in " + resource.id);
    assert.equal(metadata.version, resource.version, "resource version drift in " + resource.id);
    assert.deepEqual(normalize(resource.aliases), declared, "alias drift in " + resource.id);
  }
});
