---
id: evidence-and-verification
name: Evidence and Verification Standard
type: standard
version: 0.1.0
portability: universal
status: draft
---

# Evidence and Verification Standard

## Core rule

A claim must not be stronger than the evidence supporting it.

## Required distinctions

- **Specified:** requirement or design exists.
- **Implemented:** code/configuration exists.
- **Automatically verified:** a named test, probe, or check passed.
- **Visually inspected:** a person or agent actually examined rendered output.
- **Runtime verified:** behaviour was observed in the target runtime.
- **Owner approved:** the owner explicitly authorised or accepted a decision.
- **Unverified:** evidence is absent or insufficient.
- **Blocked:** a named dependency prevents verification.

These labels are not interchangeable.

## Evidence requirements

For each meaningful claim, retain:
- What was checked
- Exact command, test, probe, or inspection method
- Environment and relevant version/configuration
- Date/time
- Result
- Limitations and known gaps

## Rules

1. Never invent test results, benchmark values, runtime status, or percentages.
2. Never describe planned work as implemented.
3. Never describe implemented work as verified without acceptance evidence.
4. Never infer target hardware performance from a different renderer or device.
5. Preserve failed tests and negative results in the record.
6. Use reproducible conditions for comparisons.
7. Keep caveats adjacent to the claims they qualify.
8. If evidence is stale, label it with its original date.
9. If verification is impossible, report the blocker rather than weakening the acceptance criterion silently.

## Completion

A milestone is complete only when its declared acceptance criteria have corresponding evidence and all required owner approvals are present.
