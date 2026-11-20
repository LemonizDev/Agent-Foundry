# Agent Foundry User Guide

Agent Foundry is a context-file system managed through your existing AI coding agent. It provides reusable instructions, standards, skills, workflows, settings definitions and management guidance. It does not provide a separate application or installer.

## 1. First installation

Open the coding agent in your project and ask it to install Agent Foundry from the official repository. It should read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md, inspect the project and host conventions, recommend only relevant resources, show exact file changes and wait for approval.

Installation depends on the host's repository access and filesystem tools. If those are unavailable, make the repository source available using the host's supported workflow. The agent must report this limitation instead of pretending it fetched files.

## 2. Managing Foundry in chat

Use natural language: "Show my Foundry configuration", "Make reviews stricter", "Show available Foundry resources", "Update Foundry", "Check my Foundry setup" or "Remove Foundry from this project".

For management requests, the agent consults foundry/MANAGEMENT.md, foundry/SETTINGS_SPEC.md and foundry/RESPONSE_TEMPLATES.md from the source context or their installed copies. It must inspect the actual project manifest and settings before describing state.

## 3. Settings

The authoritative supported settings are defined in foundry/SETTINGS_SPEC.md. They are deliberately limited. The project settings file is owner-editable; unknown keys and comments should be preserved.

The agent distinguishes explicit values from defaults, validates requested values, previews material changes and verifies edits by re-reading the file. Increasing autonomy requires explicit approval.

## 4. Project-specific resources

Foundry's registry is a discovery catalog, not an installation bundle. The agent assesses project structure, technology, existing instructions, tests, documentation and host conventions. It installs only selected resources and their required dependencies.

Do not duplicate an existing project capability merely because a similarly named Foundry resource exists. Link to or adapt existing authoritative documentation where possible.

## 5. Updates and removal

Updates compare source revisions and local content hashes. The agent previews conflicts and preserves custom instructions. Removal uses the manifest to identify Foundry-managed files and never deletes unrelated user content.

## 6. Host compatibility

See integrations/README.md. Documented file conventions are not proof of runtime discovery. Verify the exact host version and report unsupported behaviour honestly.

## 6A. Multi-host onboarding

During installation, identify the active coding-agent host and version when evidence is available, then ask which additional coding-agent apps the owner uses with the same repository. Allow multiple selections and free-text additions. Treat user-reported apps as unverified until checked.

Plan one shared project-local Foundry resource set with host-specific pointers/adapters for selected hosts. Distinguish project-local configuration from global app settings. Do not modify global settings or multiple root instruction files without explicit approval. Report each host's integration and verification status separately. See skills/host-roster-onboarding/SKILL.md.

## 7. Contribution discovery

If you have built useful instructions, skills, commands, workflows, profiles, settings or templates, say "I'd like to contribute" or simply "contribute" in the installed coding-agent conversation.

The agent follows commands/contribute.md and skills/contribution-discovery/SKILL.md. It scans only accessible project context, compares candidates with the Foundry registry, excludes sensitive and project-specific material, shows a numbered shortlist and asks one focused question. It drafts only the resources you select. Discovery does not authorise publication; explicit approval is required before anything is committed, pushed or sent outside your project.

## 8. Multi-agent campaigns

Foundry provides portable assignment, recovery and campaign-state contracts. Ask "delegate this task" or "show campaign status". The host must actually support subagents for automatic dispatch; otherwise the agent should produce bounded assignments for manual execution. See docs/architecture/ORCHESTRATION_PORTABILITY.md for Codex, Claude Code, OpenCode, Kilo and Cline boundaries.

## 9. End a session and preserve reusable resources

Use `/close` to preserve durable project context such as requirements, decisions, verified lessons and current state. Use `/done` when the conversation produced a reusable project artefact worth keeping. `/done` classifies it as a command, skill, workflow, standard, profile, template, integration or documentation update, checks for duplicates and routes it to the canonical directory. If nothing meets the quality threshold, it rejects the operation and writes nothing. It does not save a transcript. See [Done command](../commands/done.md) and [Session Resource Curation](../skills/session-resource-curation/SKILL.md).

## 10. Safety boundary

Foundry is not a sandbox. The host controls tools, permissions, network access and execution. Inspect before editing, use minimal diffs, obtain approval for destructive actions and verify the result.
