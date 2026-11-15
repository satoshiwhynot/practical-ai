/* Framekit: plain browser APIs, no dependencies and no network requests. */
"use strict";
const $ = id => document.getElementById(id);
const canvas = $("sheet"), ctx = canvas.getContext("2d");
const MAX_FILES = 40, MAX_BYTES = 20 * 1024 * 1024, MAX_PIXELS = 24e6;
let images = [], loading = false, generation = 0;
const allowed = new Set(["image/png", "image/jpeg", "image/webp"]);

function status(text) { $("message").textContent = text; }
function ellipsis(text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let result = text;
  while (result.length && ctx.measureText(result + "…").width > maxWidth) result = result.slice(0, -1);
  return result + "…";
}
function wrap(text, maxWidth) {
  const lines = []; let line = "";
  for (const char of text) {
    if (char === "\n" || ctx.measureText(line + char).width > maxWidth) { lines.push(line); line = char === "\n" ? "" : char; }
    else line += char;
  }
  if (line) lines.push(line);
  return lines;
}
function render() {
  $("count").textContent = images.length ? `${String(images.length).padStart(2,"0")} IMAGES / YOUR ORDER` : "NO IMAGES YET";
  $("export").disabled = !images.length || loading;
  $("clear").disabled = !images.length;
  $("empty").hidden = !!images.length;
  canvas.style.display = images.length ? "block" : "none";
  renderList();
  if (!images.length) return;
  const cols = Number($("columns").value), ratio = Number($("ratio").value);
  const pad = 64, gap = 24, cellW = (1600 - pad * 2 - gap * (cols - 1)) / cols;
  const cellH = cellW / ratio, labelH = 45;
  const rows = Math.ceil(images.length / cols), dark = $("theme").value === "dark";
  ctx.font = "24px sans-serif";
  const noteLines = wrap($("note").value.trim(), 1472);
  const header = 174 + noteLines.length * 32;
  canvas.height = Math.ceil(header + rows * (cellH + labelH + gap) + pad);
  ctx.fillStyle = dark ? "#191e1a" : "#fafaf5"; ctx.fillRect(0, 0, 1600, canvas.height);
  ctx.fillStyle = dark ? "#d9f276" : "#687e30"; ctx.font = "18px sans-serif";
  ctx.fillText("FRAMEKIT / CONTACT SHEET", pad, 55);
  ctx.fillStyle = dark ? "#f4f3ee" : "#20251f"; ctx.font = "48px sans-serif";
  ctx.fillText(ellipsis($("title").value || "Untitled exploration", 1472), pad, 120);
  ctx.font = "24px sans-serif"; ctx.fillStyle = dark ? "#aab3a7" : "#71766c";
  noteLines.forEach((line, i) => ctx.fillText(line, pad, 158 + i * 32));
  images.forEach((item, i) => {
    const x = pad + (i % cols) * (cellW + gap), y = header + Math.floor(i / cols) * (cellH + labelH + gap);
    ctx.fillStyle = dark ? "#2a302a" : "#e9ece2"; ctx.fillRect(x, y, cellW, cellH);
    const scale = ($("fit").value === "cover" ? Math.max : Math.min)(cellW / item.image.width, cellH / item.image.height);
    const w = item.image.width * scale, h = item.image.height * scale;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, cellW, cellH); ctx.clip();
    ctx.drawImage(item.image, x + (cellW-w)/2, y + (cellH-h)/2, w, h); ctx.restore();
    ctx.fillStyle = dark ? "#cbd1c5" : "#555e4b"; ctx.font = "19px sans-serif";
    const label = String(i+1).padStart(2,"0") + ($("labels").value === "filename" ? `  ${item.name}` : "");
    ctx.fillText(ellipsis(label, cellW), x, y + cellH + 29);
  });
  ctx.font = "17px sans-serif"; ctx.fillStyle = dark ? "#7e8978" : "#92998a";
  ctx.fillText(`${images.length} images · framekit by satoshi 001`, pad, canvas.height - 28);
}
function renderList() {
  $("image-list").replaceChildren();
  images.forEach((item, i) => {
    const li = document.createElement("li"), label = document.createElement("span");
    label.textContent = `${String(i+1).padStart(2,"0")}  ${item.name}`; li.append(label);
    for (const [name, text, disabled, action] of [
      ["Move up", "↑", i === 0, () => { [images[i-1], images[i]] = [images[i], images[i-1]]; }],
      ["Move down", "↓", i === images.length-1, () => { [images[i], images[i+1]] = [images[i+1], images[i]]; }],
      ["Remove", "×", false, () => { images.splice(i,1); }]
    ]) {
      const button = document.createElement("button"); button.textContent = text;
      button.setAttribute("aria-label", `${name} ${item.name}`); button.disabled = disabled || loading;
      button.addEventListener("click", () => { action(); render(); const buttons = $("image-list").querySelectorAll("button"); if (buttons.length) buttons[Math.min(i*3,buttons.length-1)].focus(); });
      li.append(button);
    }
    $("image-list").append(li);
  });
}
function loadImage(url) {
  return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("could not decode image")); image.src = url; });
}
async function addFiles(files) {
  if (loading) { status("Please wait for this set to finish loading."); return; }
  loading = true; const ownGeneration = ++generation; render();
  const errors = [], accepted = Array.from(files); let added = 0;
  for (const file of accepted) {
    if (images.length >= MAX_FILES) { errors.push("The 40-image limit was reached."); break; }
    if (!allowed.has(file.type)) { errors.push(`${file.name}: unsupported format.`); continue; }
    if (file.size > MAX_BYTES) { errors.push(`${file.name}: larger than 20 MB.`); continue; }
    let url;
    try {
      url = URL.createObjectURL(file); const image = await loadImage(url);
      if (ownGeneration !== generation) break;
      if (image.width * image.height > MAX_PIXELS) { errors.push(`${file.name}: larger than 24 megapixels.`); continue; }
      // Keep a reduced in-memory copy so a large set does not retain full-size decodes.
      const copy = document.createElement("canvas"), scale = Math.min(1, 2000/Math.max(image.width,image.height));
      copy.width = Math.round(image.width*scale); copy.height = Math.round(image.height*scale);
      copy.getContext("2d").drawImage(image,0,0,copy.width,copy.height);
      images.push({name:file.name, image:copy}); added++;
    } catch (_) { errors.push(`${file.name}: could not decode image.`); }
    finally { if (url) URL.revokeObjectURL(url); }
  }
  loading = false; $("files").value = ""; render();
  status(`${added} image${added === 1 ? "" : "s"} added.${errors.length ? " " + errors.join(" ") : " Use the arrows below to reorder."}`);
}
$("files").addEventListener("change", e => addFiles(e.target.files));
$("dropzone").addEventListener("dragover", e => { e.preventDefault(); $("dropzone").classList.add("over"); });
$("dropzone").addEventListener("dragleave", () => $("dropzone").classList.remove("over"));
$("dropzone").addEventListener("drop", e => { e.preventDefault(); $("dropzone").classList.remove("over"); addFiles(e.dataTransfer.files); });
// Prevent an accidental drop outside the target from navigating away.
window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => e.preventDefault());
for (const id of ["title","columns","ratio","fit","theme","labels","note"]) $(id).addEventListener("input",render);
$("clear").addEventListener("click", () => { generation++; images = []; render(); status("Set cleared. Your original files are unchanged."); });
$("export").addEventListener("click", () => {
  canvas.toBlob(blob => {
    if (!blob) { status("Export failed. Try fewer images."); return; }
    const url = URL.createObjectURL(blob), a = document.createElement("a");
    const name = $("title").value.trim().replace(/[^a-z0-9_-]+/gi,"-").replace(/^-|-$/g,"") || "contact-sheet";
    a.href = url; a.download = `${name}.png`; a.click(); setTimeout(() => URL.revokeObjectURL(url),10000);
    status("PNG exported. Original images are unchanged.");
  }, "image/png");
});
$("demo").addEventListener("click", () => {
  if (loading) return;
  images = Array.from({length:6}, (_, i) => {
    const c = document.createElement("canvas"); c.width = 800; c.height = 450;
    const g = c.getContext("2d"), palettes = [["#c9d3b0","#294338"],["#e2cba6","#8d5839"],["#c6d6e2","#3e546d"],["#ddcbc7","#694d61"],["#dad5b1","#60673b"],["#ccd3ce","#445f59"]];
    g.fillStyle = palettes[i][0]; g.fillRect(0,0,800,450);
    g.fillStyle = palettes[i][1]; g.beginPath(); g.ellipse(400,260,110+i*7,130-i*5,i*.2,0,Math.PI*2); g.fill();
    g.fillStyle = "#ffffff50"; g.fillRect(380+i*8,80,28,310);
    g.fillStyle = palettes[i][1]; g.font = "16px sans-serif"; g.fillText(`FORM STUDY / 0${i+1}`,32,40);
    return {name:`form-study-0${i+1}.png`,image:c};
  });
  $("title").value = "Form studies / light & material";
  $("note").value = "A synthetic sample set. Compare palette, silhouette and contrast.";
  render(); status("Sample loaded. These six images are drawn locally, without AI generation.");
});
render();
