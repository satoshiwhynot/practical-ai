/* Logic checks with DOM/Canvas doubles. These do not validate browser pixels. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class Element {
  constructor(id = "") { this.id=id; this.value=""; this.children=[]; this.listeners={}; this.style={}; this.disabled=false; this.hidden=false; this.width=1600; this.height=1000; this.attrs={}; this.classList={add(){},remove(){}}; }
  addEventListener(name, fn) { this.listeners[name]=fn; }
  setAttribute(name, value) { this.attrs[name]=value; }
  append(child) { this.children.push(child); }
  replaceChildren() { this.children=[]; }
  querySelectorAll() { return this.children.flatMap(child => child.children.filter(x=>x.attrs["aria-label"])); }
  focus() {}
  click() { this.clicked=true; if(this.listeners.click) this.listeners.click(); }
  getContext() { return {measureText:text=>({width:text.length*12}),fillRect(){},fillText(){},save(){},beginPath(){},rect(){},clip(){},drawImage(){},restore(){},ellipse(){},fill(){}}; }
  toBlob(callback) { callback({type:"image/png"}); }
}
const ids = ["sheet","message","count","export","clear","empty","title","columns","ratio","fit","theme","labels","note","image-list","files","dropzone","demo"];
const elements = Object.fromEntries(ids.map(id=>[id,new Element(id)]));
Object.assign(elements.title,{value:"Untitled exploration"});
for (const [id,value] of Object.entries({columns:"3",ratio:"1.7777778",fit:"contain",theme:"light",labels:"filename"})) elements[id].value=value;
const made=[];
const sandbox={document:{getElementById:id=>elements[id],createElement:tag=>{const e=new Element(tag);made.push(e);return e;}},window:{addEventListener(){}},URL:{createObjectURL:()=>"blob:test",revokeObjectURL(){}},setTimeout:fn=>fn(),Image:class{constructor(){this.width=100;this.height=100;}set src(value){queueMicrotask(()=>this.onload());}},console};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname,"../app.js"),"utf8"),sandbox);
const run=source=>vm.runInContext(source,sandbox);
let count=0;
function check(name,fn){fn();count++;console.log("ok - "+name);}

(async()=>{
  check("empty state disables export",()=>assert.equal(elements.export.disabled,true));
  elements.demo.click();
  check("sample renders six frames",()=>{assert.equal(run("images.length"),6);assert.equal(elements.empty.hidden,true);assert.match(elements.count.textContent,/06 IMAGES/);});
  check("reorder changes the real image array",()=>{elements["image-list"].children[0].children[2].click();assert.equal(run("images[0].name"),"form-study-02.png");});
  check("remove updates the array and list",()=>{elements["image-list"].children[0].children[3].click();assert.equal(run("images.length"),5);assert.equal(elements["image-list"].children.length,5);});
  check("layout changes produce a different sheet height",()=>{const before=elements.sheet.height;elements.columns.value="2";elements.columns.listeners.input();assert.notEqual(elements.sheet.height,before);});
  check("export requests a PNG download",()=>{elements.export.click();assert.equal(made.at(-1).download,"Form-studies-light-material.png");assert.equal(made.at(-1).clicked,true);});
  check("clear restores the empty state",()=>{elements.clear.click();assert.equal(run("images.length"),0);assert.equal(elements.export.disabled,true);});
  await run('addFiles([{name:"bad.svg",type:"image/svg+xml",size:10}])');
  check("unsupported files are rejected",()=>{assert.equal(run("images.length"),0);assert.match(elements.message.textContent,/unsupported format/);});
  await run('addFiles([{name:"large.png",type:"image/png",size:21000000}])');
  check("oversized files are rejected",()=>{assert.equal(run("images.length"),0);assert.match(elements.message.textContent,/larger than 20 MB/);});
  await run('addFiles([{name:"actual.png",type:"image/png",size:100}])');
  check("supported files enter the set after decoding",()=>{assert.equal(run("images.length"),1);assert.equal(elements.export.disabled,false);});
  console.log(`${count} behavior checks passed. Canvas pixels and browser downloads require manual verification.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
