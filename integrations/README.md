# Coding-Agent Host Integrations

Agent Foundry separates reusable engineering methods from the file formats and capabilities exposed by each coding-agent host.

## What an adapter must do

An adapter translates the portable Foundry model into a host's real mechanisms:

| Foundry concept | Host capability to map |
|---|---|
| Core instructions | Root instruction file or project rules |
| Skills | Reusable skill folders, reference documents or context-loading mechanism |
| Commands | Native slash commands, prompt shortcuts or named workflows |
| Profiles | Agent/mode definitions where supported |
| Workflows | Multi-step task instructions and orchestration |
| Model roster | Host-supported model/provider configuration or recommendation-only mode |
| Session close | Context update procedure; chat closure only if a documented host API exists |
| Permissions | Host permission controls and external isolation boundaries |

## Current compatibility status

| Host | Generic AGENTS.md entrypoint | Native commands | Subagents/model dispatch | Status |
|---|---:|---:|---:|---|
| Codex / AGENTS-compatible tools | Yes, where the host reads AGENTS.md | Not installed by current CLI | Not implemented by current CLI | Generic entrypoint only |
| OpenCode | Requires version-specific verification | Not installed | Not implemented | Not validated |
| Claude Code | Requires CLAUDE.md adapter | Not installed | Not implemented | Not validated |
| Kilo Code | Requires version-specific rules/commands adapter | Not installed | Not implemented | Not validated |
| Cline | Requires version-specific rules/workflows adapter | Not installed | Not implemented | Not validated |

Do not interpret a generic instruction pointer as full native integration. A host must be tested before it is marked supported.

## Adapter acceptance criteria

Every adapter must document:
- supported tool and tested version;
- native file locations and formats;
- mapping from each Foundry resource type;
- unsupported concepts and limitations;
- installation, update and uninstall behaviour;
- permission and trust boundaries;
- validation performed, date and evidence.

## Adapter roadmap

1. Codex/AGENTS-compatible baseline.
2. Claude Code: CLAUDE.md pointer, skills and command generation.
3. OpenCode: instructions, commands, agents and model roster mapping.
4. Kilo Code: rules, modes, workflows and subagent mapping.
5. Cline: rules, workflows and task continuity mapping.

Each adapter should be independently versioned and tested. A partial adapter is better than claiming universal support and silently dropping important semantics.
