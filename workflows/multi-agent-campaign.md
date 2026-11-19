---
id: multi-agent-campaign
name: Durable Multi-Agent Campaign
type: workflow
version: 0.1.0
portability: adaptable
status: draft
dependencies:
  - skills/multi-agent-delegation
  - skills/atomic-implementation
---

# Durable Multi-Agent Campaign

## Objective

Coordinate multiple bounded assignments across a longer engineering effort without losing state, duplicating work, or confusing process activity with verified completion.

## Roles

- **Lead:** owns scope, task decomposition, integration, safety, and final verification.
- **Workers:** execute bounded assignments within explicit file ownership.
- **Reviewer:** independently challenges the result.
- **Owner:** supplies decisions and authorizations reserved to the project owner.

## States

`PENDING → ACTIVE → REVIEW → COMPLETED`

Terminal/interruption states: `FAILED`, `BLOCKED`, `INTERRUPTED`.

A task may return to `ACTIVE` after review findings or recovery.

## Phases

1. **Frame:** establish goal, source-of-truth documents, non-goals, acceptance criteria, and owner-only decisions.
2. **Decompose:** split work into bounded assignments with non-overlapping write scopes where practical.
3. **Probe:** verify worker availability, tool access, and ability to return a structured response.
4. **Dispatch:** persist assignments and record owners, dependencies, expected outputs, and checkpoints.
5. **Execute:** workers update durable checkpoints and report blockers rather than silently expanding scope.
6. **Review:** collect handoffs; independently inspect evidence, diffs, tests, risks, and omissions.
7. **Integrate:** lead reconciles interfaces and performs the integrated verification.
8. **Close:** mark complete only when report, repository diff, and exact test evidence agree. Otherwise retain REVIEW/BLOCKED/INTERRUPTED status.
9. **Handoff:** record current state, unresolved issues, next action, and owner decisions.

## Persistent state

A simple implementation may use:
- `inbox/` for pending assignments
- `active/` for current assignments
- `completed/` for immutable completion records
- `reports/` for milestone and review reports
- `state/` for execution state, blocker register, and journal

This directory model is optional. Use the target project's existing durable state mechanism when available.

## Gates

- No assignment starts without a clear objective and acceptance criteria.
- No concurrent workers edit the same files without an explicit coordination plan.
- No assignment is complete based only on worker claims.
- No interrupted assignment is discarded without preserving its checkpoint.
- No final completion claim is made before lead integration and verification.
- Owner-controlled actions remain blocked until explicit authorization.

## Recovery

Use the recovery procedure in `skills/multi-agent-delegation/SKILL.md`. Resume from the last verified checkpoint, not from a guessed point in the conversation.

## Completion criteria

Every assignment has a terminal or explicitly blocked state, deliverables and evidence are retained, integration checks pass, independent review is addressed, and a useful handoff exists.
