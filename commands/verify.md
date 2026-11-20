---
id: verify
name: Verify
type: command
version: 0.2.0
portability: adaptable
status: draft
aliases: [verify]
dependencies: [testing-and-verification]
---

# Verify

## Invocation
`/verify [change, milestone or acceptance criteria]`

## Purpose
Determine whether acceptance criteria are supported by reproducible evidence. Verification is independent of implementation confidence.

## Inputs
Acceptance criteria, target commit/working-tree state and required platforms/runtimes.

## Execution
1. Convert each criterion into an observable check.
2. Map checks to unit, integration, end-to-end, static, security or manual evidence.
3. Select checks proportionate to risk.
4. Run checks and capture exact commands, environment and outcomes.
5. Investigate failures; do not dismiss them as environmental without evidence.
6. Identify criteria that cannot be tested in the current environment.
7. Re-run relevant checks after fixes.

## Safety
Read-only by default. Use isolated fixtures and safe test data. Do not run destructive or production-facing checks without approval. Do not claim host/platform acceptance from text-only tests.

## Output
Criterion-by-criterion matrix with status `PASS`, `FAIL`, `BLOCKED` or `NOT RUN`, evidence and caveat. Overall verdict must not hide missing checks.

## Completion rule
A criterion is complete only when its required evidence passes. Implementation without verification remains unverified.
