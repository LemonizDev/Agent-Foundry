---
id: next-task
name: Recommend Next Task
type: command
version: 0.2.0
portability: adaptable
status: draft
aliases: [next-task, next]
dependencies: [project-state-management, plan-reconciliation, implementation-planning]
---

# Recommend Next Task

## Invocation
`/next-task [milestone or workstream]`

## Purpose
Recommend the single next action that most improves delivery confidence, reduces material risk or unblocks dependent work.

## Execution
1. Read canonical roadmap, current state and active plans.
2. Inspect repository evidence for incomplete work.
3. Reconcile claimed progress against implementation, tests and review state.
4. Identify dependencies, blockers, owner decisions and external constraints.
5. Compare candidates by impact, urgency, risk reduction, dependency leverage and effort.
6. Select one recommendation and explain why alternatives rank lower.
7. Define scope, owner, acceptance criteria and verification.

## Safety
Read-only. Do not create tasks, edit plans or start implementation unless separately requested. Do not optimise for easy visible activity or arbitrary progress percentages.

## Output
One recommended task, rationale, prerequisites, exact scope, acceptance criteria, verification plan and owner decision if needed.
