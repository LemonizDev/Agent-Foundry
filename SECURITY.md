# Security Policy

## Reporting a vulnerability

Report security issues privately through GitHub's repository security reporting feature if enabled. Otherwise contact the maintainer through GitHub and request a private channel. Do not publish exploit details, credentials or sensitive project data in a public issue.

Include the affected commit, host and version, impact and a minimal reproduction without secrets.

## Security design

Agent Foundry is a collection of context files. It does not execute downloaded resource content and does not provide a security sandbox. The consuming coding agent supplies repository access, filesystem access, shell execution, model access and permission controls.

- Installation and updates should be inspect-first and approval-gated.
- Source identity should use a resolved immutable commit SHA where possible.
- Registry paths must be relative, traversal-free and point to expected regular files.
- Existing project instructions and user-owned files must be preserved.
- The manifest records ownership; it is not blanket authority to overwrite files.
- Updates must detect local modifications and preview conflicts.
- Removal must target only approved, verified Foundry-managed files.
- Never store provider credentials, API keys or secrets in settings, model rosters or committed files.

## Known limitations

- The resource registry is not cryptographically signed.
- Host discovery, repository access and filesystem behaviour vary by host and version.
- Documented host conventions are not runtime acceptance evidence.
- Foundry does not provide process isolation, filesystem confinement, network policy enforcement or safe autonomous execution.

Do not treat installation as permission to run arbitrary commands, access secrets or modify production systems. Apply the consuming project's own permissions and review gates.
