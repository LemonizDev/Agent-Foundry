---
id: testing-and-verification
name: Risk-Based Testing and Verification
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Risk-Based Testing and Verification

## Purpose

Choose verification that meaningfully tests the changed behaviour and the risks it introduces, rather than maximising test counts without proving anything useful.

## Procedure

1. Read acceptance criteria and identify the changed contracts and failure modes.
2. Map each criterion to the narrowest useful check: unit, component, integration, end-to-end, static, security, visual, performance or manual inspection.
3. Inspect existing test conventions and reuse the project's harness.
4. Add tests for normal behaviour, boundary conditions, invalid input, error paths and state transitions as appropriate.
5. Ensure tests are deterministic, isolated and assert outcomes rather than implementation trivia.
6. Run focused tests first, then relevant subsystem tests, then the full suite when proportionate.
7. Run type checks, lint, build and static checks that apply to the changed code.
8. For UI/graphics work, capture reproducible states and inspect actual rendering. A passing DOM test is not proof of visual quality.
9. For performance work, record workload, hardware/runtime, warmup, sample count and measurement method. Avoid comparing unlike environments.
10. For security-sensitive changes, test denial paths and boundary conditions; request independent review.
11. Record exact commands, exit codes, counts, environment and any skipped/blocked checks.
12. Re-run relevant checks after the final edit.

## Evidence states

Use distinct labels: implemented, automated check passed, runtime verified, visually inspected, independently reviewed, owner approved, not verified and blocked.

## Restrictions

Do not change tests merely to make them pass unless the test itself is demonstrably wrong. Do not claim full-suite success from a focused test. Do not infer runtime, browser, hardware or production verification from compilation.

## Completion criteria

Every acceptance criterion has evidence or an explicit unresolved status. The final report names what was tested, what was not tested and why.
