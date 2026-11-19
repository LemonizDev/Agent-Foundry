#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs/promises";
import yaml from "js-yaml";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { loadRegistry } from "../src/registry.js";
import { scanProject, classifyCapabilities } from "../src/project-scanner.js";
import { buildPlan, applyPlan, validateInstallation, updateInstallation, uninstall } from "../src/installer.js";
import { classifyTask, selectModel, validateModelRoster } from "../src/model-router.js";

const VERSION = "0.4.0";
const args = process.argv.slice(2);
const command = args[0] ?? "help";
const option = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const has = name => args.includes(name);
const root = path.resolve(option("--project", process.cwd()));
const repository = option("--repository", "LemonizDev/Agent-Foundry");
const ref = option("--ref", "main");
const hostOverrides = (option("--hosts", "") || "").split(",").map(x => x.trim()).filter(Boolean);

function help() {
  console.log("Agent Foundry v" + VERSION + "\nA project-aware engineering environment for AI coding agents.\n\nUsage:\n  agent-foundry init [--project PATH] [--preset auto|minimal|balanced|autonomous-engineer|visual-engineer|research-engineer] [--resources id,id] [--hosts host,host] [--apply] [--skip-conflicts]\n  agent-foundry inspect [--project PATH]\n  agent-foundry validate [--project PATH]\n  agent-foundry update [--project PATH] [--ref REF] [--apply]\n  agent-foundry uninstall [--project PATH] [--apply]\n  agent-foundry list\n  agent-foundry route --task TASK_DESCRIPTION\n  agent-foundry settings\n  agent-foundry version\n\ninit is plan-only by default. Review the plan, then repeat with --apply.\nExisting files are never silently overwritten.");
}

async function ask(question) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try { return (await rl.question(question)).trim().toLowerCase(); } finally { rl.close(); }
}

