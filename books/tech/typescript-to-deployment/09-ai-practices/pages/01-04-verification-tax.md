## The verification tax

- The productivity claim is real and it is narrower than it sounds. **Generation got much faster; delivery did not move nearly as much**
- The gap has a name in the research: the **verification tax**, the effort of checking whether generated code is correct, secure, and consistent with the system it joins

:::mint
<svg viewBox="0 0 470 175" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .w { fill: #ffe8ee; stroke: #ef476e; stroke-width: 1.2; }
    .t { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>

  <text x="8" y="16" class="t">BEFORE</text>
  <rect class="b" x="78" y="22" width="70" height="20"/>
  <text x="113" y="36" class="s" text-anchor="middle">decide</text>
  <rect class="c" x="148" y="22" width="190" height="20"/>
  <text x="243" y="36" class="s" text-anchor="middle">write the code</text>
  <rect class="b" x="338" y="22" width="110" height="20"/>
  <text x="393" y="36" class="s" text-anchor="middle">review + verify</text>

  <text x="8" y="70" class="t">NOW</text>
  <rect class="b" x="78" y="76" width="90" height="20"/>
  <text x="123" y="90" class="s" text-anchor="middle">decide + specify</text>
  <rect class="c" x="168" y="76" width="60" height="20"/>
  <text x="198" y="90" class="s" text-anchor="middle">generate</text>
  <rect class="w" x="228" y="76" width="220" height="20"/>
  <text x="338" y="90" class="s" text-anchor="middle">review + verify + integrate</text>

  <text x="235" y="126" class="s" text-anchor="middle">the total bar is shorter, and the pink part grew</text>
  <text x="235" y="140" class="s" text-anchor="middle">a team that speeds up generation and changes nothing else</text>
  <text x="235" y="154" class="s" text-anchor="middle">simply moves the queue from writing to reviewing</text>
</svg>
:::

- Reported figures cluster the same way: **large gains in individual output, much smaller gains in delivered work**, with review time rising sharply
- **The teams that convert the gain are the ones that invested in review, tests and gates**, which is the subject of Modules 5 and 7
