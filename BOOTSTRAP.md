# Install Agent Foundry

Agent Foundry can be introduced by asking a coding agent to inspect this repository, or by using the CLI. The CLI is the repeatable path; the agent-first path is useful when a developer wants project-specific recommendations before installation.

## Option A: CLI setup

Requirements: Node.js 20 or newer.

Run from the root of the target project:

```bash
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init
```

This is a read-only assessment and plan. It inventories existing instructions, architecture docs, progress records, tests, automation, security policy, agent commands and detected hosts. It then lists the selected baseline resources and target paths.

Review the plan. To apply it:

```bash
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init --preset auto --apply
```

If the plan identifies paths that already exist, do not overwrite them. Rerun with `--skip-conflicts` to leave those paths untouched and install the remaining resources:

```bash
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init --preset auto --apply --skip-conflicts
```

The CLI asks for explicit confirmation. Every preset and explicit resource list includes the universal core instructions and standards. Choose a preset with --preset auto|minimal|balanced|autonomous-engineer|visual-engineer|research-engineer. If the target project is new and has no host configuration files, specify your host explicitly with `--hosts codex,claude-code,opencode,kilo,cline` (or just the host you use). The auto preset starts with the autonomous-engineer baseline and adds visual QA resources when graphics/rendering signals are detected. Use a custom resource selection when you need exact control. To use a custom resource selection, pass comma-separated registry IDs:

```bash
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry list
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init --resources atomic-implementation,session-learning,close-session,progress-report --apply
```

Do not pass --yes unless the plan has already been reviewed in automation or a controlled environment.

## Option B: Agent-first project integration

Open the coding agent in the target project and send:

> Initialise this project with Agent Foundry: https://github.com/LemonizDev/Agent-Foundry  
> Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. Inspect this project first. Identify capabilities already covered, meaningful gaps, conflicts and host limitations. Recommend only relevant resources. Preserve existing architecture, instructions and local conventions. Show the exact files you plan to create or modify and wait for my approval before writing.

This is useful when the developer wants a deeper, domain-aware integration than the CLI's initial heuristics can provide.

## Installed layout

```text
your-project/
├── AGENTS.md                         # Existing file preserved; Foundry pointer is marked
└── .agent-foundry/
    ├── manifest.json                 # Source ref, selected resources and ownership hashes
    ├── instructions.md               # Compact project-specific entrypoint
    ├── README.md                     # Local installation explanation
    ├── settings/
    │   ├── foundry-settings.yaml     # Owner-editable behaviour settings
    │   └── model-roster.yaml         # User-defined model roster; no secrets
    └── resources/                    # Core baseline plus selected resources
        ├── core/GLOBAL_INSTRUCTIONS.md
        ├── standards/
        ├── skills/
        ├── workflows/
        └── commands/

# Host-native files are generated where detected or explicitly selected:
.agents/skills/       # Shared by Codex, OpenCode and Kilo
.claude/skills/       # Claude Code
.claude/agents/       # Claude Code specialist agents
.opencode/commands/   # OpenCode commands
.opencode/agents/     # OpenCode specialist agents
.kilo/commands/       # Kilo Code commands
.kilo/agents/         # Kilo Code specialist agents
.cline/skills/        # Cline
```

## Lifecycle commands

Run these from the consuming project:

```bash
agent-foundry inspect
agent-foundry validate
agent-foundry update
agent-foundry update --apply
agent-foundry uninstall
agent-foundry uninstall --apply
```

The CLI can also be invoked through npx using the GitHub package spec shown above.

- inspect: show detected project files, agent hosts, project-type signals and capability decisions.
- validate: verify installed resources against the local manifest, YAML settings and model roster.
- list: show registered resources and descriptions.
- route: classify a task and recommend a model from the owner-defined roster.
- settings: show the project-local settings and roster paths.
- update: preview available updates; rerun with --apply and confirm to update unchanged Foundry-owned resources. Local modifications block the update rather than being overwritten.
- uninstall: preview removal; rerun with --apply and type `uninstall`. Unchanged templates and resources are removed; owner-edited settings and modified files are preserved.

## Safety and limitations

- Installation is plan-first and requires explicit approval.
- Existing AGENTS.md content is preserved. The CLI adds only a marked pointer block.
- The installer refuses to overwrite pre-existing resource destinations. An explicit --skip-conflicts option lets the owner install the remaining resources while leaving collisions untouched.
- The manifest records hashes so updates can detect local edits.
- The model roster belongs to the consuming project. Never store API keys or provider credentials in it.
- The CLI generates host-specific skills, commands and specialist agent files for detected Codex-compatible, Claude Code, OpenCode, Kilo Code and Cline projects. Runtime discovery and execution have not yet been validated inside every host.
- By default, the CLI reads the registry and resources bundled inside its installed package; it does not require GitHub API access during installation. Supplying `--ref` or `--repository` explicitly opts into remote GitHub resources, resolved to an immutable commit SHA. Signed releases and stronger provenance verification are planned.
- The CLI is not a sandbox and does not grant safe autonomous execution to the coding agent.

For detailed existing-project migration, read [Existing Project Integration](docs/architecture/EXISTING_PROJECT_INTEGRATION.md). For product concepts and command usage, read the [User Guide](docs/USER_GUIDE.md).
