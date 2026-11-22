---
id: implementation-plan
name: Implementation Plan
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Implementation Plan: [outcome]

**Status:** PROPOSED  
**Scope:** [bounded scope]  
**Owner:** [agent / person]  
**Baseline:** [branch, commit or current state]

## 1. Desired outcome

[Describe the observable result in the owner's language.]

## 2. Acceptance criteria

- [ ] [Observable behaviour]
- [ ] [Compatibility or quality requirement]
- [ ] [Documentation / operational requirement, when relevant]

## 3. Execution sequence

```text
DISCOVER
   |
   v
DESIGN / DECISION GATE
   |
   v
IMPLEMENT SMALL SLICE
   |
   v
VERIFY SLICE
   |
   v
INTEGRATE -> REVIEW -> REPORT
```

| Step | Change / deliverable | Dependencies | Verification |
|---|---|---|---|
| 01 | [bounded unit] | [dependency or none] | [specific check] |
| 02 | [bounded unit] | [step 01] | [specific check] |

## 4. Files and ownership

| Path / component | Intended change | Owner | Existing work to preserve |
|---|---|---|---|
| [path] | [change] | [owner] | [notes] |

## 5. Risks and decisions

- **Risk:** [impact and mitigation]
- **Owner decision:** [one unresolved decision, or None]
- **Out of scope:** [explicit non-goals]

## 6. Completion evidence

- Required tests/checks: [commands and expected result]
- Manual/runtime checks: [if applicable]
- Documentation: [authoritative files to update]
- Stop conditions: [conditions requiring escalation]

**Plan rule:** Do not treat planned steps as completed work. Update status only from implementation and verification evidence.
