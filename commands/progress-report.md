---
id: progress-report
name: Progress Report
type: command
version: 0.1.0
portability: adaptable
status: draft
dependencies:
  - skills/progress-reporting
  - templates/progress-report/PROGRESS_REPORT.md
---

# Progress Report

## Invocation

`/progress-report [project|milestone|workstream]`

This is the canonical command contract. A host adapter may expose it as a slash command, prompt shortcut, workflow action, or named skill invocation. The existence of this file does not mean every coding agent supports slash commands.

## Arguments

- `scope` (optional): project, milestone, or workstream. Defaults to the whole project.

## Behaviour

1. Resolve the project's canonical vision, roadmap, and current-state source.
2. Inspect available evidence for the requested scope.
3. Apply `skills/progress-reporting/SKILL.md`.
4. Render using `templates/progress-report/PROGRESS_REPORT.md`.
5. Clearly label historical figures and unverified claims.
6. End with one next step.

## Permissions

Read-only by default. Do not modify project files unless the owner separately requests that the report be saved or current project status be updated.

## Output contract

Return a concise, owner-readable report with evidence, caveats, progress method, and next action.

## Error behaviour

If the roadmap or evidence is missing, state what is unavailable and produce only the supported portion. Do not fabricate a percentage or infer completion from activity volume.
