---
id: response-presentation
name: Response Presentation Standard
type: standard
version: 0.1.0
portability: universal
status: draft
---

# Response Presentation Standard

## Purpose

Make agent output easy to scan, understand and act on across coding-agent chat surfaces and terminal-like interfaces. Presentation is part of the interaction contract, not decoration added after the work.

This standard governs structured responses. It does not force ordinary conversation into boxes, tables or reports.

## Core principles

1. **Lead with the outcome.** Put the current state, conclusion or required decision before supporting detail.
2. **Show the substance.** Name resources, files, commands, components and results. Never substitute empty category labels such as "skill added" or a filename without explaining its contents.
3. **Use hierarchy.** Group information into meaningful sections with concise headings, then use lists, tables or diagrams only where they improve comparison.
4. **Make status visible.** Use consistent labels: `DONE`, `IN PROGRESS`, `BLOCKED`, `NOT STARTED`, `PASS`, `FAIL`, `NOT RUN`, `UNVERIFIED`, `KEPT`, `INSTALLED`, `UPDATED`.
5. **Keep evidence adjacent.** A status or metric must be next to its evidence and caveat, not separated into a distant footnote.
6. **Prefer useful density.** Remove repeated headings, empty sections, decorative filler and generic conclusions.
7. **Adapt to the task.** Use the named canonical template when one exists. Do not invent a new layout for a recurring output.
8. **Preserve the user's information model.** A visual redesign must not silently remove fields, change definitions, reorder decision-critical sections or weaken evidence rules in an established template.

## Layout toolkit

### Section headers

Use short, descriptive headings. For longer reports, a small ASCII section marker can improve navigation:

```text
┌─ 01  PROJECT HEALTH ─────────────────────────
│  Overall: WATCH
│  Scope: API and worker
└──────────────────────────────────────────────
```

Do not wrap every paragraph in a box. Reserve frames for summaries, decisions, status snapshots and compact inventories.

### Progress bars

Use a fixed-width bar only when the underlying progress measure is defensible.

```text
Progress  [████████████░░░░░░░░]  60%
```

- Explain the denominator or maturity model.
- Do not derive progress from elapsed time, file count, token count or agent activity.
- Use `[not measured]` or a maturity label when a percentage would imply false precision.
- Keep workstream-level status visible; an overall bar must not conceal unfinished or blocked work.

### ASCII diagrams

Use diagrams when they clarify sequence, ownership, dependency or data flow.

```text
REQUEST
   |
   v
DISCOVER ---- missing input? ----> ASK ONE QUESTION
   |                                  |
   v                                  |
PLAN <--------------------------------+
   |
   v
APPROVAL (when required)
   |
   v
EXECUTE -> VERIFY -> REPORT
```

- Label nodes with verbs or meaningful nouns.
- Keep diagrams left-to-right or top-to-bottom and avoid unnecessary crossing lines.
- Use box-drawing characters when the host renders Unicode reliably; provide a plain ASCII alternative when it does not.
- Never use a diagram as a substitute for explaining consequential decisions.

### Tables

Use tables for genuine comparisons or repeated structured fields. Keep them narrow. On narrow chat/terminal surfaces, replace wide tables with grouped resource cards or short key/value blocks.

### Resource cards

Every resource mentioned in an installation, update, discovery or removal report must identify:
- human-readable name and resource type;
- what it does, based on the actual resource content;
- why it is relevant or why it was retained;
- dependencies or related commands when material;
- destination path when installed or updated;
- actual state, such as `INSTALLED`, `KEPT`, `UPDATED`, `SKIPPED`, `BLOCKED` or `FAILED`.

Never display a bare resource type, empty placeholder or unexplained filename as the complete description.

## Canonical output selection

Use the most specific existing template:

| Task | Canonical layout |
|---|---|
| Repository audit | `templates/repository-audit-report.md` |
| Foundry installation preview | `templates/installation-preview.md` |
| Resource inventory | `templates/resource-inventory.md` |
| Implementation planning | `templates/implementation-plan.md` |
| Verification and model evaluation | `templates/verification-report.md` |
| Debugging, review and health findings | `templates/diagnostic-report.md` |
| Decisions and next-task recommendations | `templates/decision-prompt.md` |
| Resume and session close | `templates/session-handoff.md` |
| Project progress | Existing `templates/progress-report-template.md` |

Foundry management response composition remains in `foundry/RESPONSE_TEMPLATES.md` and follows this standard.

## Portability and accessibility

- Target a readable width of roughly 80–100 columns; shorten or wrap long labels.
- Do not rely on color, emoji, bold text or Unicode box characters to convey status by themselves.
- Keep status words explicit so plain-text hosts remain understandable.
- Avoid excessive horizontal tables, nested boxes and giant banners.
- Use consistent symbols: `[x]` complete, `[~]` in progress, `[ ]` not started, `[!]` blocked. Explain any project-specific symbol set.
- Use code fences for diagrams and fixed-width bars so spacing survives Markdown rendering.
- Do not emit a template's empty sections. Omit irrelevant optional sections and label unavailable required evidence.

## Content and truthfulness

- Populate templates from inspected project state, not assumptions.
- Distinguish facts, inferences, recommendations and unknowns.
- Never invent a status, percentage, test result, file description, host capability or installation outcome.
- If an item cannot be verified, say so next to the item.
- A recommendation is not an executed action; a generated file is not proof that the host loads it.

## Completion criteria

A structured response is complete when:
- the primary outcome or decision is immediately clear;
- all material resources and changes are identified by name and purpose;
- the appropriate canonical template is used;
- status and evidence are explicit;
- no important field from the source template has been silently dropped;
- the layout remains readable in plain Markdown and narrow terminal-like surfaces.
