## Parse Nested Structure <span class="lv lv2"></span>

- **What:** a string with nesting — brackets, repeats, expressions — is parsed by pushing the *outer* context on a stack when you descend and popping it to combine when you close. The stack replaces recursion
- **Spot it:** "decode `k[...]`", "evaluate an expression with parentheses", "nested lists", "basic calculator", "the file system's longest path"
- **Why:** nesting is last-opened-first-closed — exactly a stack. Push what you had before entering a group; on the closing token, pop it and fold the finished inner result into it

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Decoding 3[a2[c]]. On each open bracket the current string and repeat count are pushed. At the inner close, c repeated twice gives cc, folded into a to make acc. At the outer close, acc repeated three times gives accaccacc. The stack holds the outer context while the inner group is built." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .frame { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .cur { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
  </style>
  <text x="20" y="16" class="sm">input: 3[a2[c]]</text>
  <text x="20" y="40" class="sm">stack after "3[a2["</text>
  <rect class="frame" x="20" y="48" width="86" height="22"/><text x="63" y="63" class="lb" text-anchor="middle">("", 3)</text>
  <rect class="frame" x="20" y="72" width="86" height="22"/><text x="63" y="87" class="lb" text-anchor="middle">("a", 2)</text>
  <rect class="cur" x="20" y="96" width="86" height="22"/><text x="63" y="111" class="lb" text-anchor="middle">cur = "c"</text>
  <text x="130" y="60" class="sm">"]" → pop ("a",2):</text>
  <text x="130" y="76" class="lb">cur = "a" + "c"×2 = "acc"</text>
  <text x="130" y="100" class="sm">"]" → pop ("",3):</text>
  <text x="130" y="116" class="lb">cur = "" + "acc"×3</text>
  <text x="340" y="88" class="lb" fill="#2d6a4f">"accaccacc"</text>
  <text x="130" y="30" class="sm">push (cur, k) on "[",  fold on "]"</text>
</svg>
:::

```ts
// Decode String (LeetCode 394): k[encoded] repeats encoded k times, nestable
function decodeString(s: string): string {
  const numStack: number[] = [], strStack: string[] = [];
  let cur = "", num = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") num = num * 10 + (ch.charCodeAt(0) - 48); // multi-digit k
    else if (ch === "[") { numStack.push(num); strStack.push(cur); num = 0; cur = ""; } // descend
    else if (ch === "]") {
      const k = numStack.pop()!, prev = strStack.pop()!;
      cur = prev + cur.repeat(k);                        // fold inner into outer
    } else cur += ch;                                    // ordinary letter
  }
  return cur;
}
```

- **Watch out:** build the number across digits (`num*10 + d`) — `k` can be more than one digit. Reset `num` and `cur` on `[`, and remember to push the *old* `cur` before clearing it, or the outer text is lost. An expression with `+ − × ÷` needs operator precedence, not just bracket folding (Basic Calculator)
