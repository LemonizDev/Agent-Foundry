# Agent Foundry — Agent Operating Contract

## Mission

Maintain a reliable, reusable library of AI coding-agent resources. Extract proven practices from real projects, generalise them without losing their evidence or constraints, and keep tool-specific implementations separate from portable methods.

## Read order

Before substantial work, read:

1. `README.md` for scope and resource taxonomy.
2. `docs/architecture/RESOURCE_MODEL.md` for category boundaries.
3. `docs/EXTRACTION_REGISTER.md` for source provenance and extraction status.
4. The relevant resource's own specification and validation notes.

## Non-negotiable rules

- Inspect source material before extracting or editing it.
- Do not modify source repositories as part of extraction.
- Preserve provenance: every extracted resource records its source path, source revision/ref, extraction date, and generalisation decisions.
- Separate verified source behaviour from interpretation, proposed improvements, and untested assumptions.
- Never copy project-specific secrets, credentials, user data, domain rules, product decisions, or operational assumptions into the universal core.
- Do not label a proposed resource as extracted, implemented, tested, or verified.
- Keep global instructions compact. Put detailed procedures in skills and workflows.
- A command is an invocation contract, not a second copy of its skill.
- A workflow coordinates steps and gates; it is not merely a long skill.
- A profile defines responsibilities and boundaries, not fictional runtime capabilities.
- Tool adapters must reflect verified platform capabilities and version constraints.
- Prefer atomic, reviewable changes. Preserve unrelated work.
- Add validation for resource structure, links, dependencies, and examples as the repository grows.
- Do not commit, push, publish releases, or change repository settings unless explicitly requested.

## Extraction discipline

For each candidate resource:

1. Locate and inspect the complete source.
2. Classify it: universal, adaptable, domain-specific, tool-specific, or not reusable.
3. Record what is directly evidenced and what is inferred.
4. Remove project-specific names, paths, credentials, numbers, and policy assumptions.
5. Retain valuable constraints and failure cases rather than polishing them away.
6. Define dependencies, inputs, outputs, acceptance criteria, and validation.
7. Record source provenance and extraction status.
8. Test the resource against at least one realistic scenario before calling it validated.

## Status vocabulary

Use only these labels in extraction and validation records:

- `DISCOVERED`: source location found.
- `INSPECTED`: relevant source content read.
- `CANDIDATE`: appears reusable, not yet generalised.
- `DRAFTED`: generalised resource created.
- `VALIDATED`: tested against declared acceptance criteria.
- `ADAPTED`: transformed for a named platform or environment.
- `EXCLUDED`: intentionally not included, with reason.
- `BLOCKED`: cannot proceed; blocker recorded.

Never use one status as a synonym for another.
