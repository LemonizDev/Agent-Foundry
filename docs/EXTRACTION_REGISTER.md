# Source Extraction Register

This register records source-derived candidates. It deliberately distinguishes what has been inspected from what has merely been proposed.

## Sources

| Source | Ref inspected | Role | Current state |
|---|---|---|---|
| `LemonizDev/dhan-chatgpt-connector` | `foundation/final-trader-architecture` | Rich source for agent operating rules, delegation, progress reporting, documentation governance, and orchestration | Initial files inspected; broader inventory pending |
| `LemonizDev/futuristic-lively-wallpaper` | `main` | Source for visual QA, iterative implementation, bounded delegation, progress/handoff discipline, and creative-engineering review | Initial files inspected; broader inventory pending |

## Candidate inventory

| Candidate | Source path | Type | Portability | Evidence observed | Destination | Status |
|---|---|---|---|---|---|---|
| Agent operating contract | `AGENTS.md` | Core instructions / standard | ADAPTABLE | Read order, authority rules, inspect-before-edit, test expectations, no unauthorised commits/deploys | `core/` + `standards/` | INSPECTED |
| Evidence-based progress report | `PROGRESS_REPORT.md` | Template + skill + command candidate | ADAPTABLE | Six fixed sections, workstream weighting, maturity scale, caveats beside claims, no fabricated precision | `templates/` + `skills/` + `commands/` | INSPECTED |
| Delegation accountability | `AGENTS.md` | Standard + skill | UNIVERSAL | Lead retains correctness, architecture, integration, and verification accountability | `standards/` + `skills/multi-agent-delegation/` | INSPECTED |
| Model-aware task sizing | `AGENTS.md` | Skill / standard | ADAPTABLE | Four complexity tiers and capability-based model selection; source additionally imposes a Dhan-specific free-only policy | `skills/multi-agent-delegation/` | INSPECTED |
| Delegation assignment envelope | `AGENTS.md` | Template | ADAPTABLE | Structured assignment fields for objective, scope, role, complexity, model, context, acceptance, tests, dependencies, retry, checkpoint, reporting | `templates/assignments/` | INSPECTED |
| Subagent recovery and checkpoints | `AGENTS.md` | Skill / workflow | UNIVERSAL | Preserve verified checkpoint, record failure, replace/recover bounded task, avoid silent takeover | `skills/session-recovery/` + `workflows/` | CANDIDATE |
| Documentation taxonomy and authority | `docs/README.md` | Standard | ADAPTABLE | Canonical/reference/verified/historical/proposed labels; category taxonomy; root index; one source of truth | `standards/documentation/` | INSPECTED |
| Persistent orchestration handoff | `orchestration/README.md` | Workflow + templates | ADAPTABLE | Inbox → active → review → completed; failed/blocked/interrupted states; completion requires report, diff, and test evidence | `workflows/multi-agent-campaign/` + `templates/assignments/` | INSPECTED |
| Atomic implementation and handoff | `AGENTS.md` | Workflow / standard | UNIVERSAL | One bounded step at a time, falsifiable check, progress update, phase gates, handoff | `workflows/feature-development/` | INSPECTED |
| Visual QA and evidence discipline | `AGENTS.md` | Skill / standard | ADAPTABLE | Same viewport/clock/settings for A/B; pinned animation clock; layer isolation; probes; distinguish visual inspection from automated tests | `skills/visual-regression/` + `standards/evidence-and-verification/` | INSPECTED |
| Perceptual problem-solving loop | `AGENTS.md` | Skill | ADAPTABLE | Describe observed defect, infer structural cause, compare alternative fixes, make smallest causal change, assess regressions | `skills/visual-debugging/` | INSPECTED |
| Current plan vs historical plans | `.kilo/plans/awakening-master-plan.md` | Standard / workflow | ADAPTABLE | One authoritative active plan; archived plans explicitly marked; status classification avoids redoing completed work | `standards/project-documentation/` | INSPECTED |
| Creative direction and Lively-specific rendering constraints | `AGENTS.md` + master plan | Domain pack | PROJECT-SPECIFIC | Palette, composition, WebGL2, Lively runtime, audio-reactive scene, performance tier constraints | Exclude from universal core; retain as optional visual-art domain pack only if useful | CANDIDATE |
| Tool-specific Kilo orchestration | `orchestration/README.md` | Integration | TOOL-SPECIFIC | Kilo CLI flags, session commands, model identifiers, permission behaviour | `integrations/kilo/` after independent version verification | INSPECTED |
| Slash commands for coding-agent workflows | Candidate paths not yet located | Command | UNKNOWN | No coding-agent slash-command definition has yet been confirmed in the inspected source paths | Hold until repository inventory identifies actual command files | BLOCKED |

## Important distinctions

- The Dhan `PROGRESS_REPORT.md` contains both a reusable reporting standard and a dated project report. Extract the standard and template; do not copy its trading workstreams, percentages, safety ladder, or live-state figures into a universal template.
- The Dhan Telegram bot command list is a product interface, not evidence of coding-agent slash commands. Do not misclassify it.
- Dhan's free-only model/provider restrictions are project-owner policy, not universal policy. Generalise capability-based model selection and quota-aware planning; retain free-only rules only in an explicitly selected policy pack.
- Lively's visual direction and rendering architecture are project-specific. Extract the methods for visual investigation, reproducible comparison, probe design, and honest QA status.
- Lively's software-GL measurements are not evidence of performance on the user's RTX 3050 hardware.
- Kilo command-line flags and model IDs are tool/version-specific. They do not belong in the portable core.

## Next extraction targets

1. Inspect the remainder of Dhan `AGENTS.md`, especially delegation envelope, retry/recovery, owner communication, progress reporting, teaching, and documentation sections.
2. Locate actual command, agent, rules, and mode files in Dhan. Record exact paths; do not infer filenames from references.
3. Inspect Dhan templates and governance/verification docs for reusable formats.
4. Inspect Lively `HANDOFF.md`, remaining master-plan execution contract, probe/harness conventions, and scripts.
5. Convert the strongest candidates into independent resources and add scenario-based validation.
