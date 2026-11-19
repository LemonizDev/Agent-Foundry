const LEVEL = { low: 1, medium: 2, high: 3 };

const PATTERNS = [
  { task_class: "SECURITY_CRITICAL", re: /security|vulnerab|auth|permission|secret|credential|threat|exploit|access control|production data/i },
  { task_class: "VISUAL_OR_RUNTIME_QA", re: /visual|render|screenshot|browser|gpu|webgl|runtime|ui regression|layout|animation/i },
  { task_class: "ARCHITECTURE", re: /architect|system design|cross.module|migration|refactor|redesign|boundary|scalab|repository wide/i },
  { task_class: "DEBUGGING", re: /debug|bug|error|failure|crash|regression|root cause|intermittent|broken/i },
  { task_class: "RESEARCH", re: /research|investigate|compare|evaluate|benchmark|survey|source analysis/i },
  { task_class: "LONG_CONTEXT_SYNTHESIS", re: /entire repository|whole codebase|long context|history|synthesi[sz]e|reconcile documents/i },
  { task_class: "SMALL_TASK", re: /small task|simple|trivial|tiny|one.line|minor change|typo|small fix/i },
  { task_class: "FAST_LOOKUP", re: /find|lookup|locate|what is|where is|quick explanation|quick lookup|symbol/i },
  { task_class: "MECHANICAL", re: /rename|format|reformat|bulk update|metadata|boilerplate|simple repetitive|mechanical/i }
];

export function classifyTask(description) {
  const text = String(description ?? "").trim();
  if (!text) throw new Error("A task description is required.");
  const matched = PATTERNS.find(item => item.re.test(text));
  const task_class = matched?.task_class ?? "ROUTINE_IMPLEMENTATION";
  const risk = /security|vulnerab|auth|permission|secret|credential|production|data loss|database migration|payment|financial|money|delete|irreversible/i.test(text) ? "HIGH" : /deploy|release|user data|external api|database/i.test(text) ? "MEDIUM" : "LOW";
  const dimensions = {
    reasoning: /architect|root cause|ambiguous|novel|security|threat|cross.module|migration/i.test(text) ? 3 : /debug|compare|multiple|research|refactor/i.test(text) ? 2 : 1,
    scope: /entire repository|whole codebase|cross.module|repository wide|system/i.test(text) ? 3 : /multiple files|several files|subsystem|feature/i.test(text) ? 2 : 1,
    context: /history|entire repository|whole codebase|long context|multiple documents/i.test(text) ? 3 : /multiple files|architecture|several modules/i.test(text) ? 2 : 1,
    tools: /browser|runtime|gpu|deploy|database|integration|build|test suite/i.test(text) ? 3 : /tests|shell|script|multiple files/i.test(text) ? 2 : 1,
    uncertainty: /unknown|investigate|root cause|intermittent|ambiguous|unclear/i.test(text) ? 3 : /debug|research|compare/i.test(text) ? 2 : 1,
    verification: risk === "HIGH" || /security|migration|production|runtime|visual|regression/i.test(text) ? 3 : /feature|bug|debug|refactor/i.test(text) ? 2 : 1
  };
  const intensity = Object.values(dimensions).reduce((sum, value) => sum + value, 0);
  return {
    task_class, risk, dimensions, intensity,
    intensity_band: intensity <= 9 ? "LOW" : intensity <= 13 ? "MODERATE" : intensity <= 16 ? "HIGH" : "VERY_HIGH",
    latency_sensitive: ["FAST_LOOKUP", "MECHANICAL"].includes(task_class) || /fast|quick|low.latency|speed|time.sensitive|urgent|asap/i.test(text),
    rationale: matched ? "Matched task language for " + task_class : "Defaulted to routine implementation; refine classification if the task is more specialised."
  };
}

function capability(model, key) {
  return LEVEL[String(model.capabilities?.[key] ?? "unknown").toLowerCase()] ?? 0;
}

