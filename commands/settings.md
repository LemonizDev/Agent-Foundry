---
id: foundry-settings
name: Agent Foundry Settings
type: command
version: 0.3.0
portability: adaptable
status: draft
aliases:
  - /settings
dependencies:
  - foundry-settings-spec
  - foundry-response-templates
---

# Agent Foundry Settings

## Invocation
`/settings`

## Purpose
Explain and safely manage project-local Foundry configuration through chat. Configuration belongs to the consuming project and must remain understandable to its owner. Foundry has no settings application; this contract plus the settings specification and response templates define the entire experience.

## Sources
- `.agent-foundry/management/SETTINGS_SPEC.md` — authoritative definitions of supported settings.
- `.agent-foundry/management/RESPONSE_TEMPLATES.md` — the settings response template.
- `.agent-foundry/manifest.json` — installation source, managed resources and hashes.
- `.agent-foundry/settings/foundry-settings.yaml` — project policy and preferences.

Read files that actually exist; do not silently substitute a similarly named file.

## Behaviour
1. Summarise installed version, source revision, selected resources and detected host.
2. Present the settings response template using actual values; distinguish explicit values from defaults and inferred values.
3. For requested changes, map natural language to exactly one setting key each and validate against the specification's accepted values.
4. Compute the smallest necessary change; preserve unrelated keys, comments and custom keys.
5. Explain effects and compatibility implications; obtain approval for autonomy changes.
6. Preview material changes, apply the approved edit and re-read the file to verify.

## Safety
Never display secrets or tokens. Never invent settings, provider names, model IDs, capability scores or host support. Do not silently change autonomy settings. Preserve unknown keys and comments where possible.

## Output
Configuration summary grouped by area, source paths, missing/unsupported settings, proposed/applied changes and verification results.
