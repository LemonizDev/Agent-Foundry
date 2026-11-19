# Changelog

## Unreleased

### Added
- Source-first audit inventory and coverage records for Dhan AI Trader and Lively Wallpaper.
- Extraction decisions and portability/exclusion rules.
- Implementation teaching, visual probe engineering, privacy-safe evidence, agent execution security and plan reconciliation skills.
- Teach-implementation command, decision/test/blocker templates, and additional Lively-derived specialist profiles.

### Corrected
- Replaced the premature initial extraction summary with a source-backed inventory.
- Clarified that progress/teaching rule files are not confirmed native slash commands.
- Distinguished tree-inventoried files from content-inspected and extracted resources.

### Validation
- Both recursive GitHub trees were complete (not truncated).
- New resources remain DRAFT pending structural checks and scenario validation.
- Source repositories remain unchanged.


## 2026-11-19

### Changed
- Rewrote the root README as a detailed onboarding, navigation, resource catalog, usage and contribution guide.
- Added `docs/README.md` as the central index for architecture, audits, extraction records and authoring standards.
- Documented current maturity and explicitly called out capabilities that do not exist yet (installer, CLI, automated validator and validated platform adapters).

### Validation
- Checked README relative links against the current repository tree.


## 2026-11-20

### Added
- Agent-first initialization entrypoint and detailed target-project bootstrap procedure.
- Distribution, installation and Git-based versioning design.
- First-time visitor README focused on explaining the product and intended setup experience.

### Changed
- Clarified that root AGENTS.md governs maintenance of Agent Foundry, not initialization of consuming projects.
- Replaced generic COMMAND.md, WORKFLOW.md, PROFILE.md and STANDARD.md file paths with descriptive standalone filenames.
- Kept skills as named packages containing SKILL.md so each skill can later include supporting references, scripts and examples.

### Limitations
- Agent-first bootstrap is documented but not yet a tested installer.
- CLI, resource selection engine, safe update/uninstall, automated validation, license and platform adapters remain incomplete.
\n\n## 2026-11-20 — Next capability increment\n\n### Added\n- Full user guide with lifecycle diagram, command explanations, session learning and model delegation guidance.\n- Existing-project integration and migration architecture with capability mapping and additive installation rules.\n- Task-aware model delegation design with intensity dimensions, workload classes, risk gates and a user-defined model roster.\n- Close-session command, durable session-learning skill and context-consolidation workflow.\n- Settings and model-roster editing command contracts and project-local configuration templates.\n\n### Changed\n- Rewrote the README around user problems and real outcomes instead of asking newcomers to understand internal resource categories first.\n- Renamed the source project's public product identity from Lively Wallpaper to Rave Engine in Foundry's source documentation. Lively remains the host platform.\n\n### Limitations\n- Command contracts are drafts; native host slash-command support is not yet implemented or verified.\n- Session close cannot close the chat UI without a host-provided API.\n- Model selection is a routing design; automatic per-task execution requires a tested host adapter and configured roster.\n- Existing-project integration remains an agent-executed procedure until the installer is implemented.\n

### Next capability increment

- Reframed the README around the engineering problems solved, user journeys and visual lifecycle diagrams.
- Added a complete user guide, existing-project integration/migration design and task-aware model delegation architecture.
- Added the close-session command, durable session-learning skill and session-close workflow.
- Added settings and user-defined model-roster commands with project-local YAML templates.
- Added model explain/test command contracts and registered the new resources.
- Renamed the source wallpaper project's public identity to **Rave Engine**, while retaining Lively Wallpaper as its host platform. Added a Rave Engine README, updated the agent mission and project context headings, and set the displayed Lively wallpaper title.
- Validated all 40 registry resource paths against the repository tree and checked relative links in the README, user guide and documentation index. No missing paths or broken links were found.
- Parsed the updated Lively metadata JSON successfully.
- Native command adapters, CLI/installer, automatic routing, automated schema validation and full end-to-end setup remain unimplemented.


### v0.4 engine and resource expansion

- Added a Node.js CLI for project inspection, plan-first installation, registry listing, validation, conservative updates, safe uninstall, model routing and settings discovery.
- Added project capability scanning and evidence-backed KEEP/LINK/EXTEND/INSTALL/ADAPT/DEFER/CREATE_TEMPLATE decisions.
- Added Codex-compatible skills and generated native skill/command artifacts for detected Claude Code, OpenCode, Kilo Code and Cline projects. Runtime host discovery is not yet exercised by CI.
- Added installation presets: minimal, balanced, autonomous-engineer, visual-engineer, research-engineer and auto.
- Expanded the reusable engineering library with repository audit, architecture design, implementation planning, debugging, testing, independent review, documentation maintenance and interrupted-work recovery.
- Added user commands for audit, implementation, debugging, review, verification, delegation, next-task selection, project health and recovery.
- Added registry integrity, dependency, installer, model-router and host-artifact tests.
- Added MIT license, security policy, contribution guidance and GitHub Actions CI.
