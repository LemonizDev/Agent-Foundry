---
id: documentation-governance
name: Documentation Governance Standard
type: standard
version: 0.1.0
portability: adaptable
status: draft
---

# Documentation Governance Standard

## Purpose

Keep project documentation navigable, authoritative, and honest as the repository grows.

## Document classes

- **Canonical:** authoritative current direction or specification.
- **Reference:** supporting technical or contextual material.
- **Verified:** evidence-backed result for a defined scope and date.
- **Proposed:** not yet accepted or implemented.
- **Historical:** retained for traceability; not current instruction.
- **Superseded:** replaced by a newer source; link to its successor.

Projects may add labels, but must define their meaning.

## Rules

1. Maintain a documentation index with canonical entry points and category descriptions.
2. Give each fact or policy one authoritative home. Link to it rather than copying the full text elsewhere.
3. Define precedence when documents conflict.
4. Separate product vision, roadmap, current state, change history, operating manual, and handoff.
5. Keep historical records; correct stale claims explicitly rather than silently deleting evidence.
6. After meaningful implementation, update the relevant current-state and change records.
7. Update user-facing operating instructions with the same change that alters user-visible behaviour.
8. Never document a command or procedure that does not exist or has not been verified.
9. Include exact validation results and known limitations.
10. Keep root-level documentation limited to useful entry points; organise supporting documents by category.

## Suggested categories

- architecture
- strategy
- governance
- implementation
- verification
- operations
- historical

Adapt the taxonomy to repository size; do not create empty folders just to imitate a template.

## Completion

A documentation change is complete when links resolve, authority is clear, status labels are accurate, and the index reflects any new canonical resource.
