# Context Architecture

## Product boundary

Agent Foundry is a collection of context files and a resource registry. The consuming project's existing coding agent is the only interface and executor. Foundry does not ship an installer, executable, server, daemon, API, dashboard or runtime.

## Context hierarchy

1. **Core instructions:** a compact baseline that points to detailed standards and resources.
2. **Project instructions:** the consuming project's own architecture, conventions and owner decisions remain authoritative.
3. **Management instructions:** consulted only for Foundry settings, installation, updates, removal, resource discovery and diagnostics.
4. **Settings specification:** one authoritative definition of supported project settings.
5. **Response templates:** guidance for composing compact, state-backed chat responses.
6. **Resources:** skills, commands, workflows, profiles, standards and templates installed only when selected.
7. **Host adaptations:** minimal pointers or native files needed for a particular host.

## Progressive disclosure

Do not load every resource into every request. Core instructions establish essential behaviour. Management guidance is read only for Foundry management. Settings definitions are read when settings are inspected or changed. Specialist resources are consulted only when relevant or invoked.

Host context discovery differs. A host-specific path is an adaptation convention, not proof that a particular host version automatically loads it. The integration guide must distinguish documented conventions from runtime acceptance tests.

## Project installation state

A consuming project may contain a small .agent-foundry directory with:
- manifest.json: source identity, selected resources, installed paths and ownership hashes;
- instructions.md: concise project-specific Foundry entrypoint;
- settings/foundry-settings.yaml: owner-editable supported settings plus custom keys;
- resources/: only selected resources and required dependencies.

The exact layout is determined by the approved plan and host. The full registry remains in the source repository and is not copied into every project.

## Ownership and precedence

Project-authored instructions and existing conventions remain authoritative. Foundry-managed files are those explicitly recorded in the manifest. Unlisted files are user-owned. A manifest is an ownership record, not blanket permission to overwrite.

When a Foundry resource conflicts with an existing project rule, preserve the project rule and report the conflict. Apply changes to existing instruction files only as clearly scoped additive pointers with owner approval.

## Management lifecycle

The coding agent inspects before writing, presents a minimal plan, waits for approval for material changes, uses native host capabilities, preserves custom content and verifies results. Updates detect local modifications. Removal targets only approved, verified Foundry-managed content.

## Non-goals

No separate installer or management engine, no automatic provider dispatch, no universal trigger mechanism, no security sandbox and no claim of host capabilities that have not been tested.
