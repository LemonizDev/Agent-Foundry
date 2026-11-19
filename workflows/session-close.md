# Session Close and Context Consolidation Workflow

## Objective

Convert useful session discoveries into durable, correctly located project context before a conversation ends.

## Steps

1. **Discover context:** identify root instructions, project context, architecture, decisions, progress, changelog and existing owner preferences.
2. **Extract candidates:** review the session for requirements, preferences, decisions, conventions, verified lessons and proposals.
3. **Filter:** reject transient chatter, emotion, speculation, duplicates, secrets and unsupported claims.
4. **Route:** map each accepted item to its single authoritative file.
5. **Resolve conflicts:** preserve existing decisions and ask the owner when authority is unclear.
6. **Edit:** make narrow updates; do not create a generic handoff by default.
7. **Verify:** read back changed files, check links and ensure the project state remains coherent.
8. **Report:** list captured learnings, file destinations, exclusions and unresolved questions.
9. **End:** tell the user the session is ready to close. Only close the actual chat if a verified host API exists.

## Stop conditions

Stop before writing when a learning would materially change product scope, security policy, architecture or owner preference and the evidence/authority is unclear. Present the proposed change for approval.

## Completion criteria

Durable learnings are stored once, in the right place, with evidence and provenance. No transcript dump or generic handoff has been created.
