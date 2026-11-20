# Command Catalog

This catalog defines the portable user-facing command contracts shipped by Agent Foundry. The files in `commands/` are canonical per-command definitions; this page explains how to interpret and use them.

> A Markdown command contract is not automatically a native slash command. An adapter must generate the appropriate artifact, and the host must be tested for discovery and invocation before native support is claimed.

## Command contract model

Every command should make six things clear:

1. **Intent:** the user outcome, not merely agent activity.
2. **Inputs:** target, scope, constraints and optional context.
3. **Permissions:** read-only, proposed-write or approved-write behaviour.
4. **Procedure:** the skill or workflow that owns the detailed method.
5. **Evidence:** what must be inspected or tested before reporting completion.
6. **Output:** a predictable response shape, including uncertainty and blockers.

Commands should remain thin. Put reusable procedures in skills, orchestration in workflows and durable policy in standards. Do not duplicate a full skill inside every command that references it.

## Command matrix

| Command | Default permission | Responsibility | Contract |
|---|---|---|---|
| `/audit` | Read-only | Map repository structure, conventions, risks and gaps | [audit](../commands/audit.md) |
| `/implement` | Approved-scope writes | Deliver a bounded change and verify it | [implement](../commands/implement.md) |
| `/debug` | Read; fix after cause is established | Reproduce and isolate a failure | [debug](../commands/debug.md) |
| `/review` | Read-only | Find defects and unsupported claims | [review](../commands/review.md) |
| `/verify` | Read-only by default | Test acceptance criteria and report evidence | [verify](../commands/verify.md) |
| `/delegate` | Planning unless dispatch approved | Produce accountable assignments | [delegate](../commands/delegate.md) |
| `/progress-report` | Read-only | Report verified status | [progress-report](../commands/progress-report.md) |
| `/next-task` | Read-only | Recommend one high-value next action | [next-task](../commands/next-task.md) |
| `/project-health` | Read-only | Assess health dimensions and material risks | [project-health](../commands/project-health.md) |
| `/resume` | Read-only reconciliation first | Recover work from actual state | [resume](../commands/resume.md) |
| `/close` | Proposed context edits | Preserve durable session learning | [close-session](../commands/close-session.md) |
| `/settings` | Approved configuration edits | Inspect and change Foundry settings | [settings](../commands/settings.md) |
| `/teach-implementation` | Read-only | Explain a completed change and evidence | [teach-implementation](../commands/teach-implementation.md) |
| `/models edit` | Proposed configuration edit | Maintain the owner-controlled roster | [edit-model-roster](../commands/edit-model-roster.md) |
| `/models explain` | Read-only | Explain model eligibility and selection | [explain-model-selection](../commands/explain-model-selection.md) |
| `/models test` | Explicit cost and execution approval | Run bounded evaluation where supported | [test-model](../commands/test-model.md) |

## Recommended operating sequence

```text
/audit -> /next-task -> /implement -> /verify -> /review -> /progress-report -> /close
```

This is a default, not ceremony. Small changes may combine implementation and verification. High-risk changes should retain independent review and explicit approval gates.

## Shared behaviour rules

### Scope and ambiguity
- Resolve the target project and subsystem before acting.
- If one essential input is missing, ask one focused question.
- Do not silently expand scope because adjacent cleanup looks attractive.
- Record assumptions that materially affect the result.

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

### Failure behaviour

When required context, permission, tooling or evidence is unavailable, stop safely and report what was attempted, what could not be established, evidence gathered, whether anything changed and the smallest safe next action.

## Authoring checklist

- [ ] Frontmatter ID, path, aliases and dependencies agree with the registry.
- [ ] Invocation and arguments are explicit.
- [ ] Default permission level is stated.
- [ ] Detailed procedure is delegated to the correct skill or workflow.
- [ ] Approval boundaries are clear.
- [ ] Output and failure states are predictable.
- [ ] No unsupported host or provider behaviour is promised.
- [ ] Examples match the current CLI and integration status.
