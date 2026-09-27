## The 54 patterns <span class="lv lv1"></span>

- A **pattern** is one mechanism: the state it keeps and the invariant that makes it correct. Its **moves** (×n below) are the different questions that one mechanism answers. Own the mechanism of Sliding Window and all six of its moves follow
- Name the chapter from the input's shape (01-04), then the pattern from the statement's signal. Every page prints its pattern under the title and its ID in the corner

:::mint
<svg viewBox="0 0 470 556" role="img" aria-label="The 54 patterns of this book, numbered 1 to 54 in reading order and grouped by chapter, chapters 2 to 10 on the left and 11 to 19 on the right. Each row gives the pattern number, its name, how many moves it has when more than one, and its page IDs." xmlns="http://www.w3.org/2000/svg">
  <style>
    .ch { font: bold 8.6px Georgia, serif; fill: #1d4e89; }
    .rule { stroke: #1d4e89; stroke-width: 0.5; }
    .num { font: bold 8.4px Consolas, monospace; fill: #2d6a4f; }
    .nm { font: 8.6px Georgia, serif; fill: #1a1a1a; }
    .mv { font: bold 7px Consolas, monospace; fill: #8a5a00; }
    .pg { font: 7.6px Consolas, monospace; fill: #6b6b6b; }
  </style>
  <text x="4" y="20" class="ch">2  Windows &amp; Pointers</text>
  <line x1="4" y1="23" x2="230" y2="23" class="rule"/>
  <text x="18" y="33.6" class="num" text-anchor="end">1</text>
  <text x="24" y="33.6" class="nm">Sliding Window <tspan class="mv">×6</tspan></text>
  <text x="230" y="33.6" class="pg" text-anchor="end">02-02 … 02-07</text>
  <text x="18" y="47.2" class="num" text-anchor="end">2</text>
  <text x="24" y="47.2" class="nm">Two Pointers: Collide <tspan class="mv">×2</tspan></text>
  <text x="230" y="47.2" class="pg" text-anchor="end">02-08 · 02-10</text>
  <text x="18" y="60.800000000000004" class="num" text-anchor="end">3</text>
  <text x="24" y="60.800000000000004" class="nm">Reader and Writer</text>
  <text x="230" y="60.800000000000004" class="pg" text-anchor="end">02-09</text>
  <text x="4" y="78.4" class="ch">3  Prefix &amp; Running State</text>
  <line x1="4" y1="81.4" x2="230" y2="81.4" class="rule"/>
  <text x="18" y="92" class="num" text-anchor="end">4</text>
  <text x="24" y="92" class="nm">Prefix and Suffix <tspan class="mv">×4</tspan></text>
  <text x="230" y="92" class="pg" text-anchor="end">03-02 … 03-07</text>
  <text x="18" y="105.6" class="num" text-anchor="end">5</text>
  <text x="24" y="105.6" class="nm">Running Best <tspan class="mv">×2</tspan></text>
  <text x="230" y="105.6" class="pg" text-anchor="end">03-05 · 03-06</text>
  <text x="4" y="123.19999999999999" class="ch">4  In-Place &amp; Index Tricks</text>
  <line x1="4" y1="126.19999999999999" x2="230" y2="126.19999999999999" class="rule"/>
  <text x="18" y="136.79999999999998" class="num" text-anchor="end">6</text>
  <text x="24" y="136.79999999999998" class="nm">Send Each Value Home</text>
  <text x="230" y="136.79999999999998" class="pg" text-anchor="end">04-02</text>
  <text x="18" y="150.39999999999998" class="num" text-anchor="end">7</text>
  <text x="24" y="150.39999999999998" class="nm">Rearrange by Reversal <tspan class="mv">×2</tspan></text>
  <text x="230" y="150.39999999999998" class="pg" text-anchor="end">04-03 · 04-04</text>
  <text x="18" y="163.99999999999997" class="num" text-anchor="end">8</text>
  <text x="24" y="163.99999999999997" class="nm">Vote and Cancel</text>
  <text x="230" y="163.99999999999997" class="pg" text-anchor="end">04-05</text>
  <text x="18" y="177.59999999999997" class="num" text-anchor="end">9</text>
  <text x="24" y="177.59999999999997" class="nm">Wrap Around</text>
  <text x="230" y="177.59999999999997" class="pg" text-anchor="end">04-06</text>
  <text x="4" y="195.19999999999996" class="ch">5  Grids &amp; Matrices</text>
  <line x1="4" y1="198.19999999999996" x2="230" y2="198.19999999999996" class="rule"/>
  <text x="18" y="208.79999999999995" class="num" text-anchor="end">10</text>
  <text x="24" y="208.79999999999995" class="nm">Matrix Geometry <tspan class="mv">×2</tspan></text>
  <text x="230" y="208.79999999999995" class="pg" text-anchor="end">05-01 · 05-02</text>
  <text x="18" y="222.39999999999995" class="num" text-anchor="end">11</text>
  <text x="24" y="222.39999999999995" class="nm">State in the Cell</text>
  <text x="230" y="222.39999999999995" class="pg" text-anchor="end">05-03</text>
  <text x="18" y="235.99999999999994" class="num" text-anchor="end">12</text>
  <text x="24" y="235.99999999999994" class="nm">Staircase Search</text>
  <text x="230" y="235.99999999999994" class="pg" text-anchor="end">05-04</text>
  <text x="4" y="253.59999999999994" class="ch">6  Strings</text>
  <line x1="4" y1="256.5999999999999" x2="230" y2="256.5999999999999" class="rule"/>
  <text x="18" y="267.19999999999993" class="num" text-anchor="end">13</text>
  <text x="24" y="267.19999999999993" class="nm">Canonical Keys <tspan class="mv">×2</tspan></text>
  <text x="230" y="267.19999999999993" class="pg" text-anchor="end">06-01 · 06-03</text>
  <text x="18" y="280.79999999999995" class="num" text-anchor="end">14</text>
  <text x="24" y="280.79999999999995" class="nm">Grow from the Centre</text>
  <text x="230" y="280.79999999999995" class="pg" text-anchor="end">06-02</text>
  <text x="4" y="298.4" class="ch">7  Order &amp; Intervals</text>
  <line x1="4" y1="301.4" x2="230" y2="301.4" class="rule"/>
  <text x="18" y="312" class="num" text-anchor="end">15</text>
  <text x="24" y="312" class="nm">Intervals <tspan class="mv">×2</tspan></text>
  <text x="230" y="312" class="pg" text-anchor="end">07-06 · 07-07</text>
  <text x="18" y="325.6" class="num" text-anchor="end">16</text>
  <text x="24" y="325.6" class="nm">Count While You Merge</text>
  <text x="230" y="325.6" class="pg" text-anchor="end">07-08</text>
  <text x="18" y="339.20000000000005" class="num" text-anchor="end">17</text>
  <text x="24" y="339.20000000000005" class="nm">Let Pairs Decide the Order</text>
  <text x="230" y="339.20000000000005" class="pg" text-anchor="end">07-09</text>
  <text x="4" y="356.80000000000007" class="ch">8  Greedy Moves</text>
  <line x1="4" y1="359.80000000000007" x2="230" y2="359.80000000000007" class="rule"/>
  <text x="18" y="370.4000000000001" class="num" text-anchor="end">18</text>
  <text x="24" y="370.4000000000001" class="nm">Reach and Restart <tspan class="mv">×2</tspan></text>
  <text x="230" y="370.4000000000001" class="pg" text-anchor="end">08-02 · 08-06</text>
  <text x="18" y="384.0000000000001" class="num" text-anchor="end">19</text>
  <text x="24" y="384.0000000000001" class="nm">Latest Free Slot</text>
  <text x="230" y="384.0000000000001" class="pg" text-anchor="end">08-03</text>
  <text x="18" y="397.60000000000014" class="num" text-anchor="end">20</text>
  <text x="24" y="397.60000000000014" class="nm">Sort, then Assign <tspan class="mv">×2</tspan></text>
  <text x="230" y="397.60000000000014" class="pg" text-anchor="end">08-04 · 08-05</text>
  <text x="4" y="415.20000000000016" class="ch">9  Search Space</text>
  <line x1="4" y1="418.20000000000016" x2="230" y2="418.20000000000016" class="rule"/>
  <text x="18" y="428.8000000000002" class="num" text-anchor="end">21</text>
  <text x="24" y="428.8000000000002" class="nm">Binary Search on the Answer <tspan class="mv">×2</tspan></text>
  <text x="230" y="428.8000000000002" class="pg" text-anchor="end">09-02 · 09-04</text>
  <text x="18" y="442.4000000000002" class="num" text-anchor="end">22</text>
  <text x="24" y="442.4000000000002" class="nm">Find the Sorted Half</text>
  <text x="230" y="442.4000000000002" class="pg" text-anchor="end">09-03</text>
  <text x="4" y="460.0000000000002" class="ch">10  Stacks &amp; Queues</text>
  <line x1="4" y1="463.0000000000002" x2="230" y2="463.0000000000002" class="rule"/>
  <text x="18" y="473.60000000000025" class="num" text-anchor="end">23</text>
  <text x="24" y="473.60000000000025" class="nm">Nesting <tspan class="mv">×2</tspan></text>
  <text x="230" y="473.60000000000025" class="pg" text-anchor="end">10-02 · 10-04</text>
  <text x="18" y="487.2000000000003" class="num" text-anchor="end">24</text>
  <text x="24" y="487.2000000000003" class="nm">Cancel Against the Top</text>
  <text x="230" y="487.2000000000003" class="pg" text-anchor="end">10-03</text>
  <text x="18" y="500.8000000000003" class="num" text-anchor="end">25</text>
  <text x="24" y="500.8000000000003" class="nm">Monotonic Stack and Queue <tspan class="mv">×5</tspan></text>
  <text x="230" y="500.8000000000003" class="pg" text-anchor="end">10-05 … 10-10</text>
  <text x="18" y="514.4000000000003" class="num" text-anchor="end">26</text>
  <text x="24" y="514.4000000000003" class="nm">Build One from Another</text>
  <text x="230" y="514.4000000000003" class="pg" text-anchor="end">10-11</text>
  <text x="240" y="20" class="ch">11  Bits</text>
  <line x1="240" y1="23" x2="466" y2="23" class="rule"/>
  <text x="254" y="33.6" class="num" text-anchor="end">27</text>
  <text x="260" y="33.6" class="nm">Bit Identities <tspan class="mv">×2</tspan></text>
  <text x="466" y="33.6" class="pg" text-anchor="end">11-01 · 11-03</text>
  <text x="254" y="47.2" class="num" text-anchor="end">28</text>
  <text x="260" y="47.2" class="nm">Bit Columns</text>
  <text x="466" y="47.2" class="pg" text-anchor="end">11-02</text>
  <text x="240" y="64.80000000000001" class="ch">12  Linked Lists</text>
  <line x1="240" y1="67.80000000000001" x2="466" y2="67.80000000000001" class="rule"/>
  <text x="254" y="78.4" class="num" text-anchor="end">29</text>
  <text x="260" y="78.4" class="nm">List Reversal <tspan class="mv">×2</tspan></text>
  <text x="466" y="78.4" class="pg" text-anchor="end">12-02 · 12-03</text>
  <text x="254" y="92" class="num" text-anchor="end">30</text>
  <text x="260" y="92" class="nm">Pointer Distance <tspan class="mv">×2</tspan></text>
  <text x="466" y="92" class="pg" text-anchor="end">12-04 · 12-05</text>
  <text x="254" y="105.6" class="num" text-anchor="end">31</text>
  <text x="260" y="105.6" class="nm">Weave the Copies</text>
  <text x="466" y="105.6" class="pg" text-anchor="end">12-06</text>
  <text x="240" y="123.19999999999999" class="ch">13  Recursion &amp; Backtracking</text>
  <line x1="240" y1="126.19999999999999" x2="466" y2="126.19999999999999" class="rule"/>
  <text x="254" y="136.79999999999998" class="num" text-anchor="end">32</text>
  <text x="260" y="136.79999999999998" class="nm">Recursion Mechanics <tspan class="mv">×2</tspan></text>
  <text x="466" y="136.79999999999998" class="pg" text-anchor="end">13-01 · 13-02</text>
  <text x="254" y="150.39999999999998" class="num" text-anchor="end">33</text>
  <text x="260" y="150.39999999999998" class="nm">Board Backtracking <tspan class="mv">×2</tspan></text>
  <text x="466" y="150.39999999999998" class="pg" text-anchor="end">13-04 · 13-10</text>
  <text x="254" y="163.99999999999997" class="num" text-anchor="end">34</text>
  <text x="260" y="163.99999999999997" class="nm">Choose and Recurse <tspan class="mv">×4</tspan></text>
  <text x="466" y="163.99999999999997" class="pg" text-anchor="end">13-05 … 13-08</text>
  <text x="254" y="177.59999999999997" class="num" text-anchor="end">35</text>
  <text x="260" y="177.59999999999997" class="nm">Try Every Cut</text>
  <text x="466" y="177.59999999999997" class="pg" text-anchor="end">13-09</text>
  <text x="240" y="195.19999999999996" class="ch">14  Trees</text>
  <line x1="240" y1="198.19999999999996" x2="466" y2="198.19999999999996" class="rule"/>
  <text x="254" y="208.79999999999995" class="num" text-anchor="end">36</text>
  <text x="260" y="208.79999999999995" class="nm">Carry It Down</text>
  <text x="466" y="208.79999999999995" class="pg" text-anchor="end">14-02</text>
  <text x="254" y="222.39999999999995" class="num" text-anchor="end">37</text>
  <text x="260" y="222.39999999999995" class="nm">Return One, Record Another</text>
  <text x="466" y="222.39999999999995" class="pg" text-anchor="end">14-03</text>
  <text x="254" y="235.99999999999994" class="num" text-anchor="end">38</text>
  <text x="260" y="235.99999999999994" class="nm">Level and Position <tspan class="mv">×2</tspan></text>
  <text x="466" y="235.99999999999994" class="pg" text-anchor="end">14-04 · 14-05</text>
  <text x="254" y="249.59999999999994" class="num" text-anchor="end">39</text>
  <text x="260" y="249.59999999999994" class="nm">Tree as a Graph</text>
  <text x="466" y="249.59999999999994" class="pg" text-anchor="end">14-06</text>
  <text x="254" y="263.19999999999993" class="num" text-anchor="end">40</text>
  <text x="260" y="263.19999999999993" class="nm">Find the Split Point</text>
  <text x="466" y="263.19999999999993" class="pg" text-anchor="end">14-07</text>
  <text x="254" y="276.79999999999995" class="num" text-anchor="end">41</text>
  <text x="260" y="276.79999999999995" class="nm">Traversal-Order Facts <tspan class="mv">×3</tspan></text>
  <text x="466" y="276.79999999999995" class="pg" text-anchor="end">14-08 … 14-10</text>
  <text x="240" y="294.4" class="ch">15  Heaps &amp; Ordered Sets</text>
  <line x1="240" y1="297.4" x2="466" y2="297.4" class="rule"/>
  <text x="254" y="308" class="num" text-anchor="end">42</text>
  <text x="260" y="308" class="nm">Merge from Every Head</text>
  <text x="466" y="308" class="pg" text-anchor="end">15-03</text>
  <text x="254" y="321.6" class="num" text-anchor="end">43</text>
  <text x="260" y="321.6" class="nm">Balance Two Heaps</text>
  <text x="466" y="321.6" class="pg" text-anchor="end">15-04</text>
  <text x="254" y="335.20000000000005" class="num" text-anchor="end">44</text>
  <text x="260" y="335.20000000000005" class="nm">Merge the Two Smallest</text>
  <text x="466" y="335.20000000000005" class="pg" text-anchor="end">15-05</text>
  <text x="254" y="348.80000000000007" class="num" text-anchor="end">45</text>
  <text x="260" y="348.80000000000007" class="nm">Take Now, Regret Later</text>
  <text x="466" y="348.80000000000007" class="pg" text-anchor="end">15-06</text>
  <text x="240" y="366.4000000000001" class="ch">16  Graphs &amp; Dependency</text>
  <line x1="240" y1="369.4000000000001" x2="466" y2="369.4000000000001" class="rule"/>
  <text x="254" y="380.0000000000001" class="num" text-anchor="end">46</text>
  <text x="260" y="380.0000000000001" class="nm">Find the Hidden Edge</text>
  <text x="466" y="380.0000000000001" class="pg" text-anchor="end">16-02</text>
  <text x="254" y="393.60000000000014" class="num" text-anchor="end">47</text>
  <text x="260" y="393.60000000000014" class="nm">Flood from the Border</text>
  <text x="466" y="393.60000000000014" class="pg" text-anchor="end">16-03</text>
  <text x="240" y="411.20000000000016" class="ch">17  DP &amp; Games</text>
  <line x1="240" y1="414.20000000000016" x2="466" y2="414.20000000000016" class="rule"/>
  <text x="254" y="424.8000000000002" class="num" text-anchor="end">48</text>
  <text x="260" y="424.8000000000002" class="nm">Pick, then Jump</text>
  <text x="466" y="424.8000000000002" class="pg" text-anchor="end">17-03</text>
  <text x="254" y="438.4000000000002" class="num" text-anchor="end">49</text>
  <text x="260" y="438.4000000000002" class="nm">Track What You Hold</text>
  <text x="466" y="438.4000000000002" class="pg" text-anchor="end">17-04</text>
  <text x="254" y="452.0000000000002" class="num" text-anchor="end">50</text>
  <text x="260" y="452.0000000000002" class="nm">Try Every Split</text>
  <text x="466" y="452.0000000000002" class="pg" text-anchor="end">17-05</text>
  <text x="254" y="465.60000000000025" class="num" text-anchor="end">51</text>
  <text x="260" y="465.60000000000025" class="nm">Assume a Perfect Opponent</text>
  <text x="466" y="465.60000000000025" class="pg" text-anchor="end">17-06</text>
  <text x="240" y="483.2000000000003" class="ch">18  Patterns Nobody Named</text>
  <line x1="240" y1="486.2000000000003" x2="466" y2="486.2000000000003" class="rule"/>
  <text x="254" y="496.8000000000003" class="num" text-anchor="end">52</text>
  <text x="260" y="496.8000000000003" class="nm">Maintain the Frontier</text>
  <text x="466" y="496.8000000000003" class="pg" text-anchor="end">18-02</text>
  <text x="254" y="510.4000000000003" class="num" text-anchor="end">53</text>
  <text x="260" y="510.4000000000003" class="nm">Throw Out the Dominated</text>
  <text x="466" y="510.4000000000003" class="pg" text-anchor="end">18-06</text>
  <text x="240" y="528.0000000000003" class="ch">19  Range Structures</text>
  <line x1="240" y1="531.0000000000003" x2="466" y2="531.0000000000003" class="rule"/>
  <text x="254" y="541.6000000000004" class="num" text-anchor="end">54</text>
  <text x="260" y="541.6000000000004" class="nm">Choose the Range Structure</text>
  <text x="466" y="541.6000000000004" class="pg" text-anchor="end">19-01</text>
</svg>
:::
