---
id: campaign-status
name: Campaign Status
type: command
version: 0.2.0
portability: adaptable
status: draft
dependencies: [multi-agent-campaign, campaign-state, response-presentation, conversational-interaction]
aliases: [campaign-status, "campaign status", "orchestration status"]
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


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/campaign-state.md` as the canonical layout.

Preserve the campaign's existing state definitions, assignment ledger, blockers, verification ledger and next actions. Never calculate progress from agent messages or elapsed time. Preserve the command's procedure, permissions and required evidence fields.
## Response
Show campaign goal and last reconciled timestamp; compact progress by state; an assignment table with ID, owner, state, dependency, last checkpoint and evidence; blockers and owner decisions; verification gaps; and one recommended next action.

Never calculate progress by counting agent messages or time spent. Weight work by acceptance criteria or report a state distribution instead.
