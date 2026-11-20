---
id: close-session
name: Legacy Close Session Alias
type: command
version: 0.4.0
portability: adaptable
status: deprecated
aliases:
  - /close
  - /close session
  - /close chat
dependencies:
  - commands/done.md
  - skills/session-learning/SKILL.md
---

# Close Session (legacy alias)

## Invocation

`/close`, `/close session` or `/close chat`

## Behaviour

This is a compatibility entrypoint for `/done`. It has no separate session-ending policy or workflow. Apply the [Done command](./done.md) and its [Durable Session Learning skill](../skills/session-learning/SKILL.md) exactly as written.

New documentation and integrations should use `/done`. Keep these aliases only for existing users and installed configurations.
