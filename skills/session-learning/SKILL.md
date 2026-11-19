---
id: session-learning
name: Durable Session Learning
type: skill
version: 0.1.0
portability: universal
status: draft
dependencies:
  - skills/project-state-management
  - standards/documentation-governance
---

# Durable Session Learning

## Purpose

Extract useful, durable project knowledge from a completed conversation and write it into the correct existing context source. The objective is to improve future work, not to preserve the conversation.

## Trigger

Run when the user invokes `/close`, `/close session`, `/close chat`, asks to wrap up, or explicitly requests session learning capture.

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

## Chat closure limitation

The skill prepares the project for a clean session end. It cannot close the chat UI unless the host provides a supported chat-control API. Never claim the conversation was closed by the agent when it was not.

## Completion criteria

- Every captured item has a type, evidence and destination.
- No emotional or transient conversation material is persisted.
- No generic handoff file is created by default.
- Conflicts and proposals remain clearly labelled.
- Updated context files are read back and verified.
- The user receives a concise capture report and can end the chat safely.
