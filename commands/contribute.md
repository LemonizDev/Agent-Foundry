---
id: contribute
name: Contribute to Agent Foundry
type: command
version: 0.1.0
portability: adaptable
status: draft
aliases: [contribute, "I'd like to contribute"]
dependencies:
  - contribution-discovery
---

# Contribute to Agent Foundry

## Intent
Discover reusable instructions, skills, settings, commands, workflows, profiles, templates and engineering practices in the user's accessible project context, then help the user contribute selected material to Agent Foundry.

## Trigger examples
- "contribute"
- "I'd like to contribute"
- "I made a few skills and instructions that might be useful to others."
- "Help me share my agent setup with Agent Foundry."

## Execution
Follow skills/contribution-discovery/SKILL.md.
1. Treat this as explicit opt-in to a bounded discovery scan, not permission to publish.
2. Identify accessible context sources and inspect only relevant categories.
3. Exclude secrets, personal data, confidential records and non-portable project state.
4. Compare candidates against registry/resources.yaml and existing Foundry resources.
5. Show a numbered shortlist with value, type, portability, maturity, destination and recommendation.
6. Ask one candidate-specific question that helps decide how to generalise the best item.
7. Draft only the resources the user selects.
8. Show proposed files and validation gaps. Obtain approval before external publication.

## Output
A candidate shortlist first; selected resource drafts and an exact change summary only after the user chooses.

## Boundaries
- This command does not grant access to other chats, global settings, external accounts or files the host cannot read.
- It does not automatically publish, commit, push or open a PR.
- Do not treat the user's entire instruction set as public-domain material.
- Never expose sensitive material in the shortlist or a draft.
