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
        ├── manifest.yaml
        ├── instructions.md
        ├── resources/
        └── README.md

The installer must never replace an existing AGENTS.md, silently overwrite user-authored files, or install every resource by default.

## Current status

The agent-first initialization contract is documented. A tested cross-platform CLI and native tool adapters are still under development. Until released, initialization is agent-executed and must be reviewed before files are changed.
