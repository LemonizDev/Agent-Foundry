---
id: foundry-management
name: Agent Foundry Management
type: management
version: 0.1.0
portability: universal
status: draft
---

# Agent Foundry Management

**Audience:** the user's existing coding agent, acting inside a project.  
**Purpose:** manage an Agent Foundry installation entirely through conversation. Foundry is context, not an application. The coding agent is the interface, interpreter and executor.

Agent Foundry has no CLI, TUI, MCP server, daemon, API, dashboard or runtime. Never print commands for the user to execute and never suggest installing a tool to manage Foundry. Use the host's native file, search and shell capabilities directly.

Consult this file only when the user makes a Foundry management request: settings, installation, update, removal, diagnostics or resource discovery. For everything else, work normally with the project's own context.

Companion files:

- `foundry/SETTINGS_SPEC.md` — the authoritative settings definitions.
- `foundry/RESPONSE_TEMPLATES.md` — how to compose the chat responses.
- `integrations/README.md` (in the source repository) — host-specific file conventions.

## 1. Discovery

When a Foundry management request arrives, establish the actual state first:

1. Identify the project root and its host (Codex, Claude Code, OpenCode, Kilo, Cline or other).
2. Detect whether Foundry is installed: look for `.agent-foundry/manifest.json` and `.agent-foundry/instructions.md`.
3. If present, read the manifest: source repository, release tag or commit SHA, installed resource IDs, versions and paths, host artifacts, and recorded content hashes.
4. Read `.agent-foundry/settings/foundry-settings.yaml` when present.
5. Identify the active preset/profile and every installed resource from the manifest, not from assumptions.
6. Detect missing, malformed or inconsistent state: manifest without files, files without manifest, unknown resource IDs, hash drift, broken host pointers.
7. Distinguish Foundry-managed files (listed in the manifest) from user-owned files (everything else). User-owned files are never modified as part of Foundry management except for approved, clearly delimited additive pointer blocks in root instruction files.

Report what you found using the relevant response template in `foundry/RESPONSE_TEMPLATES.md`. Never fabricate versions, resource lists or setting values.

## 2. Settings

Follow the `/settings` contract in the installed `commands/settings.md`, backed by the authoritative definitions in `foundry/SETTINGS_SPEC.md`.

1. Recognise settings requests: "Foundry settings", "show my Foundry configuration", "make reviews stricter", "turn delegation off", and similar.
2. Read the settings definitions before presenting or changing anything.
3. Present the settings response template using actual values; distinguish explicit values from defaults and inferred values.
4. Interpret natural-language changes, map them to exactly one setting key each, and validate the requested value against the accepted values in the spec.
5. Compute the smallest necessary change. Preserve unrelated keys, comments, ordering and user-added keys not in the spec.
6. Preview material changes before applying them.
7. Apply the change with a minimal edit to `.agent-foundry/settings/foundry-settings.yaml` (create it from the installed template if absent and the user asked to configure settings).
8. Verify by re-reading the file and confirming the new value parses and unrelated content is intact.

Never invent settings that are not in the spec, and never silently change autonomy, approval or delegation settings.

## 3. Installation

When the user asks to install Foundry ("Install Agent Foundry in this project"), perform the conversational installation:

