# Changelog

All notable repository changes are recorded here. This project is in active development; entries describe repository state, not a promise that every documented resource is production-ready.

## Unreleased

### Documentation and repository experience
- Refined the root README as the visitor landing page, with original project artwork and expandable documentation navigation.
- Reorganised the documentation index around reader goals and resource categories.
- Corrected stale release and implementation-status statements so they reflect the v0.4 development branch.
- Preserved explicit limitations around host runtime acceptance, provider dispatch and draft resource validation.

## 0.4.0 — development milestone

### Added
- Project-aware Node.js CLI for inspection, resource listing, plan-first initialization, validation, model recommendation, settings, update and uninstall.
- Resource selection presets and capability assessment for existing projects.
- Host-specific skill, command and profile artifact generation for supported coding-agent formats.
- Project-local installation manifest with immutable source revision and managed-file hashes.
- Preview-first updates and uninstall, conflict preservation, rollback and path/symlink protections.
- Task-aware model classification and owner-defined model-roster validation.
- Cross-platform CI for Node.js 20 and 22 on Ubuntu, Windows and macOS.
- MIT license, security policy, contribution guidance, support documentation and tagged-release workflow.
- User guide, engine architecture, existing-project integration and model-delegation documentation.

### Validation boundary
- Automated tests cover registry integrity, installer lifecycle, host artifact generation, model routing and path protections.
- CI exercises the automated suite and repository validation across the configured operating-system and Node.js matrix.
- Native command discovery and runtime behaviour still require acceptance testing inside each supported coding-agent host.
- Registry resources are marked draft and require scenario-level validation before being described as production-ready.
- The model router recommends from an owner-defined roster; it does not call model providers or dispatch workers.
- Agent Foundry is not a sandbox and does not provide operating-system process isolation or network-policy enforcement.

## Earlier development history

The project evolved from a documentation-first resource library into a project-aware integration engine. Earlier design notes and extraction decisions remain available in the [audit documentation](docs/README.md#i-want-to-audit-the-source-material).
