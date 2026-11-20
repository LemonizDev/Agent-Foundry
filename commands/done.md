---
id: done
name: Done - Curate Session Resources
type: command
version: 0.2.0
portability: adaptable
status: draft
aliases:
  - /done
  - done
dependencies:
  - skills/session-learning/SKILL.md
---

# Done

## Invocation

`/done` or an explicit request such as "I'm done; preserve the useful resources from this session."

## Purpose

End the work session cleanly. Preserve durable project learnings and identify reusable artefacts, classify each, and store qualifying material in its canonical location. Reject low-value material; invoking `/done` does not guarantee that a resource will be saved.

## Behaviour

1. Apply [Durable Session Learning](../skills/session-learning/SKILL.md). This existing resource owns the unified end-of-session procedure.
2. Inspect the current conversation for resource-quality artefacts, not every fact or discussion point.
3. Reject the request when nothing meets the acceptance threshold. Do not create a session summary or empty placeholder.
4. For each accepted artefact, classify it as a command, skill, workflow, standard, profile, template, integration, documentation item or context update.
5. Check for an existing canonical resource and dependencies before creating anything.
6. Improve the material so it stands alone outside the chat.
7. Write it to the correct project location and update registry/navigation where appropriate, subject to the command's safety boundaries.
8. Verify every changed file and report the result.

## Acceptance threshold

A saved item must solve a recurring project problem, be complete enough to reuse without the chat, have a clear purpose/audience, and not duplicate an existing resource. Unverified proposals stay proposals; transient conversation details are not resources.

## Permissions

The invocation authorises justified project-local context and resource updates when the host can write the repository. It does not authorise deleting or replacing existing resources, resolving material policy conflicts, publishing externally, committing/pushing, or changing global app settings. Obtain separate approval for those actions.

## Session end

Report whether resources were accepted, their types and destinations, the files changed, and verification results. The command prepares the project for a clean stop; it cannot close the chat UI unless the host exposes a tested session-control capability. The user may close the chat manually.

## Output

- Accepted resources and classifications, or explicit rejection.
- Canonical destinations and registry/index changes.
- Validation evidence and limitations.
- Any unresolved owner decision.
- Session closure status (ready for manual close / blocked).
