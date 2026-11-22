---
id: close-session
name: Legacy Close Session Alias
type: command
version: 0.5.0
portability: adaptable
status: deprecated
dependencies: [done, session-learning, response-presentation, conversational-interaction]
aliases:
  - /close
  - /close session
  - /close chat
---

# Close Session (legacy alias)

## Invocation

`/close`, `/close session` or `/close chat`

## Behaviour

This is a compatibility entrypoint for `/done`. It has no separate session-ending policy or workflow. Apply the [Done command](./done.md) and its [Durable Session Learning skill](../skills/session-learning/SKILL.md) exactly as written.

New documentation and integrations should use `/done`. Keep these aliases only for existing users and installed configurations.

## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `commands/done.md` as the canonical layout.

This deprecated compatibility entrypoint delegates to /done. Do not create a separate close-session output, workflow or policy. Preserve the command's procedure, permissions and required evidence fields.
