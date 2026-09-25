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
