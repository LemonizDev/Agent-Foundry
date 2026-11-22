---
id: session-handoff
name: Session Handoff
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Session Handoff: [project / workstream]

```text
┌─ HANDOFF ────────────────────────────────────────────────────
│ Checkpoint: [date/time]
│ State: [READY TO RESUME / BLOCKED / OWNER INPUT REQUIRED]
└──────────────────────────────────────────────────────────────
```

## 1. Outcome

[What this session or operation set out to accomplish.]

## 2. Completed and verified

- [Outcome] — [evidence and verification state]

## 3. In progress

- [Work item] — [current state and partial changes]

## 4. Files and authoritative records

| Path | Change / role | State |
|---|---|---|
| [path] | [summary] | [created / modified / inspected / untouched] |

## 5. Blockers and open decisions

- [Blocker or decision, owner and resolution condition.]

## 6. Next action

**Next:** [one concrete action]  
**Prerequisites:** [required context, approval or dependency]

## 7. Recovery notes

[Last verified checkpoint, commands already run, environment limitations and work that must not be overwritten.]

Do not describe unverified work as complete. Preserve user changes and reconcile this handoff against the actual repository before resuming.
