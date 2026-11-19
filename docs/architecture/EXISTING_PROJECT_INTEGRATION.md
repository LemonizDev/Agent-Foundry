# Existing Project Integration and Migration

## 1. Design objective

Agent Foundry must be installable into a repository that already has code, architecture, documentation, instructions, tools and established habits.

It is an additive integration, not a project rewrite.

A project does not need to adopt the Dhan AI Trader document taxonomy, directory structure, technology choices, or degree of process. Foundry should improve the existing system while preserving what already works.

## 2. Integration modes

| Mode | Use case | Behaviour |
|---|---|---|
| New project | Empty or newly created repository | Select a preset, install the chosen agent resources and create only the Foundry context/settings files required by the installer |
| Existing project | Established codebase without Foundry | Inspect, map equivalents, recommend gaps, then install additively |
| Existing Foundry project | Manifest already exists | Preview resource changes, preserve local edits and apply approved updates |
| Partial adoption | Project wants one capability only | Install selected resource(s) and dependencies without the full baseline |
| Other agent framework | Existing host-specific instructions or skills | Preserve them and add a small bridge only when compatible |

## 3. Assessment before installation

The integration agent performs a read-only assessment. The v0.4 CLI provides a local structural scan and project signals; it does not claim to understand architecture from filenames alone. The coding agent must inspect relevant source and documentation before recommending a final resource set.

Inspect:
- root and nested agent instructions;
- README, architecture docs, ADRs and project context;
- manifests, build/test scripts and repository structure;
- existing skills, commands, workflows and templates;
- model and provider configuration where the owner has authorised access;
- CI, testing, release and security practices;
- project-specific constraints and owner preferences.

Do not read secrets or dump environment files. Do not execute project code merely to classify it. Do not assume a similarly named file has the same meaning as a Foundry resource.

Create an assessment with:
- detected project type and confidence (the CLI signals are heuristic; deeper semantic assessment is performed by the coding agent);
- existing capability and its source file;
- Foundry capability that overlaps;
- gap or conflict;
- proposed action: KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE;
- evidence and unresolved questions.

## 4. Capability mapping

Use capability mapping, not filename matching.

Example:

| Capability | Existing evidence | Foundry recommendation | Action |
|---|---|---|---|
| Project context | Mature README and architecture docs | Context baseline | LINK; do not duplicate |
| Agent instructions | Detailed AGENTS.md | Compact Foundry bridge | EXTEND only after approval |
| Test strategy | CI and test standards | Verification skill | LINK or EXTEND |
| Model routing | No roster | Model delegation and roster | INSTALL if multi-agent use is desired |
| Session learning | No durable preference capture | Close-session command | INSTALL |
| Visual QA | Browser harness and screenshot probes | Visual QA resources | ADAPT; preserve existing harness |

## 5. Installation plan

Before any write, show:
1. summary of existing project practices;
2. capabilities already covered;
3. gaps that matter;
4. conflicts and authority precedence;
5. exact files to create;
6. exact additive changes proposed to existing files;
7. resources deliberately excluded;
8. validation plan.

Wait for approval.

## 6. Safe integration rules

- Preserve existing AGENTS.md, CLAUDE.md, .github instructions and other host files.
- Never replace a project architecture or roadmap with Foundry templates.
- Prefer a short pointer to .agent-foundry/instructions.md over copying a large instruction block.
- Where an existing file already covers a capability, choose KEEP or LINK in the assessment rather than copying it. The current manifest tracks Foundry-owned files; external project-document links are not yet a first-class manifest feature.
- Keep local conventions authoritative unless the owner explicitly chooses otherwise.
- Do not change source code, dependencies, CI, build scripts or runtime configuration during a documentation-only installation unless explicitly included in the approved plan.
- Never overwrite a file with a name collision. Propose a merge or a distinct destination.
- Do not copy secrets, credentials, user data or generated build artefacts into Foundry state.

## 7. Context and instruction precedence

Default precedence:
1. Host/system safety and user instruction.
2. Explicit project-owner instruction.
3. Existing project architecture, security and domain constraints.
4. Existing project agent instructions.
5. Installed Foundry baseline and selected standards.
6. Selected skills, profiles, commands and workflows.
7. Examples and historical notes.

If the project has its own precedence model, document and follow it. Foundry is not entitled to overrule an existing project's policy.

## 8. Migration from weaker or older agent setups

Do not label a project “behind” simply because it lacks Dhan's level of documentation or automation. Assess by capability and risk.

For each capability:
- KEEP: already adequate;
- LINK: existing authoritative source is sufficient;
- EXTEND: add missing detail to an existing source;
- INSTALL: capability is absent and useful;
- ADAPT: equivalent exists but needs a Foundry-compatible bridge;
- DEFER: not currently worth the complexity;
- EXCLUDE: irrelevant or unsafe.

Prioritise high-value gaps: source-of-truth clarity, safe editing, verification, session continuity, and owner-controlled autonomy. Add multi-agent orchestration only when the project and host can benefit from it.

## 9. Upgrade protocol

For an existing Foundry installation:
1. Read manifest and exact installed revision.
2. Detect local changes using recorded hashes.
3. Read release notes and resource dependency changes.
4. Produce added/changed/deprecated/removed summary.
5. Classify each local divergence as keep, merge, replace with approval, or retire.
6. Run the CLI update preview and review changed paths and local-modification conflicts.
7. Apply only after explicit approval. The updater backs up changed file contents and restores them if a write fails.
8. Validate the resulting manifest, resource hashes, YAML settings and model roster.
9. Exercise host discovery and command execution manually; the current CLI does not yet run end-to-end tests inside each host.

## 10. Completion criteria

- Existing instructions and architecture remain intact.
- Capability map identifies reuse and gaps.
- All changes match the approved plan.
- No resource is duplicated unnecessarily.
- Manifest records source revision and installed resources.
- Validation results and host limitations are explicit.
- The owner knows how to update and remove the installation.


## 11. Current implementation boundary

The v0.4 installer:
- creates a local `.agent-foundry/` manifest, instructions, README and owner-editable settings;
- copies selected source resources into the project;
- generates host-specific skills, commands and specialist profile files for detected hosts;
- adds marked pointers to AGENTS.md and, when detected, CLAUDE.md or Cline rules;
- resolves the source ref to an immutable Git commit before downloading resource content;
- refuses path collisions by default and can explicitly skip them;
- previews updates/uninstall and uses ownership hashes to preserve local changes.

It does not yet:
- semantically reconcile every existing project skill or command with every Foundry resource automatically;
- store external project-document links as first-class manifest dependencies;
- prove command discovery or execution inside every supported host;
- dispatch model workers or control host session lifecycle;
- migrate arbitrary existing agent frameworks without an agent-led review.
