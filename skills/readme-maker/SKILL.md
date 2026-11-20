---
id: readme-maker
name: README Design and Information Architecture
type: skill
version: 0.2.0
portability: universal
status: draft
---

# README Maker

## Purpose
Create repository landing pages that help a first-time visitor understand the project, decide whether it is relevant, start successfully and navigate to the exact detail they need. Treat the README as a product interface, not a documentation dump.

This skill is iterative. Every README review should update this skill with newly learned, reusable standards after checking for conflicts.

## Design principles
1. **Orient before explaining.** The first screen communicates what the project is, who it is for, its core value and the next action.
2. **Progressive disclosure.** Keep the default page concise. Use native GitHub <details>/<summary> dropdowns for deep feature trees, setup variants, reference catalogs and long explanations.
3. **Useful labels beat clever labels.** Name dropdowns after user goals or recognizable capabilities. Avoid vague, inflated or overlapping names.
4. **The feature menu is information architecture.** Cover every user-facing capability and provide nested paths down to individual resources, procedures, limitations and examples.
5. **Show, do not narrate.** Prefer compact diagrams, annotated examples, decision tables, screenshots and concrete outcomes over paragraphs describing what the README is doing.
6. **Visual hierarchy carries meaning.** Use GitHub alerts sparingly for genuinely important notes. Do not turn each stage of a conversation into a different coloured alert. Colour is semantic emphasis, not decoration.
7. **Do not fake a conversation.** Use a compact transcript, numbered dialogue or code block. Keep it plausible and focused on decisions and outcomes.
8. **Explain what happens next.** Every example, command, selected item or highlighted link must make the next action explicit.
9. **Use links as navigation.** Link labels should tell readers what the destination contains. Link to canonical resources.
10. **Make contribution status honest.** If there are no community contributions, say so plainly and give the exact conversational trigger and guide.
11. **Separate benefits from inventory.** Explain practical advantages in a distinct section; use the feature tree for complete detail.
12. **Document real compatibility.** Distinguish documented conventions, generated files, structural validation, discovery tests, invocation tests and behaviour acceptance.
13. **Design for scanning and accessibility.** Use descriptive headings, short paragraphs, meaningful link text, alt text and valid heading hierarchy. Do not rely on colour alone.
14. **Avoid scroll traps.** Collapse deep details. Do not make readers pass a long staged conversation, huge compatibility table or contribution essay before feature navigation.
15. **Maintain alignment.** Keep the README feature inventory aligned with the resource registry and canonical docs.

## Recommended README structure

**Do not put installation first by default.** A visitor needs to understand what the project is before deciding to install it. Use this project-first sequence unless the repository's purpose makes another order clearly better:

1. **Hero:** identity, name, one-sentence value, audience and truthful status badges.
2. **Manual table of contents:** a compact navigator near the top. Link to major sections and useful subpages.
3. **About the project:** what it is, the problem/domain, intended users, what it does and what it does not do.
4. **Why it exists / motivation:** problem, trade-offs and differentiator.
5. **Capabilities at a glance:** small summary of outcomes, not the full technical catalog.
6. **How it works / architecture:** diagram or screenshot with a short explanation of important components/flows.
7. **Feature explorer:** project-aware menu designed by Feature Menu Architect.
8. **Project status and limitations:** maturity, supported environments, known gaps and roadmap.
9. **Requirements and compatibility:** runtime, platform, dependencies, host/version evidence.
10. **Installation / getting started:** prerequisites, installation paths, approval/safety notes and verification.
11. **Usage / examples:** runnable first example, expected output and common workflows.
12. **Configuration / reference:** key options, environment variables and API/command reference links.
13. **Documentation / FAQ / troubleshooting:** navigation to canonical guides.
14. **Contributing / community:** current contribution state and exact next action.
15. **Security, support, acknowledgements and license.**

Adapt and omit sections that do not apply. A small library may need only a short page; a large platform may need a rich landing page plus dedicated docs. Do not turn this order into a content checklist full of empty sections.

## README navigation

