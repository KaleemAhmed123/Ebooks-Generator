// Regroup a glossary booklet's term pages, packing each page by measured height.
//
//   node tools/split-pages.mjs 03-engineering-practice --check   report only
//   node tools/split-pages.mjs 03-engineering-practice           rewrite pages
//   node tools/split-pages.mjs 03-engineering-practice --dry     show the plan
//
// Collects every `## term` block across the booklet's `02-*.md` pages, sorts by
// the source order in docs/tasks/production-terms-data/, then renders every
// term in the real theme at the real column width, measures it, and fills each
// page up to the printable height.
//
// Why measured and not a fixed count: entries are not the same size. A term
// with a five-row table and an SVG is three times the height of a two-sentence
// one. A fixed three-per-page either overflows on the heavy pages or wastes a
// third of the light ones. Packing by height gives two terms on a dense page
// and four on a sparse one, and no page runs over.
//
// Why a script at all: grouping by hand produced the same two mistakes over and
// over — too many terms on a page, and wrong alphabetical order, because
// "Critical Rendering Path" sorts before "CSRF" and nobody sees that by eye. It
// also caught a term that had been silently dropped and missed on two visual
// passes.
//
// It refuses to write anything if a term is missing or unexpected, so a partial
// booklet fails loudly rather than being quietly reshuffled.

import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import puppeteer from "puppeteer-core";

const TOOLS = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(TOOLS, "..");
const SERIES = path.join(ROOT, "books/tech/production-terms");

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));

// Trim and margins come from shared/defaults.json, the same place the build
// reads them, so the two can never disagree about how tall a page is.
const defaults = JSON.parse(readFileSync(path.join(ROOT, "shared/defaults.json"), "utf8"));
const mm = (s) => parseFloat(s);
const PAGE_H = mm(defaults.page.height) - mm(defaults.page.margin.top) - mm(defaults.page.margin.bottom);
const PAGE_W = mm(defaults.page.width) - mm(defaults.page.margin.left) - mm(defaults.page.margin.right);

// The gap the theme puts above every entry after the first on a page.
const GAP_MM = 5;
// Chrome's own pagination rounds against us at the very edge, and a term whose
// callout lands exactly on the boundary gets pushed whole to the next page.
const SAFETY_MM = 4;

const booklet = process.argv[2];
const checkOnly = process.argv.includes("--check");
const dryRun = process.argv.includes("--dry");
if (!booklet) {
  console.error("usage: node tools/split-pages.mjs <booklet-dir> [--check] [--dry]");
  process.exit(1);
}

const dir = path.join(SERIES, booklet, "pages");
const dataFile = path.join(ROOT, "docs/tasks/production-terms-data", `${booklet}.json`);

const order = JSON.parse(readFileSync(dataFile, "utf8"))
  .map((t) => t.term)
  .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// Gather every term block currently on disk, keyed by its heading.
