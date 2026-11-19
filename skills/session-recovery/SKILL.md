---
id: session-recovery
name: Interrupted Work Recovery
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Interrupted Work Recovery

## Purpose

Resume interrupted work from verified repository state and durable checkpoints without repeating completed work or trusting stale conversational claims.

## Procedure

1. Inspect the current branch and working tree. Preserve uncommitted user changes.
2. Read project instructions, current progress, active plan, blocker register and latest relevant changelog/handoff if present.
3. Inspect orchestration state, checkpoints, task assignments and worker outputs when they exist.
4. Compare documented status with actual source, tests and commit history.
5. Classify each claimed task as verified complete, partially implemented, unverified, blocked or obsolete.
6. Identify in-flight edits, ownership conflicts and uncommitted work before taking control.
7. Reconstruct the next safe action from dependencies and acceptance criteria.
8. Resume from the last verified checkpoint. Do not replay completed operations unless validation requires it.
9. Reassign failed worker tasks only after preserving outputs, logs and partial results.
10. Update project state after recovery and explain what was independently rechecked.

## Restrictions

Do not silently discard another agent's work. Do not treat a progress percentage or handoff statement as proof. Do not overwrite local changes to restore a presumed clean state.

## Completion criteria

The current repository state is reconciled with project records, partial work is preserved, the next action is explicit, and no completion claim relies solely on old chat history.
