---
id: close-session
name: Close Session
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [session-learning, project-state-management, response-presentation, conversational-interaction, session-handoff]
aliases:
  - /close
  - /close session
  - /close chat
---

# Close Session

## Invocation
`/close`, `/close session` or `/close chat`

## Purpose
Prepare the project for the next session by preserving durable, verified knowledge in the correct existing source of truth. This is not a transcript export.

## Execution
1. Review the session for requirements, decisions, conventions, verified fixes and stable preferences.
2. Separate confirmed facts, proposals, unresolved questions and temporary observations.
3. Route each durable item to its canonical file.
4. Check for duplicates, contradictions and stale information.
5. Present proposed changes and material conflicts when approval is required.
6. Apply only permitted changes and preserve history.
7. Verify modified files and update progress/changelog where appropriate.
8. Summarise what was captured and what remains unresolved.

## Routing
Requirements -> product context; architecture decisions -> architecture/decision register; stable preferences -> owner context; conventions -> engineering instructions; verified failure modes -> runbook/skill; milestone state -> roadmap; completed user-visible work -> changelog; model capability observations -> roster only with bounded evidence and date.

## Safety
Do not persist emotional content, filler, raw transcripts or speculation as facts. Do not silently overwrite conflicting decisions. Do not create `HANDOFF.md` unless the project uses it or the owner asks. Do not claim to close the chat UI unless the host exposes tested session control.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/session-handoff.md` as the canonical layout.

Use the session-handoff layout for captured learnings and remaining work. Do not imply that the chat UI itself was closed.
## Output
Learnings captured, files changed, verification, items excluded, unresolved conflicts and whether the chat must be closed manually.