1. Inspect the project and its host conventions using the read-only assessment in `bootstrap/INITIALIZE_PROJECT.md` (in the source repository). Classify existing capabilities as KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE.
2. Inspect the official source repository at https://github.com/LemonizDev/Agent-Foundry. Prefer a tagged release; if none is suitable, record the exact commit SHA of the revision you read. Use the host's native repository/network access; if the host cannot fetch remote files, state that limitation and ask the user to provide a local checkout or archive.
3. Propose the smallest useful installation: the core baseline (global instructions and universal standards), the management trio (this file, the settings spec, the response templates), the settings file, and only resources the project actually needs. Apply the resource discipline test from `docs/architecture/RESOURCE_MODEL.md`: need, required capability, core operation, consult-from-source alternative, duplication.
4. Detect existing instructions and possible conflicts. Never replace an existing `AGENTS.md`, `CLAUDE.md` or equivalent.
5. Present the installation preview template. Wait for approval when any file would be created or any existing file would gain a managed pointer block.
6. Create only the approved files. Typical target layout:

   ```text
   .agent-foundry/
   ├── manifest.json
   ├── instructions.md
   ├── management/            # copies of MANAGEMENT.md, SETTINGS_SPEC.md, RESPONSE_TEMPLATES.md
   ├── settings/foundry-settings.yaml
   └── resources/             # installed resources, mirroring repository layout
   ```

   Add host-native representations (for example `.agents/skills/<name>/SKILL.md`, `.claude/skills/`, `.opencode/commands/`) only for hosts the project actually uses, following `integrations/README.md` in the source repository. Keep host adaptations small: an additive pointer block in the host's root instruction file plus native-shaped copies of the selected resources.
7. Write the manifest: schema version, source repository, release tag or commit SHA, installation date, detected project type, selected profile, every installed resource with ID, type, version, source path and a SHA-256 content hash, host artifacts, and skipped resources with reasons.
8. Verify: all selected files exist, no unselected resource was copied, manifest hashes match, root instructions contain the approved pointer, and existing content outside the managed block is untouched. Label anything you could not verify.

Presets are starting bundles, not mandatory architectures. Install only explicitly requested, required or agreed resources; keep the registry in the source repository as the discoverable catalog rather than copying every resource into the project.

## 4. Updating

When the user asks to update Foundry:

1. Read the local manifest and record the installed revision (tag or commit SHA).
2. Read the same source at its current release or the revision the user names. Compare against the installed resource IDs, versions and hashes.
3. Classify every difference: added, changed, deprecated, removed. For locally modified files (hash differs from the manifest), classify the divergence as keep, merge with approval, or retire with approval. Never silently overwrite owner-modified content.
4. Present the update preview template: what will change, what will be preserved, conflicts and their resolution options.
5. Apply only after explicit approval. Recompute and record new hashes. Roll back cleanly if any write fails: keep the previous file contents in memory until every write succeeds.
6. Verify the result and report with the change summary template.

## 5. Removal

When the user asks to remove Foundry:

1. Identify Foundry-managed files from the manifest. Distinguish them from user-owned files, including files the user edited after installation.
2. Present the removal preview template: every file and pointer block that would be removed, and every file that will be preserved because it is owner-modified or outside the manifest.
3. Obtain explicit confirmation that names removal.
4. Remove only authorised Foundry content: managed files, empty directories made empty by the removal, and the marked Foundry pointer block in root instruction files. Restore the surrounding file content exactly.
5. Never delete unrelated files or non-empty directories containing user content. Owner-edited copies of Foundry resources become user-owned at removal time: report them as preserved.
6. Verify: no Foundry-managed paths remain, no user content was removed, and report the result.

## 6. Diagnostics

When the user asks to check the Foundry setup:

1. Run the discovery procedure in section 1.
2. Report missing, malformed or inconsistent state: absent manifest, hash drift, broken links from root instructions, settings that do not match the spec, unknown resource IDs, orphaned host artifacts.
3. Explain actionable repairs and preview them. Apply repairs only after approval. Never perform destructive repair without explicit confirmation.

## 7. Safety contract

- The project owner's files and instructions remain authoritative. Foundry never overrules them.
- Treat manifest-recorded hashes as the ownership record. Local divergence blocks silent updates.
- Use minimal diffs; explain consequential changes; obtain approval for destructive, external or hard-to-reverse actions.
- Never store credentials, API keys or personal data in Foundry files.
- Do not claim a host integration, a sandbox or a capability that was not actually checked in the target environment.
- Do not treat a natural-language management request as unlimited authority to rewrite project files.
