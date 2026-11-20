import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

test("CLI source directories and npm release workflow remain absent", async () => {
  for (const relative of ["bin", "src", ".github/workflows/release.yml"]) {
    await assert.rejects(fs.access(path.join(root, relative)), relative + " must not exist");
  }
});

test("package metadata has no executable entry point or runtime dependencies", async () => {
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  assert.equal(pkg.private, true);
  assert.equal(pkg.bin, undefined);
  assert.deepEqual(pkg.dependencies ?? {}, {});
});

test("active product docs do not instruct users to install or run the CLI", async () => {
  const documents = [
    "README.md", "BOOTSTRAP.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "SUPPORT.md",
    "docs/USER_GUIDE.md", "docs/README.md", "docs/architecture/DISTRIBUTION_AND_VERSIONING.md",
    "docs/architecture/EXISTING_PROJECT_INTEGRATION.md", "integrations/README.md", "profiles/README.md"
  ];
  const forbidden = [
    /npx\\s+.*agent-foundry/i,
    /agent-foundry\\s+(init|inspect|install|update|uninstall|validate)/i,
    /--preset\\s+auto/i,
    /project-integration CLI/i
  ];
  for (const relative of documents) {
    const content = await fs.readFile(path.join(root, relative), "utf8");
    for (const pattern of forbidden) assert.doesNotMatch(content, pattern, relative + " contains obsolete CLI guidance");
  }
});
