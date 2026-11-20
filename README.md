<div align="center">

<img src="assets/agent-foundry-banner.svg" alt="Agent Foundry: reusable context and workflows for AI coding agents" width="100%" />

# Agent Foundry

### Make the coding agent you already use work more consistently.

**A context-first resource library for Codex, Claude Code, OpenCode, Kilo, Cline and other file-capable coding agents.**

[![CI](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.6.0-6478ff.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2ea44f.svg)](LICENSE)

[Quick start](#quick-start) · [See a demo](#30-second-demo) · [Browse features](#feature-menu) · [Compatible apps](#compatible-apps) · [Token impact](#token-impact) · [Contribute](#contribute)

</div>

> **In one sentence:** Agent Foundry gives your existing AI coding agent reusable instructions, skills, workflows, specialist roles and project-management habits, without replacing its model, tools or runtime.

Claude-maxxing, GPT-maxxing, OpenCode, Kilo or another CLI setup: keep your preferred agent. Give it a better operating playbook.

## Quick start

1. Open the target repository in your coding agent.
2. Paste the prompt below.
3. Review the proposed resources and exact file changes.
4. Approve only what you want installed.

<details>
<summary><strong>Copy the installation prompt</strong></summary>

\`\`\`text
Install Agent Foundry in this project from https://github.com/LemonizDev/Agent-Foundry.
Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md first.
Inspect my existing instructions, architecture, skills, workflows, tests,
documentation and this host's actual capabilities. Identify what I already
have, what is missing and what must remain untouched. Recommend the smallest
useful set of Foundry resources. Show the exact files you would create or
modify, explain conflicts, preserve my existing instructions and custom work,
and wait for my approval before writing anything. Do not copy the entire
registry.
\`\`\`

The host must be able to access the Foundry source and the target project. If it cannot fetch repositories or write files, it must explain the limitation rather than pretend installation succeeded.

[Full bootstrap guide](BOOTSTRAP.md) · [Initialization procedure](bootstrap/INITIALIZE_PROJECT.md)

</details>

## 30-second demo

**You:** "Set up Foundry here. I already have AGENTS.md, some skills and a review workflow."

**Agent:** "I found your instructions, four skills and an existing review workflow. I'll preserve those, link to the workflow instead of duplicating it, and propose only the missing recovery and evidence resources."

**You:** "What will you change?"

**Agent:** "A small Foundry pointer, two selected resources and an ownership manifest. Here are the exact files and conflicts. Nothing has been written yet."

**You:** "Keep my review rule."

**Agent:** "Your rule remains authoritative. Here's the final plan for approval."

*That's the intended experience: inspect first, fit into the project, explain trade-offs, ask before changing things.*

## Feature menu

Pick a title to expand it. The README stays short until you need the detail.

<details>
<summary><strong>01 · Project-aware setup and onboarding</strong></summary>

Foundry assesses the repository before recommending an installation. It inspects existing instructions, architecture, conventions, skills, tests, CI, documentation and host capabilities.

Every discovered capability gets a clear disposition:

| Decision | Meaning |
|---|---|
| **KEEP** | Already solves the problem. Leave it alone. |
| **LINK** | Keep the existing source of truth and point to it. |
| **EXTEND** | Add only the missing behaviour. |
| **INSTALL** | Fill a genuine gap with a Foundry resource. |
| **ADAPT** | Translate a portable resource to the host's format. |
| **DEFER** | Evidence or host capability is missing. |
| **EXCLUDE** | Irrelevant, unsafe, duplicative or project-specific. |

The goal is a minimal, additive installation. Existing project instructions and owner decisions remain authoritative.

**Setup lifecycle**

\`\`\`text
  INSPECT PROJECT
        |
        v
  MAP EXISTING CAPABILITIES
        |
        v
  FIND GAPS / CONFLICTS
        |
        v
  PROPOSE MINIMAL RESOURCES
        |
    OWNER APPROVES?
      /       \\
    NO         YES
    |           |
   STOP      INSTALL
                |
                v
          VERIFY + RECORD
\`\`\`

</details>

<details>
<summary><strong>02 · Instructions, skills, workflows and reusable resources</strong></summary>

Foundry separates the short operating baseline from specialised procedures.

| Resource | Purpose |
|---|---|
| **Core instructions** | Compact operating contract and pointers to relevant resources |
| **Standards** | Reusable rules for security, evidence, communication and context |
| **Skills** | Detailed procedures for engineering, research, debugging, review and testing |
| **Commands** | User-facing request contracts; native slash-command support depends on the host |
| **Workflows** | Multi-step processes, gates, dependencies and handoffs |
| **Profiles** | Specialist responsibilities and boundaries, not fictional permissions |
| **Templates** | Assignments, decisions, progress, campaign state and recovery |
| **Integrations** | Host-specific conventions and limitations |

A command describes *what was requested*. A skill describes *how to do it*. A workflow coordinates *multiple steps*. A profile defines *who owns which responsibility*. A template standardises *the record or output*.

Browse the [resource registry](registry/resources.yaml). It is a catalog for selective discovery, not a bundle to copy wholesale into every project.

</details>

<details>
<summary><strong>03 · Multi-agent delegation and orchestration</strong></summary>

Foundry provides portable orchestration practices informed by the Dhan AI Trader and Rave Engine projects:

- Lead/orchestrator responsibilities and decision boundaries.
- Bounded worker assignments with explicit write scopes and acceptance criteria.
- Task-aware model selection guidance.
- Durable campaign state, checkpoints and recovery handoffs.
- Independent review and integrated verification.
- A campaign-status command that reconciles claims against evidence.

\`\`\`text
                OWNER
                  |
                  v
          LEAD / ORCHESTRATOR
           /       |       \\
          v        v        v
       WORKER A WORKER B  REVIEWER
          \\        |        /
           \\       |       /
            v      v      v
           LEAD INTEGRATION
                  |
             VERIFY RESULT
              /       \\
            PASS      FAIL
             |          |
             v          v
          COMPLETE   RECOVER
\`\`\`

**Host boundary:** Foundry does not spawn agents, route providers, switch models or inspect live quotas. Codex, Claude Code, OpenCode, Kilo or another host must expose those capabilities. Without native delegation, Foundry can prepare assignments for manual execution; it must never claim a worker was dispatched when it wasn't.

[Orchestration portability guide](docs/architecture/ORCHESTRATION_PORTABILITY.md)

</details>

<details>
<summary><strong>04 · Persistent context, session continuity and verification</strong></summary>

Foundry encourages one authoritative home for durable project facts: requirements, architecture, decisions, active plans, engineering conventions, known failure modes and operations.

At the end of substantial work, the agent should preserve verified decisions and discoveries in the right existing files, not dump an entire transcript into the repository.

It also distinguishes evidence states:

- Specified
- Implemented
- Automatically tested
- Independently reviewed
- Visually inspected
- Runtime verified
- Owner approved
- Unverified or blocked

A green unit test does not prove the UI works. A worker's confident message does not prove the task is complete. Progress is measured against acceptance criteria and evidence, not activity or elapsed time.

</details>

<details>
<summary><strong>05 · Conversational settings and Foundry lifecycle</strong></summary>

Manage Foundry through the same coding-agent conversation. There is no separate dashboard or configuration application.

Try requests like:

- "Show my Foundry settings."
- "Make reviews stricter."
- "Show available Foundry resources."
- "Update Foundry."
- "Check my Foundry setup."
- "Remove Foundry from this project."

The agent reads the manifest and settings specification, distinguishes defaults from explicit values, previews consequential edits, preserves unknown keys and user-owned files, and verifies changes.

[Settings specification](foundry/SETTINGS_SPEC.md) · [Management instructions](foundry/MANAGEMENT.md)

</details>

<details>
<summary><strong>06 · Model-aware task recommendations</strong></summary>

A mechanical edit, complex debugging investigation and security review do not need identical models.

Foundry's guidance evaluates task type, reasoning and coding needs, context, tools, risk, reliability, latency, cost and quota constraints. It should recommend the smallest model that clears the task's quality bar, explain uncertainty and require independent verification where risk warrants it.

Foundry does **not** ship a live universal model catalog, guarantee provider access or know current quotas. The consuming project owns its model roster and must verify availability.

</details>

<details>
<summary><strong>07 · Visual, graphics and performance QA</strong></summary>

Reusable practices for visual and graphics-heavy projects include:

- Graphics/rendering architecture and creative-direction roles.
- Visual regression and controlled before/after capture.
- Component isolation and property-wiring checks.
- Audio/input lifecycle checks.
- Performance profiling and soak testing.
- Hardware-specific validation with explicit environment limits.

These practices were informed by Rave Engine (Lively Wallpaper). Project-specific shaders, assets, renderer code and hardware thresholds stay in that project; they are not copied into Foundry's universal core.

</details>

<details>
<summary><strong>08 · Safe updates, ownership and removal</strong></summary>

An installation manifest records the source revision, selected resources, paths and content hashes. It is an ownership record, not permission to overwrite anything that looks familiar.

For updates and removal, the agent should detect local modifications, preview conflicts, preserve user-authored content, act only on approved Foundry-managed files and verify the result.

Foundry is not a sandbox. Host permissions and autonomous execution policies still matter.

</details>

## Compatible apps

Foundry targets coding agents that can read project context. Installation and maintenance additionally need appropriate file access.

| Host | Documented conventions | What to verify in your installed version |
|---|---|---|
| **OpenAI Codex** (CLI / app) | \`AGENTS.md\`, \`.agents/skills/\` | Skill discovery, app/CLI parity and delegation |
| **Claude Code** (CLI) | \`CLAUDE.md\`, \`.claude/skills/\`, \`.claude/agents/\` | Skill metadata, permissions, subagents and model overrides |
| **OpenCode** (CLI) | \`AGENTS.md\`, \`.agents/skills/\`, \`.opencode/commands/\` | Command discovery, agent definitions and model configuration |
| **Kilo Code / Kilo CLI** | \`AGENTS.md\`, supported shared skills and Kilo-specific configuration | Named agents, model catalog, session continuation and permissions |
| **Cline** | \`.clinerules\` and supported skill resources | Current rules, skills and workflow capabilities |
| **Other CLI agents** | Their documented project instruction and resource formats | Actual file discovery, tool access and delegation support |

These are adaptation conventions, not a claim that every host/version has passed end-to-end acceptance. A generated file is not proof that the host loads it.

<details>
<summary><strong>How do I use Foundry in each app?</strong></summary>

The interaction is the same: open the target repository in the app, paste the [setup prompt](#quick-start), review the plan and approve the proposed changes.

- **Codex:** open the repository as the active workspace. Ask Codex to initialise Foundry and review its project instructions and shared skills proposal.
- **Claude Code:** start Claude Code from the target project. Review the CLAUDE.md pointer, skills and optional agent definitions.
- **OpenCode:** open the project root in the active session. Review AGENTS.md, skill and command mappings against your configuration.
- **Kilo:** open the target project in Kilo. Confirm which agent, skill and command formats your installed version supports.
- **Cline:** open the target repository as your VS Code workspace. Review the .clinerules pointer and supported resources.
- **Other CLI agents:** use the host's normal project/workspace mode. If it can read but not write files, request a plan and apply approved changes through a host with file access.

Do not paste the setup prompt into a chat that is not connected to the target repository.

[Full host integration guide](integrations/README.md)

</details>

## Token impact

Foundry has a token cost. Every instruction or skill a host includes in a model request consumes input tokens. A file stored in the repository costs nothing until the host loads it.

| Design choice | Immediate effect | Possible task-level effect |
|---|---|---|
| Large always-loaded instructions | Higher recurring input tokens | May reduce repeated explanations, but can crowd out useful context |
| Compact core + selective skills | Small baseline; specialist context only when relevant, if host supports it | Less irrelevant context |
| One source of truth for project decisions | Short pointers may add tokens | Less repeated reconstruction and contradiction |
| Load every skill for every task | High recurring overhead | Usually wasteful |
| Structured assignments and acceptance criteria | Some coordination tokens | May reduce ambiguity and rework |

**The target is not minimum prompt size. It is minimum total tokens and cost per accepted task.**

\`\`\`text
NET TOKEN SAVINGS (conceptual, not a benchmark)

  Repeated explanations avoided
+ Corrections and rework avoided
+ Context reconstruction avoided
- Foundry instructions loaded
- Extra coordination and verification
= Net task-level impact
\`\`\`

Foundry's intended design is progressive disclosure:

1. Compact core instructions.
2. The project's own source of truth.
3. Only the skill or workflow relevant to the current task.
4. Management guidance only when the user asks to manage Foundry.

Actual loading depends on the host. Some hosts inject files automatically; others load skills on demand or require explicit references. Foundry cannot force selective loading.

Measure **Foundry context overhead**, **correction/rework tokens**, **total tokens per accepted task**, and **actual provider cost** (including input/output rates and cached tokens). There is no published cross-model benchmark or fixed percentage saving yet. A fair benchmark must use the same tasks, host, model, acceptance criteria and cache conditions, and count failed attempts as well as successful ones.

## Contribute

Have you built a useful set of instructions, a Claude skill, a Codex workflow, OpenCode commands, Kilo agent profiles, review checklists, settings or templates? Those may be useful to other people.

Say **"I'd like to contribute"** or simply **"contribute"** in a project where Foundry is installed.

<details>
<summary><strong>What happens when I say “contribute”?</strong></summary>

The agent scans only accessible project context, compares candidate resources with the Foundry registry, excludes secrets/private data/project-specific state, and shows a numbered shortlist with type, portability, maturity, value and suggested destination.

It then asks one focused question about the strongest candidate. It drafts only what you select. Nothing is committed, uploaded or published without separate approval.

Example:

**Agent:** "I found a reusable onboarding checklist, a review rubric that overlaps with an existing Foundry resource, and a Kilo-specific agent setup. The onboarding checklist looks like the strongest new contribution. Should I generalise it into a portable skill and keep the Kilo-specific parts separate?"

The scan cannot access other chats, global account settings or external services unless the host makes those sources available.

[Contribution discovery skill](skills/contribution-discovery/SKILL.md) · [Contribute command](commands/contribute.md) · [Contribution guide](CONTRIBUTING.md)

</details>

## Find your way around the codebase

<details>
<summary><strong>Repository map and documentation index</strong></summary>

\`\`\`text
Agent-Foundry/
├── core/             Compact baseline instructions
├── standards/        Engineering, safety and evidence rules
├── skills/           Detailed task procedures
├── commands/         User-facing request contracts
├── workflows/        Multi-step processes and quality gates
├── profiles/         Specialist responsibilities
├── templates/        Reusable output and state formats
├── integrations/     Host conventions and limitations
├── foundry/          Conversational management and settings
├── registry/         Machine-readable resource catalog
├── bootstrap/        First-install assessment
└── docs/
    ├── architecture/ Design boundaries and architecture
    ├── audit/        Source inventory and provenance
    └── standards/    Resource authoring guidance
\`\`\`

| Looking for... | Open... |
|---|---|
| First installation | [BOOTSTRAP.md](BOOTSTRAP.md) |
| Full user guide | [docs/USER_GUIDE.md](docs/USER_GUIDE.md) |
| Core agent instructions | [core/GLOBAL_INSTRUCTIONS.md](core/GLOBAL_INSTRUCTIONS.md) |
| A particular resource | [registry/resources.yaml](registry/resources.yaml) |
| Host integration | [integrations/README.md](integrations/README.md) |
| Orchestration boundaries | [ORCHESTRATION_PORTABILITY.md](docs/architecture/ORCHESTRATION_PORTABILITY.md) |
| Settings and management | [foundry/](foundry/) |
| Resource authoring | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Security policy | [SECURITY.md](SECURITY.md) |
| Support | [SUPPORT.md](SUPPORT.md) |
| Change history | [CHANGELOG.md](CHANGELOG.md) |

GitHub also generates a heading outline for this README. Use it to jump directly to a section without scrolling through the page.

</details>

> [!IMPORTANT]
> Agent Foundry does not grant tools, permissions, filesystem/network access, subagent spawning or model routing. It is not a sandbox. The host's real version and configuration determine what works. Documented compatibility is not runtime verification.

---

<div align="center">

**The right context, at the right time. Not every instruction in every prompt.**

[Quick start](#quick-start) · [Feature menu](#feature-menu) · [Contribute](#contribute) · [Changelog](CHANGELOG.md)

</div>
