# Contributing to Agent Foundry

Agent Foundry is a context-file system, not an application. Contributions should improve a real developer outcome without adding infrastructure developers must install or maintain.

You do not need to be a maintainer or an experienced TypeScript developer. Useful contributions include project instructions, skills, commands, workflows, agent profiles, settings, templates, host adapters, test methods and documentation.

## The easiest way: ask your coding agent

If Agent Foundry is installed in your project and the relevant files are accessible, say:

**"I'd like to contribute."**

The contribution-discovery workflow will:
1. Inspect accessible project instructions, rules, skills, commands, workflows, profiles, settings, templates and relevant documentation.
2. Identify reusable practices and compare them with the existing Foundry registry.
3. Exclude secrets, personal information, confidential records and project-specific state.
4. Show a numbered shortlist with type, portability, maturity, value and suggested destination.
5. Ask one focused question about the strongest candidate.
6. Draft only the resources you select.
7. Show the exact proposed files and validation plan.

Discovery is not publication approval. Nothing should be uploaded, committed, pushed or published until you explicitly approve that action. The scan cannot access other chats, global account settings or external services unless you make those sources available to the host.

See:
- Contribution discovery skill: skills/contribution-discovery/SKILL.md
- Contribute command: commands/contribute.md
- Management procedure: foundry/MANAGEMENT.md
- Response format: foundry/RESPONSE_TEMPLATES.md

## Before contributing manually

1. Read the README and relevant files under foundry/.
2. Check whether an equivalent resource already exists in registry/resources.yaml.
3. Identify the user problem, target project types and applicable host conventions.
4. Separate universal practices from project-specific, domain-specific and host-specific material.
5. Preserve provenance and note any licensing or attribution requirements.

## Resource requirements

Every resource needs a clear purpose, intended consumer, trigger or use case, prerequisites, procedure, output contract, failure handling and safety boundaries. Settings must be defined in the authoritative specification. Host-specific claims require evidence from the exact host version.

Do not add duplicate context, arbitrary toggles, fictional permissions, unsupported model capability ratings, credentials or private project data.

## Changes and validation

- Keep changes focused and preserve established naming conventions.
- Add registry entries for new reusable resources.
- Update the documentation index and root README navigation when public paths or user-facing behaviour change.
- Add tests for registry integrity, dependencies, documentation links and product boundaries.
- Run npm ci, npm test and npm run validate:repo.
- Distinguish automated repository checks from manual host acceptance testing.
- Do not introduce a CLI, TUI, MCP server, daemon, API, dashboard or runtime.

## Pull requests

Explain the user problem, architecture impact, resource changes, source provenance, safety implications, tests actually run and known limitations. Breaking changes require a migration note.

## What makes a strong contribution?

- It solves a recurring problem rather than expressing a one-off preference.
- Another agent can follow it without access to your original conversation.
- It is small, clear and independently reviewable.
- It has observable completion criteria.
- It does not assume a specific model, provider, paid plan or host feature unless it is explicitly an adapter.
- It separates reusable method from private project data.
