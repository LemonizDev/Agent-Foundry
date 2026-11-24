---
id: installation-preview
name: Installation Preview
type: template
version: 0.1.0
portability: adaptable
status: draft
---

# Agent Foundry Installation Preview

```text
╔══════════════════════════════════════════════════════════════╗
║ INSTALLATION PLAN                                            ║
║ [PROJECT] · [HOST] · [SOURCE REVISION]                       ║
╚══════════════════════════════════════════════════════════════╝
```

## 1. Project detected

- **Project type:** [type and confidence]
- **Evidence:** [files and structures inspected]
- **Existing agent setup:** [host instructions and conventions]
- **Integration mode:** [NEW / EXISTING / PARTIAL / UPDATE]

## 2. Capability mapping

| Existing capability | Evidence | Foundry action | Reason |
|---|---|---|---|
| [capability] | [path] | KEEP / LINK / EXTEND / INSTALL / ADAPT / DEFER / EXCLUDE | [why] |

## 3. Proposed resources

Group by resource type. Use the resource-inventory template for full descriptions when the selection is large.

| Resource | Type | What it adds | Why selected |
|---|---|---|---|
| [human-readable name] | [type] | [actual purpose/content] | [project-specific reason] |

## 4. File changes

```text
.agent-foundry/
├── [file]                 [what it contains]
├── resources/
│   ├── [category]/        [selected resource files]
│   └── ...
└── [other file]           [purpose]
```

- **Create:** [exact paths]
- **Modify:** [exact paths and additive change]
- **Preserve:** [existing user-owned files and content]
- **Conflicts:** [overlap, hash drift or collision and resolution]

## 5. Exclusions

| Resource / capability | Decision | Reason |
|---|---|---|
| [name] | DEFER / EXCLUDE / KEEP | [specific reason] |

## 6. Host compatibility

- **Detected host/version:** [value or UNKNOWN]
- **Verified capabilities:** [actual evidence]
- **Not verified:** [host loading or invocation checks unavailable]

## 7. Approval gate

**Proposed scope:** [summary]  
**Risk:** [low / medium / high and why]  
**Approval required:** [exact action being approved]

Do not write files until the owner explicitly approves this plan.
