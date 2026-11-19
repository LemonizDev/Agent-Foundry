---
id: architecture-design
name: Evidence-Based Architecture Design
type: skill
version: 0.1.0
portability: universal
status: draft
---

# Evidence-Based Architecture Design

## Purpose

Design system boundaries and technical decisions that solve the actual requirements while accounting for operational cost, complexity, failure modes and future change.

## Procedure

1. Establish requirements, quality attributes, constraints, non-goals and expected evolution.
2. Inspect the current architecture and identify which boundaries are stable versus accidental.
3. Map important data flows, trust boundaries, state ownership, interfaces and failure domains.
4. Identify viable alternatives, including retaining the current design.
5. Compare alternatives against correctness, complexity, operability, performance, security, cost, portability and reversibility.
6. Prefer the smallest architecture that satisfies demonstrated needs. Do not introduce distributed systems, agents, queues or abstractions without a concrete benefit.
7. Define component responsibilities, contracts, dependencies, state transitions and error behaviour.
8. Define migration and compatibility strategy, including coexistence, rollback and data conversion where relevant.
9. Identify operational ownership, observability, recovery and security controls.
10. Record the decision and rationale in the project's canonical decision/architecture source.
11. Define proof-of-concept or validation steps for the riskiest assumptions.

## Deliverable

Context, requirements, proposed architecture, alternatives considered, tradeoffs, component contracts, data flow, failure modes, migration plan, risks and validation criteria.

## Restrictions

Do not confuse extensibility with quality. Do not design around hypothetical scale without evidence. Do not present speculative performance claims as measurements.

## Completion criteria

The design is implementable, has explicit tradeoffs and failure behaviour, preserves project constraints, and identifies how the riskiest assumptions will be tested.
