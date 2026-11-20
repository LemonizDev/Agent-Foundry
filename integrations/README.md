# Coding-Agent Host Integrations

Agent Foundry is context, not an application. The user's existing coding agent is the interface and executor. Foundry provides portable instructions and resource definitions; each host determines how files are discovered and which repository, filesystem, shell, browser, model and subagent capabilities are available.

## Multi-host onboarding

Use the host-roster-onboarding skill during installation. Detect the active host when reliable evidence exists, then ask which other coding-agent apps the owner uses with the same project. Support multiple selections and free-text additions, including hosts not listed in the current matrix.

Prefer one shared project-local Foundry resource store with thin host-specific pointers. Do not copy the full resource set into every host configuration. Distinguish project-local files from global user/app settings; do not change global settings unless explicitly requested. For every selected host, record user-reported versus verified availability, exact version where known, proposed adapter paths, conflicts and runtime evidence. Obtain approval before creating or modifying host instruction files.

The selected host roster is a setup input, not a claim of compatibility. A host can be user-reported but unavailable for direct verification.

## Host conventions

| Host | Persistent project context | Skills / specialist resources | Important limitation |
|---|---|---|---|
| Codex | AGENTS.md | .agents/skills/<name>/SKILL.md | Verify exact skill discovery, app/CLI parity and available delegation features. |
| Claude Code | CLAUDE.md | .claude/skills/ and .claude/agents/ where supported | Verify frontmatter, discovery, permissions, subagent tools and model overrides in the installed version. |
| OpenCode | AGENTS.md and supported project config | .agents/skills/ and .opencode/commands/ where selected | Native command discovery, agent configuration and model routing are version/configuration-specific. |
| Kilo | AGENTS.md and supported project rules | .agents/skills/, .kilo/commands/ and agent definitions where supported | Validate CLI/desktop behaviour, named agents, session continuation, permission mode and model catalog. |
| Cline | .clinerules | .cline/skills/ where supported | Verify current rules/skills conventions and whether subagent or workflow features are available. |
| Other CLI agents | Their documented instruction and resource formats | Adapt portable skills, workflows and templates | Do not assume a format is supported because it resembles another host's convention. |

These are adaptation references, not claims that every listed path is automatically loaded by every release. Consult official host documentation and test the exact host version before relying on a behaviour.

## Compatibility evidence levels

Use precise status labels:
1. **Documented convention:** a public host convention has been identified.
2. **File generated:** an adapter emitted the expected file shape.
3. **Structure validated:** metadata, paths and required fields pass automated checks.
4. **Discovery tested:** a named host version actually discovers the resource.
5. **Invocation tested:** the host can invoke the command, skill or agent.
6. **Behaviour accepted:** a real task completed with expected behaviour and documented limitations.

Do not call a host fully supported based only on generated files or repository unit tests. Record product name, exact version, OS, configuration, test date, discovery result, invocation result and reproducible evidence.

## Consistent management intent

Across hosts, the agent should recognise requests such as "Foundry settings", "Update Foundry", "Check my Foundry setup" and "I'd like to contribute" when the relevant management instructions are in its context.

Where a host cannot guarantee natural-language trigger discovery, provide a small native pointer or explain how to explicitly invoke management instructions. Do not invent a universal trigger mechanism.

For contribution discovery, the host must be able to read the relevant project files. It must not imply access to other chats, global account settings or external services unless the user has made those sources available through the host.

## Orchestration and subagents

The host supplies agent spawning, model selection, tool access, session persistence, parallel execution and approval controls. Foundry supplies portable role contracts, assignment envelopes, campaign states, recovery procedures and review expectations.

| Capability | Foundry contribution | Host responsibility |
|---|---|---|
| Lead/orchestrator role | Lead Engineer / Orchestrator profile | Invoke the agent as lead or use it as the current primary agent |
| Worker roles | Portable specialist profiles and assignment contracts | Expose actual agents/subagents and their tools |
| Model choice | Task-aware selection method and owner-defined roster schema | Provide model catalog, availability and dispatch controls |
| Persistent work | Campaign-state and recovery templates | Persist files, tasks, sessions or issue state |
| Parallel execution | Work partitioning and write-ownership rules | Run concurrent workers safely |
| Review | Independent Reviewer profile and review skill | Provide genuine independent context/agent where possible |
| Recovery | Checkpoint and handoff contract | Resume sessions or start a replacement worker |

See [Orchestration Portability](../docs/architecture/ORCHESTRATION_PORTABILITY.md) for the detailed Codex, Claude Code, OpenCode, Kilo and Cline capability boundaries.

A host that lacks subagents can still use the assignment and campaign templates for manual coordination. It must not claim that a worker was dispatched when it only generated an assignment file.

## Capability boundary

The host supplies model access, repository and network access, filesystem and shell tools, subagent/workflow support, and approval controls. Foundry does not supply these capabilities and cannot elevate them. If a host lacks a capability, report the limitation rather than simulating success.

## Acceptance testing

For each host, record:
- Product and exact version.
- Operating system and relevant configuration.
- Context discovery and precedence.
- Skill and command discovery.
- Agent/subagent discovery and tool access, if relevant.
- Model selection and session continuation behaviour, if relevant.
- File read/write and approval behaviour.
- Update/removal preservation.
- Test date, exact steps and reproducible evidence.

Until those checks are performed, status is **documented convention; runtime not verified**.
