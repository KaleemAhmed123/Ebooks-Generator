## The path a message takes

:::mint
<svg viewBox="0 0 470 176" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .bad { stroke: #ef476e; stroke-width: 1.1; fill: none; }
    .bt { font: bold 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="m1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="m2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="58" width="74" height="28" rx="4"/>
  <text x="43" y="76" class="l" text-anchor="middle">producer</text>

  <rect class="b" x="112" y="58" width="78" height="28" rx="4"/>
  <text x="151" y="70" class="l" text-anchor="middle">exchange</text>
  <text x="151" y="81" class="s" text-anchor="middle">order.paid</text>

  <rect class="b" x="224" y="14" width="84" height="26" rx="4"/>
  <text x="266" y="31" class="s" text-anchor="middle">email queue</text>
  <rect class="b" x="224" y="58" width="84" height="26" rx="4"/>
  <text x="266" y="75" class="s" text-anchor="middle">stock queue</text>
  <rect class="b" x="224" y="102" width="84" height="26" rx="4"/>
  <text x="266" y="119" class="s" text-anchor="middle">analytics queue</text>

  <rect class="b" x="346" y="58" width="84" height="26" rx="4"/>
  <text x="388" y="75" class="s" text-anchor="middle">consumer</text>

  <rect class="b" x="346" y="134" width="84" height="26" rx="4"/>
  <text x="388" y="151" class="s" text-anchor="middle">dead letter</text>

  <line class="a" x1="82" y1="72" x2="108" y2="72" marker-end="url(#m1)"/>
  <line class="a" x1="192" y1="68" x2="220" y2="28" marker-end="url(#m1)"/>
  <line class="a" x1="192" y1="72" x2="220" y2="71" marker-end="url(#m1)"/>
  <line class="a" x1="192" y1="76" x2="220" y2="114" marker-end="url(#m1)"/>
  <line class="a" x1="310" y1="71" x2="342" y2="71" marker-end="url(#m1)"/>
  <path class="bad" d="M388 86 L388 130" marker-end="url(#m2)"/>
  <text x="396" y="108" class="bt">nack</text>

  <text x="43" y="104" class="s" text-anchor="middle">knows only</text>
  <text x="43" y="114" class="s" text-anchor="middle">the exchange</text>
  <text x="235" y="172" class="s" text-anchor="middle">a fourth consumer is a new binding, not a change to the producer</text>
</svg>
:::

- The producer publishes once. Three bindings mean three copies, each delivered independently
- A consumer failing affects only its own queue. The other two are unaffected
