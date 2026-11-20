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
