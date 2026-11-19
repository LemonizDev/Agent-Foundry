---
id: verify
name: Verify
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [verify]
dependencies: [testing-and-verification]
---

# Verify

## Invocation

/verify [change, milestone or acceptance criteria]

## Behaviour

Build a verification matrix from the stated acceptance criteria. Run the narrowest relevant checks, then broader checks proportionate to risk. Report exact commands, outcomes, environment, skipped checks and evidence state. Never equate implementation with verification.
