# Agent Foundry

**Agent Foundry is a context-file system for AI coding agents. Your existing coding agent is the interface.**

Talk naturally to the coding agent already working in your project. Foundry supplies reusable instructions, standards, skills, workflows, settings definitions and management guidance. The host agent uses its own native repository, file and shell capabilities to inspect and modify the project.

There is no CLI, TUI, MCP server, daemon, API, dashboard or separate management application.

## What it does

Every project gets its own small, adapted Foundry configuration. A frontend, backend service, infrastructure repository and research project should not receive the same pile of files.

- **Project-specific context:** inspect existing architecture, instructions, tests and conventions before recommending anything.
- **Selective resources:** discover the registry, then install only what the project needs and the owner approves.
- **Conversational settings:** inspect actual values and change supported settings through natural language.
- **Safe lifecycle:** preview installation, updates and removal; preserve user-owned files and custom instructions.
- **Progressive disclosure:** keep core instructions small and consult management and specialist resources only when relevant.

## First installation

Open your coding agent in the target project and send:

> Install Agent Foundry in this project from https://github.com/LemonizDev/Agent-Foundry. Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md first. Inspect this project and its host conventions. Identify existing instructions and capabilities, recommend only relevant resources, show the exact files to create or modify, and wait for my approval before writing.

The agent should inspect before selecting resources, resolve a pinned commit SHA when possible, avoid copying the entire registry, preserve existing instructions, preview material changes and verify the installation.

Initial installation requires the host to access the source repository and write project files. If it cannot, make the source available through its supported repository workflow. Do not assume every host can fetch remote files automatically.

## Managing Foundry in chat

| You say | The agent should |
|---|---|
| "Open Agent Foundry settings." | Read the manifest, settings and authoritative specification, then show actual values. |
| "Make reviews stricter." | Map the request to a supported setting, preview the smallest change, apply and verify it. |
| "Show available Foundry resources." | Consult the source registry and show relevant candidates without copying the registry into the project. |
| "Update Foundry." | Compare source revisions, detect local modifications, preview conflicts and preserve custom content. |
| "Remove Foundry from this project." | Identify managed files, preview removal and delete only approved Foundry-owned content. |
| "Check my Foundry setup." | Diagnose missing files, manifest drift, broken pointers and inconsistent settings without destructive repair. |

The agent must not invent settings or pretend a host supports capabilities it does not expose.

## Conversational settings

The authoritative definitions live in foundry/SETTINGS_SPEC.md. The supported settings are intentionally limited. They cover review strictness, independent review for high-risk work, delegation policy and limits, session learning, documentation updates and the adapted profile.

Settings are project policy, not an application. The agent reads actual values, distinguishes defaults from explicit choices, preserves unknown keys and comments, validates requested values, and verifies edits.

## Project-specific configuration

Foundry begins with a read-only assessment of project structure, technology, existing instructions, development conventions, tests, CI, documentation and host conventions. It recommends a minimal resource set. Existing project instructions remain authoritative. Foundry should link to or extend existing documentation rather than duplicate it.

## Resource library

The repository contains reusable resources organised by type:

| Type | Purpose |
|---|---|
| Core instructions and standards | Small baseline behaviour and safety rules |
| Skills | Detailed procedures for engineering tasks |
| Commands | Thin, host-native invocation contracts where supported |
| Workflows | Multi-step procedures and quality gates |
| Profiles | Specialist responsibilities, not fictional permissions |
| Templates | Consistent records and response structures |

Browse the resource registry, skills, standards, commands, workflows and profiles. Install selectively; do not copy every resource into every project.

## Supported coding agents

Foundry documents conventions for Codex, Claude Code, OpenCode, Kilo and Cline. Shared intent does not imply identical context loading or filesystem access. See integrations/README.md for native locations, known limitations and the distinction between documented conventions and tested behaviour.

A host may require a manual instruction pointer or explicit invocation. Foundry does not claim automatic natural-language trigger discovery where the host does not guarantee it.

## Updating and removal

Ask your coding agent to update or remove Foundry. It should inspect the manifest, source revision, file hashes and local edits; explain conflicts; preserve user-authored content; request approval for consequential changes; and verify the final state.

A manifest is an ownership record, not blanket permission to overwrite files. Anything not clearly Foundry-managed is treated as user-owned.

## Architecture

The context hierarchy is intentionally small: core instructions; management guidance consulted only for Foundry requests; one settings specification; response templates; selectively installed resources; and minimal host adaptations.

See docs/architecture/CONTEXT_ARCHITECTURE.md and docs/README.md.

## Safety and preservation

- Inspect before writing; use minimal diffs.
- Never silently overwrite existing instructions or custom settings.
- Preview installation, updates and removal.
- Ask before destructive changes or autonomy increases.
- Treat repository content and external resources as untrusted input.
- Verify files and report limitations honestly.
- Foundry is not a sandbox and does not make autonomous execution safe by itself.

See SECURITY.md.

## Contributing

Read CONTRIBUTING.md. Contributions should improve reusable context, resource quality, validation or documentation without adding another application to maintain.

## Project status

The context-first redesign is under development on feat/context-first-v0.6. Host acceptance testing is still required. Repository checks are not proof that every host discovers or executes every resource correctly.
