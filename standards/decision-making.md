# Engineering Decision-Making Standard

## Purpose

Make consequential technical decisions explicit, evidence-based and reversible where possible.

## Decision procedure

1. State the decision that must be made and the outcome it affects.
2. Record hard constraints: compatibility, security, cost, latency, maintainability, platform support and owner preferences.
3. Inspect the current implementation and evidence before proposing alternatives.
4. Compare only viable options. Explain tradeoffs, operational burden and second-order effects.
5. Prefer the simplest option that satisfies the constraints and leaves a clear upgrade path.
6. Separate reversible implementation choices from product, policy or business decisions that belong to the owner.
7. Escalate when evidence is insufficient, options have materially different risks, or the decision is difficult to reverse.
8. Record the selected option, rationale, rejected alternatives and conditions that would justify revisiting it.

## Evidence discipline

- Do not invent benchmarks, compatibility claims, cost estimates or provider capabilities.
- Label estimates and assumptions.
- Prefer small experiments over speculative architecture.
- Revisit decisions when new evidence invalidates their assumptions, not merely because a different option is fashionable.
