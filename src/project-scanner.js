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
  if (files.some(f => f.startsWith(".opencode/"))) hosts.push("opencode");
  if (files.some(f => f.startsWith(".kilo/"))) hosts.push("kilo");
  if (files.some(f => f.startsWith(".clinerules") || f.startsWith(".cline/"))) hosts.push("cline");
  if (files.some(f => f.startsWith(".github/"))) hosts.push("github");
  return { root: path.resolve(root), fileCount: files.length, files, manifests, hosts, capabilities: found };
}

export function classifyCapabilities(scan) {
  return scan.capabilities.map(capability => ({
    capability: capability.id,
    label: capability.label,
    action: capability.present ? "KEEP_OR_LINK" : "ASSESS_GAP",
    evidence: capability.matches
  }));
}
