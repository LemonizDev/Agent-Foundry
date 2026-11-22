# Agent Foundry User Guide

Agent Foundry is a context-file system managed through your existing AI coding agent. It provides reusable instructions, standards, skills, workflows, settings definitions and management guidance. It does not provide a separate application or installer.

## 1. First installation

Open the coding agent in your project and ask it to install Agent Foundry from the official repository. It should read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md, inspect the project and host conventions, recommend only relevant resources, show exact file changes and wait for approval.

Installation depends on the host's repository access and filesystem tools. If those are unavailable, make the repository source available using the host's supported workflow. The agent must report this limitation instead of pretending it fetched files.

## 2. What to expect during installation

Installation starts with read-only discovery. The agent inspects existing instructions, project architecture, tests, conventions and host support before asking for information. If owner input is needed, it asks one consequential question per turn, records the answer and continues from the next unresolved decision. It does not send a batch questionnaire or ask for facts already present in the repository.

Before writing, the agent presents a complete preview: the resources selected, what each resource actually contains, why it is relevant, dependencies, destination paths, existing-file changes, conflicts and verification plan. It waits for explicit approval. After installation, it reports each resource by human-readable name, purpose, contents and actual outcome, not just a category label or filename.

## 3. Managing Foundry in chat

Use natural language: "Show my Foundry configuration", "Make reviews stricter", "Show available Foundry resources", "Update Foundry", "Check my Foundry setup" or "Remove Foundry from this project".

For management requests, the agent consults foundry/MANAGEMENT.md, foundry/SETTINGS_SPEC.md and foundry/RESPONSE_TEMPLATES.md from the source context or their installed copies. It must inspect the actual project manifest and settings before describing state.

## 4. Settings

The authoritative supported settings are defined in foundry/SETTINGS_SPEC.md. They are deliberately limited. The project settings file is owner-editable; unknown keys and comments should be preserved.

The agent distinguishes explicit values from defaults, validates requested values, previews material changes and verifies edits by re-reading the file. Increasing autonomy requires explicit approval.

## 5. Project-specific resources

Foundry's registry is a discovery catalog, not an installation bundle. The agent assesses project structure, technology, existing instructions, tests, documentation and host conventions. It installs only selected resources and their required dependencies.

Do not duplicate an existing project capability merely because a similarly named Foundry resource exists. Link to or adapt existing authoritative documentation where possible.

## 6. Updates and removal

Updates compare source revisions and local content hashes. The agent previews conflicts and preserves custom instructions. Removal uses the manifest to identify Foundry-managed files and never deletes unrelated user content.

## 7. Host compatibility

See integrations/README.md. Documented file conventions are not proof of runtime discovery. Verify the exact host version and report unsupported behaviour honestly.

## 8. Safety boundary

Foundry is not a sandbox. The host controls tools, permissions, network access and execution. Inspect before editing, use minimal diffs, obtain approval for destructive actions and verify the result.
