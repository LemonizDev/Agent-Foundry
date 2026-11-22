---
id: audit
name: Repository Audit
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [repository-audit, response-presentation, conversational-interaction, repository-audit-report]
aliases: [audit, "repo audit"]
---

# Repository Audit

## Invocation
`/audit [scope]`

## Purpose
Build an evidence-backed map of the repository, authoritative context, engineering controls and material gaps. This is diagnosis, not implementation.

## Inputs
Optional scope: whole repository, subsystem, architecture, security, documentation or agent workflow.

## Preconditions
Read project instructions, resolve the repository root, inspect working-tree state and define included/excluded areas.

## Execution
1. Map structure, entrypoints, build/test commands and runtime boundaries.
2. Locate authoritative product, architecture, roadmap, security and contributor docs.
3. Trace important runtime flows instead of inferring behaviour from filenames.
4. Inspect relevant tests, CI, dependency policy, error handling and security controls.
5. Identify stale, duplicated or contradictory instructions.
6. Separate observed facts, assumptions and recommendations.
7. Rank findings by impact, likelihood, confidence and remediation effort.

## Safety
Read-only. Do not edit files, install dependencies, run migrations or alter configuration. Never expose secrets found during inspection.

## Verification
Cross-check material findings against source, tests, configuration or runtime evidence. Record inspected paths and uninspected areas.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/repository-audit-report.md` as the canonical layout.

Show scope and coverage, a readable repository map, prioritised evidence-backed findings, strengths to preserve and one next action. Preserve the command's procedure, permissions and required evidence fields.
## Output
Executive assessment; scope and coverage; architecture/source-of-truth map; prioritised findings with evidence; strengths to preserve; recommended next action.

## Failure behaviour
If access or tooling is unavailable, state the limitation and return only supported findings. Never invent repository coverage.
