# Install Agent Foundry

Agent Foundry is installed and managed through your existing AI coding agent. There is no separate installer, CLI or management application.

## First installation

Open the coding agent in the target project and ask:

> Install Agent Foundry in this project from https://github.com/LemonizDev/Agent-Foundry. Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. Inspect this project first, including existing instructions, architecture, tests and host conventions. Recommend only relevant resources, identify conflicts, show the exact files you plan to create or modify, and wait for my approval before writing.

The agent should first classify the repository as (1) new/empty, (2) established with healthy context, or (3) established but with context that needs repair. It must support the appropriate path rather than applying one preset to every project. Assess context quality using evidence: instruction precedence, architecture coverage, canonical sources, documentation freshness, duplication/conflicts, verification guidance and session continuity. For context-heavy projects, consider a read-only repository audit and documentation-maintenance pass before adding more instructions. Then read the registry and only relevant resources, select the smallest useful set, resolve an immutable source revision where possible, distinguish managed from user-owned files, preview exact changes, wait for approval, apply and verify. After installation, run a small, safe first-use demonstration selected from the actual project context and explain why that resource is relevant.

Do not install the entire registry by default. Do not overwrite existing AGENTS.md, CLAUDE.md, project documentation or local rules. Prefer a small additive pointer when the host supports it safely.

## Host limitations

The host must provide repository access and permission to read and write project files. Some hosts may not fetch remote repositories, discover context files automatically or support every resource type. If a capability is unavailable, explain the limitation and use the smallest host-native fallback. Never claim success merely because a plan was printed.

## Multi-host onboarding

Identify the active host and version where possible. Ask the owner which other coding-agent apps they use with this repository, supporting multiple choices and free-text names. Prefer one shared project-local Foundry resource store and small host-specific pointers. Do not modify global app settings or create competing root instruction files without explicit approval. Verify each selected host independently. See skills/host-roster-onboarding/SKILL.md.

## Three onboarding paths

- **New project:** establish a lightweight baseline and essential project context. Avoid generating documentation that the project does not need yet.
- **Healthy existing project:** preserve authoritative instructions and workflows, link to existing sources and fill only real gaps.
- **Existing project with messy context:** diagnose stale, scattered, contradictory or duplicated context first. Recommend a read-only repository audit and, where useful, the documentation-maintenance skill. Propose staged repairs separately; never rewrite the project during installation.

The paths are not rigid presets. Assess project capabilities individually and show the evidence behind recommendations.

## Installed project state

A minimal installation may contain:

    .agent-foundry/
    ├── manifest.json
    ├── instructions.md
    ├── settings/
    │   └── foundry-settings.yaml
    └── resources/
        └── selected resources only

Actual files depend on the approved selection and host. The full source registry stays in the Agent Foundry repository; it is not copied into every project.

## Managing the installation

Use natural language in the same coding-agent conversation: show settings, make reviews stricter, discover resources, update Foundry, check the setup or remove Foundry.

The agent consults management instructions and the settings specification, inspects actual project state, previews consequential changes, preserves user content and verifies its work.

## Source and versioning

Record the source repository and resolved tag or commit SHA in .agent-foundry/manifest.json. A moving branch name is not a reproducible version. If the host cannot resolve or record a revision, mark the source version as unknown rather than inventing one.

## Safety

Foundry management is bounded by the coding agent's existing permissions. Approval in conversation does not create a security sandbox. Do not expose secrets, run untrusted code to classify a project, or delete files that are not clearly Foundry-managed.
