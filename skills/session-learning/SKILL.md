---
id: session-learning
name: Durable Session Learning
type: skill
version: 0.2.0
portability: universal
status: draft
dependencies:
  - skills/project-state-management
  - standards/documentation-governance
---

# Durable Session Learning

## Purpose

At the end of a productive session, preserve durable project learnings and any genuinely reusable project resources created or refined in the conversation. Classify each item and route it to its canonical home. The objective is to improve future work, not to preserve the conversation.

## Trigger

Run when the user invokes `/done` or its legacy aliases `/close`, `/close session`, `/close chat`, or explicitly asks to finish the session and preserve worthwhile project material. This single end-of-session procedure handles context learning and reusable-resource extraction; do not split them into competing commands or parallel curation skills.

## What qualifies as a learning

Capture information only when it is likely to change future engineering decisions or execution:
- a confirmed project requirement, constraint or non-goal;
- a stable owner preference about implementation, communication or review;
- an architectural decision and its rationale;
- a coding convention or repository-specific pattern discovered in working code;
- a verified failure mode and the way to detect or avoid it;
- a useful tool limitation or environment fact;
- an idea that the owner explicitly wants retained, clearly labelled as a proposal;
- a correction to an earlier assumption, with the evidence that corrected it.

Do not capture:
- emotional state, praise, frustration or conversational tone;
- one-off temporary requests unless they change project policy;
- speculation presented as fact;
- secrets, credentials, personal sensitive data or irrelevant personal details;
- duplicated information already recorded accurately;
- unverified agent claims;
- raw transcripts or verbose task histories.

## Reusable resource classification

In addition to durable learnings, inspect whether the session produced a complete, reusable artefact that belongs in the project. A candidate must solve a recurring or important project problem, stand alone without the chat, have a clear purpose and audience, and not duplicate an existing resource. Reject vague, transient, project-irrelevant, unverified or redundant material. Invoking `/done` is not permission to invent something to save.

Classify qualifying artefacts by their actual form:
- **Command:** repeatable user-invoked action with inputs, permissions, behaviour and output contract → `commands/<name>.md`.
- **Skill:** reusable procedure for a class of work → `skills/<name>/SKILL.md`.
- **Workflow:** multi-stage process with gates, dependencies or handoffs → `workflows/<name>.md`.
- **Standard:** durable rule governing multiple tasks → `standards/<name>.md`.
- **Profile:** specialist responsibility, scope and boundaries → `profiles/<name>.md`.
- **Template:** reusable output or record structure → `templates/<name>.md`.
- **Integration:** host-specific discovery, configuration or capability adaptation → `integrations/`.
- **Documentation:** durable architecture, decision, reference or user guide → canonical `docs/` location.
- **Context update:** requirement, preference, decision or verified lesson → update its existing authoritative context source; do not create a new resource.

Prefer extending an existing resource over creating a new file. A paragraph is not automatically a skill: use each resource type's authoring contract. Split material only when it contains distinct independently useful artefacts.

If no reusable resource qualifies, explicitly say that nothing met the bar and do not create a generic summary, placeholder, transcript dump or registry entry. Independently justified durable context updates may still be preserved.

## Procedure

1. Read the project instruction entrypoint and identify the authoritative context files.
2. Review the current session and extract candidate learnings.
3. For each candidate, classify it as requirement, preference, decision, convention, verified lesson, proposal, or transient.
4. Check existing files for duplicates, conflicts and superseded information.
5. Route each accepted learning to its canonical destination:
   - product scope/requirements → product context or vision;
   - architecture decision → ADR/architecture document;
   - stable owner preference → owner context/preferences;
   - coding conventions → AGENTS.md or engineering standard;
   - verified failure and recovery → skill/runbook/troubleshooting guide;
   - model capability/availability → model roster with evidence/date;
   - current milestone state → progress/roadmap;
   - completed change → changelog.
6. Do not create a generic HANDOFF.md or session-summary file by default.
7. Present proposed edits before writing if the destination is high-impact, conflicts with existing decisions, or the user has not granted write authority.
8. Apply only justified changes. Prefer precise edits over rewriting whole documents.
9. Preserve decision history. Mark changed preferences or decisions as superseded rather than silently erasing their history.
10. Read back modified files and verify links, formatting and consistency.
11. Report what was captured, where it was written, what was deliberately excluded, and any unresolved conflict.

## Confidence rules

- Confirmed by explicit owner statement: may be recorded as an owner requirement/preference.
- Confirmed by source code or repeatable test: may be recorded as a verified technical fact.
- Agent inference: label as hypothesis and do not promote to authoritative context.
- Conflicting evidence: do not resolve by guessing; record the conflict and ask for owner direction.

## Rejection and session end

Reject resource extraction when no candidate meets the quality bar. Do not lower the threshold because the user invoked `/done`. Report accepted resources and their classifications, durable context updates, excluded material, destinations, verification and unresolved owner decisions. Do not claim the chat UI was closed unless the host exposes tested session-control capability.

## Chat closure limitation

The skill prepares the project for a clean session end. It cannot close the chat UI unless the host provides a supported chat-control API. Never claim the conversation was closed by the agent when it was not.

## Completion criteria

- Every captured item has a type, evidence and destination.
- No emotional or transient conversation material is persisted.
- No generic handoff file is created by default.
- Conflicts and proposals remain clearly labelled.
- Updated context files are read back and verified.
- The user receives a concise end-of-session report: resources kept (with type and destination), durable context updated, candidates rejected and why, verification, blockers and whether manual chat closure is required.
