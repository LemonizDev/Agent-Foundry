<div align="center">

<img src="assets/agent-foundry-banner.svg" alt="Agent Foundry: reusable context and workflows for AI coding agents" width="100%" />

# Agent Foundry

### A project-aware resource system for the AI coding agent you already use.

**Agent Foundry helps coding agents understand a project, follow repeatable engineering practices, preserve useful context and coordinate work without replacing the host app or model.**

[![CI](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.6.0-6478ff.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2ea44f.svg)](LICENSE)

</div>

## Navigation

**Project overview** · [How it works](#how-it-works) · [Capabilities](#what-you-get) · [Feature menu](#feature-menu)

**Getting started** · [Installation](#project-aware-installation) · [Coding-agent apps](#coding-agent-apps) · [Usage](#usage-and-examples)

**Reference** · [Configuration](#configuration-and-management) · [Documentation](#documentation-and-support) · [Contributions](#community-contributions) · [Security](#security-and-boundaries) · [License](#license)

## About Agent Foundry

Agent Foundry is a **reusable context and workflow library for AI coding agents**. It provides project instructions, engineering standards, task skills, user-facing command contracts, workflows, specialist profiles, templates and host-integration guidance.

It is designed for people who already use coding-agent apps such as Codex, Claude Code, OpenCode, Kilo, Cline, Cursor, Windsurf or GitHub Copilot. Keep the agent and model you prefer; Foundry supplies reusable project practices that the agent can inspect and apply when relevant.

Foundry is not another coding agent, an IDE, a model provider, a daemon, a CLI installer or a security sandbox. The consuming host remains responsible for model access, tools, filesystem/network permissions, command execution and any subagent capability.

## The problem it solves

AI coding agents often start each task with incomplete or scattered context. Project rules may be duplicated across files, architecture knowledge can be difficult to locate, and useful procedures get buried in old conversations. Large instruction files create prompt overhead, while copying every available skill into every project creates clutter.

Agent Foundry addresses this by making reusable practices discoverable and project-aware:

- **Inspect before installing:** preserve instructions, tools and workflows that already work.
- **One source of truth:** link to canonical project context instead of duplicating it.
- **Progressive disclosure:** keep the core small and bring in specialist procedures only when relevant and supported by the host.
- **Repeatable execution:** use clear task contracts, acceptance criteria, checkpoints and verification.
- **Durable continuity:** preserve decisions and useful lessons without dumping transcripts into the repository.

## How it works

Foundry is a collection of files, not a separate runtime. Your coding-agent host reads the project context, consults selected Foundry resources and performs work using its own capabilities.

```mermaid
flowchart TD
    U[Project owner] --> H[Existing coding-agent host]
    H --> P[Inspect project and host context]
    P --> A[Assess existing rules and capabilities]
    A --> R[Select relevant Foundry resources]
    R --> C[Project-local context and resource pointers]
    C --> H
    H --> W[Perform requested project work]
    W --> V[Verify against evidence and acceptance criteria]
    V --> S[Preserve durable project knowledge]
    S --> H
    H -. Host supplies tools, models and permissions .-> X[Runtime capabilities]
```

A Foundry installation is a **small, approved selection**, not a wholesale copy of the registry. Existing project instructions remain authoritative unless the owner explicitly approves an additive change.

## What you get

| Capability | Practical value |
|---|---|
| Project-aware onboarding | Fit the resource set to the project you actually have. |
| Skills and workflows | Reusable methods for planning, implementation, debugging, testing and review. |
| Session continuity | Keep verified decisions, blockers and next actions discoverable. |
| Delegation contracts | Make multi-agent work more bounded and accountable where the host supports it. |
| Documentation practices | Reduce stale context and competing sources of truth. |
| Multi-host adaptation | Share project-local resources across selected coding-agent apps with thin host-specific pointers. |
| Owner-controlled lifecycle | Preview changes, preserve local edits and maintain an ownership manifest. |

## Feature menu

Navigate from the outcome you want, through its resource family, to an individual resource. The map shows the hierarchy; expand a category for practical details and a direct link to its canonical source.

### Feature map

```mermaid
flowchart TD
    AF[Agent Foundry] --> A[Discover and onboard]
    AF --> B[Plan, build and debug]
    AF --> C[Test, review and protect]
    AF --> D[Maintain context and sessions]
    AF --> E[Delegate and track work]
    AF --> F[Visual and performance engineering]
    AF --> G[Models and Foundry management]
    AF --> H[Contribute resources]
    A --> A1[Project discovery / setup]
    B --> B1[Plan / implement / debug]
    C --> C1[Standards / tests / review]
    D --> D1[Context / docs / session curation]
    E --> E1[Delegation / reporting / records]
    F --> F1[Visual QA / graphics / performance]
    G --> G1[Model roster / settings / management]
    H --> H1[Contribution discovery]
```

### Example drill-down: Progress Report

```mermaid
flowchart TD
    F[Feature menu] --> C[Delegate and track work]
    C --> G[Progress and delivery records]
    G --> T[Commands]
    T --> P[Progress Report]
    P --> W[What it does]
    P --> H[When to use it]
    P --> U[How to invoke it]
    P --> X[Example]
    P --> O[Expected result]
    P --> L[Full command contract]
```

<details>
<summary><strong>01 · Discover and onboard a project</strong></summary>

Understand a codebase, assess its current practices and integrate Foundry without replacing existing project rules.

<details>
<summary>Project discovery</summary>

<details>
<summary><strong>Commands (2)</strong></summary>

<details>
<summary>Audit</summary>

Runs a read-only, evidence-based repository audit.

<details>
<summary>What it does</summary>

Runs a read-only, evidence-based repository audit.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: runs a read-only, evidence-based repository audit.

</details>

<details>
<summary>How to use it</summary>

`/audit [scope]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/audit scope: authentication`<br>Map the auth flow, tests and risks. Do not change files.

</details>

<details>
<summary>Expected result</summary>

A scoped project map, prioritised findings and evidence-backed next action.

</details>

<details>
<summary>Full command contract</summary>

[Open Audit command contract](commands/audit.md)

</details>

</details>

<details>
<summary>Project Health</summary>

Assesses project health across architecture, quality, security, operations and continuity.

<details>
<summary>What it does</summary>

Assesses project health across architecture, quality, security, operations and continuity.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: assesses project health across architecture, quality, security, operations and continuity.

</details>

<details>
<summary>How to use it</summary>

`/project-health [project or subsystem]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

A health assessment across architecture, quality, security, operations and continuity.

</details>

<details>
<summary>Full command contract</summary>

[Open Project Health command contract](commands/project-health.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Host Roster Onboarding** · Discovers the user's active and additional coding-agent hosts, then plans safe multi-host project integration with per-host verification. [Skill](skills/host-roster-onboarding/SKILL.md)
- **Repository Audit** · Maps repository structure, runtime flows, authoritative context, quality controls and evidence-backed gaps. [Skill](skills/repository-audit/SKILL.md)

</details>

<details>
<summary><strong>Workflows (1)</strong></summary>

- **Existing Project Integration** · Assesses an established repository and adds only relevant Foundry resources without replacing its architecture. [Workflow](docs/architecture/EXISTING_PROJECT_INTEGRATION.md)

</details>

<details>
<summary><strong>Core instructions (1)</strong></summary>

- **Global Instructions** · Compact, project-agnostic operating instructions that connect installed standards, task resources and Foundry management triggers into one agent entrypoint. [Reference](core/GLOBAL_INSTRUCTIONS.md)

</details>

<details>
<summary><strong>Documentation (1)</strong></summary>

- **Context Architecture** · Documents the context-first architecture: context-file hierarchy, progressive disclosure, conversational management and current limitations. [Reference](docs/architecture/CONTEXT_ARCHITECTURE.md)

</details>

</details>

<details>
<summary>Getting started and guidance</summary>

<details>
<summary><strong>Documentation (1)</strong></summary>

- **User Guide** · Explains Agent Foundry setup, chat-native management, commands, resource types, presets, delegation and maintenance. [Reference](docs/USER_GUIDE.md)

</details>

</details>

</details>

<details>
<summary><strong>02 · Plan, build and debug</strong></summary>

Turn an intended change into bounded work, implement it safely and investigate failures.

<details>
<summary>Plan and design</summary>

<details>
<summary><strong>Commands (1)</strong></summary>

<details>
<summary>Next Task</summary>

Recommends the highest-value next engineering action from current evidence and dependencies.

<details>
<summary>What it does</summary>

Recommends the highest-value next engineering action from current evidence and dependencies.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: recommends the highest-value next engineering action from current evidence and dependencies.

</details>

<details>
<summary>How to use it</summary>

`/next-task [milestone or workstream]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

One recommended next action with rationale and acceptance criteria.

</details>

<details>
<summary>Full command contract</summary>

[Open Next Task command contract](commands/next-task.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Implementation Planning** · Turns desired outcomes into bounded tasks with dependencies, acceptance criteria and verification. [Skill](skills/implementation-planning/SKILL.md)
- **Architecture Design** · Designs maintainable system boundaries and decisions grounded in requirements and tradeoffs. [Skill](skills/architecture-design/SKILL.md)

</details>

<details>
<summary><strong>Standards (2)</strong></summary>

- **Engineering Principles** · Universal engineering baseline for understanding before changing, preserving project intent, incremental implementation and evidence-based completion. [Standard](standards/engineering-principles.md)
- **Decision Making** · Provides an evidence-based procedure for comparing options, recording tradeoffs and escalating owner decisions. [Standard](standards/decision-making.md)

</details>

</details>

<details>
<summary>Build and explain</summary>

<details>
<summary><strong>Commands (2)</strong></summary>

<details>
<summary>Implement</summary>

Executes an approved implementation plan with incremental verification.

<details>
<summary>What it does</summary>

Executes an approved implementation plan with incremental verification.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: executes an approved implementation plan with incremental verification.

</details>

<details>
<summary>How to use it</summary>

`/implement [feature, bug or approved plan]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/implement the approved retry policy`<br>Follow the agreed scope and verify each acceptance criterion.

</details>

<details>
<summary>Expected result</summary>

Delivered behaviour, files changed, verification evidence, limitations and remaining risks.

</details>

<details>
<summary>Full command contract</summary>

[Open Implement command contract](commands/implement.md)

</details>

</details>

<details>
<summary>Teach Implementation</summary>

Explains a completed implementation in a structured, project-relevant way.

<details>
<summary>What it does</summary>

Explains a completed implementation in a structured, project-relevant way.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: explains a completed implementation in a structured, project-relevant way.

</details>

<details>
<summary>How to use it</summary>

`/teach-implementation [change-or-feature]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

An explanation of changed files, runtime behaviour, trade-offs and verification.

</details>

<details>
<summary>Full command contract</summary>

[Open Teach Implementation command contract](commands/teach-implementation.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Atomic Implementation** · Guides small, bounded implementation steps with clear acceptance criteria and verification. [Skill](skills/atomic-implementation/SKILL.md)
- **Implementation Explanation** · Explains code changes, their runtime behaviour, tradeoffs and verification evidence. [Skill](skills/implementation-explanation/SKILL.md)

</details>

</details>

<details>
<summary>Debug</summary>

<details>
<summary><strong>Commands (1)</strong></summary>

<details>
<summary>Debug</summary>

Investigates a reproducible failure and isolates its root cause.

<details>
<summary>What it does</summary>

Investigates a reproducible failure and isolates its root cause.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: investigates a reproducible failure and isolates its root cause.

</details>

<details>
<summary>How to use it</summary>

`/debug [symptom, error or failing behaviour]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

A reproducible cause, supporting evidence and smallest safe fix or next experiment.

</details>

<details>
<summary>Full command contract</summary>

[Open Debug command contract](commands/debug.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (1)</strong></summary>

- **Debugging** · Diagnoses failures through reproducible experiments and root-cause analysis. [Skill](skills/debugging/SKILL.md)

</details>

</details>

</details>

<details>
<summary><strong>03 · Test, review and protect</strong></summary>

Verify outcomes against criteria, review independently and protect project data and execution boundaries.

<details>
<summary>Standards and procedures</summary>

<details>
<summary><strong>Skills (4)</strong></summary>

- **Testing And Verification** · Selects risk-based tests and reports exactly what was and was not verified. [Skill](skills/testing-and-verification/SKILL.md)
- **Code Review** · Performs independent, findings-first review of code changes, risks and test quality. [Skill](skills/code-review/SKILL.md)
- **Privacy Safe Evidence** · Collects and reports useful evidence while minimising secrets, personal data and sensitive project details. [Skill](skills/privacy-safe-evidence/SKILL.md)
- **Agent Execution Security** · Assesses permissions, isolation, secrets exposure and risks from autonomous agent execution. [Skill](skills/agent-execution-security/SKILL.md)

</details>

<details>
<summary><strong>Standards (2)</strong></summary>

- **Security Boundaries** · Sets least-privilege, secret-handling, untrusted-input and approval boundaries for AI-assisted engineering. [Standard](standards/security-boundaries.md)
- **Evidence And Verification** · Sets rules for evidence quality, verification claims and explicit unverified or blocked states. [Standard](standards/evidence-and-verification.md)

</details>

</details>

<details>
<summary>Review and verification</summary>

<details>
<summary><strong>Commands (2)</strong></summary>

<details>
<summary>Review</summary>

Runs an independent, read-only engineering review.

<details>
<summary>What it does</summary>

Runs an independent, read-only engineering review.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: runs an independent, read-only engineering review.

</details>

<details>
<summary>How to use it</summary>

`/review [diff, commit, feature or scope]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/review current diff`<br>Return findings first, with evidence and severity.

</details>

<details>
<summary>Expected result</summary>

Findings first, reviewed/unreviewed areas, test gaps and overall risk.

</details>

<details>
<summary>Full command contract</summary>

[Open Review command contract](commands/review.md)

</details>

</details>

<details>
<summary>Verify</summary>

Checks acceptance criteria against explicit test and runtime evidence.

<details>
<summary>What it does</summary>

Checks acceptance criteria against explicit test and runtime evidence.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: checks acceptance criteria against explicit test and runtime evidence.

</details>

<details>
<summary>How to use it</summary>

`/verify [change, milestone or acceptance criteria]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

A criterion-by-criterion PASS / FAIL / BLOCKED / NOT RUN result with evidence.

</details>

<details>
<summary>Full command contract</summary>

[Open Verify command contract](commands/verify.md)

</details>

</details>

</details>

<details>
<summary><strong>Templates (1)</strong></summary>

- **Test Evidence Report** · Records verification commands, environments, outcomes, coverage and unresolved checks. [Template](templates/test-evidence-report.md)

</details>

</details>

<details>
<summary>Specialist review</summary>

<details>
<summary><strong>Specialist profiles (1)</strong></summary>

- **Independent Reviewer** · Defines a sceptical, findings-first reviewer role that challenges implementation and evidence. [Profile](profiles/independent-reviewer.md)

</details>

</details>

</details>

<details>
<summary><strong>04 · Maintain context and finish sessions</strong></summary>

Keep project knowledge coherent and decide what is worth saving from a productive conversation.

<details>
<summary>Context and documentation standards</summary>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Project State Management** · Maintains canonical project context, current state, blockers and next actions without duplicating sources of truth. [Skill](skills/project-state-management/SKILL.md)
- **Documentation Maintenance** · Keeps project documentation accurate, navigable and free of competing sources of truth. [Skill](skills/documentation-maintenance/SKILL.md)

</details>

<details>
<summary><strong>Standards (3)</strong></summary>

- **Agent Communication** · Defines clear owner communication, progress reporting, uncertainty labels and approval gates. [Standard](standards/agent-communication.md)
- **Context Management** · Defines canonical project context, progressive disclosure and durable session learning without transcript dumps. [Standard](standards/context-management.md)
- **Documentation Governance** · Defines documentation ownership, source-of-truth hierarchy, lifecycle and navigation rules. [Standard](standards/documentation-governance.md)

</details>

</details>

<details>
<summary>README design and navigation</summary>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Readme Maker** · Creates and maintains concise, navigable GitHub READMEs with nested feature trees, accessible visual hierarchy and validated resource links. [Skill](skills/readme-maker/SKILL.md)
- **Feature Menu Architect** · Inspects a project and plans a user-goal-led feature menu with classified resource types, Mermaid hierarchy diagrams and resource-level usage panels. [Skill](skills/feature-menu-architect/SKILL.md)

</details>

<details>
<summary><strong>Templates (1)</strong></summary>

- **Readme Template** · Provides an adaptable project-first README structure with manual navigation, overview, architecture, installation, usage, documentation and contribution sections. [Template](templates/README_TEMPLATE.md)

</details>

</details>

<details>
<summary>Session learning and recovery</summary>

<details>
<summary><strong>Commands (3)</strong></summary>

<details>
<summary>Close Session</summary>

Preserves durable project context at session end without creating transcript dumps or new reusable resource types.

<details>
<summary>What it does</summary>

Preserves durable project context at session end without creating transcript dumps or new reusable resource types.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: preserves durable project context at session end without creating transcript dumps or new reusable resource types.

</details>

<details>
<summary>How to use it</summary>

`/close, /close session, /close chat`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/close`<br>Capture durable project decisions and verified lessons without creating a new resource.

</details>

<details>
<summary>Expected result</summary>

Durable context captured, files changed and unresolved questions.

</details>

<details>
<summary>When to choose /close</summary>

Use `/close` for durable project context such as decisions, stable preferences and verified lessons. It should not create a new reusable resource.

</details>

<details>
<summary>Full command contract</summary>

[Open Close Session command contract](commands/close-session.md)

</details>

</details>

<details>
<summary>Done</summary>

Ends a productive session by classifying and saving worthwhile reusable project resources, and rejects the operation without writing when nothing qualifies.

<details>
<summary>What it does</summary>

Ends a productive session by classifying and saving worthwhile reusable project resources, and rejects the operation without writing when nothing qualifies.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: ends a productive session by classifying and saving worthwhile reusable project resources, and rejects the operation without writing when nothing qualifies.

</details>

<details>
<summary>How to use it</summary>

`/done`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/done`<br>Classify reusable material from this session. Save only items that meet the quality bar; reject an empty session.

</details>

<details>
<summary>Expected result</summary>

Accepted resource type(s) and destinations, or an explicit rejection with no files written.

</details>

<details>
<summary>Acceptance and rejection</summary>

`/done` is selective. Save a complete reusable project artefact in the correct resource type; reject the operation with no writes if nothing qualifies. `/close` remains the context-continuity command.

</details>

<details>
<summary>Full command contract</summary>

[Open Done command contract](commands/done.md)

</details>

</details>

<details>
<summary>Resume</summary>

Recovers interrupted work from durable checkpoints and verified repository state.

<details>
<summary>What it does</summary>

Recovers interrupted work from durable checkpoints and verified repository state.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: recovers interrupted work from durable checkpoints and verified repository state.

</details>

<details>
<summary>How to use it</summary>

`/resume [task or milestone]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Verified current state, recovery point, unresolved work and next action.

</details>

<details>
<summary>Full command contract</summary>

[Open Resume command contract](commands/resume.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (3)</strong></summary>

- **Session Learning** · Extracts durable, actionable project knowledge from a session and updates its proper context source. [Skill](skills/session-learning/SKILL.md)
- **Session Resource Curation** · Applies a strict quality bar to reusable artefacts from a chat session, classifies them by resource type and stores qualified material in canonical project locations. [Skill](skills/session-resource-curation/SKILL.md)
- **Session Recovery** · Reconciles interrupted work against repository state and resumes from verified checkpoints. [Skill](skills/session-recovery/SKILL.md)

</details>

<details>
<summary><strong>Workflows (1)</strong></summary>

- **Session Close** · Coordinates the review, consolidation and verification of durable session learnings. [Workflow](workflows/session-close.md)

</details>

<details>
<summary><strong>Templates (1)</strong></summary>

- **Decision Register** · Records architectural and product decisions, alternatives, rationale and consequences. [Template](templates/decision-register.md)

</details>

</details>

</details>

<details>
<summary><strong>05 · Delegate and track work</strong></summary>

Coordinate work across agents or people, preserve checkpoints and report progress from evidence.

<details>
<summary>Delegation and orchestration</summary>

<details>
<summary><strong>Commands (2)</strong></summary>

<details>
<summary>Delegate</summary>

Creates a bounded task assignment and recommends a suitable model from the project roster.

<details>
<summary>What it does</summary>

Creates a bounded task assignment and recommends a suitable model from the project roster.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: creates a bounded task assignment and recommends a suitable model from the project roster.

</details>

<details>
<summary>How to use it</summary>

`/delegate [task or workstream]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

An assignment, worker/model rationale, ownership and dispatch status.

</details>

<details>
<summary>Full command contract</summary>

[Open Delegate command contract](commands/delegate.md)

</details>

</details>

<details>
<summary>Campaign Status</summary>

Reconciles multi-agent campaign status against assignments, diffs, checkpoints and verification evidence.

<details>
<summary>What it does</summary>

Reconciles multi-agent campaign status against assignments, diffs, checkpoints and verification evidence.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: reconciles multi-agent campaign status against assignments, diffs, checkpoints and verification evidence.

</details>

<details>
<summary>How to use it</summary>

`campaign-status / campaign status`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Campaign status reconciled against assignments, checkpoints and verification evidence.

</details>

<details>
<summary>Full command contract</summary>

[Open Campaign Status command contract](commands/campaign-status.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Multi Agent Delegation** · Defines accountable task decomposition, worker selection, assignment contracts, checkpoints, recovery and independent review. [Skill](skills/multi-agent-delegation/SKILL.md)
- **Plan Reconciliation** · Reconciles roadmap, implementation plans and actual repository evidence to identify the next safe task. [Skill](skills/plan-reconciliation/SKILL.md)

</details>

<details>
<summary><strong>Workflows (1)</strong></summary>

- **Multi Agent Campaign** · Coordinates a durable multi-agent campaign with persistent assignments, checkpoints, recovery, independent review and integrated verification. [Workflow](workflows/multi-agent-campaign.md)

</details>

<details>
<summary><strong>Specialist profiles (1)</strong></summary>

- **Lead Engineer** · Defines the accountable lead/orchestrator role for architecture, task decomposition, delegation, integration and delivery. [Profile](profiles/lead-engineer.md)

</details>

<details>
<summary><strong>Templates (3)</strong></summary>

- **Campaign State** · Defines a durable campaign record for workstreams, assignment states, owner decisions, blockers and verification evidence. [Template](templates/campaign-state.md)
- **Delegation Assignment** · Defines the objective, scope, owner, model rationale, outputs and acceptance criteria for delegated work. [Template](templates/delegation-assignment.md)
- **Recovery Handoff** · Preserves verified checkpoints and context when a delegated worker or session is interrupted. [Template](templates/recovery-handoff.md)

</details>

</details>

<details>
<summary>Progress and delivery records</summary>

<details>
<summary><strong>Commands (1)</strong></summary>

<details>
<summary>Progress Report</summary>

Invokes evidence-backed progress reporting for a project, milestone or workstream.

<details>
<summary>What it does</summary>

Invokes evidence-backed progress reporting for a project, milestone or workstream.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: invokes evidence-backed progress reporting for a project, milestone or workstream.

</details>

<details>
<summary>How to use it</summary>

`/progress-report [project|milestone|workstream]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`/progress-report milestone: M7`<br>Report completed, in-progress and blocked outcomes with evidence.

</details>

<details>
<summary>Expected result</summary>

Status, completed outcomes with evidence, in-progress work, blockers and next action.

</details>

<details>
<summary>Full command contract</summary>

[Open Progress Report command contract](commands/progress-report.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (1)</strong></summary>

- **Progress Reporting** · Produces progress reports grounded in implementation, test and review evidence rather than estimates or chat memory. [Skill](skills/progress-reporting/SKILL.md)

</details>

<details>
<summary><strong>Templates (2)</strong></summary>

- **Progress Report Template** · Provides a consistent structure for evidence-based project progress reports. [Template](templates/progress-report-template.md)
- **Blocker Register** · Tracks blockers, ownership, impact, dependencies and resolution conditions. [Template](templates/blocker-register.md)

</details>

</details>

<details>
<summary>Model and host portability</summary>

<details>
<summary><strong>Standards (1)</strong></summary>

- **Model Delegation Architecture** · Defines task-aware model classification, roster constraints, scoring and independent-review gates. [Standard](docs/architecture/MODEL_DELEGATION.md)

</details>

<details>
<summary><strong>Documentation (1)</strong></summary>

- **Orchestration Portability** · Maps portable orchestration contracts to host-specific capabilities and limitations across common coding agents. [Reference](docs/architecture/ORCHESTRATION_PORTABILITY.md)

</details>

</details>

</details>

<details>
<summary><strong>06 · Visual and performance engineering</strong></summary>

Use repeatable visual, graphics, lighting and performance practices in interactive projects.

<details>
<summary>Visual quality</summary>

<details>
<summary><strong>Skills (2)</strong></summary>

- **Visual Regression** · Compares rendered output across controlled states and identifies meaningful visual regressions. [Skill](skills/visual-regression/SKILL.md)
- **Visual Probe Engineering** · Designs repeatable visual probes, pinned states and diagnostics for graphics-heavy applications. [Skill](skills/visual-probe-engineering/SKILL.md)

</details>

<details>
<summary><strong>Specialist profiles (1)</strong></summary>

- **Visual Quality Engineer** · Reviews visual output, rendering behaviour, consistency and visual acceptance criteria. [Profile](profiles/visual-quality-engineer.md)

</details>

</details>

<details>
<summary>Graphics and creative direction</summary>

<details>
<summary><strong>Specialist profiles (3)</strong></summary>

- **Graphics Engineer** · Defines a specialist role for graphics pipelines, shaders, rendering quality and performance. [Profile](profiles/graphics-engineer.md)
- **Creative Director** · Translates visual direction into coherent design intent, constraints and acceptance criteria. [Profile](profiles/creative-director.md)
- **Creative Lighting Director** · Defines specialist direction for audio-reactive lighting, lasers and visual choreography. [Profile](profiles/creative-lighting-director.md)

</details>

</details>

<details>
<summary>Performance assurance</summary>

<details>
<summary><strong>Specialist profiles (1)</strong></summary>

- **Performance Qa** · Defines repeatable performance, stability and resource-usage verification. [Profile](profiles/performance-qa.md)

</details>

</details>

</details>

<details>
<summary><strong>07 · Models, settings and Foundry management</strong></summary>

Maintain the owner-defined model roster and manage project-local Foundry configuration.

<details>
<summary>Model selection</summary>

<details>
<summary><strong>Commands (3)</strong></summary>

<details>
<summary>Edit Model Roster</summary>

Edits the owner-defined model roster used by task-aware delegation.

<details>
<summary>What it does</summary>

Edits the owner-defined model roster used by task-aware delegation.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: edits the owner-defined model roster used by task-aware delegation.

</details>

<details>
<summary>How to use it</summary>

`/models edit`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Validated owner-approved roster changes.

</details>

<details>
<summary>Full command contract</summary>

[Open Edit Model Roster command contract](commands/edit-model-roster.md)

</details>

</details>

<details>
<summary>Explain Model Selection</summary>

Explains task classification, eligibility filters and model-selection rationale.

<details>
<summary>What it does</summary>

Explains task classification, eligibility filters and model-selection rationale.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: explains task classification, eligibility filters and model-selection rationale.

</details>

<details>
<summary>How to use it</summary>

`/models explain [task]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Eligibility and model-selection rationale, including constraints.

</details>

<details>
<summary>Full command contract</summary>

[Open Explain Model Selection command contract](commands/explain-model-selection.md)

</details>

</details>

<details>
<summary>Test Model</summary>

Runs bounded, owner-approved capability checks on a configured model.

<details>
<summary>What it does</summary>

Runs bounded, owner-approved capability checks on a configured model.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: runs bounded, owner-approved capability checks on a configured model.

</details>

<details>
<summary>How to use it</summary>

`/models test [alias]`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Bounded evaluation evidence, cost/execution limits and caveats.

</details>

<details>
<summary>Full command contract</summary>

[Open Test Model command contract](commands/test-model.md)

</details>

</details>

</details>

<details>
<summary><strong>Templates (1)</strong></summary>

- **Model Roster Template** · Provides the project-owned model roster schema and capability fields. [Template](templates/model-roster.yaml)

</details>

</details>

<details>
<summary>Settings and management</summary>

<details>
<summary><strong>Commands (1)</strong></summary>

<details>
<summary>Foundry Settings</summary>

Inspects and edits project-local Agent Foundry configuration conversationally, backed by the authoritative settings specification.

<details>
<summary>What it does</summary>

Inspects and edits project-local Agent Foundry configuration conversationally, backed by the authoritative settings specification.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: inspects and edits project-local Agent Foundry configuration conversationally, backed by the authoritative settings specification.

</details>

<details>
<summary>How to use it</summary>

`/settings`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Expected result</summary>

Current settings, validated proposed changes and a concise diff.

</details>

<details>
<summary>Full command contract</summary>

[Open Foundry Settings command contract](commands/settings.md)

</details>

</details>

</details>

<details>
<summary><strong>Templates (1)</strong></summary>

- **Foundry Settings Template** · Provides project-level policies for delegation, model selection and session behaviour. [Template](templates/foundry-settings.yaml)

</details>

<details>
<summary><strong>Management references (2)</strong></summary>

- **Foundry Management** · Conversational management instructions: discovery, contribution, settings, installation, update, removal, diagnostics and the Foundry safety contract. [Reference](foundry/MANAGEMENT.md)
- **Foundry Response Templates** · Reusable composition guidance for Foundry management chat responses: overview, settings, previews, diagnostics, contribution discovery and change summary. [Reference](foundry/RESPONSE_TEMPLATES.md)

</details>

<details>
<summary><strong>Settings references (1)</strong></summary>

- **Foundry Settings Spec** · The single authoritative definition of supported Agent Foundry settings, their values, defaults, scope and safe modification guidance. [Reference](foundry/SETTINGS_SPEC.md)

</details>

</details>

</details>

<details>
<summary><strong>08 · Contribute reusable resources</strong></summary>

Discover reusable practices in the current project and prepare selected material for contribution.

<details>
<summary>Community-contributed resources</summary>

**No community-contributed resources have been published yet.**

Have a reusable skill, command, workflow or template? Tell your coding agent: **"I want to contribute."** It will inspect accessible project context, show candidates and help prepare only what you select. Publication still needs separate approval.

[Contribution guide](CONTRIBUTING.md)

</details>

<details>
<summary>Contribution discovery</summary>

<details>
<summary><strong>Commands (1)</strong></summary>

<details>
<summary>Contribute</summary>

Invokes explicit, approval-gated discovery of reusable user-created agent resources for Agent Foundry.

<details>
<summary>What it does</summary>

Invokes explicit, approval-gated discovery of reusable user-created agent resources for Agent Foundry.

</details>

<details>
<summary>When to use it</summary>

Use this when you need to: invokes explicit, approval-gated discovery of reusable user-created agent resources for Agent Foundry.

</details>

<details>
<summary>How to use it</summary>

`Say: contribute / I'd like to contribute`

Native slash-command support depends on the host and version.

</details>

<details>
<summary>Example usage</summary>

`contribute`<br>Find reusable project practices and show a shortlist. Do not publish without approval.

</details>

<details>
<summary>Expected result</summary>

A numbered candidate shortlist; drafts only for selected candidates.

</details>

<details>
<summary>Approval boundary</summary>

Discovery is not publication approval. The owner chooses what gets drafted and separately approves any external publication.

</details>

<details>
<summary>Full command contract</summary>

[Open Contribute command contract](commands/contribute.md)

</details>

</details>

</details>

<details>
<summary><strong>Skills (1)</strong></summary>

- **Contribution Discovery** · Scans accessible user-created instructions, skills, workflows, commands, settings and templates for safe, reusable contribution candidates. [Skill](skills/contribution-discovery/SKILL.md)

</details>

</details>

</details>

## Project-aware installation

Foundry first determines how mature the project is and how healthy its existing context is. These are assessment paths, not rigid presets.

| Project state | Recommended approach |
|---|---|
| **New / empty** | Identify the intended product and stack, then propose a compact baseline and only essential project context. |
| **Established / healthy** | Map existing instructions, docs, tests, skills and workflows. Keep or link equivalent capabilities and install only genuine gaps. |
| **Established / context needs repair** | Audit first. Identify stale, scattered, duplicated or conflicting context. Propose canonical sources and staged repairs before adding more instruction files. |

The installer also checks context quality: instruction precedence, architecture coverage, source-of-truth clarity, documentation freshness, test guidance and session continuity. A large repository is not automatically a poorly documented one.

### Installation journey

```mermaid
flowchart TD
    A[Inspect project and active host] --> B[Classify project and context health]
    B --> C[Ask for the host roster]
    C --> D[Assess selected hosts]
    D --> E[Select shared resources and thin host adapters]
    E --> F[Preview exact files and diffs]
    F --> G{Owner approves?}
    G -- No --> H[Stop without writing]
    G -- Yes --> I[Install and verify each host]
    I --> J[Run a safe project-specific first-use example]
```

### Copy the setup prompt

<details>
<summary><strong>Show installation prompt</strong></summary>

```text
Install Agent Foundry in this repository from
https://github.com/LemonizDev/Agent-Foundry.

Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md. Inspect this project
before writing anything. Classify it as new/empty, established with healthy
context, or established with context that needs repair. Show evidence and
assess instructions, architecture, canonical sources, documentation freshness,
duplication/conflicts, verification guidance and session continuity.

Identify the active coding-agent host and version where possible. Ask which
other coding-agent apps I use with this project. Allow multiple selections
and free-text names.

Plan one shared project-local Foundry resource set and only the host-specific
pointers required for my selected apps. Preserve existing project instructions.
Do not change global app settings or create competing root instruction files
without explicit approval.

Recommend the smallest useful resources. For messy context, consider a
read-only repository audit before proposing documentation repair. Show exact
files, conflicts, host evidence and verification plan. Wait for approval
before writing.

After installation, demonstrate one relevant installed resource on a safe,
small task grounded in the project you inspected. Show the result, verification
and one sensible next step. If no safe demo fits, explain why.
```

**After you paste it:** the agent should inspect first, discover your host roster, present a proposed installation and wait for approval. A first-use demo is selected from actual project evidence, not a generic canned example.

[Bootstrap guide](BOOTSTRAP.md) · [Initialization procedure](bootstrap/INITIALIZE_PROJECT.md) · [Host roster skill](skills/host-roster-onboarding/SKILL.md)

</details>

## Coding-agent apps

Foundry adapts resources for the host apps you actually use. The active app/version is checked first; additional apps are selected during setup.

<details>
<summary><strong>Codex</strong></summary>

Inspect the repository's AGENTS.md hierarchy and existing .agents/skills resources. Keep root instructions concise and point to shared Foundry context. Verify that the installed Codex app/CLI discovers and can load a selected skill.

[Integration guide](integrations/README.md#host-conventions-and-setup-paths) · [Official project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

</details>

<details>
<summary><strong>Claude Code</strong></summary>

Inspect CLAUDE.md imports and existing .claude configuration. Use Claude-specific skill or agent formats only when the installed version supports them; keep root project context as a short pointer.

[Integration guide](integrations/README.md#host-conventions-and-setup-paths) · [Claude Code customization](https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more)

</details>

<details>
<summary><strong>OpenCode</strong></summary>

Inspect AGENTS.md, OpenCode configuration, permissions and existing .opencode resources. Verify current skill discovery, command mappings and agent configuration before writing adapters.

[Instructions](https://opencode.ai/docs/instructions/) · [Skills](https://opencode.ai/docs/skills) · [Integration guide](integrations/README.md)

</details>

<details>
<summary><strong>Kilo</strong></summary>

Identify editor versus CLI and exact version. Inspect .kilo/ and shared skill locations; review project-skill trust boundaries and permission behaviour before setup.

[Official skills guide](https://kilo.ai/docs/customize/skills) · [Integration guide](integrations/README.md)

</details>

<details>
<summary><strong>Cline</strong></summary>

Inspect current workspace rules and instruction files. Rule-file support does not automatically prove that skill or workflow discovery is available; verify those separately.

[Official Cline rules](https://github.com/cline/cline/blob/main/docs/customization/cline-rules.mdx) · [Integration guide](integrations/README.md)

</details>

<details>
<summary><strong>Cursor</strong></summary>

Inspect .cursor/rules, AGENTS.md and Agent Skills locations. Use valid Cursor rule frontmatter and keep skills separate from rule files.

[Rules](https://cursor.com/docs/rules) · [Skills](https://cursor.com/docs/skills)

</details>

<details>
<summary><strong>Windsurf and GitHub Copilot</strong></summary>

Confirm exact product surface and installed version first. Windsurf/Cascade and newer Devin surfaces can have different configuration boundaries. Copilot's instruction and skill features also differ across VS Code, Visual Studio, GitHub.com, CLI and app surfaces.

[Windsurf docs](https://docs.windsurf.com/) · [Copilot repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide) · [Copilot skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

</details>

> **Compatibility boundary:** documented conventions are not runtime verification. A generated file does not prove a host loaded it. Foundry cannot grant a host tools, permissions, filesystem/network access, subagent spawning or model routing.

[Full host integration guide](integrations/README.md)

## Usage and examples

Foundry is used through your existing coding agent. Ask for the task you need; the agent should consult the matching command contract and skill when available. Native slash-command support is host-dependent.

<details>
<summary><strong>Get a project health assessment</strong></summary>

```text
/project-health [project or subsystem]
```

Use this when onboarding to a codebase or after a major change. The agent should assess architecture, quality, security, operations and continuity, and distinguish evidenced findings from unknowns.

[Project Health command](commands/project-health.md) · [Repository Audit skill](skills/repository-audit/SKILL.md)

</details>

<details>
<summary><strong>Get an evidence-based progress report</strong></summary>

```text
/progress-report milestone: M7
```

The report should distinguish completed, in-progress, blocked and unverified work, with the evidence behind each status.

[Progress Report command](commands/progress-report.md) · [Progress Reporting skill](skills/progress-reporting/SKILL.md)

</details>

<details>
<summary><strong>Close a session or curate a reusable resource</strong></summary>

Use **/close** when you want durable project context preserved: requirements, decisions, stable preferences, verified lessons and current state.

Use **/done** only when the conversation produced a genuinely reusable artefact such as a command, skill, workflow, standard, profile or template. It classifies and routes the artefact. If nothing meets the quality bar, it must reject the operation and write nothing.

```text
/close
/done
```

Neither command is a transcript dump. The agent cannot close the chat UI unless the host exposes a tested session-control feature.

[Close Session](commands/close-session.md) · [Done](commands/done.md) · [Session Resource Curation](skills/session-resource-curation/SKILL.md)

</details>

## Configuration and management

Manage a project installation conversationally through the same coding agent:

- "Show my Foundry settings."
- "Check this Foundry installation."
- "Update Foundry and show me the diff first."
- "Make reviews stricter."
- "Remove Foundry from this project."

The agent should inspect the installation manifest, preserve locally modified files, preview consequential changes and verify the result. Global app configuration and files outside the repository are not changed by default.

[Settings specification](foundry/SETTINGS_SPEC.md) · [Management instructions](foundry/MANAGEMENT.md) · [User guide](docs/USER_GUIDE.md)

## Documentation and support

| Need | Start here |
|---|---|
| First installation | [Bootstrap guide](BOOTSTRAP.md) |
| Full usage and lifecycle | [User guide](docs/USER_GUIDE.md) |
| Architecture and resource model | [Resource Model](docs/architecture/RESOURCE_MODEL.md) |
| Host integrations | [Host integration guide](integrations/README.md) |
| Contributing | [Contribution guide](CONTRIBUTING.md) |
| Security | [Security policy](SECURITY.md) |
| Support | [Support guide](SUPPORT.md) |
| Change history | [Changelog](CHANGELOG.md) |

## Community contributions

**No community-contributed resources have been published yet.**

Have a reusable skill, instruction set, workflow or command? In a project where Foundry is installed, simply tell your coding agent:

> "I want to contribute."

It should inspect accessible project context, show reusable candidates and help prepare only the ones you select. Discovery does not authorise publication; nothing is committed or published without separate approval.

[Contribution discovery skill](skills/contribution-discovery/SKILL.md) · [Contribute command](commands/contribute.md)

## Security and boundaries

> [!IMPORTANT]
> Agent Foundry is a context and resource library, not a sandbox or runtime. The host controls tools, permissions, filesystem/network access, execution and model availability. A role or generated file does not grant capabilities.

See the [security policy](SECURITY.md) and [host capability boundaries](integrations/README.md#capability-boundary).

## License

Agent Foundry is distributed under the [MIT License](LICENSE).

