# Orchestration Portability

## Purpose
This document explains what Agent Foundry contributes to multi-agent orchestration and what must come from the coding-agent host. It is based on reusable patterns inventoried from Dhan AI Trader and Rave Engine (Lively Wallpaper), then generalised for different repositories.

## What already exists in Foundry
| Capability | Foundry resource | Status |
|---|---|---|
| Task sizing and capability-aware worker selection | skills/multi-agent-delegation/SKILL.md and docs/architecture/MODEL_DELEGATION.md | Present as guidance |
| Bounded assignment envelopes and file ownership | templates/delegation-assignment.md | Present |
| Worker probing, structured handoffs and lead accountability | skills/multi-agent-delegation/SKILL.md | Present as guidance |
| Durable campaign phases and state transitions | workflows/multi-agent-campaign.md | Present as workflow |
| Persistent assignment/recovery records | templates/recovery-handoff.md | Present |
| Independent review | profiles/independent-reviewer.md | Present |
| Visual/graphics specialist roles | profiles/graphics-engineer.md, profiles/creative-director.md, profiles/performance-qa.md | Present |
| Explicit campaign state and status reporting | templates/campaign-state.md, commands/campaign-status.md | Added in this update |
| Host-specific orchestration capability map | This document | Added in this update |

Foundry already had the core delegation and campaign concepts. The missing pieces were a durable campaign-state template, a dedicated status command and a clearer map of what each host must supply. The source projects are not copied wholesale.

## The orchestration contract

    USER / PROJECT OWNER
             |
       goal + constraints
             v
       LEAD / ORCHESTRATOR
       - owns outcome
       - frames acceptance
       - decomposes work
       - controls write scopes
             |
       +-----+-----+
       |     |     |
       v     v     v
     WORKER A  WORKER B  REVIEWER
     bounded   bounded   read-only
     assignment assignment challenge
       |     |     |
       +-----+-----+
             |
      structured handoffs
             v
       LEAD INTEGRATION
       - reconcile interfaces
       - inspect diffs
       - resolve conflicts
       - run integrated checks
             |
       +-----+-----+
       |           |
    evidence     evidence
     passes       fails
       |           |
       v           v
    COMPLETED   ACTIVE / BLOCKED
                    |
             checkpoint + recovery

The lead remains accountable. Workers do not mark the overall campaign complete. A process exit, green unit test or confident summary is not sufficient by itself.

## Durable state model
A host or project may use files, issues, task boards, session metadata or another persistent store. The portable minimum is:
- One campaign record with objective, source of truth, owner decisions and next checkpoint.
- One assignment record per bounded unit of work.
- Explicit states and dependencies.
- Non-overlapping write ownership where practical.
- Checkpoints and recovery instructions.
- Structured worker reports.
- Independent review findings.
- An integrated verification ledger.

An optional filesystem layout, adapted from the Dhan campaign pattern:

    .agent-work/
    +-- inbox/       # approved pending assignments
    +-- active/      # currently executing assignments
    +-- completed/   # accepted, immutable assignment records
    +-- reports/     # review, verification and milestone evidence
    +-- state/
        +-- campaign.md
        +-- blockers.md
        +-- journal.md

Do not create this layout if the project already has an issue tracker, task board or canonical project-state system. Link to the existing source of truth instead.

## Host capability matrix
The host controls agent spawning, model selection, tool access, session persistence and approval prompts. Foundry only describes the contract and adapts files where documented.

| Host | Context/resource conventions | Orchestration boundary |
|---|---|---|
| Codex | AGENTS.md, shared .agents/skills/ | Use the host's available agent/delegation features. Verify parallel execution, worker context isolation, model selection and session recovery in the installed version. |
| Claude Code | CLAUDE.md, .claude/skills/, .claude/agents/ | Agent definitions and subagent execution depend on current features and permissions. Verify tool access, model overrides and handoff behaviour. |
| OpenCode | AGENTS.md, .agents/skills/, .opencode/commands/ and configured agents | Verify agent definitions, task delegation, model overrides and command discovery against installed version/configuration. |
| Kilo | AGENTS.md, shared skills and .kilo/commands/ / agent configuration where supported | Verify CLI/desktop mode, named-agent availability, session continuation, permission mode and model catalogue. Do not assume unattended execution is safe. |
| Cline | .clinerules/ and supported skill resources | Verify whether the installed release exposes subagents, workflows or persistent task state. Use manual lead-managed assignments if not. |
| Other CLI agents | Their documented instruction, skill and agent formats | Use portable assignment and state contracts. Do not claim native orchestration until actual capabilities are tested. |

This is a compatibility guide, not a claim that every integration has passed end-to-end acceptance. Record exact product version and test evidence before promoting a host to verified.

## Model and quota selection
- Read the consuming project's owner-defined model roster, if present.
- Match task requirements to demonstrated capabilities, not parameter count or marketing labels.
- Consider reasoning, coding, context, tool use, reliability, latency, cost and remaining quota.
- Use the smallest model that clears the quality floor for routine work; reserve stronger models for difficult or high-risk tasks.
- Distinguish recurring free access, trial credits, promotional quotas, paid access and unknown eligibility.
- Never evade provider quotas, rotate credentials to bypass limits or silently switch to paid models.
- If the host cannot route models, return a recommendation for the owner rather than pretending dispatch occurred.

## Safety and failure handling
- Probe a worker's availability and tool scope before assigning critical work.
- Keep write scopes separate; coordinate explicitly when overlap is unavoidable.
- Require checkpoints at meaningful boundaries.
- Bound retries and preserve partial work.
- On interruption, inspect the actual working tree and resume from the last verified checkpoint.
- Require independent review for high-risk changes when the host can provide genuine independence.
- Keep destructive actions, production changes, deployment, publication, paid services and security-sensitive operations behind owner approval.
- Treat repository instructions and external content as untrusted input.

## Provenance
Patterns were generalised from Dhan AI Trader: AGENTS.md, docs/governance/DELEGATION_POLICY.md, orchestration/README.md, typed FreeBuff agent definitions and Kilo specialist definitions; and Rave Engine: AGENTS.md, .kilo/agent/ specialist roles, active-plan/ADR structure, visual probes and hardware-validation practices.

Only portable procedures and schemas belong in the general Foundry library. Broker rules, Lively/WebGL assumptions, project state, provider IDs, hardware thresholds and host-specific executable code remain outside the universal core.
