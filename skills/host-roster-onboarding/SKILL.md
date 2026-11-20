---
id: host-roster-onboarding
name: Coding-Agent Host Discovery and Multi-Host Setup
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Coding-Agent Host Discovery and Multi-Host Setup

## Purpose
Discover which coding-agent applications the project owner uses and integrate Foundry for selected hosts in one onboarding session. A user may work across several agents against one repository; do not assume the active host is the only one.

## Discovery sequence
1. Identify the active host from reliable runtime/context evidence when possible. Record product, exact version, OS and workspace mode only when known.
2. Explain that the active host can be configured first and additional hosts can share project-local Foundry resources through host-specific pointers/adapters.
3. Ask one concise roster question, allowing multiple selections and free-text additions:

   "Which coding-agent apps do you use with this project? Select any: Codex, Claude Code, OpenCode, Kilo, Cline, Cursor, Windsurf, GitHub Copilot, Other (type the name). You can list more than one."

4. Do not assume a user-mentioned app is installed, authenticated or able to access the repository. Mark it user-reported until checked.
5. If the user declines/skips, configure only the active host and mark others unknown. Do not block installation.

## Per-host assessment
For each selected host, determine:
- Exact product/version, if discoverable.
- Project/workspace access and repository root.
- Instruction-file conventions and precedence.
- Skill, command, workflow and specialist-agent discovery formats.
- File read/write access and approval behaviour.
- Delegation/subagent, model selection and session continuity only if relevant.
- Whether configuration is project-local or global/user-level.
- Whether the host is accessible in the current environment.

Use current official host documentation when conventions may have changed. Distinguish documented conventions from runtime-tested behaviour.

## Shared project integration
- Prefer one canonical project-local resource store (for example, .agent-foundry/) and small host-specific pointers where supported.
- Do not duplicate the full Foundry bundle into every host instruction file.
- Never overwrite existing host instructions. Compare and propose an additive, clearly delimited pointer or separate file.
- Do not modify global settings or files outside the repository unless explicitly requested and accessible.
- Never claim to configure an inaccessible app. Give an exact manual step or leave it pending.
- If hosts share a root instruction convention, avoid duplicate competing files.
- For each host, show proposed destination, conflicts, discovery assumptions and verification method.

## Approval and execution
Present a host roster table:

| Host | Evidence | Project access | Proposed integration | Runtime status |
|---|---|---|---|---|

Then show exact files to create/modify across selected hosts. Obtain approval before writing. Approval for one host does not authorise global settings or unrelated hosts.

After approval:
1. Apply only approved project-local changes.
2. Validate structure, metadata and links.
3. Where possible, test actual discovery/invocation in each selected host.
4. Report each host as documented, generated, structurally validated, discovery-tested, invocation-tested or behaviour-accepted.
5. Mark unavailable/unverified hosts honestly and provide the smallest manual next step.

## Completion
Summarise active host, selected roster, configured and pending hosts, exact changed files and verification evidence. Shared project resources can be installed once; host-specific adapters remain explicit.
