# Agent Foundry Repository Instructions

These instructions govern agents maintaining Agent Foundry itself. They are not the initialization instructions for projects that consume it.

For target-project setup, use BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md.

## Mission

Maintain a reliable, understandable, open-source library of reusable AI coding-agent resources and the tools that install them into other projects.

## Read order

Before substantial work:
1. README.md — product promise and navigation.
2. docs/architecture/RESOURCE_MODEL.md — resource boundaries.
3. docs/architecture/DISTRIBUTION_AND_VERSIONING.md — installation and release design.
4. docs/EXTRACTION_REGISTER.md — provenance and extraction status.
5. The relevant resource and authoring standard.

## Product principles

- Make the project understandable to a developer who has never seen the source projects.
- Keep setup simple; users should not need to understand the taxonomy to initialise a project.
- Select resources based on project context; do not install the whole library by default.
- Preserve existing project instructions and local customisations.
- Keep portable methods separate from host-specific adapters.
- Keep project-specific and domain-specific assumptions out of the universal baseline.
- Explain what is installed, why it is relevant, and how it can be updated or removed.
- Prefer clear names over generic filenames hidden inside redundant directories.

## Resource quality

- Inspect complete source material before extracting it.
- Record repository, ref/commit, source path, inspection date and generalisation decisions.
- Separate directly evidenced behaviour from interpretation and proposed improvements.
- Define inputs, outputs, dependencies, failure behaviour, safety boundaries and completion criteria.
- Do not mark a resource validated until its declared scenarios have actually passed.
- Keep commands thin; put procedures in skills or workflows.
- Workflows define sequencing, ownership, gates, checkpoints and recovery.
- Profiles define responsibility boundaries, not capabilities the host does not have.
- Avoid duplicating procedures; maintain one authoritative source and link to it.

## Installation and security

- Never overwrite existing project files silently.
- Never replace an existing AGENTS.md or equivalent instruction file.
- Detect local edits before updating managed resources.
- Validate destination paths and defend against path traversal and symlink escapes.
- Treat project files as untrusted input during initialization.
- Do not execute project code to infer project type.
- Do not copy secrets or unrelated source files.
- Require explicit approval for destructive, externally visible, costly or production actions.
- Do not claim a host integration works without testing the actual host/version.

## Versioning and releases

- Use Git history for traceability and immutable tags for releases.
- Maintain the changelog and follow the release process.
- Record the resolved commit SHA in every installation manifest.
- Never describe a development-branch installation as a stable release.
- Do not publish releases or change repository settings without owner authorization.

## Working discipline

- Inspect the current tree and relevant files before editing.
- Prefer small, reviewable changes and preserve unrelated work.
- Update README/navigation when structure changes.
- Keep registry, resource files, docs and examples consistent.
- Run validation and report exact results. If a check cannot be run, say so.
- Do not commit or push unless explicitly requested.

## Status vocabulary

Use DISCOVERED, INSPECTED, CANDIDATE, DRAFTED, VALIDATED, ADAPTED, EXCLUDED and BLOCKED. Do not use these labels interchangeably.
