---
id: close-session
name: Done (legacy Close Session alias)
type: command
version: 0.4.0
portability: adaptable
status: draft
aliases:
  - /close
  - /close session
  - /close chat
dependencies:
  - skills/session-learning/SKILL.md
  - skills/project-state-management/SKILL.md
---

# Close Session

## Invocation
`/close`, `/close session` or `/close chat`

## Purpose
Legacy entrypoint for the unified `/done` end-of-session procedure. Preserve durable project context and classify/save worthwhile reusable resources through [Durable Session Learning](../skills/session-learning/SKILL.md). Do not maintain separate `/close` and `/done` session-ending behaviours.

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

## Compatibility

`/close`, `/close session` and `/close chat` remain accepted as legacy aliases. They run the same unified end-of-session procedure as `/done`.

## Output
Learnings captured, files changed, verification, items excluded, unresolved conflicts and whether the chat must be closed manually.
