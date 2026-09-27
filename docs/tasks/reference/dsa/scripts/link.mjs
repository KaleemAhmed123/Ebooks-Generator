// Rewrite the problem cell of every drill row with verified links.
//   node link.mjs <pagesDir> <scratchDir> [--write]
// Auto: "Title (LeetCode N)" where Title is exactly the live title.
// Otherwise the row must be in overrides.json; tokens expand to links:
//   {LC:n}  {GFG:slug:Title}  {SPOJ:CODE:Title}
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const [dir, sp, flag] = process.argv.slice(2);
const lc = JSON.parse(readFileSync(path.join(sp, "lc-map.json"), "utf8"));
const gfg = new Map(JSON.parse(readFileSync(path.join(sp, "gfg-index.json"), "utf8")).map((x) => [x.u, x.n]));
const over = JSON.parse(readFileSync(path.join(sp, "overrides.json"), "utf8"));
const used = new Set(), errors = [], unlinked = [], urls = [];

const expand = (s, where) => s
  .replace(/\{LC:(\d+)\}/g, (_, n) => {
    const q = lc[n]; if (!q) { errors.push(`${where}: no LC ${n}`); return _; }
    const u = `https://leetcode.com/problems/${q.s}/`; urls.push(u);
    return `[${q.t}](${u}) (LeetCode ${n})`;
  })
  .replace(/\{GFG:([^:}]+):([^}]+)\}/g, (_, slug, title) => {
    const u = `https://www.geeksforgeeks.org/problems/${slug}/1`;
    if (gfg.get(u) !== title) errors.push(`${where}: GFG ${slug} is "${gfg.get(u)}", not "${title}"`);
    urls.push(u); return `[${title}](${u}) (GFG)`;
  })
  .replace(/\{SPOJ:([A-Z0-9]+):([^}]+)\}/g, (_, code, title) => {
    const u = `https://www.spoj.com/problems/${code}/`; urls.push(u);
    return `[${title}](${u}) (SPOJ ${code})`;
  });

let linked = 0;
for (const f of readdirSync(dir).filter((f) => f.includes("drill")).sort()) {
  const file = path.join(dir, f);
  const out = readFileSync(file, "utf8").split(/\r?\n/).map((line) => {
    const m = line.match(/^\| (\d+)\. ([^|]+?) +\|(.*)$/);
    if (!m) return line;
    const [, n, cell, rest] = m, key = `${f}|${n}`;
    let next;
    if (over[key] !== undefined) { used.add(key); next = expand(over[key], key); }
    else {
      const a = cell.match(/^([^/()]+) \(LeetCode (\d+)\)( <span[^>]*><\/span>)?$/);
      if (a && lc[a[2]] && lc[a[2]].t === a[1]) next = expand(`{LC:${a[2]}}`, key) + (a[3] || "");
      else { unlinked.push(`${key}: ${cell}`); return line; }
    }
    if (next.includes("](")) linked++;
    return `| ${n}. ${next} |${rest}`;
  });
  if (flag === "--write") writeFileSync(file, out.join("\n"));
}
for (const k of Object.keys(over)) if (!used.has(k)) errors.push(`override never used: ${k}`);
console.log(`rows linked: ${linked}, links: ${urls.length}, unique: ${new Set(urls).size}`);
console.log("left unlinked:\n  " + unlinked.join("\n  "));
if (errors.length) { console.log("ERRORS:\n  " + errors.join("\n  ")); process.exit(1); }
writeFileSync(path.join(sp, "urls.txt"), [...new Set(urls)].join("\n"));
