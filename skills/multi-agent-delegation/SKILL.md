---
id: multi-agent-delegation
name: Accountable Multi-Agent Delegation
type: skill
version: 0.1.0
portability: adaptable
status: draft
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    ref: foundation/final-trader-architecture
    path: AGENTS.md
    inspected_at: 2026-11-19
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: PROGRESS.md
    inspected_at: 2026-11-19
---

# Accountable Multi-Agent Delegation

## Purpose

Delegate bounded work to specialists while preserving lead-agent accountability, integration quality, checkpoints, and independent verification.

## Trigger

Use when a task is substantial, specialised, parallelisable, or benefits from independent review. Do not delegate trivial work merely to satisfy a quota.

## Preconditions

- The lead agent understands the overall objective and acceptance criteria.
- The host tool actually supports the intended delegation mechanism.
- Available agents/models and their capabilities are known or explicitly marked unknown.
- File ownership can be separated to reduce concurrent edit conflicts.

## Procedure

1. **Classify the task.** Apply the task dimensions and workload classes in [Task-Aware Model Delegation](../../docs/architecture/MODEL_DELEGATION.md): task type, reasoning depth, scope, context demand, tool complexity, risk, uncertainty, verification burden and latency sensitivity.
2. **Select from the owner-defined roster.** Read `.agent-foundry/settings/model-roster.yaml` when present. Filter by hard requirements and owner constraints, then choose the smallest/fastest model that clears the task's quality floor. Do not choose by parameter count, provider marketing or a `flash` label alone. If no roster exists, ask the owner or provide a transparent recommendation without claiming automatic routing.
3. **Partition work.** Give each worker a narrow objective, explicit allowed paths, non-goals, deliverables, dependencies, acceptance criteria, tests, and reporting expectations.
4. **Assign file ownership.** Prefer non-overlapping write scopes. Use read-only assignments for research and independent review.
5. **Persist the assignment.** Give it a stable ID and record status, owner, model/provider where relevant, checkpoint, and output location.
6. **Probe the worker.** Verify the worker responds and that its tools/access match the assignment before relying on it.
7. **Collect structured handoffs.** Require files inspected/changed, implementation summary, exact checks and outcomes, risks, unresolved questions, and next actions.
8. **Integrate centrally.** The lead reconciles interfaces, architecture, conflicting changes, and documentation.
9. **Review independently.** A reviewer should receive requirements and deliverables, not the implementer's conclusions. Ask it to find unsupported claims, missing dependencies, weak tests, contradictions, security gaps, and unnecessary complexity.
10. **Verify final state.** The lead inspects the integrated diff and runs the final required checks.

## Assignment contract

Every meaningful assignment should include:

- Unique assignment ID and parent task ID
- Assigned role and objective
- Explicit scope and outside-scope
- Required expertise and complexity
- Task class, intensity dimensions and risk gate
- Model/provider selection from the owner-defined roster and rationale, when the host exposes these
- Context and source-of-truth documents
- Expected output format and destination
- Acceptance criteria and required tests
- Dependencies and file ownership
- Deadline/checkpoint expectations
- Retry/recovery policy
- Reporting and handoff requirements

## Recovery procedure

When a worker fails, times out, exhausts quota, loses its session, or returns incomplete work:

1. Identify the failed assignment and reason.
2. Retrieve its last output and durable checkpoint.
3. Inspect created/modified files and preserve completed work.
4. Record exact remaining work and unresolved questions.
5. Check whether the original worker is available; otherwise select a suitable replacement.
6. Give the replacement the original assignment, completed work, remaining work, relevant files, tests, and checkpoint.
7. Explicitly instruct it to resume from the last verified state.
8. Verify the result against the original acceptance criteria.

Do not silently discard the task, overwrite partial work, or pretend an interrupted task completed. Use bounded retries; the Dhan source recommends a default maximum of three, which should be configurable per environment.

## Accountability

Delegation never transfers responsibility. The lead agent remains accountable for correctness, architecture, integration, safety, and final verification.

## Portability and safety

- Do not assume every host supports subagents, per-agent model selection, quota inspection, task resumption, or persistent checkpoints.
- Do not assume every host can route models automatically. If model selection is unavailable, surface the recommendation to the owner.
- Model roster entries and capability ratings must be user-defined and evidence-backed; do not hardcode a universal provider/model list.
- State unsupported capabilities honestly.
- A project's free-only model policy is a project-level constraint, not a universal default.
- Do not evade quotas, rotate keys to bypass limits, or silently enable paid fallback when a project forbids it.
- Do not commit, push, merge, deploy, or perform destructive actions without the required owner authorization.

## Completion criteria

- Assignments are bounded and have explicit acceptance criteria.
- File ownership and dependencies are clear.
- Checkpoints survive worker interruption.
- Handoffs contain verifiable evidence.
- Lead integration and final verification are complete.
- Independent review has challenged the work rather than merely endorsed it.
