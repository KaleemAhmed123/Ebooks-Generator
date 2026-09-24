## Recurrences and the Master Theorem

- A recurrence relation describes a function in terms of its own smaller inputs. Divide-and-conquer algorithms (like Merge Sort or Binary Search) produce recurrences naturally
- The Master Theorem is a cookbook formula to instantly solve recurrences of the form T(n) = aT(n/b) + f(n)
- You do not need to draw recursion trees in interviews. You just need to know the formula and the three cases

### The components

- **a**: The number of recursive calls (how many branches you make). Must be ≥ 1
- **b**: The factor by which the input size shrinks. Must be > 1
- **f(n)**: The work done *outside* the recursive calls (e.g. dividing the array, or merging the results)
- **The watershed function**: nlogb a. Compare this against f(n) to find the answer

### The three cases

| Condition | Who wins? | The resulting complexity | Example |
|---|---|---|---|
| f(n) < nlogb a | The leaves win (the recursion) | O(nlogb a) | Strassen's matrix multiplication |
| f(n) == nlogb a | It's a tie (balanced) | O(nlogb a log n) | Merge Sort, Binary Search |
| f(n) > nlogb a | The root wins (the merge work) | O(f(n)) | An algorithm that splits in half but takes n² to merge |

*(Note: "==" and "<" here refer to polynomial bounds, meaning they must differ by a factor of n^epsilon, not just a constant or a logarithm. For interview purposes, standard polynomial comparison works 99% of the time.)*

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Recursion tree showing three cases: Case 1 has most work at the leaves (many branches, light merge). Case 2 has equal work at every level (balanced). Case 3 has most work at the root (few branches, heavy merge)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 8.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .nd { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .hot { fill: #ef476e; stroke: #ef476e; stroke-width: 1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .a { stroke: #1a1a1a; stroke-width: 0.8; fill: none; }
  </style>

  <!-- Case 1: Leaves win -->
  <text x="78" y="12" class="lb" text-anchor="middle">Case 1: leaves win</text>
  <circle cx="78" cy="30" r="6" class="nd"/>
  <path class="a" d="M 72 35 L 48 50"/>
  <path class="a" d="M 84 35 L 108 50"/>
  <circle cx="48" cy="56" r="6" class="nd"/>
  <circle cx="108" cy="56" r="6" class="nd"/>
  <path class="a" d="M 42 61 L 28 76"/>
  <path class="a" d="M 54 61 L 68 76"/>
  <path class="a" d="M 102 61 L 88 76"/>
  <path class="a" d="M 114 61 L 128 76"/>
  <circle cx="28" cy="82" r="6" class="hot"/>
  <circle cx="68" cy="82" r="6" class="hot"/>
  <circle cx="88" cy="82" r="6" class="hot"/>
  <circle cx="128" cy="82" r="6" class="hot"/>
  <text x="78" y="105" class="sm" text-anchor="middle">most work here ↑</text>
  <text x="78" y="118" class="sm" text-anchor="middle">O(n^log_b(a))</text>

  <!-- Case 2: Balanced -->
  <text x="235" y="12" class="lb" text-anchor="middle">Case 2: balanced</text>
  <circle cx="235" cy="30" r="6" class="hi"/>
  <path class="a" d="M 229 35 L 205 50"/>
  <path class="a" d="M 241 35 L 265 50"/>
  <circle cx="205" cy="56" r="6" class="hi"/>
  <circle cx="265" cy="56" r="6" class="hi"/>
  <path class="a" d="M 199 61 L 185 76"/>
  <path class="a" d="M 211 61 L 225 76"/>
  <path class="a" d="M 259 61 L 245 76"/>
  <path class="a" d="M 271 61 L 285 76"/>
  <circle cx="185" cy="82" r="6" class="hi"/>
  <circle cx="225" cy="82" r="6" class="hi"/>
  <circle cx="245" cy="82" r="6" class="hi"/>
  <circle cx="285" cy="82" r="6" class="hi"/>
  <text x="235" y="105" class="sm" text-anchor="middle">equal work at every level</text>
  <text x="235" y="118" class="sm" text-anchor="middle">O(n^log_b(a) · log n)</text>

  <!-- Case 3: Root wins -->
  <text x="392" y="12" class="lb" text-anchor="middle">Case 3: root wins</text>
  <circle cx="392" cy="30" r="6" class="hot"/>
  <path class="a" d="M 386 35 L 362 50"/>
  <path class="a" d="M 398 35 L 422 50"/>
  <circle cx="362" cy="56" r="6" class="nd"/>
  <circle cx="422" cy="56" r="6" class="nd"/>
  <path class="a" d="M 356 61 L 342 76"/>
  <path class="a" d="M 368 61 L 382 76"/>
  <path class="a" d="M 416 61 L 402 76"/>
  <path class="a" d="M 428 61 L 442 76"/>
  <circle cx="342" cy="82" r="5" class="nd"/>
  <circle cx="382" cy="82" r="5" class="nd"/>
  <circle cx="402" cy="82" r="5" class="nd"/>
  <circle cx="442" cy="82" r="5" class="nd"/>
  <text x="392" y="105" class="sm" text-anchor="middle">most work here ↑ (root)</text>
  <text x="392" y="118" class="sm" text-anchor="middle">O(f(n))</text>

  <text x="235" y="135" class="sm" text-anchor="middle">Compare f(n) against n^log_b(a) to find which case applies</text>
</svg>
:::

### Applying it to classics

- **Binary Search:** Splits the array in half once. a=1, b=2, f(n)=1. Watershed is nlog₂ ¹ = n⁰ = 1. Since f(n) == 1, it's a tie. Multiply by log n implies O(log n)
- **Merge Sort:** Splits in half, recurses twice, merges in O(n) time. a=2, b=2, f(n)=n. Watershed is nlog₂ ² = n¹ = n. Since f(n) == n, it's a tie. Multiply by log n implies O(n log n)

### The wrong approach

- **Applying it where it doesn't fit.** The Master Theorem *only* applies to divide-and-conquer recurrences. If your algorithm shrinks the input by subtraction instead of division — like T(n) = T(n-1) + n — the theorem does not apply
- That recurrence (common in basic DP or recursive Fibonacci) resolves to O(n²), not by the Master Theorem, but by arithmetic series summation

:::interview
"What is the complexity of an algorithm that recurses three times on inputs of size n/2, and takes O(n) time to merge?"

a=3, b=2, f(n)=n. Watershed is nlog₂ ³ ≈ n¹.⁵⁸. Since n¹.⁵⁸ > n¹, the leaves win. The complexity is O(nlog₂ ³).
:::
