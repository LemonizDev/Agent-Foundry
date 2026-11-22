---
id: review
name: Independent Review
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [code-review, testing-and-verification, response-presentation, conversational-interaction, diagnostic-report]
aliases: [review, "code review"]
---

# Independent Review

## Invocation
`/review [diff, commit, feature or scope]`

## Purpose
Find defects, regressions, unsafe assumptions and unsupported completion claims before acceptance. Review quality is measured by useful findings, not comment volume.

## Inputs
Diff/commit/branch/scope, acceptance criteria, design context and compatibility constraints.

## Execution
1. Inspect the full diff and surrounding implementation.
2. Trace changed behaviour through callers, data flow and failure paths.
3. Check correctness, security, error handling, compatibility and maintainability.
4. Evaluate whether tests cover meaningful cases and fail for the right reason.
5. Look for missing migration, rollback, observability and documentation work.
6. Verify claims against code and executed evidence.
7. Report actionable findings; separate defects from preferences.

## Safety
Read-only. Do not modify implementation or silently fix findings. Do not infer runtime behaviour from generated files alone.

## Finding format
Severity, file/line, concrete scenario, impact and recommended correction. Order blockers and high-severity defects first.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/diagnostic-report.md` as the canonical layout.

Use the diagnostic-report layout, but keep actionable findings first and preserve severity, file/line, scenario, impact and correction.
## Output
Findings first (or explicitly no material findings); reviewed/unreviewed areas; test gaps; non-blocking suggestions; overall risk and confidence.

## Failure behaviour
If target revision or criteria cannot be resolved, state what is missing. Do not manufacture findings.
