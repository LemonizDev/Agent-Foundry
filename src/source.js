import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW_URL = /^https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/(.+)$/;

export async function bundledFetch(url, root = PACKAGE_ROOT) {
  const match = RAW_URL.exec(url);
  if (!match) return { ok: false, status: 400, text: async () => "Not a Foundry resource URL: " + url };
  const relative = match[1];
  const target = path.resolve(root, relative);
  const inside = path.relative(root, target);
  if (inside.startsWith("..") || path.isAbsolute(inside)) return { ok: false, status: 400, text: async () => "Path escapes the package: " + relative };
  try {
    const content = await fs.readFile(target, "utf8");
    return { ok: true, status: 200, text: async () => content };
  } catch {
    return { ok: false, status: 404, text: async () => "Not found in package: " + relative };
  }
}
