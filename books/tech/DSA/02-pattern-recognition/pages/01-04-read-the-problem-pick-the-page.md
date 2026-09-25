## Read the Problem, Pick the Page <span class="lv lv1"></span>

- Read the statement once for the *shape of the input*, once for *what is asked*, then once for *n*. The three answers land on one or two pages of this book. Most interview problems are settled here in under a minute

:::mint
<svg viewBox="0 0 470 475" role="img" aria-label="Decision chart. Start from what the input looks like, then match what the question asks, and go to the listed pages. contiguous run, values ≥ 0: 02-02 · 02-03; count subarrays, exactly K: 02-04 · 02-05 · 03-03; pair or triplet to a sum: 02-08 · 02-10 · 03-05; many range questions: 03-02 · 03-07 · 19-01; next greater / smaller: 10-05 · 10-08; top k · median · merge k: 15-03 · 15-04; min of max · max of min: 09-02; intervals · meetings: 07-06 · 07-07; rotate · spiral · diagonals: 05-01 → 05-04; regions · fewest steps: 16-03 · Module 05; reverse · reorder · k-group: 12-02 · 12-03; cycle · k-th from the end: 12-04 · 12-05; info from parent / children: 14-02 · 14-03; levels · views · LCA · BST: 14-04 → 14-08; connected · groups · steps: 16-02 · 16-03; X must come before Y: 16-04; list every option: 13-05 → 13-10; count · best · calls repeat: 17-02 → 17-06; appears once / twice: 11-01 · 11-02; powers of two · masks: 11-03. Finally check n: up to 20 try every subset, up to a thousand quadratic is fine, up to a hundred thousand sort heap or binary search, a million or more one pass." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .t { font: bold 11px Georgia, serif; fill: #1d4e89; }
    .g { font: bold 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 8.4px Georgia, serif; fill: #1a1a1a; }
    .p { font: bold 8.4px Consolas, monospace; fill: #2d6a4f; }
    .h { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { font: bold 9px Georgia, serif; fill: #ffffff; }
  </style>
  <defs><marker id="m0104" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#6b6b6b"/></marker></defs>
  <circle cx="16" cy="13" r="8" fill="#1d4e89"/><text x="16" y="17" class="n" text-anchor="middle">1</text><text x="29" y="17" class="t">The input</text><circle cx="138" cy="13" r="8" fill="#1d4e89"/><text x="138" y="17" class="n" text-anchor="middle">2</text><text x="151" y="17" class="t">What is asked</text>
  <text x="6" y="30" class="h">pick one box on the left, then the first chip that matches the statement</text>
    <rect x="6" y="40" width="104" height="135" rx="6" fill="#e2fcf3" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="58" y="112" class="g" text-anchor="middle">Array or string</text>
  <line x1="110" y1="108" x2="124" y2="108" stroke="#2d6a4f" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="40" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="135" y="52" class="s">contiguous run, values ≥ 0</text>
  <text x="135" y="65" class="p">→ 02-02 · 02-03</text>
  <rect x="300" y="40" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="307" y="52" class="s">count subarrays, exactly K</text>
  <text x="307" y="65" class="p">→ 02-04 · 02-05 · 03-03</text>
  <rect x="128" y="75" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="135" y="87" class="s">pair or triplet to a sum</text>
  <text x="135" y="100" class="p">→ 02-08 · 02-10 · 03-05</text>
  <rect x="300" y="75" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="307" y="87" class="s">many range questions</text>
  <text x="307" y="100" class="p">→ 03-02 · 03-07 · 19-01</text>
  <rect x="128" y="110" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="135" y="122" class="s">next greater / smaller</text>
  <text x="135" y="135" class="p">→ 10-05 · 10-08</text>
  <rect x="300" y="110" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="307" y="122" class="s">top k · median · merge k</text>
  <text x="307" y="135" class="p">→ 15-03 · 15-04</text>
  <rect x="128" y="145" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="135" y="157" class="s">min of max · max of min</text>
  <text x="135" y="170" class="p">→ 09-02</text>
  <rect x="300" y="145" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="307" y="157" class="s">intervals · meetings</text>
  <text x="307" y="170" class="p">→ 07-06 · 07-07</text>
  <rect x="6" y="185" width="104" height="30" rx="6" fill="#dbe7f5" stroke="#1d4e89" stroke-width="1.2"/>
  <text x="58" y="204" class="g" text-anchor="middle">Grid</text>
  <line x1="110" y1="200" x2="124" y2="200" stroke="#1d4e89" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="185" width="164" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="135" y="197" class="s">rotate · spiral · diagonals</text>
  <text x="135" y="210" class="p">→ 05-01 → 05-04</text>
  <rect x="300" y="185" width="164" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="307" y="197" class="s">regions · fewest steps</text>
  <text x="307" y="210" class="p">→ 16-03 · Module 05</text>
  <rect x="6" y="225" width="104" height="30" rx="6" fill="#ffedf1" stroke="#ef476e" stroke-width="1.2"/>
  <text x="58" y="244" class="g" text-anchor="middle">Linked list</text>
  <line x1="110" y1="240" x2="124" y2="240" stroke="#ef476e" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="225" width="164" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="135" y="237" class="s">reverse · reorder · k-group</text>
  <text x="135" y="250" class="p">→ 12-02 · 12-03</text>
  <rect x="300" y="225" width="164" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="307" y="237" class="s">cycle · k-th from the end</text>
  <text x="307" y="250" class="p">→ 12-04 · 12-05</text>
  <rect x="6" y="265" width="104" height="30" rx="6" fill="#e2fcf3" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="58" y="284" class="g" text-anchor="middle">Tree</text>
  <line x1="110" y1="280" x2="124" y2="280" stroke="#2d6a4f" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="265" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="135" y="277" class="s">info from parent / children</text>
  <text x="135" y="290" class="p">→ 14-02 · 14-03</text>
  <rect x="300" y="265" width="164" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="307" y="277" class="s">levels · views · LCA · BST</text>
  <text x="307" y="290" class="p">→ 14-04 → 14-08</text>
  <rect x="6" y="305" width="104" height="30" rx="6" fill="#dbe7f5" stroke="#1d4e89" stroke-width="1.2"/>
  <text x="58" y="324" class="g" text-anchor="middle">Items with relations</text>
  <line x1="110" y1="320" x2="124" y2="320" stroke="#1d4e89" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="305" width="164" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="135" y="317" class="s">connected · groups · steps</text>
  <text x="135" y="330" class="p">→ 16-02 · 16-03</text>
  <rect x="300" y="305" width="164" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="307" y="317" class="s">X must come before Y</text>
  <text x="307" y="330" class="p">→ 16-04</text>
  <rect x="6" y="345" width="104" height="30" rx="6" fill="#ffedf1" stroke="#ef476e" stroke-width="1.2"/>
  <text x="58" y="364" class="g" text-anchor="middle">A choice at every step</text>
  <line x1="110" y1="360" x2="124" y2="360" stroke="#ef476e" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="345" width="164" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="135" y="357" class="s">list every option</text>
  <text x="135" y="370" class="p">→ 13-05 → 13-10</text>
  <rect x="300" y="345" width="164" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="307" y="357" class="s">count · best · calls repeat</text>
  <text x="307" y="370" class="p">→ 17-02 → 17-06</text>
  <rect x="6" y="385" width="104" height="30" rx="6" fill="#ffffff" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="58" y="404" class="g" text-anchor="middle">Numbers · bits · XOR</text>
  <line x1="110" y1="400" x2="124" y2="400" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0104)"/>
  <rect x="128" y="385" width="164" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="135" y="397" class="s">appears once / twice</text>
  <text x="135" y="410" class="p">→ 11-01 · 11-02</text>
  <rect x="300" y="385" width="164" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="307" y="397" class="s">powers of two · masks</text>
  <text x="307" y="410" class="p">→ 11-03</text>
  <rect x="6" y="429" width="458" height="40" rx="6" fill="#f7f7f7" stroke="#6b6b6b" stroke-width="0.9"/>
  <circle cx="24" cy="441" r="8" fill="#1d4e89"/><text x="24" y="445" class="n" text-anchor="middle">3</text><text x="38" y="444" class="g">Check n (Module 01, 01-03)</text>
  <text x="16" y="460" class="s">n ≤ 20: try every subset (13) · n ≤ 10³: O(n²) is fine (17) · n ≤ 10⁵: sort, heap, binary search · n ≥ 10⁶: one pass (2, 3)</text>
</svg>
:::

- **No chip matches?** Ask the four questions of 18-01: frontier, dominated, boundary, precompute
