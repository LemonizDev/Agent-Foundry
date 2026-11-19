import test from "node:test";
import assert from "node:assert/strict";
import { renderHostArtifacts } from "../src/host-adapters.js";

test("skills are mapped to detected host-native skill directories", () => {
  const resource = { id: "review", type: "skill", path: "skills/review/SKILL.md", version: "1" };
  const content = "---\nid: review\nname: Review\ntype: skill\n---\n\n## Purpose\nReview code safely.\n";
  const artifacts = renderHostArtifacts(resource, content, ["claude-code", "opencode", "cline", "kilo"]);
  const paths = artifacts.map(x => x.installed_path);
  assert.ok(paths.includes(".agents/skills/review/SKILL.md"));
  assert.ok(paths.includes(".claude/skills/review/SKILL.md"));
  assert.ok(paths.includes(".opencode/skills/review/SKILL.md"));
  assert.ok(paths.includes(".cline/skills/review/SKILL.md"));
  assert.ok(paths.includes(".kilo/skills/review/SKILL.md"));
});

test("command aliases become host slash command names", () => {
  const resource = { id: "close-session", type: "command", path: "commands/close-session.md", version: "1", aliases: ["close", "close session"] };
  const content = "---\nname: Close Session\ndescription: Save durable learnings.\n---\n\nClose this session safely.";
  const artifacts = renderHostArtifacts(resource, content, ["opencode", "kilo"]);
  const paths = artifacts.map(x => x.installed_path);
  assert.ok(paths.includes(".opencode/commands/close.md"));
  assert.ok(paths.includes(".opencode/commands/close/session.md"));
  assert.ok(paths.includes(".kilo/commands/close.md"));
  assert.ok(paths.includes(".kilo/commands/close-session.md"));
});

test("specialist profiles become host-native agents with reviewer restrictions", () => {
  const lead = { id: "lead-engineer", type: "profile", path: "profiles/lead-engineer.md", version: "1" };
  const reviewer = { id: "independent-reviewer", type: "profile", path: "profiles/independent-reviewer.md", version: "1" };
  const leadArtifacts = renderHostArtifacts(lead, "# Lead\n\n## Mission\nOwn engineering delivery.", ["opencode", "kilo"]);
  const reviewerArtifacts = renderHostArtifacts(reviewer, "# Reviewer\n\n## Mission\nReview changes independently.", ["opencode", "kilo"]);
  const kiloReviewer = reviewerArtifacts.find(x => x.installed_path === ".kilo/agents/independent-reviewer.md");
  const openReviewer = reviewerArtifacts.find(x => x.installed_path === ".opencode/agents/independent-reviewer.md");
  const claudeReviewer = reviewerArtifacts.find(x => x.installed_path === ".claude/agents/independent-reviewer.md");
  assert.match(leadArtifacts.find(x => x.installed_path === ".kilo/agents/lead-engineer.md").content, /mode: primary/);
  assert.match(kiloReviewer.content, /mode: subagent/);
  assert.match(kiloReviewer.content, /edit: deny/);
  assert.match(openReviewer.content, /effect: deny/);
  assert.match(claudeReviewer.content, /tools: Read, Grep, Glob/);
});
