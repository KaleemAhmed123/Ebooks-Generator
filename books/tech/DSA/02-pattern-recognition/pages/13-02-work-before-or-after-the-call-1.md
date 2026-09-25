## Work Before or After the Call <span class="lv lv1"></span>

- **What it is:** Every line in a recursive function runs either on the way *down* (before the recursive call) or on the way *up* (after it returns). Code before the call sees inputs in forward order; code after it sees them in reverse, with the smaller call's result already available
- **Signal:** "print n down to 1 and then 1 up to n", "zig-zag", "process from the end of a linked list without reversing it", "carry a value back up", pre-order / in-order / post-order anything
- **Why it works:** The call stack holds each frame's local variables until the deeper call returns. So a value saved before the call is still there afterwards, in last-in-first-out order. Choosing *where* a line goes chooses the order it runs in, with no extra data structure

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Zig-zag recursion for n equal to 2. Each call prints n before its first child call, between the two child calls, and after the second. The output is 2 1 1 1 2 1 1 1 2: pre, in and post positions interleave with the children's output." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .nd { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="nd" cx="120" cy="22" r="12"/><text x="120" y="26" class="lb" text-anchor="middle">2</text>
  <line class="e" x1="112" y1="31" x2="72" y2="54"/><line class="e" x1="128" y1="31" x2="168" y2="54"/>
  <circle class="nd" cx="66" cy="62" r="12"/><text x="66" y="66" class="lb" text-anchor="middle">1</text>
  <circle class="nd" cx="174" cy="62" r="12"/><text x="174" y="66" class="lb" text-anchor="middle">1</text>
  <line class="e" x1="60" y1="72" x2="44" y2="92"/><line class="e" x1="72" y1="72" x2="88" y2="92"/>
  <line class="e" x1="168" y1="72" x2="152" y2="92"/><line class="e" x1="180" y1="72" x2="196" y2="92"/>
  <text x="40" y="104" class="sm" text-anchor="middle">0</text><text x="92" y="104" class="sm" text-anchor="middle">0</text><text x="148" y="104" class="sm" text-anchor="middle">0</text><text x="200" y="104" class="sm" text-anchor="middle">0</text>
  <text x="250" y="30" class="lb">pre   print n</text>
  <text x="250" y="44" class="lb">call  f(n − 1)</text>
  <text x="250" y="58" class="lb">in    print n</text>
  <text x="250" y="72" class="lb">call  f(n − 1)</text>
  <text x="250" y="86" class="lb">post  print n</text>
  <text x="250" y="108" class="lb" fill="#1d4e89">2 1 1 1 2 1 1 1 2</text>
</svg>
:::

```ts
// Zig-zag (Pepcoding): print n before, between and after two calls
function zigzag(n: number, out: number[] = []): number[] {
  if (n === 0) return out;
  out.push(n);            // pre: on the way down
  zigzag(n - 1, out);
  out.push(n);            // in: between the two calls
  zigzag(n - 1, out);
  out.push(n);            // post: on the way back up
  return out;
}

// Print decreasing then increasing: n … 1 1 … n
function decInc(n: number, out: number[] = []): number[] {
  if (n === 0) return out;
  out.push(n);            // forward order
  decInc(n - 1, out);
  out.push(n);            // reverse order, for free
  return out;
}
```
