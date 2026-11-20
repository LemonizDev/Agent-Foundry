---
id: feature-menu-architect
name: Project-Aware Feature Menu Architect
type: skill
version: 0.1.0
portability: universal
status: draft
dependencies:
  - skills/readme-maker/SKILL.md
  - docs/architecture/RESOURCE_MODEL.md
---

# Feature Menu Architect

## Purpose

Inspect a project and design a navigation system that reflects the project's actual capabilities, user journeys, resource types and complexity. This skill plans menus for READMEs, documentation hubs and other Markdown entry points. It does not assume that every project needs the same menu.

## Core rule

**Inspect first. Classify second. Design the information architecture third. Write Markdown last.**

Do not begin by grouping whatever files happen to exist into headings. Start from the visitor's questions and the tasks they came to complete. Map those tasks to the actual project capabilities and canonical resources.

## 1. Inspect the project

Read:
- Root README and all current navigation/index files.
- Project purpose, product scope, intended users and core workflows.
- Resource registry or equivalent machine-readable catalog.
- Commands, skills, workflows, profiles, standards, templates, integrations and public APIs.
- Installation, usage, configuration, architecture, security and troubleshooting documentation.
- Screenshots, demos and examples where available.
- Status/maturity fields and known limitations.

Build an inventory with evidence:
- Capability or user outcome.
- Resource kind.
- Resource name and canonical path.
- Description and maturity/status.
- Invocation/trigger, if present.
- Dependencies.
- Prerequisites, host/platform constraints and known limitations.
- Related resources and likely user journeys.

Do not infer support from a filename. Read the resource or authoritative documentation.

## 2. Classify what the project contains

Classify each capability along two axes.

### User-goal families

Examples, adapt to the repository:
- Understand the product.
- Install or configure it.
- Start using it.
- Build or modify something.
- Diagnose or recover.
- Inspect quality or security.
- Coordinate people/agents.
- Operate, maintain or upgrade.
- Extend, integrate or contribute.

### Resource kinds

Use the project's actual taxonomy. For Agent Foundry this includes:
- Core instructions.
- Standards.
- Skills.
- Commands.
- Workflows.
- Profiles/specialist roles.
- Templates.
- Host integrations.
- Management/settings resources.
- Architecture and user documentation.

Keep user-goal families and resource kinds distinct. A visitor navigates by their goal first; the resource kind is a meaningful second level. Do not mix unrelated taxonomies at the same level.

## 3. Design the menu plan

Produce a navigation plan before writing the README.

For each menu, state:
- Audience and question it answers.
- Top-level groups.
- Child groups and resource-kind subdivisions.
- Leaf resources and their canonical paths.
- Which items deserve their own detailed page.
- Which items belong in a quick-use menu, feature menu, documentation index, or reference catalog.
- What should remain visible versus collapsed.
- Cross-links between related tasks.
- Expected depth and reason for that depth.

Create a content map and a tree diagram. Use a Mermaid `flowchart TD` or `mindmap` where GitHub supports the chosen syntax. The diagram gives readers a visual overview; the collapsible sections provide the detailed navigation. Do not rely on a long chain of accordions alone to communicate hierarchy.

## 4. Build a real hierarchical tree

A typical path for a command-oriented tool is:

```text
Feature Explorer
└── Commands
    ├── Project lifecycle
    │   ├── Initialize
    │   ├── Resume
    │   └── Done
    ├── Engineering
    │   ├── Implement
    │   ├── Debug
    │   └── Review
    └── Reporting
        └── Progress Report
            ├── What it does
            ├── When to use it
            ├── How to invoke it
            ├── Example
            ├── Dependencies
            └── Full command contract
```

Adapt categories to the project. Do not force every command into a generic "commands" menu if users are better served by task-based categories. A resource may appear in more than one user journey only when cross-linking materially helps; keep one canonical resource page/path.

### Visual hierarchy requirements

- Show a Mermaid navigation map before the long menu where the project has enough complexity to justify one.
- Use clear heading levels and visibly indented child groups.
- Use nested `<details>` only when the reader benefits from progressive disclosure.
- For GitHub, use a Mermaid hierarchy map to make parent/child relationships visible. Do not assume nested `<details>` summaries will appear progressively indented; GitHub may render them with nearly identical alignment. Use accordions for disclosure, not as the only proof of hierarchy.
- Do not create 100 sibling dropdowns that appear as one undifferentiated list.
- Do not open every parent or child by default.
- Keep summaries short, consistent and human-readable.
- Ensure every expanded leaf has enough context to decide whether to open the canonical resource.

