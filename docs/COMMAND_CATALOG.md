# Command Catalog

This catalog maps Agent Foundry's portable command contracts to the work a project owner is trying to accomplish. The files in `commands/` remain canonical for invocation, permissions, procedure and acceptance criteria.

> A Markdown command contract is not automatically a native slash command. A host adapter and actual host testing are required before native discovery or invocation can be claimed.

## How the commands fit together

### 1. Understand the project

| Command | Use it to | Default permission |
|---|---|---|
| `/audit` | Map repository structure, architecture, conventions, quality controls and gaps | Read-only |
| `/project-health` | Assess delivery health, evidence gaps and material risks | Read-only |

### 2. Decide what to do next

| Command | Use it to | Default permission |
|---|---|---|
| `/next-task` | Select the single highest-value next action | Read-only |
| `/delegate` | Create bounded assignments and assess dispatch eligibility | Planning; dispatch requires support and authorisation |
| `/models explain` | Explain task classification, eligible models, recommendation and trade-offs | Read-only |

### 3. Execute and diagnose

| Command | Use it to | Default permission |
|---|---|---|
| `/implement` | Deliver an approved, bounded change | Approved-scope writes |
| `/debug` | Reproduce a failure, isolate root cause and implement a justified fix | Read first; fix after cause is established |

### 4. Verify quality

| Command | Use it to | Default permission |
|---|---|---|
| `/verify` | Check acceptance criteria against explicit evidence | Read-only by default |
| `/review` | Find defects, regressions and unsupported claims | Read-only |
| `/models test` | Run a bounded model evaluation where supported | Explicit cost and execution approval |

### 5. Track work and end sessions

| Command | Use it to | Default permission |
|---|---|---|
| `/campaign-status` | Reconcile assignments, checkpoints, blockers and verification | Read-only unless state maintenance is requested |
| `/progress-report` | Report goal versus today, progress method, workstreams, evidence and next step | Read-only |
| `/resume` | Recover interrupted work from actual repository state | Read-only reconciliation first |
| `/done` | End a productive session, preserve durable context and curate reusable artefacts | Approved project-local context/resource updates |
| `/close` | Legacy compatibility alias for `/done` | Same as `/done`; no separate procedure |
| `/teach-implementation` | Explain a completed change and its behavioural difference | Read-only |

**Important:** `/done` is the unified session-ending operation. It preserves durable project learning and separately evaluates reusable artefacts. If nothing qualifies, it rejects resource extraction and writes no empty placeholder. `/close`, `/close session` and `/close chat` are deprecated aliases for the same procedure, not a separate context-only workflow.

### 6. Manage Agent Foundry

| Command | Use it to | Default permission |
|---|---|---|
| `/settings` | Inspect and change Foundry project settings | Approved configuration edits |
| `/models edit` | Maintain the owner-controlled model roster | Proposed configuration edit |
| `contribute` | Discover reusable project resources and draft selected contributions | Read-only discovery; external publication requires separate approval |

## Command-to-template map

| Command | Canonical presentation |
|---|---|
| `/audit` | `templates/repository-audit-report.md` |
| `/implement` | `templates/implementation-plan.md` |
| `/debug`, `/review`, `/project-health` | `templates/diagnostic-report.md` |
| `/verify`, `/models test` | `templates/verification-report.md` |
| `/delegate` | Existing `templates/delegation-assignment.md` |
| `/progress-report` | Existing `templates/progress-report-template.md` |
| `/next-task`, `/models edit` when owner input is required | `templates/decision-prompt.md` |
| `/resume` | `templates/session-handoff.md` |
| `/done` | `templates/resource-inventory.md` and `templates/session-handoff.md` |
| `/close` | Same output and procedure as `/done` |
| `/campaign-status` | Existing `templates/campaign-state.md` |
| `contribute` | `templates/resource-inventory.md` and `templates/decision-prompt.md` |
| `/settings` | `foundry/RESPONSE_TEMPLATES.md` |
| `/models explain`, `/teach-implementation` | Task-specific compact layout under the response-presentation standard |

A command must use its canonical layout without changing its procedure, permissions, required fields or evidence rules. Existing templates are refined visually, not replaced with generic summaries.

## Recommended operating sequence

```text
/audit -> /next-task -> /implement -> /verify -> /review
   |                                             |
   +---------------- /progress-report <----------+
                         |
                       /done
```

This is a guide, not mandatory ceremony. Small changes may combine implementation and verification. High-risk changes retain explicit approval and independent review gates. Use `/campaign-status` when coordinating multi-agent work.

## Shared behaviour rules

### Scope and ambiguity
- Resolve the target project and subsystem before acting.
- Inspect project context before asking for input.
- If one essential detail is missing, ask one focused question.
- If several independent decisions are required, follow `standards/conversational-interaction.md` and ask them one at a time.
- Retain answers, do not re-ask, and do not silently expand scope.

### Permissions
- Read-only commands do not edit project files.
- Commands that may write identify target paths and intended changes before writing.
- Approval for one operation does not approve unrelated operations.
- Host limitations must be stated, not simulated.

### Evidence and completion
- Separate implemented, tested, reviewed and released states.
- Name exact commands and environments used for verification.
- Report skipped, blocked and flaky checks explicitly.
- Never infer completion from a progress percentage, changed-file count or agent activity.
- A recommendation is not an executed action; a generated file is not host acceptance.

### Presentation
- Follow `standards/response-presentation.md`.
- Identify resources by human-readable name, type, purpose and actual contents.
- Use progress bars only with a defensible measurement model.
- Use ASCII diagrams for meaningful flows, dependencies and handoffs.
- Keep output readable in plain Markdown and narrow terminal-like surfaces.
- Do not force ordinary conversational answers into templates.

### Failure behaviour
When required context, permission, tooling or evidence is unavailable, stop safely and report what was attempted, what could not be established, evidence gathered, whether anything changed and the smallest safe next action.

## Authoring checklist

- [ ] Frontmatter ID, path, aliases, version and dependencies agree with the registry.
- [ ] Invocation and arguments are explicit.
- [ ] Default permission level is stated.
- [ ] Detailed procedure is delegated to the correct skill or workflow.
- [ ] Approval boundaries are clear.
- [ ] Output and failure states are predictable.
- [ ] A canonical presentation contract is referenced.
- [ ] Multi-step input follows the sequential interaction standard.
- [ ] No unsupported host or provider behaviour is promised.
