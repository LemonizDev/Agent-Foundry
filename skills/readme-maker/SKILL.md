---
id: readme-maker
name: README Design and Information Architecture
type: skill
version: 0.1.0
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

## Recommended structure
Adapt to the repository; do not force every section:
1. Hero: banner/logo, project name, value proposition, audience and useful badges.
2. Quick orientation: what it is, what it is not, who should use it.
3. Quick start: prerequisites, where to run, copyable prompt/command, approval gate and full guide.
4. Project-specific demo: brief, safe, observable outcome and next step.
5. Why it matters: practical advantages and tradeoffs.
6. Feature explorer: nested dropdown tree covering all capabilities and individual resources.
7. Compatibility: host roster and verified boundaries; collapse per-host detail.
8. Contribute: current contribution status, exact trigger, guide and approval/privacy boundaries.
9. Token/cost/performance implications where material.
10. Documentation/repository map, collapsed if long.
11. Safety boundary and support links.

## Feature-tree rules
- Use one clear top-level category per user goal or capability family.
- Nest subcategories using their own details blocks.
- At the deepest useful level, give each concrete skill, command, workflow, profile, standard, template, integration and canonical document its own nested dropdown with a plain-language title, one-line purpose, resource type/status where useful and direct relative link.
- Include relevant limitations and dependencies.
- Cover all registry resources, including additions. Mark draft/experimental status honestly.
- Explain internal jargon in plain language.
- Make category names parallel and distinguishable.
- Validate nested HTML tags and GitHub rendering.

## GitHub Markdown and visual conventions
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
- The feature tree covers every registry resource, validated by matching registry paths rather than relying on labels or filenames, and links to canonical detail. Individual resource entries can be their own nested dropdowns when the user asks for deep navigation.
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
- A quickstart demo must be inferred from inspected evidence, be safe, and end with an observable result and next action.
- Avoid fabricated project-specific claims in examples unless clearly labelled illustrative.
