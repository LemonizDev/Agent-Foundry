---
id: implementation-planning
name: Verifiable Implementation Planning
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Verifiable Implementation Planning

## Purpose

Turn a desired outcome into a sequence of bounded, dependency-aware implementation steps whose completion can be objectively verified.

## Procedure

1. Restate the outcome, user-visible behaviour and non-goals.
2. Inspect the current implementation and identify the actual change surface.
3. Separate facts, assumptions, open questions and owner decisions.
4. Identify architectural constraints, compatibility requirements, security implications and migration risks.
5. Define acceptance criteria before implementation. Each criterion must have a corresponding verification method.
6. Break the work into independently reviewable tasks. Each task states objective, scope, non-goals, inputs, expected files/outputs, dependencies, owner, acceptance criteria and tests.
7. Identify parallelisable tasks and shared-file conflicts. Do not parallelise tasks that require sequential decisions or write to the same files.
8. Order tasks by dependency and risk reduction. Put unknowns and high-risk assumptions early.
9. Define checkpoints, rollback/recovery strategy and stop conditions.
10. Estimate effort as a range or relative size. Do not manufacture precise estimates.
11. Define documentation, release and handoff updates as explicit deliverables.
12. Present the plan for owner approval when scope, architecture, cost, data or production behaviour changes.

## Deliverable

A plan with objective, scope, non-goals, assumptions, decisions needed, architecture impact, ordered tasks, dependencies, acceptance criteria, verification commands, risks, rollback and completion definition.

## Restrictions

Do not turn every idea into a task. Do not treat tests written as proof that the implementation is correct. Do not hide unresolved design choices inside implementation subtasks.

## Completion criteria

Every implementation task has a clear owner, bounded scope, dependencies and falsifiable acceptance criteria. The plan can be executed without repeatedly rediscovering what “done” means.
