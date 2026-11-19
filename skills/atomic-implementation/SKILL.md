---
id: atomic-implementation
name: Atomic Implementation and Verification
type: skill
version: 0.1.0
portability: universal
status: draft
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    ref: foundation/final-trader-architecture
    path: AGENTS.md
    inspected_at: 2026-11-19
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: AGENTS.md
    inspected_at: 2026-11-19
---

# Atomic Implementation and Verification

## Purpose

Deliver changes in small, reviewable increments with a falsifiable check and a durable record after each meaningful step.

## Procedure

1. Read the relevant code and authoritative project context before editing.
2. Inspect the working tree and preserve user changes and unrelated work.
3. Define one bounded change with explicit non-goals.
4. Identify the check that can falsify the intended result before making the change.
5. Make the smallest complete implementation.
6. Run the targeted check immediately.
7. Inspect the resulting diff and confirm the intended region changed.
8. Update the project's progress/change record with what changed, evidence, outcome, limitations, and exact next step.
9. At phase gates, run the required phase verification and stop before starting the next phase.
10. Finish with a handoff containing changed files, checks and results, limitations, environment gotchas, and the next action.

## Rules

- Do not patch from assumptions or stale notes.
- Do not broaden scope to unrelated cleanup.
- Do not claim a check passed if it was not run.
- Do not equate process exit or an idle terminal with task completion.
- If interrupted, checkpoint partial work immediately.
- Preserve historical evidence; correct stale claims explicitly rather than silently erasing them.

## Completion criteria

A step is complete only when its acceptance check has run, the diff is inspected, and the status record reflects the evidence accurately.
