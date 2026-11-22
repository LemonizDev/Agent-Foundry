# Resource Model

## Architecture

Agent Foundry separates reusable context into layers. The goal is progressive disclosure without duplicating project knowledge or loading every procedure into every request.

| Layer | Resource | Purpose |
|---|---|---|
| Identity and policy | Core instructions | Essential behaviour for agent sessions |
| Rules | Standards | Quality, safety and evidence requirements |
| Procedure | Skills | Detailed task methods consulted when relevant |
| Invocation | Commands | Thin request contracts where the host supports native invocation |
| Coordination | Workflows | Multi-step activities and quality gates |
| Responsibility | Profiles | Specialist roles without fictional permissions |
| Reusable output | Templates | Consistent records and response structures |
| Host adaptation | Integrations | Minimal host-specific context conventions |

## Resource contracts

Core instructions remain compact and point to detailed material. Standards define rules. Skills define bounded procedures with prerequisites, steps, outputs and failure handling. Commands define invocation intent but do not guarantee a host-native command exists. Workflows coordinate activities and gates. Profiles define responsibility, not tools or permissions. Templates define output structure.

## Presentation and interaction contracts

Standards define not only engineering and safety policy but also how agents communicate and gather owner input. The response-presentation standard governs reusable visual hierarchy and terminal-safe structured output. The conversational-interaction standard governs progressive, one-question-at-a-time input and approval gates. Commands reference canonical templates so recurring outputs remain consistent without duplicating procedures.

A presentation template defines structure, not permission or business logic. When refining an existing template, preserve its required fields, order and evidence semantics unless the owner explicitly approves a substantive change.

## Registry

The canonical source catalog is registry/resources.yaml. It supports discovery and validation. A consuming project should not receive the entire registry by default. The coding agent selects resources explicitly requested, required by an agreed capability or approved by the owner.

## Installation and ownership

The consuming coding agent inspects the project, proposes a minimal selection and applies approved changes using native host capabilities. The project manifest records source revision, selected resources, paths and ownership hashes. Existing instructions and unlisted files remain user-owned.

## Progressive disclosure

Core context is available broadly. Management instructions are consulted only for Foundry management. Settings definitions are read when settings are inspected or changed. Skills and workflows are loaded only when relevant. Host-specific conventions are not treated as verified runtime behaviour until tested in the actual host version.

## Boundaries

Foundry is context, not infrastructure. It has no CLI, TUI, MCP server, daemon, API, dashboard, installer runtime or provider dispatcher. It is not a sandbox and cannot grant capabilities that the host does not expose.
