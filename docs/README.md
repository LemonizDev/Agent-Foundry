# Documentation Index

This directory explains Agent Foundry itself: its architecture, source extraction, design decisions and authoring rules. For the reusable assets, return to the [repository README](../README.md).

## Start here\n\n- [User Guide](USER_GUIDE.md) — explains the product, setup, commands, model delegation and session learning in developer-facing language.\n- [Existing Project Integration](architecture/EXISTING_PROJECT_INTEGRATION.md) — how to add Foundry to an established repository without replacing its architecture or instructions.\n- [Task-Aware Model Delegation](architecture/MODEL_DELEGATION.md) — task classification and owner-defined model roster.\n\n## Start with the architecture

- [Resource Model](architecture/RESOURCE_MODEL.md) — definitions, category boundaries, authority, portability classes, loading strategy and lifecycle.
- [Resource Authoring Standard](standards/RESOURCE_AUTHORING_STANDARD.md) — required metadata and structures for skills, commands, workflows and templates.

## Source audit and extraction

These documents explain what was found in the source repositories and how it was evaluated.

- [Reusable Resource Inventory](audit/REUSABLE_RESOURCE_INVENTORY.md) — the source-first inventory of Dhan AI Trader and Rave Engine (the Lively Wallpaper project), including reusable families and project-specific exclusions.
- [Source Coverage](audit/SOURCE_COVERAGE.md) — what repository areas and source families were inventoried or inspected.
- [Extraction Decisions](audit/EXTRACTION_DECISIONS.md) — rationale for generalising, adapting, deduplicating or excluding source material.
- [Command Catalog](audit/COMMAND_CATALOG.md) — source-backed command behaviours, candidate invocations and platform-adapter cautions.
- [Extraction Register](EXTRACTION_REGISTER.md) — source-to-resource mapping, current extraction status and remaining work.

## Where to go for the reusable resources

| Resource category | Location |
|---|---|
| Portable baseline instructions | [core/](../core/GLOBAL_INSTRUCTIONS.md) |
| User-invokable command contracts | [Progress report](../commands/progress-report.md) · [Teach implementation](../commands/teach-implementation.md) · [Close session](../commands/close-session.md) · [Settings](../commands/settings.md) · [Edit model roster](../commands/edit-model-roster.md) |
| Task procedures | [skills/](../skills/progress-reporting/SKILL.md) |
| Multi-step coordination | [workflows/](../workflows/multi-agent-campaign.md) |
| Agent role definitions | [Profile catalog](../profiles/README.md) |
| Engineering rules | [standards/](../standards/documentation-governance.md) |
| Reusable output structures | [templates/](../templates/progress-report/PROGRESS_REPORT.md) |
| Tool-specific mapping guidance | [integrations/](../integrations/README.md) |
| Machine-readable resource catalog | [registry/resources.yaml](../registry/resources.yaml) |

## Documentation maintenance rules

- Update the README when top-level directories, resource categories or onboarding steps change.
- Update the extraction register when a source is inspected, extracted, excluded or validated.
- Keep source inventory separate from extraction status. A discovered file is not automatically an extracted resource.
- Record source repository, ref and path for every extracted resource. Do not invent immutable commit provenance.
- Keep the resource registry aligned with actual files and their metadata.
- Use the changelog for meaningful repository-level changes.
