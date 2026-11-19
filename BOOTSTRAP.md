# Use Agent Foundry in a project

You do not need to download a ZIP or manually browse this repository.

## Agent-first setup

Open your coding agent in the project you want to configure and send:

> Initialize this project with Agent Foundry: https://github.com/LemonizDev/Agent-Foundry  
> Read BOOTSTRAP.md and bootstrap/INITIALIZE_PROJECT.md from that repository. Inspect this project first, select only relevant resources, preserve my existing instructions and files, and show me the installation plan before writing anything.

The agent inspects the project, selects relevant resources, explains what it intends to add, and installs the approved selection.

## Intended project layout

    your-project/
    ├── AGENTS.md
    └── .agent-foundry/
        ├── manifest.json
        ├── instructions.md
        ├── resources/
        └── README.md

The installer must never replace an existing AGENTS.md, silently overwrite user-authored files, or install every resource by default.

## Current status

The agent-first initialization contract is documented. A tested cross-platform CLI and native tool adapters are still under development. Until released, initialization is agent-executed and must be reviewed before files are changed.


## CLI preview

An experimental Node.js CLI is being developed on the `feat/cli-installer-mvp` branch. It is not yet published to npm or production-validated. It currently installs selected resource files into `.agent-foundry/` and records a JSON manifest. It does not register native host commands or automatically edit the project's root agent instructions. Do not use it as a production installer yet.
