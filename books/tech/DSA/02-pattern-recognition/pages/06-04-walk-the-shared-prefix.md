## Walk the Shared Prefix 🟡

- **What it is:** Put all the words in a trie (a tree where each edge is one character and each path from the root spells a prefix) and store a small fact on every node: how many words pass through it, or whether a word ends there. Then each question is one walk down from the root
- **Signal:** "shortest unique prefix for every word", "suggest words as the user types", "replace each word with its shortest root", "many words, many prefix queries"
- **Why it works:** Words that share a prefix share a path, so the work of reading that prefix is done once for all of them. A per-node count answers "how many words start like this?" at every depth of the walk. Module 03 builds the trie itself; this page is about what to store on the nodes

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="A trie of zebra, dog, duck, dove. Each node stores how many words pass through it. The root's d child has count 3. Under d, o has count 2 and u has count 1. The shortest unique prefix of each word ends at the first node with count 1: z, dog, du, dov." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .u { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="n" cx="150" cy="16" r="10"/><text x="150" y="19" class="sm" text-anchor="middle">·</text>
  <line class="e" x1="143" y1="24" x2="100" y2="46"/><line class="e" x1="157" y1="24" x2="200" y2="46"/>
  <circle class="u" cx="96" cy="52" r="11"/><text x="96" y="55" class="lb" text-anchor="middle">z</text><text x="78" y="56" class="sm">1</text>
  <circle class="n" cx="204" cy="52" r="11"/><text x="204" y="55" class="lb" text-anchor="middle">d</text><text x="220" y="56" class="sm">3</text>
  <line class="e" x1="198" y1="62" x2="170" y2="82"/><line class="e" x1="210" y1="62" x2="238" y2="82"/>
  <circle class="n" cx="166" cy="88" r="11"/><text x="166" y="91" class="lb" text-anchor="middle">o</text><text x="148" y="92" class="sm">2</text>
  <circle class="u" cx="242" cy="88" r="11"/><text x="242" y="91" class="lb" text-anchor="middle">u</text><text x="258" y="92" class="sm">1</text>
  <line class="e" x1="160" y1="98" x2="140" y2="112"/><line class="e" x1="172" y1="98" x2="192" y2="112"/>
  <circle class="u" cx="136" cy="118" r="10"/><text x="136" y="121" class="lb" text-anchor="middle">g</text>
  <circle class="u" cx="196" cy="118" r="10"/><text x="196" y="121" class="lb" text-anchor="middle">v</text>
  <text x="300" y="30" class="lb">zebra → z</text>
  <text x="300" y="50" class="lb">dog   → dog</text>
  <text x="300" y="70" class="lb">duck  → du</text>
  <text x="300" y="90" class="lb">dove  → dov</text>
  <text x="300" y="116" class="sm">stop at the first node with count 1</text>
</svg>
:::

```ts
// Shortest unique prefix for every word (GFG)
function shortestUniquePrefixes(words: string[]): string[] {
  type Node = { next: Map<string, Node>; count: number };
  const root: Node = { next: new Map(), count: 0 };
  // insert, counting passers-by
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node.next.has(ch))
        node.next.set(ch, { next: new Map(), count: 0 });
      node = node.next.get(ch)!;
      node.count++;
    }
  }
  // walk until the path is private
  return words.map((w) => {
    let node = root, i = 0;
    while (i < w.length) {
      node = node.next.get(w[i++])!;
      if (node.count === 1) break;
    }
    return w.slice(0, i);
  });
}
```

### Variations

- **Search Suggestions System (LeetCode 1268):** walk the typed prefix; at each node keep up to three smallest words passing through it. Sorting the input first and binary searching the prefix is an equally good trie-free answer
- **Replace Words (LeetCode 648):** mark nodes where a root ends; for each sentence word, walk until the first marked node and replace with that prefix
- **Longest Common Prefix (LeetCode 14):** one query, so no trie: compare column by column across all strings and stop at the first mismatch. A trie pays only when prefix questions repeat
- **Word Search II (LeetCode 212):** a trie of the search words steers a grid DFS (Chapter 13); a branch dies as soon as the path leaves the trie
- **Maximum XOR of Two Numbers (LeetCode 421) 🔴:** a trie over *bits* instead of letters (Chapter 19)

### The failure

- **Comparing every pair of words.** For unique prefixes, pairwise longest-common-prefix is O(n² · L). The trie is O(total characters) to build and to query
- **Forgetting the "prefix of another word" case.** If `"do"` and `"dog"` are both in the list, the path of `"do"` never reaches count 1, and the answer is the whole word. The template's `while` ends at `w.length` and returns all of `"do"`, which is the only honest answer

:::interview
"When is a trie better than a hash set of words?" — When the queries are about prefixes rather than whole words. A hash set answers "is this word present" in O(L), but "how many words start with this" needs every word checked. A trie with pass-through counts answers it by walking L nodes, and the same structure serves autocomplete, unique prefixes and root replacement.
:::
