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

## 3. Integrate with an existing project

Read [Existing Project Integration](../docs/architecture/EXISTING_PROJECT_INTEGRATION.md) before assessing an established repository. Treat installation as an additive migration, not a rewrite. Map capabilities by behaviour, not filename. Existing architecture, project context, commands, tests and agent rules are authoritative unless the owner explicitly approves a change. Classify each capability as KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE. Show this mapping in the installation plan.

For a brand-new repository, use the minimal baseline and create only the project context files needed for its type.

## 4. Inspect the target project

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

## 4A. Choose an onboarding path

Classify the repository using observed evidence, not a guess based on its size or a single filename. The three primary paths are:

| Path | Signals | Installation behaviour |
|---|---|---|
| NEW / EMPTY | Little implementation, few conventions, no established project context | Identify the intended product, stack and risk profile. Propose a compact baseline and only the context files needed to make future work coherent. Do not generate a large documentation suite for an empty scaffold. |
| ESTABLISHED / HEALTHY | Existing instructions, architecture, useful docs, tests, skills or workflows that broadly agree | Map existing capabilities. KEEP or LINK equivalent resources. Install only meaningful gaps and make additive changes. |
| ESTABLISHED / CONTEXT NEEDS REPAIR | Large or mature codebase with stale, scattered, contradictory, duplicated or missing project context | Do not add a new layer of instructions immediately. First propose a read-only repository audit. Map canonical sources, contradictions, missing context and stale documents. Then propose a staged documentation/context repair. |

These paths are starting points, not mutually exclusive diagnoses. Assess context dimensions separately; a project can have healthy engineering practices and weak documentation.

### Context health assessment

Before selecting resources, report evidence and confidence for:

- Agent instruction quality, scope and precedence.
- Product purpose, requirements and non-goals.
- Architecture and critical runtime/data-flow coverage.
- Source-of-truth clarity for decisions, plans, progress and operations.
- Documentation freshness, navigation, duplication and contradictions.
- Test strategy, acceptance criteria and verification commands.
- Session continuity, recovery and durable decisions.
- Existing skills, commands, workflows, specialist roles and automation.
- Host capabilities relevant to loading and executing selected resources.

Do not treat document count, repository size or Markdown volume as quality measures. Do not infer that a document is stale solely because its timestamp is old; compare claims with current code and project activity.

### Context repair recommendations

For a project with context problems, consider these existing Foundry resources where their scope fits:

- `repository-audit` for a read-only evidence-based map of architecture, context sources, quality controls and risks.
- `documentation-maintenance` for canonical-source selection, navigation, duplication cleanup and keeping docs aligned with verified implementation.
- `context-management` for durable context boundaries and progressive disclosure.
- `session-learning` and `close-session` for preserving useful decisions without transcript dumps.

These are candidate resources, not an automatic bundle. The documentation-maintenance skill is a procedure, not a dedicated autonomous specialist agent. The host may assign it to a suitable agent/profile only if that capability exists.

Never perform a broad documentation rewrite during installation. Separate diagnosis from repair, show a proposed file-by-file change plan, preserve historical decisions, and obtain approval for each material scope of work.

## 4B. Make the first run project-specific

A successful installation should include a small first-use demonstration, not merely a list of copied files.

1. Revisit the project classification and context assessment.
2. Select one installed resource that addresses a real, low-risk need revealed by inspection.
3. Explain the evidence connecting that resource to the project.
4. Run it on a bounded task that does not modify source code or sensitive state, or use a clearly labelled read-only demonstration if a safe task is unavailable.
5. Show the output, verification status and one logical next action.
6. Do not invent a project weakness just to make the demo look impressive. If no meaningful gap exists, demonstrate an existing strength or explain why no change is recommended.

Examples:
- New project: use the project-context or implementation-planning resource to draft a first bounded milestone from the actual README and manifests.
- Healthy project: use an installed testing, review or debugging resource on a small existing change or a read-only sample.
- Context-needs-repair project: run the repository-audit resource and show a short evidence-backed context map. Do not start rewriting documentation unless separately approved.

The demonstration is not proof that every host integration works. Report which parts were actually executed and which remain unverified.

## 4C. Discover the user's coding-agent host roster

Use the host-roster-onboarding skill. Identify the active host and version from available evidence, then ask which additional coding-agent apps the owner uses with this repository. Allow multiple choices and free-text additions. Do not assume user-reported apps are installed, authenticated or accessible.

Plan one shared project-local Foundry resource set and host-specific pointers/adapters for the selected hosts. Distinguish project-local configuration from global app settings. Never edit global configuration or create multiple root instruction files silently. Show the exact per-host plan and obtain approval before writing. Verify each selected host separately and report unavailable hosts as pending.

## 5. Select resources

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

## 6. Present an installation plan

Before writing files, tell the owner:
1. What project type you detected and the evidence used.
2. Which resources you propose to install and why.
3. What existing instructions overlap or conflict.
4. Which files will be created.
5. Which existing files, if any, need a proposed additive edit.
6. Which capabilities are unsupported by the host.
7. The Foundry release tag or exact source commit.

Wait for owner approval before changing files.

## 7. Install safely

Create project-local settings only when relevant and approved. The model roster is user-defined: copy the roster template as a schema/example, but do not populate it with guessed providers or model IDs. Never copy credentials into Foundry configuration.

Target layout:

    .agent-foundry/
    ├── manifest.json
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

## 8. Verify the installation

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

## 9. Completion report

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

## 10. Update and uninstall expectations

An update compares installed hashes with the manifest and preserves local modifications. It shows a change plan before replacing managed resources.

Uninstall may remove only files created and tracked by the manifest. It must never delete owner-authored files or remove existing instruction content outside the Foundry-managed block.
