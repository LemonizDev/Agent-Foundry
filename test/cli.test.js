"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const {args,hash,safe,parseRegistry,select,main}=require("../bin/agent-foundry");
const fs=require("node:fs"),os=require("node:os"),path=require("node:path");
test("parses quoted multiword values",()=>assert.equal(args(["init","--project","folder with spaces"]).options.project,"folder with spaces"));
test("rejects missing option values",()=>assert.throws(()=>args(["init","--project"]),/Missing value/));
test("parses resource registry",()=>assert.equal(parseRegistry("resources:\n  - id: sample\n    type: skill\n    path: skills/SKILL.md\n")[0].path,"skills/SKILL.md"));
test("rejects duplicate IDs",()=>assert.throws(()=>parseRegistry("resources:\n  - id: x\n    type: skill\n    path: x\n  - id: x\n    type: skill\n    path: y\n"),/Invalid registry/));
test("blocks path traversal",()=>{assert.throws(()=>safe("/tmp/project","../outside"),/traversal/);assert.throws(()=>safe("/tmp/project","/etc/passwd"),/Unsafe/);});
test("hashes deterministically",()=>assert.equal(hash("abc"),hash("abc")));
test("selects only known resources",()=>{assert.deepEqual(select([{id:"a"}],"balanced","a"),[{id:"a"}]);assert.throws(()=>select([],"balanced","missing"),/Unknown/);});

test("plan-only init does not write files; apply creates a verifiable installation",async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"foundry-test-"));
 const previousFetch=global.fetch, previousLog=console.log;
 const registry="resources:\\n  - id: demo-skill\\n    type: skill\\n    path: skills/demo/SKILL.md\\n    version: 1.0.0\\n    status: draft\\n";
 global.fetch=async url=>({ok:true,status:200,text:async()=>String(url).endsWith("/registry/resources.yaml")?registry:"# Demo\\n"});
 console.log=()=>{};
 try{
  await main(["init","--project",root,"--repository","test/repo","--ref","test","--resources","demo-skill"]);
  assert.equal(fs.existsSync(path.join(root,".agent-foundry")),false);
  await main(["init","--project",root,"--repository","test/repo","--ref","test","--resources","demo-skill","--apply"]);
  await main(["validate","--project",root]);
  const manifest=JSON.parse(fs.readFileSync(path.join(root,".agent-foundry","manifest.json"),"utf8"));
  assert.equal(manifest.resources.length,1);
  assert.equal(manifest.resources[0].id,"demo-skill");
  fs.writeFileSync(path.join(root,".agent-foundry","owner-note.md"),"keep me");
  await main(["uninstall","--project",root,"--confirm"]);
  assert.equal(fs.existsSync(path.join(root,".agent-foundry","owner-note.md")),true);
  assert.equal(fs.existsSync(path.join(root,".agent-foundry","resources","skill","demo-skill","SKILL.md")),false);
 }finally{global.fetch=previousFetch;console.log=previousLog;fs.rmSync(root,{recursive:true,force:true});}
});
test("init refuses to overwrite an untracked resource file",async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"foundry-conflict-"));
 const previousFetch=global.fetch,previousLog=console.log;
 global.fetch=async url=>({ok:true,status:200,text:async()=>String(url).endsWith("/registry/resources.yaml")?"resources:\\n  - id: demo\\n    type: skill\\n    path: skills/demo.md\\n":"content"});
 console.log=()=>{};
 try{
  const dest=path.join(root,".agent-foundry","resources","skill","demo","demo.md");
  fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,"user data");
  await assert.rejects(()=>main(["init","--project",root,"--repository","test/repo","--resources","demo","--apply"]),/untracked files/);
  assert.equal(fs.readFileSync(dest,"utf8"),"user data");
 }finally{global.fetch=previousFetch;console.log=previousLog;fs.rmSync(root,{recursive:true,force:true});}
});
