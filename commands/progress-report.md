---
id: progress-report
name: Progress Report
type: command
version: 0.2.0
portability: adaptable
status: draft
dependencies:
  - skills/progress-reporting
  - templates/progress-report-template.md
---

# Progress Report

## Invocation
`/progress-report [project|milestone|workstream]`

This is a portable contract. A host may expose it as a slash command, prompt shortcut, workflow action or named skill. This file alone does not prove native command support.

## Inputs
Optional scope (project, milestone or workstream) and optional baseline report/plan.

## Permissions
Read-only by default. Do not edit project files unless the owner separately asks to save the report or update canonical status.

## Behaviour
1. Resolve canonical vision, roadmap and current-state source.
2. Identify measurable acceptance criteria for the scope.
3. Inspect implementation, test, review and release evidence.
4. Apply `skills/progress-reporting/SKILL.md`.
5. Use the canonical report template when present.
6. Distinguish completed, in progress, blocked, deferred and unverified work.
7. Explain scope changes and variance from baseline.
8. End with one next action.

## Evidence rules
A task is not complete because work started or files changed. Tests count only when command, environment and result are known. Do not infer percentages without a defensible denominator. Historical metrics retain date and source.

## Output
Status summary, completed outcomes with evidence, in-progress work, blockers, risks, scope variance, confidence and next action.

## Error behaviour
If roadmap or evidence is missing, report the gap and produce only the supported portion. Never fabricate a completion percentage.
