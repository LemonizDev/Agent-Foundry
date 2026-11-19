# Agent Foundry User Guide

This guide is for developers using Agent Foundry in a real project. It explains the intended operating model, the commands, how context is maintained, how model delegation works, and how to adopt Foundry without rebuilding an existing codebase.

> **Capability note:** Agent Foundry is currently a resource library and documented operating system. Native command adapters, automatic model routing, the installer, and chat-closing APIs are not yet implemented across supported hosts. A command contract describes intended behaviour; it is not proof that every host can execute it natively.

## 1. What problem does Agent Foundry solve?

An AI coding agent starts each project with incomplete knowledge. Even when it can read source files, it may not know:
- which files are authoritative;
- what the project is trying to achieve;
- how much autonomy it has;
- how work should be divided between agents;
- which model is suitable for a particular task;
- what evidence is required before declaring work complete;
- which decisions and user preferences should survive the end of a chat.

Without an explicit operating model, every new session spends time rediscovering these things. Different agents may also follow different practices, repeat failed approaches, overwrite useful context, or report activity as progress.

Agent Foundry packages reusable engineering practices and gives the project a consistent way to invoke them.

It is not a coding model, IDE, agent host, project-management replacement, or guarantee of correct output. The host still supplies the model, tools, permissions and execution environment. Foundry supplies the methods, context structure, command contracts and quality gates.

## 2. How the parts fit together

Think of the system as a small set of layers:

- **Project context** describes this particular product: purpose, architecture, constraints, current state and owner decisions.
- **Core instructions** tell every coding agent the small set of rules it must always follow.
- **Commands** are user-facing entry points such as `/close` or `/progress-report`.
- **Skills** contain the detailed procedure behind a command or task.
- **Workflows** coordinate multiple skills and agents across a sequence of work.
- **Profiles** define specialist responsibilities.
- **Model roster and settings** describe which models the owner has available and what they are good at.
- **Integrations** adapt these portable definitions to the syntax and capabilities of a particular agent host.

A command does not need to contain its entire procedure. It should route to a skill or workflow, which in turn references the project context and relevant standards.

## 3. Typical lifecycle

```mermaid
flowchart TD
    A[Open an existing or new project] --> B[Inspect project and existing instructions]
    B --> C[Build a project capability assessment]
    C --> D[Recommend relevant Foundry resources]
    D --> E{Owner approves plan?}
    E -- No --> F[Revise plan or stop safely]
    E -- Yes --> G[Install selected resources additively]
    G --> H[Verify files, links, host compatibility]
    H --> I[Work on project using commands and skills]
    I --> J[Close session: extract durable learnings]
    J --> K[Update appropriate context files]
    K --> L[Next session reads current project context]
    L --> I
```

The goal is continuity without accumulating a transcript dump. The agent should preserve decisions and lessons that will change future work, not every conversation detail.

## 4. Initialising a project

### CLI installation

The initial CLI requires Node.js 20 or newer. From the target project root, run:

```bash
npx --yes --package github:LemonizDev/Agent-Foundry agent-foundry init
```

This inspects the project and prints a read-only installation plan. To apply the plan after reviewing it, run the same command with `--apply`. The CLI asks for explicit confirmation. Use `agent-foundry inspect` to view detected capabilities, `agent-foundry validate` to check an installation, `agent-foundry update` to update unchanged Foundry-owned files, and `agent-foundry uninstall --confirm` to remove Foundry-owned resources while preserving locally modified resources and owner settings.

The CLI is an initial implementation. It currently installs a generic AGENTS.md pointer, not native slash-command adapters for every host. See [BOOTSTRAP.md](../BOOTSTRAP.md) for the full procedure and limitations.



Use the instructions in [BOOTSTRAP.md](../BOOTSTRAP.md). The agent should inspect the project before proposing any changes.

The setup should work for:
- a brand-new repository with no agent instructions;
- an existing repository with AGENTS.md or another agent entrypoint;
- a mature repository with extensive documentation and established conventions;
- a project already using another agent framework;
- a project that already has some Foundry resources installed.

The agent must not assume that the target project needs every resource. It should detect equivalents, conflicts and gaps, then propose an additive installation.

### What the owner should see

Before any write, the owner should receive:
1. a short description of the project type detected;
2. existing instruction and context files discovered;
3. resources recommended, with a reason for each;
4. existing files that will be preserved;
5. proposed new files and any additive edits;
6. unsupported host capabilities and uncertainties;
7. the Foundry version and source revision.

The owner approves the plan before installation.

## 5. Choosing an installation preset

The CLI offers a few starting points. These are resource bundles, not rigid project architectures:

| Preset | Intended use |
|---|---|
| auto | Recommended default: autonomous-engineer baseline, plus visual QA resources when graphics/rendering signals are detected |
| minimal | Compact instructions, state management and evidence basics |
| balanced | Common engineering skills and commands without the full multi-agent campaign layer |
| autonomous-engineer | Delegation, model-aware assignments, campaign workflow, recovery and quality controls |
| visual-engineer | Autonomous-engineer baseline plus graphics, visual regression and performance QA resources |
| research-engineer | Research-oriented baseline with privacy-safe evidence and synthesis practices |

