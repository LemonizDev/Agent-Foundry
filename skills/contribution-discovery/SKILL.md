---
id: contribution-discovery
name: Contribution Discovery
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Contribution Discovery

## Purpose
Turn a user's existing instructions, skills, workflows, commands, templates, settings and demonstrated practices into safe, useful, reviewable Agent Foundry contributions. The user's existing coding agent performs discovery using its own access. Foundry does not scan accounts, chats, disks or connected services by itself.

## Trigger
Use when the user says "contribute", "I'd like to contribute", "help me contribute to Agent Foundry", or clearly asks to share reusable agent resources. This is explicit opt-in. Do not scan unrelated material merely because the word appears in another context.

## Discovery boundaries
1. Confirm the project/workspace root and which sources the host can inspect.
2. Inspect likely reusable sources: AGENTS.md, CLAUDE.md, project rules, skills, commands, workflows, agent profiles, settings, templates, contribution notes and relevant documentation.
3. Search only accessible sources. If the host cannot inspect prior conversations, global settings, another repository or an external account, say so and invite the user to make a chosen source available.
4. Do not read or reproduce secrets, credentials, tokens, private keys, personal identifiers, private customer data, confidential business records, personal diary content or unrelated sensitive information.
5. Treat project-specific rules, current project state, model/provider IDs, proprietary architecture and domain policy as non-portable unless a safe abstraction is obvious and the user approves it.
6. Never upload, publish, commit or transmit anything during discovery.

## Candidate extraction
For each candidate, capture:
- Short name and resource type.
- Source path and a small, non-sensitive evidence excerpt or summary.
- The recurring problem it solves.
- The reusable principle or procedure, stripped of project-specific details.
- Likely Foundry destination: core, standard, skill, command, workflow, profile, template, integration or domain pack.
- Portability: universal, adaptable, host-specific or domain-specific.
- Novelty: whether the registry already contains an equivalent.
- Maturity: draft, used in practice, tested, or independently validated, with evidence.
- Risks, dependencies, attribution and any license/permission uncertainty.
- Recommendation: contribute, adapt, combine with an existing resource, keep private, or defer.

Do not call something tested because it exists in a file. Identify what evidence would validate it.

## Prioritisation
Prefer candidates repeatedly useful beyond one project, concrete enough for another agent to follow, not already covered by Foundry, small enough to review, safe to share, and supported by real usage or a validation plan. Avoid turning personal preferences into universal rules. Generalise only the transferable method.

## User-facing discovery response
Show a compact, interactive-feeling shortlist before drafting anything:
- One-line summary of what was inspected and what was not accessible.
- Candidate count.
- A table with a stable number, title, type, portability, maturity, value and recommendation.
- Group near-duplicates and explain which existing Foundry resource they should extend.
- Mark private, sensitive, domain-specific or license-unclear material as excluded, without revealing sensitive details.
- Offer numbered selections such as "1", "1 and 3", "all recommended", or "none".

Then ask one focused question based on the strongest candidate. Example: "Your project has a detailed task-recovery protocol. Should I adapt it into a universal recovery skill, or keep the host-specific steps as a Kilo integration?" Do not ask a generic questionnaire or make the user repeat information already present.

## Draft and validation
Only after the user selects candidates:
1. Read the relevant Foundry authoring standard, registry and nearest existing resources.
2. Draft the smallest useful generalisation. Preserve provenance without copying sensitive or copyrighted material unnecessarily.
3. Add prerequisites, triggers, procedure, outputs, failure handling, safety boundaries and host limitations.
4. Add a registry entry and navigation links where appropriate.
5. Add scenario tests or validation cases for observable behaviour.
6. Present exact proposed files and a concise diff summary.
7. Wait for approval before committing, pushing, opening a PR or publishing. If the user explicitly authorised direct repository edits, stay within that scope and still show the change summary.
8. Record what remains unverified.

## Completion criteria
- User explicitly selected the candidate.
- Sensitive and project-specific content was removed or excluded.
- Existing Foundry resources were checked for duplication.
- Provenance and maturity are clear.
- The resource is independently understandable and has a validation plan.
- No publication or external transmission occurred without approval.
