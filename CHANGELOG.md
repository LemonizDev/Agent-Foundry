# Changelog

Unreleased entries describe development work, not release readiness.

## Unreleased — v0.6 context-first redesign

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
- Rewrote the README, bootstrap guide, user guide, host integration guide, architecture references, contribution and security guidance for the context-first model.

### Validation boundary
- Automated repository checks must pass on the new branch before review.
- Actual installation, natural-language discovery and lifecycle acceptance still require testing inside each supported coding-agent host.
- No merge or stable release is implied by this development branch.

## Unreleased entries from v0.5 development

# Changelog

Unreleased entries describe development work, not release readiness.

## Unreleased — v0.5 development

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
