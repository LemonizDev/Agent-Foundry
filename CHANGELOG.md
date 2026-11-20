# Changelog

## Unreleased

### Added
- Project-first README template, feature-menu architecture planner and README Maker refinements informed by GitHub Markdown guidance and curated README examples.
- `/done` command and Session Resource Curation skill to classify, validate and store reusable project artefacts from productive chat sessions, rejecting empty sessions.

### Changed
- Clarified the distinction between `/close` (durable context continuity) and `/done` (reusable resource extraction).

### Added
- README Maker skill for iterative landing-page design, nested feature navigation, visual hierarchy, accessibility and content validation.
- Host Roster Onboarding skill for discovering multiple coding-agent apps and planning shared project-local integration with per-host adapters.
- Interactive multi-host discovery in project initialization, including multiple selections and free-text host names.

### Changed
- Rebuilt README as a nested feature explorer covering all resources currently listed in the registry.
- Replaced colour-coded synthetic dialogue callouts with a compact onboarding journey and clearer practical benefits.
- Added concise contribution status and an explicit conversational contribution trigger.
- Expanded per-host integration guidance and separated documented conventions from runtime verification.
- Updated bootstrap and user-guide instructions for multi-host setup.

This file records user-visible changes by release.

## 0.6.0 — 2026-11-20

### Product architecture
- Reframed Agent Foundry as context files and a resource registry managed by the consuming project's existing coding agent.
- Added conversational management instructions, an authoritative settings specification and reusable chat response templates.
- Defined progressive disclosure, project-specific resource selection and host capability boundaries.
- Removed the CLI executable, engine source, engine-coupled tests and npm release workflow.
- Kept npm tooling private and development-only for repository validation and tests.

### Quality and documentation
- Replaced the validator's dependency on deleted engine modules with direct registry validation, including safe paths and dependency-cycle detection.
- Removed CLI-specific CI steps and package dry-run checks.
- Added regression tests preventing the executable and obsolete CLI documentation from returning.
- Rebuilt the README with feature navigation, a usage demo, compatible-host matrix, token-efficiency trade-offs and a codebase map.
- Added an explicit contribution-discovery command and skill with privacy boundaries, candidate ranking, user selection and publication approval.
- Expanded the lead/orchestrator profile and durable campaign workflow; added campaign-state and campaign-status resources plus a host orchestration capability guide.
- Updated host integration and contribution guidance for Codex, Claude Code, OpenCode, Kilo, Cline and other file-capable agents.

### Validation boundary
- Automated repository checks must pass on the new branch before review.
- Actual installation, natural-language discovery and lifecycle acceptance still require testing inside each supported coding-agent host.
- The context-first baseline is merged to main as version 0.6.0. A formal GitHub tag/release has not yet been published.
- Actual installation, natural-language discovery, contribution discovery and lifecycle acceptance still require testing inside each supported coding-agent host.

## Historical — v0.5 development
### Engine and installer
- Added package-bundled registry/resource loading as the default source, removing the second GitHub network dependency during installation.
- Kept remote source mode available through explicit `--ref` or `--repository`, with immutable commit resolution.
- Hardened CLI source selection, model-roster error handling and explicit host overrides during plan generation.
- Made uninstall prune only directories that become empty after removing Foundry-owned files.

### Quality gates and tests
- Added repository linting for JavaScript syntax, YAML parsing, Markdown escaping corruption and broken relative links.
- Added CLI lifecycle, bundled-source traversal, host override, uninstall-pruning, command metadata and npm package completeness tests.
- Added package checks for required runtime/resource folders, bootstrap specification and README artwork.

### Documentation and command system
- Rebuilt the README as a product and onboarding guide with CLI reference, presets, safety model, compatibility evidence levels and maturity disclosures.
- Added a command catalog defining permissions, shared behaviour, evidence requirements and failure handling.
- Added a release-readiness checklist covering package, CI, host and resource acceptance.
- Reorganised documentation navigation around reader goals and implementation work.

### Packaging and versioning
- Advanced package version to 0.5.0-dev.1.
- Added the previously omitted core instruction directory to the npm package allowlist.

### Validation boundary
- The current development head passes the configured six-job Node.js 20/22 Linux, Windows and macOS CI matrix: 48 tests, repository validation for 64 resources, lint across 121 files and npm pack dry-run (98 files).
- Host runtime acceptance, provider dispatch and production resource validation remain separate release gates.
- No stable npm release is created by this branch.

## 0.4.0 — development milestone

### Added
- Project-aware Node.js CLI for inspection, resource listing, plan-first initialization, validation, model recommendation, settings, update and uninstall.
- Resource presets, capability assessment, host artifact generation and manifest-based lifecycle management.
- Task-aware model classification and owner-defined model-roster validation.
- Cross-platform CI for Node.js 20 and 22 on Ubuntu, Windows and macOS.

### Validation boundary
- Automated tests cover registry integrity, installer lifecycle, host artifact generation, model routing and path protections.
- Native command discovery and runtime behaviour still require validation inside each supported host.
- Registry resources remain draft until scenario-level acceptance is recorded.
- The model router recommends from an owner-defined roster; it does not call providers or dispatch workers.
- Agent Foundry is not a sandbox and does not provide OS process isolation or network-policy enforcement.