### Command resource drill-down

For command-heavy projects, a command's leaf panel should expose the questions users actually have as separate subpanels:
- What it does.
- When to use it.
- How to invoke it (exact syntax, but label host-native invocation as unverified where appropriate).
- Example usage.
- Expected result/output.
- Dependencies, permissions and approval requirements.
- Link to the complete command contract.

Keep examples short and tied to the command's real contract. Do not invent flags, arguments or behaviour. For skills, standards, profiles, workflows and templates, use a shorter leaf format appropriate to that resource type. Do not multiply disclosure widgets just to make the page look interactive.

## 5. Design leaf-resource panels

Use deeper, topic-level nested dropdowns primarily for commands, because a command has a user-facing invocation and an actionable output contract. For non-command types, a concise resource leaf with a one-line purpose and canonical link is usually clearer. Add further panels only when the project inspection demonstrates distinct user questions.

A resource panel should answer the questions relevant to its type. Do not copy the entire source file into the README.

### Command
- What it does (one or two sentences).
- When to use it.
- Exact invocation or natural-language trigger from the command contract.
- Short realistic example.
- Expected output/result.
- Dependencies/prerequisites.
- Safety or permission notes.
- Link to the full command contract.

### Skill
- What procedure it provides.
- When the agent should use it.
- How the user can request it.
- What it produces.
- Dependencies or constraints.
- Link to the full skill.

### Workflow
- Outcome and stages it coordinates.
- Entry conditions and approval gates.
- Result/exit criteria.
- Required resources or host capabilities.
- Link to the full workflow.

### Standard
- Rule or invariant it establishes.
- Scope and precedence.
- When it applies.
- Link to the authoritative standard.

### Profile
- Responsibility and boundaries.
- When it should be assigned/used.
- What it does not grant (tools, permissions or authority).
- Link to the full profile.

### Template
- What record/output it standardises.
- When to use it.
- Key fields and how to fill it.
- Link to the template.

### Integration, settings or documentation
- Exact audience and use case.
- Relevant version/compatibility caveat.
- Canonical reference link.

Use examples only when they are valid for the project and resource. Label hypothetical examples explicitly. Never invent invocation syntax, parameters, dependencies or functionality.

## 6. Plan other useful menus

A feature menu is not always enough. Consider these separate navigators where the project justifies them:
- **Quick navigation:** overview, installation, usage, API, support.
- **Use-case menu:** "I want to..." task routes.
- **Resource-type menu:** commands, skills, profiles, standards, templates.
- **Platform menu:** integrations by app/OS/runtime/version.
- **Documentation map:** architecture, reference, operations, troubleshooting, contributing.
- **Role-based menu:** developer, operator, admin, contributor.
- **Learning path:** beginner → intermediate → advanced.

Do not create every menu automatically. Avoid multiple menus that duplicate the same links. Explain which menus are necessary and why.

## 7. Validation

Validate the plan and rendered implementation:
- All public resources are represented or intentionally excluded with a reason.
- Registry IDs and paths match actual files.
- Each command trigger and example matches its source contract.
- Dependencies resolve.
- Resource maturity/status is not overstated.
- Mermaid syntax parses on GitHub's supported version.
- Details tags are correctly nested and balanced.
- HTML used for hierarchy is supported and visually indented.
- Relative links, anchors and images resolve.
- Navigation categories are mutually understandable.
- A newcomer can find a specific command without opening unrelated branches.
- A reader can follow a path from goal → resource type → individual resource → usage/example/dependencies.
- Mobile width does not cause diagram or table overflow.
- No menu is longer than the problem warrants.

## 8. Deliverables

Return:
1. Project inspection summary and evidence.
2. Capability/resource classification.
3. Proposed menu tree diagram.
4. Menu inventory with intended audiences and destinations.
5. Exact README sections to create/update.
6. Any missing or stale resource documentation.
7. Validation plan and known renderer limitations.

Only then author or update Markdown. Use README Maker for the complete README composition and final review.
