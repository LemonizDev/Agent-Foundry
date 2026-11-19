import yaml from "js-yaml";

function splitFrontmatter(content) {
  if (!content.startsWith("---\n")) return { metadata: {}, body: content };
  const end = content.indexOf("\n---", 4);
  if (end < 0) return { metadata: {}, body: content };
  return {
    metadata: yaml.load(content.slice(4, end)) ?? {},
    body: content.slice(end + 4).replace(/^\n/, "")
  };
}

function descriptionFor(metadata, body, id) {
  if (typeof metadata.description === "string" && metadata.description.trim()) return metadata.description.trim().slice(0, 1000);
  const purpose = body.match(/^## Purpose\s*\n+([^\n]+(?:\n(?!#)[^\n]+)*)/m);
  if (purpose) return purpose[1].replace(/\s+/g, " ").trim().slice(0, 1000);
  return String(metadata.name ?? id).replace(/[-_]/g, " ");
}

function skillDocument(id, description, body) {
  const safeDescription = description.replaceAll('"', "'").replaceAll("\n", " ").slice(0, 1000);
  return "---\nname: " + id + "\ndescription: \"" + safeDescription + "\"\n---\n\n" + body.trimStart();
}

function commandDocument(description, body, host) {
  const safeDescription = description.replaceAll('"', "'").replaceAll("\n", " ").slice(0, 1000);
  if (host === "opencode") return "---\ndescription: \"" + safeDescription + "\"\n---\n\n" + body.trim() + "\n\nApply this command to the user's requested scope and arguments: $ARGUMENTS\n";
  if (host === "kilo") return "---\ndescription: \"" + safeDescription + "\"\nagent: code\n---\n\n" + body.trim() + "\n\nApply this command to the scope and arguments provided by the user.\n";
  return skillDocument("agent-foundry-command", description, body);
}

function aliasesFor(resource, metadata, id) {
  const values = Array.isArray(resource.aliases) ? resource.aliases : Array.isArray(metadata.aliases) ? metadata.aliases : [];
  const aliases = values.map(value => String(value).trim().replace(/^\//, "").split(/\s+/).join("/")).filter(Boolean);
  if (!aliases.length) aliases.push(id);
  return [...new Set(aliases)];
}

export function renderHostArtifacts(resource, content, hosts = []) {
  const { metadata, body } = splitFrontmatter(content);
  const description = descriptionFor(metadata, body, resource.id);
  const artifacts = [];
  const add = (installed_path, adapter_kind, alias, rendered) => artifacts.push({
    id: resource.id, source_path: resource.path, installed_path, adapter_kind, alias,
    version: resource.version, source_sha256: null, installed_sha256: null, content: rendered
  });
  const skillHosts = ["codex", ...(hosts.includes("claude-code") ? ["claude"] : []), ...(hosts.includes("opencode") ? ["opencode"] : []), ...(hosts.includes("cline") ? ["cline"] : [])];
  if (resource.type === "skill") {
    const slug = resource.id;
    for (const host of skillHosts) {
      const root = host === "codex" ? ".agents/skills" : host === "claude" ? ".claude/skills" : host === "opencode" ? ".opencode/skills" : ".cline/skills";
      add(root + "/" + slug + "/SKILL.md", "skill:" + host, slug, skillDocument(slug, description, body));
    }
  }
  if (resource.type === "command") {
    const aliases = aliasesFor(resource, metadata, resource.id);
    for (const alias of aliases) {
      const nested = alias.split("/").map(part => part.replace(/[^a-zA-Z0-9_-]/g, "")).filter(Boolean).join("/");
      if (!nested) continue;
      if (hosts.includes("opencode")) add(".opencode/commands/" + nested + ".md", "command:opencode", nested, commandDocument(description, body, "opencode"));
      if (hosts.includes("kilo")) add(".kilo/commands/" + nested + ".md", "command:kilo", nested, commandDocument(description, body, "kilo"));
      for (const host of skillHosts.filter(name => name !== "opencode")) {
        const root = host === "codex" ? ".agents/skills" : host === "claude" ? ".claude/skills" : ".cline/skills";
        add(root + "/" + nested.replaceAll("/", "-") + "/SKILL.md", "command-skill:" + host, nested, skillDocument(nested.replaceAll("/", "-"), description, body));
      }
    }
  }
  return artifacts;
}

export function describeHostSupport(hosts = []) {
  return {
    detected: hosts,
    adapters: {
      codex: { enabled: true, mechanism: ".agents/skills plus AGENTS.md", status: "generated; host runtime not exercised by installer" },
      claude: { enabled: hosts.includes("claude-code"), mechanism: ".claude/skills plus existing CLAUDE.md pointer", status: hosts.includes("claude-code") ? "generated; host runtime not exercised by installer" : "not detected" },
      opencode: { enabled: hosts.includes("opencode"), mechanism: ".opencode/skills and .opencode/commands", status: hosts.includes("opencode") ? "generated; host runtime not exercised by installer" : "not detected" },
      cline: { enabled: hosts.includes("cline"), mechanism: ".cline/skills", status: hosts.includes("cline") ? "generated; host runtime not exercised by installer" : "not detected" },
      kilo: { enabled: hosts.includes("kilo"), mechanism: ".kilo/commands", status: hosts.includes("kilo") ? "generated; host runtime not exercised by installer" : "not detected" }
    }
  };
}
