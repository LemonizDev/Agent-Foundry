# Coding-Agent Host Integrations

Agent Foundry is context, not an application. The user's existing coding agent is the interface and executor. Foundry provides portable instructions and resource definitions; each host determines how files are discovered and which repository, filesystem and shell capabilities are available.

## Host conventions

| Host | Persistent project context | Skills / specialist resources | Important limitation |
|---|---|---|---|
| Codex | AGENTS.md | .agents/skills/<name>/SKILL.md | Do not assume remote installation; the host needs source and file access. |
| Claude Code | CLAUDE.md | .claude/skills/ and .claude/agents/ where supported | Verify the installed version's discovery and permission behaviour. |
| OpenCode | AGENTS.md and supported project config | .agents/skills/ and .opencode/commands/ where selected | Native command discovery and config precedence are version-specific. |
| Kilo | AGENTS.md and supported project rules | .agents/skills/ and .kilo/commands/ where supported | Validate workflows and command semantics in the actual host. |
| Cline | .clinerules | .cline/skills/ where supported | Verify current skills and rule-loading conventions. |

These are adaptation references, not claims that every listed path is automatically loaded by every release. Consult official host documentation and test the exact host version before relying on a behaviour.

## Consistent management intent

Across hosts, the agent should recognise requests such as "Foundry settings", "Update Foundry" and "Check my Foundry setup" when the relevant management instructions are in its context. Where a host cannot guarantee natural-language trigger discovery, provide a small native pointer or explain how to explicitly invoke management instructions. Do not invent a universal trigger mechanism.

## Capability boundary

The host supplies model access, repository and network access, filesystem and shell tools, subagent or workflow support, and approval controls. Foundry does not supply these capabilities and cannot elevate them. If a host lacks a capability, report the limitation rather than simulating success.

## Acceptance testing

For each host, record the product and exact version tested, context discovery, skill discovery, management invocation or fallback, file read/write and approval behaviour, update/removal preservation, test date and reproducible evidence.

Until those checks are performed, status is documented convention, runtime not verified.
