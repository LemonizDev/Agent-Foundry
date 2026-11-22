---
id: implement
name: Implement
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [implementation-planning, atomic-implementation, testing-and-verification, response-presentation, conversational-interaction, implementation-plan]
aliases: [implement]
---

# Implement

## Invocation
`/implement [feature, bug or approved plan]`

## Purpose
Deliver a bounded change that satisfies agreed acceptance criteria while preserving existing behaviour and unrelated work.

## Inputs
Requested outcome, scope, non-goals, constraints, acceptance criteria and compatibility targets.

## Preconditions
Read project instructions and canonical state; inspect relevant source, tests and working tree; resolve material ambiguity. High-impact or ambiguous changes require an approved plan.

## Execution
1. Translate the request into observable acceptance criteria.
2. Identify the smallest complete implementation slice.
3. State likely files/components and preserve unrelated changes.
4. Implement incrementally; avoid broad rewrites without demonstrated need.
5. Add tests for changed behaviour and meaningful edge cases.
6. Run targeted checks after each meaningful step.
7. Update canonical docs and changelog when interfaces or behaviour change.
8. Review the final diff for regressions, scope creep and sensitive data.

## Safety
Do not overwrite user changes, introduce dependencies without rationale, or make destructive/external/production changes without approval. Do not call work complete when required checks are blocked.

## Verification
Run targeted tests, then required repository checks. Record exact commands, exit status and environment. Separate implemented, tested, reviewed and released.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/implementation-plan.md` as the canonical layout.

Use the implementation-plan layout for proposed or multi-step work. For a completed change, retain the command's outcome, file, test and risk details in a concise change summary.
## Output
Behaviour delivered; design decisions and files changed; test evidence; limitations/deferred work; remaining risks and next action.

## Stop conditions
Pause when criteria conflict, a destructive action lacks approval, a critical dependency is unavailable or a material product decision emerges.
