# Coding-Agent Host Integrations

Agent Foundry is context, not an application. The user's existing coding agent is the interface and executor. Foundry provides portable instructions and resource definitions; each host determines how files are discovered and which repository, filesystem, shell, browser, model and subagent capabilities are available.

## Multi-host onboarding

Use the host-roster-onboarding skill during installation. Detect the active host when reliable evidence exists, then ask which other coding-agent apps the owner uses with the same project. Support multiple selections and free-text additions, including hosts not listed in the current matrix.

Prefer one shared project-local Foundry resource store with thin host-specific pointers. Do not copy the full resource set into every host configuration. Distinguish project-local files from global user/app settings; do not change global settings unless explicitly requested. For every selected host, record user-reported versus verified availability, exact version where known, proposed adapter paths, conflicts and runtime evidence. Obtain approval before creating or modifying host instruction files.

The selected host roster is a setup input, not a claim of compatibility. A host can be user-reported but unavailable for direct verification.

## Host conventions and setup paths

The paths below are current documented conventions checked against public host documentation on 2026-11-20. They are not a claim that a particular installed version has loaded the files. Confirm the selected product/version and inspect its configuration before writing.

| Host | Project instructions | Project skills / other resources | Setup notes |
|---|---|---|---|
| **OpenAI Codex** | `AGENTS.md` (plus supported nested/override files) | `.agents/skills/<name>/SKILL.md` | Use the repository root as the active workspace. Preserve existing AGENTS hierarchy and overrides. [Official instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) |
| **Claude Code** | `CLAUDE.md` | `.claude/skills/<name>/SKILL.md`; optional `.claude/agents/` | Keep root CLAUDE.md concise and link to selected skills. Check permissions and agent frontmatter before creating subagents. [Claude Code customization](https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more) |
| **OpenCode** | `AGENTS.md`; supported `CLAUDE.md` fallback and configured instruction files | `.opencode/skills/<name>/SKILL.md`; compatibility discovery also includes `.agents/skills/` and `.claude/skills/`; commands under `.opencode/commands/` | Inspect OpenCode version/config. Check skill permission and duplicate IDs. Do not assume command or model settings are shared with another host. [Instructions](https://opencode.ai/docs/instructions/) · [Skills](https://opencode.ai/docs/skills) |
| **Kilo Code / Kilo CLI** | `AGENTS.md` and host-supported project rules | `.kilo/skills/<name>/SKILL.md`; compatibility locations include `.agents/skills/` and, when enabled, `.claude/skills/` | Check editor/CLI product and version. Project skills are not equivalent to global skills; inspect shell-command trust and approval behaviour. [Skills](https://kilo.ai/docs/customize/skills) |
| **Cline** | `.clinerules/` or `.cline/rules/`; also recognizes `AGENTS.md`, Cursor and Windsurf rule formats | Check Agent Skills discovery in the exact build; do not infer it from rule-file support | Do not confuse global Cline rules with workspace rules. [Rules](https://github.com/cline/cline/blob/main/docs/customization/cline-rules.mdx) |
| **Cursor** | `.cursor/rules/*.mdc` or root/nested `AGENTS.md` | `.agents/skills/` and `.cursor/skills/` | Project rules need valid MDC frontmatter; a plain Markdown file placed in `.cursor/rules/` is not a project rule. [Rules](https://cursor.com/docs/rules) · [Skills](https://cursor.com/docs/skills) |
| **Windsurf** | `AGENTS.md`, `.windsurf/rules/` and legacy `.windsurfrules` conventions | `.windsurf/skills/` and compatible `.agents/skills/` | Product documentation is in transition. Verify current product naming, installed version and whether the user means legacy Cascade/Windsurf or a newer Devin surface before adapting. [Windsurf documentation](https://docs.windsurf.com/) |
| **GitHub Copilot** | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, and `AGENTS.md` in supported agent contexts | `.github/skills/` or supported `.agents/skills/` locations depending on product surface | Distinguish Copilot in VS Code/Visual Studio, GitHub.com, Copilot CLI and the Copilot app. Their instruction and skill surfaces are not identical. [Repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide) · [Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) |

### Per-host installation procedure

For each host selected by the owner:

1. **Confirm the actual surface.** Identify app/CLI/IDE, version, OS, active workspace and repository root. "I use Copilot" or "I have Kilo" is not proof the host is available to this session.
2. **Inspect existing files first.** Read all relevant root/nested instructions, rules, skills and host config. Check precedence and conflicts.
3. **Choose the smallest adapter.** Prefer the shared project-local Foundry resource store and one short host-native pointer. Use host-specific skills/rules only when their discovery format or behaviour materially differs.
4. **Do not touch global settings by default.** Global/user-level config affects other repositories. It requires separate explicit permission and access.
5. **Preview all host changes together.** Show exact destinations, content, conflicts and whether files are shared or host-specific.
6. **Apply only after approval.** Do not silently create multiple competing root instruction files.
7. **Verify per host.** Reopen a session or use the host's supported reload mechanism, then ask it to identify the Foundry pointer or invoke one selected skill. Record the exact result.

### Host-specific setup notes

<details>
<summary><strong>Codex</strong></summary>

Open the target repository as the active Codex workspace. Inspect root and nested AGENTS.md files and supported overrides. Prefer a short AGENTS.md pointer to the shared Foundry instructions and use the Agent Skills-compatible .agents/skills location when appropriate. Check the actual skill list or ask Codex to load a named skill after installation. Do not assume app/CLI parity without testing.
</details>

<details>
<summary><strong>Claude Code</strong></summary>

Start Claude Code from the target repository. Inspect CLAUDE.md imports and existing .claude/ configuration. Put selected skills under .claude/skills/<name>/SKILL.md when a Claude-specific adapter is needed. Keep CLAUDE.md as a short project entrypoint. Only create .claude/agents definitions if the user selected agent profiles and the current environment supports them.
</details>

<details>
<summary><strong>OpenCode</strong></summary>

Open the repository root in OpenCode. Inspect AGENTS.md, opencode.json/jsonc, permissions and existing .opencode directories. Prefer .opencode/skills/<name>/SKILL.md for OpenCode-specific discovery; .agents/skills and .claude/skills are compatibility sources in current documentation. Check skill permissions, ID collisions and commands before adding resources.
</details>

<details>
<summary><strong>Kilo</strong></summary>

Open the repository in the Kilo editor or CLI and identify which product surface is active. Check .kilo/ and shared .agents/skills. Kilo documents project skills under .kilo/skills and compatibility with .agents/skills. Review trusted/untrusted skill behaviour: embedded shell commands in project skills are not treated the same as commands from trusted global locations. Reload or restart as required by the installed version.
</details>

<details>
<summary><strong>Cline</strong></summary>

Open the repository as the VS Code workspace or in the selected Cline surface. Inspect .clinerules/ and .cline/rules/ before creating anything. Cline documents workspace rules and recognition of AGENTS.md/Cursor/Windsurf formats. Verify Agent Skills support separately; rule-file support alone does not prove skills are discoverable.
</details>

<details>
<summary><strong>Cursor</strong></summary>

Open the project in Cursor. Inspect .cursor/rules/*.mdc, AGENTS.md and .agents/skills. Use valid MDC frontmatter for scoped rules; do not put plain SKILL.md files in .cursor/rules. Cursor documents project skill discovery under .agents/skills and .cursor/skills. Verify the exact skill list after adding resources.
</details>

<details>
<summary><strong>Windsurf</strong></summary>

Identify the exact Windsurf/Cascade or newer product surface first. Inspect AGENTS.md, .windsurf/rules, .windsurfrules and .windsurf/skills as appropriate. Because product naming and documentation have been changing, treat this adapter as pending until the installed version and current official docs are checked. Do not assume a Windsurf-specific path is interchangeable with Devin configuration.
</details>

<details>
<summary><strong>GitHub Copilot</strong></summary>

Ask which surface the owner means: VS Code, Visual Studio, GitHub.com, Copilot CLI or Copilot app. For IDE repository instructions, inspect .github/copilot-instructions.md and .github/instructions/*.instructions.md; Copilot agent contexts may also use AGENTS.md. GitHub documents skills in .github/skills and other supported project skill locations, but availability differs by surface. Verify the feature and references shown by the actual Copilot product.
</details>

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
