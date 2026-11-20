import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";
import { resolveResources } from "./registry.js";
import { scanProject } from "./project-scanner.js";
import { renderHostArtifacts } from "./host-adapters.js";
import { validateModelRoster } from "./model-router.js";
import { FOUNDARY_DIR, assertNoSymlinkPath, atomicWrite, exists, mergeInstruction, safeRelative, sha256, walk } from "./utils.js";

const CORE_BASELINE = [
  "global-instructions", "engineering-principles", "agent-communication", "context-management",
  "security-boundaries", "decision-making", "evidence-and-verification", "documentation-governance"
];

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

export function resourcesForPreset(preset, scan) {
  let requested;
  if (preset === "auto") {
    requested = [
      ...PRESETS["autonomous-engineer"],
      ...(scan.projectSignals.includes("visual-graphics") ? PRESETS["visual-engineer"].filter(id => ["visual-regression", "visual-probe-engineering", "visual-quality-engineer", "graphics-engineer", "creative-director", "performance-qa"].includes(id)) : [])
    ];
  } else {
    requested = PRESETS[preset];
    if (!requested) throw new Error("Unknown preset: " + preset + ". Available presets: " + Object.keys(PRESETS).join(", ") + ", auto");
  }
  return [...new Set([...CORE_BASELINE, ...requested])];
}

async function fetchSource(repository, ref, resource, fetchText) {
  const url = "https://raw.githubusercontent.com/" + repository + "/" + encodeURIComponent(ref) + "/" + resource.path;
  const response = await fetchText(url);
  if (!response.ok) throw new Error("Failed to fetch " + resource.id + " (" + response.status + ")");
  return response.text();
}

export async function buildPlan({ root = process.cwd(), registry, resources, preset = "auto", repository, ref, hosts = [] } = {}) {
  const projectFiles = await walk(root);
  const existing = new Set(projectFiles);
  const scan = await scanProject(root, { hosts });
  const requestedResources = resources ?? resourcesForPreset(preset, scan);
  const selected = resolveResources(registry, requestedResources);
  const planned = await Promise.all(selected.map(async resource => {
    const destination = path.posix.join(FOUNDARY_DIR, "resources", resource.path);
    const conflict = existing.has(destination) || await exists(path.join(root, destination));
    return { id: resource.id, type: resource.type, description: resource.description, source: resource.path, destination, version: resource.version, status: resource.status ?? "unknown", action: conflict ? "CONFLICT_CHECK" : "ADD" };
  }));
  const hostResources = [];
  for (const resource of selected.filter(item => ["skill", "command", "profile"].includes(item.type))) {
    for (const artifact of renderHostArtifacts(resource, "", scan.hosts)) {
      const conflict = existing.has(artifact.installed_path) || await exists(path.join(root, artifact.installed_path));
      hostResources.push({ id: artifact.id, source: artifact.source_path, destination: artifact.installed_path, adapter_kind: artifact.adapter_kind, alias: artifact.alias, version: artifact.version, action: conflict ? "CONFLICT_CHECK" : "ADD" });
    }
  }
  return {
    schema_version: 1,
    foundry: { repository, requested_ref: ref, ref: registry.resolved_ref ?? registry.commit_sha ?? ref, commit_sha: registry.commit_sha ?? null },
    project_root: path.resolve(root),
    selected_resource_ids: selected.map(item => item.id),
    preset,
    detected_hosts: scan.hosts,
    resources: planned,
    host_resources: hostResources,
    project_entrypoint: existing.has("AGENTS.md") ? "AGENTS.md (additive pointer block)" : "AGENTS.md (new)",
    settings: [".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"],
    safety: ["No existing project file will be overwritten.", "Existing agent instruction files are preserved.", "Host-specific commands and skills are generated only for detected hosts.", "Conflicts stop installation by default; --skip-conflicts leaves existing paths untouched."]
  };
}

