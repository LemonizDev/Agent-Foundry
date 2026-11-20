# Distribution and Versioning

## Distribution model

Agent Foundry is distributed as a Git repository containing context files and a resource registry. It is not an executable package. There is no CLI, TUI, MCP server, daemon, API, dashboard or separate runtime.

The user's existing coding agent reads the source repository, adapts selected resources to the current project and writes approved files using its native capabilities.

## First installation

The user asks the coding agent to read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. The agent inspects the project, selects a minimal resource set, presents exact file changes and waits for approval.

This path requires repository/network access and project filesystem write access. If unavailable, the user must make the source available through the host's supported repository workflow. Do not claim universal remote fetching.

## Reproducible source identity

A consuming project's .agent-foundry/manifest.json should record the canonical source repository, resolved release tag or immutable commit SHA, selected resource IDs and versions, installed paths and content hashes, ownership information, host adaptations and known limitations.

A branch name is mutable and must not be represented as an immutable version. If a SHA cannot be resolved, record the source as unpinned or unknown.

## Updating and removal

The coding agent compares source revisions and content hashes, previews changes and conflicts, and preserves local modifications. Removal is based on verified manifest ownership, not directory names alone. The agent previews affected files, preserves user-owned content, obtains approval and verifies the result.

## Repository maintenance

Node.js and js-yaml are development-time tooling for repository validation and tests only. They are not required by projects that consume Foundry. CI validates registry integrity, Markdown links, YAML and JavaScript syntax, and regression guards prevent the removed CLI surface from returning.

## Versioning policy

Use Git tags for reviewed repository snapshots. A stable release requires passing repository checks, documentation and registry consistency, host acceptance evidence for advertised capabilities, and a reviewed migration note for breaking changes.

Do not publish a stable release or move a stable tag without explicit maintainer approval.
