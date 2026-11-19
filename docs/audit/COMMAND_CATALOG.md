# Command Catalog

Commands are user-facing entry points. A command contract defines intent, inputs, permissions and output. It delegates the procedure to one or more skills/workflows. It does not assume a slash-command feature exists in every host.

## Confirmed source behaviours

| Behaviour | Dhan source | Lively source | Foundry command | Status |
|---|---|---|---|---|
| Evidence-based progress report | `.kilo/commands/PROGRESS_REPORT_RULES.md` | `rules/PROGRESS_REPORT_RULES.md` | `/progress-report` | DRAFT |
| Teach/explain after implementation | `.kilo/commands/TEACHING_AFTER_IMPLEMENTATION.md` | `rules/TEACHING_AFTER_IMPLEMENTATION.md` | `/teach-implementation` | DRAFT |

These source files are rule documents, not proof of native slash-command registration. The two files are shared across both projects and should be extracted once.

## Additional commands to design from inspected capabilities

These are proposed canonical command contracts, not claims that source repositories contain commands with these names.

| Candidate | Source evidence | Underlying resource |
|---|---|---|
| `/repository-audit` | Dhan repository capability audit, Lively source inventory and AGENTS inspect-before-edit | repository-audit skill |
| `/project-health` | Dhan readiness/verification matrices, Lively hardware validation and progress state | health assessment workflow |
| `/next-task` | Both projects' authoritative active plans and handoffs | plan reconciliation |
| `/implement` | Both projects' atomic implementation and acceptance gates | atomic implementation workflow |
| `/debug` | Lively root-cause/diagnostic probe practice; Dhan source-change forensics | debugging skill |
| `/review` | Dhan and Lively independent reviewer profiles | code-review skill |
| `/independent-audit` | Dhan master audit and independent architecture review reports | audit workflow |
| `/delegate` | Dhan delegation policy and FreeBuff/Kilo specialist contracts | delegation skill |
| `/resume-task` | Dhan checkpoint/recovery protocol and orchestration state | recovery workflow |
| `/campaign-status` | Dhan orchestration execution state, journal and blocker register | campaign workflow |
| `/handoff` | Both projects' HANDOFF patterns | handoff workflow |
| `/update-docs` | Dhan documentation taxonomy and canonical document policy | documentation skill |
| `/verify` | Dhan test matrices and Lively probe/capture suites | verification workflow |
| `/visual-qa` | Lively visual probes, captures and layer isolation | visual QA workflow |
| `/security-audit` | Dhan agent execution threat model and security specialist | security audit skill |

## Adapter requirements

Each tool adapter must state:
- Native command mechanism and exact file format
- Tested tool version
- Argument and context mapping
- Permission model
- Unsupported command features
- Installation/update behaviour
- Validation evidence

Do not emit native files until the platform's current command mechanism has been verified. Some hosts may require a prompt file, a skill, a workflow, or a tool-specific command registration.
