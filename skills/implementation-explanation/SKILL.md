---
id: implementation-explanation
name: Explain and Teach an Implementation
type: skill
version: 0.2.0
status: draft
portability: adaptable
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    path: .kilo/commands/TEACHING_AFTER_IMPLEMENTATION.md
  - repository: LemonizDev/futuristic-lively-wallpaper
    path: rules/TEACHING_AFTER_IMPLEMENTATION.md
---

# Explain and Teach an Implementation

## Purpose

Help the project owner understand what changed, how the behaviour differs, and where the implementation can fail.

## Procedure

1. Summarise the change in plain language in 2–3 sentences.
2. Show before/after flow using a compact ASCII diagram.
3. Show completion and remaining work separately. Use a percentage only when defensible.
4. State three important implementation facts.
5. Identify one or two realistic failure or edge-case scenarios.
6. Distinguish what was implemented from what was tested or verified.

## Constraints

- Avoid unexplained jargon.
- Do not claim a feature is complete just because code was written.
- Do not force a diagram for a trivial change where it adds no explanatory value; briefly state the simple behavioural difference instead.
- Keep the explanation proportionate to the change.

## Completion criteria

The owner can explain the behaviour change, the important constraints, the verification status, and at least one way the change could fail.
