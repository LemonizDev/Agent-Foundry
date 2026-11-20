---
id: foundry-settings
name: Agent Foundry Settings
type: command
version: 0.2.0
portability: adaptable
status: draft
aliases:
  - /settings
dependencies:
  - docs/architecture/MODEL_DELEGATION.md
---

# Agent Foundry Settings

## Invocation
`/settings`

## Purpose
Explain and safely manage project-local Foundry configuration. Configuration belongs to the consuming project and must remain understandable to its owner.

## Sources
- `.agent-foundry/manifest.json` — installation source, managed resources and hashes.
- `.agent-foundry/settings/foundry-settings.yaml` — project policy and preferences.
- `.agent-foundry/settings/model-roster.yaml` — owner-selected model inventory.

Read files that actually exist; do not silently substitute a similarly named file.

## Behaviour
1. Summarise installed version, source revision, selected resources and detected adapters.
2. Show autonomy, approval, delegation and model-selection policies.
3. Distinguish explicit values from defaults, inferred values and unsupported features.
4. For edits, identify exact key, current value and proposed value.
5. Explain effects and compatibility implications.
6. Obtain approval for permission, autonomy, provider or external-action changes.
7. Apply the approved edit and validate the result.

## Safety
Never display secrets or tokens. Never invent provider names, model IDs, capability scores or host support. Do not silently change autonomy settings. Preserve unknown keys and comments where possible.

## Output
Configuration summary, source paths, missing/unsupported settings, proposed/applied changes and validation results.
