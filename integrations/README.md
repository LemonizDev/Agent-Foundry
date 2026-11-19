# Coding-Agent Host Integrations

Agent Foundry separates reusable engineering methods from the file formats and capabilities exposed by each coding-agent host. The CLI detects project-level host signals and generates native skill/command files where the host's documented layout is known.

## Portable-to-native mapping

| Host | Persistent instructions | Skills | Commands | Current generator behaviour |
|---|---|---|---|---|
| Codex | AGENTS.md | .agents/skills/<name>/SKILL.md | No custom slash-command file format generated | Generic pointer plus skills |
| Claude Code | CLAUDE.md is created or existing file gets an additive pointer | .claude/skills/<name>/SKILL.md | Skills are slash-invocable; command contracts become skills | Skills, /close-style aliases and .claude/agents profiles generated |
| OpenCode | AGENTS.md is discovered; optional config may add instructions | .opencode/skills/<name>/SKILL.md | .opencode/commands/<name>.md | Skills, slash commands and .opencode/agents profiles generated |
| Kilo Code | AGENTS.md | .kilo/skills/<name>/SKILL.md | .kilo/commands/<name>.md | Skills, workflow-style commands and .kilo/agents profiles generated |
| Cline | Existing .clinerules file/directory gets an additive pointer; existing project rules remain authoritative | .cline/skills/<name>/SKILL.md | Skills are slash-invocable | Skills and command-contract skills generated |

The CLI writes host-specific skill directories when it detects Claude Code, OpenCode, Kilo Code or Cline. Codex receives the standard .agents/skills directory. Kilo command aliases with spaces are converted to a hyphenated filename (for example, models edit becomes models-edit) because nested Kilo command discovery is not assumed.

## Current compatibility status

The generator targets documented file formats, but the installer does not launch each host to verify discovery, command execution, argument interpolation, model routing or session-control behaviour. Therefore generated artifacts are marked **generated, runtime not exercised**, not fully validated host support.

| Host | File generation | Runtime validation |
|---|---|---|
| Codex | Shared AGENTS.md and .agents/skills output | Not yet exercised in Codex |
| Claude Code | CLAUDE.md pointer and .claude/skills output | Not yet exercised in Claude Code |
| OpenCode | .opencode/skills and .opencode/commands output | Not yet exercised in OpenCode |
| Kilo Code | .kilo/skills and .kilo/commands output | Not yet exercised in Kilo Code |
| Cline | .cline/skills output | Not yet exercised in Cline |

## Official format references

- [Codex project guidance and skills](https://developers.openai.com/codex/customization)
- [Claude Code skills](https://code.claude.com/docs/en/skills) · [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)
- [OpenCode skills](https://opencode.ai/docs/skills) · [OpenCode agents](https://opencode.ai/docs/agents)
- [OpenCode commands](https://opencode.ai/docs/commands)
- [Kilo Code workflows](https://kilo.ai/docs/customize/workflows) · [Kilo Code skills](https://kilo.ai/docs/customize/skills) · [Kilo Code AGENTS.md](https://kilo.ai/docs/customize/agents-md) · [Kilo Code agents](https://kilo.ai/docs/customize/custom-modes)
- [Kilo Code custom agents and modes](https://kilo.ai/docs/customize/custom-modes)
- [Cline skills](https://docs.cline.bot/customization/skills)

## Adapter requirements

Every production adapter must document:
- supported tool and tested version;
- native file locations and formats;
- mapping from each Foundry resource type;
- unsupported concepts and limitations;
- installation, update and uninstall behaviour;
- permission and trust boundaries;
- validation performed, date and evidence.

## Adapter roadmap

1. Exercise current generated layouts in Codex, Claude Code, OpenCode, Kilo Code and Cline.
2. Add Kilo agent/profile generation and host-aware permission mapping.
3. Add host-specific config merging only where a safe parser and non-destructive merge are available.
4. Add end-to-end adapter fixtures and compatibility tests for each supported host release.

A partial adapter is better than claiming universal support and silently dropping important semantics.
