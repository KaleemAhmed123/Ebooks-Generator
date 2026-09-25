## Try Every Cut <span class="lv lv2"></span>

- **What it is:** For "split the string into valid pieces", decide the *first* piece: try every end position `j` for a piece starting at `start`, keep it if it is valid, and recurse on the rest from `j + 1`. A variant cuts an *expression* at every operator and combines the results of both sides
- **Signal:** "partition s so every substring is a palindrome", "restore IP addresses", "insert spaces to form dictionary words", "all ways to add parentheses", "split into a Fibonacci-like sequence"
- **Why it works:** Every partition has a first piece, and its end is one of at most n positions. Fixing the first piece leaves the same problem on a shorter suffix. The recursion tree therefore lists every partition once, and invalid prefixes cut whole subtrees off early

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Palindrome partitioning of aab. The first piece can be a, aa, or aab. aab is not a palindrome and is cut off. After a, the rest ab splits as a, b. After aa, the rest b is one piece. Results: a a b, and aa b." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .x { stroke: #ef476e; stroke-width: 1; stroke-dasharray: 3 2; }
  </style>
  <text x="170" y="14" class="lb" text-anchor="middle">"aab"</text>
  <line class="e" x1="160" y1="18" x2="80" y2="40"/><line class="e" x1="170" y1="18" x2="170" y2="40"/><line class="x" x1="180" y1="18" x2="260" y2="40"/>
  <text x="76" y="50" class="lb" text-anchor="middle">a | "ab"</text><text x="170" y="50" class="lb" text-anchor="middle">aa | "b"</text><text x="264" y="50" class="lb" text-anchor="middle" fill="#ef476e">aab ✗</text>
  <line class="e" x1="72" y1="54" x2="60" y2="76"/><line class="x" x1="84" y1="54" x2="110" y2="76"/>
  <text x="56" y="86" class="lb" text-anchor="middle">a | "b"</text><text x="116" y="86" class="lb" text-anchor="middle" fill="#ef476e">ab ✗</text>
  <text x="56" y="104" class="lb" text-anchor="middle">[a, a, b]</text><text x="170" y="86" class="lb" text-anchor="middle">[aa, b]</text>
  <text x="310" y="30" class="sm">first piece = s[start..j]</text>
  <text x="310" y="44" class="sm">valid → recurse on j + 1</text>
  <text x="310" y="58" class="sm">invalid → the whole subtree dies</text>
</svg>
:::

```ts
// Palindrome Partitioning (LeetCode 131)
function partition(s: string): string[][] {
  const out: string[][] = [], cur: string[] = [];
  const isPal = (l: number, r: number) => {
    while (l < r) if (s[l++] !== s[r--]) return false;
    return true;
  };
  const cut = (start: number) => {
    if (start === s.length) { out.push([...cur]); return; }
    // first piece s[start..j]
    for (let j = start; j < s.length; j++) {
      if (!isPal(start, j)) continue;
      cur.push(s.slice(start, j + 1));
      cut(j + 1);
      cur.pop();
    }
  };
  cut(0);
  return out;
}
```

### Variations

- **Restore IP Addresses (LeetCode 93) / Generate IP Addresses (GFG):** exactly 4 pieces of length 1–3, each ≤ 255, no leading zero unless the piece is `"0"`. Prune when the remaining length exceeds `3 × (pieces left)`
- **Word Break II (LeetCode 140):** a piece is valid if it is a dictionary word. Memoise "all sentences for suffix `start`" when many partitions share suffixes
- **Different Ways to Add Parentheses (LeetCode 241):** cut the *expression* at every operator; recursively get all values of the left and right parts, and combine every pair. Memoise by substring
- **Split Array into Fibonacci Sequence (LeetCode 842):** pieces must obey `f[i] = f[i−1] + f[i−2]`; once two pieces are chosen the rest is forced, so the search is tiny. Reject leading zeros and values above 2³¹ − 1
- **Palindrome Partitioning II (LeetCode 132):** the *minimum* number of cuts. Enumerating partitions is exponential; DP over cut positions (17-05)

### The failure

- **Enumerating when only a count or a minimum is asked.** "How many ways" or "fewest cuts" means the suffix states repeat: memoise or tabulate instead of building every partition
- **Re-checking palindromes from scratch.** `isPal` costs O(n) and runs for every `(start, end)` pair the search reaches, again and again across branches. Precompute `pal[i][j]` once in O(n²) (expand around centres, page 06-02) and look it up

:::interview
"How do you enumerate all palindrome partitions?" — Backtracking on the first piece: for each end index, if `s[start..end]` is a palindrome, add it and recurse on the rest; remove it when the call returns. The output can be exponential in size, so the goal is only to avoid extra work per piece, for example with a precomputed palindrome table.
:::
