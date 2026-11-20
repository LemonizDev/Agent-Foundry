---
id: resume
name: Resume Work
type: command
version: 0.2.0
portability: adaptable
status: draft
aliases: [resume, resume-work]
dependencies: [session-recovery, project-state-management, plan-reconciliation]
---

# Resume Work

## Invocation
`/resume [task or milestone]`

## Purpose
Recover interrupted work from actual repository state and durable records, not unverified chat summaries.

## Execution
1. Read project instructions, current state, roadmap and relevant decisions.
2. Inspect branch, working tree, uncommitted changes and recent commits.
3. Identify active plans, blockers and partially completed work.
4. Re-run targeted checks needed to establish the last verified checkpoint.
5. Compare recorded status with source and test evidence.
6. Preserve partial work and identify changes that must not be overwritten.
7. Propose the smallest safe next action.

## Safety
Read-only during reconciliation. Never reset, clean, stash, checkout over or discard uncommitted work without explicit approval. Treat old claims as leads to verify, not evidence.

## Output
Actual branch/worktree state; verified work; partial or unverified work; blockers; last reliable checkpoint; recommended next action and verification.
