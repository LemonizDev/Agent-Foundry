---
id: multi-agent-campaign
name: Durable Multi-Agent Campaign
type: workflow
version: 0.2.0
portability: adaptable
status: draft
dependencies:
  - skills/multi-agent-delegation
  - skills/atomic-implementation
  - campaign-state
---

# Durable Multi-Agent Campaign

## Objective
Coordinate multiple bounded assignments across a longer engineering effort without losing state, duplicating work, or confusing process activity with verified completion. The host provides execution; this workflow provides the portable coordination contract.

## Roles
- **Owner:** supplies goals, constraints and decisions reserved to the project owner.
- **Lead / orchestrator:** owns scope, decomposition, assignment, integration, safety and final verification.
- **Workers:** execute bounded assignments within explicit write scopes.
- **Reviewer:** independently challenges the result using requirements and evidence, not the implementer's conclusion.

## States
PENDING → ACTIVE → REVIEW → COMPLETED

Interruption/failure states: FAILED, BLOCKED, INTERRUPTED, SUPERSEDED. A task may return to ACTIVE after review findings or recovery. Use templates/campaign-state.md for the campaign-level record and templates/delegation-assignment.md for each assignment.

## Phases
1. **Frame:** establish the goal, authoritative documents, non-goals, acceptance criteria and owner-only decisions.
2. **Inspect:** map existing project capabilities, current worktree state, dependencies and potential write conflicts.
3. **Decompose:** split work into bounded assignments with explicit deliverables, acceptance criteria and non-overlapping write scopes where practical.
4. **Select:** evaluate task complexity, risk, required expertise, model capabilities, cost/quota constraints and host availability. Do not delegate trivial work merely to create activity.
5. **Probe:** verify worker availability, tool access, context isolation and ability to return a structured response before relying on the worker.
6. **Persist:** record assignments, dependencies, owners, status, expected outputs, checkpoint locations and retry policy in the project's existing state system.
7. **Dispatch:** use the host's real native subagent or task mechanism. If none exists, present manual assignments for the owner to run; never pretend to have dispatched them.
8. **Execute:** workers stay within scope, preserve user changes and report blockers. Record checkpoints at meaningful boundaries.
9. **Review:** collect handoffs; independently inspect evidence, diffs, tests, risks and omissions.
10. **Integrate:** lead reconciles interfaces and conflicting changes, then performs integrated verification.
11. **Close:** mark complete only when deliverables, integrated diff, acceptance criteria and exact verification evidence agree.
12. **Handoff:** record current state, unresolved issues, owner decisions and the next action.

## Durable state
Prefer the project's existing issue tracker, task board or canonical project-state files. Do not create a competing source of truth. If no durable mechanism exists, an optional layout is:
- inbox/ for approved pending assignments
- active/ for current assignments
- completed/ for immutable completion records
- reports/ for milestone and review evidence
- state/ for campaign state, blockers and journal

Keep raw conversation transcripts out of campaign state. Record decisions, state transitions, checkpoints, outputs and evidence only.

## Gates
- No assignment starts without a clear objective and acceptance criteria.
- No concurrent workers edit the same files without an explicit coordination plan.
- No assignment is complete based only on worker claims.
- No interrupted assignment is discarded without preserving its checkpoint and partial work.
- No final completion claim is made before lead integration and verification.
- Owner-controlled actions remain blocked until explicit authorization.
- No host capability is assumed from a configuration filename alone.

## Recovery
Use the recovery procedure in skills/multi-agent-delegation/SKILL.md. Inspect the actual working tree and worker outputs, resume from the last verified checkpoint, preserve partial work and re-run the original acceptance criteria. Bound retries and record why a worker was replaced.

## Status reporting
Use commands/campaign-status.md. Reconcile campaign state against assignments, diffs, reports and verification evidence. Do not calculate progress from message count, token volume or elapsed time.

## Completion criteria
Every assignment has a terminal or explicitly blocked state; deliverables and evidence are retained; integration checks pass; independent review findings are addressed or explicitly accepted by the owner; and a useful handoff exists.
