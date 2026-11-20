import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import yaml from "js-yaml";

const root = process.cwd();
const SKIP = new Set([".git", "node_modules"]);
const issues = [];

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function stripCode(markdown) {
  let fenced = false;
  return markdown.split("\n").map(line => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return ""; }
    return fenced ? "" : line.replace(/`[^`]*`/g, "");
  });
}

const files = await walk(root);
for (const file of files) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (/\.(m?js)$/.test(file)) {
    const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (result.status !== 0) issues.push(rel + ": JavaScript does not parse: " + (result.stderr.split("\n").find(line => /Error/.test(line)) ?? "syntax error"));
  } else if (/\.ya?ml$/.test(file)) {
    try { yaml.load(await fs.readFile(file, "utf8")); }
    catch (error) { issues.push(rel + ": YAML does not parse: " + error.message.split("\n")[0]); }
  } else if (/\.md$/.test(file)) {
    const lines = stripCode(await fs.readFile(file, "utf8"));
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (/\\n/.test(line)) issues.push(rel + ":" + (index + 1) + ": literal \\n sequence outside code (escaping corruption)");
      for (const match of line.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = match[1];
        if (/^(https?:|mailto:|#)/.test(target)) continue;
        const clean = decodeURIComponent(target.split("#")[0]);
        if (!clean) continue;
        const resolved = path.resolve(path.dirname(file), clean);
        try { await fs.access(resolved); }
        catch { issues.push(rel + ":" + (index + 1) + ": broken relative link " + target); }
      }
    }
  }
}
if (issues.length) {
  console.error("Repository lint failed (" + issues.length + " issue" + (issues.length === 1 ? "" : "s") + "):");
  for (const issue of issues) console.error("- " + issue);
  process.exit(1);
}
console.log("Repository lint passed: " + files.length + " files checked (JS syntax, YAML, Markdown escapes and relative links).");
