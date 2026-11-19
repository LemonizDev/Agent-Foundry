---
id: review
name: Independent Review
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [review, code review]
dependencies: [code-review, testing-and-verification]
---

# Independent Review

## Invocation

/review [diff, commit, feature or scope]

## Behaviour

Run Independent Engineering Review in read-only mode. Inspect the diff and surrounding code, challenge assumptions, evaluate tests and report actionable findings first. Distinguish blockers from suggestions. Do not modify the implementation unless the owner separately requests fixes.
