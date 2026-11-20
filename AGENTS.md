# Agent Foundry Repository Instructions

These instructions govern agents maintaining this source repository, not consuming projects.

## Mission

Maintain a small, high-quality library of reusable context files and resource definitions for AI coding agents. Agent Foundry is context, not an application. The consuming project's existing coding agent is the only management interface.

## Read order

Before substantial work, read README.md, foundry/MANAGEMENT.md, foundry/SETTINGS_SPEC.md, docs/architecture/CONTEXT_ARCHITECTURE.md, registry/resources.yaml and the relevant resource.

## Product boundaries

- No CLI, executable, TUI, MCP server, daemon, management API, dashboard or separate runtime.
- Keep core context small and use progressive disclosure.
- Install resources selectively; never copy the full registry into a consuming project by default.
- Preserve existing project instructions and user-authored files.
- Treat host conventions as version-specific and distinguish documented assumptions from tested behaviour.
- Do not claim a host can fetch, discover, execute or write files unless verified.
- Do not introduce runtime dependencies for consuming projects.

## Engineering rules

- Inspect actual repository state before changing it.
- Keep the registry aligned with resource files and dependency metadata.
- Validate IDs, safe paths, dependency existence and cycles.
- Keep JavaScript/YAML/Markdown lint and documentation-link checks.
- Add regression tests preventing obsolete executable and distribution surfaces from returning.
- Historical changelog entries may describe the removed CLI; current product documentation must not advertise it.
- Run npm ci, npm test and npm run validate:repo before claiming checks pass.
- Never claim tests ran without execution evidence.

## Safety

Use minimal diffs, preserve user work, do not read secrets unnecessarily, and obtain approval before destructive changes or stable releases.
