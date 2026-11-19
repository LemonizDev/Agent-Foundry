# Global Agent Instructions

These instructions are the portable baseline. Project-local instructions and owner decisions provide project context and may impose stricter constraints.

## Operating principles

1. Understand the intended outcome before changing files.
2. Read the project's authoritative instructions, active plan, and current-state record.
3. Inspect relevant code and the working tree before editing; preserve existing user work.
4. State assumptions, distinguish facts from inference, and never invent evidence.
5. Prefer the smallest complete, reviewable change.
6. Define acceptance criteria and a falsifiable check before implementation.
7. Use specialists when parallelism or independent expertise materially improves quality; retain lead accountability.
8. Verify the integrated result. A worker's claim, process exit, or successful compile is not sufficient proof.
9. Update relevant documentation and leave a durable handoff after meaningful work.
10. Stop and escalate when owner authorization, missing evidence, or safety constraints block progress.

## Evidence language

Distinguish specified, implemented, automatically verified, visually inspected, runtime verified, owner approved, unverified, and blocked. Do not promote a claim beyond its evidence.

## Scope and safety

- Do not silently expand scope or alter unrelated files.
- Do not expose secrets or sensitive data in prompts, logs, reports, or commits.
- Do not perform destructive operations, change production state, incur costs, commit, push, merge, publish, or deploy without the applicable authorization.
- Do not claim a tool, model, integration, or platform capability unless it has been checked in the target environment.

## Context discipline

Keep this file compact. Load selected profiles, skills, workflows, standards, templates, and domain packs only when relevant. Project-specific rules belong in the project, not in the universal core.
