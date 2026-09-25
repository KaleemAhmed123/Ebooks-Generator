## Two-Way Map <span class="lv lv1"></span>

- **What it is:** "Follows the same pattern" means a *bijection*: each symbol on the left maps to exactly one on the right, and no two left symbols share a right one. Keep two maps, left→right and right→left, and fail on the first conflict in either
- **Signal:** "isomorphic strings", "word pattern", "match specific pattern", "each letter maps to a unique word"
- **Why it works:** One map catches "a maps to two different things". It cannot catch "two different things map to the same thing", which is the other half of a bijection. The reverse map catches exactly that. Together they check both directions in one pass

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Word pattern abba against dog dog dog dog. The forward map a to dog is fine, and b to dog is also fine on its own. The reverse map shows dog already belongs to a when b tries to claim it, so the match fails." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0603" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <text x="20" y="18" class="sm">pattern "abba", words "dog dog dog dog"</text>
  <rect class="bx" x="20" y="30" width="30" height="22"/><text x="35" y="45" class="lb" text-anchor="middle">a</text>
  <rect class="bx" x="20" y="64" width="30" height="22"/><text x="35" y="79" class="lb" text-anchor="middle">b</text>
  <rect class="bx" x="140" y="46" width="50" height="22"/><text x="165" y="61" class="lb" text-anchor="middle">dog</text>
  <path class="a" d="M 52 41 L 138 54" marker-end="url(#m0603)"/>
  <path class="a" d="M 52 75 L 138 62" marker-end="url(#m0603)" stroke="#ef476e"/>
  <text x="230" y="40" class="lb">forward:  a→dog, b→dog   no conflict</text>
  <text x="230" y="60" class="lb" fill="#ef476e">reverse:  dog→a, then b claims dog</text>
  <text x="230" y="80" class="sm">only the reverse map sees two keys sharing one value</text>
</svg>
:::

```ts
// Word Pattern (LeetCode 290)
function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(" ");
  if (words.length !== pattern.length) return false;
  const fwd = new Map<string, string>();
  const rev = new Map<string, string>();
  for (let i = 0; i < words.length; i++) {
    const p = pattern[i], w = words[i];
    // a maps to two words
    if (fwd.has(p) && fwd.get(p) !== w) return false;
    // two letters share a word
    if (rev.has(w) && rev.get(w) !== p) return false;
    fwd.set(p, w); rev.set(w, p);
  }
  return true;
}
```
