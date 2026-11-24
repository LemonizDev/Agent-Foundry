---
id: project-health
name: Project Health
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [repository-audit, progress-reporting, testing-and-verification, documentation-maintenance, response-presentation, conversational-interaction, diagnostic-report]
aliases: [project-health, health]
---

# Project Health

## Invocation
`/project-health [project or subsystem]`

## Purpose
Assess whether the project is understandable, maintainable, secure and deliverable. Surface material risks without reducing a complex system to an arbitrary score.

## Assessment dimensions
Product clarity; architecture; implementation; verification; security; operations; documentation; dependency/release hygiene; agent workflow and ownership.

## Execution
1. Define scope and assessment date.
2. Inspect evidence for each relevant dimension.
3. Assign `HEALTHY`, `WATCH`, `AT RISK` or `UNKNOWN`.
4. Record confidence and evidence for every non-healthy status.
5. Separate active defects from maturity gaps and optional improvements.
6. Rank risks by impact and likelihood.
7. Recommend the highest-value corrective action.

## Safety
Read-only. Do not run destructive probes or alter production state. Missing evidence is `UNKNOWN`, not a pass. Do not present subjective scores as measured metrics.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/diagnostic-report.md` as the canonical layout.

Show named dimensions, evidence, risk and one priority action. Do not invent an aggregate health score. Preserve the command's procedure, permissions and required evidence fields.
## Output
Dimension scorecard, top risks, evidence gaps, strengths to preserve, one priority action, inspected scope and exclusions.
