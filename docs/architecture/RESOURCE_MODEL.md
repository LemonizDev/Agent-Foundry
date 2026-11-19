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
Short, high-priority rules loaded broadly. They should point to detailed resources rather than embed them. Avoid project-specific assumptions.

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

The canonical source is this repository. A future installer should support selective installation and generate a manifest containing resource IDs, versions, source revision, selected profile, selected skills/workflows, and target adapters.

Initial distribution should favour copied, version-pinned resources with a manifest. A Git submodule may be offered as an advanced option, but must not be required. Updates must not overwrite locally customised files silently.

## 7. Resource lifecycle

`DISCOVERED → INSPECTED → CANDIDATE → DRAFTED → VALIDATED`

Optional outcomes: `ADAPTED`, `EXCLUDED`, or `BLOCKED`.

A resource may return to `DRAFTED` when defects are found. Keep validation evidence and version history.
