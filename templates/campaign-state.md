# Campaign State: [campaign-id]

- **Campaign:** [short name]
- **Lead:** [agent/owner]
- **Status:** PLANNING
- **Last reconciled:** [timestamp]
- **Source of truth:** [plan / issue / project document]
- **Next checkpoint:** [observable checkpoint]

## Objective and acceptance
[Outcome and measurable completion conditions.]

## Workstreams
| ID | Assignment | Owner | Status | Depends on | Output | Last verified checkpoint |
|---|---|---|---|---|---|---|
| A-001 | [bounded task] | [worker] | PENDING | [IDs] | [path] | [checkpoint] |

## State definitions
- PENDING: scoped and ready, not started.
- ACTIVE: work is in progress.
- REVIEW: worker reports completion; evidence awaits review.
- COMPLETED: integrated and accepted against criteria.
- BLOCKED: cannot proceed until a named dependency or owner decision is resolved.
- INTERRUPTED: execution stopped; checkpoint retained for recovery.
- FAILED: bounded attempt failed; reason and remaining work recorded.
- SUPERSEDED: intentionally replaced by a newer assignment or decision.

## Decisions required from owner
| Decision | Why it is owner-controlled | Needed by | Status |
|---|---|---|---|

## Blockers and risks
| ID | Impact | Evidence | Owner | Resolution condition |
|---|---|---|---|---|

## Verification ledger
| Claim | Evidence / exact command | Result | Environment | Status |
|---|---|---|---|---|

## Recent events
Append concise state transitions, decisions, checkpoints and verification results. Do not paste raw transcripts.

## Next actions
1. [Highest-value next action]
2. [Dependency or review]
