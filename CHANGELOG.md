# Changelog

Unreleased entries describe development work, not release readiness.

## Unreleased — v0.5 development

### Documentation and command system
- Rebuilt the README as a product and onboarding guide with CLI reference, presets, safety model, compatibility evidence levels and maturity disclosures.
- Added a command catalog defining permissions, shared behaviour, evidence requirements and failure handling.
- Added a release-readiness checklist covering package, CI, host and resource acceptance.
- Reorganised documentation navigation around reader goals and implementation work.

### Packaging and versioning
- Advanced package version to 0.5.0-dev.1.
- Added the previously omitted core instruction directory to the npm package allowlist.

### Validation boundary
- This branch has not yet passed CI in this environment.
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