export async function applyPlan(plan, { root = plan.project_root, registry, fetchText = globalThis.fetch, skipConflicts = false } = {}) {
  const base = path.resolve(root);
  const foundryDir = path.join(base, FOUNDARY_DIR);
  await assertNoSymlinkPath(base, FOUNDARY_DIR + "/manifest.json");
  if (await exists(path.join(foundryDir, "manifest.json"))) throw new Error("Agent Foundry is already installed. Use update after reviewing local modifications.");
  const entrypointPaths = ["AGENTS.md"];
  if (plan.detected_hosts.includes("claude-code")) entrypointPaths.push("CLAUDE.md");
  if (plan.detected_hosts.includes("cline")) {
    const clinerules = path.join(base, ".clinerules");
    if (await exists(clinerules) && (await fs.stat(clinerules)).isFile()) entrypointPaths.push(".clinerules");
    else entrypointPaths.push(".clinerules/agent-foundry.md");
  }
  const activeResources = [];
  const activeHostResources = [];
  for (const item of plan.resources) {
    await assertNoSymlinkPath(base, item.destination);
    const file = path.join(base, safeRelative(item.destination));
    if (await exists(file)) {
      if (skipConflicts) continue;
      throw new Error("Refusing to overwrite existing file: " + item.destination + ". Review the plan or rerun with --skip-conflicts.");
    }
    activeResources.push(item);
  }
  for (const item of plan.host_resources ?? []) {
    await assertNoSymlinkPath(base, item.destination);
    const file = path.join(base, safeRelative(item.destination));
    if (await exists(file)) {
      if (skipConflicts) continue;
      throw new Error("Refusing to overwrite existing host file: " + item.destination + ". Review the plan or rerun with --skip-conflicts.");
    }
    activeHostResources.push(item);
  }
  const protectedDestinations = [".agent-foundry/instructions.md", ".agent-foundry/README.md", ".agent-foundry/settings/foundry-settings.yaml", ".agent-foundry/settings/model-roster.yaml"];
  for (const rel of protectedDestinations) {
    await assertNoSymlinkPath(base, rel);
    if (await exists(path.join(base, safeRelative(rel)))) throw new Error("Refusing to overwrite existing file: " + rel);
  }

  const staged = [];
  const sourceById = new Map();
  const sourceIds = [...new Set([...activeResources, ...activeHostResources].map(item => item.id))];
  for (const id of sourceIds) {
    const resource = registry.resources.find(entry => entry.id === id);
    if (!resource) throw new Error("Resource missing from registry: " + id);
    sourceById.set(id, await fetchSource(plan.foundry.repository, plan.foundry.ref, resource, fetchText));
  }
  for (const item of activeResources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    const content = sourceById.get(item.id);
    staged.push({ id: item.id, source_path: resource.path, installed_path: item.destination, version: resource.version, content, source_sha256: sha256(content), installed_sha256: sha256(content) });
  }
  for (const item of activeHostResources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    const source = sourceById.get(item.id);
    const artifact = renderHostArtifacts(resource, source, plan.detected_hosts).find(x => x.installed_path === item.destination && x.adapter_kind === item.adapter_kind);
    if (!artifact) throw new Error("Unable to generate host artifact: " + item.destination);
    staged.push({ ...artifact, content: artifact.content, source_sha256: sha256(source), installed_sha256: sha256(artifact.content) });
  }
  const fetchTemplate = async name => {
    const url = "https://raw.githubusercontent.com/" + plan.foundry.repository + "/" + encodeURIComponent(plan.foundry.ref) + "/templates/" + name;
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
    ...(staged.some(item => item.id === "global-instructions") ? ["Before meaningful work, read .agent-foundry/resources/core/GLOBAL_INSTRUCTIONS.md and the relevant installed core standards."] : ["The global instruction resource was not installed because its destination was skipped or conflicted. Follow the project\u0027s existing instructions and resolve the conflict before relying on the Foundry baseline."]),
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
  const createdFiles = [];
  const backups = new Map();
  const writeOwned = async (rel, content, preserveExisting = false) => {
    await assertNoSymlinkPath(base, rel);
    const file = path.join(base, safeRelative(rel));
    const existed = await exists(file);
    if (existed && preserveExisting && !backups.has(rel)) backups.set(rel, await fs.readFile(file, "utf8"));
    await atomicWrite(file, content);
    if (!existed) createdFiles.push(file);
  };
  const entrypoints = [];
  const readme = "# Agent Foundry in this project\n\nRead instructions.md for the project entrypoint. manifest.json records installed resources and source revision. Settings are project-owned. Existing project instructions take precedence.\n";
  const manifest = {
    manifest_version: 1,
    foundry_version: registry.foundry_version ?? "0.5.0-dev.1",
    preset: plan.preset,
    source: plan.foundry,
    detected_hosts: plan.detected_hosts,
    installed_at: new Date().toISOString(),
    entrypoints,
    installed_resources: staged.map(({ content, ...item }) => item),
    managed_files: [
      { path: ".agent-foundry/instructions.md", installed_sha256: sha256(instructions) },
      { path: ".agent-foundry/README.md", installed_sha256: sha256(readme) }
    ],
    settings: settings.map(item => ({ path: item.path, installed_sha256: sha256(item.content), template: true }))
  };
  try {
    // All remote resources and templates are fetched and validated before the first project write.
    for (const item of staged) await writeOwned(item.installed_path, item.content);
    await writeOwned(".agent-foundry/instructions.md", instructions);
    for (const item of settings) await writeOwned(item.path, item.content);
    await writeOwned(".agent-foundry/README.md", readme);
    for (const rel of entrypointPaths) {
      const file = path.join(base, rel);
      const existed = await exists(file);
      const original = existed ? await fs.readFile(file, "utf8") : "";
      const merged = mergeInstruction(original);
      const markerStart = merged.indexOf("<!-- agent-foundry:start -->");
      const markerEnd = merged.indexOf("<!-- agent-foundry:end -->") + "<!-- agent-foundry:end -->".length;
      const markerHash = sha256(merged.slice(markerStart, markerEnd));
      await writeOwned(rel, merged, true);
      entrypoints.push({ path: rel, created: !existed, marker_sha256: markerHash });
    }
    await writeOwned(".agent-foundry/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
  } catch (error) {
    for (const file of createdFiles.reverse()) await fs.rm(file, { force: true }).catch(() => {});
    for (const [rel, content] of backups) await atomicWrite(path.join(base, safeRelative(rel)), content).catch(() => {});
    throw new Error("Installation failed and created files were rolled back: " + error.message);
  }
  return { manifest, installed_count: activeResources.length, host_artifact_count: activeHostResources.length, skipped_conflicts: plan.resources.length - activeResources.length + (plan.host_resources ?? []).length - activeHostResources.length, entrypoint_created: entrypoints[0]?.created ?? false };
}

export async function validateInstallation(root = process.cwd()) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  await assertNoSymlinkPath(base, FOUNDARY_DIR + "/manifest.json");
  if (!await exists(manifestPath)) throw new Error("No Agent Foundry installation found.");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  if (manifest.manifest_version !== 1 || !Array.isArray(manifest.installed_resources)) throw new Error("Unsupported or malformed installation manifest.");
  const issues = [], warnings = [];
  for (const item of manifest.installed_resources) {
    const file = path.join(base, safeRelative(item.installed_path));
    try { await assertNoSymlinkPath(base, item.installed_path); } catch (error) { issues.push({ path: item.installed_path, issue: "SYMLINK_BLOCKED", detail: error.message }); continue; }
    if (!await exists(file)) { issues.push({ path: item.installed_path, issue: "MISSING" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) warnings.push({ path: item.installed_path, issue: "OWNER_MODIFIED", note: "Local changes are preserved and will block automatic updates." });
  }
  for (const item of manifest.settings ?? []) {
    const file = path.join(base, safeRelative(item.path));
    try { await assertNoSymlinkPath(base, item.path); } catch (error) { issues.push({ path: item.path, issue: "SYMLINK_BLOCKED", detail: error.message }); continue; }
    if (!await exists(file)) issues.push({ path: item.path, issue: "MISSING" });
    else if (sha256(await fs.readFile(file)) !== item.installed_sha256) warnings.push({ path: item.path, issue: "OWNER_CONFIGURED", note: "Project-owned settings differ from the original template." });
  }
  for (const file of ["instructions.md", "manifest.json"]) {
    try { await assertNoSymlinkPath(base, FOUNDARY_DIR + "/" + file); } catch (error) { issues.push({ path: FOUNDARY_DIR + "/" + file, issue: "SYMLINK_BLOCKED", detail: error.message }); continue; }
    if (!await exists(path.join(base, FOUNDARY_DIR, file))) issues.push({ path: FOUNDARY_DIR + "/" + file, issue: "MISSING" });
  }

  const rosterPath = path.join(base, FOUNDARY_DIR, "settings/model-roster.yaml");
  let rosterSafe = true;
  try { await assertNoSymlinkPath(base, FOUNDARY_DIR + "/settings/model-roster.yaml"); } catch (error) { rosterSafe = false; issues.push({ path: rosterPath, issue: "SYMLINK_BLOCKED", detail: error.message }); }
  if (rosterSafe && await exists(rosterPath)) {
    try {
      const roster = yaml.load(await fs.readFile(rosterPath, "utf8"));
      for (const issue of validateModelRoster(roster)) issues.push({ path: rosterPath + ":" + issue.path, issue: issue.issue });
    } catch (error) { issues.push({ path: rosterPath, issue: "INVALID_YAML", detail: error.message }); }
  }
  const settingsPath = path.join(base, FOUNDARY_DIR, "settings/foundry-settings.yaml");
  let settingsSafe = true;
  try { await assertNoSymlinkPath(base, FOUNDARY_DIR + "/settings/foundry-settings.yaml"); } catch (error) { settingsSafe = false; issues.push({ path: settingsPath, issue: "SYMLINK_BLOCKED", detail: error.message }); }
  if (settingsSafe && await exists(settingsPath)) {
    try {
      const settings = yaml.load(await fs.readFile(settingsPath, "utf8"));
      if (!settings || settings.schema_version !== 1) issues.push({ path: settingsPath, issue: "INVALID_SCHEMA_VERSION" });
      const allowed = ["free", "paid", "local", "enterprise"];
      for (const key of ["allowed_access", "preferred_access"]) {
        const values = settings.model_selection?.[key] ?? [];
        if (!Array.isArray(values) || values.some(value => !allowed.includes(value))) issues.push({ path: settingsPath + ":model_selection." + key, issue: "INVALID_ACCESS_POLICY" });
      }
      const latency = settings.model_selection?.max_latency_ms;
      if (latency != null && (!Number.isFinite(latency) || latency <= 0)) issues.push({ path: settingsPath + ":model_selection.max_latency_ms", issue: "INVALID_LATENCY_LIMIT" });
    } catch (error) { issues.push({ path: settingsPath, issue: "INVALID_YAML", detail: error.message }); }
  }
  return { valid: issues.length === 0, resource_count: manifest.installed_resources.length, issues, warnings, manifest };
}

export async function updateInstallation({ root = process.cwd(), registry, fetchText = globalThis.fetch, apply = false } = {}) {
  const base = path.resolve(root);
  const manifestPath = path.join(base, FOUNDARY_DIR, "manifest.json");
  await assertNoSymlinkPath(base, FOUNDARY_DIR + "/manifest.json");
  const manifestOriginal = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestOriginal);
  const changed = [], conflicts = [];
  for (const item of manifest.installed_resources) {
    const resource = registry.resources.find(entry => entry.id === item.id);
    if (!resource) { conflicts.push({ id: item.id, reason: "Resource no longer exists in registry" }); continue; }
    const file = path.join(base, safeRelative(item.installed_path));
    try { await assertNoSymlinkPath(base, item.installed_path); } catch (error) { conflicts.push({ id: item.id, reason: error.message }); continue; }
    if (!await exists(file)) { conflicts.push({ id: item.id, reason: "Installed file is missing" }); continue; }
    const current = sha256(await fs.readFile(file));
    if (current !== item.installed_sha256) { conflicts.push({ id: item.id, reason: "Local modifications detected" }); continue; }
    const source = await fetchSource(registry.repository, registry.resolved_ref ?? registry.commit_sha ?? registry.ref, resource, fetchText);
    let content = source;
    if (item.adapter_kind) {
      const artifact = renderHostArtifacts(resource, source, manifest.detected_hosts ?? []).find(x => x.installed_path === item.installed_path && x.adapter_kind === item.adapter_kind);
      if (!artifact) { conflicts.push({ id: item.id, reason: "Unable to regenerate host adapter artifact" }); continue; }
      content = artifact.content;
    }
    if (sha256(source) !== item.source_sha256 || sha256(content) !== item.installed_sha256) changed.push({ item, resource, content, source });
  }
  if (conflicts.length) return { updated: 0, planned: changed.map(x => ({ id: x.item.id, path: x.item.installed_path, version: x.resource.version })), conflicts, pending: changed.map(x => x.item.id) };
  if (!apply) return { updated: 0, planned: changed.map(x => ({ id: x.item.id, path: x.item.installed_path, version: x.resource.version })), conflicts: [], pending: [] };
  const backups = [];
  try {
    for (const change of changed) {
      const file = path.join(base, safeRelative(change.item.installed_path));
      backups.push({ file, content: await fs.readFile(file, "utf8") });
      await atomicWrite(file, change.content);
      change.item.version = change.resource.version;
      change.item.source_sha256 = sha256(change.source);
      change.item.installed_sha256 = sha256(change.content);
    }
    manifest.source.requested_ref = registry.ref;
    manifest.source.ref = registry.resolved_ref ?? registry.commit_sha ?? registry.ref;
    manifest.source.commit_sha = registry.commit_sha ?? null;
    manifest.foundry_version = registry.foundry_version ?? manifest.foundry_version;
    manifest.updated_at = new Date().toISOString();
    await atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  } catch (error) {
    for (const backup of backups.reverse()) await atomicWrite(backup.file, backup.content).catch(() => {});
    await atomicWrite(manifestPath, manifestOriginal).catch(() => {});
    throw new Error("Update failed and modified files were rolled back: " + error.message);
  }
  return { updated: changed.length, planned: changed.map(x => ({ id: x.item.id, path: x.item.installed_path, version: x.resource.version })), conflicts: [], pending: [] };
}

// Remove only directories that became empty because Foundry removed its own files.
async function pruneEmptyParents(base, relativePaths) {
  for (const relative of relativePaths) {
    let current = path.dirname(path.join(base, safeRelative(relative)));
    while (current.startsWith(base + path.sep)) {
      try { await fs.rmdir(current); } catch { break; }
      current = path.dirname(current);
    }
  }
}

export async function uninstall(root = process.cwd(), { apply = false } = {}) {
  const base = path.resolve(root);
  const dir = path.join(base, FOUNDARY_DIR);
  await assertNoSymlinkPath(base, FOUNDARY_DIR + "/manifest.json");
  const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
  const removed = [], preserved = [], managedFileActions = [], settingsActions = [];
  for (const item of manifest.installed_resources ?? []) {
    const file = path.join(base, safeRelative(item.installed_path));
    try { await assertNoSymlinkPath(base, item.installed_path); } catch { preserved.push(item.installed_path); continue; }
    if (!await exists(file)) continue;
    if (sha256(await fs.readFile(file)) === item.installed_sha256) removed.push(item.installed_path);
    else preserved.push(item.installed_path);
  }
  for (const item of manifest.settings ?? []) {
    const file = path.join(base, safeRelative(item.path));
    try { await assertNoSymlinkPath(base, item.path); } catch { settingsActions.push({ path: item.path, action: "PRESERVE_SYMLINK" }); continue; }
    if (!await exists(file)) continue;
    settingsActions.push({ path: item.path, action: sha256(await fs.readFile(file)) === item.installed_sha256 ? "REMOVE_TEMPLATE" : "PRESERVE_OWNER_EDIT" });
  }
  for (const item of manifest.managed_files ?? []) {
    const file = path.join(base, safeRelative(item.path));
    try { await assertNoSymlinkPath(base, item.path); } catch { managedFileActions.push({ path: item.path, action: "PRESERVE_SYMLINK" }); continue; }
    if (!await exists(file)) continue;
    if (sha256(await fs.readFile(file)) === item.installed_sha256) managedFileActions.push({ path: item.path, action: "REMOVE" });
    else managedFileActions.push({ path: item.path, action: "PRESERVE" });
  }
  const entrypointActions = [];
  for (const entrypoint of manifest.entrypoints ?? [{ path: "AGENTS.md", created: manifest.created_entrypoint }]) {
    const file = path.join(base, safeRelative(entrypoint.path));
    try { await assertNoSymlinkPath(base, entrypoint.path); } catch { entrypointActions.push({ path: entrypoint.path, action: "PRESERVE_SYMLINK" }); continue; }
    if (!await exists(file)) continue;
    const text = await fs.readFile(file, "utf8");
    const startMarker = "<!-- agent-foundry:start -->";
    const endMarker = "<!-- agent-foundry:end -->";
    const start = text.indexOf(startMarker), end = text.indexOf(endMarker);
    if (start >= 0 && end > start) {
      const markerHash = sha256(text.slice(start, end + endMarker.length));
      const unchanged = !entrypoint.marker_sha256 || markerHash === entrypoint.marker_sha256;
      entrypointActions.push({ path: entrypoint.path, action: !unchanged ? "PRESERVE_MODIFIED_MARKER" : entrypoint.created && !((text.slice(0, start) + text.slice(end + endMarker.length)).trim()) ? "REMOVE_FILE" : "REMOVE_MARKED_BLOCK" });
    }
  }
  const preview = { applied: false, removed, preserved, managed_files: managedFileActions, settings: settingsActions, entrypoints: entrypointActions };
  if (!apply) return preview;

  for (const rel of removed) {
    await assertNoSymlinkPath(base, rel);
    await fs.rm(path.join(base, safeRelative(rel)), { force: true });
  }
  for (const entrypoint of manifest.entrypoints ?? [{ path: "AGENTS.md", created: manifest.created_entrypoint }]) {
    const file = path.join(base, safeRelative(entrypoint.path));
    try { await assertNoSymlinkPath(base, entrypoint.path); } catch { continue; }
    if (!await exists(file)) continue;
    const text = await fs.readFile(file, "utf8");
    const startMarker = "<!-- agent-foundry:start -->";
    const endMarker = "<!-- agent-foundry:end -->";
    const start = text.indexOf(startMarker), end = text.indexOf(endMarker);
    if (start >= 0 && end > start) {
      const markerHash = sha256(text.slice(start, end + endMarker.length));
      if (entrypoint.marker_sha256 && markerHash !== entrypoint.marker_sha256) continue;
      const next = (text.slice(0, start) + text.slice(end + endMarker.length)).trim() + "\n";
      if (entrypoint.created && !next.trim()) await fs.rm(file);
      else await atomicWrite(file, next);
    }
  }
  for (const item of managedFileActions) if (item.action === "REMOVE") { await assertNoSymlinkPath(base, item.path); await fs.rm(path.join(base, safeRelative(item.path)), { force: true }); }
  for (const item of settingsActions) if (item.action === "REMOVE_TEMPLATE") { await assertNoSymlinkPath(base, item.path); await fs.rm(path.join(base, safeRelative(item.path)), { force: true }); }
  await assertNoSymlinkPath(base, FOUNDARY_DIR + "/manifest.json");
  await fs.rm(path.join(dir, "manifest.json"), { force: true });
  const removedPaths = [
    ...removed,
    ...managedFileActions.filter(item => item.action === "REMOVE").map(item => item.path),
    ...settingsActions.filter(item => item.action === "REMOVE_TEMPLATE").map(item => item.path),
    FOUNDARY_DIR + "/manifest.json"
  ];
  await pruneEmptyParents(base, removedPaths);
  const leftovers = await walk(dir);
  return { ...preview, applied: true, remaining_owner_files: leftovers, note: "Locally modified resources, owner-edited settings and modified Foundry files were preserved; unchanged templates were removed." };
}
