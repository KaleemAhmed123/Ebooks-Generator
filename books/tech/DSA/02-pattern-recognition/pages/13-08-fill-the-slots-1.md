## Fill the Slots 🟡

- **What it is:** Permutation-style problems fill positions one at a time: for slot `k`, try every item that is still available, recurse into slot `k + 1`, then give the item back. A `used[]` array (or swapping into place) tracks availability. With duplicate items, skip an item equal to its left neighbour *if that neighbour is not currently used*
- **Signal:** "all permutations", "all unique permutations", "letter combinations of a phone number", "generate valid parentheses", "all arrangements"
- **Why it works:** Order matters, so every slot may take any unused item, unlike pick-or-skip where each item is decided once. For duplicates, the rule "use equal values left to right" lets exactly one ordering of identical items through: an equal item may be placed only after its left twin is already in the arrangement

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Unique permutations of 1, 1, 2. Slot 0 tries the first 1, skips the second 1 because its left twin is not used, and tries 2. Under the first 1, the second 1 is allowed because its twin is used. Results 1 1 2, 1 2 1, 2 1 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .x { stroke: #ef476e; stroke-width: 1; stroke-dasharray: 3 2; }
  </style>
  <text x="170" y="14" class="lb" text-anchor="middle">slot 0</text>
  <line class="e" x1="160" y1="18" x2="80" y2="40"/><line class="x" x1="170" y1="18" x2="170" y2="40"/><line class="e" x1="180" y1="18" x2="260" y2="40"/>
  <text x="76" y="50" class="lb" text-anchor="middle">1a</text><text x="170" y="50" class="lb" text-anchor="middle" fill="#ef476e">1b ✗</text><text x="264" y="50" class="lb" text-anchor="middle">2</text>
  <text x="170" y="62" class="sm" text-anchor="middle">twin 1a unused</text>
  <line class="e" x1="72" y1="54" x2="44" y2="76"/><line class="e" x1="80" y1="54" x2="108" y2="76"/>
  <text x="40" y="86" class="lb" text-anchor="middle">1b</text><text x="112" y="86" class="lb" text-anchor="middle">2</text>
  <text x="40" y="100" class="lb" text-anchor="middle">112</text><text x="112" y="100" class="lb" text-anchor="middle">121</text>
  <text x="264" y="86" class="lb" text-anchor="middle">1a 1b</text><text x="264" y="100" class="lb" text-anchor="middle">211</text>
  <text x="320" y="30" class="lb">skip nums[i] when</text>
  <text x="320" y="46" class="lb">i &gt; 0 &amp;&amp;</text>
  <text x="320" y="62" class="lb">nums[i] === nums[i−1] &amp;&amp;</text>
  <text x="320" y="78" class="lb">!used[i − 1]</text>
</svg>
:::

```ts
// Permutations II (LeetCode 47): unique permutations
function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const out: number[][] = [], cur: number[] = [];
  const used = new Array(nums.length).fill(false);
  const fill = () => {
    if (cur.length === nums.length) { out.push([...cur]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])
        continue;
      used[i] = true; cur.push(nums[i]);
      fill();
      used[i] = false; cur.pop();
    }
  };
  fill();
  return out;
}
```
