const LEVEL = { low: 1, medium: 2, high: 3 };

const PATTERNS = [
  { task_class: "SECURITY_CRITICAL", re: /security|vulnerab|auth|permission|secret|credential|threat|exploit|access control|production data|migration/i },
  { task_class: "VISUAL_OR_RUNTIME_QA", re: /visual|render|screenshot|browser|gpu|webgl|runtime|ui regression|layout|animation/i },
  { task_class: "ARCHITECTURE", re: /architect|system design|cross.module|migration|refactor|redesign|boundary|scalab|repository wide/i },
  { task_class: "DEBUGGING", re: /debug|bug|error|failure|crash|regression|root cause|intermittent|broken/i },
  { task_class: "RESEARCH", re: /research|investigate|compare|evaluate|benchmark|survey|source analysis/i },
  { task_class: "LONG_CONTEXT_SYNTHESIS", re: /entire repository|whole codebase|long context|history|synthesi[sz]e|reconcile documents/i },
  { task_class: "FAST_LOOKUP", re: /find|lookup|locate|what is|where is|quick explanation|symbol/i },
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
    latency_sensitive: ["FAST_LOOKUP", "MECHANICAL"].includes(task_class),
    rationale: matched ? "Matched task language for " + task_class : "Defaulted to routine implementation; refine classification if the task is more specialised."
  };
}

function capability(model, key) {
  return LEVEL[String(model.capabilities?.[key] ?? "unknown").toLowerCase()] ?? 0;
}

export function selectModel(classification, roster) {
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
    if (classification.risk === "HIGH") {
      if (capability(model, "reasoning") < 3) reasons.push("high-risk work requires high reasoning capability");
      if (capability(model, "instruction_following") < 3) reasons.push("high-risk work requires high instruction-following capability");
      if (model.evidence?.confidence !== "high") reasons.push("high-risk work requires high-confidence capability evidence");
    }
    if (["ROUTINE_IMPLEMENTATION", "DEBUGGING", "ARCHITECTURE"].includes(classification.task_class) && capability(model, "coding") < 2) reasons.push("coding capability is below the required floor");
    if (["VISUAL_OR_RUNTIME_QA"].includes(classification.task_class) && !(model.capabilities?.modalities ?? []).some(x => ["image", "video", "browser", "visual"].includes(String(x).toLowerCase()))) reasons.push("no visual modality or tool capability declared");
    if (classification.dimensions.tools === 3 && capability(model, "tool_calling") < 2) reasons.push("tool-calling capability is below the required floor");
    if (reasons.length) { rejected.push({ alias: model.alias ?? "unnamed", reasons }); continue; }
    const values = ["reasoning", "coding", "tool_calling", "instruction_following"];
    const score = values.reduce((sum, key) => sum + capability(model, key), 0);
    const latency = Number(model.performance?.latency_ms_p50);
    const latencyBonus = classification.latency_sensitive && Number.isFinite(latency) && latency > 0 ? Math.max(0, 3 - latency / 1000) : 0;
    const evidenceBonus = model.evidence?.confidence === "high" ? 2 : model.evidence?.confidence === "medium" ? 1 : 0;
    candidates.push({ alias: model.alias, provider: model.provider, model_id: model.model_id, score: score + latencyBonus + evidenceBonus, latency_ms_p50: Number.isFinite(latency) ? latency : null, access: model.access ?? "unknown" });
  }
  candidates.sort((a, b) => b.score - a.score);
  return {
    selected: candidates[0] ?? null,
    alternatives: candidates.slice(1),
    rejected,
    explanation: candidates.length
      ? "Selected the highest-scoring eligible roster entry. This is a recommendation, not a model dispatch."
      : "No configured model passed the eligibility gates. Do not silently use an unlisted model or bypass owner constraints."
  };
}
