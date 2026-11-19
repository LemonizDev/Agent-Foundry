# Agent Foundry

**A reusable engineering library for AI coding agents.**

Agent Foundry collects the operating instructions, specialist roles, commands, skills, workflows, templates and engineering standards that make coding-agent work repeatable across projects. Its purpose is to stop every new repository from reinventing the same agent setup.

It is a **resource library**, not yet an installer or a fully automated agent framework. The resources are authored in a portable form first; platform-specific adapters will translate them into the formats supported by Kilo, Cline, OpenCode, Claude Code, Codex and other tools.

---

## Start here

New to this repository? Follow this order:

1. **[Global instructions](core/GLOBAL_INSTRUCTIONS.md)** — the compact baseline intended to inform agent behaviour in consuming projects.
2. **[Resource model](docs/architecture/RESOURCE_MODEL.md)** — what each resource type means and how they fit together.
3. **[Resource catalog and registry](#resource-catalog)** — browse the actual reusable assets available today.
4. **[Command catalog](docs/audit/COMMAND_CATALOG.md)** — understand current command contracts and proposed future commands.
5. **[Resource authoring standard](docs/standards/RESOURCE_AUTHORING_STANDARD.md)** — how new resources must be written and validated.
6. **[Source extraction register](docs/EXTRACTION_REGISTER.md)** — see where resources came from and what is still incomplete.

For the source audit, start with the **[Reusable Resource Inventory](docs/audit/REUSABLE_RESOURCE_INVENTORY.md)**. It explains what was discovered in Dhan AI Trader and Lively Wallpaper, how it was classified, and what should or should not be copied into the universal library.

## Find something by task

| I need to… | Start here |
|---|---|
| Give an agent baseline operating instructions | [Global instructions](core/GLOBAL_INSTRUCTIONS.md) |
| Generate an honest project progress report | [Progress-report command](commands/project/progress-report/COMMAND.md) → [Progress-report skill](skills/progress-reporting/SKILL.md) → [Report template](templates/progress-report/PROGRESS_REPORT.md) |
| Explain a code change to the project owner | [Teach-implementation command](commands/learning/teach-implementation/COMMAND.md) → [Explanation skill](skills/implementation-explanation/SKILL.md) |
| Delegate work to multiple agents | [Delegation skill](skills/multi-agent-delegation/SKILL.md) → [Assignment template](templates/assignments/DELEGATION_ASSIGNMENT.md) |
| Run or coordinate a multi-agent campaign | [Campaign workflow](workflows/multi-agent-campaign/WORKFLOW.md) |
| Recover an interrupted agent task | [Recovery handoff template](templates/assignments/RECOVERY_HANDOFF.md) |
| Reconcile active plans and stale documentation | [Plan-reconciliation skill](skills/plan-reconciliation/SKILL.md) |
| Perform visual or graphics QA | [Visual-regression skill](skills/visual-regression/SKILL.md) → [Visual-probe skill](skills/visual-probe-engineering/SKILL.md) |
| Capture evidence without leaking sensitive data | [Privacy-safe evidence skill](skills/privacy-safe-evidence/SKILL.md) |
| Review coding-agent execution permissions | [Agent-execution security skill](skills/agent-execution-security/SKILL.md) |
| Create a decision, blocker or test report | [Decision register](templates/governance/DECISION_REGISTER.md) · [Blocker register](templates/governance/BLOCKER_REGISTER.md) · [Test evidence report](templates/verification/TEST_EVIDENCE_REPORT.md) |
| Create or adapt an agent role | [Profiles catalog](profiles/README.md) |
| Adapt resources to a coding-agent platform | [Integration guide](integrations/README.md) |

---

## How the pieces fit together

Agent Foundry separates the different jobs that are often mixed into one oversized instruction file.

| Resource type | What it does | Example |
|---|---|---|
| **Core instructions** | Sets the baseline behaviour and boundaries for an agent | `core/GLOBAL_INSTRUCTIONS.md` |
| **Profile** | Defines the responsibility and decision boundaries of a role | Lead engineer, reviewer, graphics engineer |
| **Standard** | Defines a quality rule that applies across many tasks | Evidence and verification |
| **Skill** | Explains how to perform one bounded capability | Multi-agent delegation |
| **Command** | Gives the user a named way to invoke a capability | `/progress-report` |
| **Workflow** | Coordinates multiple activities, owners, gates and handoffs | Multi-agent campaign |
| **Template** | Provides a repeatable structure for an output | Delegation assignment |
| **Integration** | Maps portable resources into a tool's native format | Future Kilo or OpenCode adapter |
| **Domain pack** | Adds optional domain-specific rules without polluting the core | Future trading or graphics pack |

A typical relationship looks like this:

```text
User invokes a command
        |
        v
Command selects a skill or workflow
        |
        +------> Skill follows relevant standards
        |              |
        |              v
        |        Uses a template for output
        |
        v
Workflow coordinates roles, checkpoints and gates
        |
        v
Agent profile defines who owns each responsibility
        |
        v
Platform adapter maps the resource to the target tool
```

Not every task needs every layer. A simple code review may only need a reviewer profile, a review skill and the evidence standard.

---

## Repository map

```text
Agent-Foundry/
│
├── README.md                         # This guide: start here
├── AGENTS.md                         # Instructions for agents maintaining this repository
├── CHANGELOG.md                      # Chronological record of Foundry changes
│
├── core/
│   └── GLOBAL_INSTRUCTIONS.md        # Portable baseline for consuming projects
│
├── commands/                         # User-facing invocation contracts
│   ├── project/
│   │   └── progress-report/
│   └── learning/
│       └── teach-implementation/
│
├── skills/                           # Reusable task procedures
│   ├── agent-execution-security/
│   ├── atomic-implementation/
│   ├── implementation-explanation/
│   ├── multi-agent-delegation/
│   ├── plan-reconciliation/
│   ├── privacy-safe-evidence/
│   ├── progress-reporting/
│   ├── project-state-management/
│   ├── visual-probe-engineering/
│   └── visual-regression/
│
├── workflows/                        # Multi-step coordination
│   └── multi-agent-campaign/
│
├── profiles/                         # Agent roles and their responsibilities
│   ├── lead-engineer/
│   ├── independent-reviewer/
│   ├── visual-quality-engineer/
│   ├── graphics-engineer/
│   ├── creative-director/
│   ├── performance-qa/
│   └── creative-lighting-director/
│
├── standards/                        # Cross-cutting engineering rules
│   ├── documentation/
│   └── evidence-and-verification/
│
├── templates/                        # Reusable output structures
│   ├── assignments/
│   ├── governance/
│   ├── progress-report/
│   └── verification/
│
├── integrations/                     # Platform adapter design and future adapters
│
├── registry/
│   └── resources.yaml                # Machine-readable catalog of registered resources
│
└── docs/
    ├── README.md                     # Documentation navigation
    ├── architecture/                 # Resource architecture and design
    ├── audit/                        # Source inventory, coverage and decisions
    └── standards/                    # How to author and validate resources
```

The tree above shows the current implemented structure. Empty future categories such as `domain-packs/` and `scripts/` have intentionally not been created just for symmetry.

---

## Resource catalog

The machine-readable source of truth for registered reusable assets is **[`registry/resources.yaml`](registry/resources.yaml)**. It currently lists **28 resources**. This is a catalog of drafts, not a claim that all entries are production-ready.

### Core instructions

| File | Purpose |
|---|---|
| [GLOBAL_INSTRUCTIONS.md](core/GLOBAL_INSTRUCTIONS.md) | Compact, portable behaviour and safety baseline for consuming projects |

### Commands

Commands are contracts, not yet native slash-command files generated for a particular coding agent.

| Command | Contract | Underlying capability |
|---|---|---|
| `/progress-report` | [COMMAND.md](commands/project/progress-report/COMMAND.md) | Evidence-based progress reporting |
| `/teach-implementation` | [COMMAND.md](commands/learning/teach-implementation/COMMAND.md) | Explain implementation changes to the owner |

See the [Command Catalog](docs/audit/COMMAND_CATALOG.md) for the difference between confirmed source behaviours and proposed future commands.

### Skills

| Skill | Use it for |
|---|---|
| [Agent execution security](skills/agent-execution-security/SKILL.md) | Threat-modelling agent tools, process execution, filesystem access, secrets and network exposure |
| [Atomic implementation](skills/atomic-implementation/SKILL.md) | Small, reviewable changes with immediate falsifiable checks |
| [Implementation explanation](skills/implementation-explanation/SKILL.md) | Teaching the owner what changed and how it can fail |
| [Multi-agent delegation](skills/multi-agent-delegation/SKILL.md) | Bounded assignments, specialist selection, accountability and recovery |
| [Plan reconciliation](skills/plan-reconciliation/SKILL.md) | Reconcile active plans, progress records, code and historical decisions |
| [Privacy-safe evidence](skills/privacy-safe-evidence/SKILL.md) | Sanitize and validate logs, screenshots, DOM and reports before persistence |
| [Progress reporting](skills/progress-reporting/SKILL.md) | Produce honest, evidence-backed owner-facing status reports |
| [Project state management](skills/project-state-management/SKILL.md) | Maintain authoritative direction, active plan, progress and handoff records |
| [Visual probe engineering](skills/visual-probe-engineering/SKILL.md) | Design targeted probes for visual systems and rendering controls |
| [Visual regression](skills/visual-regression/SKILL.md) | Conduct controlled visual comparisons and perceptual QA |

### Workflow

| Workflow | Use it for |
|---|---|
| [Multi-agent campaign](workflows/multi-agent-campaign/WORKFLOW.md) | Coordinate multiple assignments through persistent states, review, integration and handoff |

### Agent profiles

| Profile | Responsibility |
|---|---|
| [Lead engineer](profiles/lead-engineer/PROFILE.md) | Overall delivery, delegation, integration and final accountability |
| [Independent reviewer](profiles/independent-reviewer/PROFILE.md) | Adversarial review of requirements, diffs, evidence and risks |
| [Visual quality engineer](profiles/visual-quality-engineer/PROFILE.md) | Perceptual quality and reproducible visual regression |
| [Graphics engineer](profiles/graphics-engineer/PROFILE.md) | Rendering architecture, materials, compositing and graphics implementation |
| [Creative director](profiles/creative-director/PROFILE.md) | Translate visual intent into coherent acceptance criteria |
| [Performance QA](profiles/performance-qa/PROFILE.md) | Performance budgets, profiling and stability verification |
| [Creative lighting director](profiles/creative-lighting-director/PROFILE.md) | Optional specialist for audio-reactive lighting systems |

### Standards

| Standard | Purpose |
|---|---|
| [Documentation governance](standards/documentation/STANDARD.md) | Document authority, taxonomy, history and update discipline |
| [Evidence and verification](standards/evidence-and-verification/STANDARD.md) | Prevent claims stronger than their supporting evidence |

### Templates

| Template | Use it for |
|---|---|
| [Progress report](templates/progress-report/PROGRESS_REPORT.md) | Owner-facing project/milestone status |
| [Delegation assignment](templates/assignments/DELEGATION_ASSIGNMENT.md) | Scope a bounded specialist task |
| [Recovery handoff](templates/assignments/RECOVERY_HANDOFF.md) | Resume interrupted work from a verified checkpoint |
| [Decision register](templates/governance/DECISION_REGISTER.md) | Record decisions, alternatives and consequences |
| [Blocker register](templates/governance/BLOCKER_REGISTER.md) | Track blockers, owners and resolution conditions |
| [Test evidence report](templates/verification/TEST_EVIDENCE_REPORT.md) | Record test method, exact results and limitations |

---

## Documentation guide

The [documentation index](docs/README.md) is the map for material that explains the library itself.

| Location | What belongs there |
|---|---|
| `docs/architecture/` | How Agent Foundry is structured and how resource types relate |
| `docs/audit/` | What was discovered in source repositories, provenance, extraction choices and gaps |
| `docs/standards/` | Rules for writing and validating resources |
| `docs/EXTRACTION_REGISTER.md` | Source-to-resource tracking and extraction progress |

Useful audit documents:

- [Reusable Resource Inventory](docs/audit/REUSABLE_RESOURCE_INVENTORY.md) — source families from Dhan and Lively, their reuse value and limitations.
- [Source Coverage](docs/audit/SOURCE_COVERAGE.md) — repository scope and inspected source families.
- [Extraction Decisions](docs/audit/EXTRACTION_DECISIONS.md) — why resources are generalised, adapted, deduplicated or excluded.
- [Command Catalog](docs/audit/COMMAND_CATALOG.md) — confirmed reusable command behaviours and future command candidates.

---

## How to use Agent Foundry in another project

There is **no automated installer yet**. For now, consume resources deliberately rather than copying the entire repository into every project.

1. Read the target project's existing instructions and identify its authoritative project context.
2. Incorporate relevant parts of [GLOBAL_INSTRUCTIONS.md](core/GLOBAL_INSTRUCTIONS.md) into the target project's agent instructions. Do not blindly replace its existing instructions.
3. Select one or more profiles that match the responsibilities the host can actually support.
4. Load only the skills and standards relevant to the task.
5. Use a workflow when work spans several phases, agents or handoffs.
6. Copy a template only when producing the corresponding deliverable.
7. Translate command contracts into the target tool's native mechanism only after checking that tool's supported format.
8. Record the selected resources and their versions in the consuming project.

**Do not copy this repository's root `AGENTS.md` as the consumer's global instructions.** That file governs agents working on Agent Foundry itself. The portable baseline is in `core/GLOBAL_INSTRUCTIONS.md`.

### Example selection

For a project using a lead coding agent and a reviewer:

- Core: `core/GLOBAL_INSTRUCTIONS.md`
- Profiles: `lead-engineer`, `independent-reviewer`
- Skills: `atomic-implementation`, `multi-agent-delegation`, `progress-reporting`
- Standards: `evidence-and-verification`, `documentation`
- Workflow: `multi-agent-campaign` when work spans multiple assignments
- Templates: assignment, recovery handoff and progress report

For a visual application, add `graphics-engineer`, `visual-quality-engineer`, `visual-regression` and `visual-probe-engineering`.

---

## Resource status and maturity

Every resource has a status. Do not treat presence in the repository as proof of quality.

| Status | Meaning |
|---|---|
| `DISCOVERED` | A possible source asset or reusable pattern has been located |
| `INSPECTED` | Relevant source content has been read |
| `CANDIDATE` | Reuse value has been identified; not yet generalised |
| `DRAFT` / `EXTRACTED_DRAFT` | A first portable version exists |
| `VALIDATED` | Required structural checks and scenario tests have passed |
| `ADAPTED` | A resource has been mapped to a named tool or environment |
| `EXCLUDED` | It is intentionally not included, with a reason |
| `BLOCKED` / `DEFERRED` | Work cannot or should not proceed yet |

**Current maturity:** all 28 registry entries are drafts. There is no resource validator, automated scenario suite, installer, CLI, or validated tool adapter yet.

The resource lifecycle and quality requirements are defined in the [Resource Model](docs/architecture/RESOURCE_MODEL.md) and [Resource Authoring Standard](docs/standards/RESOURCE_AUTHORING_STANDARD.md).

---

## Source repositories and provenance

The first source repositories are:

- [Dhan AI Trader](https://github.com/LemonizDev/dhan-chatgpt-connector/tree/foundation/final-trader-architecture), branch `foundation/final-trader-architecture`
- [Lively Wallpaper](https://github.com/LemonizDev/futuristic-lively-wallpaper/tree/main), branch `main`

Dhan contributes most of the multi-agent, governance, security and regression-testing material. Lively contributes specialist creative/graphics roles and a particularly useful visual-probe and perceptual-QA practice.

Extraction is selective. Project-specific trading rules, Lively design decisions, current project state, credentials, screenshots and tool-specific configuration do not belong in the portable core. See the [Extraction Decisions](docs/audit/EXTRACTION_DECISIONS.md).

---

## Contributing or adding a resource

Before adding a resource:

1. Check whether the capability already exists under another name.
2. Read the source material and record its path, repository and ref.
3. Decide whether it is universal, adaptable, tool-specific, domain-specific or project-specific.
4. Create the resource using the correct category structure and [authoring standard](docs/standards/RESOURCE_AUTHORING_STANDARD.md).
5. Add dependencies and provenance.
6. Add the resource to [`registry/resources.yaml`](registry/resources.yaml).
7. Add or update the relevant catalog/index and extraction register.
8. Validate metadata, links, dependencies, a successful scenario and a failure/edge scenario.
9. Keep the status as DRAFT until validation evidence exists.

Do not duplicate long procedures across commands and skills. Commands should invoke skills; workflows should coordinate them; standards should define reusable quality rules.

## Project maintenance

- [AGENTS.md](AGENTS.md) — operating contract for agents maintaining this repository.
- [CHANGELOG.md](CHANGELOG.md) — changes to the Foundry itself.
- [Resource registry](registry/resources.yaml) — catalog of reusable resources.

No source project is modified during extraction. Commits, publication, platform-specific installation and other consequential actions must follow the applicable owner instructions.
