---
id: teach-implementation
name: Teach Implementation
type: command
version: 0.3.0
status: draft
dependencies: [implementation-explanation, response-presentation, conversational-interaction]
portability: adaptable
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    path: .kilo/commands/TEACHING_AFTER_IMPLEMENTATION.md
  - repository: LemonizDev/futuristic-lively-wallpaper
    path: rules/TEACHING_AFTER_IMPLEMENTATION.md
---

# Teach Implementation

## Invocation

`/teach-implementation [change-or-feature]`

## Behaviour

After a code/config/test change, explain the change in beginner-accessible language.

Required output:
1. What changed, in 2–3 sentences.
2. Before/after ASCII flow showing the behavioural difference.
3. A truthful progress bar separating done and remaining work.
4. Three key points to remember.
5. One or two failure/edge-case scenarios.

Keep it concise. Explain necessary technical terms. Never invent progress or imply verification that did not occur.

## Adaptation

The source rule says this should run after every implementation response. Projects may enable it globally or selectively based on owner preference and response length. The teaching behaviour is portable; the exact response layout is configurable.

## Presentation

Follow `standards/response-presentation.md` and `standards/conversational-interaction.md`. Use `standards/response-presentation.md` as the canonical layout.

Preserve the five required teaching elements. Use a compact before/after ASCII flow and truthful progress bar; explain three key points and one or two edge cases. Preserve the command's procedure, permissions and required evidence fields.
