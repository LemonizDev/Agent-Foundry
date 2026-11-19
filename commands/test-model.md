---
id: test-model
name: Test Model
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases:
  - /models test
dependencies:
  - docs/architecture/MODEL_DELEGATION.md
  - templates/settings/model-roster.yaml
---

# Test Model

## Invocation

`/models test [alias]`

## Purpose

Run a bounded evaluation of a model configured in the project roster, where the host and provider permit it.

## Behaviour

1. Resolve the alias from the project model roster.
2. Confirm the configured endpoint and tool permissions are available without exposing credentials.
3. Select a small task suite appropriate to the model's declared capabilities.
4. Test instruction adherence, task accuracy, structured output, tool use and latency where measurable.
5. Record exact prompts/tasks, outcomes, errors, elapsed time and environment.
6. Recommend roster updates only when the evidence supports them.

## Safety

- Do not make paid API calls unless the owner has explicitly authorised the cost.
- Do not test against production systems or real user data.
- Do not treat one successful prompt as proof of broad capability.
- Do not overwrite roster ratings automatically. Present evidence and proposed changes for owner approval.
- If the host cannot select the model or the provider endpoint is unavailable, report BLOCKED rather than pretending the test ran.
