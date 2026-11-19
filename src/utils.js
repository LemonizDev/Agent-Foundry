import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const FOUNDARY_DIR = ".agent-foundry";
export const MARKER_START = "<!-- agent-foundry:start -->";
export const MARKER_END = "<!-- agent-foundry:end -->";

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

export async function walk(root, relative = "") {
  const base = path.join(root, relative);
  let entries;
  try { entries = await fs.readdir(base, { withFileTypes: true }); } catch { return []; }
  const output = [];
  for (const entry of entries) {
    if ([".git", "node_modules", ".next", "dist", "build", "coverage", ".agent-foundry"].includes(entry.name)) continue;
    const rel = path.posix.join(relative.split(path.sep).join("/"), entry.name);
    if (entry.isDirectory()) output.push(...await walk(root, rel));
    else output.push(rel);
  }
  return output;
}

export function safeRelative(file) {
  const normal = path.posix.normalize(file.replaceAll("\\", "/"));
  const driveQualified = normal.length > 1 && /^[A-Za-z]$/.test(normal[0]) && normal[1] === ":";
  if (normal.startsWith("../") || normal === ".." || path.posix.isAbsolute(normal) || driveQualified) throw new Error("Unsafe repository path: " + file);
  return normal;
}

export async function atomicWrite(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = file + ".agent-foundry-tmp";
  await fs.writeFile(temp, content, "utf8");
  await fs.rename(temp, file);
}

export function instructionBlock() {
  return MARKER_START + "\n## Agent Foundry\n\nRead .agent-foundry/instructions.md when working on this project. It points to the installed, project-selected Foundry resources. Existing project instructions and owner decisions remain authoritative.\n" + MARKER_END;
}

export function mergeInstruction(existing) {
  const block = instructionBlock();
  const start = existing.indexOf(MARKER_START);
  const end = existing.indexOf(MARKER_END);
  if (start >= 0 && end >= start) return existing.slice(0, start) + block + existing.slice(end + MARKER_END.length);
  return existing.trimEnd() + (existing.trim() ? "\n\n" : "") + block + "\n";
}

export async function assertNoSymlinkPath(root, relative) {
  const safe = safeRelative(relative);
  let current = path.resolve(root);
  for (const part of safe.split("/")) {
    current = path.join(current, part);
    try {
      const stat = await fs.lstat(current);
      if (stat.isSymbolicLink()) throw new Error("Refusing to follow symlink in project path: " + relative);
    } catch (error) {
      if (error.code === "ENOENT") break;
      throw error;
    }
  }
}
