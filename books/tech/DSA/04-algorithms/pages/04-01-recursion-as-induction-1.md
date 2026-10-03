## Recursion as Induction <span class="lv lv1"></span>

- **Recursion** is a function that calls itself with a smaller input until it hits a known answer (the **base case**). It is not magic — it is mathematical induction running on a call stack
- **Induction** proves a statement for all n: prove it for n = 0 (base case), then prove that if it holds for n − 1, it holds for n (inductive step). Recursion does exactly this — it assumes the smaller call returns the right answer, then uses that answer to build the current one

### The call stack

Every time a function calls itself, the runtime pushes a **stack frame** onto the call stack. A stack frame holds the function's local variables and where to resume when the call returns. When the base case returns, frames pop off in reverse order — last in, first out.

:::mint
<svg viewBox="0 0 470 160" role="img" aria-label="Call stack growing during factorial(4): four frames pushed, then popping with return values 1, 2, 6, 24" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <defs>
    <marker id="ar1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="60" y="12" class="sm" text-anchor="middle">push →</text>
  <text x="350" y="12" class="sm" text-anchor="middle">← pop</text>

  <rect class="bx" x="10" y="20" width="100" height="20" rx="3"/>
  <text x="60" y="34" class="lb" text-anchor="middle">f(4)</text>

  <rect class="bx" x="10" y="44" width="100" height="20" rx="3"/>
  <text x="60" y="58" class="lb" text-anchor="middle">f(3)</text>

  <rect class="bx" x="10" y="68" width="100" height="20" rx="3"/>
  <text x="60" y="82" class="lb" text-anchor="middle">f(2)</text>

  <rect class="hi" x="10" y="92" width="100" height="20" rx="3"/>
  <text x="60" y="106" class="lb" text-anchor="middle">f(1) → 1</text>

  <text x="140" y="106" class="sm">base case</text>

  <path d="M 200 80 L 200 30" stroke="#1a1a1a" stroke-width="1" marker-end="url(#ar1)" stroke-dasharray="3"/>
  <text x="210" y="100" class="sm">returns 1</text>
  <text x="210" y="82" class="sm">1 × 2 = 2</text>
  <text x="210" y="64" class="sm">2 × 3 = 6</text>
  <text x="210" y="46" class="sm">6 × 4 = 24</text>

  <rect class="hi" x="310" y="20" width="130" height="20" rx="3"/>
  <text x="375" y="34" class="lb" text-anchor="middle">result: 24</text>

  <text x="60" y="135" class="sm" text-anchor="middle">stack depth = n</text>
  <text x="60" y="148" class="sm" text-anchor="middle">space: O(n)</text>
</svg>
:::

### Space cost

- Every recursive call adds a frame. For depth n, the stack uses O(n) memory
- Default stack sizes are typically 1–8 MB. A recursion depth of ~10⁴ is usually safe; 10⁵ risks a stack overflow in most runtimes
- **Tail recursion** — when the recursive call is the last operation — can be optimised to O(1) space by some compilers (C, Scala). JavaScript and TypeScript do not guarantee tail-call optimisation in practice
