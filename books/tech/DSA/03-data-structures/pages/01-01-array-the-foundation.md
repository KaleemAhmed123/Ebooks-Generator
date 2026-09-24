## The Array: The Foundation

- **What it is:** A contiguous block of memory where elements of the same size are stored sequentially
- **The Contract:** O(1) read/write by index, but O(N) to insert/delete anywhere except the end
- **Why it works:** Because memory is contiguous, the computer can find any element using pure math: `Address = StartAddress + (Index × ElementSize)`

### The Physics of O(1) Access

- When you write `arr[5]`, there is no searching involved. It is an instant mathematical jump
- This gives arrays perfect **Spatial Locality**. Modern CPUs load memory in "cache lines" (e.g. 64 bytes at a time). If you read `arr[0]`, the CPU automatically loads `arr[1]` through `arr[15]` into the ultra-fast L1 cache. This makes arrays dramatically faster than Linked Lists for sequential scanning, even though both are theoretically O(N)

### The Bottleneck: Shifting

- The rigid structure of contiguous memory is also the array's greatest weakness
- If you have an array `[A, B, C, D]` and you want to insert `X` at index 0, you cannot just squeeze it in. Memory addresses are fixed physical locations
- You must physically shift `D` to index 4, `C` to index 3, `B` to index 2, and `A` to index 1, just to make room for `X` at index 0. This is strictly O(N)

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Inserting at index 0 requires shifting all elements" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .l { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .s { font: 8px Georgia, serif; fill: #6b6b6b; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { fill: #ef476e; }
    .a { stroke: #ef476e; stroke-width: 1.2; fill: none; }
  </style>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e" />
    </marker>
  </defs>

  <text x="10" y="25" class="s">Before:</text>
  <rect class="b" x="50" y="10" width="30" height="20" rx="2" />
  <rect class="b" x="80" y="10" width="30" height="20" rx="2" />
  <rect class="b" x="110" y="10" width="30" height="20" rx="2" />
  <text x="65" y="24" class="l" text-anchor="middle">A</text>
  <text x="95" y="24" class="l" text-anchor="middle">B</text>
  <text x="125" y="24" class="l" text-anchor="middle">C</text>

  <text x="10" y="85" class="s">Insert X:</text>
  <rect class="b" x="50" y="70" width="30" height="20" rx="2" stroke="#ef476e" />
  <rect class="b" x="80" y="70" width="30" height="20" rx="2" />
  <rect class="b" x="110" y="70" width="30" height="20" rx="2" />
  <rect class="b" x="140" y="70" width="30" height="20" rx="2" />
  
  <text x="65" y="84" class="l t" text-anchor="middle">X</text>
  <text x="95" y="84" class="l" text-anchor="middle">A</text>
  <text x="125" y="84" class="l" text-anchor="middle">B</text>
  <text x="155" y="84" class="l" text-anchor="middle">C</text>

  <!-- Shift arrows -->
  <path d="M 65 35 Q 80 55 95 65" class="a" marker-end="url(#arr)" />
  <path d="M 95 35 Q 110 55 125 65" class="a" marker-end="url(#arr)" />
  <path d="M 125 35 Q 140 55 155 65" class="a" marker-end="url(#arr)" />
</svg>
:::

### The wrong approach: unshifting

- **Naive idea:** Need a queue? Just use an array and call `shift()` / `unshift()` in JavaScript, or `pop(0)` in Python
- **Why it breaks:** It hides the complexity. You think you wrote O(1) code, but the interpreter runs O(N) code. A loop that `shift()`s N elements takes O(N²) time
- **The fix:** If you need to add/remove from both ends, you cannot use a basic array. You need a **Deque** (Double-ended queue) or two pointers traversing the array

:::interview
"Why do arrays have a fixed size in C/Java?"

Because memory is shared. If you allocate an array of size 5, the memory directly after it might be given to another variable. If you try to add a 6th element, it would overwrite that other variable. To grow an array, you must find a completely new, larger block of free memory.
:::
