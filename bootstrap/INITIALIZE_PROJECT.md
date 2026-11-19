# Agent Foundry Project Initialization

**Audience:** a coding agent operating inside the target project.  
**Purpose:** install a relevant, version-pinned subset of Agent Foundry without requiring the owner to download a ZIP or manually copy files.

This is an execution specification, not a request to install the entire repository.

## 1. Safety contract

- Treat the target project as user-owned. Inspect before changing it.
- Do not modify, delete, rename or replace existing project instructions without explicit approval.
- Do not overwrite existing files. If a destination exists, compare it and propose a merge or a new filename.
- Do not add credentials, secrets, private data or unrelated source code to the installation.
- Do not run project code or install dependencies merely to classify the repository.
- Do not commit, push, publish, deploy, or change remote settings.
- Do not claim a native integration works unless the target tool and version have been checked.
- If the project owner declines the proposed plan, stop without making changes.

## 2. Resolve the source

1. Use the official repository: https://github.com/LemonizDev/Agent-Foundry.
2. Prefer a tagged release. If no stable release exists, use the current default branch and record the exact commit SHA as a development snapshot.
3. Retrieve the repository using Git if available; otherwise use the host's supported GitHub file access.
4. Read README, the resource model, authoring standard, registry and this workflow.
5. Never treat the Foundry repository's own AGENTS.md as the target project's global instructions. It governs maintenance of Agent Foundry itself.

## 3. Inspect the target project

Read, without modifying:
- Existing root agent instructions (AGENTS.md, CLAUDE.md, Copilot instructions, or equivalent).
- Project README and package/build manifests.
- Existing architecture, contribution and security guidance.
- Top-level source and test structure.
- Existing agent skills, commands, workflows and local conventions.

Identify:
- Project type and primary languages/frameworks.
- Product/domain and risk level.
- Current development lifecycle and test setup.
- Available agent platform(s), if discoverable.
- Existing multi-agent or automation capabilities.
- Existing documentation and source-of-truth files.
- Constraints explicitly stated by the owner.

Do not infer sensitive or business-critical requirements from filenames alone.

## 4. Select resources

Use registry/resources.yaml as the catalog. For each candidate, inspect its full content, status, portability, dependencies and source notes.

Selection rules:
- Include the compact global baseline unless it conflicts with stricter project rules.
- Select only profiles the target host can actually support.
- Select skills based on real project needs, not because they exist.
- Include workflows only when the project has the required multi-step or multi-agent process.
- Include templates only when the project has a use for those outputs.
- Include domain-specific resources only after confirming the project belongs to that domain.
- Do not install DRAFT resources as authoritative policy without marking them experimental and obtaining owner approval.
- Do not install tool-specific resources for an unverified tool/version.
- Avoid duplicate resources when equivalent project-local guidance already exists.

Create a proposed selection matrix:

| Resource | Why relevant | Destination | Status | Existing equivalent/conflict |
|---|---|---|---|---|

## 5. Present an installation plan

Before writing files, tell the owner:
1. What project type you detected and the evidence used.
2. Which resources you propose to install and why.
3. What existing instructions overlap or conflict.
4. Which files will be created.
5. Which existing files, if any, need a proposed additive edit.
6. Which capabilities are unsupported by the host.
7. The Foundry release tag or exact source commit.

Wait for owner approval before changing files.

## 6. Install safely

Target layout:

    .agent-foundry/
    ├── manifest.yaml
    ├── instructions.md
    ├── README.md
    ├── resources/
    │   ├── skills/
    │   ├── profiles/
    │   ├── workflows/
    │   ├── standards/
    │   └── templates/
    └── overrides/

Only create category directories that contain selected resources.

### Manifest requirements

Record:
- Manifest schema version.
- Agent Foundry release tag and source commit SHA.
- Installation timestamp.
- Detected project type and selected profile.
- Every installed resource ID, type, version, source path and content hash.
- Host tool and version, if known.
- Resources intentionally skipped and why.
- Local overrides or conflicts.

### Instructions integration

- If the project has no root agent instruction file, propose creating the host's supported entrypoint.
- If an instruction file exists, preserve all existing content. Add only a short, clearly delimited Agent Foundry managed section that points to .agent-foundry/instructions.md.
- Never insert a large bundle of resource content into the root instruction file.
- Do not edit multiple host-specific instruction files unless the owner requested multi-platform support.

### File ownership

- Files under .agent-foundry/resources/ are managed copies.
- The manifest records the installed baseline hashes.
- Local edits must be detected before updates.
- Explicit local overrides may live under .agent-foundry/overrides/.
- If an installed file has diverged from its recorded hash, stop the update and offer a diff/merge.

## 7. Verify the installation

Check:
- All selected files exist.
- No unselected resource was copied.
- Manifest paths and hashes match installed files.
- Dependencies resolve or are explicitly marked external.
- Root instructions link to the local Foundry entrypoint.
- Existing project instructions remain intact outside the approved managed section.
- No secrets or unrelated files were copied.
- The selected host can actually load generated instruction/skill/command formats.

Report exact checks and results. If native host loading cannot be tested, label it NOT VERIFIED.

## 8. Completion report

Provide:
- Foundry version/commit.
- Project classification.
- Installed resource list and rationale.
- Files created and modified.
- Existing instructions preserved.
- Host integration status.
- Validation results and limitations.
- How to inspect, update or uninstall the installation.

Do not call the project fully configured if native host loading or important checks remain unverified.

## 9. Update and uninstall expectations

An update compares installed hashes with the manifest and preserves local modifications. It shows a change plan before replacing managed resources.

Uninstall may remove only files created and tracked by the manifest. It must never delete owner-authored files or remove existing instruction content outside the Foundry-managed block.