const pageFiles = readdirSync(dir).filter((f) => f.startsWith("02-") && f.endsWith(".md"));
const blocks = {};
for (const f of pageFiles) {
  for (const b of readFileSync(path.join(dir, f), "utf8").split(/^(?=## )/m)) {
    if (!b.trim()) continue;
    blocks[b.match(/^## (.+)/)[1].trim()] = b.trimEnd() + "\n";
  }
}

const missing = order.filter((t) => !blocks[t]);
const unexpected = Object.keys(blocks).filter((t) => !order.includes(t));

console.log(`${booklet}: ${Object.keys(blocks).length} written of ${order.length} expected`);
if (missing.length) console.log("  missing   :", missing.join(" · "));
if (unexpected.length) console.log("  unexpected:", unexpected.join(" · "));

if (missing.length || unexpected.length) {
  console.error("\nrefusing to rewrite pages — fix the term list first");
  process.exit(1);
}
if (checkOnly) {
  console.log("  complete");
  process.exit(0);
}

/* ------------------------------------------------------------ measuring --- */

// The theme cascade, same rule the build uses: shared/base.css, then every
// theme.css down the folder chain, deepest last so it wins.
function css() {
  const parts = [readFileSync(path.join(ROOT, "shared/base.css"), "utf8")];
  for (const p of [
    path.join(ROOT, "books/tech/theme.css"),
    path.join(SERIES, "theme.css"),
    path.join(SERIES, booklet, "theme.css"),
  ]) {
    if (existsSync(p)) parts.push(readFileSync(p, "utf8"));
  }
  return parts.join("\n");
}

// Raw <svg> must survive markdown untouched — it is full of blank lines, which
// otherwise tear the element apart.
function render(md, index, total) {
  const kept = [];
  const guarded = md.replace(/<svg[\s\S]*?<\/svg>/g, (m) => {
    kept.push(m);
    return `<!--SVG${kept.length - 1}-->`;
  });
  let html = marked.parse(guarded, { mangle: false, headerIds: false });
  html = html.replace(/<!--SVG(\d+)-->/g, (_, i) => kept[Number(i)]);
  // The badge is part of the entry's height, so the probe has to carry it.
  return `<p class="termno">Term ${index}/${total}</p>\n` + html;
}

const accent =
  JSON.parse(readFileSync(path.join(SERIES, booklet, "meta.json"), "utf8")).cover?.accent ?? "#1f6f8b";

const probe =
  `<!doctype html><html><head><meta charset="utf-8"><style>${css()}
   body { margin: 0; }
   .probe { --accent: ${accent}; }
   </style></head><body>` +
  order
    .map((t, i) => `<div class="probe page" data-term="${i}">${render(blocks[t], i + 1, order.length)}</div>`)
    .join("\n") +
  `</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.emulateMediaType("print");
await page.setViewport({ width: Math.round((PAGE_W * 96) / 25.4), height: 900 });
await page.setContent(probe, { waitUntil: "load" });
const heights = await page.evaluate(() => {
  const pxPerMm = 96 / 25.4;
  return [...document.querySelectorAll(".probe")].map((el) => el.getBoundingClientRect().height / pxPerMm);
});
await browser.close();

/* -------------------------------------------------------------- packing --- */

const budget = PAGE_H - SAFETY_MM;
const pages = [];
let cur = [];
let used = 0;

for (let i = 0; i < order.length; i++) {
  const cost = heights[i] + (cur.length ? GAP_MM : 0);
  if (cur.length && used + cost > budget) {
    pages.push(cur);
    cur = [];
    used = 0;
  }
  cur.push(i);
  used += cur.length === 1 ? heights[i] : cost;
}
if (cur.length) pages.push(cur);

const tall = order.filter((_, i) => heights[i] > budget);
if (tall.length) {
  console.log("\n  these terms are taller than one page on their own — cut them:");
  for (const t of tall) console.log(`    ${t}  ${heights[order.indexOf(t)].toFixed(0)}mm`);
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Sorted filenames decide page order, so the number has to be wide enough for
// the whole booklet. A booklet running past 99 pages needs three digits, or
// "02-10" sorts before "02-9".
const WIDTH = Math.max(2, String(pages.length).length);
const name = (group, n) => {
  const first = order[group[0]];
  const last = order[group[group.length - 1]];
  const num = String(n).padStart(WIDTH, "0");
  return group.length === 1
    ? `02-${num}-${slug(first)}.md`
    : `02-${num}-${slug(first)}-to-${slug(last)}.md`;
};

console.log(`\n  printable ${PAGE_H}mm, packing to ${budget}mm`);
for (const [n, group] of pages.entries()) {
  const h = group.reduce((a, i) => a + heights[i], 0) + GAP_MM * (group.length - 1);
  console.log(`  ${name(group, n + 1).padEnd(58)} ${group.length} terms  ${h.toFixed(0)}mm`);
}

const counts = pages.reduce((a, g) => ((a[g.length] = (a[g.length] ?? 0) + 1), a), {});
console.log(
  `\n  ${pages.length} pages: ` +
    Object.keys(counts)
      .sort()
      .map((k) => `${counts[k]} x ${k}-term`)
      .join(", ")
);

if (dryRun) {
  console.log("\n  --dry, nothing written");
  process.exit(0);
}

for (const f of pageFiles) unlinkSync(path.join(dir, f));
for (const [n, group] of pages.entries()) {
  writeFileSync(path.join(dir, name(group, n + 1)), group.map((i) => blocks[order[i]]).join("\n"));
}

console.log(`\nrewrote ${pages.length} pages — now run:`);
console.log(`  node tools/build.mjs ${booklet}`);
