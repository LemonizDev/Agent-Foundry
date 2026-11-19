---
id: audit
name: Repository Audit
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [audit, repo audit]
dependencies: [repository-audit]
---

# Repository Audit

## Invocation

/audit [scope]

## Behaviour

Run the Repository Audit skill. Inspect first and do not modify project files during the audit unless the owner explicitly changes the request. Show evidence, coverage limits, capability decisions and prioritised findings. If the requested scope is broad, state which areas were inspected and which were not.
