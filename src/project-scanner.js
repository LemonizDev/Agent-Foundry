import path from "node:path";
import { walk, exists } from "./utils.js";

const SIGNALS = [
  { id: "agent-instructions", label: "Agent instructions", paths: ["AGENTS.md", "CLAUDE.md", ".github/copilot-instructions.md", ".clinerules", ".cursor/rules"] },
  { id: "architecture-context", label: "Architecture context", paths: ["docs/architecture", "ARCHITECTURE.md", "docs/architecture.md"] },
  { id: "project-state", label: "Project state and roadmap", paths: ["PROGRESS.md", "ROADMAP.md", "docs/ROADMAP.md", "CHANGELOG.md"] },
  { id: "testing", label: "Test infrastructure", paths: ["tests", "test", "__tests__", "vitest.config.js", "jest.config.js", "playwright.config.js"] },
  { id: "automation", label: "CI and automation", paths: [".github/workflows", ".gitlab-ci.yml", "azure-pipelines.yml"] },
  { id: "security", label: "Security policy", paths: ["SECURITY.md", "docs/security", "THREAT_MODEL.md"] },
  { id: "commands", label: "Agent command or skill definitions", paths: [".claude/commands", ".opencode/command", ".kilo/commands", ".agents/skills", ".claude/skills"] },
  { id: "model-roster", label: "Model/provider configuration", paths: [".agent-foundry/settings/model-roster.yaml", "model-roster.yaml"] }
];

export async function scanProject(root = process.cwd()) {
  const files = await walk(root);
  const fileSet = new Set(files);
  const found = [];
  for (const signal of SIGNALS) {
    const matches = [];
    for (const candidate of signal.paths) {
      if (fileSet.has(candidate) || files.some(file => file.startsWith(candidate + "/")) || await exists(path.join(root, candidate))) matches.push(candidate);
    }
    found.push({ ...signal, present: matches.length > 0, matches });
  }
  const manifests = ["package.json", "pyproject.toml", "Cargo.toml", "go.mod", "pom.xml", "build.gradle", "composer.json"].filter(file => fileSet.has(file));
  const hosts = [];
  if (fileSet.has("AGENTS.md")) hosts.push("agents-md");
  if (fileSet.has("CLAUDE.md") || files.some(f => f.startsWith(".claude/"))) hosts.push("claude-code");
  if (files.some(f => f.startsWith(".opencode/")) || fileSet.has("opencode.json") || fileSet.has("opencode.jsonc")) hosts.push("opencode");
  if (files.some(f => f.startsWith(".kilo/"))) hosts.push("kilo");
  if (files.some(f => f.startsWith(".clinerules") || f.startsWith(".cline/"))) hosts.push("cline");
  if (files.some(f => f.startsWith(".github/"))) hosts.push("github");
  const projectSignals = [];
  if (files.some(file => /(^|\\/)(shaders?|glsl|webgl|wallpaper)(\\/|$)/i.test(file) || /\\.(glsl|vert|frag|wgsl)$/i.test(file))) projectSignals.push("visual-graphics");
  if (files.some(file => /(^|\\/)(frontend|client|components|pages)(\\/|$)/i.test(file))) projectSignals.push("frontend");
  if (files.some(file => /(^|\\/)(backend|server|api)(\\/|$)/i.test(file))) projectSignals.push("backend");
  if (files.some(file => /(^|\\/)(data|ml|notebooks)(\\/|$)/i.test(file))) projectSignals.push("data");
  if (manifests.some(file => ["pyproject.toml", "Cargo.toml", "go.mod", "pom.xml"].includes(file))) projectSignals.push("backend");
  return { root: path.resolve(root), fileCount: files.length, files, manifests, hosts, capabilities: found, projectSignals: [...new Set(projectSignals)] };
}

export function classifyCapabilities(scan) {
  const actions = {
    "agent-instructions": capability => capability.present ? "EXTEND" : "INSTALL",
    "architecture-context": capability => capability.present ? "LINK" : "DEFER",
    "project-state": capability => capability.present ? "LINK" : "DEFER",
    testing: capability => capability.present ? "KEEP" : "ASSESS_GAP",
    automation: capability => capability.present ? "KEEP" : "DEFER",
    security: capability => capability.present ? "KEEP" : "INSTALL",
    commands: capability => capability.present ? "ADAPT" : "INSTALL",
    "model-roster": capability => capability.present ? "KEEP" : "CREATE_TEMPLATE"
  };
  return scan.capabilities.map(capability => ({
    capability: capability.id,
    label: capability.label,
    action: (actions[capability.id] ?? (item => item.present ? "KEEP" : "ASSESS_GAP"))(capability),
    evidence: capability.matches
  }));
}
