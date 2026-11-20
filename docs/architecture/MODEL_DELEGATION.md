# Task-Aware Model Delegation

## 1. Objective

Select a model for the actual work rather than choosing a default model for every subagent. The selector must balance task suitability, quality risk, speed, context needs, tool support, reliability and owner constraints.

The model roster is user-defined. Agent Foundry does not assume a permanent provider catalogue or hardcode models that may disappear, become paid, change IDs or lose free access. A model name containing “Flash” is not proof of speed; the owner supplies a speed tier and measured latency where available.

## 2. Two separate decisions

**Task classification** determines what kind of worker is required.

**Roster selection** determines which user-configured model best meets that requirement.

Do not mix these steps. The task classifier should remain provider-agnostic.

## 3. Task dimensions

Every delegated task is classified on these dimensions:

| Dimension | Low | Medium | High |
|---|---|---|---|
| Reasoning depth | Direct transformation | Several interacting decisions | Novel architecture, ambiguous causality or competing hypotheses |
| Scope | One small bounded edit | Several files or one subsystem | Cross-system or repository-wide |
| Context demand | Small local context | Multiple files/docs | Large history, architecture or cross-repo context |
| Tool complexity | Read/search/simple edit | Tests, shell, browser | Multiple tools, stateful runtime, specialised environment |
| Risk/impact | Reversible cosmetic/internal | User-visible or operational | Security, data integrity, money, production or irreversible |
| Uncertainty | Clear requirements | Some ambiguity | Unknown root cause or incomplete specification |
| Verification burden | Static check | Focused tests | Integration, adversarial review, runtime or hardware validation |
| Latency sensitivity | No urgency | Normal turnaround | Interactive/fast response required |

Classify each as 1–3 and record rationale. Risk is a gate, not merely another score: a low-average score must not downgrade a high-impact task.

## 4. Workload classes and routing intent

| Class | Typical work | Preferred model characteristics |
|---|---|---|
| FAST_LOOKUP | Find a symbol, explain a known setting, retrieve a small fact | Low latency, adequate instruction following, small context acceptable |
| SMALL_TASK | One-line edits, simple bounded fixes, tiny changes | Small model with sufficient instruction adherence and easy verification |
| MECHANICAL | Rename, format, update repetitive metadata, bounded boilerplate | Fast, inexpensive/small model, strong tool reliability |
| ROUTINE_IMPLEMENTATION | Small feature or bug fix with clear acceptance criteria | Competent coding, tool calling, moderate reasoning |
| RESEARCH | Compare sources, inspect unfamiliar systems, gather evidence | Strong retrieval/tool use, context handling, source discipline |
| DEBUGGING | Diagnose interacting behaviour or uncertain failure | Strong causal reasoning, code navigation, iterative tool use |
| ARCHITECTURE | Cross-module design, tradeoffs, migrations | Strong reasoning, long-context consistency, reliable structured output |
| SECURITY_CRITICAL | Threat analysis, permissions, secrets, trust boundaries | Strong reasoning and instruction adherence; independent review required |
| INDEPENDENT_REVIEW | Challenge implementation and evidence | Different model/provider where practical; adversarial reasoning |
| LONG_CONTEXT_SYNTHESIS | Reconcile extensive repository history and documentation | Large usable context, retrieval discipline, consistency |
| VISUAL_OR_RUNTIME_QA | Inspect rendered output, hardware, browser or device state | Tool/environment access matters more than text benchmark claims |

Speed is a legitimate requirement. For FAST_LOOKUP and MECHANICAL work, prefer a fast or smaller model when it passes the capability floor. Do not route complex architecture or safety-critical tasks to a flash model just because it returns quickly.

## 5. Intensity and gates

Use a simple initial intensity estimate:

`intensity = reasoning + scope + context + tools + uncertainty + verification`

Each dimension is scored 1–3, giving 6–18. Risk is evaluated separately.

Suggested bands:
- 6–9: LOW
- 10–13: MODERATE
- 14–16: HIGH
- 17–18: VERY_HIGH

This is a routing heuristic, not a scientific measurement. The classifier must retain the dimension scores and rationale rather than treating the sum as objective truth.

