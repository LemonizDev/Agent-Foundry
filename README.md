<div align="center">

<img src="assets/agent-foundry-banner.svg" alt="Agent Foundry: reusable context and workflows for AI coding agents" width="100%" />

# Agent Foundry

### A reusable operating playbook for the coding agent you already use.

**Project-aware instructions, skills, workflows and specialist resources for Codex, Claude Code, OpenCode, Kilo, Cline and other file-capable coding agents.**

[![CI](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.6.0-6478ff.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2ea44f.svg)](LICENSE)

[Quick start](#quick-start) · [How setup works](#project-aware-installation) · [Why Foundry](#why-agent-foundry) · [Explore every feature](#feature-explorer) · [Host compatibility](#coding-agent-apps) · [Contribute](#community-contributions)

</div>

> **In one sentence:** Foundry helps your existing coding agent work with better project context, repeatable procedures and accountable workflows. It does not replace the agent, model or runtime.

## Quick start

1. Open your project in the coding-agent app you want to use.
2. Paste the setup prompt below.
3. Foundry inspects the project and host, then asks which other coding-agent apps you use.
4. Review the proposed shared resources and host-specific changes. Approve before anything is written.

<details>
<summary><strong>Copy the interactive setup prompt</strong></summary>

```text
Install Agent Foundry in this repository from https://github.com/LemonizDev/Agent-Foundry.

1. Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md.
2. Inspect this project and classify it as new, established with healthy context,
   or established with context that needs repair. Show evidence.
3. Identify the active coding-agent host and version where possible.
4. Ask which other coding-agent apps I use with this project. Allow multiple
   selections and free-text additions. Include Codex, Claude Code, OpenCode,
   Kilo, Cline, Cursor, Windsurf, GitHub Copilot and Other.
5. Assess each selected host and propose one shared project-local Foundry
   resource set plus only the required host-specific pointers. Distinguish
   project-local files from global app settings.
6. Recommend the smallest useful resource set. For messy context, audit first.
7. Show exact files, conflicts, host evidence and verification plan. Wait for
   my approval before writing anything.
8. After installation, run one safe, project-specific quickstart using a
   selected resource. Show the result and one useful next action.

Do not copy the entire registry, overwrite existing instructions, or change
global app settings without explicit approval.
```

**What happens next:** the agent classifies the project, checks existing context, discovers your host roster, recommends a minimal integration, previews exact changes and waits for approval. After installation it demonstrates one relevant resource on a safe project-specific task.

[Full bootstrap guide](BOOTSTRAP.md) · [Initialization procedure](bootstrap/INITIALIZE_PROJECT.md)

</details>

## Project-aware installation

Foundry does not dump the same bundle into every repository. It adapts to the project it finds.

| Project type | What Foundry does |
|---|---|
| 🌱 **New / empty** | Establish a compact baseline, identify the stack and purpose, and create only essential project context. |
| 🏗️ **Established / healthy** | Preserve working instructions and workflows, link to existing sources and fill only proven gaps. |
| 🧭 **Established / context needs repair** | Audit first. Identify stale, scattered, duplicated or conflicting context; propose canonical sources and staged repairs before adding more rules. |

### The setup path

```text
 INSPECT PROJECT + ACTIVE HOST
              |
       CLASSIFY PROJECT
              |
       ASSESS CONTEXT HEALTH
              |
       ASK YOUR HOST ROSTER
       (multiple + free text)
              |
       MAP EACH SELECTED HOST
              |
       SELECT SHARED RESOURCES
        + HOST-SPECIFIC ADAPTERS
              |
       PREVIEW EXACT FILE CHANGES
              |
          YOUR APPROVAL
              |
       INSTALL + VERIFY EACH HOST
              |
       PROJECT-SPECIFIC QUICKSTART
```

**One project, several coding agents:** Foundry aims to keep one shared project-local resource set and use small host-specific pointers where supported. It does not silently edit global app settings or create competing root instruction files.

<details>
<summary><strong>See the three onboarding paths in more detail</strong></summary>

- **New project:** detect the actual stack and intended product from available context. Propose a minimal instruction baseline, source-of-truth structure and first milestone. Avoid generating a documentation bureaucracy before there is a project to document.
- **Healthy existing project:** map existing instructions, architecture, skills, workflows, tests and verification practices. Mark capabilities KEEP, LINK, EXTEND, INSTALL, ADAPT, DEFER or EXCLUDE. Preserve existing rules unless the owner approves a change.
- **Context needs repair:** assess instruction precedence, architecture coverage, canonical sources, freshness, duplication, contradictions, test guidance and session continuity. Recommend a read-only repository audit and documentation-maintenance pass where useful. Diagnosis and repair are separate approval steps.

The paths are not mutually exclusive diagnoses. A repository can have excellent tests and poor documentation, or strong architecture notes and no session recovery.

**The first-use demo is selected from evidence.** A new project might use implementation planning; a healthy project might use review or testing; a context-heavy project might get a read-only audit summary. The demo must show its output, what was actually verified and one sensible next step. No invented project weaknesses just to make the demo look impressive.

</details>

## Why Agent Foundry

| Advantage | Practical difference |
|---|---|
| 🧠 **Fits the project you have** | Onboarding adapts to project maturity, conventions, stack and existing context. |
| 🧹 **Reduces context mess** | Finds duplication, stale guidance and competing sources instead of piling on more instructions. |
| 🎯 **Relevant resources, not a giant bundle** | Selects procedures for the task and project rather than loading everything all the time. |
| 🔁 **Continuity between sessions** | Keeps decisions, progress, blockers and recovery information in durable project context. |
| 🧪 **Evidence-based completion** | Separates implemented, tested, reviewed, runtime-verified and unverified work. |
| 🤝 **More accountable delegation** | Uses bounded assignments, ownership, checkpoints and independent review where the host supports it. |
| 🧰 **Keep your preferred apps** | One shared project resource set can serve multiple selected coding-agent hosts. |
| 🛡️ **Owner remains in control** | Exact changes and conflicts are previewed; approval gates protect existing work. |

## Feature explorer

Explore by what you want to do. Each section opens into smaller categories and direct links to the individual resources. The registry is the canonical inventory.

<details>
<summary><strong>01 · Start here: installation and project fit</strong></summary>

Choose the right onboarding path, inspect an existing project and install Foundry without replacing what already works.

<details>
<summary>Project onboarding</summary>

- [**existing-project-integration**](docs/architecture/EXISTING_PROJECT_INTEGRATION.md) · Assesses an established repository and adds only relevant Foundry resources without replacing its architecture. · Workflow
- [**repository-audit**](skills/repository-audit/SKILL.md) · Maps repository structure, runtime flows, authoritative context, quality controls and evidence-backed gaps. · Skill
- [**host-roster-onboarding**](skills/host-roster-onboarding/SKILL.md) · Discovers the user's active and additional coding-agent hosts, then plans safe multi-host project integration with per-host verification. · Skill
- [**global-instructions**](core/GLOBAL_INSTRUCTIONS.md) · Compact, project-agnostic operating instructions that connect installed standards, task resources and Foundry management triggers into one agent entrypoint.
- [**context-architecture**](docs/architecture/CONTEXT_ARCHITECTURE.md) · Documents the context-first architecture: context-file hierarchy, progressive disclosure, conversational management and current limitations.

</details>

<details>
<summary>First steps and implementation</summary>

- [**implementation-planning**](skills/implementation-planning/SKILL.md) · Turns desired outcomes into bounded tasks with dependencies, acceptance criteria and verification. · Skill
- [**atomic-implementation**](skills/atomic-implementation/SKILL.md) · Guides small, bounded implementation steps with clear acceptance criteria and verification. · Skill
- [**engineering-principles**](standards/engineering-principles.md) · Universal engineering baseline for understanding before changing, preserving project intent, incremental implementation and evidence-based completion. · Standard
- [**decision-making**](standards/decision-making.md) · Provides an evidence-based procedure for comparing options, recording tradeoffs and escalating owner decisions. · Standard

</details>

</details>

<details>
<summary><strong>02 · Project context and documentation</strong></summary>

Keep instructions coherent, establish canonical sources and maintain useful project memory.

<details>
<summary>Context standards</summary>

- [**context-management**](standards/context-management.md) · Defines canonical project context, progressive disclosure and durable session learning without transcript dumps. · Standard
- [**documentation-governance**](standards/documentation-governance.md) · Defines documentation ownership, source-of-truth hierarchy, lifecycle and navigation rules. · Standard
- [**agent-communication**](standards/agent-communication.md) · Defines clear owner communication, progress reporting, uncertainty labels and approval gates. · Standard
- [**security-boundaries**](standards/security-boundaries.md) · Sets least-privilege, secret-handling, untrusted-input and approval boundaries for AI-assisted engineering. · Standard
- [**evidence-and-verification**](standards/evidence-and-verification.md) · Sets rules for evidence quality, verification claims and explicit unverified or blocked states. · Standard

</details>

<details>
<summary>Documentation and learning</summary>

- [**documentation-maintenance**](skills/documentation-maintenance/SKILL.md) · Keeps project documentation accurate, navigable and free of competing sources of truth. · Skill
- [**session-learning**](skills/session-learning/SKILL.md) · Extracts durable, actionable project knowledge from a session and updates its proper context source. · Skill
- [**session-close**](workflows/session-close.md) · Coordinates the review, consolidation and verification of durable session learnings. · Workflow
- [**readme-maker**](skills/readme-maker/SKILL.md) · Creates and maintains concise, navigable GitHub READMEs with nested feature trees, accessible visual hierarchy and validated resource links. · Skill
- [**user-guide**](docs/USER_GUIDE.md) · Explains Agent Foundry setup, chat-native management, commands, resource types, presets, delegation and maintenance.

</details>

</details>

<details>
<summary><strong>03 · Build, debug, test and review</strong></summary>

Engineering procedures for bounded implementation and evidence-backed quality.

<details>
<summary>Engineering skills</summary>

- [**debugging**](skills/debugging/SKILL.md) · Diagnoses failures through reproducible experiments and root-cause analysis. · Skill
- [**testing-and-verification**](skills/testing-and-verification/SKILL.md) · Selects risk-based tests and reports exactly what was and was not verified. · Skill
- [**code-review**](skills/code-review/SKILL.md) · Performs independent, findings-first review of code changes, risks and test quality. · Skill
- [**architecture-design**](skills/architecture-design/SKILL.md) · Designs maintainable system boundaries and decisions grounded in requirements and tradeoffs. · Skill
- [**implementation-explanation**](skills/implementation-explanation/SKILL.md) · Explains code changes, their runtime behaviour, tradeoffs and verification evidence. · Skill
- [**privacy-safe-evidence**](skills/privacy-safe-evidence/SKILL.md) · Collects and reports useful evidence while minimising secrets, personal data and sensitive project details. · Skill
- [**agent-execution-security**](skills/agent-execution-security/SKILL.md) · Assesses permissions, isolation, secrets exposure and risks from autonomous agent execution. · Skill

</details>

<details>
<summary>Commands</summary>

- [**implement**](commands/implement.md) · Executes an approved implementation plan with incremental verification. · Command
- [**debug**](commands/debug.md) · Investigates a reproducible failure and isolates its root cause. · Command
- [**review**](commands/review.md) · Runs an independent, read-only engineering review. · Command
- [**verify**](commands/verify.md) · Checks acceptance criteria against explicit test and runtime evidence. · Command
- [**audit**](commands/audit.md) · Runs a read-only, evidence-based repository audit. · Command
- [**teach-implementation**](commands/teach-implementation.md) · Explains a completed implementation in a structured, project-relevant way. · Command
- [**project-health**](commands/project-health.md) · Assesses project health across architecture, quality, security, operations and continuity. · Command
- [**next-task**](commands/next-task.md) · Recommends the highest-value next engineering action from current evidence and dependencies. · Command

</details>

</details>

<details>
<summary><strong>04 · Planning, delegation and multi-agent work</strong></summary>

Coordinate workers where the host supports them; otherwise use the same contracts for manual delegation.

<details>
<summary>Delegation and orchestration</summary>

- [**multi-agent-delegation**](skills/multi-agent-delegation/SKILL.md) · Defines accountable task decomposition, worker selection, assignment contracts, checkpoints, recovery and independent review. · Skill
- [**multi-agent-campaign**](workflows/multi-agent-campaign.md) · Coordinates a durable multi-agent campaign with persistent assignments, checkpoints, recovery, independent review and integrated verification. · Workflow
- [**lead-engineer**](profiles/lead-engineer.md) · Defines the accountable lead/orchestrator role for architecture, task decomposition, delegation, integration and delivery. · Specialist profile
- [**independent-reviewer**](profiles/independent-reviewer.md) · Defines a sceptical, findings-first reviewer role that challenges implementation and evidence. · Specialist profile
- [**model-delegation-architecture**](docs/architecture/MODEL_DELEGATION.md) · Defines task-aware model classification, roster constraints, scoring and independent-review gates. · Standard
- [**orchestration-portability**](docs/architecture/ORCHESTRATION_PORTABILITY.md) · Maps portable orchestration contracts to host-specific capabilities and limitations across common coding agents.

</details>

<details>
<summary>Continuity and reporting</summary>

- [**project-state-management**](skills/project-state-management/SKILL.md) · Maintains canonical project context, current state, blockers and next actions without duplicating sources of truth. · Skill
- [**plan-reconciliation**](skills/plan-reconciliation/SKILL.md) · Reconciles roadmap, implementation plans and actual repository evidence to identify the next safe task. · Skill
- [**progress-reporting**](skills/progress-reporting/SKILL.md) · Produces progress reports grounded in implementation, test and review evidence rather than estimates or chat memory. · Skill
- [**session-recovery**](skills/session-recovery/SKILL.md) · Reconciles interrupted work against repository state and resumes from verified checkpoints. · Skill
- [**campaign-status**](commands/campaign-status.md) · Reconciles multi-agent campaign status against assignments, diffs, checkpoints and verification evidence. · Command
- [**resume**](commands/resume.md) · Recovers interrupted work from durable checkpoints and verified repository state. · Command
- [**delegate**](commands/delegate.md) · Creates a bounded task assignment and recommends a suitable model from the project roster. · Command
- [**progress-report**](commands/progress-report.md) · Invokes evidence-backed progress reporting for a project, milestone or workstream. · Command

</details>

<details>
<summary>Work records</summary>

- [**delegation-assignment**](templates/delegation-assignment.md) · Defines the objective, scope, owner, model rationale, outputs and acceptance criteria for delegated work. · Template
- [**campaign-state**](templates/campaign-state.md) · Defines a durable campaign record for workstreams, assignment states, owner decisions, blockers and verification evidence. · Template
- [**recovery-handoff**](templates/recovery-handoff.md) · Preserves verified checkpoints and context when a delegated worker or session is interrupted. · Template
- [**decision-register**](templates/decision-register.md) · Records architectural and product decisions, alternatives, rationale and consequences. · Template
- [**blocker-register**](templates/blocker-register.md) · Tracks blockers, ownership, impact, dependencies and resolution conditions. · Template
- [**test-evidence-report**](templates/test-evidence-report.md) · Records verification commands, environments, outcomes, coverage and unresolved checks. · Template
- [**progress-report-template**](templates/progress-report-template.md) · Provides a consistent structure for evidence-based project progress reports. · Template

</details>

</details>

<details>
<summary><strong>05 · Visual, graphics and performance work</strong></summary>

Practices and specialist roles for rendering-heavy, interactive and audio-reactive projects.

<details>
<summary>Visual engineering</summary>

- [**visual-regression**](skills/visual-regression/SKILL.md) · Compares rendered output across controlled states and identifies meaningful visual regressions. · Skill
- [**visual-probe-engineering**](skills/visual-probe-engineering/SKILL.md) · Designs repeatable visual probes, pinned states and diagnostics for graphics-heavy applications. · Skill
- [**graphics-engineer**](profiles/graphics-engineer.md) · Defines a specialist role for graphics pipelines, shaders, rendering quality and performance. · Specialist profile
- [**creative-director**](profiles/creative-director.md) · Translates visual direction into coherent design intent, constraints and acceptance criteria. · Specialist profile
- [**visual-quality-engineer**](profiles/visual-quality-engineer.md) · Reviews visual output, rendering behaviour, consistency and visual acceptance criteria. · Specialist profile
- [**performance-qa**](profiles/performance-qa.md) · Defines repeatable performance, stability and resource-usage verification. · Specialist profile
- [**creative-lighting-director**](profiles/creative-lighting-director.md) · Defines specialist direction for audio-reactive lighting, lasers and visual choreography. · Specialist profile

</details>

</details>

<details>
<summary><strong>06 · Models, settings and Foundry management</strong></summary>

Project-owned model rosters, task-aware selection and conversational lifecycle management.

<details>
<summary>Model selection</summary>

- [**model-roster-template**](templates/model-roster.yaml) · Provides the project-owned model roster schema and capability fields. · Template

</details>

<details>
<summary>Settings and lifecycle</summary>

- [**foundry-management**](foundry/MANAGEMENT.md) · Conversational management instructions: discovery, contribution, settings, installation, update, removal, diagnostics and the Foundry safety contract.
- [**foundry-settings-spec**](foundry/SETTINGS_SPEC.md) · The single authoritative definition of supported Agent Foundry settings, their values, defaults, scope and safe modification guidance.
- [**foundry-response-templates**](foundry/RESPONSE_TEMPLATES.md) · Reusable composition guidance for Foundry management chat responses: overview, settings, previews, diagnostics, contribution discovery and change summary.
- [**foundry-settings-template**](templates/foundry-settings.yaml) · Provides project-level policies for delegation, model selection and session behaviour. · Template
- [**contribution-discovery**](skills/contribution-discovery/SKILL.md) · Scans accessible user-created instructions, skills, workflows, commands, settings and templates for safe, reusable contribution candidates. · Skill
- [**contribute**](commands/contribute.md) · Invokes explicit, approval-gated discovery of reusable user-created agent resources for Agent Foundry. · Command

</details>

</details>


<details>
<summary><strong>Cross-cutting safety and capability boundaries</strong></summary>

- Foundry is a context/resource library, not an execution sandbox.
- It does not grant filesystem, shell, network, browser or model access.
- It does not spawn subagents or route models unless the host independently provides those capabilities.
- A generated host file is not proof that the host discovers it.
- Installation, updates and removal must preserve user-owned files and detect local modifications.

[Host capability boundaries](integrations/README.md) · [Security boundaries](standards/security-boundaries.md) · [Evidence and verification](standards/evidence-and-verification.md)

</details>

## Coding-agent apps

Foundry can adapt its shared resources for multiple coding-agent apps in one setup. During installation it identifies the active host, then asks which other apps you use. You can select several and type additional names.

<details>
<summary><strong>Host conventions and what must be verified</strong></summary>

| Host | Common project conventions | Verify in your installed version |
|---|---|---|
| **OpenAI Codex** | AGENTS.md, .agents/skills/ | Skill discovery, app/CLI parity, delegation |
| **Claude Code** | CLAUDE.md, .claude/skills/, .claude/agents/ | Skill metadata, permissions, subagents, model overrides |
| **OpenCode** | AGENTS.md, .agents/skills/, .opencode/commands/ | Command discovery, agent definitions, model config |
| **Kilo Code / Kilo CLI** | AGENTS.md, supported shared skills and Kilo config | Named agents, model catalog, sessions, permissions |
| **Cline** | .clinerules and supported skill resources | Current rules, skills and workflow capabilities |
| **Cursor, Windsurf, Copilot and others** | Host-specific project instructions and resource formats | Check current official conventions before adapting |

These are adaptation references, not universal guarantees. Each host is reported separately as documented, generated, structurally validated, discovery-tested, invocation-tested or behaviour-accepted.

[Full host integration guide](integrations/README.md) · [Multi-host onboarding skill](skills/host-roster-onboarding/SKILL.md)

<details>
<summary><strong>Per-app setup: Codex, Claude Code, OpenCode, Kilo, Cline, Cursor, Windsurf and Copilot</strong></summary>

These are project-level starting points. The installer checks your actual app/version and existing files before choosing paths. It does not silently change global settings.

<details>
<summary>OpenAI Codex</summary>

Open the repository as the active Codex workspace. Inspect the AGENTS.md hierarchy and use the shared Agent Skills location where supported. Add only a short pointer to the shared Foundry instructions. Verify that Codex discovers and can load one selected skill.

[Official project-instructions guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
</details>

<details>
<summary>Claude Code</summary>

Start Claude Code in the repository. Inspect CLAUDE.md imports and existing .claude configuration. Use .claude/skills/<name>/SKILL.md for Claude-specific skills when needed. Keep CLAUDE.md concise; create specialist agent definitions only when selected and supported.

[Claude Code customization guide](https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more)
</details>

<details>
<summary>OpenCode</summary>

Open the project root. Inspect AGENTS.md, opencode.json/jsonc, permissions and existing .opencode directories. Prefer .opencode/skills/<name>/SKILL.md for OpenCode-specific skill discovery; compatibility locations such as .agents/skills are also documented. Check skill permissions and ID collisions.

[Instructions](https://opencode.ai/docs/instructions/) · [Skills](https://opencode.ai/docs/skills)
</details>

<details>
<summary>Kilo Code / Kilo CLI</summary>

Identify the editor or CLI surface and version. Inspect .kilo/skills and .agents/skills before installing. Review project-skill trust boundaries, especially embedded shell commands, and reload the host as required.

[Official Kilo skills guide](https://kilo.ai/docs/customize/skills)
</details>

<details>
<summary>Cline</summary>

Open the repository as the active workspace. Inspect .clinerules/ and .cline/rules/ before editing. Cline documents both rule directories and recognition of AGENTS.md and other tool rule formats. Verify skill discovery separately; rule support does not prove skills are loaded.

[Official Cline rules guide](https://github.com/cline/cline/blob/main/docs/customization/cline-rules.mdx)
</details>

<details>
<summary>Cursor</summary>

Open the project in Cursor. Inspect .cursor/rules/*.mdc, AGENTS.md and .agents/skills. Project rules need valid MDC frontmatter; use .agents/skills or .cursor/skills for Agent Skills rather than placing SKILL.md files in the rules directory.

[Rules](https://cursor.com/docs/rules) · [Skills](https://cursor.com/docs/skills)
</details>

<details>
<summary>Windsurf</summary>

Confirm which Windsurf/Cascade or newer product surface and version you mean. Inspect AGENTS.md, .windsurf/rules, .windsurf/skills and legacy .windsurfrules as appropriate. Product documentation is in transition, so the installer must verify current official conventions before writing an adapter.

[Windsurf documentation](https://docs.windsurf.com/)
</details>

<details>
<summary>GitHub Copilot</summary>

First identify the surface: VS Code, Visual Studio, GitHub.com, Copilot CLI or Copilot app. For IDE repository instructions, inspect .github/copilot-instructions.md and .github/instructions/*.instructions.md. Skills and AGENTS.md support vary by product surface; verify the actual app.

[Repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide) · [Agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
</details>

</details>

## Community contributions

**No community-contributed resources have been published yet.**

Have a useful skill, workflow, instruction set or template? In a project where Foundry is installed, just tell your coding agent:

> **"I want to contribute."**

Foundry will look for reusable candidates in the project context it can actually access, show you what may be useful to others and help prepare only what you select. Nothing is published without separate approval.

[Contribution guide](CONTRIBUTING.md) · [Contribution discovery skill](skills/contribution-discovery/SKILL.md)

## Token impact

<details>
<summary><strong>Does Foundry increase token usage?</strong></summary>

Yes, instructions and skills consume input tokens when the host loads them. Files that remain in the repository but are not loaded do not consume prompt tokens.

Foundry aims for **progressive disclosure**: a compact core, project context when needed, and only the relevant specialist skill for the current task. Loading every resource on every request is not the goal.

The right measure is total cost per accepted task, including context overhead, retries, corrections, coordination and verification. There is no published cross-model benchmark or guaranteed percentage saving. Actual loading behaviour depends on the host.

</details>

## Find your way around the repository

<details>
<summary><strong>Repository map and canonical documentation</strong></summary>

| Path | What lives here |
|---|---|
| `core/` | Compact global instructions |
| `standards/` | Cross-project operating standards |
| `skills/` | Detailed reusable procedures |
| `commands/` | User-facing task contracts |
| `workflows/` | Multi-step processes |
| `profiles/` | Specialist responsibilities |
| `templates/` | Reusable records and output structures |
| `integrations/` | Host-specific conventions and boundaries |
| `bootstrap/` | Project initialization procedure |
| `foundry/` | Settings, management and response conventions |
| `registry/` | Canonical resource catalog |
| `docs/architecture/` | Architecture and portability decisions |

</details>

> [!IMPORTANT]
> Agent Foundry does not grant tools, permissions, filesystem/network access, subagent spawning or model routing. It is not a sandbox. The host's real version and configuration determine what works. Documented compatibility is not runtime verification.

[User guide](docs/USER_GUIDE.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [License](LICENSE)
