## Big-O: what it actually measures

- Big-O does not measure how many seconds your code takes to run. It measures **how the runtime grows** as the input grows
- O(n) means if you double the input, the runtime roughly doubles. O(n²) means if you double the input, the runtime roughly quadruples
- It is an upper bound on growth, stripping away hardware speed, language overhead, and constant factors

### The constant factor trap

- Big-O hides the constant factor. An O(n) algorithm might perform 1000 · n operations, while an O(n log n) algorithm performs 2 · n log n operations
- For n = 1000, the O(n log n) algorithm is faster (20,000 < 1,000,000)
- In interviews and competitive programming, constant factors matter. A tight O(n²) algorithm with high cache locality will easily beat a sloppy O(n log n) algorithm on small to medium inputs

:::mint
<svg viewBox="0 0 470 180" role="img" aria-label="Graph showing how constant factors can make O(n log n) beat O(n) for small n, but O(n) always wins eventually as n approaches infinity" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8.5px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.5; fill: none; }
    .blue { stroke: #1d4e89; stroke-width: 1.5; fill: none; }
    .grid { stroke: #e0e0e0; stroke-width: 0.5; fill: none; stroke-dasharray: 2 2; }
  </style>

  <!-- Axes -->
  <path class="a" d="M 40 160 L 450 160" />
  <path class="a" d="M 40 160 L 40 20" />
  <text x="245" y="175" class="sm" text-anchor="middle">Input size (n)</text>
  <text x="25" y="90" class="sm" transform="rotate(-90 25,90)" text-anchor="middle">Runtime</text>

  <!-- Grid lines -->
  <path class="grid" d="M 40 120 L 450 120" />
  <path class="grid" d="M 40 80 L 450 80" />
  <path class="grid" d="M 40 40 L 450 40" />
  
  <path class="grid" d="M 140 160 L 140 20" />
  <path class="grid" d="M 240 160 L 240 20" />
  <path class="grid" d="M 340 160 L 340 20" />

  <!-- O(n) with huge constant -->
  <path class="hot" d="M 40 160 L 300 30" />
  <text x="310" y="35" class="lb" fill="#ef476e">1000 · n  [ O(n) ]</text>

  <!-- O(n log n) with tiny constant -->
  <!-- Roughly mapping x*log(x) -->
  <path class="blue" d="M 40 160 Q 200 150 420 50" />
  <text x="350" y="70" class="lb" fill="#1d4e89">2 · n log n  [ O(n log n) ]</text>

  <!-- Intersection -->
  <circle cx="160" cy="100" r="3" fill="#1a1a1a" />
  <path class="grid" d="M 160 160 L 160 100" />
  <text x="160" y="172" class="sm" text-anchor="middle">crossover point</text>
</svg>
:::

### The worst, average, and best cases

- **Worst case:** The maximum time an algorithm will take for any input of size n. This is what we usually mean by Big-O in interviews
- **Average case:** The expected time averaged over all possible inputs. QuickSort is O(n log n) average, but O(n²) worst case
- **Best case:** The minimum time. Often trivial (e.g. O(1) to sort an already sorted array if you check first) and rarely useful for hard guarantees

### The trap

- **Assuming O(1) space means no extra space at all.** It means the extra space used does not grow with n. Ten integer variables is O(1). An array of fixed size 256 (for ASCII characters) is O(1)
- **Assuming hardware negates complexity.** A supercomputer running an O(n²) algorithm will eventually be beaten by a smart watch running an O(n log n) algorithm as n grows. Big-O always wins in the long run
