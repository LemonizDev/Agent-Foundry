---
id: resource-inventory
name: Resource Inventory
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Resource Inventory

**Operation:** [DISCOVERY / INSTALL / UPDATE / REMOVE / CURATION / CONTRIBUTION]  
**Source:** [release tag or immutable commit]  
**Project:** [project name]

For every resource, use a descriptive entry. Never output only a type label or filename.

## [RESOURCE TYPE] · [COUNT]

### [Human-readable resource name]

```text
[STATE]  [RESOURCE TYPE]  [RESOURCE NAME]
```

- **Purpose:** [what the resource actually does]
- **Contents:** [key procedures, rules, sections or deliverables]
- **Why relevant:** [project-specific reason it was selected or retained]
- **Related commands/resources:** [dependencies and invocation points]
- **Destination:** [installed path, or source path for discovery]
- **Evidence:** [resource content inspected / not inspected]

Repeat for each resource.

## Summary

| State | Count | Meaning |
|---|---:|---|
| INSTALLED | [n] | Newly copied and verified |
| UPDATED | [n] | Existing managed copy changed and verified |
| KEPT | [n] | Already present and retained |
| SKIPPED | [n] | Intentionally not selected |
| BLOCKED | [n] | Could not safely complete |
| FAILED | [n] | Attempted and unsuccessful |

Counts must reflect actual outcomes. Do not label a proposed or copied-but-unverified resource as INSTALLED.

## Optional curation outcomes

Include this section only for CURATION or CONTRIBUTION operations:

| Outcome | Meaning |
|---|---|
| ACCEPTED | Meets the quality threshold and was saved to its canonical project destination |
| DRAFTED | Selected and prepared, but not yet written or externally published |
| REJECTED | Does not meet the quality threshold or duplicates an existing resource |
| PENDING APPROVAL | Draft is ready but requires owner approval before a consequential write or external transmission |
| PUBLISHED | Explicitly approved and confirmed as published to the external destination |

Never report PUBLISHED when a draft was merely prepared or a pull request was only proposed.
