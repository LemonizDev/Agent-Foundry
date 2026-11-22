---
id: progress-reporting
name: Evidence-Based Progress Reporting
type: skill
version: 0.2.0
portability: adaptable
status: draft
dependencies:
  - response-presentation
  - progress-report-template
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    ref: foundation/final-trader-architecture
    path: PROGRESS_REPORT.md
    inspected_at: 2026-11-19
---

# Evidence-Based Progress Reporting

## Purpose

Produce an owner-facing report that explains the gap between the intended outcome and the verified current state without hiding uncertainty or manufacturing precision.

## Trigger

Use when the project owner asks for progress, status, completion percentage, milestone health, or a concise explanation of what remains.

## Preconditions

- Identify the project's canonical vision and roadmap.
- Identify the current-state source and the evidence supporting it.
- Determine the project's workstreams or milestones and their relative importance.
- Identify the current safety/operating mode where relevant.
- If current evidence cannot be inspected, label figures as previously reported and date them. Do not present them as freshly verified.

## Procedure

1. **Establish authority.** Read the canonical vision, roadmap, current-state record, and recent change history. Resolve which document owns direction and which owns current state.
2. **Separate goal from reality.** Describe the finished outcome and what demonstrably exists today in plain language.
3. **Choose an honest progress model.** Prefer a maturity scale or defensible range over false precision. If a weighted percentage is used, expose the weights and explain why they reflect risk reduction or user value rather than code volume.
4. **Assess every canonical workstream.** Show status, evidence, and a separate progress indicator. Do not silently omit unfinished workstreams.
5. **Show constraints and safety gates.** Explain what the current mode permits and forbids. Do not imply a later stage is available merely because some code exists.
6. **Separate implementation from proof.** Distinguish implemented, automatically verified, visually inspected, owner-approved, unverified, and blocked.
7. **Qualify every metric.** Place caveats beside the number they qualify. Include the date and source for historical measurements.
8. **Identify what works and what does not.** Report useful verified counts with limitations. Do not cherry-pick flattering metrics.
9. **End with one next step.** Give the smallest meaningful next action and state any owner decision required. Avoid a sprawling wish list.

## Default report structure

1. Goal vs. today
2. Overall progress (bar or maturity range)
3. Workstream checklist
4. Safety/operating gates, if applicable
5. What works / what does not
6. Next small step

The exact sections may be adapted to the project. The source Dhan report uses six fixed sections and ASCII bars; that presentation is a proven project-specific format, not a universal requirement.

## Honesty rules

- Never invent a percentage when no defensible model exists.
- Never count planned work as implemented.
- Never count code as verified without acceptance evidence.
- Never imply that a pending live or owner-controlled step is complete.
- Never report a test count, database count, benchmark, or performance result as current unless verified in the current session or explicitly attributed to a dated report.
- Do not conflate model confidence with correctness or outcome probability.
- Do not present stale data as fresh; show data time and report-generation time where relevant.

## Completion criteria

- All canonical workstreams are represented or explicitly excluded with rationale.
- Progress method and weights are visible.
- Claims have traceable evidence or explicit historical labels.
- Caveats are adjacent to claims.
- The report distinguishes implementation from verification.
- One actionable next step is clear.

## Validation scenarios

- A project has a high implementation percentage but several unimplemented workstreams: the report must expose them.
- A milestone has passing unit tests but pending hardware or live verification: it must not be labelled fully verified.
- Current evidence is unavailable: the report must not repeat old metrics as current.
- A weighted total is not defensible: the report must use a range or qualitative maturity instead.

## Source adaptation notes

The Dhan source's exact 12-workstream weights, SHADOW/PAPER/SUPERVISED LIVE/ARMED ladder, trading metrics, and market-data freshness rules are not portable defaults. Reuse only when the target project has equivalent concepts.
