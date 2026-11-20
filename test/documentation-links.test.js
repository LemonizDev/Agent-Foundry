import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const canonicalDocs = [
  "README.md",
  "BOOTSTRAP.md",
  "docs/README.md",
  "docs/USER_GUIDE.md",
  "integrations/README.md",
  "docs/architecture/RESOURCE_MODEL.md",
  "docs/architecture/DISTRIBUTION_AND_VERSIONING.md"
];

test("canonical navigation and user documentation have no broken relative links", async () => {
  const broken = [];
  for (const document of canonicalDocs) {
    const source = await fs.readFile(path.join(root, document), "utf8");
    const base = path.dirname(path.join(root, document));
    for (const match of source.matchAll(/!?\[[^\]]*\]\((?!https?:|#|mailto:)([^)]+)\)/g)) {
      const target = decodeURIComponent(match[1].split("#")[0].split("?")[0]);
      if (!target) continue;
      const resolved = path.resolve(base, target);
      const relative = path.relative(root, resolved);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        broken.push({ document, target, reason: "Escapes repository root" });
        continue;
      }
      try { await fs.access(resolved); }
      catch { broken.push({ document, target, reason: "Target does not exist" }); }
    }
  }
  assert.deepEqual(broken, []);
});
