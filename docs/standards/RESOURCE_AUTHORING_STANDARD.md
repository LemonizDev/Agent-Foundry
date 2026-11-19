# Resource Authoring Standard

## Required metadata

Reusable resources must include metadata appropriate to their category. At minimum:

- Stable kebab-case identifier.
- Human-readable name and concise description.
- Resource type.
- Version.
- Portability class.
- Status.
- Dependencies, if any.
- Source provenance for extracted resources.

Recommended front matter:

```yaml
---
id: repository-audit
name: Repository Audit
type: skill
version: 0.1.0
portability: universal
status: draft
dependencies:
  - standards/evidence-and-verification
sources:
  - repository: LemonizDev/example
    ref: <commit-or-branch>
    path: path/to/source.md
    inspected_at: YYYY-MM-DD
---
```

Do not invent a commit SHA or claim immutable provenance when only a branch ref was inspected. Record the branch and inspection date until a commit is captured.

## Skill structure

1. Purpose
2. Trigger conditions
3. Preconditions and required context
4. Inputs
5. Procedure
6. Outputs and deliverables
7. Failure handling and stop conditions
8. Safety and permission boundaries
9. Completion criteria
10. Validation scenarios
11. Sources and adaptation notes

## Command structure

1. Name and invocation syntax
2. Description
3. Arguments and defaults
4. Permission level and confirmation requirements
5. Dependencies (skills/workflows/templates)
6. Expected behaviour
7. Output contract
8. Error and blocked behaviour
9. Platform adapter mapping

Commands should remain thin. Put substantial procedure in referenced skills/workflows.

## Workflow structure

1. Objective and trigger
2. Roles and ownership
3. Inputs and prerequisites
4. Ordered phases
5. Gates and decision rules
6. Checkpoints and durable state
7. Failure, retry, and recovery
8. Outputs and handoff
9. Completion criteria
10. Validation scenarios

## Template structure

Include purpose, intended audience, required sections, placeholder conventions, completion guidance, and one realistic but clearly fictional example when useful.

## Quality rules

- Prefer precise verbs and observable outcomes.
- Separate mandatory requirements from recommendations.
- State assumptions explicitly.
- Define what to do when information is missing.
- Include negative cases and stop conditions.
- Avoid tool-specific syntax in portable resources.
- Avoid copying project-specific identifiers or policies into universal resources.
- Avoid duplicated instructions; link to the authoritative standard.
- Keep examples internally consistent and runnable where applicable.

## Validation

A resource is not `VALIDATED` until:
- Metadata parses and required sections exist.
- Dependencies resolve.
- Links and referenced paths resolve.
- At least one positive scenario passes.
- At least one relevant failure/edge scenario is covered.
- The output meets the resource's completion criteria.
- Provenance and limitations are recorded.

Validation may initially be manual. Do not claim automated validation until a validator exists and has run.
