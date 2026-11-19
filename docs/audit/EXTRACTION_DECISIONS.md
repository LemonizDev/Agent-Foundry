# Extraction Decisions

## Decisions

1. **Canonical role profiles are platform-neutral.** Kilo Markdown, FreeBuff TypeScript, and other host formats are adapters. The same role must not be duplicated as multiple independent Foundry profiles.
2. **Commands are canonical contracts plus adapters.** A rule file such as `PROGRESS_REPORT_RULES.md` does not by itself prove that a native slash command exists.
3. **Skills and workflows are separate.** A bounded reusable procedure is a skill; a multi-phase process with states/gates/handoffs is a workflow.
4. **Shared Dhan/Lively rules should be deduplicated.** Progress report and teaching rules are present in both repositories with matching contents/SHAs. Extract once and retain both sources as provenance.
5. **QA tools are pattern sources first.** Lively probes are highly useful evidence of test design, but their code is tightly bound to its renderer and harness.
6. **Dhan's Telegram regression framework is a high-value template.** Extract declarative tests, safety-class gating, evidence schemas, fail-closed redaction and verdicts, but leave Dhan commands and portfolio data rules in a domain adapter.
7. **The Dhan unattended-execution threat model is a security resource.** Extract threat categories and minimum isolation controls, but record Windows and Kilo details as environment-specific examples.
8. **Current project state must never be transplanted.** Orchestration JSON, blocker state, active milestones, and progress figures are examples only; only their schemas and formats may be generalised.
9. **Plan status taxonomy is reusable.** DONE, VERIFICATION INCOMPLETE, PARTIALLY IMPLEMENTED, NOT IMPLEMENTED, BLOCKED, SUPERSEDED prevents agents from repeating historical work.
10. **No universal project assumptions.** Market data, broker execution, Lively, WebGL2, GPU tiers, Telegram, Windows and free-only model policies belong to project/domain/tool packs.

## Exclusion rules

Do not copy:
- Secrets, credentials, identifiers or personal/portfolio data.
- Domain-specific product rules into the universal core.
- Generated test evidence, screenshot dumps, logs, transient artifacts or active state.
- Old/archived plans without checking their superseded status.
- Project source scripts without checking dependencies, licensing and portability.
- Tool-specific model identifiers or flags into portable methodology.

## Status discipline

- TREE_INVENTORIED: path appears in complete recursive tree.
- CONTENT_INSPECTED: actual file content was read.
- CANDIDATE: reusable pattern identified.
- EXTRACTED_DRAFT: generalised Foundry resource created.
- VALIDATED: scenario tests and structural checks passed.
- EXCLUDED: reason recorded.
- DEFERRED: content has not been inspected sufficiently.
