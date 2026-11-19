---
id: close-session
name: Close Session
type: command
version: 0.1.0
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

`/close`, `/close session`, or `/close chat`

## Intent

Prepare the current conversation to be safely ended by extracting durable project learnings and updating the appropriate existing context files. This is not a generic handoff generator and not a transcript archive.

## Behaviour

1. Run the Durable Session Learning skill.
2. Identify useful project-specific requirements, stable preferences, technical decisions, conventions, verified lessons and proposals.
3. Route each item to its canonical context file.
4. Check for duplicates and conflicts.
5. Make justified updates under the project's normal write permissions.
6. Verify every modified file.
7. Return a compact capture report with changed files and excluded transient information.

## Safety

- Do not persist emotional content or conversational filler.
- Do not invent facts or model capability ratings.
- Do not silently overwrite conflicting decisions.
- Do not create HANDOFF.md unless the project already uses one or the owner explicitly requests one.
- Do not claim to close the actual chat unless the host exposes a tested chat-control capability.

## Output

- Learnings captured, grouped by type.
- Files updated.
- Verification performed.
- Items deliberately not captured.
- Conflicts requiring owner decision.
- Clear statement that the chat can now be closed manually if the host cannot close it.
