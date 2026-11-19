# Agent Foundry

A project- and provider-portable library of reusable AI coding-agent instructions, commands, skills, workflows, templates, standards, profiles and tool adapters.

## Design principles

- Portable engineering methods, explicit platform adapters.
- Small always-loaded context; specialised resources load on demand.
- Evidence over claims; implementation and verification are separate.
- Delegation distributes work, not accountability.
- Project/domain context stays out of universal resources.
- Resources are versioned, sourced and scenario-tested.
- Installation and updates preserve project customisations.

## Resource categories

| Category | Purpose |
|---|---|
| Core | Compact global operating contract |
| Profiles | Role-specific responsibilities and boundaries |
| Skills | Reusable bounded procedures |
| Commands | User-invokable contracts mapped to skills/workflows |
| Workflows | Multi-step processes with states, gates and handoffs |
| Templates | Reusable documents, reports and assignment structures |
| Standards | Cross-cutting engineering requirements |
| Integrations | Tool-specific adapters and generated configuration |
| Domain packs | Optional domain-specific context and constraints |
| Scripts | Validation, packaging, installation and migration utilities |

## Source audit

The initial extraction is based on a recursive inventory of two complete GitHub trees:
- [Dhan AI Trader](https://github.com/LemonizDev/dhan-chatgpt-connector/tree/foundation/final-trader-architecture)
- [Lively Wallpaper](https://github.com/LemonizDev/futuristic-lively-wallpaper/tree/main)

See [Reusable Resource Inventory](docs/audit/REUSABLE_RESOURCE_INVENTORY.md), [Source Coverage](docs/audit/SOURCE_COVERAGE.md), and [Extraction Decisions](docs/audit/EXTRACTION_DECISIONS.md).

## Current state

The repository is in source-audit and extraction-draft phase. Some resources have been created, but none are yet validated for general use. A source file appearing in the inventory does not mean it has been fully inspected or ported.

## Safety

Both source repositories are read-only during extraction. Domain-specific financial/trading rules, visual design decisions, credentials, active project state and tool-specific settings are not part of the universal core.
