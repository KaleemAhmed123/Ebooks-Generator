// Regenerate the keyword index pages 01-05-*.md.
//   node index-gen.mjs <pagesDir> [--write]
// "Think" is taken from each page's live ## title, so renames flow through.
// Fails if a pattern page (meta.json `patterns`) has no row, or an id is missing.
import { readFileSync, readdirSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
const [dir, flag] = process.argv.slice(2);
const files = readdirSync(dir).sort();
const title = (id) => {
  const f = files.find((x) => x.startsWith(id + "-"));
  if (!f) throw new Error("no page " + id);
  const h = readFileSync(path.join(dir, f), "utf8").match(/^## (.+)$/m);
  return h[1].replace(/<span[^>]*><\/span>/g, "").replace(/\s*-\s*continued$/, "").trim();
};
const rows = [
  ["every window of size k", "02-02"],
  ["longest / shortest substring or subarray such that", "02-03"],
  ["count subarrays with product or sum below K", "02-04"],
  ["number of subarrays with exactly K", "02-05"],
  ["remove from either end, take from both ends", "02-06"],
  ["choose k items to minimise max − min; most frequent after k increments", "02-07"],
  ["two numbers to a target in sorted input; container with most water", "02-08"],
  ["remove duplicates in place; move zeroes; sort 0s, 1s, 2s", "02-09"],
  ["three or four numbers to a target", "02-10"],
  ["sum of elements between i and j, many queries", "03-02"],
  ["subarray sum equals / divisible by K, negatives allowed", "03-03"],
  ["product of all except self; trapped water", "03-04"],
  ["best pair i < j; buy then sell", "03-05"],
  ["maximum subarray; maximum product", "03-06"],
  ["add v to every element in [l, r]; bookings; car pooling", "03-07"],
  ["values 1..n, missing or duplicate, O(1) space", "04-02"],
  ["rotate the array by k", "04-03"],
  ["next permutation; next greater number with the same digits", "04-04"],
  ["more than n / 2 (or n / 3) times", "04-05"],
  ["circular array", "04-06"],
  ["diagonals; same row, column or box", "05-01"],
  ["spiral order; rotate the matrix", "05-02"],
  ["in place; next state from the neighbours; set zeroes", "05-03"],
  ["rows and columns both sorted", "05-04"],
  ["group anagrams; follows the same pattern", "06-01 06-03"],
  ["longest palindromic substring; count palindromic substrings", "06-02"],
  ["how many overlap at once; meeting rooms", "07-06"],
  ["merge overlapping; remove the fewest intervals", "07-07"],
  ["count inversions / reverse pairs / smaller after self", "07-08"],
  ["largest number formed; custom order", "07-09"],
  ["minimum jumps; cover the range", "08-02"],
  ["deadline and profit per job", "08-03 15-06"],
  ["boats with a weight limit; pair to minimise the largest pair", "08-04"],
  ["send half to A and half to B at least cost", "08-05"],
  ["gas station; complete the circuit", "08-06"],
  ["minimise the maximum; maximise the minimum; smallest speed that works", "09-02"],
  ["rotated sorted; peak; mountain", "09-03"],
  ["k-th smallest in sorted rows or among pairs", "09-04"],
  ["decode; nested brackets", "10-02"],
  ["collide; cancel adjacent; remove k digits", "10-03 10-07"],
  ["valid parentheses; minimum additions to balance", "10-04"],
  ["next greater element; daily temperatures; stock span", "10-05"],
  ["sum over all subarrays of the minimum", "10-08"],
  ["largest rectangle in a histogram or of 1s", "10-09"],
  ["maximum of every window of size k", "10-10"],
  ["LRU cache; min stack; queue using stacks", "10-11"],
  ["appears twice except one", "11-01"],
  ["appears three times except one; total Hamming distance", "11-02"],
  ["power of two; count set bits; reverse bits", "11-03"],
  ["merge two sorted lists; partition a list; remove elements", "12-01"],
  ["reverse a list; reverse in groups of k; swap pairs", "12-02"],
  ["reorder list; palindrome linked list", "12-03"],
  ["detect a cycle; where the cycle begins; find the duplicate number", "12-04"],
  ["remove the n-th node from the end", "12-05"],
  ["copy a list with random pointers", "12-06"],
  ["write it recursively; print n down to 1 and back", "13-01 13-02"],
  ["all paths in a maze; word search on a grid", "13-04"],
  ["all subsets / combinations / permutations", "13-05 13-08"],
  ["subsets or combinations, input has duplicates", "13-06"],
  ["reuse a number any number of times; order counts", "13-07"],
  ["split a string into palindromes or valid IP parts", "13-09"],
  ["no two share a row, column or diagonal; fill the grid", "13-10"],
  ["path from the root; max so far on the path", "14-02"],
  ["diameter; max path sum; balanced", "14-03"],
  ["level order; right side view; zigzag", "14-04"],
  ["vertical order; top / bottom view", "14-05"],
  ["all nodes at distance k; burn the tree", "14-06"],
  ["lowest common ancestor", "14-07"],
  ["k-th smallest in a BST; BST iterator; validate a BST", "14-08"],
  ["construct from preorder and inorder", "14-09"],
  ["in-order in O(1) space, no stack", "14-10"],
  ["k largest; top k frequent", "15-01"],
  ["merge k sorted lists; smallest range over k lists", "15-03"],
  ["running median", "15-04"],
  ["connect ropes; merge cost", "15-05"],
  ["share an email / a letter / a value", "16-02"],
  ["surrounded; enclosed; closed island", "16-03"],
  ["count the ways; minimum cost; a recursion that repeats calls", "17-02"],
  ["non-overlapping jobs with profit", "17-03"],
  ["at most k transactions; cooldown", "17-04"],
  ["minimum cost to cut / merge / burst", "17-05"],
  ["both play optimally", "17-06"],
  ["cheapest path; minimum effort; weights on the moves", "18-02"],
  ["car fleet; weak characters; beaten on every measure", "18-06"],
  ["range sum with updates; range minimum query", "19-01"],
];
const meta = JSON.parse(readFileSync(path.join(dir, "..", "meta.json"), "utf8"));
const covered = new Set(rows.flatMap(([, ids]) => ids.split(" ")));
const miss = Object.keys(meta.patterns).filter((k) => !meta.patterns[k].endsWith("overview")).filter((id) => !covered.has(id));
if (miss.length) throw new Error("pattern pages with no index row: " + miss.join(" "));
const table = rows.map(([p, ids]) => {
  const list = ids.split(" ");
  return `| ${p.split("; ").map((x) => `"${x}"`).join(", ")} | **${[...new Set(list.map((id) => meta.patterns[id]?.replace(/^Pattern /, "").replace(/ · move .*$/, "") ?? title(id)))].join(" · ")}** | ${list.join(" · ")} |`;
});
const PER = 15, head = "| The statement says… | Think | Page |\n|---|---|---|";
const chunks = [];
chunks.push(table.slice(0, 13)); for (let i = 13; i < table.length; i += PER) chunks.push(table.slice(i, i + PER));
const out = chunks.map((c, i) => {
  const h = i === 0
    ? `## Keyword Index <span class="lv lv1"></span>\n\nStatement phrase → the page that owns it, in page order. Confirm on the page against its "Not this page if" line.\n\n`
    : `## Keyword Index <span class="lv lv1"></span> - continued\n\n`;
  const tail = i === chunks.length - 1 ? `\n\n- **Not here?** Use the chart on 01-04, then the four questions on 18-01\n` : "\n";
  return h + head + "\n" + c.join("\n") + tail;
});
console.error(`${rows.length} rows, ${out.length} pages`);
if (flag === "--write") {
  for (const f of files.filter((f) => f.startsWith("01-05-"))) unlinkSync(path.join(dir, f));
  out.forEach((s, i) => writeFileSync(path.join(dir, `01-05-keyword-index-${"abcdef"[i]}.md`), s));
}
