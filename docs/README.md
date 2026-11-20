# Documentation

The [root README](../README.md) is the visitor landing page. This index routes readers to deeper guides and technical references.

## Choose your path

<details open>
<summary><strong>I'm new to Agent Foundry</strong></summary>

1. Read the [User Guide](USER_GUIDE.md).
2. Follow the [Bootstrap Guide](../BOOTSTRAP.md).
3. Review [Existing Project Integration](architecture/EXISTING_PROJECT_INTEGRATION.md).
4. Browse the [Command Catalog](COMMAND_CATALOG.md).

</details>

<details>
<summary><strong>I want to understand the implementation</strong></summary>

- [Engine Architecture](architecture/ENGINE_ARCHITECTURE.md) — scanner, registry, plan, manifest, update and uninstall boundaries.
- [Resource Model](architecture/RESOURCE_MODEL.md) — resource types, metadata, authority, portability and lifecycle.
- [Distribution and Versioning](architecture/DISTRIBUTION_AND_VERSIONING.md) — source revisions, package distribution and release design.
- [Task-Aware Model Delegation](architecture/MODEL_DELEGATION.md) — task classification, roster eligibility, scoring and review gates.
- [Release Readiness](RELEASE_CHECKLIST.md) — evidence required before a tagged release.

</details>

<details>
<summary><strong>I want to author or contribute resources</strong></summary>

- [Resource Authoring Standard](standards/RESOURCE_AUTHORING_STANDARD.md).
- [Command Catalog](COMMAND_CATALOG.md) — command contracts and shared behavioural requirements.
- [Contributing Guide](../CONTRIBUTING.md).
- [Code of Conduct](../CODE_OF_CONDUCT.md).
- [Support](../SUPPORT.md).

</details>

<details>
<summary><strong>I want to audit the source material</strong></summary>

- [Reusable Resource Inventory](audit/REUSABLE_RESOURCE_INVENTORY.md).
- [Source Coverage](audit/SOURCE_COVERAGE.md).
- [Extraction Decisions](audit/EXTRACTION_DECISIONS.md).
- [Extraction Register](EXTRACTION_REGISTER.md).

</details>

## Resource catalog

| Category | Browse |
|---|---|
| Core instructions | [Global Instructions](../core/GLOBAL_INSTRUCTIONS.md) |
| Commands | [Command Catalog](COMMAND_CATALOG.md) · [Command directory](../commands/audit.md) |
| Skills | [Repository audit](../skills/repository-audit/SKILL.md) · [Implementation planning](../skills/implementation-planning/SKILL.md) · [Debugging](../skills/debugging/SKILL.md) · [Testing and verification](../skills/testing-and-verification/SKILL.md) · [Code review](../skills/code-review/SKILL.md) |
| Workflows | [Multi-agent campaign](../workflows/multi-agent-campaign.md) · [Session close](../workflows/session-close.md) |
| Profiles | [Profile catalog](../profiles/README.md) |
| Standards | [Engineering principles](../standards/engineering-principles.md) · [Communication](../standards/agent-communication.md) · [Context management](../standards/context-management.md) · [Security boundaries](../standards/security-boundaries.md) · [Evidence and verification](../standards/evidence-and-verification.md) |
| Templates | [Progress report](../templates/progress-report-template.md) · [Delegation assignment](../templates/delegation-assignment.md) · [Recovery handoff](../templates/recovery-handoff.md) |
| Integrations | [Integration directory](../integrations/README.md) |
| Machine-readable catalog | [Resource registry](../registry/resources.yaml) |

## Documentation ownership

- README explains product, first steps, capabilities and maturity.
- This index routes readers; it should not duplicate procedures.
- Architecture documents explain design and boundaries.
- Registry is the machine-readable catalog; keep it aligned with files and metadata.
- Inventory records discoveries; extraction register records decisions and status.
- Source-derived resources must retain verifiable repository, revision and path provenance.
- Update navigation when public paths or categories change.
- Record user-facing changes in the [changelog](../CHANGELOG.md).
- Keep one authoritative home for each fact.
