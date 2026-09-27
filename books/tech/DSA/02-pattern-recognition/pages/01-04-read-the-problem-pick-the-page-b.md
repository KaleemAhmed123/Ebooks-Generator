## Read the Problem, Pick the Page <span class="lv lv1"></span> - continued

:::mint
<svg viewBox="0 0 470 568" role="img" aria-label="Decision chart, every other input shape. Pick the box that matches the input, then the first chip that matches the statement, and go to its pages. Grid: diagonals · spiral · rotate · boxes → 05-01, 05-02; update in place from neighbours → 05-03; rows and columns both sorted → 05-04; largest rectangle of 1s → 10-09; enclosed regions, flood from the edge → 16-03; every path through a maze → 13-04; unsure: table, graph or DP? → 05-00. Linked list: merge · partition · delete the head → 12-01; reverse · k at a time · swap pairs → 12-02; pair the front with the back → 12-03; cycle · where it starts → 12-04; k-th from the end → 12-05; deep copy with random pointers → 12-06. Tree: depends on ancestors (path so far) → 14-02; depends on subtrees, answer ≠ return → 14-03; per level · views · vertical order → 14-04, 14-05; distance k · spreads to the parent → 14-06; lowest common ancestor → 14-07; BST: k-th, iterator, validate → 14-08; build from two traversals → 14-09; in-order walk in O(1) space → 14-10. Items with relations: shared attribute · implicit edge → 16-02; X must come before Y → 16-04; cheapest path · best-first expansion → 18-02. A choice at every step: define f by a smaller f · print on return → 13-01, 13-02; every subset, combination, permutation → 13-03, 13-05, 13-06, 13-07, 13-08; split a string into valid pieces → 13-09; place under constraints: queens, sudoku → 13-10; count ways · best value · calls repeat → 17-02; weighted intervals · pick then skip ahead → 17-03; buy / sell with states or a limit → 17-04; merge or cut a range, cost per split → 17-05; two players, both play perfectly → 17-06. Numbers · design: appears once, others twice or k times → 11-01, 11-02; powers of two · lowest set bit → 11-03; unsure which bit move → 11-00; build a structure from others: LRU, min-stack → 10-11; a candidate is beaten on every measure → 18-06. Finally check n: up to 20 try every subset, up to a thousand quadratic is fine, up to a million O(n log n), more than a million one pass." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .t { font: bold 11px Georgia, serif; fill: #1d4e89; }
    .g { font: bold 8.8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Georgia, serif; fill: #1a1a1a; }
    .p { font: bold 7.8px Consolas, monospace; fill: #2d6a4f; }
    .h { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { font: bold 9px Georgia, serif; fill: #ffffff; }
  </style>
  <circle cx="14" cy="11" r="8" fill="#1d4e89"/><text x="14" y="15" class="n" text-anchor="middle">1</text><text x="27" y="15" class="t">The input</text><circle cx="114" cy="11" r="8" fill="#1d4e89"/><text x="114" y="15" class="n" text-anchor="middle">2</text><text x="127" y="15" class="t">What the statement asks</text>
  <rect x="4" y="28" width="92" height="98" rx="6" fill="#dbe7f5" stroke="#1d4e89" stroke-width="1.2"/>
  <text x="50" y="80" class="g" text-anchor="middle">Grid</text>
  <rect x="106.0" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="37" class="s">diagonals · spiral · rotate ·</text>
  <text x="110.0" y="45.4" class="s">boxes</text>
  <text x="110.0" y="55" class="p">→ 05-01 · 05-02</text>
  <rect x="227.3" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="231.3" y="37" class="s">update in place from</text>
  <text x="231.3" y="45.4" class="s">neighbours</text>
  <text x="231.3" y="55" class="p">→ 05-03</text>
  <rect x="348.7" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="352.7" y="37" class="s">rows and columns both sorted</text>
  <text x="352.7" y="55" class="p">→ 05-04</text>
  <rect x="106.0" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="71" class="s">largest rectangle of 1s</text>
  <text x="110.0" y="89" class="p">→ 10-09</text>
  <rect x="227.3" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="231.3" y="71" class="s">enclosed regions, flood from</text>
  <text x="231.3" y="79.4" class="s">the edge</text>
  <text x="231.3" y="89" class="p">→ 16-03</text>
  <rect x="348.7" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="352.7" y="71" class="s">every path through a maze</text>
  <text x="352.7" y="89" class="p">→ 13-04</text>
  <rect x="106.0" y="96" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="105" class="s">unsure: table, graph or DP?</text>
  <text x="110.0" y="123" class="p">→ 05-00</text>
  <rect x="4" y="134" width="92" height="64" rx="6" fill="#ffedf1" stroke="#ef476e" stroke-width="1.2"/>
  <text x="50" y="169" class="g" text-anchor="middle">Linked list</text>
  <rect x="106.0" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="143" class="s">merge · partition · delete</text>
  <text x="110.0" y="151.4" class="s">the head</text>
  <text x="110.0" y="161" class="p">→ 12-01</text>
  <rect x="227.3" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="143" class="s">reverse · k at a time · swap</text>
  <text x="231.3" y="151.4" class="s">pairs</text>
  <text x="231.3" y="161" class="p">→ 12-02</text>
  <rect x="348.7" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="143" class="s">pair the front with the back</text>
  <text x="352.7" y="161" class="p">→ 12-03</text>
  <rect x="106.0" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="177" class="s">cycle · where it starts</text>
  <text x="110.0" y="195" class="p">→ 12-04</text>
  <rect x="227.3" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="177" class="s">k-th from the end</text>
  <text x="231.3" y="195" class="p">→ 12-05</text>
  <rect x="348.7" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="177" class="s">deep copy with random</text>
  <text x="352.7" y="185.4" class="s">pointers</text>
  <text x="352.7" y="195" class="p">→ 12-06</text>
  <rect x="4" y="206" width="92" height="98" rx="6" fill="#e2fcf3" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="50" y="258" class="g" text-anchor="middle">Tree</text>
  <rect x="106.0" y="206" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="215" class="s">depends on ancestors (path so</text>
  <text x="110.0" y="223.4" class="s">far)</text>
  <text x="110.0" y="233" class="p">→ 14-02</text>
  <rect x="227.3" y="206" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="215" class="s">depends on subtrees, answer ≠</text>
  <text x="231.3" y="223.4" class="s">return</text>
  <text x="231.3" y="233" class="p">→ 14-03</text>
  <rect x="348.7" y="206" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="352.7" y="215" class="s">per level · views · vertical</text>
  <text x="352.7" y="223.4" class="s">order</text>
  <text x="352.7" y="233" class="p">→ 14-04 · 14-05</text>
  <rect x="106.0" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="249" class="s">distance k · spreads to the</text>
  <text x="110.0" y="257.4" class="s">parent</text>
  <text x="110.0" y="267" class="p">→ 14-06</text>
  <rect x="227.3" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="249" class="s">lowest common ancestor</text>
  <text x="231.3" y="267" class="p">→ 14-07</text>
  <rect x="348.7" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="352.7" y="249" class="s">BST: k-th, iterator, validate</text>
  <text x="352.7" y="267" class="p">→ 14-08</text>
  <rect x="106.0" y="274" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="283" class="s">build from two traversals</text>
  <text x="110.0" y="301" class="p">→ 14-09</text>
  <rect x="227.3" y="274" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="283" class="s">in-order walk in O(1) space</text>
  <text x="231.3" y="301" class="p">→ 14-10</text>
  <rect x="4" y="312" width="92" height="30" rx="6" fill="#dbe7f5" stroke="#1d4e89" stroke-width="1.2"/>
  <text x="50" y="324.5" class="g" text-anchor="middle">Items with</text>
  <text x="50" y="335.5" class="g" text-anchor="middle">relations</text>
  <rect x="106.0" y="312" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="321" class="s">shared attribute · implicit</text>
  <text x="110.0" y="329.4" class="s">edge</text>
  <text x="110.0" y="339" class="p">→ 16-02</text>
  <rect x="227.3" y="312" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="231.3" y="321" class="s">X must come before Y</text>
  <text x="231.3" y="339" class="p">→ 16-04</text>
  <rect x="348.7" y="312" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="352.7" y="321" class="s">cheapest path · best-first</text>
  <text x="352.7" y="329.4" class="s">expansion</text>
  <text x="352.7" y="339" class="p">→ 18-02</text>
  <rect x="4" y="350" width="92" height="98" rx="6" fill="#ffedf1" stroke="#ef476e" stroke-width="1.2"/>
  <text x="50" y="396.5" class="g" text-anchor="middle">A choice at</text>
  <text x="50" y="407.5" class="g" text-anchor="middle">every step</text>
  <rect x="106.0" y="350" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="359" class="s">define f by a smaller f ·</text>
  <text x="110.0" y="367.4" class="s">print on return</text>
  <text x="110.0" y="377" class="p">→ 13-01 · 13-02</text>
  <rect x="227.3" y="350" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="359" class="s">every subset, combination,</text>
  <text x="231.3" y="367.4" class="s">permutation</text>
  <text x="231.3" y="377" class="p">→ 13-03 → 13-08</text>
  <rect x="348.7" y="350" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="359" class="s">split a string into valid</text>
  <text x="352.7" y="367.4" class="s">pieces</text>
  <text x="352.7" y="377" class="p">→ 13-09</text>
  <rect x="106.0" y="384" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="393" class="s">place under constraints:</text>
  <text x="110.0" y="401.4" class="s">queens, sudoku</text>
  <text x="110.0" y="411" class="p">→ 13-10</text>
  <rect x="227.3" y="384" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="393" class="s">count ways · best value ·</text>
  <text x="231.3" y="401.4" class="s">calls repeat</text>
  <text x="231.3" y="411" class="p">→ 17-02</text>
  <rect x="348.7" y="384" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="393" class="s">weighted intervals · pick</text>
  <text x="352.7" y="401.4" class="s">then skip ahead</text>
  <text x="352.7" y="411" class="p">→ 17-03</text>
  <rect x="106.0" y="418" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="427" class="s">buy / sell with states or a</text>
  <text x="110.0" y="435.4" class="s">limit</text>
  <text x="110.0" y="445" class="p">→ 17-04</text>
  <rect x="227.3" y="418" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="427" class="s">merge or cut a range, cost</text>
  <text x="231.3" y="435.4" class="s">per split</text>
  <text x="231.3" y="445" class="p">→ 17-05</text>
  <rect x="348.7" y="418" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="427" class="s">two players, both play</text>
  <text x="352.7" y="435.4" class="s">perfectly</text>
  <text x="352.7" y="445" class="p">→ 17-06</text>
  <rect x="4" y="456" width="92" height="64" rx="6" fill="#f7f7f7" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="50" y="485.5" class="g" text-anchor="middle">Numbers ·</text>
  <text x="50" y="496.5" class="g" text-anchor="middle">design</text>
  <rect x="106.0" y="456" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="110.0" y="465" class="s">appears once, others twice or</text>
  <text x="110.0" y="473.4" class="s">k times</text>
  <text x="110.0" y="483" class="p">→ 11-01 · 11-02</text>
  <rect x="227.3" y="456" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="231.3" y="465" class="s">powers of two · lowest set</text>
  <text x="231.3" y="473.4" class="s">bit</text>
  <text x="231.3" y="483" class="p">→ 11-03</text>
  <rect x="348.7" y="456" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="352.7" y="465" class="s">unsure which bit move</text>
  <text x="352.7" y="483" class="p">→ 11-00</text>
  <rect x="106.0" y="490" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="110.0" y="499" class="s">build a structure from</text>
  <text x="110.0" y="507.4" class="s">others: LRU, min-stack</text>
  <text x="110.0" y="517" class="p">→ 10-11</text>
  <rect x="227.3" y="490" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="231.3" y="499" class="s">a candidate is beaten on</text>
  <text x="231.3" y="507.4" class="s">every measure</text>
  <text x="231.3" y="517" class="p">→ 18-06</text>
  <rect x="4" y="528" width="462" height="36" rx="6" fill="#f7f7f7" stroke="#6b6b6b" stroke-width="0.9"/>
  <circle cx="20" cy="540" r="8" fill="#1d4e89"/><text x="20" y="544" class="n" text-anchor="middle">3</text><text x="33" y="543" class="g">Check n (Module 01, 01-03)</text>
  <text x="12" y="557" class="s">n ≤ 20: every subset (13) · n ≤ 10³: O(n²) is fine (17) · n ≤ 10⁶: O(n log n) — sort, heap, binary search · n > 10⁶: O(n), one pass</text>
</svg>
:::

- **No chip matches?** Ask the four questions of 18-01: frontier, dominated, boundary, precompute
