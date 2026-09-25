## Monotonic Stack <span class="lv lv1"></span>

- **What it is:** A stack that maintains its elements in a strictly increasing or decreasing order. Every push that would break the order causes elements to be popped first
- **When to reach for it:** "Next greater element", "Next smaller element", "Daily temperatures", "Largest rectangle in histogram"
- **Why it works:** It acts as a memory of elements waiting for a specific event. A larger element arriving renders all previous smaller elements useless, allowing us to permanently eliminate them

### The visual mechanism

- We want to find the next greater element for `[2, 1, 5, 3]`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Monotonic stack processing [2, 1, 5, 3]. 2 goes in. 1 goes in (smaller). 5 arrives, pops 1 (5 is next greater), pops 2 (5 is next greater), then 5 goes in. 3 goes in." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
  </style>
  
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">Push 2</text>
  <rect class="bx" x="20" y="80" width="30" height="20" rx="2" />
  <text x="35" y="94" class="lb" text-anchor="middle">2</text>
  
  <text x="90" y="20" class="lb">Push 1</text>
  <rect class="bx" x="90" y="80" width="30" height="20" rx="2" />
  <rect class="bx" x="90" y="55" width="30" height="20" rx="2" />
  <text x="105" y="94" class="lb" text-anchor="middle">2</text>
  <text x="105" y="69" class="lb" text-anchor="middle">1</text>
  
  <text x="180" y="20" class="lb">Process 5</text>
  <rect class="bx" x="180" y="80" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <rect class="bx" x="180" y="55" width="30" height="20" rx="2" stroke-dasharray="2 2" />
  <text x="195" y="94" class="lb" text-anchor="middle" fill="#6b6b6b">2</text>
  <text x="195" y="69" class="lb" text-anchor="middle" fill="#6b6b6b">1</text>
  <text x="240" y="69" class="lb" fill="#ef476e">5 is > 1. Pop 1.</text>
  <text x="240" y="94" class="lb" fill="#ef476e">5 is > 2. Pop 2.</text>
  <path class="hot" d="M 210 65 L 235 65" marker-end="url(#arrowRed)" />
  <path class="hot" d="M 210 90 L 235 90" marker-end="url(#arrowRed)" />

  <text x="350" y="20" class="lb">Push 5, Push 3</text>
  <rect class="bx" x="350" y="80" width="30" height="20" rx="2" />
  <rect class="bx" x="350" y="55" width="30" height="20" rx="2" />
  <text x="365" y="94" class="lb" text-anchor="middle">5</text>
  <text x="365" y="69" class="lb" text-anchor="middle">3</text>
</svg>
:::

### The Template

```ts
function nextGreaterElements(arr: number[]): number[] {
  const result = new Array(arr.length).fill(-1);
  const stack: number[] = []; // stores INDICES, not values
  
  for (let i = 0; i < arr.length; i++) {
    // While the incoming element is greater than the top of the stack
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const poppedIndex = stack.pop()!;
      result[poppedIndex] = arr[i]; // The incoming element is the answer
    }
    stack.push(i); // Always push the current index to wait for its match
  }
  
  return result;
}
```

### The trap

- **Storing values instead of indices.** A monotonic stack almost always needs to know *where* the popped element came from to update the result array or calculate distance. Always push the `index`, and use `arr[index]` for comparisons
- **Thinking it's O(n²).** It has a `while` loop inside a `for` loop, but every element is pushed exactly once and popped at most once. Total operations across the entire array is 2n. It is strictly O(n) time
