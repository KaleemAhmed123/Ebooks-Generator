## Monotonic Queue (Deque) <span class="lv lv2"></span>

- **What:** a deque of indices whose values fall from front to back. The back drops every index the newcomer beats; the front drops the index that has left the window. The front is the window max
- **Spot it:** the max or min of every window of k; a DP step that needs "best of the last k"; `max − min` under a limit. Each window's median → two heaps, 15-04
- **Why:** an index behind a larger, newer one is never a window max again, so it goes for good. Each index enters and leaves once: O(n)

:::mint
<svg viewBox="0 0 470 164" role="img" aria-label="Expiry trace of the deque over 1, 3, minus 1, minus 3, minus 5, 3, 6, 7 with k equal to 3. i 0: 1 arrives, deque 1. i 1: 3 pops 1 from the back, deque 3. i 2: minus 1 arrives, deque 3, minus 1, output 3. i 3: minus 3 arrives, deque 3, minus 1, minus 3, output 3. i 4: minus 5 arrives and the front index 1, value 3, expires because 1 is at most 4 minus 3; deque minus 1, minus 3, minus 5, output minus 1. i 5: 3 pops minus 5, minus 3, minus 1, output 3. i 6: 6 pops 3, output 6. i 7: 7 pops 6, output 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hot { font: 9.5px Consolas, monospace; fill: #ef476e; }
    .ln { stroke: #d0d0d0; stroke-width: 1; }
    .rw { fill: #ffedf1; }
  </style>
  <text x="20" y="14" class="sm">a = [1, 3, −1, −3, −5, 3, 6, 7], k = 3; deque shows index:value, front first</text>
  <text x="20" y="32" class="sm">i</text><text x="40" y="32" class="sm">arrival</text>
  <text x="92" y="32" class="sm">popped from back</text><text x="196" y="32" class="sm">expired from front</text>
  <text x="300" y="32" class="sm">deque</text><text x="424" y="32" class="sm">output</text>
  <line class="ln" x1="16" y1="37" x2="456" y2="37"/>
  <text x="20" y="50" class="lb">0</text><text x="48" y="50" class="lb">1</text><text x="300" y="50" class="lb">0:1</text><text x="428" y="50" class="sm">–</text>
  <text x="20" y="65" class="lb">1</text><text x="48" y="65" class="lb">3</text><text x="92" y="65" class="lb">1</text><text x="300" y="65" class="lb">1:3</text><text x="428" y="65" class="sm">–</text>
  <text x="20" y="80" class="lb">2</text><text x="44" y="80" class="lb">−1</text><text x="300" y="80" class="lb">1:3 2:−1</text><text x="428" y="80" class="lb">3</text>
  <text x="20" y="95" class="lb">3</text><text x="44" y="95" class="lb">−3</text><text x="300" y="95" class="lb">1:3 2:−1 3:−3</text><text x="428" y="95" class="lb">3</text>
  <rect class="rw" x="16" y="100" width="440" height="15"/>
  <text x="20" y="111" class="hot">4</text><text x="44" y="111" class="hot">−5</text><text x="196" y="111" class="hot">1:3 (1 ≤ 4 − 3)</text><text x="300" y="111" class="hot">2:−1 3:−3 4:−5</text><text x="424" y="111" class="hot">−1</text>
  <text x="20" y="127" class="lb">5</text><text x="48" y="127" class="lb">3</text><text x="92" y="127" class="lb">−5 −3 −1</text><text x="300" y="127" class="lb">5:3</text><text x="428" y="127" class="lb">3</text>
  <text x="20" y="142" class="lb">6</text><text x="48" y="142" class="lb">6</text><text x="92" y="142" class="lb">3</text><text x="300" y="142" class="lb">6:6</text><text x="428" y="142" class="lb">6</text>
  <text x="20" y="157" class="lb">7</text><text x="48" y="157" class="lb">7</text><text x="92" y="157" class="lb">6</text><text x="300" y="157" class="lb">7:7</text><text x="428" y="157" class="lb">7</text>
</svg>
:::

```ts
// Sliding Window Maximum (LeetCode 239)
function maxSlidingWindow(a: number[], k: number): number[] {
  const dq: number[] = [], out: number[] = [];
  let head = 0;                                   // dq[head..] is the deque
  for (let i = 0; i < a.length; i++) {
    while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop(); // beaten
    dq.push(i);
    if (dq[head] <= i - k) head++;                // expired
    if (i >= k - 1) out.push(a[dq[head]]);
  }
  return out;
}
```

- **Watch out:** store indices, not values. The front must expire when it leaves the window, and a value cannot say where it came from
