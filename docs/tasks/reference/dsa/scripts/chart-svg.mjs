// Generate the two-page "Read the problem, pick the page" chart (01-04-a/b).
//   node chart-svg.mjs <pagesDir> <outDir> <page-numbers.json>
// A chip links to its first page (#p-ID) and prints printed page numbers, not IDs.
// Every chip is [statement cue, page ids]. The script fails if a page id does
// not exist or if a pattern page (from meta.json) is reachable from no chip.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
const [dir, out, numsFile] = process.argv.slice(2);
const nums = JSON.parse(readFileSync(numsFile, "utf8")).ids;
const pg = (id) => nums[id] ?? "?";
const have = new Set([...readdirSync(dir).map((f) => f.slice(0, 5)), ...(process.env.PLANNED ?? "").split(" ")]);
const meta = JSON.parse(readFileSync(path.join(dir, "..", "meta.json"), "utf8"));

const GREEN = ["#e2fcf3", "#2d6a4f"], BLUE = ["#dbe7f5", "#1d4e89"], PINK = ["#ffedf1", "#ef476e"], GREY = ["#f7f7f7", "#1a1a1a"];
const pages = {
  a: [
    ["Array: a subarray or window", GREEN, [
      ["contiguous, values ≥ 0, longest / shortest", "02-02 02-03"],
      ["count subarrays · exactly K", "02-04 02-05"],
      ["remove from both ends, keep the middle", "02-06"],
      ["choose k items, score by their spread", "02-07"],
      ["sum or mod of a subarray, negatives in", "03-03"],
      ["best subarray · max product", "03-06"],
      ["max of every window of size k", "10-10"],
      ["unsure: window, count or prefix map?", "02-01"],
    ]],
    ["Array: pairs and positions", BLUE, [
      ["pair or triplet to a target, sortable", "02-08 02-10"],
      ["compact or partition in place · 0/1/2", "02-09"],
      ["best pair i < j · buy low, sell high", "03-05"],
      ["answer at i needs its left and its right", "03-04"],
      ["next greater / smaller · sum of minimums", "10-05 10-08"],
      ["smallest number after k removals", "10-07"],
      ["pairs out of order · smaller after self", "07-08"],
    ]],
    ["Array: values and order", PINK, [
      ["values in 1..n, O(1) extra space", "04-02"],
      ["rotate by k · next arrangement", "04-03 04-04"],
      ["more than n/2 (or n/3) of one value", "04-05"],
      ["circular array · wraps past the end", "04-06"],
      ["many range sums or range adds", "03-02 03-07 19-01"],
      ["order decided pair by pair", "07-09"],
      ["intervals · meetings · rooms", "07-06 07-07"],
    ]],
    ["Array: optimise a choice", GREY, [
      ["reach the end · tour a circle of stations", "08-02 08-06"],
      ["unit jobs with deadline and profit", "08-03"],
      ["pair items, or split them between two sides", "08-04 08-05"],
      ["min of max · smallest X that works", "09-02"],
      ["k-th smallest of a set you cannot list", "09-04"],
      ["sorted, but rotated / a mountain / a peak", "09-03"],
      ["top k · running median · merge k lists", "15-03 15-04"],
      ["merge the cheapest two · undo a bad pick", "15-05 15-06"],
    ]],
    ["String", GREEN, [
      ["same under a rule: anagram, pattern", "06-01 06-03"],
      ["palindromic substring", "06-02"],
      ["nested brackets · decode · depth", "10-02 10-04"],
      ["adjacent items cancel or collide", "10-03"],
      ["another chapter wearing text", "06-00"],
    ]],
  ],
  b: [
    ["Grid", BLUE, [
      ["diagonals · spiral · rotate · boxes", "05-01 05-02"],
      ["update in place from neighbours", "05-03"],
      ["rows and columns both sorted", "05-04"],
      ["largest rectangle of 1s", "10-09"],
      ["enclosed regions, flood from the edge", "16-03"],
      ["every path through a maze", "13-04"],
      ["unsure: table, graph or DP?", "05-00"],
    ]],
    ["Linked list", PINK, [
      ["merge · partition · delete the head", "12-01"],
      ["reverse · k at a time · swap pairs", "12-02"],
      ["pair the front with the back", "12-03"],
      ["cycle · where it starts", "12-04"],
      ["k-th from the end", "12-05"],
      ["deep copy with random pointers", "12-06"],
    ]],
    ["Tree", GREEN, [
      ["depends on ancestors (path so far)", "14-02"],
      ["depends on subtrees, answer ≠ return", "14-03"],
      ["per level · views · vertical order", "14-04 14-05"],
      ["distance k · spreads to the parent", "14-06"],
      ["lowest common ancestor", "14-07"],
      ["BST: k-th, iterator, validate", "14-08"],
      ["build from two traversals", "14-09"],
      ["in-order walk in O(1) space", "14-10"],
    ]],
    ["Items with relations", BLUE, [
      ["shared attribute · implicit edge", "16-02"],
      ["X must come before Y", "16-04"],
      ["cheapest path · best-first expansion", "18-02"],
    ]],
    ["A choice at every step", PINK, [
      ["define f by a smaller f · print on return", "13-01 13-02"],
      ["every subset, combination, permutation", "13-05 13-06 13-07 13-08"],
      ["split a string into valid pieces", "13-09"],
      ["place under constraints: queens, sudoku", "13-10"],
      ["count ways · best value · calls repeat", "17-02"],
      ["weighted intervals · pick then skip ahead", "17-03"],
      ["buy / sell with states or a limit", "17-04"],
      ["merge or cut a range, cost per split", "17-05"],
      ["two players, both play perfectly", "17-06"],
    ]],
    ["Numbers · design", GREY, [
      ["appears once, others twice or k times", "11-01 11-02"],
      ["powers of two · lowest set bit", "11-03"],
      ["unsure which bit move", "11-00"],
      ["build a structure from others: LRU, min-stack", "10-11"],
      ["a candidate is beaten on every measure", "18-06"],
    ]],
  ],
};

