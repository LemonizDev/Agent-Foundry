# Contributing to Agent Foundry

Agent Foundry is a reusable engineering environment for AI coding agents. Contributions should improve a real developer outcome, not merely add more prompt files.

## Before contributing

1. Read the README, User Guide and Resource Authoring Standard.
2. Check whether an equivalent resource already exists.
3. Identify the user problem, target audience and supported host/tool versions.
4. Keep universal practices separate from project-specific and host-specific material.

## Resource requirements

Every resource must have a clear purpose, prerequisites, procedure, output contract, safety boundaries and completion criteria. Commands should be thin user-facing entry points. Skills contain procedures. Workflows coordinate steps and gates. Profiles define responsibility, not fictional tool capabilities.

Do not claim host support without a reproducible test. Do not add model capability ratings without evidence. Never include credentials, private project data or provider secrets.

## Changes and validation

- Keep changes focused and preserve established naming conventions.
- Add or update tests for executable behaviour.
- Run npm ci, npm test and npm run validate.
- Update the changelog and documentation index.
- Explain limitations and unsupported environments honestly.

## Pull requests

Include the user problem, design, compatibility, safety implications, tests run and known limitations. Breaking changes require a migration note.
