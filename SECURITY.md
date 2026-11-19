# Security Policy

## Scope

Report security vulnerabilities in Agent Foundry's installer, updater, resource registry, command execution guidance or host integrations privately to the repository maintainer. Do not publish exploit details before a fix is available.

## Design principles

- The CLI does not execute downloaded resource content.
- Installation requires an explicit apply action and displays a plan first.
- Paths from the registry are normalised and traversal is rejected.
- Existing project files are never silently overwritten.
- Updates preserve files whose hashes differ from the recorded installed hash.
- Uninstall removes only unchanged Foundry-owned resources and its own marked instruction block.
- API keys, provider credentials and user data must never be stored in the model roster or committed.

## Known limitations

The current CLI downloads resources over HTTPS from GitHub's raw content host. A future signed release/manifest mechanism should provide stronger provenance verification. The CLI is not a sandbox and does not make coding-agent execution safe by itself.
