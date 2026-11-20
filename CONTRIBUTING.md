# Contributing to Agent Foundry

Agent Foundry is a context-file system, not an application. Contributions should improve a real developer outcome without adding infrastructure developers must install or maintain.

## Before contributing

1. Read the README and relevant files under foundry/.
2. Check whether an equivalent resource already exists.
3. Identify the user problem, target project types and applicable host conventions.
4. Keep universal practices separate from project-specific and host-specific material.

## Resource requirements

Every resource needs a clear purpose, intended consumer, prerequisites, procedure, output contract and safety boundaries. Settings must be defined in the authoritative specification. Host-specific claims require evidence from the exact host version.

Do not add duplicate context, arbitrary toggles, fictional permissions, unsupported model capability ratings, credentials or private project data.

## Changes and validation

- Keep changes focused and preserve established naming conventions.
- Add tests for registry integrity, dependencies, documentation links and product boundaries.
- Run npm ci, npm test and npm run validate:repo.
- Update the README, documentation index and changelog when user-facing behaviour changes.
- Distinguish automated repository checks from manual host acceptance testing.
- Do not introduce a CLI, TUI, MCP server, daemon, API, dashboard or runtime.

## Pull requests

Explain the user problem, architecture impact, resource changes, safety implications, tests actually run and known limitations. Breaking changes require a migration note.
