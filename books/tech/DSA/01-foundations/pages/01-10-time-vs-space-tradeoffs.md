## Time vs space tradeoffs

- You can almost always buy time by spending space. This is the fundamental economic trade of computer science
- When a brute force algorithm is too slow, the derivation path usually involves creating a data structure to remember past work

### The three ways to buy time

1. **Memoisation (Dynamic Programming):** Instead of recalculating f(x), calculate it once, store the result in an array or hash map, and look it up in O(1) time later. Spends O(n) space to reduce exponential time to polynomial time
2. **Precomputation:** Spend O(n) time and O(n) space upfront to build a structure (like a Prefix Sum array or a Trie) so that future queries drop from O(n) to O(1)
3. **Indexing:** Throw the data into a Hash Set or Hash Map. Spends O(n) space so that checking "does this exist?" drops from an O(n) linear scan to an O(1) lookup

### When you cannot afford space

- Sometimes the constraints push the other way. If n = 10⁵, an O(n²) time solution will Time Limit Exceed (TLE). But if n = 10⁵, an O(n²) space solution will Memory Limit Exceed (MLE)
- An array of 10⁵ times 10⁵ 32-bit integers requires 40 gigabytes of RAM. A standard competitive programming judge gives you 256 megabytes

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="A slider showing the tradeoff between space and time. Moving left uses less space but more time. Moving right uses more space but less time." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.5; fill: none; }
    .dot { fill: #1d4e89; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>

  <text x="235" y="15" class="sm" text-anchor="middle">The fundamental tradeoff</text>

  <!-- Slider track -->
  <path class="a" d="M 60 50 L 410 50" />
  <path class="a" d="M 60 45 L 60 55" />
  <path class="a" d="M 410 45 L 410 55" />
  
  <text x="60" y="70" class="lb" text-anchor="middle">O(1) space</text>
  <text x="60" y="85" class="lb" text-anchor="middle">O(n²) time</text>
  <text x="60" y="100" class="sm" text-anchor="middle">nested loops</text>

  <text x="235" y="70" class="lb" text-anchor="middle">O(1) space</text>
  <text x="235" y="85" class="lb" text-anchor="middle">O(n log n) time</text>
  <text x="235" y="100" class="sm" text-anchor="middle">sort + two pointers</text>

  <text x="410" y="70" class="lb" text-anchor="middle">O(n) space</text>
  <text x="410" y="85" class="lb" text-anchor="middle">O(n) time</text>
  <text x="410" y="100" class="sm" text-anchor="middle">hash map</text>

  <!-- Slider nodes -->
  <circle cx="60" cy="50" r="4" class="dot" />
  <circle cx="235" cy="50" r="4" class="dot" />
  <circle cx="410" cy="50" r="4" class="dot" />
  
  <rect class="hi" x="195" y="38" width="80" height="24" rx="12" />
  <text x="235" y="53" class="lb" text-anchor="middle" fill="#2d6a4f">optimal</text>
</svg>
:::

### The trap

- **Using a hash map when an array will do.** Hash maps have massive constant factor overhead. If your keys are just integers from 0 to 1000, use a simple array. It is technically the same Big-O space, but it runs 10x faster and uses 10x less memory
- **Forgetting that sorting mutates.** Using a sort to achieve O(1) space means you are destroying the original order of the input. If the caller needs that order preserved, you have to clone the array first — which costs O(n) space anyway

:::interview
"We need this to be faster than O(n²)." — To reduce the time, we need to avoid the inner loop's repeated scans. I can trade O(n) space to build a Hash Map of the elements on the first pass, bringing the total time down to O(n).
:::
