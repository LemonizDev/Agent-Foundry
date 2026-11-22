# Context-First Release Readiness

A release is a tagged, reviewed snapshot of the context-file repository. There is no executable package to build or publish.

## Product and documentation

- [ ] README accurately explains that the existing coding agent is the interface.
- [ ] Bootstrap flow is documented and tested as a host-dependent, approval-gated process.
- [ ] Management instructions, settings specification and response templates agree.
- [ ] Host support claims distinguish documented conventions from acceptance-tested behaviour.
- [ ] Migration notes explain breaking changes from the former CLI distribution model.
- [ ] No active documentation advertises the removed CLI or npm package installation.

## Presentation and interaction quality

- [ ] Every registered command references the shared presentation and conversational interaction standards.
- [ ] Every structured command output maps to a canonical template or an explicitly defined compact layout.
- [ ] Multi-step owner input is asked one independent question at a time and approval gates are explicit.
- [ ] Resource inventories name each resource and explain its purpose, contents, relevance and actual state.
- [ ] Existing template fields and reporting semantics are preserved during visual refinements.
- [ ] Progress reporting retains its goal-versus-today comparison, methodology, workstreams, safety gates, evidence distinctions and next step.

## Repository quality

- [ ] npm ci succeeds from a clean checkout.
- [ ] npm test passes on supported Node.js versions.
- [ ] npm run validate:repo passes.
- [ ] Registry IDs, paths, dependencies and dependency graph validate.
- [ ] Documentation links resolve.
- [ ] Regression tests prevent executable, package entrypoint and obsolete release workflow from returning.
- [ ] Complete diff is reviewed.

## Host acceptance

For every advertised host, record exact product/version, context discovery, resource discovery, management invocation, file access, approval behaviour, update/removal preservation and reproducible evidence.

Repository CI does not substitute for actual host acceptance.

## Release approval

- [ ] Maintainer explicitly approves the release.
- [ ] Git tag points to the reviewed commit.
- [ ] Changelog and version metadata agree.
- [ ] No stable release is created automatically by development branches.