try {
  if (["help", "--help", "-h"].includes(command)) help();
  else if (["version", "--version"].includes(command)) console.log(VERSION);
  else if (command === "inspect") {
    const scan = await scanProject(root, { hosts: hostOverrides });
    const result = { root: scan.root, fileCount: scan.fileCount, manifests: scan.manifests, hosts: scan.hosts, projectSignals: scan.projectSignals, capabilities: classifyCapabilities(scan) };
    console.log(JSON.stringify(result, null, 2));
  } else if (command === "list") {
    const registry = await loadRegistry({ repository, ref });
    for (const item of registry.resources) console.log(item.id.padEnd(32) + " " + item.type.padEnd(14) + " " + item.version + "  " + item.portability + "\n  " + item.description);
  } else if (command === "init") {
    const registry = await loadRegistry({ repository, ref });
    const scan = await scanProject(root);
    const selected = option("--resources", "").split(",").map(x => x.trim()).filter(Boolean);
    const preset = option("--preset", "auto");
    const plan = await buildPlan({ root, registry, resources: selected.length ? selected : undefined, preset, repository, ref });
    console.log("PROJECT ASSESSMENT");
    console.log("Root: " + scan.root + "\nFiles inspected: " + scan.fileCount + "\nDetected hosts: " + (scan.hosts.join(", ") || "none") + "\nProject signals: " + (scan.projectSignals.join(", ") || "general") + "\nPreset: " + plan.preset);
    console.log("\nCAPABILITY MAP");
    for (const item of classifyCapabilities(scan)) console.log("- " + item.label + ": " + item.action + (item.evidence.length ? " (" + item.evidence.join(", ") + ")" : ""));
    console.log("\nINSTALLATION PLAN");
    for (const item of plan.resources) console.log("- " + item.action.padEnd(14) + " " + item.id + " [" + item.status + "] -> " + item.destination + "\n    " + (item.description ?? ""));
    console.log("\nHOST INTEGRATION (" + plan.detected_hosts.join(", ") + ")");
    for (const item of plan.host_resources ?? []) console.log("- " + item.action.padEnd(14) + " " + item.id + " -> " + item.destination);
    console.log("- ENTRYPOINT      " + plan.project_entrypoint);
    console.log("- SETTINGS        project-local settings and owner-defined model roster");
    console.log("\nNo files have been changed.");
    if (!has("--apply")) console.log("Review this plan. Run the same command with --apply to install.");
    else {
      const approval = has("--yes") ? "yes" : await ask("Apply this plan? Type 'yes' to continue: ");
      if (approval !== "yes") { console.log("Cancelled. No files changed."); process.exitCode = 1; }
      else {
        const result = await applyPlan(plan, { root, registry, skipConflicts: has("--skip-conflicts") });
        console.log("Installed " + result.installed_count + " source resources and " + result.host_artifact_count + " host artifacts; skipped " + result.skipped_conflicts + " pre-existing paths. Entrypoint " + (result.entrypoint_created ? "created" : "updated additively") + ".");
        console.log("Run agent-foundry validate and review .agent-foundry/README.md.");
      }
    }
  } else if (command === "route" || (command === "models" && args[1] === "explain")) {
    const task = option("--task", "");
    if (!task) throw new Error("Provide --task with a description of the work to classify.");
    const rosterPath = path.join(root, ".agent-foundry/settings/model-roster.yaml");
    const roster = yaml.load(await fs.readFile(rosterPath, "utf8"));
    const settingsPath = path.join(root, ".agent-foundry/settings/foundry-settings.yaml");
    const settings = yaml.load(await fs.readFile(settingsPath, "utf8")) ?? {};
    const classification = classifyTask(task);
    const rosterIssues = validateModelRoster(roster);
    if (rosterIssues.length) throw new Error("Model roster is invalid: " + JSON.stringify(rosterIssues));
    const selection = selectModel(classification, roster, settings);
    console.log(JSON.stringify({ task, classification, selection }, null, 2));
    if (!selection.selected) process.exitCode = 2;
  } else if (command === "settings") {
    console.log("Foundry settings: " + path.join(root, ".agent-foundry/settings/foundry-settings.yaml"));
    console.log("Model roster: " + path.join(root, ".agent-foundry/settings/model-roster.yaml"));
    console.log("Edit these project-owned files directly or ask your coding agent to update them. Never store credentials in the roster.");
  } else if (command === "validate") {
    const result = await validateInstallation(root);
    console.log(JSON.stringify({ valid: result.valid, resource_count: result.resource_count, issues: result.issues, warnings: result.warnings }, null, 2));
    if (!result.valid) process.exitCode = 1;
  } else if (command === "update") {
    const registry = await loadRegistry({ repository, ref });
    const preview = await updateInstallation({ root, registry, apply: false });
    console.log("UPDATE PREVIEW");
    console.log(JSON.stringify(preview, null, 2));
    if (preview.conflicts.length) {
      console.error("Local changes or removed resources were preserved. Resolve conflicts manually; no conflicting files were overwritten.");
      process.exitCode = 2;
    } else if (!preview.planned.length) {
      console.log("Already up to date.");
    } else if (!has("--apply")) {
      console.log("No files changed. Review the preview and rerun with --apply to update.");
    } else {
      const approval = has("--yes") ? "yes" : await ask("Apply these updates? Type 'yes' to continue: ");
      if (approval !== "yes") { console.log("Cancelled. No files changed."); process.exitCode = 1; }
      else {
        const result = await updateInstallation({ root, registry, apply: true });
        console.log("Updated " + result.updated + " Foundry-owned files.");
      }
    }
  } else if (command === "uninstall") {
    const preview = await uninstall(root);
    console.log("UNINSTALL PREVIEW");
    console.log(JSON.stringify(preview, null, 2));
    if (!has("--apply")) console.log("No files changed. Review the preview and rerun with --apply to uninstall.");
    else {
      const approval = has("--yes") ? "uninstall" : (await ask("Type 'uninstall' to remove unchanged Foundry-owned files: "));
      if (approval !== "uninstall") { console.log("Cancelled. No files changed."); process.exitCode = 1; }
      else console.log(JSON.stringify(await uninstall(root, { apply: true }), null, 2));
    }
  } else {
    help();
    process.exitCode = 1;
  }
} catch (error) {
  console.error("Agent Foundry: " + error.message);
  process.exitCode = 1;
}
