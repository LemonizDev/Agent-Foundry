# Documentation and Codebase Navigation

This index is the map for the repository. The root README explains the product, architecture, features and first steps; this page routes readers to the authoritative source for each subject. Avoid creating duplicate documents when an existing canonical source can be extended.

## Start here
- [Root README](../README.md) — project overview, architecture, project-first navigation, feature explorer, installation and usage.
- [User Guide](USER_GUIDE.md) — installation, conversational management, settings and safety.
- [Bootstrap Guide](../BOOTSTRAP.md) — first installation through an existing coding agent.
- [Existing Project Integration](architecture/EXISTING_PROJECT_INTEGRATION.md) — assessment, selection and preservation.
- [Host Integrations](../integrations/README.md) — documented host conventions and acceptance boundaries.

## Architecture and system boundaries
- [Context Architecture](architecture/CONTEXT_ARCHITECTURE.md) — progressive disclosure and file ownership.
- [Resource Model](architecture/RESOURCE_MODEL.md) — resource types and lifecycle.
- [Orchestration Portability](architecture/ORCHESTRATION_PORTABILITY.md) — portable multi-agent coordination and host limitations.
- [Distribution and Versioning](architecture/DISTRIBUTION_AND_VERSIONING.md) — Git source distribution and immutable revision identity.
- [Task-Aware Model Delegation](architecture/MODEL_DELEGATION.md) — optional model recommendation context and its limits.

## Find a resource
| Need | Directory |
|---|---|
| Compact baseline instructions | ../core/ |
| Reusable standards | ../standards/ |
| Task procedures | ../skills/ |
| User-facing command contracts | ../commands/ |
| Multi-step workflows | ../workflows/ |
| Specialist responsibilities | ../profiles/ |
| Reusable output/state formats | ../templates/ |
| Host-specific conventions | ../integrations/ |
| Machine-readable resource catalog | ../registry/resources.yaml |

A command describes an invocation contract; it does not prove that a host exposes a native slash command. A profile describes responsibilities; it does not grant tools or permissions. See the resource model before adding a new category or duplicating an existing resource.

## Manage Foundry
- [Management Instructions](../foundry/MANAGEMENT.md) — discovery, settings, installation, updates, removal, diagnostics and contribution discovery.
- [Settings Specification](../foundry/SETTINGS_SPEC.md) — authoritative supported settings.
- [Response Templates](../foundry/RESPONSE_TEMPLATES.md) — context-aware conversational response structures.
- [Resource Registry](../registry/resources.yaml) — discoverable resource catalog.\n- [README Maker](../skills/readme-maker/SKILL.md) — project-first Markdown and README standards.\n- [Feature Menu Architect](../skills/feature-menu-architect/SKILL.md) — project inspection and hierarchical menu planning.\n- [README Template](../templates/README_TEMPLATE.md) — reusable project-first README structure.\n- [Done Command](../commands/done.md) — reusable resource curation from a productive session.\n- [README Maker](../skills/readme-maker/SKILL.md) — project-first Markdown/README structure and visual design.\n- [Feature Menu Architect](../skills/feature-menu-architect/SKILL.md) — project inspection, feature classification and hierarchical menu planning.\n- [README Template](../templates/README_TEMPLATE.md) — adaptable README page structure.

## Author and contribute
- [Contribution Discovery Skill](../skills/contribution-discovery/SKILL.md) — safely identify reusable user-created material.
- [Contribute Command](../commands/contribute.md) — user-facing contribution trigger.\n- [Done Command](../commands/done.md) — strict session resource curation and persistence.\n- [Session Resource Curation](../skills/session-resource-curation/SKILL.md) — classify, quality-check and route reusable session artefacts.
- [Resource Authoring Standard](standards/RESOURCE_AUTHORING_STANDARD.md).
- [Contributing Guide](../CONTRIBUTING.md).
- [Code of Conduct](../CODE_OF_CONDUCT.md).
- [Support](../SUPPORT.md).

## Audit provenance
- [Reusable Resource Inventory](audit/REUSABLE_RESOURCE_INVENTORY.md).
- [Source Coverage](audit/SOURCE_COVERAGE.md).
- [Extraction Decisions](audit/EXTRACTION_DECISIONS.md).
- [Extraction Register](EXTRACTION_REGISTER.md).

## Documentation ownership
- README explains the product and first steps.
- This index routes readers and does not duplicate procedures.
- Management and settings specifications are authoritative for conversational management.
- Architecture documents explain design boundaries.
- The registry is the machine-readable resource catalog.
- The audit documents record provenance and extraction limitations.
- Update navigation when public paths change and record user-facing changes in the changelog.