export function selectModel(classification, roster, settings = {}) {
  const candidates = [];
  const rejected = [];
  for (const model of roster?.models ?? []) {
    const reasons = [];
    if (model.availability !== "available") reasons.push("availability is not confirmed available");
    if (!model.model_id || !model.provider || String(model.model_id).startsWith("replace-")) reasons.push("provider/model ID is not configured");
    const allowed = model.constraints?.allowed_task_classes ?? [];
    const prohibited = model.constraints?.prohibited_task_classes ?? [];
    if (allowed.length && !allowed.includes(classification.task_class)) reasons.push("task class is not on the allowed list");
    if (prohibited.includes(classification.task_class)) reasons.push("task class is explicitly prohibited");
    const allowedAccess = settings.model_selection?.allowed_access ?? [];
    if (allowedAccess.length && !allowedAccess.includes(model.access)) reasons.push("access type is outside project policy");
    const maxLatency = settings.model_selection?.max_latency_ms;
    const measuredLatency = Number(model.performance?.latency_ms_p50);
    if (Number.isFinite(maxLatency) && maxLatency > 0 && Number.isFinite(measuredLatency) && measuredLatency > maxLatency) reasons.push("measured latency exceeds project limit");
    if (classification.risk === "HIGH") {
      if (capability(model, "reasoning") < 3) reasons.push("high-risk work requires high reasoning capability");
      if (capability(model, "instruction_following") < 3) reasons.push("high-risk work requires high instruction-following capability");
      if (model.evidence?.confidence !== "high") reasons.push("high-risk work requires high-confidence capability evidence");
    }
    if (["ROUTINE_IMPLEMENTATION", "DEBUGGING", "ARCHITECTURE"].includes(classification.task_class) && capability(model, "coding") < 2) reasons.push("coding capability is below the required floor");
    if (["VISUAL_OR_RUNTIME_QA"].includes(classification.task_class) && !(model.capabilities?.modalities ?? []).some(x => ["image", "video", "browser", "visual"].includes(String(x).toLowerCase()))) reasons.push("no visual modality or tool capability declared");
    if (classification.dimensions.tools === 3 && capability(model, "tool_calling") < 2) reasons.push("tool-calling capability is below the required floor");
    const contextWindow = Number(model.capabilities?.context_window_tokens);
    const requiredContext = classification.dimensions.context === 3 ? 100000 : classification.dimensions.context === 2 ? 16000 : 0;
    if (requiredContext && Number.isFinite(contextWindow) && contextWindow < requiredContext) reasons.push("context window is below the estimated task requirement");
    if (requiredContext >= 100000 && !Number.isFinite(contextWindow)) reasons.push("context window is unknown for a long-context task");
    if (reasons.length) { rejected.push({ alias: model.alias ?? "unnamed", reasons }); continue; }
    const weights = {
      SMALL_TASK: { reasoning: 1, coding: 1, tool_calling: 1, instruction_following: 2, structured_output: 1 },
      FAST_LOOKUP: { reasoning: 1, coding: 0, tool_calling: 1, instruction_following: 2, structured_output: 1 },
      MECHANICAL: { reasoning: 0, coding: 2, tool_calling: 2, instruction_following: 2, structured_output: 1 },
      ROUTINE_IMPLEMENTATION: { reasoning: 2, coding: 3, tool_calling: 2, instruction_following: 2, structured_output: 1 },
      DEBUGGING: { reasoning: 3, coding: 3, tool_calling: 2, instruction_following: 2, structured_output: 1 },
      ARCHITECTURE: { reasoning: 3, coding: 2, tool_calling: 1, instruction_following: 2, structured_output: 1 },
      RESEARCH: { reasoning: 2, coding: 0, tool_calling: 2, instruction_following: 2, structured_output: 2 },
      LONG_CONTEXT_SYNTHESIS: { reasoning: 3, coding: 0, tool_calling: 1, instruction_following: 2, structured_output: 2 },
      VISUAL_OR_RUNTIME_QA: { reasoning: 2, coding: 1, tool_calling: 3, instruction_following: 2, structured_output: 1 },
      SECURITY_CRITICAL: { reasoning: 3, coding: 2, tool_calling: 2, instruction_following: 3, structured_output: 2 }
    }[classification.task_class] ?? {};
    const score = Object.entries(weights).reduce((sum, [key, weight]) => sum + capability(model, key) * weight, 0);
    const latency = Number(model.performance?.latency_ms_p50);
    const latencyBonus = classification.latency_sensitive && Number.isFinite(latency) && latency > 0 ? Math.max(0, 3 - latency / 1000) : 0;
    const evidenceBonus = model.evidence?.confidence === "high" ? 2 : model.evidence?.confidence === "medium" ? 1 : 0;
    const sizeBonus = ["MECHANICAL", "SMALL_TASK"].includes(classification.task_class) && model.size_class === "small" ? 3 : classification.intensity_band === "VERY_HIGH" && model.size_class === "large" ? 2 : 0;
    const speedTierBonus = classification.latency_sensitive && model.speed_tier === "fast" ? 3 : 0;
    const preferredAccess = settings.model_selection?.preferred_access ?? [];
    const accessBonus = preferredAccess.includes(model.access) ? 3 : 0;
    const budgetBonus = model.constraints?.budget_priority === "lowest-cost" && model.access === "free" ? 2 : 0;
    candidates.push({ alias: model.alias, provider: model.provider, model_id: model.model_id, score: score + latencyBonus + evidenceBonus + sizeBonus + speedTierBonus + accessBonus + budgetBonus, latency_ms_p50: Number.isFinite(latency) ? latency : null, access: model.access ?? "unknown", size_class: model.size_class ?? "unknown", speed_tier: model.speed_tier ?? "unknown" });
  }
  candidates.sort((a, b) => b.score - a.score);
  return {
    selected: candidates[0] ?? null,
    alternatives: candidates.slice(1),
    rejected,
    independent_review_recommended: classification.risk === "HIGH" || classification.intensity_band === "VERY_HIGH",
    escalation_required: candidates.length === 0,
    explanation: candidates.length
      ? "Selected the highest-scoring eligible roster entry. This is a recommendation, not a model dispatch."
      : "No configured model passed the eligibility gates. Do not silently use an unlisted model or bypass owner constraints."
  };
}

