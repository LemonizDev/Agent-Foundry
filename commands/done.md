---
id: done
name: Done - Curate Session Resources
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [session-learning, resource-inventory, session-handoff, response-presentation, conversational-interaction]
aliases:
  - /done
  - done
---

# Done

## Invocation

`/done` or an explicit request such as "I'm done; preserve the useful resources from this session."

## Purpose

End the work session cleanly. Preserve durable project learnings and identify reusable artefacts, classify each, and store qualifying material in its canonical location. Reject low-value material; invoking `/done` does not guarantee that a resource will be saved.

## Behaviour

1. Apply [Durable Session Learning](../skills/session-learning/SKILL.md). This existing resource owns the unified end-of-session procedure.
2. Inspect the current conversation for durable project learnings and resource-quality artefacts, not every fact or discussion point.
3. Preserve independently justified project learnings. Apply the resource acceptance threshold separately to reusable artefacts.
4. If no reusable artefact qualifies, explicitly reject resource extraction and explain why. Do not create a session summary or empty placeholder.
5. For each accepted artefact, classify it as a command, skill, workflow, standard, profile, template, integration, documentation item or context update.
6. Check for an existing canonical resource and dependencies before creating anything; extend it where appropriate.
7. Improve accepted material so it stands alone outside the chat.
8. Write it to the correct project location and update registry/navigation where appropriate, subject to the command's safety boundaries.
9. Verify every changed file and report the result.

## Acceptance threshold

A saved item must solve a recurring project problem, be complete enough to reuse without the chat, have a clear purpose/audience, and not duplicate an existing resource. Unverified proposals stay proposals; transient conversation details are not resources.

## Permissions

The invocation authorises justified project-local context and resource updates when the host can write the repository. It does not authorise deleting or replacing existing resources, resolving material policy conflicts, publishing externally, committing/pushing, or changing global app settings. Obtain separate approval for those actions.

## Session end

Report whether resources were accepted, their types and destinations, the files changed, and verification results. The command prepares the project for a clean stop; it cannot close the chat UI unless the host exposes a tested session-control capability. The user may close the chat manually.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/resource-inventory.md and templates/session-handoff.md` as the canonical layout.

Identify each accepted resource by name, type, purpose, contents, destination and verification outcome. Preserve the existing acceptance threshold and no-empty-output rule. Preserve the command's procedure, permissions and required evidence fields.
## Output

- Accepted resources and classifications, or explicit rejection.
- Canonical destinations and registry/index changes.
- Validation evidence and limitations.
- Any unresolved owner decision.
- Session closure status (ready for manual close / blocked).
