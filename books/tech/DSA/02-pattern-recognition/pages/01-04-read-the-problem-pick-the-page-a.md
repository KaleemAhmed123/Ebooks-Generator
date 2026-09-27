## Read the Problem, Pick the Page <span class="lv lv1"></span>

- Read the statement three times: for the *shape of the input*, for *what is asked*, and for *n*. Pick the box, then the first chip that matches; confirm on the page against its "Not this page if" line. Arrays and strings are on this page, every other input overleaf

:::mint
<svg viewBox="0 0 470 524" role="img" aria-label="Decision chart, arrays and strings. Pick the box that matches the input, then the first chip that matches the statement, and go to its pages. Array: a subarray or window: contiguous, values ≥ 0, longest / shortest → 02-02, 02-03; count subarrays · exactly K → 02-04, 02-05; remove from both ends, keep the middle → 02-06; choose k items, score by their spread → 02-07; sum or mod of a subarray, negatives in → 03-03; best subarray · max product → 03-06; max of every window of size k → 10-10; unsure: window, count or prefix map? → 02-01. Array: pairs and positions: pair or triplet to a target, sortable → 02-08, 02-10; compact or partition in place · 0/1/2 → 02-09; best pair i < j · buy low, sell high → 03-05; answer at i needs its left and its right → 03-04; next greater / smaller · sum of minimums → 10-05, 10-08; smallest number after k removals → 10-07; pairs out of order · smaller after self → 07-08. Array: values and order: values in 1..n, O(1) extra space → 04-02; rotate by k · next arrangement → 04-03, 04-04; more than n/2 (or n/3) of one value → 04-05; circular array · wraps past the end → 04-06; many range sums or range adds → 03-02, 03-07, 19-01; order decided pair by pair → 07-09; intervals · meetings · rooms → 07-06, 07-07. Array: optimise a choice: reach the end · tour a circle of stations → 08-02, 08-06; unit jobs with deadline and profit → 08-03; pair items, or split them between two sides → 08-04, 08-05; min of max · smallest X that works → 09-02; k-th smallest of a set you cannot list → 09-04; sorted, but rotated / a mountain / a peak → 09-03; top k · running median · merge k lists → 15-03, 15-04; merge the cheapest two · undo a bad pick → 15-05, 15-06. String: same under a rule: anagram, pattern → 06-01, 06-03; palindromic substring → 06-02; nested brackets · decode · depth → 10-02, 10-04; adjacent items cancel or collide → 10-03; another chapter wearing text → 06-00" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .t { font: bold 11px Georgia, serif; fill: #1d4e89; }
    .g { font: bold 8.8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Georgia, serif; fill: #1a1a1a; }
    .p { font: bold 7.8px Consolas, monospace; fill: #2d6a4f; }
    .h { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { font: bold 9px Georgia, serif; fill: #ffffff; }
  </style>
  <circle cx="14" cy="11" r="8" fill="#1d4e89"/><text x="14" y="15" class="n" text-anchor="middle">1</text><text x="27" y="15" class="t">The input</text><circle cx="114" cy="11" r="8" fill="#1d4e89"/><text x="114" y="15" class="n" text-anchor="middle">2</text><text x="127" y="15" class="t">What the statement asks</text>
  <rect x="4" y="28" width="92" height="98" rx="6" fill="#e2fcf3" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="50" y="69" class="g" text-anchor="middle">Array: a</text>
  <text x="50" y="80" class="g" text-anchor="middle">subarray or</text>
  <text x="50" y="91" class="g" text-anchor="middle">window</text>
  <rect x="106.0" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="37" class="s">contiguous, values ≥ 0,</text>
  <text x="110.0" y="45.4" class="s">longest / shortest</text>
  <text x="110.0" y="55" class="p">→ 02-02 · 02-03</text>
  <rect x="227.3" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="37" class="s">count subarrays · exactly K</text>
  <text x="231.3" y="55" class="p">→ 02-04 · 02-05</text>
  <rect x="348.7" y="28" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="352.7" y="37" class="s">remove from both ends, keep</text>
  <text x="352.7" y="45.4" class="s">the middle</text>
  <text x="352.7" y="55" class="p">→ 02-06</text>
  <rect x="106.0" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="71" class="s">choose k items, score by</text>
  <text x="110.0" y="79.4" class="s">their spread</text>
  <text x="110.0" y="89" class="p">→ 02-07</text>
  <rect x="227.3" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="71" class="s">sum or mod of a subarray,</text>
  <text x="231.3" y="79.4" class="s">negatives in</text>
  <text x="231.3" y="89" class="p">→ 03-03</text>
  <rect x="348.7" y="62" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="352.7" y="71" class="s">best subarray · max product</text>
  <text x="352.7" y="89" class="p">→ 03-06</text>
  <rect x="106.0" y="96" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="105" class="s">max of every window of size k</text>
  <text x="110.0" y="123" class="p">→ 10-10</text>
  <rect x="227.3" y="96" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="105" class="s">unsure: window, count or</text>
  <text x="231.3" y="113.4" class="s">prefix map?</text>
  <text x="231.3" y="123" class="p">→ 02-01</text>
  <rect x="4" y="134" width="92" height="98" rx="6" fill="#dbe7f5" stroke="#1d4e89" stroke-width="1.2"/>
  <text x="50" y="180.5" class="g" text-anchor="middle">Array: pairs</text>
  <text x="50" y="191.5" class="g" text-anchor="middle">and positions</text>
  <rect x="106.0" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="143" class="s">pair or triplet to a target,</text>
  <text x="110.0" y="151.4" class="s">sortable</text>
  <text x="110.0" y="161" class="p">→ 02-08 · 02-10</text>
  <rect x="227.3" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="231.3" y="143" class="s">compact or partition in place</text>
  <text x="231.3" y="151.4" class="s">· 0/1/2</text>
  <text x="231.3" y="161" class="p">→ 02-09</text>
  <rect x="348.7" y="134" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="352.7" y="143" class="s">best pair i &lt; j · buy low,</text>
  <text x="352.7" y="151.4" class="s">sell high</text>
  <text x="352.7" y="161" class="p">→ 03-05</text>
  <rect x="106.0" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="177" class="s">answer at i needs its left</text>
  <text x="110.0" y="185.4" class="s">and its right</text>
  <text x="110.0" y="195" class="p">→ 03-04</text>
  <rect x="227.3" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="231.3" y="177" class="s">next greater / smaller · sum</text>
  <text x="231.3" y="185.4" class="s">of minimums</text>
  <text x="231.3" y="195" class="p">→ 10-05 · 10-08</text>
  <rect x="348.7" y="168" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="352.7" y="177" class="s">smallest number after k</text>
  <text x="352.7" y="185.4" class="s">removals</text>
  <text x="352.7" y="195" class="p">→ 10-07</text>
  <rect x="106.0" y="202" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1d4e89" stroke-width="0.9"/>
  <text x="110.0" y="211" class="s">pairs out of order · smaller</text>
  <text x="110.0" y="219.4" class="s">after self</text>
  <text x="110.0" y="229" class="p">→ 07-08</text>
  <rect x="4" y="240" width="92" height="98" rx="6" fill="#ffedf1" stroke="#ef476e" stroke-width="1.2"/>
  <text x="50" y="286.5" class="g" text-anchor="middle">Array: values</text>
  <text x="50" y="297.5" class="g" text-anchor="middle">and order</text>
  <rect x="106.0" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="249" class="s">values in 1..n, O(1) extra</text>
  <text x="110.0" y="257.4" class="s">space</text>
  <text x="110.0" y="267" class="p">→ 04-02</text>
  <rect x="227.3" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="249" class="s">rotate by k · next</text>
  <text x="231.3" y="257.4" class="s">arrangement</text>
  <text x="231.3" y="267" class="p">→ 04-03 · 04-04</text>
  <rect x="348.7" y="240" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="249" class="s">more than n/2 (or n/3) of one</text>
  <text x="352.7" y="257.4" class="s">value</text>
  <text x="352.7" y="267" class="p">→ 04-05</text>
  <rect x="106.0" y="274" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="283" class="s">circular array · wraps past</text>
  <text x="110.0" y="291.4" class="s">the end</text>
  <text x="110.0" y="301" class="p">→ 04-06</text>
  <rect x="227.3" y="274" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="231.3" y="283" class="s">many range sums or range adds</text>
  <text x="231.3" y="301" class="p">→ 03-02 · 03-07 · 19-01</text>
  <rect x="348.7" y="274" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="352.7" y="283" class="s">order decided pair by pair</text>
  <text x="352.7" y="301" class="p">→ 07-09</text>
  <rect x="106.0" y="308" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#ef476e" stroke-width="0.9"/>
  <text x="110.0" y="317" class="s">intervals · meetings · rooms</text>
  <text x="110.0" y="335" class="p">→ 07-06 · 07-07</text>
  <rect x="4" y="346" width="92" height="98" rx="6" fill="#f7f7f7" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="50" y="387" class="g" text-anchor="middle">Array:</text>
  <text x="50" y="398" class="g" text-anchor="middle">optimise a</text>
  <text x="50" y="409" class="g" text-anchor="middle">choice</text>
  <rect x="106.0" y="346" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="110.0" y="355" class="s">reach the end · tour a circle</text>
  <text x="110.0" y="363.4" class="s">of stations</text>
  <text x="110.0" y="373" class="p">→ 08-02 · 08-06</text>
  <rect x="227.3" y="346" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="231.3" y="355" class="s">unit jobs with deadline and</text>
  <text x="231.3" y="363.4" class="s">profit</text>
  <text x="231.3" y="373" class="p">→ 08-03</text>
  <rect x="348.7" y="346" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="352.7" y="355" class="s">pair items, or split them</text>
  <text x="352.7" y="363.4" class="s">between two sides</text>
  <text x="352.7" y="373" class="p">→ 08-04 · 08-05</text>
  <rect x="106.0" y="380" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="110.0" y="389" class="s">min of max · smallest X that</text>
  <text x="110.0" y="397.4" class="s">works</text>
  <text x="110.0" y="407" class="p">→ 09-02</text>
  <rect x="227.3" y="380" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="231.3" y="389" class="s">k-th smallest of a set you</text>
  <text x="231.3" y="397.4" class="s">cannot list</text>
  <text x="231.3" y="407" class="p">→ 09-04</text>
  <rect x="348.7" y="380" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="352.7" y="389" class="s">sorted, but rotated / a</text>
  <text x="352.7" y="397.4" class="s">mountain / a peak</text>
  <text x="352.7" y="407" class="p">→ 09-03</text>
  <rect x="106.0" y="414" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="110.0" y="423" class="s">top k · running median ·</text>
  <text x="110.0" y="431.4" class="s">merge k lists</text>
  <text x="110.0" y="441" class="p">→ 15-03 · 15-04</text>
  <rect x="227.3" y="414" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#1a1a1a" stroke-width="0.9"/>
  <text x="231.3" y="423" class="s">merge the cheapest two · undo</text>
  <text x="231.3" y="431.4" class="s">a bad pick</text>
  <text x="231.3" y="441" class="p">→ 15-05 · 15-06</text>
  <rect x="4" y="452" width="92" height="64" rx="6" fill="#e2fcf3" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="50" y="487" class="g" text-anchor="middle">String</text>
  <rect x="106.0" y="452" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="461" class="s">same under a rule: anagram,</text>
  <text x="110.0" y="469.4" class="s">pattern</text>
  <text x="110.0" y="479" class="p">→ 06-01 · 06-03</text>
  <rect x="227.3" y="452" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="461" class="s">palindromic substring</text>
  <text x="231.3" y="479" class="p">→ 06-02</text>
  <rect x="348.7" y="452" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="352.7" y="461" class="s">nested brackets · decode ·</text>
  <text x="352.7" y="469.4" class="s">depth</text>
  <text x="352.7" y="479" class="p">→ 10-02 · 10-04</text>
  <rect x="106.0" y="486" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="110.0" y="495" class="s">adjacent items cancel or</text>
  <text x="110.0" y="503.4" class="s">collide</text>
  <text x="110.0" y="513" class="p">→ 10-03</text>
  <rect x="227.3" y="486" width="117.3" height="30" rx="4" fill="#ffffff" stroke="#2d6a4f" stroke-width="0.9"/>
  <text x="231.3" y="495" class="s">another chapter wearing text</text>
  <text x="231.3" y="513" class="p">→ 06-00</text>
</svg>
:::
