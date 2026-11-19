---
id: visual-probe-engineering
name: Visual Diagnostic Probe Engineering
type: skill
version: 0.2.0
status: draft
portability: adaptable
sources:
  - repository: LemonizDev/futuristic-lively-wallpaper
    path: tools/probe-*.mjs
  - repository: LemonizDev/futuristic-lively-wallpaper
    path: tools/capture-*.mjs
    ref: main
---

# Visual Diagnostic Probe Engineering

## Purpose

Build targeted, repeatable probes that reveal whether a visual system's controls, inputs, layers, states and outputs behave as intended.

## Probe families evidenced by Lively

- Configuration/property wiring audits
- Input signal lifecycle and scaling
- Frequency-band independence and event response
- Layer isolation and contribution analysis
- Geometry/material/particle invariants
- Interaction and visible state changes
- Performance and long-duration stability
- Deterministic screenshots and A/B comparisons
- Packaging and runtime sanity checks

## Procedure

1. State one falsifiable question per probe.
2. Identify the observable signal and expected range/behaviour.
3. Control environment, viewport, quality tier, input fixture, clock and random seed where possible.
4. Isolate the component or layer under test.
5. Exercise normal, boundary, absent-input and failure conditions.
6. Capture machine-readable metrics and human-inspectable evidence.
7. Set explicit pass/fail/block conditions; unknown must not silently pass.
8. Verify the probe itself detects a deliberately introduced failure where practical.
9. Record dependencies and environment limitations.

## Constraints

Lively's scripts are tied to its WebGL2 renderer and should not be copied as universal utilities. Extract the probe design method; write target-specific adapters.

## Completion criteria

The probe has a reproducible invocation, defined inputs, falsifiable assertions, evidence output, and a known limitation statement.
