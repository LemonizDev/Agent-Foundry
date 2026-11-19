---
id: project-state-management
name: Authoritative Project State Management
type: skill
version: 0.1.0
portability: adaptable
status: draft
sources:
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: AGENTS.md
    inspected_at: 2026-11-19
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: .kilo/plans/awakening-master-plan.md
    inspected_at: 2026-11-19
  - repository: LemonizDev/dhan-chatgpt-connector
    ref: foundation/final-trader-architecture
    path: docs/README.md
    inspected_at: 2026-11-19
---

# Authoritative Project State Management

## Purpose

Prevent agents from following stale plans, duplicating completed work, or confusing historical reports with current state.

## Procedure

1. Identify the canonical product/technical direction document.
2. Identify the one authoritative active roadmap or implementation plan for the current scope.
3. Identify the current progress/state record and the change history.
4. Establish a precedence rule: which document governs direction, current state, owner preferences, and historical evidence.
5. Classify requirements using explicit statuses such as DONE, VERIFICATION INCOMPLETE, PARTIALLY IMPLEMENTED, NOT IMPLEMENTED, BLOCKED, and SUPERSEDED.
6. Mark older plans as archived or superseded and link them to the active plan.
7. Before starting a task, resolve its status against current code/runtime evidence rather than relying on old checklists.
8. After a meaningful step, update the current-state record and change history with exact evidence and the next action.
9. When sources conflict, investigate and resolve the discrepancy explicitly. Preserve historical evidence and record the correction.

## Required distinctions

- **Vision:** why the product exists and what outcome it should deliver.
- **Roadmap:** intended sequence, dependencies, gates, and scope.
- **Active plan:** detailed acceptance criteria and execution steps for current work.
- **Progress:** verified present state and next step.
- **Changelog:** chronological record of what changed.
- **Runbook:** how an owner operates the system.
- **Handoff:** compact state needed to resume work in a new session.
- **Historical record:** evidence of prior decisions and outcomes, not current instructions.

## Completion criteria

A new agent can identify the authoritative direction, current state, active plan, relevant constraints, and exact next step without reconciling multiple competing documents manually.