- Always include a manual, human-readable table of contents near the top when the README is long enough that readers need navigation.
- GitHub provides an auto-generated Outline for Markdown headings, but it is supplementary; it is not a replacement for an intentional README navigator.
- Include the destinations users actually need: overview, features, architecture, install, usage, configuration, docs, contribution and support as applicable.
- Keep heading labels stable and anchor links valid. Use relative links for repository files.
- Large repositories should have a docs index and category guides; the root README should be the front door, not the entire manual.
- Add subdirectory README files only when a directory/package has its own users or meaningful interface. Keep them consistent with the root docs map.

## Visual storytelling

- Use a project logo/banner to establish identity, not fill space.
- Prefer one real product screenshot/GIF near the overview if the product has a visible interface.
- Use focused screenshots/GIFs to demonstrate distinct capabilities; add captions explaining what the reader is seeing and why it matters.
- Use Mermaid for architecture, lifecycle and navigation diagrams where a visual model helps.
- Use tables only for comparisons and genuinely tabular facts.
- Use small code examples with real inputs and expected output.
- Keep visual language consistent across banner, diagrams and screenshots.
- Never invent screenshots, product behaviour, status metrics, contributor counts or benchmark claims.

## Navigation hierarchy and dropdown rendering\n\n- GitHub `<details>` is a disclosure widget, not a complete tree visualization. Nested accordions may look like a flat list because the rendered indentation is weak. Always pair deep navigation with a Mermaid hierarchy map when the menu is complex.\n- Keep depth intentional: goal category → subcategory/resource family → resource item → usage details. Avoid an accordion forest with five levels just because Markdown permits it.\n- Use a short description next to each category. Resource leaves need a distinct title and one-sentence purpose; command leaves also need invocation and example.\n- For resource detail, prioritize direct links and actionable detail over repetitive boilerplate that restates the registry description twice.\n\n## GitHub Markdown and visual conventions
- Prefer GitHub Flavored Markdown; use native HTML only when it materially improves navigation/layout.
- Keep details summaries short and descriptive.
- Use GitHub Alerts (NOTE, TIP, IMPORTANT, WARNING, CAUTION) only for semantically important callouts. One high-value warning beats colour-coding every dialogue step.
- Use fenced code blocks for prompts, commands, transcripts and ASCII diagrams.
- Use tables for comparisons and compact structured facts, not long prose.
- Keep diagrams narrow enough for mobile; avoid wrapping ASCII art.
- Give images meaningful alt text; imagery should add identity or information.
- Use relative links for repository files and validate targets.
- Avoid raw HTML styling GitHub strips or renders inconsistently.
- Do not use emoji as the only label/status signal.
- Keep badges limited to maintained, meaningful status.

## Content quality checks
- A newcomer can identify the project and first action without reading everything.
- Quick start explains where to run it, what to paste/run, what the agent inspects, when approval is needed and what happens afterwards.
- Onboarding covers new, healthy existing and context-needs-repair project paths.
- Multi-host setup identifies the active host, asks which other apps the user uses, supports multiple selections and free-text additions, and distinguishes project-local setup from global app configuration.
- The feature tree covers every registry resource, validated by matching registry paths rather than relying on labels or filenames, and links to canonical detail. Use a visible Mermaid overview map and grouped accordions by user goal, then resource kind, then individual item. Never rely on nested details alone to communicate hierarchy: GitHub may render nested summaries with nearly identical indentation.\n- Avoid excessive nested levels. The main feature groups should remain scannable, with resource-kind groups and only useful individual detail panels. For each command panel include what it does, when to use it, exact invocation, example, expected result and full contract link.
- Every section has a purpose; repeated claims and filler are removed.
- Examples are realistic, brief and conclude with an outcome/next action.
- Alerts are not decorative quote boxes.
- Contribution status is accurate and the next action explicit.
- Compatibility claims have evidence labels and version caveats.
- Validate links, images, anchors, nested details, code fences and heading levels.
- Inspect the rendered page on desktop and narrow layouts.

## Review workflow
1. Inspect repository, README, registry, docs, screenshots and project standards.
2. Identify audience questions and path from landing to first success.
3. Build a content map before editing.
4. Compare claims against implementation and canonical sources.
5. Keep visible content concise; place deep detail in nested dropdowns.
6. Validate resources and links; detect registry items missing from the tree.
7. Review visual hierarchy and semantic alert use.
8. Check that examples explain the next action and show a credible outcome.
9. Update this skill with newly discovered standards and add regression checks where possible.
10. Report changes, validation and anything needing a real GitHub render review.

