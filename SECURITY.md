# Security Policy

## Reporting a vulnerability

Please report security issues privately through GitHub's repository security reporting feature if it is enabled. If private reporting is unavailable, contact the repository maintainer through GitHub and request a private channel. Do not publish exploit details, credentials or sensitive project data in a public issue.

Include the affected version/commit, operating system, exact command, impact and a minimal reproduction that contains no secrets.

## Security design

- The CLI does not execute downloaded resource content.
- A moving Git ref is resolved to a 40-character commit SHA; the registry and subsequent resources are fetched from that immutable revision.
- Registry paths are normalised, traversal and drive-qualified paths are rejected, and symlinked target paths are blocked.
- Installation is plan-first, requires explicit approval and refuses existing-file collisions by default.
- `--skip-conflicts` leaves existing paths untouched; skipped files are not adopted into the installation manifest.
- Initial installation stages downloads before writing and rolls back created files if a write fails.
- Updates are preview-first, preserve owner-modified files and roll back file writes if an update fails.
- Uninstall is preview-first and removes only unchanged Foundry-owned files and unmodified marked instruction blocks.
- Owner-edited model rosters and settings are preserved on uninstall.
- Provider credentials, API keys and personal data must never be stored in the model roster or committed.

## Known limitations

- GitHub commit pinning establishes source consistency, not cryptographic authenticity. The registry is not yet signed.
- The release workflow can attest package build provenance, but no stable release has been published yet.
- Host-specific command/skill/profile files are generated and unit-tested; actual host discovery and runtime execution still require validation inside each supported coding agent.
- Agent Foundry is not a sandbox. It does not provide OS-level process isolation, filesystem confinement, network policy enforcement or safe autonomous execution by itself.
- The model router recommends models from a user-defined roster. It does not call model providers or dispatch subagents.

Do not treat installation as permission to let an agent run arbitrary commands, access secrets or modify production systems. Apply the consuming project's own permissions and review gates.
