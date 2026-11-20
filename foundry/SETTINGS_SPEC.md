---
id: foundry-settings-spec
name: Agent Foundry Settings Specification
type: settings
version: 0.1.0
portability: universal
status: draft
---

# Agent Foundry Settings Specification

This is the single authoritative definition of Agent Foundry's supported settings. It exists so a coding agent can map natural-language intent to valid, minimal configuration changes instead of improvising. Foundry deliberately defines very few settings; every setting below is one the installed context can genuinely act on.

Settings live in `.agent-foundry/settings/foundry-settings.yaml` in the consuming project. The file is owner-editable and may contain additional keys; agents must preserve unknown keys and comments. The installed copy is generated from `templates/foundry-settings.yaml` in the source repository.

## Setting record format

Each setting defines: stable identifier, human-readable name, meaning and effect, accepted values, default, scope, applicable hosts, configuration location, dependencies or conflicts, and safe modification guidance.

## Settings

### `profile`

- **Name:** Adapted profile
- **Meaning:** Records which starting preset the installation was adapted from (`minimal`, `balanced`, `autonomous-engineer`, `visual-engineer`, `research-engineer` or `custom`).
- **Accepted values:** one of the preset names above, or `custom`.
- **Default:** `balanced`
- **Scope:** installation metadata; informational only. Changing it does not add or remove resources.
- **Hosts:** all.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `profile`.
- **Dependencies/conflicts:** must match the manifest's recorded selection, or be set to `custom`.
- **Safe modification:** change freely; it never alters behaviour by itself.

### `reviews.strictness`

- **Name:** Review strictness
- **Meaning:** How thorough code review must be. `standard` applies the normal review procedure; `strict` adds deeper adversarial analysis, explicit claim-by-claim evidence checking and stronger change-size discipline.
- **Accepted values:** `standard` | `strict`
- **Default:** `standard`
- **Scope:** all review and verification work in the project.
- **Hosts:** all.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `reviews.strictness`.
- **Dependencies/conflicts:** when `strict`, `reviews.independent_review_high_risk` should not be disabled without owner approval.
- **Safe modification:** conversational changes such as "make reviews stricter" map here. Preview the effect, then apply a one-key edit.

### `reviews.independent_review_high_risk`

- **Name:** Independent review for high-risk changes
- **Meaning:** Whether high-risk changes (security, data integrity, production or irreversible impact, per the risk model in the model delegation standard) require review by a different agent or model before completion.
- **Accepted values:** `true` | `false`
- **Default:** `true`
- **Scope:** high-risk review gates.
- **Hosts:** hosts that support multiple agents or models; on single-agent hosts the agent records the limitation instead of pretending independence.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `reviews.independent_review_high_risk`.
- **Dependencies/conflicts:** intended companion of `reviews.strictness: strict`.
- **Safe modification:** lowering this is an autonomy change; explain the effect and obtain approval.

### `delegation.policy`

- **Name:** Delegation policy
- **Meaning:** How multi-agent delegation is used. `off`: the lead agent does the work itself. `recommend`: the agent proposes delegation and assignments but waits for owner approval. `automatic`: the agent may dispatch supported subagents for approved plans without asking each time; provider dispatch still only occurs where the host actually supports it.
- **Accepted values:** `off` | `recommend` | `automatic`
- **Default:** `recommend`
- **Scope:** delegation and campaign workflows.
- **Hosts:** hosts with subagent support; otherwise treated as `off` with the limitation recorded.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `delegation.policy`.
- **Dependencies/conflicts:** `automatic` requires `delegation.max_parallel_workers` to be set sensibly (1–4).
- **Safe modification:** raising autonomy requires explicit approval; lowering it does not.

### `delegation.max_parallel_workers`

- **Name:** Maximum parallel workers
- **Meaning:** Upper bound on simultaneously dispatched subagents for delegated work.
- **Accepted values:** integer 1–4
- **Default:** `2`
- **Scope:** multi-agent workflows.
- **Hosts:** hosts with subagent support.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `delegation.max_parallel_workers`.
- **Dependencies/conflicts:** meaningful only when `delegation.policy` is not `off`.
- **Safe modification:** edit directly; validate the integer range.

### `session_learning.enabled`

- **Name:** Session learning
- **Meaning:** Whether durable lessons, decisions and conventions are captured into project context at session close.
- **Accepted values:** `true` | `false`
- **Default:** `true`
- **Scope:** session-close command and context maintenance.
- **Hosts:** all.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `session_learning.enabled`.
- **Dependencies/conflicts:** when enabled with `auto_write: false`, context edits are proposed for approval.
- **Safe modification:** edit directly.

### `session_learning.auto_write`

- **Name:** Automatic session-learning writes
- **Meaning:** Whether the agent may write captured session learning to context files without per-item approval. `false` means each proposed context edit is previewed first.
- **Accepted values:** `true` | `false`
- **Default:** `false`
- **Scope:** session-close command.
- **Hosts:** all.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `session_learning.auto_write`.
- **Dependencies/conflicts:** has no effect when `session_learning.enabled` is `false`.
- **Safe modification:** enabling is an autonomy change; obtain approval.

### `documentation.auto_update`

- **Name:** Documentation auto-update
- **Meaning:** Whether the agent updates affected authoritative documentation as part of a code change without asking each time. `true` follows the documentation governance standard automatically; `false` proposes doc updates for approval.
- **Accepted values:** `true` | `false`
- **Default:** `true`
- **Scope:** documentation maintenance behaviour.
- **Hosts:** all.
- **Location:** `.agent-foundry/settings/foundry-settings.yaml`, key `documentation.auto_update`.
- **Dependencies/conflicts:** none.
- **Safe modification:** edit directly.

## Precedence

1. Explicit project-owner instructions in the current conversation.
2. The settings file's explicit values.
3. The defaults in this specification.

The manifest and installation metadata are not settings; they record what was installed from where. User-authored instruction files are not settings; they outrank this file per the precedence model in the resource model documentation.

## Unsupported requests

If a user asks for a setting that does not exist (for example per-provider model routing, spend limits or schedulers), say it is not a supported Foundry setting, explain what is supported, and offer the closest valid change. Never add ad-hoc keys to the settings file silently; propose them explicitly if they are genuinely useful as custom project keys, clearly marked as project-owned.
