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
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init --apply
```

The CLI asks for explicit confirmation. To use a custom resource selection, pass comma-separated registry IDs:

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
    └── resources/                    # Selected resources only
```

## Lifecycle commands

Run these from the consuming project:

```bash
agent-foundry inspect
agent-foundry validate
agent-foundry update
agent-foundry uninstall --confirm
```

The CLI can also be invoked through npx using the GitHub package spec shown above.

- inspect: show detected project files, agent hosts and capability signals.
- validate: verify installed resources against the local manifest.
- update: update unchanged Foundry-owned resources; stop on locally modified or missing files.
- uninstall: remove unchanged Foundry-owned resources and its marked instruction pointer. Owner-edited settings and locally modified resources are preserved.

## Safety and limitations

- Installation is plan-first and requires explicit approval.
- Existing AGENTS.md content is preserved. The CLI adds only a marked pointer block.
- The installer refuses to overwrite pre-existing resource destinations.
- The manifest records hashes so updates can detect local edits.
- The model roster belongs to the consuming project. Never store API keys or provider credentials in it.
- The first CLI currently installs a generic AGENTS.md entrypoint. Native host-specific slash-command registration is not yet included.
- The CLI downloads the registry and resources from GitHub over HTTPS. Signed releases and stronger provenance verification are planned.
- The CLI is not a sandbox and does not grant safe autonomous execution to the coding agent.

For detailed existing-project migration, read [Existing Project Integration](docs/architecture/EXISTING_PROJECT_INTEGRATION.md). For product concepts and command usage, read the [User Guide](docs/USER_GUIDE.md).
