# Agent Profiles

An agent profile describes a role's mission, responsibilities, decision boundaries, required resources and non-goals. It does not grant the host new tools, permissions or subagent capabilities.

Profiles are standalone Markdown files named after the role. Select only the roles that the target coding-agent platform can actually support.

## Available profiles

| Profile | Responsibility | Best used when |
|---|---|---|
| [Lead Engineer](lead-engineer.md) | Owns delivery, architecture, delegation, integration and final verification | One agent or team is accountable for the overall result |
| [Independent Reviewer](independent-reviewer.md) | Challenges requirements, implementation, evidence and risks | A separate review pass is needed |
| [Visual Quality Engineer](visual-quality-engineer.md) | Evaluates visual output and regression evidence | The product has a visual/rendered interface |
| [Graphics Engineer](graphics-engineer.md) | Owns rendering architecture, materials and compositing | Graphics/rendering implementation is in scope |
| [Creative Director](creative-director.md) | Translates visual/product intent into acceptance criteria | Design direction needs to be coordinated with engineering |
| [Performance QA](performance-qa.md) | Measures frame-time, resource use and stability | Performance is a product requirement |
| [Creative Lighting Director](creative-lighting-director.md) | Defines music-reactive lighting behaviour | Optional specialist for audio-reactive visual projects |

## Source-derived role families

Dhan AI Trader contributes patterns for architecture, code review, QA, security, database migration, backend engineering, SRE, performance, observability, documentation, LLM/agent quality and integrations.

Lively Wallpaper contributes creative direction, graphics engineering, visual QA and audio-reactive lighting direction.

Only the profiles listed above have been extracted into the current catalogue. Other role families remain candidates until their source definitions are inspected and generalised.
