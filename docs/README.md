# Documentation

This is the documentation map for Agent Foundry. The [root README](../README.md) is the product overview and first-time visitor landing page; this index is the deeper reference map.

## Choose your path

<details open>
<summary><strong>I'm new to Agent Foundry</strong></summary>

1. Read the [User Guide](USER_GUIDE.md) for the product model, workflows and limitations.
2. Follow the [Bootstrap Guide](../BOOTSTRAP.md) to inspect and initialise a project.
3. Review [Existing Project Integration](architecture/EXISTING_PROJECT_INTEGRATION.md) to understand the additive, conflict-aware approach.

</details>

<details>
<summary><strong>I want to understand the implementation</strong></summary>

- [Engine Architecture](architecture/ENGINE_ARCHITECTURE.md) — scanner, resource resolver, installation plan, manifest, updates, validation and ownership boundaries.
- [Resource Model](architecture/RESOURCE_MODEL.md) — resource types, metadata, authority, portability and lifecycle.
- [Distribution and Versioning](architecture/DISTRIBUTION_AND_VERSIONING.md) — source revisions, package distribution and release design.
- [Task-Aware Model Delegation](architecture/MODEL_DELEGATION.md) — task classification, roster eligibility, scoring and review gates.

</details>

<details>
<summary><strong>I want to author or contribute resources</strong></summary>

- [Resource Authoring Standard](standards/RESOURCE_AUTHORING_STANDARD.md) — required structures and metadata for skills, commands, workflows and templates.
- [Contributing Guide](../CONTRIBUTING.md) — contribution expectations, validation and pull request requirements.
- [Code of Conduct](../CODE_OF_CONDUCT.md) — community expectations.
- [Support](../SUPPORT.md) — usage help and issue reporting.

</details>

<details>
<summary><strong>I want to audit the source material</strong></summary>

These documents distinguish what was discovered, what was inspected, what was extracted and what remains unvalidated.

- [Reusable Resource Inventory](audit/REUSABLE_RESOURCE_INVENTORY.md) — source-first inventory of Dhan AI Trader and Rave Engine.
- [Source Coverage](audit/SOURCE_COVERAGE.md) — repository areas and source families inventoried or inspected.
- [Extraction Decisions](audit/EXTRACTION_DECISIONS.md) — rationale for generalising, adapting, deduplicating or excluding material.
- [Command Catalog](audit/COMMAND_CATALOG.md) — source-backed command behaviours and host-adapter cautions.
- [Extraction Register](EXTRACTION_REGISTER.md) — source-to-resource mapping and extraction status.

</details>

## Resource catalog

| Category | Browse |
|---|---|
| Core instructions | [Global Instructions](../core/GLOBAL_INSTRUCTIONS.md) |
| Commands | [Command directory](../commands/audit.md) · [Audit](../commands/audit.md) · [Implement](../commands/implement.md) · [Debug](../commands/debug.md) · [Review](../commands/review.md) · [Verify](../commands/verify.md) · [Delegate](../commands/delegate.md) · [Progress report](../commands/progress-report.md) · [Close session](../commands/close-session.md) · [Settings](../commands/settings.md) · [Model roster](../commands/edit-model-roster.md) |
| Skills | [Repository audit](../skills/repository-audit/SKILL.md) · [Implementation planning](../skills/implementation-planning/SKILL.md) · [Debugging](../skills/debugging/SKILL.md) · [Testing and verification](../skills/testing-and-verification/SKILL.md) · [Code review](../skills/code-review/SKILL.md) · [Architecture design](../skills/architecture-design/SKILL.md) · [Session recovery](../skills/session-recovery/SKILL.md) · [Documentation maintenance](../skills/documentation-maintenance/SKILL.md) |
| Workflows | [Multi-agent campaign](../workflows/multi-agent-campaign.md) · [Session close](../workflows/session-close.md) |
| Agent profiles | [Profile catalog](../profiles/README.md) |
| Engineering standards | [Engineering principles](../standards/engineering-principles.md) · [Communication](../standards/agent-communication.md) · [Context management](../standards/context-management.md) · [Security boundaries](../standards/security-boundaries.md) · [Decision-making](../standards/decision-making.md) · [Evidence and verification](../standards/evidence-and-verification.md) · [Documentation governance](../standards/documentation-governance.md) |
| Templates | [Template directory](../templates/progress-report-template.md) · [Progress report](../templates/progress-report-template.md) · [Delegation assignment](../templates/delegation-assignment.md) · [Recovery handoff](../templates/recovery-handoff.md) · [Model roster](../templates/model-roster.yaml) · [Foundry settings](../templates/foundry-settings.yaml) |
| Host integrations | [Integration directory](../integrations/README.md) |
| Machine-readable catalog | [Resource registry](../registry/resources.yaml) |

## Documentation ownership and maintenance

- The root README explains the product, first steps, high-level capabilities and current maturity.
- This index routes readers to detailed guides and reference material.
- Architecture documents explain design and boundaries; they must not silently become user setup instructions.
- The resource registry is the machine-readable catalog. Keep it aligned with real files and metadata.
- The extraction inventory records discoveries; the extraction register records decisions and status. Do not treat discovery as completed extraction.
- Every source-derived resource must retain verifiable repository, revision and path provenance. Never invent immutable commit references.
- Update the README and this index when public paths, resource categories or onboarding steps change.
- Record meaningful user-facing and repository-level changes in the [changelog](../CHANGELOG.md).
- Keep one authoritative home for each fact. Link to it rather than maintaining competing copies.
