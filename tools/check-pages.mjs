// Mechanical checks for a booklet's pages. Zero tokens: run it instead of a
// consistency agent for anything a regex can catch.
//   node tools/check-pages.mjs books/tech/system-design/02-data
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const dir = path.join(process.argv[2], "pages");
const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("00-")).sort();
const banned = /\b(delve|foster|robust|demystify|embark|leverage|seamless|streamline|comprehensive|powerful|efficient)\b/i;
const throat = /in this section|it is important to note|let's|in conclusion|as we (saw|discussed)/i;
const modules = new Map(); // module no → title
const problems = [], notes = [];
const say = (f, msg) => problems.push(`${f}: ${msg}`);

for (const f of files) {
  const s = readFileSync(path.join(dir, f), "utf8");
  const mod = f.slice(0, 2), page = f.slice(3, 5);
  const h1 = s.match(/^# Module (\d+) - (.+)$/m);
  if (page === "01" && !h1) say(f, "module-opening page has no '# Module N - Title'");
  if (page !== "01" && /^# /m.test(s)) say(f, "non-opening page has a '#' heading");
  if (h1) { modules.set(Number(h1[1]), h1[2]); if (Number(h1[1]) !== Number(mod)) say(f, `heading says Module ${h1[1]}, filename says ${Number(mod)}`); }
  const h2 = (s.match(/^## /gm) || []).length;
  if (h2 !== 1) say(f, `${h2} '##' headings (need exactly 1)`);
  const visuals = (s.match(/<svg/g) || []).length + (s.match(/^\|.*\|$/gm) ? s.split(/\n\n/).filter((b) => /^\|/.test(b)).length : 0) + (s.match(/^```/gm) || []).length / 2;
  if (visuals > 2) say(f, `${visuals} visuals (max 2)`);
  if ((s.match(/^:::interview/gm) || []).length > 1) say(f, "more than one :::interview block");
  for (const [i, line] of s.split("\n").entries()) {
    if (line.includes("aria-label")) continue;
    if (banned.test(line)) say(f, `line ${i + 1}: banned word — ${line.match(banned)[0]}`);
    if (throat.test(line)) say(f, `line ${i + 1}: throat-clearing — ${line.match(throat)[0]}`);
    if (/^- .*!$/.test(line)) say(f, `line ${i + 1}: exclamation mark`);
    if (/\\n$/.test(line)) say(f, `line ${i + 1}: literal \\n`);
  }
  if (!/^### The failure/m.test(s)) notes.push(`${f}: no '### The failure' section; check the failure mode is still named`);
}
// cross-references: "Module N, page M" and "page M of this module"
for (const f of files) {
  const s = readFileSync(path.join(dir, f), "utf8");
  for (const m of s.matchAll(/Module (\d+)(?:, page (\d+))?/g)) {
    const mod = Number(m[1]), pg = m[2] ? Number(m[2]) : null;
    if (!modules.has(mod)) { say(f, `refers to Module ${mod}, which does not exist here (fine only if it names another booklet)`); continue; }
    if (pg !== null && !files.some((x) => x.startsWith(`${String(mod).padStart(2, "0")}-${String(pg).padStart(2, "0")}-`))) say(f, `refers to Module ${mod}, page ${pg}: no such page`);
  }
  for (const m of s.matchAll(/page (\d+) of this module/g)) {
    const pg = Number(m[1]), mod = f.slice(0, 2);
    if (!files.some((x) => x.startsWith(`${mod}-${String(pg).padStart(2, "0")}-`))) say(f, `refers to page ${pg} of this module: no such page`);
  }
}
console.log(`${files.length} pages, ${modules.size} modules`);
for (const [n, t] of [...modules].sort((a, b) => a[0] - b[0])) console.log(`  ${n}. ${t} (${files.filter((f) => Number(f.slice(0, 2)) === n).length})`);
for (const n of notes) console.log("  note  " + n);
if (problems.length) { console.log(`\n${problems.length} problems`); for (const p of problems) console.log("  " + p); process.exit(1); }
console.log("no problems");
