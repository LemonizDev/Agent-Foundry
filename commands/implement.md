---
id: implement
name: Implement
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [implement]
dependencies: [implementation-planning, atomic-implementation, testing-and-verification]
---

# Implement

## Invocation

/implement [feature, bug or approved plan]

## Behaviour

1. Read project instructions and current state.
2. Confirm scope, non-goals and acceptance criteria.
3. Use the implementation-planning skill if the work is not already planned.
4. Inspect relevant code and working-tree changes.
5. Implement the smallest complete change in reviewable steps.
6. Run relevant verification after each meaningful step.
7. Update canonical documentation and progress records.
8. Report evidence, limitations and the next action.

Do not begin a high-impact or ambiguous change without resolving material owner decisions.
