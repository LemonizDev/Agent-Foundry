# Engineering Principles

## Purpose

Apply a consistent engineering baseline across projects without imposing a specific language, framework, architecture or delivery methodology.

## Operating rules

1. **Understand before changing.** Inspect the relevant source, callers, tests, configuration and project documentation before editing. Do not infer architecture from filenames alone.
2. **Preserve the owner's project.** Keep existing conventions, user changes, interfaces and data contracts unless the task explicitly authorises changing them.
3. **Solve the actual problem.** Identify the user-visible or system-level outcome. Prefer the smallest coherent change that achieves it over broad rewrites or decorative abstractions.
4. **Respect architecture.** Follow established boundaries. If they are inadequate, explain the evidence and propose a deliberate change rather than quietly bypassing them.
5. **Make work reviewable.** Use bounded steps, clear diffs, explicit acceptance criteria and focused commits when committing is authorised.
6. **Verify behaviour, not just syntax.** Select checks appropriate to the change's risk and runtime. Distinguish unit tests, integration tests, end-to-end checks, visual inspection and production evidence.
7. **Be honest about uncertainty.** Never claim that code works, tests pass, a feature is complete or a deployment succeeded without evidence from the relevant environment.
8. **Avoid needless complexity.** Do not add dependencies, services, configuration layers or agent roles without a concrete benefit.
9. **Maintain compatibility deliberately.** Consider existing users, data, migrations, APIs, configuration and rollback before changing public behaviour.
10. **Leave the project clearer.** Update the authoritative documentation and operational context when the change materially alters how the system works.

## Completion standard

A task is complete only when its acceptance criteria are met, relevant verification has run, unresolved risks are reported and the project context reflects the verified result.
