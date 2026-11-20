# Project Context Management Standard

## Purpose

Keep durable project knowledge useful across agents and sessions without turning the repository into a transcript archive.

## Source-of-truth rules

- Identify canonical files for product intent, architecture, decisions, current progress, operational procedures and owner preferences.
- Each fact should have one authoritative home. Other documents should link to it rather than copy it.
- Distinguish current verified state from proposed plans, assumptions and historical records.
- When two sources disagree, inspect repository evidence, identify the conflict and reconcile it explicitly. Do not silently choose the more convenient statement.
- Keep always-loaded instructions compact. Put detailed procedures in skills and supporting references.
- Prefer progressive disclosure: expose the resource name and purpose first; load detailed procedures only when relevant.

## Session learning

At session close, extract only durable, actionable knowledge:
- confirmed requirements or constraints;
- architectural decisions and rationale;
- stable project conventions;
- verified failure modes and fixes;
- tool/model capabilities or limitations demonstrated by evidence;
- useful owner preferences that materially affect engineering work.

Update the existing authoritative file that owns each fact. Do not create a generic handoff or memory dump by default. Do not preserve emotional content, conversational filler, speculative claims or sensitive data.

## Context quality

- Remove stale or superseded instructions when they are demonstrably obsolete.
- Preserve history when it explains why a decision was made.
- Record provenance and verification date for volatile facts.
- Do not copy secrets, credentials, personal data or unrelated source content into context files.
