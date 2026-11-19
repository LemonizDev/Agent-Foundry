---
id: resume
name: Resume Work
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [resume, resume-work]
dependencies: [session-recovery, project-state-management, plan-reconciliation]
---

# Resume Work

## Invocation

/resume [task or milestone]

## Behaviour

Run Interrupted Work Recovery. Inspect actual repository state and reconcile it against project records. Preserve partial work and uncommitted changes. Identify the last verified checkpoint, current blockers and the next safe action. Do not trust old chat claims without rechecking.
