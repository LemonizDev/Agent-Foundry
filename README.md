<div align="center">

# Agent Foundry

### Give your AI coding agent a repeatable engineering system.

Reusable instructions, specialist roles, skills and workflows that can be selected and installed into a project in minutes.

**Inspect your project → choose relevant resources → initialise once → build with a consistent standard.**

[Getting Started](#get-started) · [What It Does](#what-is-agent-foundry) · [Resource Library](#resource-library) · [Roadmap](#project-status)

</div>

---

## What is Agent Foundry?

Every new software project starts with the same problem: the coding agent has no idea how your team wants engineering work done.

You end up rebuilding the same instructions again and again:
- How should the agent inspect a codebase before editing?
- When should it delegate work to other agents?
- How should it test, review and verify changes?
- How should it report progress without making things up?
- How should it preserve project context between sessions?
- What should happen when an agent fails halfway through a task?

**Agent Foundry is a reusable library of answers to those questions.**

It provides a baseline engineering approach and optional resources for specialised work. When initialised in a project, only the resources relevant to that project should be added. The project keeps its own architecture, product decisions and domain rules.

Agent Foundry does not replace your coding agent, dictate your tech stack, or magically make weak models good engineers. It gives the agent a clearer operating system for the work.

## Get started

### The intended experience

You should not need to clone this repository, understand its folder structure or manually copy Markdown files.

1. Open your project in your coding agent.
2. Give it the Agent Foundry repository link and the initialization instruction below.
3. Review the proposed resource selection.
4. Approve the setup. The agent adds the selected resources to your project.

Copy this into your coding agent:

> Initialise this project with Agent Foundry: https://github.com/LemonizDev/Agent-Foundry  
> Follow the instructions in BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. First inspect my project and existing agent instructions. Recommend only relevant resources, explain why each is needed, and show me the files you plan to create or modify. Preserve all existing project instructions and wait for my approval before writing anything.

**Current implementation status:** the agent-first initialization procedure is documented, but the automated installer and tested platform adapters are not released yet. Until then, the coding agent must follow the bootstrap procedure manually and report any unsupported steps. We will not pretend a documented design is already a working installer.

[Read the initialization guide](BOOTSTRAP.md) · [Read the full agent procedure](bootstrap/INITIALIZE_PROJECT.md)

## What gets added to a project?

The intended installation is small, local and traceable:

    your-project/
    ├── AGENTS.md                 # Your existing instructions, preserved
    └── .agent-foundry/
        ├── manifest.yaml         # Foundry version and selected resources
        ├── instructions.md       # Short entrypoint for the coding agent
        ├── resources/            # Only the resources selected for this project
        ├── overrides/            # Your explicit local customisations
        └── README.md             # What was installed and how to maintain it

The manifest records exactly what was installed and where it came from. Future updates must detect local edits and show a diff instead of silently overwriting them.

## What is in the library?

Agent Foundry separates different kinds of guidance so a project does not need one enormous instruction file.

| Resource | In plain English | Example |
|---|---|---|
| **Core instructions** | Baseline rules for how the agent should work | Inspect before editing; verify before claiming completion |
| **Profiles** | Defines a role and its responsibilities | Lead engineer, independent reviewer |
| **Skills** | Teaches the agent how to perform a specific task | Debugging, delegation, visual QA |
| **Commands** | Gives the user a named way to request an action | Generate a progress report |
| **Workflows** | Coordinates a multi-step process | Run a multi-agent engineering campaign |
| **Standards** | Sets quality rules used across tasks | Evidence, security, documentation |
| **Templates** | Provides a consistent structure for deliverables | Test report, handoff, decision record |
| **Integrations** | Maps portable resources to a specific coding-agent tool | Tool-native skills or command definitions |

A command is an entry point, not the full procedure. A skill contains the procedure. A workflow coordinates several procedures. A platform integration translates the portable resource into the format a particular coding agent understands.

### Browse by what you want to do

| Your goal | Start with |
|---|---|
| Give an agent a consistent engineering baseline | [Global instructions](core/GLOBAL_INSTRUCTIONS.md) |
| Delegate work and coordinate multiple agents | [Multi-agent delegation](skills/multi-agent-delegation/SKILL.md) |
| Run a multi-agent campaign | [Campaign workflow](workflows/multi-agent-campaign.md.md) |
| Get an evidence-based progress report | [Progress-report command](commands/progress-report.md) |
| Explain a code change clearly | [Implementation explanation](skills/implementation-explanation/SKILL.md) |
| Review visual output and rendering behaviour | [Visual regression](skills/visual-regression/SKILL.md) |
| Design repeatable visual diagnostics | [Visual probe engineering](skills/visual-probe-engineering/SKILL.md) |
| Protect evidence from leaking sensitive data | [Privacy-safe evidence](skills/privacy-safe-evidence/SKILL.md) |
| Assess risks from autonomous agent execution | [Agent execution security](skills/agent-execution-security/SKILL.md) |
| Keep plans and project status consistent | [Plan reconciliation](skills/plan-reconciliation/SKILL.md) |

See the [full resource registry](registry/resources.yaml) for machine-readable metadata.

## Why does it exist?

The first resources were extracted from two real projects:

- **Dhan AI Trader:** a large engineering project with multi-agent delegation, specialist roles, durable orchestration, governance, security reviews and regression testing.
- **Lively Wallpaper:** a smaller graphics-heavy project with creative direction, rendering specialists, visual probes, performance checks and audio-reactive design work.

The goal is not to copy either project's architecture into every repository. It is to extract the engineering practices that proved useful, remove project-specific assumptions, and make the reusable parts available to other developers.

[See the source inventory](docs/audit/REUSABLE_RESOURCE_INVENTORY.md) · [See extraction decisions](docs/audit/EXTRACTION_DECISIONS.md)

## Designed to be portable

The resource library is platform-independent wherever possible. Coding-agent tools differ, though. Some support native skills, some support slash commands, some support subagents, and some expose only instruction files.

Agent Foundry keeps the reusable method separate from the platform-specific implementation. An integration must name the tool and version it supports and provide evidence that the mapping works.

We intend to support multiple coding-agent environments, but **a tool is not supported just because its name appears in a roadmap**.

## Open source and community

Agent Foundry is intended to be useful beyond its original projects. Contributions are welcome: reusable skills, better workflows, new platform adapters, validation scenarios, bug reports and documentation improvements.

Before a stable public release, this repository still needs its open-source license, contribution/security policies, automated validation, installer and tested integrations. Check the project status before relying on it in production.

- [Project status and roadmap](docs/architecture/DISTRIBUTION_AND_VERSIONING.md)
- [Resource authoring standard](docs/standards/RESOURCE_AUTHORING_STANDARD.md)
- [Documentation index](docs/README.md)
- [Changelog](CHANGELOG.md)

---

<div align="center">

**Agent Foundry**  
*Build the project. Don't rebuild your agent's operating instructions every time.*

</div>
