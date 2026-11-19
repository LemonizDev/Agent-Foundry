# Tool Integrations

This directory contains adapters that map portable Agent Foundry resources into specific coding-agent tools.

## Adapter requirements

Each adapter must document:

- Supported tool and tested version
- Native file locations and formats
- Mapping from Agent Foundry resource types
- Unsupported concepts and limitations
- Installation/update behaviour
- Validation performed and date
- Links to the portable source resources

Do not claim slash-command, subagent, workflow, or skill support without checking the actual tool/version. The same canonical command may map to a slash command in one host, a skill in another, and a prompt/workflow in a third.

No tool adapter is currently validated.
