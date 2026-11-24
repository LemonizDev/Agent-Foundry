---
id: explain-model-selection
name: Explain Model Selection
type: command
version: 0.2.0
portability: adaptable
status: draft
dependencies: [model-delegation-architecture, model-roster-template, response-presentation, conversational-interaction]
aliases:
  - /models explain
---

# Explain Model Selection

## Invocation

`/models explain [task]`

## Behaviour

1. Classify the task by workload type.
2. Show intensity dimensions and rationale.
3. Apply risk and tool-access gates.
4. Read the consuming project's model roster.
5. Explain which models are eligible, which are filtered out and why.
6. Explain the recommended model, tradeoffs and fallback.
7. If the roster is missing or incomplete, identify exactly what information is needed.

Do not invent model capability ratings or claim that a recommendation was automatically executed. This command explains a decision; it does not itself dispatch a worker.

## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `standards/response-presentation.md` as the canonical layout.

Use a compact comparison: task classification, eligible and excluded candidates with reasons, recommendation, trade-offs and fallback. Do not create an unnecessary questionnaire. Preserve the command's procedure, permissions and required evidence fields.
