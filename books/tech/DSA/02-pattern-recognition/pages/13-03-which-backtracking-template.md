## Which Backtracking Template? <span class="lv lv1"></span>

- **What it is:** Pages 13-05 to 13-08 share one loop. They differ only in the start index of the next call and one skip rule, and three questions about the statement pick between them
- **Signal:** "all subsets / combinations / permutations", "each number may be used once" or "an unlimited number of times", "the input may contain duplicates", "different orders count as different"
- **Why it works:** The start index encodes the rules: `i + 1` uses each item once, in index order; `i` lets it repeat; `0` lets an earlier item follow a later one, so orders count

:::mint
<svg viewBox="0 0 470 268" role="img" aria-label="Decision tree. Does order matter? If yes: may an item repeat? Yes: restart at go of 0, page 13-07. No: fill the slots, page 13-08. If order does not matter: is reuse allowed? Yes: stay at go of i, page 13-07. No: are there duplicates in the input? Yes: loop and skip when i is greater than start and equal to the previous, page 13-06. No: pick or skip with go of i plus 1, page 13-05. Below, the input 1, 1, 2 with target 3 run through each template. Pick or skip gives 1 2 twice, because the two 1s are different items. Loop and skip gives 1 2. Stay gives 1 1 1 and 1 2. Restart gives 1 1 1, 1 2 and 2 1. Fill the slots gives 1 2 and 2 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .q { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .lf { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .hot { font: 9px Consolas, monospace; fill: #ef476e; }
    .ln { stroke: #d0d0d0; stroke-width: 1; }
  </style>
  <rect class="q" x="175" y="6" width="120" height="20" rx="3"/><text x="235" y="20" class="lb" text-anchor="middle">order matters?</text>
  <path class="e" d="M 195 26 L 95 48"/><text x="130" y="34" class="sm">yes</text>
  <path class="e" d="M 275 26 L 360 48"/><text x="330" y="34" class="sm">no</text>
  <rect class="q" x="20" y="48" width="150" height="20" rx="3"/><text x="95" y="62" class="lb" text-anchor="middle">may an item repeat?</text>
  <rect class="q" x="290" y="48" width="140" height="20" rx="3"/><text x="360" y="62" class="lb" text-anchor="middle">reuse allowed?</text>
  <path class="e" d="M 70 68 L 58 90"/><text x="50" y="80" class="sm">yes</text>
  <path class="e" d="M 120 68 L 166 90"/><text x="148" y="80" class="sm">no</text>
  <path class="e" d="M 330 68 L 284 90"/><text x="280" y="80" class="sm">yes</text>
  <path class="e" d="M 390 68 L 402 90"/><text x="402" y="80" class="sm">no</text>
  <rect class="lf" x="8" y="90" width="100" height="30" rx="3"/><text x="58" y="103" class="lb" text-anchor="middle">restart: go(0)</text><text x="58" y="115" class="sm" text-anchor="middle">13-07</text>
  <rect class="lf" x="116" y="90" width="100" height="30" rx="3"/><text x="166" y="103" class="lb" text-anchor="middle">fill the slots</text><text x="166" y="115" class="sm" text-anchor="middle">13-08</text>
  <rect class="lf" x="236" y="90" width="96" height="30" rx="3"/><text x="284" y="103" class="lb" text-anchor="middle">stay: go(i)</text><text x="284" y="115" class="sm" text-anchor="middle">13-07</text>
  <rect class="q" x="340" y="90" width="124" height="20" rx="3"/><text x="402" y="104" class="lb" text-anchor="middle">duplicates in input?</text>
  <path class="e" d="M 380 110 L 322 134"/><text x="316" y="124" class="sm">yes</text>
  <path class="e" d="M 424 110 L 426 134"/><text x="430" y="124" class="sm">no</text>
  <rect class="lf" x="236" y="134" width="130" height="30" rx="3"/><text x="301" y="147" class="lb" text-anchor="middle">loop, skip i &gt; start</text><text x="301" y="159" class="sm" text-anchor="middle">13-06</text>
  <rect class="lf" x="374" y="134" width="90" height="30" rx="3"/><text x="419" y="147" class="lb" text-anchor="middle">go(i + 1)</text><text x="419" y="159" class="sm" text-anchor="middle">pick or skip, 13-05</text>
  <text x="8" y="188" class="sm">[1, 1, 2], target 3, through each template (13-07 and 13-08 keep their skip rule for equal values)</text>
  <line class="ln" x1="8" y1="193" x2="462" y2="193"/>
  <text x="8" y="206" class="lb">13-05 go(i + 1)</text><text x="140" y="206" class="hot">[1,2] [1,2]  the two 1s are different items → 13-06</text>
  <text x="8" y="220" class="lb">13-06 skip i &gt; start</text><text x="140" y="220" class="lb">[1,2]</text>
  <text x="8" y="234" class="lb">13-07 go(i)</text><text x="140" y="234" class="lb">[1,1,1] [1,2]</text>
  <text x="8" y="248" class="lb">13-07 go(0)</text><text x="140" y="248" class="lb">[1,1,1] [1,2] [2,1]</text>
  <text x="8" y="262" class="lb">13-08 fill the slots</text><text x="140" y="262" class="lb">[1,2] [2,1]</text>
</svg>
:::

### Before the tree

- **The pieces must be contiguous** (split a string into valid parts) → 13-09
- **A rule links the choices** (no shared row, column or diagonal; buckets of equal sum) → 13-10; a path through grid cells → 13-04
- **Only a count or a best value** is asked → 17-01: memoise the state instead of listing

### This chapter, by pattern

- **Pattern 32 · Recursion Mechanics:** 13-01, 13-02
- **Pattern 33 · Board Backtracking:** 13-04, 13-10
- **Pattern 34 · Choose and Recurse:** 13-05, 13-06, 13-07, 13-08
- **Pattern 35 · Try Every Cut:** 13-09
