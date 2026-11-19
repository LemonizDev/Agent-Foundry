---
id: plan-reconciliation
name: Active Plan and Status Reconciliation
type: skill
version: 0.2.0
status: draft
portability: adaptable
sources:
  - repository: LemonizDev/futuristic-lively-wallpaper
    path: .kilo/plans/awakening-master-plan.md
    ref: main
  - repository: LemonizDev/dhan-chatgpt-connector
    path: docs/README.md
    ref: foundation/final-trader-architecture
---

# Active Plan and Status Reconciliation

## Purpose

Prevent duplicate implementation and stale instructions by reconciling plans, progress records, code, tests and historical decisions.

## Status vocabulary

- DONE
- VERIFICATION INCOMPLETE
- PARTIALLY IMPLEMENTED
- NOT IMPLEMENTED
- BLOCKED
- SUPERSEDED

Projects may add statuses, but define them clearly.

## Procedure

1. Locate canonical vision, active plan, progress record, changelog, handoff and historical records.
2. Establish which source controls intent, current status, operating constraints and historical evidence.
3. Check each requirement against code and test evidence, not only old reports.
4. Assign one explicit status per requirement and cite evidence.
5. Separate implementation from runtime/hardware/owner verification.
6. Mark replaced plans and decisions SUPERSEDED with links to their replacements.
7. Resolve conflicting claims explicitly and preserve the historical record.
8. Produce a dependency-aware next-step list.

## Completion criteria

A new agent can determine what is done, incomplete, blocked, superseded and next without re-reading the entire project history.
