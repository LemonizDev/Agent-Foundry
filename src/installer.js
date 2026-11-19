import fs from "node:fs/promises";
import path from "node:path";
import { resolveResources } from "./registry.js";
import { scanProject } from "./project-scanner.js";
import { renderHostArtifacts } from "./host-adapters.js";
import { FOUNDARY_DIR, atomicWrite, exists, mergeInstruction, safeRelative, sha256, walk } from "./utils.js";

const PRESETS = {
  minimal: [
    "atomic-implementation", "project-state-management", "evidence-and-verification",
    "documentation-governance", "session-learning", "close-session", "session-close",
    "progress-report", "lead-engineer"
  ],
  balanced: [
    "atomic-implementation", "repository-audit", "implementation-planning", "debugging",
    "testing-and-verification", "code-review", "architecture-design", "documentation-maintenance",
    "project-state-management", "progress-reporting", "session-learning", "session-recovery",
    "plan-reconciliation", "privacy-safe-evidence", "agent-execution-security",
    "evidence-and-verification", "documentation-governance",
    "progress-report", "teach-implementation", "close-session", "foundry-settings",
    "edit-model-roster", "explain-model-selection", "test-model", "audit", "implement",
    "debug", "review", "verify", "next-task", "project-health", "resume",
    "session-close", "foundry-settings-template", "model-roster-template",
    "progress-report-template", "lead-engineer", "independent-reviewer"
  ],
  "autonomous-engineer": [
    "atomic-implementation", "repository-audit", "implementation-planning", "debugging",
    "testing-and-verification", "code-review", "architecture-design", "documentation-maintenance",
    "project-state-management", "progress-reporting", "session-learning", "session-recovery",
    "multi-agent-delegation", "multi-agent-campaign", "plan-reconciliation",
    "privacy-safe-evidence", "agent-execution-security",
    "evidence-and-verification", "documentation-governance",
    "progress-report", "teach-implementation", "close-session", "foundry-settings",
    "edit-model-roster", "explain-model-selection", "test-model", "audit", "implement",
    "debug", "review", "verify", "delegate", "next-task", "project-health", "resume",
    "session-close", "foundry-settings-template", "model-roster-template",
    "progress-report-template", "delegation-assignment", "recovery-handoff",
    "decision-register", "test-evidence-report", "blocker-register",
    "lead-engineer", "independent-reviewer"
  ],
  "visual-engineer": [
    "atomic-implementation", "repository-audit", "implementation-planning", "debugging",
    "testing-and-verification", "code-review", "architecture-design", "documentation-maintenance",
    "project-state-management", "progress-reporting", "session-learning", "session-recovery",
    "multi-agent-delegation", "multi-agent-campaign", "plan-reconciliation",
    "privacy-safe-evidence", "agent-execution-security", "visual-regression",
    "visual-probe-engineering", "visual-quality-engineer", "graphics-engineer",
    "creative-director", "performance-qa", "evidence-and-verification", "documentation-governance",
    "progress-report", "teach-implementation", "close-session", "foundry-settings",
    "edit-model-roster", "explain-model-selection", "test-model", "audit", "implement",
    "debug", "review", "verify", "delegate", "next-task", "project-health", "resume",
    "session-close", "foundry-settings-template", "model-roster-template",
    "progress-report-template", "delegation-assignment", "recovery-handoff",
    "decision-register", "test-evidence-report", "blocker-register",
    "lead-engineer", "independent-reviewer"
  ],
  "research-engineer": [
    "atomic-implementation", "repository-audit", "implementation-planning", "debugging",
    "testing-and-verification", "code-review", "architecture-design", "documentation-maintenance",
    "project-state-management", "progress-reporting", "session-learning", "session-recovery",
    "plan-reconciliation", "privacy-safe-evidence", "agent-execution-security",
    "evidence-and-verification", "documentation-governance",
    "progress-report", "teach-implementation", "close-session", "foundry-settings",
    "edit-model-roster", "explain-model-selection", "test-model", "audit", "implement",
    "debug", "review", "verify", "next-task", "project-health", "resume",
    "session-close", "foundry-settings-template", "model-roster-template",
    "progress-report-template", "lead-engineer", "independent-reviewer"
  ]
};

