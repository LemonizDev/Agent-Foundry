---
id: verification-report
name: Verification Report
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Verification Report

```text
┌─ VERIFICATION ───────────────────────────────────────────────
│ Target: [commit / working tree / milestone]
│ Verdict: [PASS / FAIL / BLOCKED / NOT VERIFIED]
│ Checked: [date/time] · [environment]
└──────────────────────────────────────────────────────────────
```

## Acceptance matrix

| Criterion | Check / method | Result | Evidence | Caveat |
|---|---|---|---|---|
| [criterion] | [exact command or inspection] | PASS / FAIL / BLOCKED / NOT RUN | [result/path] | [limitation] |

## Test execution

| Command / check | Exit / result | Environment | Notes |
|---|---|---|---|
| [exact command] | [exit code and result] | [runtime/version] | [relevant detail] |

## Failures and blockers

- [Failure, reproduction, impact and resolution state.]

## Not tested

- [Criterion or platform not checked and why.]

## Conclusion

[State only what the evidence supports. Separate implemented, automatically verified, visually inspected, runtime verified and owner-approved states.]

**Next action:** [one bounded action, or None]
