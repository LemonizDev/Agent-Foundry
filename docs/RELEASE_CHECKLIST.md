# Release Readiness Checklist

This is a release gate, not a statement that the current development branch has passed it. Attach evidence for each completed item.

## Source and version integrity
- [ ] Working tree is clean and release commit is reviewed.
- [ ] Package version, CLI version, changelog and release tag agree.
- [ ] Registry IDs and paths resolve to tracked files.
- [ ] Registry metadata agrees with resource frontmatter.
- [ ] Dependencies resolve without missing IDs or cycles.
- [ ] Package allowlist includes every runtime file and excludes development-only material.
- [ ] A clean consumer project can install the packed artifact.
- [ ] Release is tied to an immutable commit and tag.

## Automated verification
- [ ] `npm ci` succeeds from a clean checkout.
- [ ] `npm test` passes on supported Node.js versions.
- [ ] `npm run validate:repo` passes.
- [ ] CI passes on every configured operating system.
- [ ] `npm pack --dry-run` includes all registry paths and runtime files.
- [ ] Package installation and CLI smoke tests pass in a clean temporary project.
- [ ] Rollback, symlink, traversal, conflict and locally modified-file tests pass.
- [ ] Update and uninstall preserve owner-authored changes.

## Host acceptance

For every host claimed as supported, record product, exact version, OS, adapter revision and test date.

- [ ] Instruction files are discovered.
- [ ] Skills are discovered and loaded.
- [ ] Commands are discoverable and invokable where native commands exist.
- [ ] Profiles/subagent definitions load with expected capabilities.
- [ ] Unsupported features degrade to a documented portable workflow.
- [ ] No host is labelled supported solely from filename-shape tests.

## Resource acceptance
- [ ] Every resource has purpose, prerequisites and completion criteria.
- [ ] Scenario tests exercise actual procedures, not just frontmatter.
- [ ] Safety and permission boundaries are reviewed.
- [ ] Source provenance is retained where extraction informed the resource.
- [ ] Duplicated or contradictory instructions are resolved.
- [ ] Draft status changes only with recorded acceptance evidence.

## Documentation and community
- [ ] README commands were run against the candidate version.
- [ ] CLI help matches the actual parser.
- [ ] Install, update and uninstall instructions match observed behaviour.
- [ ] Known limitations and host compatibility are current.
- [ ] Security, support and contribution links resolve.
- [ ] Changelog describes user-visible and breaking changes.
- [ ] License and third-party notices are complete.

## Publish and monitor
- [ ] Release notes identify tested commit and package integrity.
- [ ] Git tag and GitHub Release point to reviewed commit.
- [ ] Publishing permissions and provenance are configured where available.
- [ ] Post-publish installation smoke test succeeds.
- [ ] Rollback/deprecation procedure is documented.
- [ ] Post-release issue triage owner is assigned.

## Evidence record

Attach commit SHA/tag, OS and Node matrix, CI URLs, package filename and integrity hash, host acceptance records, unresolved risks and explicit owner acceptance.
