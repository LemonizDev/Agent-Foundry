# Install Agent Foundry

Agent Foundry is installed and managed through your existing AI coding agent. There is no separate installer, CLI or management application.

## First installation

Open the coding agent in the target project and ask:

> Install Agent Foundry in this project from https://github.com/LemonizDev/Agent-Foundry. Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. Inspect this project first, including existing instructions, architecture, tests and host conventions. Recommend only relevant resources, identify conflicts, show the exact files you plan to create or modify, and wait for my approval before writing.

The agent should confirm the project root and host, inspect existing practices, read the Foundry registry and relevant resources, select only what is needed, resolve an immutable source revision where possible, distinguish managed from user-owned files, preview changes, wait for approval, apply and verify.

Do not install the entire registry by default. Do not overwrite existing AGENTS.md, CLAUDE.md, project documentation or local rules. Prefer a small additive pointer when the host supports it safely.

## Host limitations

The host must provide repository access and permission to read and write project files. Some hosts may not fetch remote repositories, discover context files automatically or support every resource type. If a capability is unavailable, explain the limitation and use the smallest host-native fallback. Never claim success merely because a plan was printed.

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
