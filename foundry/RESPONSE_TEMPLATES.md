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

These are concrete response contracts for Foundry management, not merely suggestions about tone. Populate them from actual project state and the full content of selected resources. Follow `standards/response-presentation.md` for layout and `standards/conversational-interaction.md` for multi-step owner input.

## Shared rules

- Lead with the current state and consequence for the owner.
- Use concise ASCII frames for summaries, previews and inventories; do not box every paragraph.
- Identify every resource by human-readable name, type, purpose and actual contents. A filename or the word "skill" is never a sufficient description.
- Include dependencies, related commands and destination paths when relevant.
- Distinguish observed facts, configured defaults, inferred values and unknowns.
- Use only real states: `INSTALLED`, `UPDATED`, `KEPT`, `SKIPPED`, `BLOCKED`, `FAILED`.
- Do not show empty sections or fabricate resource descriptions, versions, host support or verification results.
- Ask required owner questions sequentially. Never present multiple independent questions as a batch.
- Do not write files until the applicable approval gate is satisfied.
- If Foundry is not installed, state that plainly; do not render an empty installed-resource inventory.

## 1. Foundry overview

Use for a general setup check.

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

Then show resource counts by type, non-default settings, inspected health issues and host integration limitations. Do not list every resource unless requested.

## 2. Foundry settings

Group values under Reviews, Delegation, Session learning and Documentation. Annotate each value as `DEFAULT`, `EXPLICIT` or `CUSTOM`. Explain settings the owner may act on.

For a change, show the exact old → new value, effect, compatibility impact and approval requirement. For multiple independent changes, ask one decision at a time, retain answers and preview the combined diff before approval. After applying, re-read the file and report verification. Preserve unknown keys and comments.

## 3. Resource discovery

Group only relevant candidates by type. For each candidate show:
- **Name and type**
- **Purpose:** what the resource actually does
- **Contents:** key procedures, rules or outputs found in the file
- **Why relevant:** the project need it addresses
- **Dependencies / related commands**
- **Existing equivalent:** KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE

State that the full registry remains in the source repository and is not copied by default. Do not present discovery as installation.

## 4. Installation preview

Use `templates/installation-preview.md` and `templates/resource-inventory.md`.

Show project classification and evidence; existing capability mapping; each proposed resource's name, type, actual purpose and contents, relevance and dependencies; exact files to create and additive edits; a file tree with an explanation beside each path; conflicts and exclusions; source revision; host limitations; verification plan; and an explicit approval request.

Do not write until approved.

## 5. Update preview

Show installed revision → target revision, then group changes as ADDED, UPDATED, DEPRECATED, REMOVED and KEPT.

For every changed resource, describe its contents and why it changed. Identify local hash drift and propose KEEP / MERGE / REPLACE / RETIRE for each affected file. State what remains untouched. Obtain approval before writes.

## 6. Removal preview

Show only files recorded as Foundry-managed, grouped by directory. Identify locally modified resources that will be preserved and all user-owned files that remain untouched. State the exact pointer block proposed for removal. Ask for explicit confirmation naming the removal operation.

## 7. Diagnostics

Use `templates/diagnostic-report.md`.

Show inspected artifacts (manifest, settings, instruction pointers, resource files and host artifacts) with FOUND / MISSING / MALFORMED / NOT VERIFIED states. Each issue needs evidence, impact, recommended repair and repair risk. Propose repairs; do not apply them before approval.

## 8. Contribution discovery shortlist

Use after an explicit contribution trigger and bounded scan. Follow the contribution-discovery skill's privacy and scope limits.

Start with sources inspected/unavailable, number of candidates and confirmation that nothing was published or transmitted. Then show a numbered shortlist:

| # | Candidate | Type | Portability | Maturity / evidence | Why it may help | Recommendation |
|---|---|---|---|---|---|---|

Group duplicates with the existing Foundry resource they could extend. Exclude sensitive, private, project-state or license-unclear content without reproducing it. Ask one candidate-specific question about the strongest opportunity. Draft only selected candidates.

## 9. Change summary

Use after an approved installation, update, removal or settings change.

```text
┌─ CHANGE COMPLETE ────────────────────────────────────────────
│ Operation: [operation]
│ Result: [SUCCESS / PARTIAL / FAILED]
│ Verification: [PASS / PARTIAL / NOT VERIFIED]
└──────────────────────────────────────────────────────────────
```

Then show what changed with paths and resource names; what was preserved; resource-by-resource outcome and purpose; exact verification performed and anything not verified; current installation state; and one relevant next action.

Never label a resource installed merely because a copy was attempted. Confirm file existence, content/hash and dependency resolution first.
