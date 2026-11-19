---
id: privacy-safe-evidence
name: Privacy-Safe Evidence Capture and Redaction
type: skill
version: 0.2.0
status: draft
portability: adaptable
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    path: tests/telegram_regression/README.md
  - repository: LemonizDev/dhan-chatgpt-connector
    path: tests/telegram_regression/redaction.py
    ref: foundation/final-trader-architecture
---

# Privacy-Safe Evidence Capture and Redaction

## Purpose

Prevent secrets and sensitive user/project data from leaking through test reports, screenshots, DOM snapshots, logs or attachments.

## Procedure

1. Classify test actions and evidence sensitivity before execution.
2. Define sensitive fields/patterns and screenshot policy for each risk class.
3. Capture raw evidence in memory where feasible; do not persist it by default.
4. Apply a mandatory sanitisation pipeline before persistence.
5. Validate sanitised output independently against forbidden patterns.
6. Fail closed: if redaction or validation fails, do not write evidence and mark the test BLOCKED.
7. Omit screenshots for high-risk surfaces; mask or crop medium-risk evidence.
8. Sanitise the final structured report and any derived Markdown.
9. Record what was redacted, omitted, or unavailable without reproducing sensitive content.

## Design requirements

- Separate capture, sanitisation, validation and persistence.
- Redaction must be tested against representative positive and negative cases.
- Avoid relying on filename/path filtering alone.
- Treat screenshots, DOM, logs and tool output as potential secret-bearing data.
- Make evidence retention and access policy explicit.

## Completion criteria

No raw sensitive evidence is persisted, sanitisation is validated before writes, failures block persistence, and the report clearly states evidence limitations.

## Source adaptation

Dhan's account IDs, balances, symbols, broker tokens and Telegram chat rules are domain-specific. Do not copy those patterns as a universal sensitive-data taxonomy; configure the target project's own data classes.
