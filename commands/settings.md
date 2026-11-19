---
id: foundry-settings
name: Agent Foundry Settings
type: command
version: 0.1.0
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

Show and edit the project-local Agent Foundry configuration without requiring the user to navigate configuration files manually.

## Behaviour

1. Read `.agent-foundry/manifest.yaml` and available settings files.
2. Show configured profile, installed resources, host integration, model roster location, autonomy boundaries and update source.
3. Distinguish configured values from defaults, inferred values and unsupported settings.
4. Ask one focused clarification when an edit is ambiguous.
5. Preview changes and their effects.
6. Apply the approved edit and validate the resulting configuration.

## Safety

Never display secrets or API keys. Never invent a provider, model ID, capability score or host feature. Do not change permission/autonomy settings silently.

## Output

A concise settings summary, configuration file locations, and any changes made.
