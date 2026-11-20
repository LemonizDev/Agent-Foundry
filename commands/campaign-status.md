---
id: campaign-status
name: Campaign Status
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [campaign-status, "campaign status", "orchestration status"]
dependencies:
  - multi-agent-campaign
  - campaign-state
---

# Campaign Status

## Intent
Reconcile the actual state of a multi-agent campaign and report progress, blockers, worker states, evidence and the next action.

## Procedure
1. Locate the campaign's canonical state record or task board. Do not create a competing source of truth.
2. Inspect each active/pending assignment, latest worker handoff, relevant diff and verification record.
3. Reconcile reported status against repository/task-board evidence.
4. Identify stale assignments, duplicate work, overlapping write scopes, missing checkpoints and unresolved dependencies.
5. Distinguish worker-reported completion from lead-integrated completion.
6. Update the campaign record only if the user asked for state maintenance and the host has write access; otherwise report proposed corrections.
7. Recommend one highest-value next action.

## Response
Show campaign goal and last reconciled timestamp; compact progress by state; an assignment table with ID, owner, state, dependency, last checkpoint and evidence; blockers and owner decisions; verification gaps; and one recommended next action.

Never calculate progress by counting agent messages or time spent. Weight work by acceptance criteria or report a state distribution instead.
