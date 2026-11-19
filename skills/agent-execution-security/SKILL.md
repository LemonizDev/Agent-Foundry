---
id: agent-execution-security
name: Coding-Agent Execution Threat Modelling
type: skill
version: 0.2.0
status: draft
portability: adaptable
sources:
  - repository: LemonizDev/dhan-chatgpt-connector
    path: docs/operations/KILO_UNATTENDED_EXECUTION_THREAT_MODEL.md
    ref: foundation/final-trader-architecture
---

# Coding-Agent Execution Threat Modelling

## Purpose

Evaluate whether an agent's tool permissions and execution environment safely constrain code, files, processes, network access and external effects.

## Threat areas

- Arbitrary command and child-process execution
- Filesystem escape, symlinks/reparse points and TOCTOU races
- Prompt injection through repository content and tool output
- Secret exposure through environment, profiles, logs and inherited credentials
- Network exfiltration and supply-chain execution
- Persistence, destructive changes and irreversible external actions
- Git hooks, CI configuration, package scripts and test code as execution surfaces

## Procedure

1. Map agent tools, permissions, execution identity and reachable resources.
2. Identify assets and trust boundaries.
3. Trace how untrusted model output can reach commands, file operations, network calls or external actions.
4. Examine child-process and filesystem enforcement at the OS boundary, not just prompt instructions or command-string allowlists.
5. Check network defaults, secrets exposure, workspace isolation and reset capability.
6. Check immutable/auditable records for actions and file changes.
7. Define owner-approval gates for destructive, costly, production or externally visible operations.
8. Produce a threat register with likelihood, impact, mitigations, residual risk and verdict.
9. Reject unattended execution when critical boundaries depend only on model compliance.

## Key principle

A model instruction is not a security boundary. A command allowlist is not sufficient if permitted programs can spawn children, load project-controlled code, or access credentials/network resources.

## Portability

The Dhan report's Windows Job Objects, restricted token and Kilo-specific details are platform examples, not universal implementation prescriptions. Select isolation controls for the actual host OS and runtime.
