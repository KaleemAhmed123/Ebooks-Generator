// Check one category draft of booklet 03 against the term list, before the
// pages get regrouped by split-pages.mjs.
//
//   node tools/check-draft.mjs testing "Testing & Quality"
//
// Verifies: every assigned term present as an `##`, no `#`, no banned words,
// SVG conventions, and per-term word counts against the density budget.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const [slug, cat] = process.argv.slice(2);

const file = path.join(
  ROOT,
  "books/tech/production-terms/03-engineering-practice/pages",
  `02-draft-${slug}.md`,
);
const src = readFileSync(file, "utf8");
const want = JSON.parse(
  readFileSync(path.join(ROOT, "docs/tasks/production-terms-data/03-engineering-practice.json"), "utf8"),
)
  .filter((t) => t.cat === cat)
  .map((t) => t.term);

const got = [...src.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const missing = want.filter((t) => !got.includes(t));
const extra = got.filter((t) => !want.includes(t));

console.log(`${slug}: ${got.length} headings, ${want.length} expected`);
if (missing.length) console.log("  MISSING   :", missing.join(" · "));
if (extra.length) console.log("  UNEXPECTED:", extra.join(" · "));

const h1 = (src.match(/^# /gm) || []).length;
if (h1) console.log(`  H1 FOUND (must be 0): ${h1}`);

const banned =
  /\b(delve|foster|robust|demystify|embark|leverages?|leveraging|seamless|streamline|comprehensive|crucial|vital)\b/gi;
const hits = [...new Set((src.match(banned) || []).map((w) => w.toLowerCase()))];
if (hits.length) console.log("  BANNED WORDS:", hits.join(", "));

const svgs = [...src.matchAll(/viewBox="0 0 460 (\d+)"/g)].map((m) => +m[1]);
const badBox = (src.match(/<svg/g) || []).length - svgs.length;
console.log(`  visuals: ${svgs.length} svg (h=${svgs.join(",") || "-"}), ${(src.match(/^\|/gm) || []).length} table rows`);
if (badBox > 0) console.log(`  ${badBox} SVG(s) with a non-conforming viewBox`);
if (svgs.some((h) => h > 100)) console.log("  SVG taller than 100 — will eat page height");
if (/<rect[^>]*fill="(#fff|#ffffff|white)"/i.test(src))
  console.log("  WHITE RECT in an SVG — check it is not masking a line");

// Density: three terms share 186mm, so ~62mm each, ~90-130 words.
const blocks = src.split(/^(?=## )/m).filter((b) => b.trim().startsWith("## "));
const counts = blocks.map((b) => {
  const name = b.match(/^## (.+)/)[1].trim();
  const words = b.replace(/<svg[\s\S]*?<\/svg>/g, "").split(/\s+/).filter(Boolean).length;
  return { name, words, svg: /<svg/.test(b) };
});
const over = counts.filter((c) => c.words > 150);
console.log(`  words/term: min ${Math.min(...counts.map((c) => c.words))}, max ${Math.max(...counts.map((c) => c.words))}`);
if (over.length) console.log("  LONG:", over.map((c) => `${c.name} (${c.words})`).join(" · "));

const ok = !missing.length && !extra.length && !h1 && !hits.length;
console.log(ok ? "  PASS" : "  FAIL");
process.exit(ok ? 0 : 1);