## Research-backed Markdown and README lessons (2026-11-20)

The skill was refined against GitHub's README documentation, GitHub's advanced Markdown guides, CommonMark/GFM parsing rules, Google's README style guide, and examples curated in [awesome-readme](https://github.com/matiassingers/awesome-readme).

- GitHub describes a README as a first-visit explanation of what a project does, why it is useful, how to get started, where to get help and who maintains/contributes. Lead with the project story, not installation.
- GitHub automatically creates an Outline from headings; long READMEs still benefit from a deliberate manual TOC near the top.
- GitHub supports relative file/image paths and section anchors. Prefer relative paths for clone-friendly links, keep link text on one line and validate all paths.
- GitHub supports collapsible `<details>` sections with `<summary>`; nested details alone do not guarantee a clear visual tree. Pair detailed menus with a Mermaid information-architecture diagram and deliberately indented group structure.
- GitHub renders Mermaid in Markdown. Use supported syntax (for example `flowchart TD`) and keep diagrams readable at mobile widths.
- GitHub Alerts are semantic callouts, not coloured quote cards. Use only one or two meaningful alerts per article, avoid consecutive alerts and never use an alert for each line of a synthetic dialogue.
- Markdown parsing inside raw HTML has constraints. Keep HTML simple, use blank-line separation intentionally and validate actual GitHub rendering rather than assuming browser HTML behaviour.
- Curated examples repeatedly pair concise project identity with real screenshots/GIFs, feature summaries, navigation, architecture visuals, installation variants, runnable examples and links to deeper docs. Borrow patterns, not another project's content or visual gimmicks.
- Google describes READMEs as summaries and stresses what a package contains, what it is used for, how to use it and where to find relevant documentation. Root README must stay navigable and point to the detailed docs.
- For a large project, the README is the product front door and navigator. It is not an archive of all technical detail. Use nested resource guides and docs indexes for depth.

## Standards learned from Agent Foundry README reviews
- A README should feel like an explorable interface, not a ChatGPT answer pasted into Markdown.
- Do not stack NOTE/TIP/WARNING/IMPORTANT blocks to stage a fictional conversation. This creates noisy colour bars and makes dialogue harder to follow.
- A conversation example should be one compact transcript or structured dialogue, not four coloured callouts with long assistant speeches.
- Feature navigation must be a real tree: categories, subcategories and direct links to individual resources. Eight broad dropdowns are insufficient for a repository with dozens of resources.
- Use precise, plain-language names. A newcomer should know what is inside before opening a dropdown.
- If no community resources exist, say "No community-contributed resources yet" and provide a simple invitation. Do not write a long discovery narrative or fake contribution example.
- Every link or highlighted item needs an explicit destination and purpose. Avoid orphaned links and unexplained transitions.
- Compatibility belongs in installation: discover the active host, ask for other hosts, allow multiple choices and free-text additions, then propose each adapter.
- Users may use several coding-agent apps against one repository. Do not silently create/modify multiple root instruction files. Explain project-local pointers versus global app configuration and get approval.
- A quickstart demo must be inferred from inspected evidence, be safe, and end with an observable result and next action.\n- Do not open with Quick Start before explaining the project. A newcomer needs the project purpose, user/problem fit, major capabilities and architecture before installation.\n- Every long README needs a manual table of contents after the hero; the GitHub Outline icon is supplementary navigation, not the whole navigation plan.\n- For a large repository, plan the information architecture from the project inventory before writing. Use a Mermaid hierarchy map plus grouped accordions; a long flat list of expandable items is not a feature tree.\n- Resource menus should be goal → resource family/type → named item → relevant detail panels (what it is, when to use, how to invoke/use, example, dependencies, canonical link).\n- Resource detail panels must differ by resource type. Commands need invocation/examples; standards need scope/precedence; profiles need responsibility/boundaries; templates need field guidance.\n- Use actual visual evidence: screenshots/GIFs for real product behaviour, Mermaid for architecture/lifecycle/navigation and small copyable examples. No invented demos or metrics.\n- Keep the root README an index and product introduction, with sub-guides/docs for deeper detail; add section-level README files when a package has its own audience.
- Avoid fabricated project-specific claims in examples unless clearly labelled illustrative.
