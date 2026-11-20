<div align="center">

<img src="assets/agent-foundry-banner.svg" alt="Agent Foundry: reusable context and workflows for AI coding agents" width="100%" />

# Agent Foundry

### Your AI coding agent. Better context. Better habits. Less repeated work.

**A context-first toolkit for Codex, Claude Code, OpenCode, Kilo, Cline and other file-capable coding agents.**

[![CI](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/LemonizDev/Agent-Foundry/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.6.0-6478ff.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2ea44f.svg)](LICENSE)

[Get started](#get-started) · [Demo](#a-30-second-demo) · [Features](#feature-library) · [Compatible apps](#compatible-coding-agents) · [Token impact](#token-usage-and-efficiency) · [Contribute](#contribute-your-own-agent-setup)

</div>

---

> **The short version:** Agent Foundry is a reusable library of instructions, skills, workflows, commands, role profiles, settings and templates. Your existing coding agent reads the relevant files and does the work using its own tools. Foundry does not replace your agent, model, IDE or terminal.

## Start here

| You are... | Start with... |
|---|---|
| New to AI coding agents | [What it is](#what-agent-foundry-actually-is), then the [setup prompt](#get-started). |
| A Claude Code user | Use the setup prompt in Claude Code. See [compatibility](#compatible-coding-agents). |
| A Codex user | Use the setup prompt in Codex. Foundry uses portable project instructions and skills. |
| An OpenCode or Kilo user | Use the setup prompt in your CLI agent. Check host-specific caveats before enabling delegation. |
| Already have a large instruction/skill setup | Start with [conversational management](#feature-library), or use the contribute trigger. |
| Building a multi-agent workflow | Read [orchestration](docs/architecture/ORCHESTRATION_PORTABILITY.md). |
| Curious about token cost | Read [Token usage and efficiency](#token-usage-and-efficiency). |
| Want to help improve Foundry | Read [Contribute your own agent setup](#contribute-your-own-agent-setup). |

<details>
<summary><strong>Documentation navigation</strong></summary>

| Topic | Canonical source |
|---|---|
| First installation | [BOOTSTRAP.md](BOOTSTRAP.md) |
| Full user guide | [docs/USER_GUIDE.md](docs/USER_GUIDE.md) |
| Host compatibility | [integrations/README.md](integrations/README.md) |
| Orchestration across CLI agents | [ORCHESTRATION_PORTABILITY.md](docs/architecture/ORCHESTRATION_PORTABILITY.md) |
| Context architecture | [CONTEXT_ARCHITECTURE.md](docs/architecture/CONTEXT_ARCHITECTURE.md) |
| Resource types and loading | [RESOURCE_MODEL.md](docs/architecture/RESOURCE_MODEL.md) |
| Task-aware model delegation | [MODEL_DELEGATION.md](docs/architecture/MODEL_DELEGATION.md) |
| Settings definitions | [SETTINGS_SPEC.md](foundry/SETTINGS_SPEC.md) |
| Conversational management | [MANAGEMENT.md](foundry/MANAGEMENT.md) |
| All reusable resources | [Resource registry](registry/resources.yaml) |
| Codebase map | [docs/README.md](docs/README.md) |
| Contribution guide | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Security | [SECURITY.md](SECURITY.md) |
| Support | [SUPPORT.md](SUPPORT.md) |
| Release history | [CHANGELOG.md](CHANGELOG.md) |

</details>

---

## What Agent Foundry actually is

AI coding agents are good at producing code. The harder part is getting them to work reliably inside a real project: understanding its architecture, respecting its rules, choosing the right amount of autonomy, coordinating specialists, verifying outcomes and remembering useful information after a session ends.

Agent Foundry gives your existing agent a **reusable operating layer** for that work.

It provides:
- A compact set of core instructions.
- Detailed skills for common engineering and research tasks.
- Commands that describe what a user-requested action should do.
- Workflows for multi-step work and multi-agent campaigns.
- Specialist role profiles for lead engineers, reviewers, graphics engineers and other roles.
- A small, explicit settings specification.
- Templates for assignments, decisions, reports, checkpoints and handoffs.
- Host-specific integration guidance for common coding agents.
- A contribution process that helps users turn their own reusable agent practices into community resources.

The project is **context-first**. The host agent is the interface, interpreter and executor. It reads the files, decides which resource is relevant, and uses its own repository, filesystem, shell, browser and subagent capabilities.

### What it is not

| Agent Foundry is... | Agent Foundry is not... |
|---|---|
| Reusable context and resource library | A new AI model |
| A project-aware set of procedures | An IDE or terminal replacement |
| A guide for host-native delegation | A subagent runtime or provider router |
| Conversationally managed through your agent | A separate dashboard or settings app |
| Designed for selective context loading | A giant prompt injected into every request |
| A way to improve process and continuity | A guarantee that generated code is correct |

**No CLI. No TUI. No MCP server. No daemon. No API. No dashboard. No separate installer.** There is no second application to keep alive or another runtime to debug. If a host cannot read or write project files, Foundry cannot magically grant it that ability.

## The problem it solves

Without shared project context, every new session can become a tiny archaeological expedition.

- The agent rediscovers the same architecture and conventions.
- Different agents follow different rules.
- You repeat preferences and project constraints.
- Delegated tasks lose their scope, owner or checkpoint.
- Model choice is based on habit instead of task requirements.
- Agents report activity instead of verified progress.
- Useful discoveries disappear into old chats.
- Existing instructions slowly conflict with new prompt files.

Foundry gives the project a compact source of truth and reusable procedures, while leaving the actual project architecture in the project.

## How it works

The setup is intentionally conservative. Foundry assesses first, recommends only useful resources, and waits for approval before making material changes.

    YOUR PROJECT + EXISTING AGENT
               |
               v
       READ-ONLY ASSESSMENT
       - instructions and rules
       - architecture and source
       - tests, CI and docs
       - host capabilities
               |
               v
       CAPABILITY / GAP MAP
       - already covered? keep it
       - authoritative elsewhere? link it
       - partial overlap? extend it
       - genuine gap? recommend a resource
               |
               v
       MINIMAL INSTALLATION PLAN
       - selected resources only
       - exact files and conflicts
       - source revision and ownership
               |
          OWNER APPROVES?
           /        \
         NO          YES
         |            |
         v            v
       STOP       ADDITIVE INSTALL
                      |
                      v
                VERIFY + RECORD
                      |
                      v
              USE ONLY WHEN RELEVANT

**Foundry should adapt to your project, not turn your project into Foundry.**

## Get started

1. Open the project you want to improve in your existing coding agent.
2. Give it the prompt below.
3. Let it inspect your repository and host conventions.
4. Review the resource and file-change plan.
5. Approve the changes you actually want.

Copy this prompt:

> Install Agent Foundry in this project from https://github.com/LemonizDev/Agent-Foundry. Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md first. Inspect my existing project, instructions, architecture, tests, documentation and the capabilities of this coding-agent host. Identify what I already have, what is missing and what should remain untouched. Recommend the smallest useful set of Foundry resources. Show me the exact files you would create or modify, explain conflicts and preserve my existing instructions and custom work. Do not copy the entire registry. Wait for my approval before writing anything.

The host needs access to the Foundry source and permission to read and write the target project. Some tools can fetch repositories directly; others may need the source opened or checked out through their normal workflow. The agent must report that limitation rather than pretending the install happened.

[Full bootstrap procedure](BOOTSTRAP.md) · [Initialization specification](bootstrap/INITIALIZE_PROJECT.md)

## A 30-second demo

This is an example of the intended conversation, not a claim that every host exposes the same slash-command UI.

**You:** "Set up Agent Foundry here. I already have AGENTS.md, a few skills and a custom review workflow."

**Agent:** "I found an existing project instruction file, 4 local skills and a review workflow. The local review workflow overlaps with Foundry's independent-review skill, so I recommend linking to yours and adding only the missing recovery and evidence templates."

**You:** "Show me what you'd change."

**Agent:** "Proposed: add a compact Foundry pointer to the existing instructions, add 2 selected resources and create a manifest. I will not replace AGENTS.md or copy the full registry. One conflict needs your decision: your review workflow requires approval before edits, while the Foundry default allows routine edits within an approved task."

**You:** "Keep my rule."

**Agent:** "Understood. Your project rule remains authoritative. Here are the exact files and the validation plan. Nothing has been written yet."

That is the intended experience: the agent reads the project, explains the tradeoff and gives the owner control instead of dumping a 40-file preset into the repository.

## Day-to-day use

Once the relevant resources are available to your host, talk to the agent naturally. A host may expose some command contracts as native slash commands; otherwise use the phrases below.

| You can ask... | What the agent should do |
|---|---|
| "Audit this repository." | Map architecture, instructions, quality controls, risks and evidence-backed gaps. |
| "Plan this feature before coding." | Define scope, dependencies, acceptance criteria and verification. |
| "Implement the approved plan." | Work in bounded steps and verify each meaningful change. |
| "Debug this failure." | Reproduce it, test hypotheses and isolate the root cause. |
| "Review this diff independently." | Challenge correctness, security, omissions and test quality. |
| "Verify the milestone." | Compare acceptance criteria with exact test/runtime evidence. |
| "Delegate the independent research and test work." | Create bounded assignments if the host actually supports delegation. |
| "Show campaign status." | Reconcile workers, states, blockers, checkpoints and evidence. |
| "Explain what you just implemented." | Teach the change, runtime behaviour, tradeoffs and failure modes. |
| "Close this session and preserve what matters." | Capture durable decisions and verified discoveries in the right project files. |
| "Show my Foundry settings." | Read actual values and explain defaults and overrides. |
| "Update Foundry." | Compare revisions, detect local edits and preview changes. |
| "I'd like to contribute." | Scan accessible project context for reusable resources and show a candidate shortlist. |

## Compatible coding agents

Foundry is designed for coding agents that can read project files and, when installation or maintenance is requested, write project files. The host determines context discovery, tool access, model selection, subagents and approval behaviour.

| Host / app | Context and resource conventions documented by Foundry | Important caveat |
|---|---|---|
| **OpenAI Codex** (CLI / app) | AGENTS.md, .agents/skills/ | Native skill discovery and multi-agent behaviour depend on the Codex version and environment. |
| **Claude Code** (CLI) | CLAUDE.md, .claude/skills/, .claude/agents/ | Verify frontmatter, skill discovery, subagent permissions and model overrides in your installed version. |
| **OpenCode** (CLI) | AGENTS.md, .agents/skills/, .opencode/commands/ and configured agents | Command discovery and agent/model configuration are version- and config-dependent. |
| **Kilo Code / Kilo CLI** | AGENTS.md, shared skills, .kilo/commands/ and supported agent definitions | Verify named-agent availability, model catalog, session continuation and permission mode. |
| **Cline** | .clinerules/ and supported skill resources | Verify the current release's skill, workflow and subagent support. |
| **Other CLI coding agents** | Their documented instruction, skill and agent formats | Use portable resources and adapt only after checking the host's real capabilities. |

**Compatibility is not the same as acceptance.** A path being documented, or a file being generated, does not prove the host loads it. Foundry's integration guide separates documented conventions from runtime verification. We do not claim every host/version has passed end-to-end tests.

[Read host integration details](integrations/README.md) · [Read orchestration portability](docs/architecture/ORCHESTRATION_PORTABILITY.md)

## Feature library

Every feature is expandable. Start with the title that matches the problem; you do not need to understand the internal resource taxonomy first.

<details>
<summary><strong>01 · Project-aware onboarding and integration</strong></summary>

Foundry inspects the target repository before recommending resources. It looks for existing instructions, project architecture, conventions, tests, CI, documentation, tools and host-specific files.

Each existing capability receives a disposition:

- **KEEP:** already does the job; leave it alone.
- **LINK:** keep the authoritative source and point to it.
- **EXTEND:** add only the missing behaviour.
- **INSTALL:** fill a genuine gap with a Foundry resource.
- **ADAPT:** translate a portable resource to the host's format.
- **DEFER:** insufficient evidence or a host limitation.
- **EXCLUDE:** irrelevant, unsafe, duplicative or project-specific.

It should show the exact files it proposes to create or modify and wait for approval before writing. Existing project instructions remain authoritative.

</details>

<details>
<summary><strong>02 · Reusable instructions, standards and skills</strong></summary>

Foundry separates short always-relevant rules from detailed procedures:

| Resource | What it does |
|---|---|
| Core instructions | Compact operating contract and pointers to relevant resources |
| Standards | Reusable rules for security, evidence, communication and context |
| Skills | Detailed procedures for audit, planning, debugging, review, testing and more |
| Commands | User-facing request contracts, exposed natively only where the host supports it |
| Workflows | Multi-stage procedures with phases, gates and handoffs |
| Profiles | Specialist responsibilities and boundaries, not fictional permissions |
| Templates | Assignment, decision, progress, campaign and recovery formats |
| Integrations | Host-specific context and resource conventions |

A command is the request. A skill is how to do the work. A workflow coordinates several procedures. A profile defines responsibility. A template standardises the output.

Browse the [resource registry](registry/resources.yaml). It is a discovery catalog, not a bundle that should be copied wholesale into every project.

</details>

<details>
<summary><strong>03 · Conversational Foundry management</strong></summary>

Manage Foundry inside the same coding-agent conversation. No separate dashboard or configuration app.

You can ask:
- "Show my Foundry settings."
- "Make reviews stricter."
- "Show available Foundry resources."
- "Update Foundry."
- "Check my Foundry setup."
- "Remove Foundry from this project."

The agent reads the manifest, settings and authoritative specification; distinguishes defaults from explicit values; previews consequential changes; preserves unknown keys, comments and user-owned files; and verifies the result.

Settings are intentionally limited. They cover review strictness, independent review for high-risk work, delegation policy and worker limits, session learning, documentation updates and the adapted profile.

[Settings specification](foundry/SETTINGS_SPEC.md) · [Management instructions](foundry/MANAGEMENT.md)

</details>

<details>
<summary><strong>04 · Multi-agent delegation and orchestration</strong></summary>

Foundry contains reusable delegation and campaign resources informed by the Dhan AI Trader and Rave Engine projects.

The portable orchestration pattern is:

    OWNER
      |
      v
    LEAD / ORCHESTRATOR
      | frames goal, scope and acceptance
      +----------+-----------+
      |          |           |
      v          v           v
    WORKER A  WORKER B   INDEPENDENT
    bounded   bounded    REVIEWER
      |          |           |
      +----------+-----------+
                 |
                 v
          LEAD INTEGRATION
          - inspect changes
          - reconcile interfaces
          - run integrated checks
                 |
          +------+------+
          |             |
        PASS          FAIL
          |             |
          v             v
       COMPLETE    RECOVER / REWORK

Included resources:
- skills/multi-agent-delegation/SKILL.md
- workflows/multi-agent-campaign.md
- templates/delegation-assignment.md
- templates/recovery-handoff.md
- templates/campaign-state.md
- commands/campaign-status.md
- profiles/lead-engineer.md
- profiles/independent-reviewer.md

The model-selection method considers task type, reasoning, coding, context, tools, risk, reliability, latency, cost and quota. It should prefer the smallest model that clears the quality floor, not the biggest model by parameter count.

**Important:** Foundry does not spawn agents, route providers, inspect live quotas or switch models by itself. Codex, Claude Code, OpenCode, Kilo or another host must expose the relevant capability. If it cannot, Foundry gives the lead a bounded assignment and a manual fallback rather than pretending dispatch occurred.

[Orchestration portability guide](docs/architecture/ORCHESTRATION_PORTABILITY.md)

</details>

<details>
<summary><strong>05 · Model-aware task recommendations</strong></summary>

Not every task needs the strongest available model. A symbol lookup, mechanical edit, complex debugging investigation and security review have different quality requirements.

Foundry's delegation guidance classifies task and risk, reads the project's owner-defined model roster when present, filters candidates against required capabilities and constraints, recommends a suitable model with a rationale, records uncertainty when availability is unknown, and requires independent verification where risk warrants it.

Foundry does not ship a universal model catalog or claim provider access. Model names, pricing and quotas change; the consuming project owns its roster and must verify current availability.

</details>

<details>
<summary><strong>06 · Persistent project context and session learning</strong></summary>

Foundry encourages one authoritative home for each durable project fact: product vision and requirements, architecture and decisions, current progress and active plan, engineering conventions and known failure modes, and operational procedures and environment caveats.

At the end of a substantial session, the agent should extract only durable, useful information and update the correct existing files. It should not dump a transcript, invent a generic handoff or preserve secrets and conversational filler.

The goal is to resume from verified project state, not from an agent's vague recollection of yesterday.

</details>

<details>
<summary><strong>07 · Evidence-based progress, review and verification</strong></summary>

Foundry distinguishes specified, implemented, automatically tested, independently reviewed, visually inspected, runtime verified, owner approved, unverified and blocked states.

Progress should be based on acceptance criteria and evidence, not agent activity, elapsed time or confident language. A green unit test does not prove a UI works. A process exit does not prove a delegated task is complete.

Resources include repository audit, implementation planning, debugging, testing and verification, code review, progress reporting, plan reconciliation and session recovery.

</details>

<details>
<summary><strong>08 · Visual, graphics and performance QA</strong></summary>

For visual or graphics-heavy projects, Foundry includes specialist profiles and reusable QA methods for graphics and rendering architecture, creative direction, visual regression and controlled before/after capture, component/layer isolation and property wiring, audio/input lifecycle checks, performance profiling and soak testing, and hardware-specific validation with explicit environment limits.

These patterns were informed by Rave Engine, a Lively Wallpaper project. Foundry does not copy its WebGL shaders, wallpaper assets, hardware thresholds or Lively-specific code into the universal core. Those remain project-specific.

</details>

<details>
<summary><strong>09 · Safe updates, ownership and removal</strong></summary>

An installation manifest records the source revision, selected resources, paths and content hashes. It is an ownership record, not permission to overwrite anything that happens to look familiar.

The agent should compare source revisions before updates, detect locally modified managed files, preview conflicts, preserve user-authored files and custom instructions, remove only approved Foundry-managed content, and verify the final state.

Foundry is not a security sandbox. Host permissions, filesystem access and autonomous execution policies still matter.

</details>

<details>
<summary><strong>10 · Contribute your own instructions, skills and settings</strong></summary>

You do not need to be a maintainer or write TypeScript to contribute. If you have built useful project instructions, a Claude Code skill, a Codex workflow, OpenCode commands, Kilo agent profiles, review checklists, settings or templates, Foundry can help identify what may be reusable.

In a project where the relevant files are accessible, say:

**"I'd like to contribute."**

The agent should scan accessible project instructions, skills, commands, workflows, profiles, settings, templates and relevant documentation; identify reusable practices and compare them with Foundry's registry; exclude secrets, personal data, confidential information and project-specific state; show a numbered shortlist with resource type, portability, maturity, value and suggested destination; ask one focused question about the best candidate; draft only what you select; and wait for approval before publishing or sending anything outside your project.

Example:

    YOU
    "I'd like to contribute."

    AGENT
    "I found three possible contributions:
     1. A project onboarding checklist (skill, adaptable, used in 4 projects)
     2. A structured review rubric (template, universal candidate)
     3. A Kilo-specific agent configuration (integration, host-specific)

     The review rubric overlaps with Foundry's reviewer profile.
     Your onboarding checklist looks like the strongest new resource.

     Should I generalise the checklist into a portable repository-audit
     skill, or preserve the Kilo-specific setup as an adapter?"

    YOU
    "Generalise the checklist. Keep the Kilo bits separate."

    AGENT
    "I'll draft the portable skill and a separate Kilo adapter proposal.
     No files will be published until you review the exact changes."

The scan is limited to sources the host can actually access. It does not grant access to other chats, global account settings or external services. Discovery is not publication consent.

[Contribution discovery skill](skills/contribution-discovery/SKILL.md) · [Contribute command](commands/contribute.md) · [Contribution guide](CONTRIBUTING.md)

</details>

## Token usage and efficiency

Agent Foundry has a token cost. Pretending otherwise would be marketing, not engineering.

Every instruction or skill that a host injects into a model's context consumes input tokens. The cost depends on what the host loads, how often it loads it, the model's tokenizer, prompt caching and provider pricing. A context file sitting in the repository costs nothing until the host includes it in a request.

### The trade-off

| Design choice | Immediate token effect | Possible task-level effect |
|---|---|---|
| Add a large always-loaded instruction file | Higher input tokens on every request | May reduce repeated explanations, but can crowd out relevant context |
| Keep a compact core and link specialist skills | Small baseline; extra tokens only when relevant, if the host supports selective loading | Better context focus and lower irrelevant overhead |
| Store project decisions once and point to them | May add a short pointer | Less repeated reconstruction and contradiction |
| Load every skill for every task | High recurring input overhead | Usually wasteful; irrelevant instructions can dilute useful context |
| Use structured assignments and acceptance criteria | Some additional context per delegated task | May reduce rework, ambiguity and corrective exchanges |
| Use a smaller model for bounded work | Depends on model tokenizer and prompt format | Can lower cost, but only if it meets the task's quality floor |

### How to think about net token impact

    NET TOKEN SAVINGS
      = repeated explanations avoided
      + correction / rework tokens avoided
      + unnecessary context reconstruction avoided
      - Foundry context loaded
      - extra coordination and verification context

This is a model of the trade-off, not a measured performance claim. A Foundry installation can increase token consumption if it adds redundant or always-loaded instructions. More context is not automatically better.

### The design target

Foundry uses progressive disclosure:

    EVERY REQUEST
        |
        +--> compact core instructions
        |
        +--> project-specific source of truth
        |
        +--> only the skill / workflow needed now
        |
        +--> management guidance only for Foundry requests

This is the intended context shape. Actual loading depends on the host: some tools automatically include files, some load skills on demand, and some require explicit references. Foundry cannot force a host to implement selective loading.

### What should be measured

| Metric | Meaning |
|---|---|
| Foundry context overhead | Input tokens added by always-loaded Foundry instructions |
| Task context tokens | Relevant project context and specialist resources loaded for a task |
| Correction/rework tokens | Extra tokens spent fixing misunderstandings, repeated explanations and avoidable mistakes |
| Total tokens per accepted task | Input + output tokens spent to reach a result that meets acceptance criteria |
| Cost per accepted task | Actual provider cost, accounting for input/output rates and cached tokens |

**The important metric is total tokens and cost per successfully completed task, not the size of the system prompt in isolation.**

Foundry does not currently publish a cross-model token benchmark or claim a fixed percentage reduction. Token counts and pricing are host/provider-specific. A meaningful benchmark must compare the same tasks, acceptance criteria, model, host, context and cache conditions with and without Foundry. Results should include failed attempts and rework, not just the first prompt.

## How the repository is organised

You should not need to wander through the whole repo to find one useful file.

    Agent-Foundry/
    |
    +-- core/             Compact baseline instructions
    +-- standards/        Reusable engineering and safety rules
    +-- skills/           Detailed task procedures
    +-- commands/         User-facing invocation contracts
    +-- workflows/        Multi-stage processes and quality gates
    +-- profiles/         Specialist role definitions
    +-- templates/        Reusable output and state formats
    +-- integrations/     Host-specific conventions and limitations
    +-- foundry/          Conversational management + settings
    +-- registry/         Machine-readable resource catalog
    +-- bootstrap/        First-install assessment and initialization
    +-- docs/
        +-- architecture/ Architecture and design boundaries
        +-- audit/        Source inventory and extraction provenance
        +-- standards/    Resource authoring standards

| If you want to... | Go to... |
|---|---|
| Understand the product | README.md |
| Install Foundry in a project | BOOTSTRAP.md, bootstrap/ |
| Find a resource by type | registry/resources.yaml |
| Read core operating instructions | core/GLOBAL_INSTRUCTIONS.md |
| Find a skill | skills/{skill-name}/SKILL.md |
| Find a user-facing command | commands/ |
| Understand a multi-step workflow | workflows/ |
| Find a specialist role | profiles/ |
| Find a reusable report/state format | templates/ |
| Check host-specific file conventions | integrations/README.md |
| Understand orchestration limits | docs/architecture/ORCHESTRATION_PORTABILITY.md |
| Manage Foundry settings and lifecycle | foundry/ |
| Understand why a resource exists | docs/audit/ |
| Find the documentation index | docs/README.md |

The registry is the catalog. The resource file is the procedure. The docs index is the navigation map. Avoid creating competing copies of the same authoritative instructions.

## Contribute your own agent setup

Foundry gets better when people share methods that have survived real use. Good contributions include clear project instructions, reusable task skills, review and testing checklists, host-specific adapters backed by tested behaviour, templates for decisions/reports/recovery, settings that control behaviour the host can actually support, and lessons from debugging, orchestration, security and visual QA.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). You can also use the contribute trigger in an installed Foundry context to discover candidate material from your accessible project files.

## Safety and honest limitations

- Foundry does not grant tools, filesystem access, network access or permissions.
- Foundry does not spawn subagents or dispatch models.
- Foundry does not guarantee that a host discovers every generated resource.
- Foundry is not a sandbox and does not make autonomous execution safe by itself.
- The host's actual version and configuration determine what works.
- Project-specific instructions and owner decisions remain authoritative.
- Sensitive information, credentials, personal data and private project state must not be contributed.
- Repository checks validate structure and consistency; they do not prove every host behaves correctly.

## Project status

**Context-first baseline: 0.6.0.** The repository is being developed as a resource library and host-adaptable context system. Host acceptance remains a separate evidence requirement. A documented integration is not automatically a verified integration, and this README does not claim a universal runtime.

For current changes, see [CHANGELOG.md](CHANGELOG.md). For implementation and extraction provenance, see [the audit index](docs/README.md).

---

<div align="center">

**Give your agent the right context, not the entire internet in its system prompt.**

[Get started](#get-started) · [Explore resources](registry/resources.yaml) · [Contribute](CONTRIBUTING.md)

</div>