function resourcesForPreset(preset, scan) {
  if (preset === "auto") {
    return [...PRESETS["autonomous-engineer"], ...(scan.projectSignals.includes("visual-graphics") ? PRESETS["visual-engineer"].filter(id => ["visual-regression", "visual-probe-engineering", "visual-quality-engineer", "graphics-engineer", "creative-director", "performance-qa"].includes(id)) : [])];
  }
  const selected = PRESETS[preset];
  if (!selected) throw new Error("Unknown preset: " + preset + ". Available presets: " + Object.keys(PRESETS).join(", ") + ", auto");
  return selected;
}

async function fetchSource(repository, ref, resource, fetchText) {
  const url = "https://raw.githubusercontent.com/" + repository + "/" + ref + "/" + resource.path;
  const response = await fetchText(url);
  if (!response.ok) throw new Error("Failed to fetch " + resource.id + " (" + response.status + ")");
  return response.text();
}

export async function buildPlan({ root = process.cwd(), registry, resources, preset = "auto", repository, ref } = {}) {
  const projectFiles = await walk(root);
  const existing = new Set(projectFiles);
  const scan = await scanProject(root);
  const requestedResources = resources ?? resourcesForPreset(preset, scan);
  const selected = resolveResources(registry, requestedResources);
  const planned = await Promise.all(selected.map(async resource => {
    const destination = path.posix.join(FOUNDARY_DIR, "resources", resource.path);
    const conflict = existing.has(destination) || await exists(path.join(root, destination));
    return { id: resource.id, type: resource.type, source: resource.path, destination, version: resource.version, action: conflict ? "CONFLICT_CHECK" : "ADD" };
  }));
  const hostResources = [];
  for (const resource of selected.filter(item => ["skill", "command"].includes(item.type))) {
    for (const artifact of renderHostArtifacts(resource, "", scan.hosts)) {
      const conflict = existing.has(artifact.installed_path) || await exists(path.join(root, artifact.installed_path));
      hostResources.push({ id: artifact.id, source: artifact.source_path, destination: artifact.installed_path, adapter_kind: artifact.adapter_kind, alias: artifact.alias, version: artifact.version, action: conflict ? "CONFLICT_CHECK" : "ADD" });
    }
  }
  return {
    schema_version: 1,
    foundry: { repository, ref },
    project_root: path.resolve(root),
    selected_resource_ids: selected.map(item => item.id),
    preset,
    detected_hosts: scan.hosts,
    resources: planned,
    host_resources: hostResources,
    project_entrypoint: existing.has("AGENTS.md") ? "AGENTS.md (additive pointer block)" : "AGENTS.md (new)",
    settings: [".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"],
    safety: ["No existing project file will be overwritten.", "Existing agent instruction files are preserved.", "Host-specific commands and skills are generated only for detected hosts.", "Conflicts stop installation and require owner resolution."]
  };
}

