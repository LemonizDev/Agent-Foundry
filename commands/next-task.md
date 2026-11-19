---
id: next-task
name: Recommend Next Task
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [next-task, next]
dependencies: [project-state-management, plan-reconciliation, implementation-planning]
---

# Recommend Next Task

## Invocation

/next-task [milestone or workstream]

## Behaviour

Reconcile the current plan with source and verification evidence. Identify dependency blockers, unfinished acceptance criteria and highest-value risk-reducing action. Recommend one next task with rationale, exact scope, acceptance criteria and verification. Do not choose a task solely because it is easy or makes the progress bar move.