export function validateModelRoster(roster) {
  const issues = [];
  if (!roster || roster.schema_version !== 1 || !Array.isArray(roster.models)) return [{ path: "models", issue: "Roster must have schema_version: 1 and a models array." }];
  const aliases = new Set();
  const levels = new Set(["low", "medium", "high", "unknown"]);
  const accessTypes = new Set(["free", "paid", "local", "enterprise", "unknown"]);
  const sizes = new Set(["small", "medium", "large", "unknown"]);
  const speeds = new Set(["fast", "balanced", "slow", "unknown"]);
  for (const [index, model] of roster.models.entries()) {
    const prefix = "models[" + index + "]";
    if (!model.alias || typeof model.alias !== "string") issues.push({ path: prefix + ".alias", issue: "A non-empty alias is required." });
    else if (aliases.has(model.alias)) issues.push({ path: prefix + ".alias", issue: "Model aliases must be unique." });
    else aliases.add(model.alias);
    if (!model.provider || !model.model_id) issues.push({ path: prefix, issue: "Provider and exact model_id are required." });
    if (!["available", "unavailable", "unknown"].includes(model.availability)) issues.push({ path: prefix + ".availability", issue: "Expected available, unavailable or unknown." });
    if (model.access && !accessTypes.has(model.access)) issues.push({ path: prefix + ".access", issue: "Unsupported access type." });
    if (model.size_class && !sizes.has(model.size_class)) issues.push({ path: prefix + ".size_class", issue: "Unsupported size class." });
    if (model.speed_tier && !speeds.has(model.speed_tier)) issues.push({ path: prefix + ".speed_tier", issue: "Unsupported speed tier." });
    for (const key of ["coding", "reasoning", "tool_calling", "structured_output", "retrieval", "vision", "instruction_following"]) {
      if (model.capabilities?.[key] !== undefined && !levels.has(String(model.capabilities[key]).toLowerCase())) issues.push({ path: prefix + ".capabilities." + key, issue: "Expected low, medium, high or unknown." });
    }
    if (model.capabilities?.context_window_tokens != null && (!Number.isInteger(model.capabilities.context_window_tokens) || model.capabilities.context_window_tokens < 1)) issues.push({ path: prefix + ".capabilities.context_window_tokens", issue: "Expected a positive integer or null." });
    if (model.capabilities?.modalities !== undefined && !Array.isArray(model.capabilities.modalities)) issues.push({ path: prefix + ".capabilities.modalities", issue: "Expected an array." });
    if (model.constraints?.allowed_task_classes !== undefined && !Array.isArray(model.constraints.allowed_task_classes)) issues.push({ path: prefix + ".constraints.allowed_task_classes", issue: "Expected an array." });
    if (model.constraints?.prohibited_task_classes !== undefined && !Array.isArray(model.constraints.prohibited_task_classes)) issues.push({ path: prefix + ".constraints.prohibited_task_classes", issue: "Expected an array." });
  }
  return issues;
}