export async function applyPlan(plan, { root = plan.project_root, registry, fetchText = globalThis.fetch } = {}) {
  const base = path.resolve(root);
  const foundryDir = path.join(base, FOUNDARY_DIR);
  if (await exists(path.join(foundryDir, "manifest.json"))) throw new Error("Agent Foundry is already installed. Use update after reviewing local modifications.");
  const entrypointPaths = ["AGENTS.md", ...(plan.detected_hosts.includes("claude-code") && await exists(path.join(base, "CLAUDE.md")) ? ["CLAUDE.md"] : [])];
  const destinations = [...plan.resources.map(x => x.destination), ...(plan.host_resources ?? []).map(x => x.destination), ".agent-foundry/instructions.md", ".agent-foundry/README.md", ".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"];
  for (const rel of destinations) if (await exists(path.join(base, safeRelative(rel)))) throw new Error("Refusing to overwrite existing file: " + rel);

  const staged = [];
  const sourceById = new Map();
  for (const item of plan.resources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    if (!resource) throw new Error("Resource missing from registry: " + item.id);
    const content = await fetchSource(plan.foundry.repository, plan.foundry.ref, resource, fetchText);
    sourceById.set(item.id, content);
    staged.push({ id: item.id, source_path: resource.path, installed_path: item.destination, version: resource.version, content, source_sha256: sha256(content), installed_sha256: sha256(content) });
  }
  for (const item of plan.host_resources ?? []) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    const source = sourceById.get(item.id);
    const artifact = renderHostArtifacts(resource, source, plan.detected_hosts).find(x => x.installed_path === item.destination && x.adapter_kind === item.adapter_kind);
    if (!artifact) throw new Error("Unable to generate host artifact: " + item.destination);
    staged.push({ ...artifact, content: artifact.content, source_sha256: sha256(source), installed_sha256: sha256(artifact.content) });
  }
  const fetchTemplate = async name => {
    const url = "https://raw.githubusercontent.com/" + plan.foundry.repository + "/" + plan.foundry.ref + "/templates/settings/" + name;
    const response = await fetchText(url);
    if (!response.ok) throw new Error("Unable to fetch Foundry settings template: " + name);
    return response.text();
  };
  const settings = [
    { path: ".agent-foundry/settings/foundry-settings.yaml", content: await fetchTemplate("foundry-settings.yaml") },
    { path: ".agent-foundry/settings/model-roster.yaml", content: await fetchTemplate("model-roster.yaml") }
  ];
  const instructions = [
    "# Agent Foundry project instructions", "",
    "This project has selected Agent Foundry resources installed under .agent-foundry/resources/.",
    "Read only the selected resources relevant to the current task. Do not load every resource on every turn.",
    "The project's own architecture, instructions, owner decisions and security constraints remain authoritative.", "",
    "## Installed resources",
    ...staged.map(item => "- " + item.id + " -> " + item.installed_path),
    "", "## Session discipline",
    "- Inspect the project and working tree before editing.",
    "- Use evidence-backed completion claims.",
    "- Preserve existing project work and ask before destructive or externally consequential actions.",
    "- Use the close-session command to capture durable learnings in the correct context files; do not create a transcript dump.",
    "- Native command and skill files are generated for detected hosts; check the installation manifest for exact paths."
  ].join("\n") + "\n";
  const entrypoints = [];
  for (const rel of entrypointPaths) {
    const file = path.join(base, rel);
    const existed = await exists(file);
    const original = existed ? await fs.readFile(file, "utf8") : "";
    await atomicWrite(file, mergeInstruction(original));
    entrypoints.push({ path: rel, created: !existed });
  }

  // All remote content and path conflicts are checked before the first project write.
  for (const item of staged) await atomicWrite(path.join(base, safeRelative(item.installed_path)), item.content);
  await atomicWrite(path.join(foundryDir, "instructions.md"), instructions);
  for (const item of settings) await atomicWrite(path.join(base, item.path), item.content);

  const manifest = {
    manifest_version: 1,
    foundry_version: "0.4.0",
    preset: plan.preset,
    source: plan.foundry,
    detected_hosts: plan.detected_hosts,
    installed_at: new Date().toISOString(),
    entrypoints,
    installed_resources: staged.map(({ content, ...item }) => item),
    settings: settings.map(item => ({ path: item.path, installed_sha256: sha256(item.content), template: true }))
  };
  await atomicWrite(path.join(foundryDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  const readme = "# Agent Foundry in this project\n\nRead instructions.md for the project entrypoint. manifest.json records installed resources and source revision. Settings are project-owned. Existing project instructions take precedence.\n";
  await atomicWrite(path.join(foundryDir, "README.md"), readme);
  return { manifest, installed_count: plan.resources.length, host_artifact_count: (plan.host_resources ?? []).length, entrypoint_created: entrypoints[0]?.created ?? false };
}

export async function validateInstallation(root = process.cwd()) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  if (!await exists(manifestPath)) throw new Error("No Agent Foundry installation found.");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  if (manifest.manifest_version !== 1 || !Array.isArray(manifest.installed_resources)) throw new Error("Unsupported or malformed installation manifest.");
  const issues = [];
  for (const item of manifest.installed_resources) {
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) { issues.push({ path: item.installed_path, issue: "MISSING" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) issues.push({ path: item.installed_path, issue: "LOCALLY_MODIFIED", current_sha256: current });
  }
  for (const item of manifest.settings ?? []) {
    const file = path.join(base, safeRelative(item.path));
    if (!await exists(file)) issues.push({ path: item.path, issue: "MISSING" });
    
  }
  for (const file of ["instructions.md", "manifest.json"]) if (!await exists(path.join(base, FOUNDARY_DIR, file))) issues.push({ path: FOUNDARY_DIR + "/" + file, issue: "MISSING" });
  return { valid: issues.length === 0, resource_count: manifest.installed_resources.length, issues, manifest };
}

export async function updateInstallation({ root = process.cwd(), registry } = {}) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const changed = [], conflicts = [];
  for (const item of manifest.installed_resources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    if (!resource) { conflicts.push({ id: item.id, reason: "Resource no longer exists in registry" }); continue; }
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) { conflicts.push({ id: item.id, reason: "Installed file is missing" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) { conflicts.push({ id: item.id, reason: "Local modifications detected" }); continue; }
    const source = await fetchSource(registry.repository, registry.ref, resource, globalThis.fetch);
    let content = source;
    if (item.adapter_kind) {
      const artifact = renderHostArtifacts(resource, source, manifest.detected_hosts ?? []).find(x => x.installed_path === item.installed_path && x.adapter_kind === item.adapter_kind);
      if (!artifact) { conflicts.push({ id: item.id, reason: "Unable to regenerate host adapter artifact" }); continue; }
      content = artifact.content;
    }
    if (sha256(source) !== item.source_sha256 || sha256(content) !== item.installed_sha256) changed.push({ item, resource, content, source });
  }
  if (conflicts.length) return { updated: 0, conflicts, pending: changed.map(x => x.item.id) };
  for (const change of changed) {
    await atomicWrite(path.join(base, safeRelative(change.item.installed_path)), change.content);
    change.item.version = change.resource.version;
    change.item.source_sha256 = sha256(change.source);
    change.item.installed_sha256 = sha256(change.content);
  }
  manifest.source.ref = registry.ref;
  manifest.updated_at = new Date().toISOString();
  await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  return { updated: changed.length, conflicts: [], pending: [] };
}

export async function uninstall(root = process.cwd()) {
  const base = path.resolve(root);
  const dir = path.join(base, FOUNDARY_DIR);
  const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
  const removed = [], preserved = [];
  for (const item of manifest.installed_resources ?? []) {
    const file = path.join(base, safeRelative(item.installed_path));
    if (!await exists(file)) continue;
    if (sha256(await fs.readFile(file)) === item.installed_sha256) { await fs.rm(file); removed.push(item.installed_path); }
    else preserved.push(item.installed_path);
  }
  for (const entrypoint of manifest.entrypoints ?? [{ path: "AGENTS.md", created: manifest.created_entrypoint }]) {
    const file = path.join(base, safeRelative(entrypoint.path));
    if (!await exists(file)) continue;
    const text = await fs.readFile(file, "utf8");
    const startMarker = "<!-- agent-foundry:start -->";
    const endMarker = "<!-- agent-foundry:end -->";
    const start = text.indexOf(startMarker), end = text.indexOf(endMarker);
    if (start >= 0 && end > start) {
      const next = (text.slice(0, start) + text.slice(end + endMarker.length)).trim() + "\n";
      if (entrypoint.created && !next.trim()) await fs.rm(file);
      else await atomicWrite(file, next);
    }
  }
  for (const rel of [".agent-foundry/instructions.md", ".agent-foundry/README.md", ".agent-foundry/manifest.json"]) {
    const file = path.join(base, rel);
    if (await exists(file)) await fs.rm(file);
  }
  // Preserve settings and any owner-authored files. Empty directories are harmless.
  const leftovers = await walk(dir);
  return { removed, preserved, remaining_owner_files: leftovers, note: "Project-owned settings and modified resources are preserved." };
}
