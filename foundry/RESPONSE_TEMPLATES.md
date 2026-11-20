---
id: foundry-response-templates
name: Agent Foundry Response Templates
type: management
version: 0.1.0
portability: universal
status: draft
---

# Agent Foundry Response Templates

Reusable instructions for how the coding agent composes chat responses during Foundry management. These are composition guidance, not a UI. Populate every template from actual project state discovered per `foundry/MANAGEMENT.md`; never fabricate values. Keep responses compact: show what the user asked for, not everything Foundry knows.

General rules for all templates:

- State what was inspected (files, revision) in one line when it matters.
- Distinguish facts from defaults and from unverified assumptions.
- Offer the natural next actions at the end; do not force a questionnaire.
- If the project has no Foundry installation, say so plainly and offer installation instead of presenting empty sections.

## 1. Foundry overview

Use when the user asks what Foundry is doing in this project, or "check my Foundry setup" at a glance.

Structure:

- One-line status: installed or not; source revision (tag or commit SHA) from the manifest.
- Adapted profile and resource count; management files present or missing.
- Settings snapshot: only the settings whose values differ from defaults, plus a count of the rest.
- Health: one line per discovered issue, or "no issues found".
- Offer: settings, update check, diagnostics detail, removal.

## 2. Foundry settings

Use for "Foundry settings", "show my Foundry configuration".

Structure:

- Current values grouped by area (Reviews, Delegation, Session learning, Documentation), each annotated `(default)` or `(set)` or `(custom key)`.
- One-line meaning for any setting the user is likely to act on.
- Suggested changes only when the user's request implies one; otherwise stop and wait.
- After a change: confirmation with old → new value, everything preserved, and verification result.

## 3. Resource discovery

Use for "show available Foundry resources".

Structure:

- Note that the full registry lives in the source repository and is not copied into the project.
- Compact grouped list of relevant candidates (skills, commands, workflows, profiles, templates) with a one-line description each, filtered to plausibly relevant ones for this project.
- For each candidate: what it would add and what it depends on.
- Offer: install selected resources.

## 4. Installation preview

Use before any installation write, after assessment.

Structure:

- Detected project type and the evidence used (one or two lines).
- Proposed resource list with rationale, grouped by core baseline / management / selected resources; explicitly list what was excluded and why.
- Files to be created (paths) and any existing files receiving an additive pointer block.
- Conflicts or overlaps found and how they will be handled.
- Source revision (release tag or commit SHA) and manifest plan.
- Approval request. Do not write anything until approved.

## 5. Update preview

Use before applying an update.

Structure:

- Installed revision → target revision.
- Added / changed / deprecated / removed resources.
- Locally modified files (hash drift) and the proposed resolution for each: keep, merge with approval, or retire with approval.
- What will be preserved unconditionally.
- Approval request.

## 6. Removal preview

Use before removing Foundry.

Structure:

- Foundry-managed files and pointer blocks that will be removed, grouped by directory.
- Owner-modified Foundry files that will be preserved as user-owned.
- User-owned files that are untouched.
- Confirmation request that explicitly names removal.

## 7. Diagnostics

Use for "check my Foundry setup" when detail is wanted, or after discovery finds issues.

Structure:

- Inspected: manifest, settings, root instruction pointers, host artifacts (one line each, found/missing/malformed).
- Issues table: issue, evidence, suggested repair, risk of the repair.
- Repairs are proposed, not applied, until approved.

## 8. Change summary

Use after any approved settings, installation, update or removal change.

Structure:

- What changed: bullet list with paths.
- What was preserved: unrelated files, owner edits, custom keys and comments.
- Verification performed and its result; anything not verified labelled as such.
- Current state in one line.
