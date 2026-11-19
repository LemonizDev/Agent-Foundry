# Source Extraction Register

This register links source evidence to canonical Agent Foundry resources. The detailed inventory is in [REUSABLE_RESOURCE_INVENTORY.md](audit/REUSABLE_RESOURCE_INVENTORY.md).

## Source snapshots

| Source | Ref | Recursive tree | File blobs | Truncated |
|---|---|---:|---:|---|
| `LemonizDev/dhan-chatgpt-connector` | `foundation/final-trader-architecture` | 729 entries | 668 | No |
| `LemonizDev/futuristic-lively-wallpaper` | `main` | 179 entries | 168 | No |

## Confirmed source families

| Source family | Foundry resources | Status |
|---|---|---|
| Dhan `.kilo/commands/PROGRESS_REPORT_RULES.md` + Lively `rules/PROGRESS_REPORT_RULES.md` | progress-report skill, template and command contract | EXTRACTED_DRAFT |
| Dhan `.kilo/commands/TEACHING_AFTER_IMPLEMENTATION.md` + Lively equivalent | implementation-explanation skill and teach command | EXTRACTED_DRAFT |
| Dhan `AGENTS.md`, `docs/governance/DELEGATION_POLICY.md`, `.clinerules/*`, `.agents/*` | delegation skill, assignment/recovery templates, orchestration workflow, profile source family | PARTIALLY_EXTRACTED |
| Dhan `.kilo/agents/*`, `.agents/*` | canonical specialist profiles plus Kilo/FreeBuff adapters | INVENTORIED; deeper role-by-role extraction pending |
| Lively `.kilo/agent/*` | creative director, graphics engineer, performance QA and lighting profiles | PARTIALLY_EXTRACTED |
| Lively `AGENTS.md`, `.kilo/plans/awakening-master-plan.md` | atomic implementation, plan reconciliation, visual QA | EXTRACTED_DRAFT |
| Lively `tools/probe-*.mjs`, `tools/capture-*.mjs` | visual probe engineering patterns | EXTRACTED_DRAFT; source code not ported |
| Dhan `tests/telegram_regression/*` | privacy-safe evidence, test-spec/report schemas, regression workflow | PARTIALLY_EXTRACTED |
| Dhan `docs/operations/KILO_UNATTENDED_EXECUTION_THREAT_MODEL.md` | agent execution security skill | EXTRACTED_DRAFT |
| Dhan `docs/README.md`, governance and verification reports | documentation standard, decision/test/audit templates | PARTIALLY_EXTRACTED |
| Dhan `orchestration/*` | multi-agent campaign workflow and durable state templates | EXTRACTED_DRAFT |

## Current Agent Foundry resources

| Resource | Path | Status |
|---|---|---|
| Progress reporting | `skills/progress-reporting/SKILL.md` | DRAFT |
| Multi-agent delegation | `skills/multi-agent-delegation/SKILL.md` | DRAFT |
| Visual regression | `skills/visual-regression/SKILL.md` | DRAFT |
| Atomic implementation | `skills/atomic-implementation/SKILL.md` | DRAFT |
| Project state management | `skills/project-state-management/SKILL.md` | DRAFT |
| Plan reconciliation | `skills/plan-reconciliation/SKILL.md` | DRAFT |
| Implementation explanation | `skills/implementation-explanation/SKILL.md` | DRAFT |
| Visual probe engineering | `skills/visual-probe-engineering/SKILL.md` | DRAFT |
| Privacy-safe evidence | `skills/privacy-safe-evidence/SKILL.md` | DRAFT |
| Agent execution security | `skills/agent-execution-security/SKILL.md` | DRAFT |
| Multi-agent campaign | `workflows/multi-agent-campaign.md` | DRAFT |
| Progress report | `commands/progress-report.md` | DRAFT |
| Teach implementation | `commands/teach-implementation.md` | DRAFT |\n| Durable session learning | `skills/session-learning/SKILL.md` | DRAFT |\n| Close session | `commands/close-session.md` | DRAFT |\n| Foundry settings | `commands/settings.md` | DRAFT |\n| Edit model roster | `commands/edit-model-roster.md` | DRAFT |\n| Task-aware model delegation | `docs/architecture/MODEL_DELEGATION.md` | DRAFT |\n| Existing-project integration | `docs/architecture/EXISTING_PROJECT_INTEGRATION.md` | DRAFT |\n| User guide | `docs/USER_GUIDE.md` | DRAFT |
| Templates | `templates/` | DRAFT |
| Profiles | `profiles/` | DRAFT |

## Command discovery result

The inspected Dhan and Lively paths contain command/rule documents, not confirmed native slash-command definitions. In particular, `PROGRESS_REPORT_RULES.md` and `TEACHING_AFTER_IMPLEMENTATION.md` define behaviours but do not establish a native Kilo/Cline/FreeBuff slash-command invocation. Foundry therefore defines canonical command contracts and will implement host adapters only after confirming each tool's native format.

## Known gaps

- Read and normalise every specialist profile individually; avoid assuming same-named Kilo and FreeBuff roles are identical.
- Inspect the complete Telegram redaction implementation, test specifications, safety rules and tests before porting implementation code.
- Inspect high-value Dhan governance/verification documents individually before creating report templates from them.
- Inspect representative Lively probes in each family before creating portable probe templates.
- Capture immutable source commit SHAs for a validated extraction release.
- Add structural validators and scenario tests before changing any DRAFT to VALIDATED.