Overrides:
- Any HIGH risk task requires a strong-capability worker and independent verification.
- Any task requiring tools the model/host does not have is ineligible, regardless of score.
- Very large context may require retrieval/chunking or a long-context model.
- A strict latency target can favour a faster model only among models that meet the minimum quality and reliability requirements.
- Owner budget/provider restrictions are hard constraints.

## 6. User-defined model roster

Store the roster in the consuming project, not in the universal Foundry repository:

`.agent-foundry/settings/model-roster.yaml`

Each entry should include:
- stable owner-defined alias;
- size class: small, medium, large or unknown;
- speed tier: fast, balanced, slow or unknown, supported by observed latency or provider evidence;
- provider and exact model ID;
- access channel/endpoint label (never store API keys here);
- availability status and last checked date;
- cost/free-tier constraints as understood by the owner;
- observed latency range, if measured;
- context window, if verified;
- coding, reasoning, tool-call, structured-output and instruction-following capability estimates;
- supported modalities and tools;
- known failure modes;
- tasks allowed/prohibited;
- evidence source and confidence;
- owner notes.

Capability values should be `unknown`, `low`, `medium`, `high` or an evidence-backed measured value. Do not invent model ratings.

## 7. Selection algorithm

1. Parse the assignment and acceptance criteria.
2. Classify task type and score each intensity dimension.
3. Identify hard requirements: tools, context, modality, structured output, risk, provider policy, latency and budget.
4. Filter roster entries that are unavailable, prohibited, or lack required capabilities.
5. Rank remaining candidates by task-fit, observed reliability, quality evidence, latency and cost preference.
6. Choose the smallest/fastest model that clears the quality floor for low-risk work. Small-task and mechanical workloads receive a preference for smaller models; explicit speed-sensitive tasks prefer owner-rated fast models and measured low latency.
7. For high-risk or high-uncertainty work, choose stronger reasoning and require independent verification.
8. Explain the selected alias, rationale, tradeoffs and fallback.
9. If no candidate qualifies, ask the owner or report that no safe roster match exists. Never silently invent a model or use a paid fallback against policy.
10. Record outcome: succeeded, needed correction, failed, latency and notable limitation. Do not update roster ratings from a single anecdote.

## 8. Delegation policy

- Lead agent remains accountable for final correctness.
- Assignment must include objective, scope, non-goals, file ownership, inputs, expected outputs, acceptance criteria, tests, checkpoint and recovery policy.
- Avoid parallel writes to the same files.
- Use a different model/provider for independent review where practical.
- Do not evade provider quotas or rotate credentials to bypass limits.
- Do not let model choice override permission or security boundaries.

## 9. User control and conversational management

The consuming coding agent reads the owner-maintained model roster and settings when relevant. The user can ask naturally to inspect or edit delegation preferences, explain a model recommendation, or review the roster.

The agent must preserve owner-entered model identifiers and capability evidence, avoid inventing availability or credentials, and explain when the host cannot select or dispatch a model automatically. Settings are governed by foundry/SETTINGS_SPEC.md; the roster remains a separate owner-maintained resource.

## 10. Validation

Test the classifier with representative tasks:
- typo correction;
- bulk metadata edit;
- small isolated bug;
- multi-file feature;
- unknown rendering defect;
- cross-module architecture migration;
- security boundary review;
- large documentation synthesis;
- urgent but low-risk lookup.

Measure classification agreement, eligible model selection, task success, correction rate, latency, tool failures and unsafe downgrades. Tune thresholds from observed outcomes, not intuition alone.


## 11. Agent-mediated recommendation boundary

Task classification and roster comparison are procedures the coding agent may perform using this document and the project's owner-maintained roster. They are not an executable routing engine.

The agent should classify the task, state the evidence and uncertainty, filter candidates against owner-declared capabilities and constraints, and explain the recommendation. It must not claim to have tested a provider, verified current availability, switched models or dispatched a worker unless the host actually performed that action.

This guidance does not call model providers, launch subagents or guarantee automatic model selection. Host capabilities and owner permissions remain authoritative.
