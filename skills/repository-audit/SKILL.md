---
id: repository-audit
name: Evidence-Based Repository Audit
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Evidence-Based Repository Audit

## Purpose

Build an accurate map of an unfamiliar repository before proposing or implementing changes. The audit must reveal what the project contains, how it works, where its authoritative decisions live, and which risks or gaps matter.

## Trigger

Use at project onboarding, before a substantial unfamiliar task, after major structural changes, or when project documentation and observed behaviour disagree.

## Procedure

1. **Establish boundaries.** Confirm repository root, branch/ref, working-tree state, project purpose and requested audit scope. Preserve uncommitted work.
2. **Inventory structure.** Inspect top-level directories, manifests, build/test configuration, CI, deployment files, agent instructions and documentation indexes. Do not recursively dump every file into context.
3. **Identify runtime.** Trace entrypoints, startup path, major modules, dependency boundaries, persistence, external services and user-facing surfaces.
4. **Trace critical flows.** Follow representative behaviour from input to output, including error paths and state transitions.
5. **Map quality controls.** Identify tests, lint/type checks, build validation, static analysis, security controls, visual/runtime probes and their actual coverage.
6. **Map project governance.** Find product scope, architecture decisions, roadmap, current progress, changelog, runbooks and ownership rules. Identify duplicate or conflicting sources of truth.
7. **Inspect risk surfaces.** Review secrets handling, permissions, destructive operations, data integrity, dependency exposure and production boundaries relevant to the project.
8. **Verify claims.** Use source code, executable checks and reproducible evidence. Label documentation-only claims as documented, not verified.
9. **Build a capability map.** For each important capability classify KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE, with evidence and rationale.
10. **Prioritise findings.** Separate blockers, high-risk defects, structural weaknesses, quality gaps and optional improvements.

## Deliverables

- Repository purpose and detected technology/runtime.
- Directory and component map.
- Critical execution/data flows.
- Authoritative context and instruction map.
- Existing verification and automation inventory.
- Capability map with evidence.
- Findings ranked by severity, impact and confidence.
- Recommended next actions with acceptance criteria.

## Restrictions

- Audit before editing; do not silently fix issues during a read-only audit.
- Do not infer architecture from filenames alone.
- Do not expose secrets or include raw sensitive configuration in reports.
- Do not claim exhaustive coverage when only representative paths were inspected.
- Do not create duplicate architecture or project-status documents.

## Completion criteria

A new engineer can explain the system's major boundaries, locate authoritative decisions, identify how changes are verified, and understand the most important risks without reading the entire repository.
