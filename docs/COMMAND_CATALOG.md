# Command Catalog

This catalog is the navigation layer for Agent Foundry's portable command contracts. Each command file is canonical for its invocation, permissions, procedure and output requirements.

> A Markdown command contract is not automatically a native slash command. Host discovery and invocation must be verified before native support is claimed.

## How commands fit together

Commands are organised by the owner's job, not by the order in which files happen to appear in the repository.

### 1. Understand the project

| Command | Use it to | Default permission |
|---|---|---|
| `/audit` | Map repository structure, architecture, conventions, risks and gaps | Read-only |
| `/project-health` | Assess delivery health, material risks and evidence gaps | Read-only |

### 2. Choose what to do next

| Command | Use it to | Default permission |
|---|---|---|
| `/next-task` | Select the single highest-value next action | Read-only |
| `/delegate` | Prepare a bounded assignment and assess dispatch eligibility | Planning; dispatch needs approval |
| `/models explain` | Explain model eligibility, recommendation and trade-offs | Read-only |

### 3. Execute and diagnose

| Command | Use it to | Default permission |
|---|---|---|
| `/implement` | Deliver an approved, bounded change | Approved-scope writes |
| `/debug` | Reproduce a failure, isolate root cause and implement a justified fix | Read first; fix after cause is established |

### 4. Verify quality

| Command | Use it to | Default permission |
|---|---|---|
| `/verify` | Check acceptance criteria against reproducible evidence | Read-only by default |
| `/review` | Find defects, regressions and unsupported claims | Read-only |
| `/models test` | Run a bounded model evaluation where supported | Explicit cost and execution approval |

### 5. Track and preserve work

| Command | Use it to | Default permission |
|---|---|---|
| `/progress-report` | Report goal versus current state, workstreams, evidence and next step | Read-only |
| `/resume` | Recover interrupted work from actual repository state | Read-only reconciliation first |
| `/close` | Capture durable session learning in canonical project context | Proposed context edits |
| `/teach-implementation` | Explain a completed change and its behaviour | Read-only |

### 6. Manage Agent Foundry

| Command | Use it to | Default permission |
|---|---|---|
| `/settings` | Inspect and change Foundry project settings | Approved configuration edits |
| `/models edit` | Maintain the owner-controlled model roster | Proposed configuration edit |

## Command-to-template map

| Command | Canonical presentation |
|---|---|
| `/audit` | `templates/repository-audit-report.md` |
| `/implement` | `templates/implementation-plan.md` |
| `/debug`, `/review`, `/project-health` | `templates/diagnostic-report.md` |
| `/verify`, `/models test` | `templates/verification-report.md` |
| `/delegate` | `templates/delegation-assignment.md` |
| `/progress-report` | Existing `templates/progress-report-template.md` |
| `/next-task`, `/models edit` when owner input is needed | `templates/decision-prompt.md` |
| `/resume`, `/close` | `templates/session-handoff.md` |
| `/settings` | `foundry/RESPONSE_TEMPLATES.md` |
| `/teach-implementation`, `/models explain` | Task-specific compact layout under the response-presentation standard |

Commands must use the canonical layout without changing the underlying procedure, permissions, evidence requirements or required output fields.

## Recommended operating sequence

```text
/audit -> /next-task -> /implement -> /verify -> /review
   |                                             |
   +---------------- /progress-report <----------+
                         |
                       /close
```

This is a guide, not mandatory ceremony. Small changes may combine implementation and verification. High-risk changes retain explicit approval and independent review gates.

## Shared command contract

Every command must make these points clear:

1. **Intent:** the user outcome.
2. **Inputs:** target, scope, constraints and optional context.
3. **Permissions:** read-only, proposed-write or approved-write behaviour.
4. **Procedure:** the skill or workflow that owns the detailed method.
5. **Evidence:** what must be inspected or tested.
6. **Output:** predictable response shape, including uncertainty and blockers.
7. **Presentation:** the canonical template or layout to use.

Keep commands thin. Put reusable procedure in skills, orchestration in workflows, durable policy in standards and output structure in templates.

## Shared behaviour rules

### Scope and ambiguity
- Resolve the target project and subsystem before acting.
- Inspect project context before asking for inputs.
- If one essential input is missing, ask one focused question.
- If several independent decisions are required, follow `standards/conversational-interaction.md` and ask them one at a time.
- Do not silently expand scope or repeat answered questions.

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
- Do not force every ordinary response into a template.

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
