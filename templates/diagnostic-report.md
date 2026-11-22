---
id: diagnostic-report
name: Diagnostic Report
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Diagnostic Report: [scope]

**Overall:** [HEALTHY / WATCH / AT RISK / UNKNOWN]  
**Inspection scope:** [files, components, revision]  
**Confidence:** [HIGH / MEDIUM / LOW and why]

## 1. Summary

[The most important conclusion and its practical impact.]

## 2. Findings

```text
[P1] [FINDING TITLE]
     Evidence: [path:line / reproduction / check]
     Impact:   [specific consequence]
     Action:   [recommended correction]
```

| Priority | Finding | Evidence | Impact | State |
|---|---|---|---|---|
| P0 / P1 / P2 / P3 | [issue] | [source] | [consequence] | CONFIRMED / SUSPECTED / RESOLVED |

## 3. What works

- [Verified strength or control.]

## 4. Risks and unknowns

- [Unresolved risk, missing evidence or dependency.]

## 5. Recommended next action

**Next:** [single highest-value action]  
**Verification:** [how to confirm resolution]

Do not report an absence of findings as proof that the entire system is defect-free. State what was and was not inspected.
