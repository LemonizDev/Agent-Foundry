---
id: debug
name: Debug
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [debugging, testing-and-verification, response-presentation, conversational-interaction, diagnostic-report]
aliases: [debug]
---

# Debug

## Invocation
`/debug [symptom, error or failing behaviour]`

## Purpose
Identify and verify root cause before changing code. The objective is a reproducible explanation and regression-resistant fix, not a speculative patch.

## Inputs
Observed and expected behaviour, reproduction steps, error output, environment and suspected subsystem.

## Execution
1. Read project instructions and inspect working-tree changes.
2. Reproduce the failure or establish why reproduction is unavailable.
3. Capture the smallest useful failing case and relevant logs.
4. Form competing hypotheses and rank them by evidence.
5. Design experiments that discriminate between hypotheses.
6. Trace the failing path to the underlying cause.
7. Implement the smallest justified fix.
8. Add a regression test and run adjacent tests.
9. Check related failure modes without unrelated cleanup.

## Safety
Do not expose secrets or personal data. Do not delete data, reset environments, disable security controls or change production state without approval. If the cause remains uncertain, say so.

## Verification
Show original reproduction, regression protection, relevant test results and environment limitations.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/diagnostic-report.md` as the canonical layout.

Keep reproduction, root cause, evidence, impact, fix and residual risk together. Preserve the command's procedure, permissions and required evidence fields.
## Output
Reproduction status; root cause and evidence; hypotheses eliminated/open; fix and regression test; verification results; residual risk.
