---
id: resource-inventory
name: Resource Inventory
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Resource Inventory

**Operation:** [DISCOVERY / INSTALL / UPDATE / REMOVE]  
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
