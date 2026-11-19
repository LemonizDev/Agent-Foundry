# Reusable Resource Inventory — Source-First Audit

**Audit date:** 2026-11-19  
**Sources:**  
- [Dhan AI Trader](https://github.com/LemonizDev/dhan-chatgpt-connector/tree/foundation/final-trader-architecture) — branch `foundation/final-trader-architecture`
- [Lively Wallpaper](https://github.com/LemonizDev/futuristic-lively-wallpaper/tree/main) — branch `main`

## 1. Scope and audit method

Both repositories were inspected through GitHub's recursive Git tree API. The trees were complete (GitHub reported `truncated=false`): Dhan returned 729 entries (668 file blobs), Lively returned 179 entries (168 file blobs). This inventory classifies reusable asset families and names the most relevant source paths.

This is a **repository-tree inventory with targeted content inspection**, not a claim that every one of the 836 file blobs was read line-by-line. High-value source families were opened and inspected; the rest are recorded as candidates requiring deeper review before extraction.

Classification:
- **Directly reusable:** method or format can be generalised with little change.
- **Adaptable:** useful after removing project/tool/domain assumptions.
- **Tool-specific:** meaningful only as an adapter for a named agent runtime.
- **Domain/project-specific:** retain as an optional pack or source reference; do not place in universal core.
- **Not reusable as-is:** generated, transient, obsolete, or too coupled to product internals.

## 2. Dhan AI Trader inventory

### 2.1 Agent definitions and profiles

| Source family | Inventory | What it contains | Foundry destination | Class |
|---|---|---|---|---|
| `.kilo/agents/*.md` | 15 specialist files | Code review, database migration, broker integration, docs/context, LLM quality, market data, observability, performance, Python backend, QA, quant/ML, security, architecture, SRE/deployment, Telegram reliability | `profiles/` + `integrations/kilo/` | Adaptable + tool-specific |
| `.agents/*.ts` | 15 typed definitions plus dispatcher and shared type | FreeBuff-native agent contracts, model selection, tools, spawnable agents, prompts and dispatcher | `profiles/` + `integrations/freebuff/` | Adaptable + tool-specific |
| `.agents/types/agent-definition.ts` | Shared TypeScript type | Runtime-facing agent schema; optional tool names, MCP servers, input schema, model options and step handler | Integration schema reference | Tool-specific |
| Lively `.kilo/agent/*.md` | 5 specialists | Code reviewer, creative director, graphics engineer, performance QA, rave lighting director | `profiles/` + optional visual domain pack | Adaptable + tool-specific |

**Important:** Dhan has parallel Kilo and FreeBuff definitions of many of the same roles. Do not duplicate all 30 as independent Foundry profiles. Extract canonical role definitions once, then build host adapters. The actual role contracts should be inspected individually before claiming full extraction.

### 2.2 Commands, rules and owner communication

| Source path | Observed content | Reuse decision | Destination |
|---|---|---|---|
| `.kilo/commands/PROGRESS_REPORT_RULES.md` | Six-section progress report, ASCII bars, work-weighted progress, glosses, honest caveats, uncommitted work | Reusable command/skill/reporting standard | `commands/`, `skills/progress-reporting/`, `templates/` |
| `.kilo/commands/TEACHING_AFTER_IMPLEMENTATION.md` | Post-implementation explanation, before/after flow, progress bar, three key points, break scenarios | Reusable optional teaching/reporting command | `commands/learning/`, `skills/explanation/` |
| `rules/PROGRESS_REPORT_RULES.md` | Matching progress-report rules in generic rules location | Duplicate/alias evidence; compare and retain one canonical source | `commands/` |
| `rules/TEACHING_AFTER_IMPLEMENTATION.md` | Matching teaching rule | Duplicate/alias evidence; do not fork | `commands/learning/` |
| `.clinerules/dhan-ai-trader-delegation.md` | FreeBuff-native delegation policy and specialist spawn checks | Extract portable delegation policy; adapter-specific runtime instructions remain in integration | `skills/multi-agent-delegation/`, `integrations/` |
| `AGENTS.md` | Read order, policy hierarchy, inspect-before-edit, delegation, evidence, documentation, teaching, Telegram regression | Source for core instructions and many distinct standards | `core/`, `standards/`, `skills/` |
| `USER_CONTEXT.md` | Owner-specific preferences and risk philosophy | Template for project context; personal content excluded | `templates/project/OWNER_CONTEXT.md` |

The progress report files are reusable rule documents, **not necessarily native slash-command implementations**. The canonical Foundry command should therefore be generated/adapted by platform-specific integrations.

### 2.3 Delegation and multi-agent orchestration

| Source | Asset | Reusable method |
|---|---|---|
| `AGENTS.md` §§5 and 5A | Delegation policy | Delegation evaluation, task sizing, capability-based model selection, quota awareness, assignment envelopes, recovery, checkpointing, independence |
| `docs/governance/DELEGATION_POLICY.md` | Detailed permanent delegation policy | Expanded tiers, provider suitability, model catalogue categories, assignment YAML, lifecycle and recovery protocol |
| `.clinerules/dhan-ai-trader-delegation.md` | FreeBuff agency instructions | Runtime probe-spawn, specialist invocation, fallback/escalation and lead integration |
| `.agents/agency-dispatcher.ts` | Runtime dispatcher | Host-specific dispatch design; inspect before adapter extraction |
| `orchestration/README.md` | Kilo campaign operating model | Persistent assignment channel, states, safety boundaries, assignment contract |
| `orchestration/inbox/`, `active/`, `completed/`, `reports/`, `state/` | Durable campaign layout | State machine, reports, blockers, journal and checkpoints |
| `orchestration/state/execution_state.json` | Current execution state example | Schema/template candidate only; do not copy current project state |
| `orchestration/state/blocker_register.md` | Blocker tracking | Reusable blocker register template |
| `orchestration/state/execution_journal.md` | Execution history | Durable journal format |
| `orchestration/reports/*` | Completion, review, integration, verification, migration, provenance reports | Extract report templates and evidence fields; exclude Dhan milestone content |

**Reusable command candidates suggested by these real assets:** progress report, teach/explain implementation, delegate task, resume interrupted task, campaign status, blocker review, prepare handoff, independent review. Native commands need platform-specific invocation files.

### 2.4 Testing, validation and evidence framework

| Source | Asset | Reuse decision |
|---|---|---|
| `tests/telegram_regression/README.md` | Agent-driven browser regression testing architecture and test suites | Reusable UI regression harness pattern, with target-app adapter |
| `tests/telegram_regression/agent_instructions.md` | Specialist execution instructions, preconditions, safety checks, evidence capture, verdicts | Adapt into test-specialist workflow |
| `tests/telegram_regression/specs/test_specs.yaml` | Declarative test cases and expected behaviour | Reusable test-spec schema; Dhan chat commands remain domain-specific |
| `tests/telegram_regression/specs/safety_rules.yaml` | Command classification, forbidden operations, chat isolation and mode requirements | Reusable safety-test pattern; policy values are Dhan-specific |
| `tests/telegram_regression/report_schema.json` | Machine-readable evidence report structure | Template/schema candidate |
| `tests/telegram_regression/redaction.py` | Mandatory sanitisation pipeline, evidence validator, screenshot protection | High-value privacy-safe testing skill/library; inspect implementation/tests before porting code |
| `tests/telegram_regression/test_redaction.py`, `test_validator.py` | Tests for sanitisation and evidence validation | Test pattern and validation cases |
| `docs/verification/*` | Consolidated matrices, source forensics, test-count reconciliation, scheduler atomicity, independent review, migration and safety reports | Evidence/report templates and audit workflows |
| `docs/implementation/IMPLEMENTATION_READINESS_MATRIX.md` | Readiness and dependency matrices | Reusable implementation readiness template |
| `.github/workflows/ci.yml` | Project CI pipeline | CI adapter pattern, not universal CI config |

A significant discovery: the Telegram regression suite correctly documents a real blocker where the browser tool could not access the conversation area. That is a useful example of an honest BLOCKED verdict rather than silently counting an unexecutable test as pass.

### 2.5 Documentation, planning and governance

| Source family | Reusable component |
|---|---|
| `docs/README.md` | Documentation taxonomy and canonical index |
| `PRODUCT_VISION.md` / roadmap | Project vision and roadmap templates; do not copy trading scope |
| `PROGRESS.md` | Current-state report structure |
| `PROGRESS_REPORT.md` | Evidence-backed progress report standard + dated project report; extract Part 1 only |
| `CHANGES.md` | Chronological change log pattern |
| `RUNBOOK.md` | Owner-facing operations manual format |
| `HANDOFF.md` | Session handoff format |
| `TRAINING_PLAN.md` | Domain-specific quantitative training plan; not universal |
| `docs/governance/DECISION_REGISTER.md` | Decision register with statuses and traceability |
| `docs/governance/MULTI_AGENT_RESEARCH_DECISION_REGISTER.md` | Multi-agent architecture decision register; adapt |
| `docs/governance/M7_7_OWNER_DECISION_BRIEF.md` | Owner-facing decision brief structure with options/evidence/risks |
| `docs/governance/PROPOSAL_CONTRACT_ASSESSMENT.md` | Contract assessment method; domain-specific details excluded |
| `docs/implementation/M7_CONTINUOUS_IMPLEMENTATION_EXECUTION_PLAN.md` | Campaign execution plan, sequencing, dependencies and gates |
| `docs/implementation/IMPLEMENTATION_READINESS_MATRIX.md` | Readiness scoring and prerequisites |
| `docs/verification/MASTER_AUDIT_FINAL_REPORT.md` | Comprehensive audit report structure |
| `docs/verification/M7_7_INDEPENDENT_ARCHITECTURE_REVIEW.md` | Adversarial independent architecture review |
| `docs/verification/M7_7_SOURCE_CHANGE_FORENSIC_AUDIT.md` | Source-change provenance and forensic reconciliation |
| `docs/verification/M7_7_TEST_COUNT_AND_COVERAGE_RECONCILIATION.md` | Test-count reconciliation method |
| `docs/verification/ROADMAP_RECONCILIATION.md` | Roadmap vs implementation evidence reconciliation |

### 2.6 Security, permission and unattended execution

| Source | Reusable asset | Classification |
|---|---|---|
| `docs/operations/KILO_UNATTENDED_EXECUTION_THREAT_MODEL.md` | Threat model for agent-driven local execution: process spawning, filesystem escapes, prompt injection, secret exposure, network/supply chain and persistence | Strong generic security skill, but Windows/Kilo examples are adapter notes |
| `docs/operations/KILO_UNATTENDED_EXECUTION_READINESS.md` | Readiness decision method and unmet controls | Security gate/checklist |
| `docs/operations/KILO_PERMISSION_BRIDGE_DESIGN.md` | Permission bridge concept and limitations | Architecture case study, not a universal implementation |
| `docs/verification/KILO_PERMISSION_BRIDGE_TEST_REPORT.md` | Evidence for rejecting unsafe permission bridge | Threat-model test report template |
| `AGENTS.md` | No unauthorised writes/deploys; secret handling; fail-closed project constraints | General principles plus Dhan-specific policy |

**Do not extract the Dhan SHADOW/PAPER trading rules into the general security standard.** Extract the general authorisation, isolation, secrets, network, filesystem and audit principles.

## 3. Lively Wallpaper inventory

### 3.1 Specialist agents

| Source path | Role | Reuse decision |
|---|---|---|
| `.kilo/agent/code-reviewer.md` | Skeptical reviewer | Consolidate with general reviewer profile; retain visual domain expertise |
| `.kilo/agent/creative-director.md` | Creative direction and visual quality | Optional creative/visual profile |
| `.kilo/agent/graphics-engineer.md` | Graphics/WebGL implementation specialist | Adaptable graphics engineering profile |
| `.kilo/agent/performance-qa.md` | Performance and QA specialist | Adaptable performance QA profile |
| `.kilo/agent/rave-lighting-director.md` | Audio-reactive lighting specialist | Domain pack/profile; do not put rave-specific direction in universal core |

### 3.2 Rules

| Source path | Asset |
|---|---|
| `rules/PROGRESS_REPORT_RULES.md` | Same visual/plain-language progress report rules as Dhan |
| `rules/TEACHING_AFTER_IMPLEMENTATION.md` | Same post-implementation teaching rule as Dhan |
| `AGENTS.md` | Creative quality principles, inspect-before-edit, atomic steps, phase stop, two-strikes rule, durable handoff, evidence and visual QA |
| `HANDOFF.md` | Compact resume document, verified completed work, open items, environment caveats, next step |

The duplicate Dhan/Lively rule files should become a single canonical Foundry resource with source provenance from both.

### 3.3 Visual engineering, diagnostics and QA tools

The `tools/` directory contains many diagnostic scripts. These are not all portable code, but the **test patterns and categories** are reusable:

| Tool family | Representative source paths | Reusable method |
|---|---|---|
| Control/property audit | `tools/audit-props.mjs`, `tools/probe-props.mjs`, `tools/probe-atmos-props.mjs`, `tools/probe-star-props.mjs` | Verify every advertised configuration control reaches a live consumer and causes the expected effect |
| Audio input validation | `tools/probe-audio.mjs`, `probe-audio-life.mjs`, `probe-bands.mjs`, `probe-rhythm.mjs` | Test input signal scaling, lifecycle, band independence and time behaviour |
| Layer/component diagnostics | `tools/probe-core.mjs`, `probe-knot.mjs`, `probe-materials.mjs`, `probe-tendrils.mjs`, `probe-orbits.mjs` | Isolate components, verify layer identity and relationships |
| Background/particle validation | `tools/probe-bg.mjs`, `probe-env.mjs`, `probe-particles.mjs`, `probe-stars.mjs` | Validate spatial constraints, motion, budgets, exclusion zones and deterministic behaviour |
| Laser/audio choreography | `tools/probe-beams.mjs`, `probe-choreo.mjs`, `probe-laser-audit.mjs`, `probe-laser-families.mjs`, `probe-laser-life.mjs`, `probe-laser-longform.mjs` | Validate event-driven visual/audio behaviour across varied synthetic scenarios |
| Interaction checks | `tools/probe-click.mjs`, `probe-interact.mjs`, `probe-chip.mjs` | Assert actual UI interactions and visible result, not just property declarations |
| Performance and stability | `tools/probe-perf.mjs`, `probe-soak.mjs`, `profile-file.mjs`, `glprobe.mjs` | Profile, soak-test and inspect environment capability with explicit limits |
| Visual capture/comparison | `tools/screenshot.mjs`, `capture-ab.mjs`, `capture-fixture.mjs`, `capture-states.mjs`, `qa-view.mjs`, `solo-trio.mjs` | Pinned-clock capture, before/after A/B, state fixtures and layer isolation |
| Packaging and sanity | `tools/orgcheck.mjs`, `statecheck.mjs`, `zip.mjs` | Structural sanity and package-integrity checks |

The 50+ probes should be treated as a **test design corpus**, not blindly copied as generic scripts. Their WebGL shader assumptions, Lively globals and paths are tightly coupled. Build portable probe templates/patterns, then adapter examples for browser graphics.

### 3.4 Plans, decisions and state management

| Source | Candidate |
|---|---|
| `.kilo/plans/awakening-master-plan.md` | One active authoritative plan; requirement status taxonomy; acceptance gates; architecture constraints; phase sequencing |
| `.kilo/plans/adr-01-single-lighting-director.md` | Architecture decision record (ADR) |
| `PROGRESS.md` | Append-only implementation/progress evidence |
| `TODO.md` | Actionable task backlog, but verify whether its items are current |
| `HANDOFF.md` | Current session handoff |
| `HARDWARE_VALIDATION.md` | Environment-specific validation protocol and explicit owner-required checks |
| `rave-engine-architecture-laser-recovery.md` | Recovery/architecture case study for complex subsystem work |

The plan's DONE / VERIFICATION INCOMPLETE / PARTIALLY IMPLEMENTED / NOT IMPLEMENTED / BLOCKED / SUPERSEDED taxonomy is particularly reusable.

### 3.5 Not portable without heavy adaptation

- WebGL2 single-canvas architecture, shaders, rendering passes, Lively properties and HUD contracts.
- RTX 3050 and SwiftShader performance thresholds.
- Specific audio bands, BPM/laser/rave choreography.
- The Windows PowerShell media utility and Lively package metadata.
- Nebula assets and their provenance. The asset build process may be a reproducible asset-pipeline example, but the image assets themselves are not a general agent resource.

## 4. Cross-project patterns (highest priority)

Both repositories independently use:
1. Short project-specific agent contract pointing to canonical documents.
2. A single authoritative active plan and separate current progress record.
3. Evidence-based progress reporting with ASCII bars and caveats.
4. Post-implementation explanation/teaching to the owner.
5. Inspect-before-edit and small atomic changes.
6. Explicit acceptance criteria and exact validation outcomes.
7. Durable handoff after a work session.
8. Specialists with bounded scope and ownership.
9. Skeptical independent code review.
10. Separation between automated checks and actual visual/runtime inspection.
11. Preservation of history and superseded decisions rather than deleting context.
12. Explicit blocked/unknown/not-verified states.

These should become shared core/standards/skills/workflows, not duplicated Dhan and Lively variants.

## 5. Foundry resource plan after audit

### Portable core
- Global agent contract
- Truth/evidence rules
- Inspect-before-edit / preserve user changes
- Atomic implementation
- Lead-agent accountability
- Scope/permission boundaries
- Context and source-of-truth hierarchy
- Session handoff discipline

### Commands
- Progress report
- Explain/teach implementation
- Repository audit
- Project health
- Next task
- Implement bounded task
- Debug/investigate issue
- Refactor
- Code review
- Independent audit
- Delegate assignment
- Resume interrupted assignment
- Campaign status
- Update documentation
- Create session handoff
- Run tests / verify milestone
- Security check
- Visual QA (selected only for visual projects)

Commands are candidate canonical invocations. Each platform integration decides whether it becomes a slash command, prompt, skill invocation or workflow action.

### Skills
- Repository reconnaissance/audit
- Requirements and source-of-truth reconciliation
- Architecture and dependency mapping
- Implementation planning
- Atomic implementation
- Debugging/root-cause analysis
- Testing strategy and regression test design
- Code review
- Independent architecture review
- Security/threat modelling for coding agents
- Multi-agent delegation and recovery
- Evidence-based progress reporting
- Documentation governance and update
- Session handoff/recovery
- Visual regression/perceptual QA
- Configuration/control wiring verification
- Input/signal lifecycle testing
- Privacy-safe evidence capture/redaction
- Performance and soak testing
- Release/package integrity verification

### Profiles
- Lead engineer / orchestrator
- Architect
- Researcher
- Python backend engineer
- TypeScript/frontend engineer
- QA/test automation engineer
- Code reviewer
- Security engineer
- SRE/deployment engineer
- Database migration engineer
- Observability engineer
- Performance engineer
- Documentation/context engineer
- LLM/agent quality engineer
- Graphics engineer (optional)
- Creative director (optional/domain)
- Visual/performance QA (optional)
- Domain specialists supplied by packs, not core

### Templates and workflows
- Project context, vision, roadmap, active plan
- Progress report, changelog, runbook, handoff
- ADR, decision register, risk/blocker register
- Task/assignment envelope, checkpoint, recovery handoff
- Implementation plan, test plan, test matrix, review report, audit report
- Campaign board and campaign state
- UI regression test spec, evidence schema, redaction policy
- Visual A/B capture report, performance profile, hardware-validation report
- New project bootstrap, repository audit, feature development, debugging, multi-agent campaign, release verification, project handoff

## 6. Audit limitations and next work

- Recursive trees are complete for the inspected refs.
- Targeted contents inspection confirms the core agent/rule/testing/plan families described above.
- Not every individual agent definition, every verification report, or every Lively probe has been read line-by-line yet. Those remain listed as inventory candidates; individual extraction requires source inspection.
- Current branch names are used as provenance, not immutable commit IDs. Capture commit SHAs before final validated releases.
- The next pass should inspect every candidate in the high-priority families, consolidate duplicates, and create canonical Foundry resources with individual provenance. Do not mass-copy the source repositories.
