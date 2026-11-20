---
id: session-resource-curation
name: Session Resource Curation
type: skill
version: 0.1.0
portability: universal
status: draft
dependencies:
  - skills/session-learning/SKILL.md
  - standards/documentation-governance
  - docs/standards/RESOURCE_AUTHORING_STANDARD.md
---

# Session Resource Curation

## Purpose

At the end of a productive conversation, identify whether it contains a genuinely reusable project resource, classify it correctly, and store it in the project's canonical resource location. The goal is to preserve a useful method, specification, command, workflow, standard or template, not to save a transcript or every decision discussed.

## Trigger

Use only when the owner invokes `/done` or explicitly asks to curate reusable project material from the current session. This is a high-signal resource extraction operation, not a generic end-of-chat summary.

## Acceptance threshold

A candidate qualifies only when it:
- Solves a recurring or important project problem.
- Contains enough detail to be useful in a future session without the original conversation.
- Has a clear audience and purpose.
- Has a coherent procedure, contract, structure or decision rule.
- Can be routed to an existing resource type without forcing a new category.
- Is not merely an unverified idea, a one-off answer, a temporary status update, or a duplicate.

Reject material that is vague, redundant, project-irrelevant, too incomplete to use, or based on unverified claims. Do not lower the threshold just because the user invoked `/done`.

## Resource classification

Choose the smallest correct type:

| Type | Use when the extracted material is... | Canonical destination |
|---|---|---|
| Command | A repeatable user-invoked action with inputs, permissions, behaviour and output contract | `commands/<name>.md` |
| Skill | A reusable procedure the agent follows to complete a class of work | `skills/<name>/SKILL.md` |
| Workflow | A multi-stage process with gates, dependencies, handoffs or multiple roles | `workflows/<name>.md` |
| Standard | A durable rule/invariant that governs multiple tasks | `standards/<name>.md` |
| Profile | A defined responsibility, scope and boundary for a specialist role | `profiles/<name>.md` |
| Template | A reusable output or record structure | `templates/<name>.md` |
| Integration | Host-specific discovery, configuration or capability adaptation | `integrations/<name>.md` or the existing host guide |
| Documentation | A durable architecture, decision, reference or user guide | Existing canonical `docs/` location |
| Context update | A project fact, requirement or decision rather than a reusable method | Update its existing canonical source; do not create a new skill |

Do not call a paragraph a skill. A skill needs a purpose, trigger, prerequisites, procedure, outputs, failure handling, restrictions and completion criteria. A command needs a clear invocation contract and delegates its reusable procedure to a skill when appropriate.

## Procedure

1. **Inspect context.** Read project instructions, documentation index, resource registry and relevant resource-authoring rules. Identify project root and allowed write scope.
2. **Review the session.** Extract candidate reusable artefacts, not general conversation highlights.
3. **Apply the threshold.** Reject candidates that do not meet every acceptance criterion. If none qualifies, stop with a clear reason and make no changes.
4. **Classify each accepted candidate.** Select one primary resource type from the table. Split material only when it contains distinct independent resources.
5. **Check prior art.** Search the registry and existing files for duplicates, overlaps, superseded resources and dependencies.
6. **Improve the artefact.** Remove chat-specific language, unsupported assumptions, transient values and private context. Make it independently usable.
7. **Choose the canonical destination.** Extend an existing resource when that is more coherent than creating a new file. Do not create a new resource ID or directory merely to preserve a conversation.
8. **Draft a resource contract.** Include purpose, audience, trigger/use case, prerequisites, procedure/content, outputs, failure handling, boundaries, dependencies and completion criteria appropriate to the type.
9. **Update metadata and navigation.** Add or amend registry entry, dependencies, resource index, command catalog and relevant README/menu only when the new resource is public-facing.
10. **Validate.** Check links, frontmatter, naming, dependency resolution, duplicate IDs, resource paths and type-specific requirements. Run repository validation when available.
11. **Persist within authority.** The `/done` invocation is explicit intent to curate and save a qualifying resource. Write new/additive project-local resources when the host has write authority. Ask first for destructive edits, conflict resolution, scope expansion, publication or changes to owner-controlled global settings.
12. **Close out.** Read back every changed file and report the accepted resource(s), type, destination, reason, changed files and verification. State clearly if the chat UI must be closed manually.

## Rejection behaviour

If no candidate passes:
- Say no reusable project resource met the bar.
- Briefly state why (for example, discussion was exploratory, material was already documented, or details were not yet verified).
- Do not create a summary file, note, generic handoff, empty command, placeholder skill or registry entry.
- Do not turn an unresolved idea into policy.
- Tell the owner that nothing was persisted and the session is ready for manual closure.

## Evidence and confidence

- Explicit owner-approved policy can be recorded as a requirement.
- Code, tests or authoritative docs can support technical facts.
- Inference must be labelled as a proposal and kept out of authoritative instructions until accepted.
- If evidence conflicts, preserve both sides and request direction rather than choosing silently.
- Exclude secrets, credentials, personal sensitive data, private records and unrelated content.

## Completion criteria

- At least one worthwhile resource qualifies, or the invocation is explicitly rejected with no write.
- Every accepted artefact is classified and routed correctly.
- No transcript dump or generic session summary is created.
- Registry and navigation changes match the files actually created.
- Modified files are read back and verified.
- The response reports what was kept, what was rejected and whether the session can now be closed manually.
