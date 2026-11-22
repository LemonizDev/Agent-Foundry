---
id: delegate
name: Delegate
type: command
version: 0.3.0
portability: adaptable
status: draft
dependencies: [multi-agent-delegation, model-delegation-architecture, response-presentation, conversational-interaction, delegation-assignment]
aliases: [delegate]
---

# Delegate

## Invocation
`/delegate [task or workstream]`

## Purpose
Create an accountable, bounded assignment another agent or human can execute without losing context, ownership or integration responsibility.

## Inputs
Desired outcome, acceptance criteria, constraints, available agents, model roster and host capabilities.

## Execution
1. Classify task type, intensity, uncertainty, risk and tool requirements.
2. Check roster eligibility and actual host delegation capabilities.
3. Recommend a worker only when minimum capability requirements are met.
4. Split work along low-coupling boundaries with explicit file ownership.
5. Define objective, non-goals, context, outputs, acceptance criteria and tests.
6. Set checkpoints, escalation and recovery rules.
7. Identify integration owner and independent-review requirement.
8. Dispatch only when supported and authorised.

## Safety
Never claim a worker launched when only an assignment was written. Do not delegate secrets or unrestricted production access. Avoid overlapping file ownership. Lead agent retains integration and final verification accountability.


## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `templates/delegation-assignment.md` as the canonical layout.

Make objective, scope, file ownership, acceptance criteria, checkpoints and dispatch state explicit. Preserve the command's procedure, permissions and required evidence fields.
## Output
Assignment, worker/model rationale, ownership, checkpoint plan, acceptance criteria and dispatch status. If dispatch is unsupported, provide the assignment for manual execution.

## Failure behaviour
If no candidate clears the quality floor, explain why and recommend owner review or a different decomposition.
