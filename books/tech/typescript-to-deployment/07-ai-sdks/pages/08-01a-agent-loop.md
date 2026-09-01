## The loop, drawn

:::mint
<svg viewBox="0 0 470 205" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .g { fill: #ffe8ee; stroke: #ef476e; stroke-width: 1.2; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="g1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="14" y="14" width="96" height="26" rx="4"/>
  <text x="62" y="31" class="l" text-anchor="middle">task in</text>

  <rect class="b" x="162" y="14" width="140" height="26" rx="4"/>
  <text x="232" y="31" class="l" text-anchor="middle">call model with history</text>

  <rect class="b" x="162" y="66" width="140" height="26" rx="4"/>
  <text x="232" y="83" class="l" text-anchor="middle">stop_reason?</text>

  <rect class="g" x="336" y="66" width="120" height="26" rx="4"/>
  <text x="396" y="83" class="l" text-anchor="middle">approval gate</text>

  <rect class="b" x="336" y="118" width="120" height="26" rx="4"/>
  <text x="396" y="135" class="l" text-anchor="middle">run the tool</text>

  <rect class="b" x="162" y="118" width="140" height="26" rx="4"/>
  <text x="232" y="135" class="l" text-anchor="middle">append tool_result</text>

  <rect class="b" x="14" y="66" width="96" height="26" rx="4"/>
  <text x="62" y="83" class="l" text-anchor="middle">answer out</text>

  <rect class="g" x="14" y="118" width="96" height="26" rx="4"/>
  <text x="62" y="135" class="l" text-anchor="middle">budget check</text>

  <line class="a" x1="110" y1="27" x2="158" y2="27" marker-end="url(#g1)"/>
  <line class="a" x1="232" y1="40" x2="232" y2="62" marker-end="url(#g1)"/>
  <line class="a" x1="162" y1="79" x2="114" y2="79" marker-end="url(#g1)"/>
  <text x="138" y="74" class="s" text-anchor="middle">end_turn</text>
  <line class="a" x1="302" y1="79" x2="332" y2="79" marker-end="url(#g1)"/>
  <text x="317" y="74" class="s" text-anchor="middle">tool_use</text>
  <line class="a" x1="396" y1="92" x2="396" y2="114" marker-end="url(#g1)"/>
  <line class="a" x1="332" y1="131" x2="306" y2="131" marker-end="url(#g1)"/>
  <line class="a" x1="162" y1="131" x2="114" y2="131" marker-end="url(#g1)"/>
  <line class="a" x1="62" y1="118" x2="62" y2="96" marker-end="url(#g1)"/>
  <text x="88" y="110" class="s">over budget</text>
  <line class="a" x1="110" y1="131" x2="140" y2="131"/>
  <line class="a" x1="140" y1="131" x2="140" y2="27"/>
  <line class="a" x1="140" y1="27" x2="158" y2="27" marker-end="url(#g1)"/>

  <text x="235" y="178" class="s" text-anchor="middle">the two pink boxes are the difference between a demo and a production agent</text>
  <text x="235" y="192" class="s" text-anchor="middle">every pass through the loop resends the entire history, so cost grows per step</text>
</svg>
:::
