# Resource Model

## 1. Architecture

Agent Foundry separates reusable agent capability into layers. The distinction matters: mixing everything into one giant instruction file creates context bloat, duplicated rules, and unclear authority.

| Layer | Resource | Answers |
|---|---|---|
| Identity and policy | Core instructions | What applies to every agent session? |
| Role | Profile | What responsibility does this agent hold? |
| Knowledge and method | Standard | What quality rule must work satisfy? |
| Capability | Skill | How is a specialised task performed? |
| Invocation | Command | What happens when a user invokes an action? |
| Coordination | Workflow | In what order do tasks, gates, and handoffs happen? |
| Reusable output | Template | What structure should a deliverable follow? |
| Runtime compatibility | Integration | How is a portable resource represented in a specific tool? |
| Domain knowledge | Domain pack | What optional domain constraints apply? |
| Automation | Script | How are resources validated, packaged, installed, or upgraded? |

## 2. Category contracts

### Core instructions
Short, high-priority rules loaded broadly. They should point to detailed resources rather than embed them. Avoid project-specific assumptions. Every installation includes the global instruction resource and universal engineering standards, even when the owner selects a narrow preset or explicit resource list.

### Profiles
Define mission, responsibilities, decision rights, non-goals, expected inputs/outputs, escalation rules, and required skills. A profile cannot grant tools, permissions, model access, or subagent capability that the host does not provide.

### Skills
A bounded procedure with explicit triggers, prerequisites, steps, outputs, failure handling, and completion criteria. Skills should be independently testable and loadable on demand.

### Commands
A user-facing invocation contract. It defines command name, arguments, defaults, permissions, output expectations, and dependencies. The command should delegate detailed procedure to a skill or workflow. Platform syntax belongs in an adapter.

### Workflows
A sequence of activities with dependencies, decision gates, ownership, checkpoints, failure/recovery paths, and terminal states. A workflow may invoke multiple skills and commands.

### Templates
Reusable output structures with placeholders and guidance. Templates must distinguish required fields from optional fields and must not hardcode source-project facts.

### Standards
Cross-cutting rules for engineering, testing, security, documentation, evidence, version control, and communication. Skills and workflows can reference standards.

### Integrations
Tool-specific packaging or configuration. Each adapter must state supported tool/version, resource mapping, limitations, and verification status. Do not claim that one command format works identically across coding agents.

### Domain packs
Optional, explicitly selected bundles for a domain or product type. Domain packs must not silently alter the universal core.

## 3. Authority and precedence

When resources conflict, apply this default order:

1. Host platform and user/system safety constraints.
2. Explicit project owner instructions and project-specific policy.
3. Project-local agent instructions and domain pack.
4. Installed Agent Foundry core instructions and selected standards.
5. Selected profile, skill, command, and workflow guidance.
6. Examples and historical material.

This is a default conflict-resolution model, not permission to ignore a more restrictive applicable rule. A project may define a stricter local hierarchy.

## 4. Portability classes

Every resource must declare one of:

- **UNIVERSAL:** usable across projects with no substantive changes.
- **ADAPTABLE:** reusable after project-specific values are supplied.
- **TOOL-SPECIFIC:** depends on a named agent platform or version.
- **DOMAIN-SPECIFIC:** applies only to a domain pack.
- **PROJECT-SPECIFIC:** retained as source evidence or excluded from the general library.

A resource can have a universal method and a separate tool-specific adapter. Do not blend the two.

## 5. Loading strategy

- Always load a compact root instruction file.
- Load a profile only when the host supports role-specific instruction selection.
- Load skills and standards based on task relevance.
- Load workflows for multi-step work or explicit campaigns.
- Load templates only when producing the corresponding artifact.
- Load domain packs only when the project owner selects them.
- Load integrations only for the target tool.

## 6. Distribution model

The canonical source is this repository. The v0.4 CLI supports selective installation and generates a manifest containing installed resource IDs, versions, source repository and immutable commit SHA, host artifacts, ownership hashes and settings paths.

Distribution favours copied, version-pinned resources with a manifest. A Git submodule is not required and is not currently implemented. Updates and uninstall are preview-first and preserve locally customised files rather than silently overwriting them.

## 7. Resource lifecycle

`DISCOVERED → INSPECTED → CANDIDATE → DRAFTED → VALIDATED`

Optional outcomes: `ADAPTED`, `EXCLUDED`, or `BLOCKED`.

A resource may return to `DRAFTED` when defects are found. Keep validation evidence and version history.


## 8. Canonical file layout

Portable resources use descriptive filenames wherever a resource is a single document. For example, commands are stored as commands/progress-report.md and workflows as workflows/multi-agent-campaign.md. This avoids a directory containing one generically named file when there are no supporting assets.

Skills intentionally use a named directory containing SKILL.md. This follows the widely used agent-skill package convention and leaves room for supporting references, scripts and examples alongside the skill definition. The platform adapter may copy or transform that package into the host's required location.

Profiles and standards are standalone descriptive Markdown files. Templates use descriptive names and may be grouped by output purpose.


## File and directory naming conventions

The repository deliberately avoids the old pattern of a descriptive folder containing a generic `COMMAND.md` or `WORKFLOW.md` file.

- Commands use flat, descriptive filenames: `commands/close-session.md`, `commands/progress-report.md`.
- Workflows use flat, descriptive filenames: `workflows/session-close.md`, `workflows/multi-agent-campaign.md`.
- Templates use flat, descriptive filenames: `templates/delegation-assignment.md`, `templates/model-roster.yaml`.
- Profiles use flat role filenames: `profiles/independent-reviewer.md`.
- Standards use flat descriptive filenames: `standards/evidence-and-verification.md`.
- Skills retain the `skills/<skill-id>/SKILL.md` directory convention because native Agent Skills integrations expect a named skill directory containing `SKILL.md`. Supporting references or scripts can live beside that file when needed.

The distinction is intentional: the filename identifies commands, workflows, templates, profiles and standards; the standard `SKILL.md` filename identifies the entrypoint inside a portable skill package.
