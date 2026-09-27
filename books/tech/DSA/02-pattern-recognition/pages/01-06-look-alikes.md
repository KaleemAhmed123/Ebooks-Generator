## Look-alikes <span class="lv lv1"></span>

- The costly mistake is rarely a bug in the code. It is the right code for the wrong pattern, written confidently. Each row is a pair that shares its surface; one fact in the statement decides between them
- Cover the right column and name the real pattern from the middle one

:::mint
<svg viewBox="0 0 470 458" role="img" aria-label="Eleven look-alike pairs. Fixed window (02-02) is really Monotonic deque (10-10) when the window keeps a max, and a max cannot be un-added when an item leaves; example Sliding Window Maximum (LC 239). Sort by end, keep the most (07-07) is really Pick, then jump (17-03) when every interval carries its own profit; example Maximum Profit in Job Scheduling (LC 1235). Send each value home (04-02) is really Let pairs cancel (11-01) when the values are exactly 0..n with one gap; example Missing Number (LC 268). Heap of candidates (15-01) is really Monotonic stack (10-05) when the nearest larger on one side, not the largest overall; example Next Greater Element I (LC 496). BFS, fewest steps (Module 05) is really Maintain the frontier (18-02) when moves cost different amounts; example Path With Minimum Effort (LC 1631). Pick or skip (13-05) is really Fill the slots (13-08) when order matters: [1, 2] and [2, 1] are different answers; example Permutations (LC 46). Backtracking (13-07) is really Name the DP shape (17-02) when only the count is asked, and the same calls repeat; example Coin Change II (LC 518). Union–find (16-02) is really BFS from every node (16-02) when the relation runs one way: A reaches B, not B reaches A; example Detonate the Maximum Bombs (LC 2101). Carry it down (14-02) is really Return one, record another (14-03) when the path may bend at any node, not only hang from the root; example Binary Tree Maximum Path Sum (LC 124). Take now, regret later (15-06) is really Pick, then jump (17-03) when items carry different values, not one unit each; example Max Events That Can Be Attended II (LC 1751). Walk level by level (14-04) is really Give every node a coordinate (14-05) when the answer is grouped by column, not by level; example Vertical Order Traversal (LC 987)." xmlns="http://www.w3.org/2000/svg">
  <style>
    .hd { font: bold 8px Georgia, serif; fill: #6b6b6b; letter-spacing: 0.3px; }
    .lb { fill: #ffffff; stroke: #8a8a8a; stroke-width: 0.9; stroke-dasharray: 3 2; }
    .rb { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .ln { font: 8.4px Georgia, serif; fill: #6b6b6b; }
    .rn { font: bold 8.4px Georgia, serif; fill: #1a1a1a; }
    .pg { font: bold 7.4px Consolas, monospace; fill: #2d6a4f; }
    .ft { font: italic 8px Georgia, serif; fill: #1d4e89; }
    .ex { font: 6.8px Georgia, serif; fill: #6b6b6b; }
    .ar { stroke: #1d4e89; stroke-width: 0.9; }
  </style>
  <defs><marker id="m0106" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1d4e89"/></marker></defs>
  <text x="63" y="12" class="hd" text-anchor="middle">looks like</text>
  <text x="218" y="12" class="hd" text-anchor="middle">the fact in the statement that decides it</text>
  <text x="390" y="12" class="hd" text-anchor="middle">is actually</text>
  <rect x="4" y="22" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="34" class="ln">Fixed window</text>
  <text x="10" y="49" class="pg">02-02</text>
  <line x1="128" y1="38" x2="306" y2="38" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="25.5" class="ft" text-anchor="middle">the window keeps a max, and a max cannot</text>
  <text x="218" y="34" class="ft" text-anchor="middle">be un-added when an item leaves</text>
  <rect x="314" y="22" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="33" class="rn">Monotonic deque</text>
  <text x="320" y="44" class="pg">10-10</text>
  <text x="348" y="44" class="ex">Sliding Window Maximum (LC 239)</text>
  <rect x="4" y="62" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="72" class="ln">Sort by end, keep the</text>
  <text x="10" y="81" class="ln">most</text>
  <text x="10" y="89" class="pg">07-07</text>
  <line x1="128" y1="78" x2="306" y2="78" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="74" class="ft" text-anchor="middle">every interval carries its own profit</text>
  <rect x="314" y="62" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="73" class="rn">Pick, then jump</text>
  <text x="320" y="84" class="pg">17-03</text>
  <text x="348" y="84" class="ex">Maximum Profit in Job</text>
  <text x="348" y="91.4" class="ex">Scheduling (LC 1235)</text>
  <rect x="4" y="102" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="114" class="ln">Send each value home</text>
  <text x="10" y="129" class="pg">04-02</text>
  <line x1="128" y1="118" x2="306" y2="118" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="114" class="ft" text-anchor="middle">the values are exactly 0..n with one gap</text>
  <rect x="314" y="102" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="113" class="rn">Let pairs cancel</text>
  <text x="320" y="124" class="pg">11-01</text>
  <text x="348" y="124" class="ex">Missing Number (LC 268)</text>
  <rect x="4" y="142" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="154" class="ln">Heap of candidates</text>
  <text x="10" y="169" class="pg">15-01</text>
  <line x1="128" y1="158" x2="306" y2="158" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="145.5" class="ft" text-anchor="middle">the nearest larger on one side, not the</text>
  <text x="218" y="154" class="ft" text-anchor="middle">largest overall</text>
  <rect x="314" y="142" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="153" class="rn">Monotonic stack</text>
  <text x="320" y="164" class="pg">10-05</text>
  <text x="348" y="164" class="ex">Next Greater Element I (LC 496)</text>
  <rect x="4" y="182" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="194" class="ln">BFS, fewest steps</text>
  <text x="10" y="209" class="pg">Module 05</text>
  <line x1="128" y1="198" x2="306" y2="198" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="194" class="ft" text-anchor="middle">moves cost different amounts</text>
  <rect x="314" y="182" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="193" class="rn">Maintain the frontier</text>
  <text x="320" y="204" class="pg">18-02</text>
  <text x="348" y="204" class="ex">Path With Minimum Effort (LC</text>
  <text x="348" y="211.4" class="ex">1631)</text>
  <rect x="4" y="222" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="234" class="ln">Pick or skip</text>
  <text x="10" y="249" class="pg">13-05</text>
  <line x1="128" y1="238" x2="306" y2="238" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="225.5" class="ft" text-anchor="middle">order matters: [1, 2] and [2, 1] are</text>
  <text x="218" y="234" class="ft" text-anchor="middle">different answers</text>
  <rect x="314" y="222" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="233" class="rn">Fill the slots</text>
  <text x="320" y="244" class="pg">13-08</text>
  <text x="348" y="244" class="ex">Permutations (LC 46)</text>
  <rect x="4" y="262" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="274" class="ln">Backtracking</text>
  <text x="10" y="289" class="pg">13-07</text>
  <line x1="128" y1="278" x2="306" y2="278" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="265.5" class="ft" text-anchor="middle">only the count is asked, and the same</text>
  <text x="218" y="274" class="ft" text-anchor="middle">calls repeat</text>
  <rect x="314" y="262" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="273" class="rn">Name the DP shape</text>
  <text x="320" y="284" class="pg">17-02</text>
  <text x="348" y="284" class="ex">Coin Change II (LC 518)</text>
  <rect x="4" y="302" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="314" class="ln">Union–find</text>
  <text x="10" y="329" class="pg">16-02</text>
  <line x1="128" y1="318" x2="306" y2="318" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="305.5" class="ft" text-anchor="middle">the relation runs one way: A reaches B,</text>
  <text x="218" y="314" class="ft" text-anchor="middle">not B reaches A</text>
  <rect x="314" y="302" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="313" class="rn">BFS from every node</text>
  <text x="320" y="324" class="pg">16-02</text>
  <text x="348" y="324" class="ex">Detonate the Maximum Bombs (LC</text>
  <text x="348" y="331.4" class="ex">2101)</text>
  <rect x="4" y="342" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="354" class="ln">Carry it down</text>
  <text x="10" y="369" class="pg">14-02</text>
  <line x1="128" y1="358" x2="306" y2="358" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="345.5" class="ft" text-anchor="middle">the path may bend at any node, not only</text>
  <text x="218" y="354" class="ft" text-anchor="middle">hang from the root</text>
  <rect x="314" y="342" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="353" class="rn">Return one, record another</text>
  <text x="320" y="364" class="pg">14-03</text>
  <text x="348" y="364" class="ex">Binary Tree Maximum Path Sum</text>
  <text x="348" y="371.4" class="ex">(LC 124)</text>
  <rect x="4" y="382" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="394" class="ln">Take now, regret later</text>
  <text x="10" y="409" class="pg">15-06</text>
  <line x1="128" y1="398" x2="306" y2="398" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="385.5" class="ft" text-anchor="middle">items carry different values, not one</text>
  <text x="218" y="394" class="ft" text-anchor="middle">unit each</text>
  <rect x="314" y="382" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="393" class="rn">Pick, then jump</text>
  <text x="320" y="404" class="pg">17-03</text>
  <text x="348" y="404" class="ex">Max Events That Can Be Attended</text>
  <text x="348" y="411.4" class="ex">II (LC 1751)</text>
  <rect x="4" y="422" width="118" height="32" rx="4" class="lb"/>
  <text x="10" y="434" class="ln">Walk level by level</text>
  <text x="10" y="449" class="pg">14-04</text>
  <line x1="128" y1="438" x2="306" y2="438" class="ar" marker-end="url(#m0106)"/>
  <text x="218" y="425.5" class="ft" text-anchor="middle">the answer is grouped by column, not by</text>
  <text x="218" y="434" class="ft" text-anchor="middle">level</text>
  <rect x="314" y="422" width="152" height="32" rx="4" class="rb"/>
  <text x="320" y="433" class="rn">Give every node a coordinate</text>
  <text x="320" y="444" class="pg">14-05</text>
  <text x="348" y="444" class="ex">Vertical Order Traversal (LC</text>
  <text x="348" y="451.4" class="ex">987)</text>
</svg>
:::
