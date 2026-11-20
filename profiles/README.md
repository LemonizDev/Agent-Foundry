# Agent Profiles

An agent profile describes a role's mission, responsibilities, decision boundaries, required context and non-goals. It does not grant the host new tools, permissions or subagent capabilities.

Select only roles that the target coding-agent host can actually support. Profiles are optional resources, not mandatory installation content.

| Profile | Responsibility | Best used when |
|---|---|---|
| Lead Engineer | Owns delivery, architecture, integration and final verification | One agent or team is accountable for the outcome |
| Independent Reviewer | Challenges requirements, implementation, evidence and risks | A separate review pass is needed |
| Visual Quality Engineer | Evaluates visual output and regression evidence | The product has a rendered interface |
| Graphics Engineer | Owns rendering architecture, materials and compositing | Graphics implementation is in scope |
| Creative Director | Translates visual intent into acceptance criteria | Design and engineering need coordination |
| Performance QA | Measures frame-time, resource use and stability | Performance is a product requirement |
| Creative Lighting Director | Defines music-reactive lighting behaviour | Audio-reactive visuals are in scope |

Profiles are installed selectively when the project and host can use them.
