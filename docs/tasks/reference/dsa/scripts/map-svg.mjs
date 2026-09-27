// Generate the 54-pattern map SVG for 01-02 from meta.json `patterns`.
//   node map-svg.mjs <meta.json>  > svg
import { readFileSync } from "node:fs";
const meta = JSON.parse(readFileSync(process.argv[2], "utf8"));
const chapters = {
  2: "Windows & Pointers", 3: "Prefix & Running State", 4: "In-Place & Index Tricks", 5: "Grids & Matrices",
  6: "Strings", 7: "Order & Intervals", 8: "Greedy Moves", 9: "Search Space", 10: "Stacks & Queues",
  11: "Bits", 12: "Linked Lists", 13: "Recursion & Backtracking", 14: "Trees", 15: "Heaps & Ordered Sets",
  16: "Graphs & Dependency", 17: "DP & Games", 18: "Patterns Nobody Named", 19: "Range Structures",
};
// pattern number -> { name, ids[] }
const pats = new Map();
for (const [id, label] of Object.entries(meta.patterns).filter(([, v]) => !v.endsWith("overview"))) {
  const m = label.match(/^Pattern (\d+) · (.+?)(?: · move \d+\/\d+)?$/);
  const n = Number(m[1]);
  if (!pats.has(n)) pats.set(n, { name: m[2], ids: [] });
  pats.get(n).ids.push(id);
}
const esc = (s) => s.replace(/&/g, "&amp;");
const rows = { L: [], R: [] };
let last = 0;
for (const [n, p] of [...pats].sort((a, b) => a[0] - b[0])) {
  const ch = Number(p.ids[0].slice(0, 2));
  const col = ch <= 10 ? "L" : "R";
  if (ch !== last) { rows[col].push({ head: `${ch}  ${chapters[ch]}` }); last = ch; }
  const ids = p.ids.sort();
  const pages = ids.length === 1 ? ids[0] : ids.length === 2 ? `${ids[0]} · ${ids[1]}` : `${ids[0]} … ${ids.at(-1)}`;
  rows[col].push({ n, name: p.name, pages, moves: ids.length });
}
const LH = 13.6, top = 16, W = 470, colX = { L: 4, R: 240 }, colW = 226;
const lines = [];
let maxY = 0;
for (const col of ["L", "R"]) {
  let y = top;
  for (const r of rows[col]) {
    const x = colX[col];
    if (r.head) {
      y += 4;
      lines.push(`<text x="${x}" y="${y}" class="ch">${esc(r.head)}</text>`);
      lines.push(`<line x1="${x}" y1="${y + 3}" x2="${x + colW}" y2="${y + 3}" class="rule"/>`);
      y += LH;
      continue;
    }
    lines.push(`<text x="${x + 14}" y="${y}" class="num" text-anchor="end">${r.n}</text>`);
    lines.push(`<text x="${x + 20}" y="${y}" class="nm">${esc(r.name)}${r.moves > 1 ? ` <tspan class="mv">×${r.moves}</tspan>` : ""}</text>`);
    lines.push(`<text x="${x + colW}" y="${y}" class="pg" text-anchor="end">${r.pages}</text>`);
    y += LH;
  }
  maxY = Math.max(maxY, y);
}
const H = Math.ceil(maxY);
console.log(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The 54 patterns of this book, numbered 1 to 54 in reading order and grouped by chapter, chapters 2 to 10 on the left and 11 to 19 on the right. Each row gives the pattern number, its name, how many moves it has when more than one, and its page IDs." xmlns="http://www.w3.org/2000/svg">
  <style>
    .ch { font: bold 8.6px Georgia, serif; fill: #1d4e89; }
    .rule { stroke: #1d4e89; stroke-width: 0.5; }
    .num { font: bold 8.4px Consolas, monospace; fill: #2d6a4f; }
    .nm { font: 8.6px Georgia, serif; fill: #1a1a1a; }
    .mv { font: bold 7px Consolas, monospace; fill: #8a5a00; }
    .pg { font: 7.6px Consolas, monospace; fill: #6b6b6b; }
  </style>
  ${lines.join("\n  ")}
</svg>`);
console.error(`rows L ${rows.L.length} R ${rows.R.length} height ${H}`);
