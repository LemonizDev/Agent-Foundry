---
id: explain-model-selection
name: Explain Model Selection
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases:
  - /models explain
dependencies:
  - docs/architecture/MODEL_DELEGATION.md
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
