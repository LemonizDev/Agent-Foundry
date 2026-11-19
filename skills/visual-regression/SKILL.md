---
id: visual-regression
name: Reproducible Visual Regression and Perceptual QA
type: skill
version: 0.1.0
portability: adaptable
status: draft
sources:
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: AGENTS.md
    inspected_at: 2026-11-19
  - repository: LemonizDev/futuristic-lively-wallpaper
    ref: main
    path: .kilo/plans/awakening-master-plan.md
    inspected_at: 2026-11-19
---

# Reproducible Visual Regression and Perceptual QA

## Purpose

Evaluate visual changes using controlled comparisons, targeted probes, and honest separation of automated evidence from human visual inspection.

## Trigger

Use for visual applications, rendering systems, dashboards, animation, graphics, UI polish, and any change whose correctness depends on appearance or perception.

## Preconditions

- Identify the active authoritative plan and current progress record.
- Identify the project's existing capture harness, probes, and acceptance thresholds.
- Establish a reproducible baseline.
- Record environment limitations such as software rendering, unavailable hardware, missing real media input, or unavailable target runtime.

## Procedure

1. **Describe the perceptual defect.** State what is visibly wrong and where it appears. Avoid vague goals such as "make it better".
2. **Find the structural cause.** Inspect relevant render stages, layer ownership, material inputs, geometry, composition, timing, and shared controls before changing values.
3. **Form competing hypotheses.** Consider architectural/compositional causes such as separation, silhouette, depth ordering, local highlight placement, palette assignment, phase relationships, or signal routing.
4. **Choose a bounded intervention.** Change the smallest causal unit. Preserve unrelated working layers and controls.
5. **Control comparison conditions.** Match viewport, device-pixel ratio, quality tier, preset, flags, and animation clock. Pin time/seed where possible.
6. **Isolate layers.** Use existing layer-isolation tools to determine whether each layer has a distinct visual role and whether the defect originates locally or in compositing.
7. **Run falsifiable probes.** Verify that controls reach real render paths, that expected signals move, and that invariants remain within the plan's limits.
8. **Capture before/after evidence.** Use the same settings and clock. Compare full composition as well as diagnostic crops.
9. **Measure relevant properties.** Use project-defined metrics such as luminance, edge density, hue diversity, draw counts, and frame time. Do not invent universal thresholds.
10. **Inspect actual output.** Numerical gates and successful compilation are necessary but do not prove visual quality.
11. **Record regressions and limitations.** State what improved, what worsened, what was not tested, and why.

## Evidence labels

Use explicit labels:
- **Implemented:** code/config change exists.
- **Automatically verified:** a probe, test, or harness passed.
- **Visually inspected:** rendered output was actually examined.
- **Not verified:** evidence is missing or the target environment was unavailable.
- **Blocked:** verification cannot proceed due to a named dependency or environment limitation.

Do not claim visual QA when no rendered output was inspected.

## Stop conditions

- If the same critical failure occurs twice (for example, black screen, runtime exception, or harness crash), stop repeated retries and record exact reproduction steps.
- If target hardware or runtime is unavailable, do not infer its performance from a software renderer.
- If comparison conditions cannot be controlled, label the comparison inconclusive.

## Completion criteria

- Root cause and chosen intervention are documented.
- Automated checks and actual visual inspection are separately reported.
- Before/after comparisons use controlled conditions.
- Existing quality/performance gates remain satisfied.
- Environment limitations and unresolved defects are explicit.

## Source adaptation notes

Lively's exact WebGL2 architecture, palette, anti-glare thresholds, RTX 3050 assumptions, audio bands, and animation details are project-specific. The reusable method is controlled visual comparison, layer isolation, structural diagnosis, probes, and honest QA labels.
