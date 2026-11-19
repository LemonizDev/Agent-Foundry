---
id: code-review
name: Independent Engineering Review
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Independent Engineering Review

## Purpose

Find defects, regressions, security problems and missing verification in a proposed change. Review the outcome rather than rewarding the author for effort.

## Procedure

1. Read the task, acceptance criteria, architecture constraints and relevant project instructions.
2. Inspect the complete diff and enough surrounding code to understand behaviour.
3. Trace changed paths through callers, state, persistence, interfaces and error handling.
4. Check correctness, edge cases, backward compatibility, data integrity, concurrency, security, performance and maintainability according to risk.
5. Inspect tests for meaningful assertions, missing cases and false confidence.
6. Verify documentation and migration instructions match the actual implementation.
7. Challenge assumptions and identify where the implementation only works under ideal conditions.
8. Report findings first, ordered by severity. Each finding includes location, impact, reproduction or reasoning, and a concrete remedy.
9. Separate blocking findings from suggestions and questions.
10. If no findings exist, state the scope and limitations of the review.

## Independence

Use a different reviewer/model/provider when practical. If the same agent performs implementation and review, disclose that independence is limited. The lead agent remains accountable for integration and final correctness.

## Restrictions

Do not invent defects to appear useful. Do not approve work solely because tests pass. Do not rewrite code during a read-only review unless explicitly asked.

## Completion criteria

Findings are actionable, evidence-based and severity-ranked. The review makes clear whether the change is safe to integrate and what evidence is still missing.
