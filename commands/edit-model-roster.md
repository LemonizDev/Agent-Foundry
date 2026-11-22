---
id: edit-model-roster
name: Edit Model Delegation Roster
type: command
version: 0.2.0
portability: adaptable
status: draft
dependencies: [model-delegation-architecture, model-roster-template, response-presentation, conversational-interaction, decision-prompt]
aliases:
  - /models edit
  - /model-roster
---

# Edit Model Delegation Roster

## Invocation

`/models edit` or “edit model delegation roster”.

## Purpose

Let the project owner maintain the models available to the task-aware delegation selector.

## Behaviour

1. Read `.agent-foundry/settings/model-roster.yaml`.
2. Show configured aliases, exact model IDs, provider, availability and evidence-backed capability notes. Never reveal credentials.
3. Identify stale, unknown or incomplete entries.
4. Ask which model or field the owner wants to add, change, disable or remove.
5. Verify exact model IDs from an owner-provided source or configured provider catalogue when available.
6. Preview the roster diff.
7. Apply the approved change and validate schema and uniqueness.
8. Record last-verified date and source for changed capability claims.

## Rules

- The roster is user-defined; there is no universal Foundry default roster.
- Unknown capabilities remain unknown until tested or supported by credible evidence.
- Never store API keys or secrets in the roster.
- Do not silently change routing policy or enable paid fallbacks.
- Removing a model from the roster must not delete provider credentials or external accounts.

## Related commands

- `/settings` — inspect overall Foundry configuration.
- `/models explain [task]` — explain model selection for a task.
- `/models test [alias]` — run a bounded capability evaluation when supported.

## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/decision-prompt.md` as the canonical layout.

Ask one question at a time for unresolved model or field choices, then preview the roster diff. Preserve the command's procedure, permissions and required evidence fields.
