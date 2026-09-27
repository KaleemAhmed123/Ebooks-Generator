## Monotonic Stack <span class="lv lv1"></span>

- **What it is:** Next greater (or smaller) element for every index in one pass. The stack holds indices still waiting for an answer; an arrival that beats the top settles it. Definition and template: Module 03, 01-06
- **Signal:** for each element, the first later (or earlier) element that is larger or smaller; "how many days until a warmer day"; "how many consecutive days up to today had a price at most today's"; n up to 10⁵, so a scan to the right from every index is too slow
- **Not this page if:** each answer is the max of the last k elements, so old elements must *expire* → 10-10
- **Why it works:** An element beaten by a newcomer has its answer: the newcomer. The unbeaten elements sit on the stack in decreasing order, so a newcomer settles a run from the top and stops at the first element it does not beat. Whatever is left at the end has no answer. Each index is pushed once and popped at most once: O(n)

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="Next greater element on 2, 1, 5, 3, traced row by row. i 0, value 2: nothing popped, stack 2. i 1, value 1: nothing popped, stack 2, 1. i 2, value 5: pop 1, which sets ans[1] to 5, then pop 2, which sets ans[0] to 5; stack 5. i 3, value 3: nothing popped, stack 5, 3. At the end 5 and 3 are still on the stack and get minus 1. Answer 5, 5, minus 1, minus 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hot { font: 9.5px Consolas, monospace; fill: #ef476e; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .ln { stroke: #d0d0d0; stroke-width: 1; }
  </style>
  <text x="20" y="16" class="sm">i</text><text x="44" y="16" class="sm">a[i]</text>
  <text x="84" y="16" class="sm">pops, and the answer each pop sets</text>
  <text x="330" y="16" class="sm">stack after (bottom → top)</text>
  <line class="ln" x1="16" y1="22" x2="456" y2="22"/>
  <text x="20" y="38" class="lb">0</text><text x="48" y="38" class="lb">2</text><text x="84" y="38" class="sm">none</text>
  <rect class="bx" x="330" y="27" width="22" height="15"/><text x="341" y="38" class="lb" text-anchor="middle">2</text>
  <text x="20" y="60" class="lb">1</text><text x="48" y="60" class="lb">1</text><text x="84" y="60" class="sm">none: 1 does not beat 2</text>
  <rect class="bx" x="330" y="49" width="22" height="15"/><text x="341" y="60" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="354" y="49" width="22" height="15"/><text x="365" y="60" class="lb" text-anchor="middle">1</text>
  <text x="20" y="82" class="lb">2</text><text x="48" y="82" class="lb">5</text>
  <text x="84" y="82" class="hot">pop 1 → ans[1] = 5,  pop 2 → ans[0] = 5</text>
  <rect class="bx" x="330" y="71" width="22" height="15"/><text x="341" y="82" class="lb" text-anchor="middle">5</text>
  <text x="20" y="104" class="lb">3</text><text x="48" y="104" class="lb">3</text><text x="84" y="104" class="sm">none: 3 does not beat 5</text>
  <rect class="bx" x="330" y="93" width="22" height="15"/><text x="341" y="104" class="lb" text-anchor="middle">5</text>
  <rect class="bx" x="354" y="93" width="22" height="15"/><text x="365" y="104" class="lb" text-anchor="middle">3</text>
  <line class="ln" x1="16" y1="114" x2="456" y2="114"/>
  <text x="20" y="128" class="sm">end</text><text x="84" y="128" class="lb">still waiting: 5, 3 → ans[2] = ans[3] = −1</text>
  <text x="84" y="144" class="lb" fill="#1d4e89">ans = [5, 5, −1, −1]</text>
</svg>
:::

### Variations

- **Daily Temperatures (LeetCode 739):** the answer is the distance `i − popped`, which is why the stack holds indices
- **Circular array:** the wrap-around version is on 04-06
- **Online Stock Span (LeetCode 901):** *previous* greater: after popping, the element left on top is the answer; store spans with the values
- **Largest Rectangle in Histogram (LeetCode 84):** previous and next *smaller* on each side of every bar (10-09)