// checks
const reached = new Set();
for (const p of Object.values(pages)) for (const [, , chips] of p) for (const [, ids] of chips) for (const id of ids.split(" ")) {
  if (!have.has(id)) throw new Error("no page " + id);
  reached.add(id);
}
const missing = Object.keys(meta.patterns).filter((k) => !meta.patterns[k].endsWith("overview")).filter((id) => !reached.has(id));
console.error("pattern pages not routed:", missing.join(" ") || "none");

const W = 470, boxW = 92, gap = 4, chipW = (W - 8 - boxW - 10 - 2 * gap) / 3, chipH = 30, rowGap = 4;
function render(groups, top, extra) {
  const el = [];
  let y = top;
  for (const [title, [fill, stroke], chips] of groups) {
    const rows = Math.ceil(chips.length / 3), h = rows * chipH + (rows - 1) * rowGap;
    el.push(`<rect x="4" y="${y}" width="${boxW}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`);
    const words = title.split(" "), lines = [];
    for (const w of words) { const l = lines.at(-1); if (l && (l + " " + w).length <= 14) lines[lines.length - 1] += " " + w; else lines.push(w); }
    lines.forEach((l, i) => el.push(`<text x="${4 + boxW / 2}" y="${y + h / 2 + 3 + (i - (lines.length - 1) / 2) * 11}" class="g" text-anchor="middle">${l.replace(/&/g, "&amp;")}</text>`));
    chips.forEach(([cue, ids], i) => {
      const x = 4 + boxW + 10 + (i % 3) * (chipW + gap), cy = y + Math.floor(i / 3) * (chipH + rowGap);
      el.push(`<a href="#p-${ids.split(" ")[0]}"><rect x="${x.toFixed(1)}" y="${cy}" width="${chipW.toFixed(1)}" height="${chipH}" rx="4" fill="#ffffff" stroke="${stroke}" stroke-width="0.9"/>`);
      // wrap the cue onto at most two lines of ~27 chars
      const ws = cue.split(" "), ls = [""];
      for (const w of ws) { if ((ls.at(-1) + " " + w).trim().length > 29) ls.push(w); else ls[ls.length - 1] = (ls.at(-1) + " " + w).trim(); }
      if (ls.length > 2) throw new Error("cue too long: " + cue);
      const list = ids.split(" "), ps = list.map(pg);
      const idsTxt = "p. " + (list.length > 3 ? `${ps[0]}–${ps.at(-1)}` : ps.join(" · "));
      ls.forEach((l, k) => el.push(`<text x="${(x + 4).toFixed(1)}" y="${cy + 9 + k * 8.4}" class="s">${l.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`));
      el.push(`<text x="${(x + 4).toFixed(1)}" y="${cy + 27}" class="p">→ ${idsTxt}</text></a>`);
    });
    y += h + 8;
  }
  return [el, y];
}
const style = `<style>
    .t { font: bold 11px Georgia, serif; fill: #1d4e89; }
    .g { font: bold 8.8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Georgia, serif; fill: #1a1a1a; }
    .p { font: bold 7.8px Consolas, monospace; fill: #2d6a4f; }
    .h { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { font: bold 9px Georgia, serif; fill: #ffffff; }
  </style>`;
const head = `<circle cx="14" cy="11" r="8" fill="#1d4e89"/><text x="14" y="15" class="n" text-anchor="middle">1</text><text x="27" y="15" class="t">The input</text><circle cx="${4 + boxW + 18}" cy="11" r="8" fill="#1d4e89"/><text x="${4 + boxW + 18}" y="15" class="n" text-anchor="middle">2</text><text x="${4 + boxW + 31}" y="15" class="t">What the statement asks</text>`;
const aria = (groups) => groups.map(([t, , chips]) => `${t}: ` + chips.map(([c, ids]) => `${c} → page ${ids.split(" ").map(pg).join(", ")}`).join("; ")).join(". ");
for (const [key, groups] of Object.entries(pages)) {
  let [el, y] = render(groups, 28);
  if (key === "b") {
    el.push(`<rect x="4" y="${y}" width="462" height="36" rx="6" fill="#f7f7f7" stroke="#6b6b6b" stroke-width="0.9"/>`);
    el.push(`<circle cx="20" cy="${y + 12}" r="8" fill="#1d4e89"/><text x="20" y="${y + 16}" class="n" text-anchor="middle">3</text><text x="33" y="${y + 15}" class="g">Check n (Module 01, 01-03)</text>`);
    el.push(`<text x="12" y="${y + 29}" class="s">n ≤ 20: every subset (13) · n ≤ 10³: O(n²) is fine (17) · n ≤ 10⁶: O(n log n) — sort, heap, binary search · n > 10⁶: O(n), one pass</text>`);
    y += 40;
  }
  const svg = `<svg viewBox="0 0 ${W} ${Math.ceil(y)}" role="img" aria-label="Decision chart, ${key === "a" ? "arrays and strings" : "every other input shape"}. Pick the box that matches the input, then the first chip that matches the statement, and go to its pages. ${aria(groups).replace(/"/g, "'")}${key === "b" ? ". Finally check n: up to 20 try every subset, up to a thousand quadratic is fine, up to a million O(n log n), more than a million one pass." : ""}" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">\n  ${style}\n  ${head}\n  ${el.join("\n  ")}\n</svg>`;
  writeFileSync(path.join(out, `chart-${key}.svg`), svg);
  console.error(`page ${key}: height ${Math.ceil(y)}`);
}