The scanner uses repository structure and manifest signals. These are heuristics, not a deep semantic understanding of the product. Review the installation plan and adjust the preset or explicit resource list before applying it.

## 6. Working with commands

Commands are named requests. Their exact invocation syntax depends on the host adapter. The portable contracts in `commands/` describe intent and behaviour.

Current command concepts include:

| Command | What it does |
|---|---|
| `/progress-report` | Produces an evidence-backed report of project or milestone progress |
| `/teach-implementation` | Explains a completed change in accessible language |
| `/close` | Consolidates durable session learnings into the right project context files |
| `/settings` | Shows and edits the project's Foundry preferences |
| `/models edit` | Opens the user-defined model delegation roster for editing |
| `/audit` | Audits repository structure and engineering capability gaps |
| `/implement` | Executes an approved implementation plan |
| `/debug` | Investigates a reproducible failure and its root cause |
| `/review` | Performs an independent findings-first review |
| `/verify` | Checks acceptance criteria against evidence |
| `/delegate` | Creates a bounded, model-aware assignment |
| `/next-task` | Selects the next high-value engineering action |
| `/project-health` | Assesses project health across multiple dimensions |
| `/resume` | Reconciles interrupted work and resumes from verified state |

A host that cannot register native slash commands can expose the same contracts as prompt shortcuts, named workflows, skills or documented natural-language triggers. Do not tell the owner a slash command is installed unless it actually is.

## 7. The close-session command

Use `/close`, `/close session` or `/close chat` when the useful work in a conversation is finished.

The command does not create a generic handoff document by default. It reviews the session for durable information and updates the existing source of truth:
- project purpose or requirements → product vision/context;
- architecture decisions → architecture document or decision register;
- stable owner preferences → owner context/preferences;
- implementation conventions → AGENTS.md or engineering standards;
- newly learned failure modes → relevant skill, runbook or troubleshooting guide;
- current milestone state → progress/roadmap;
- completed work → changelog;
- model capabilities or availability → model roster, with evidence and date.

Transient debugging output, emotional statements, speculation, repeated information and unverified claims are not durable learnings.

The agent must show a concise change summary, preserve history where appropriate, and verify edits. It must not close or claim to close the actual chat unless the host exposes a supported chat-control API. In most environments the command means “prepare this session to be safely ended”; the user closes the UI themselves.

See [Close Session](../commands/close-session.md) and the [session-close workflow](../workflows/session-close.md).

## 8. Model delegation and the model roster

Foundry does not ship a fixed universal list of model names. Providers, free tiers, model IDs, quotas and capabilities change. The project owner defines the available roster.

The router then:
1. classifies the task;
2. estimates its intensity and risk;
3. identifies required capabilities;
4. filters the owner-defined roster;
5. ranks eligible models against the task;
6. explains the selection and fallback;
7. records actual outcomes so the owner can update the roster.

A fast model is useful for latency-sensitive, bounded tasks. A smaller model can be ideal for simple mechanical work. Neither should be selected solely because it is cheap or labelled “flash”. High-impact architecture, security, data migrations and complex debugging require stronger reasoning and verification.

See [Model Delegation Architecture](architecture/MODEL_DELEGATION.md).

## 9. Keeping project context healthy

Do not put everything into AGENTS.md. Keep that file short enough to be read reliably. Link to the detailed project context and specialist resources.

A healthy project context normally includes:
- product vision and non-goals;
- architecture and important boundaries;
- current roadmap and progress;
- owner decisions and stable preferences;
- engineering and security constraints;
- operational runbooks where needed.

Each fact should have one authoritative home. Use references rather than copying the same rule into several files.

## 10. Updating an installation

A future installer will compare the installed manifest with a selected Foundry release. It must detect local edits, show a diff and request approval before replacing changed files.

Until the update engine is available, an agent must:
1. read the installed manifest and local files;
2. compare them with the requested Foundry revision;
3. identify locally modified resources;
4. present a proposed update plan;
5. update only after approval;
6. record the new revision and verification evidence.

## 11. Troubleshooting

**The host does not support slash commands.** Use the command contract as a natural-language instruction or install a verified host adapter.

**The host cannot spawn subagents.** Use the same assignment structure sequentially, or use an external orchestrator only if the owner has configured one.

**The host cannot choose a model per task.** The classifier can still recommend a model to the owner, but it must not claim automatic routing.

**The project already has extensive instructions.** Prefer integration and reconciliation. Do not replace them with Foundry defaults.

**A learning conflicts with an existing decision.** Do not silently rewrite the decision. Record the conflict and ask the owner to resolve it.

**A model's capability is unknown.** Mark it unknown and run a bounded evaluation before relying on it.

## 12. Current implementation status

The first CLI implementation now supports project inspection, a plan-first resource install, manifest/hash tracking, validation, conservative updates and safe uninstall. Unit tests and CI are included. Native host command adapters, automatic model dispatch, signed release provenance and a GUI remain unimplemented. Do not interpret the CLI as proof that every coding host exposes every Foundry command natively.
