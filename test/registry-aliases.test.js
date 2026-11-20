import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import yaml from "js-yaml";

const normalize = list => (list ?? []).map(value => String(value).trim().replace(/^\//, ""));

test("command frontmatter aliases match registry aliases", () => {
  const registry = yaml.load(fs.readFileSync("registry/resources.yaml", "utf8"));
  for (const resource of registry.resources.filter(item => item.type === "command")) {
    const frontmatter = fs.readFileSync(resource.path, "utf8").match(/^---\n([\s\S]*?)\n---/);
    const declared = normalize(frontmatter ? yaml.load(frontmatter[1]).aliases : []);
    assert.deepEqual(normalize(resource.aliases), declared, "alias drift in " + resource.id);
  }
});
