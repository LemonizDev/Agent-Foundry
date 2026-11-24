---
id: conversational-interaction
name: Conversational Interaction Standard
type: standard
version: 0.1.0
portability: universal
status: draft
---

# Conversational Interaction Standard

## Purpose

Make multi-step work genuinely conversational. The agent should guide the owner through decisions in a clear sequence instead of dumping a questionnaire and hoping every answer is remembered.

This standard applies to installation, configuration, model-roster changes, high-impact planning and any task requiring multiple independent owner inputs.

## Interaction rules

1. **Inspect before asking.** Read the available project context and infer only what is directly supported. Do not ask for information already present.
2. **Ask one question at a time.** When several independent answers are needed, ask the next unanswered question only. Do not bundle unrelated questions into a numbered questionnaire.
3. **Explain why it matters.** State briefly what the answer changes and offer a recommendation when evidence supports one.
4. **Make answers easy.** Present a small set of distinct options when useful, with a clear default or recommendation. Always allow a free-form answer.
5. **Record each answer.** Maintain a compact internal decision ledger: answered, inferred, defaulted, skipped and still required. Reflect important answers back in the next step.
6. **Do not re-ask.** Reuse prior answers unless the scope changes or an answer becomes inconsistent.
7. **Separate required from optional.** Ask only for inputs that materially affect correctness, safety, compatibility or the owner's intended outcome. Use safe defaults for optional preferences.
8. **Keep the user in control.** Do not treat silence, a skipped question or conversational continuation as approval for consequential changes.
9. **Summarise before commitment.** Before a write or other consequential action, show the proposed choices, exact scope, files and risks together. Obtain the required approval.
10. **Recover gracefully.** If an answer is ambiguous, ask one focused follow-up about that answer only. Do not restart the entire interview.

## Decision ledger

For multi-step operations, track:

| Field | Meaning |
|---|---|
| Decision | The specific question or required input |
| State | ANSWERED / INFERRED / DEFAULTED / SKIPPED / OPEN |
| Value | The answer or supported default |
| Source | Owner statement or project evidence |
| Consequence | What the answer changes |

The ledger is working state, not a new project file by default. Persist it only when the operation is long-running and the project has an appropriate canonical record.

## Question pattern

Use this compact pattern:

```text
DECISION 2 OF 4 · HOST SUPPORT

Which coding-agent hosts should this installation support?

Recommended: Kilo only, because it is the host detected
in this project. Additional hosts can be added later.

1. Kilo only (recommended)
2. Kilo + other hosts
3. Host-neutral context files only

You can also describe a different setup.
```

Ask the question, then wait. Do not append the next question beneath it.

## Installation interview

For Agent Foundry installation:

1. Complete read-only project and host discovery first.
2. Resolve answers already evident from project files or the owner's request.
3. Ask only unresolved, consequential questions, one per turn.
4. Confirm the selected host scope and any project-specific constraints.
5. Select resources and explain each selection from its actual content.
6. Present the complete installation preview only after required answers are resolved.
7. Wait for explicit approval before writing.
8. Verify the result and provide a named, descriptive resource inventory.

A host name discovered from the environment is evidence, not permission to edit multiple host-specific files.

## Configuration and roster changes

- Ask which setting, model or field to change only if the target cannot be resolved from the request.
- For a change involving multiple independent entries, process one decision at a time or group tightly coupled fields when that is materially easier.
- Preview the exact diff before approval.
- Ask separately before increasing autonomy, incurring costs, changing external services or removing data.

## When not to ask

Do not turn a straightforward task into an interview. If the request and project context contain enough information, proceed. If only one essential detail is missing, ask one direct question. Do not ask preference questions whose answers would not materially change the result.

## Completion criteria

- No avoidable question was asked.
- Multiple independent questions were asked sequentially.
- Each answer was retained and not unnecessarily repeated.
- Recommendations and defaults were labelled.
- Approval was obtained before consequential writes.
- The user can understand what happens next without tracking a long questionnaire.
