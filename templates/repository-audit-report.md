---
id: repository-audit-report
name: Repository Audit Report
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Repository Audit

```text
╔══════════════════════════════════════════════════════════════╗
║ REPOSITORY AUDIT                                            ║
║ [PROJECT] · [DATE]                                          ║
╚══════════════════════════════════════════════════════════════╝
```

**Overall assessment:** [HEALTHY / NEEDS ATTENTION / AT RISK / UNKNOWN]  
**Scope:** [included areas]  
**Coverage:** [inspected areas] · [areas not inspected]

## 1. Executive assessment

[Plain-language conclusion: what the project is, how well it is organised, and the most consequential finding.]

## 2. Repository map

```text
[PROJECT ROOT]
├── [directory]    [purpose and key contents]
├── [directory]    [purpose and key contents]
└── [file]         [role / source-of-truth responsibility]
```

## 3. Architecture and source of truth

| Concern | Authoritative location | Evidence / caveat |
|---|---|---|
| Product direction | [path] | [evidence] |
| Architecture | [path] | [evidence] |
| Current status | [path] | [evidence] |
| Tests and quality | [path] | [evidence] |

## 4. Findings

| Priority | Finding | Evidence | Impact | Recommended action |
|---|---|---|---|---|
| [P0–P3] | [specific issue] | [path / line / check] | [consequence] | [bounded action] |

## 5. Strengths to preserve

- [Existing design, convention or control that should not be replaced.]

## 6. Gaps and unknowns

- [Gap supported by evidence, or unknown that could not be resolved.]

## 7. Recommended next action

**Next:** [one highest-value action]  
**Why now:** [impact, dependency or risk reduction]  
**Verification:** [how completion will be established]

---

**Evidence note:** [commands/checks actually run, date, environment, and limitations]
