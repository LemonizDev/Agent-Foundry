# Agent Foundry

A provider- and project-portable library of reusable AI coding-agent instructions, commands, skills, workflows, templates, standards, profiles, and tool adapters.

Agent Foundry is designed to make good engineering behaviour repeatable across repositories without copying an entire project's context into every agent session.

## Design principles

- **Portable core, explicit adapters:** engineering methods are tool-agnostic; platform-specific command formats live in adapters.
- **Small always-loaded context:** keep root instructions short and load specialised resources only when needed.
- **Evidence over claims:** distinguish implemented, automatically verified, visually inspected, unverified, and blocked work.
- **Accountability stays with the lead:** delegation distributes work, not responsibility.
- **Project context stays project-specific:** domain rules, secrets, product decisions, and local assumptions do not leak into universal resources.
- **Resources are versioned and testable:** a document is not a proven skill merely because it is well written.
- **No destructive surprises:** installation and updates must preserve project customisations and require explicit permission for consequential actions.

## Resource categories

| Category | Purpose |
|---|---|
| Core instructions | Compact global operating contract |
| Profiles | Role-specific responsibilities and boundaries |
| Skills | Reusable procedures for a bounded capability |
| Commands | User-invokable entry points mapped to skills/workflows |
| Workflows | Multi-step processes with gates and handoffs |
| Templates | Reusable document and assignment structures |
| Standards | Cross-cutting quality requirements |
| Integrations | Tool-specific adapters and generated configuration |
| Domain packs | Optional domain-specific knowledge and constraints |
| Scripts | Validation, packaging, installation, and migration utilities |

## Initial resource set\n\nThe first extraction pass includes skills for progress reporting, multi-agent delegation, visual QA, atomic implementation, and authoritative project-state management; a multi-agent campaign workflow; a progress-report command contract; reusable report/assignment/recovery templates; evidence and documentation standards; and lead-engineer, independent-reviewer, and visual-quality profiles. These are drafts pending scenario validation.\n\n## Current state

This repository is in its initial architecture and source-extraction phase. Resources are added only after their source is inspected, generalised, and classified. See:

- [Resource model](docs/architecture/RESOURCE_MODEL.md)
- [Extraction register](docs/EXTRACTION_REGISTER.md)
- [Resource authoring standard](docs/standards/RESOURCE_AUTHORING_STANDARD.md)

## Source repositories

The first extraction sources are:

- Dhan AI Trader: `LemonizDev/dhan-chatgpt-connector`, branch `foundation/final-trader-architecture`
- Lively Wallpaper: `LemonizDev/futuristic-lively-wallpaper`, branch `main`

Both are treated as read-only source material during extraction. No source project files are modified by this repository's extraction process.
