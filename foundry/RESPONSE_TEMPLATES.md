---
id: foundry-response-templates
name: Agent Foundry Response Templates
type: management
version: 0.2.0
portability: universal
status: draft
dependencies:
  - response-presentation
  - conversational-interaction
---

# Agent Foundry Response Templates

These are concrete response contracts for Foundry management, not merely suggestions about tone. Populate them from the actual project state and the full content of selected resources. Follow `standards/response-presentation.md` for layout and `standards/conversational-interaction.md` for multi-step owner input.

## Shared rules

- Lead with the current state and the consequence for the owner.
- Use concise ASCII frames for summaries, previews and inventories; do not box every paragraph.
- Identify every resource by human-readable name, type, purpose and relevant contents. A filename or the word "skill" is never a sufficient description.
- Include dependencies, related commands and destination paths when relevant.
- Distinguish observed facts, configured defaults, inferred values and unknowns.
- Use only real states: `INSTALLED`, `UPDATED`, `KEPT`, `SKIPPED`, `BLOCKED`, `FAILED`.
- Do not show empty sections or fabricate resource descriptions, versions, host support or verification results.
- Ask required owner questions sequentially. Never present multiple independent questions as a batch.
- Do not write files until the applicable approval gate is satisfied.
- If Foundry is not installed, state that plainly; do not render an empty installed-resource inventory.

## 1. Foundry overview

Use for "check my Foundry setup" or a general status request.

```text
╔══════════════════════════════════════════════════════════════╗
║ AGENT FOUNDRY · PROJECT OVERVIEW                             ║
╠══════════════════════════════════════════════════════════════╣
║ STATUS: [INSTALLED / NOT INSTALLED / PARTIAL]                ║
║ SOURCE: [release tag or exact commit]                        ║
║ PROFILE: [profile or UNKNOWN]                                ║
║ RESOURCES: [count] · MANAGEMENT FILES: [present/missing]     ║
╚══════════════════════════════════════════════════════════════╝
```

Then show:
- installed resource count grouped by type;
- settings that differ from defaults, plus a count of unchanged defaults;
- detected health issues with evidence, or "No issues found in inspected scope";
- host integration status and any unverified capability.

Do not list every resource unless requested. Use the Resource Inventory response when the user asks what is installed.

## 2. Foundry settings

Use for "show my Foundry settings" or a settings inspection.

Group values under Reviews, Delegation, Session learning and Documentation. Annotate each value as `DEFAULT`, `EXPLICIT` or `CUSTOM`. Give a short explanation for actionable settings.

For a change, show the exact old → new value, effect, compatibility impact and approval requirement. After applying, re-read the file and report the verification result. Preserve unknown keys and comments.

## 3. Resource discovery

Use when the user asks what Foundry resources are available.

Group only relevant candidates by type. Each entry must include:
- **Name and type**
- **Purpose:** what the resource actually does
- **Contents:** key procedures, rules or outputs
- **Why relevant:** the project need it addresses
- **Dependencies:** required resources and related commands

State that the complete catalog remains in the source repository and is not copied into the project by default. Do not present the catalog as an installation.

## 4. Installation preview

Use after discovery and before any installation write. Follow `templates/installation-preview.md` and `templates/resource-inventory.md`.

Required content:
- project classification and inspected evidence;
- capability mapping: KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE;
- every proposed resource with its name, type, purpose, contents and rationale;
- exact files to create and exact additive edits to existing files;
- conflicts, overlaps, host limitations and source revision;
- verification plan and explicit approval request.

Render the file tree with a short explanation beside each path. Never show filenames alone as the change explanation.

## 5. Update preview

Show installed revision → target revision, then group changes as ADDED, UPDATED, DEPRECATED, REMOVED and KEPT.

For every changed resource, describe what it contains and why it changed. Identify hash drift and local edits individually, with a proposed KEEP / MERGE / REPLACE / RETIRE action. State what remains untouched. Obtain approval before writes.

## 6. Removal preview

Show only files recorded as Foundry-managed, grouped by directory. Identify locally modified resources that will be preserved and all user-owned files that will remain untouched. State the exact pointer block, if any, proposed for removal. Ask for explicit confirmation naming the removal operation.

## 7. Diagnostics

Use `templates/diagnostic-report.md`.

Show inspected artifacts (manifest, settings, instruction pointers, resource files and host artifacts) with FOUND / MISSING / MALFORMED / NOT VERIFIED states. Each issue needs evidence, impact, recommended repair and repair risk. Propose repairs; do not apply them before approval.

## 8. Change summary

Use after an approved installation, update, removal or settings change.

```text
┌─ CHANGE COMPLETE ────────────────────────────────────────────
│ Operation: [operation]
│ Result: [SUCCESS / PARTIAL / FAILED]
│ Verification: [PASS / PARTIAL / NOT VERIFIED]
└──────────────────────────────────────────────────────────────
```

Then show:
- what changed, with paths and resource names;
- what was preserved, including unrelated files and owner edits;
- resource-by-resource outcome and purpose;
- exact verification performed and anything not verified;
- current installation state and one relevant next action.

Never label a resource installed merely because a copy was attempted. Confirm file existence, content/hash and dependency resolution first.
