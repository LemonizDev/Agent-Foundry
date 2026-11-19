---
id: debugging
name: Evidence-Led Debugging
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Evidence-Led Debugging

## Purpose

Diagnose failures by narrowing hypotheses with reproducible evidence, then fix the root cause without introducing unrelated changes.

## Procedure

1. Capture the exact symptom, expected behaviour, environment, reproduction steps and failure frequency.
2. Check recent changes, logs, configuration, dependencies and the affected execution path.
3. Reproduce the failure using the smallest reliable case. If reproduction is impossible, state the evidence limitations.
4. Form a short ranked list of competing hypotheses. Each hypothesis must predict an observable result.
5. Design the cheapest discriminating experiment. Change one variable at a time where practical.
6. Trace the failing path across boundaries: input, state, transformation, side effects, output and error handling.
7. Distinguish the trigger, root cause, contributing conditions and symptoms.
8. Implement the smallest root-cause fix. Avoid broad rewrites unless evidence shows the architecture itself is the cause.
9. Add a regression test or repeatable probe that fails before the fix and passes after it.
10. Run relevant adjacent tests to detect regressions.
11. Inspect the diff for accidental changes and update troubleshooting knowledge if the failure is likely to recur.

## Deliverable

Symptom, reproduction, evidence, hypotheses tested, root cause, fix, regression protection, validation results and remaining uncertainty.

## Restrictions

Do not guess from one log line. Do not suppress errors, weaken assertions or add arbitrary delays as a substitute for diagnosis. Do not claim a root cause when only a correlation is known.

## Completion criteria

The original failure is reproducibly resolved, a regression check exists where feasible, adjacent behaviour remains intact, and the report separates confirmed causes from unresolved possibilities.
