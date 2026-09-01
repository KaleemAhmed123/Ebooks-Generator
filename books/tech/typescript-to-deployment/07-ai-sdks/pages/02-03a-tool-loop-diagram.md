## The tool call round trip

- This one picture explains tool calling, agents, MCP and every framework in this booklet
- **Two requests, not one.** The model does not run anything. It asks, your code answers, and the second request carries that answer

:::mint
<svg viewBox="0 0 470 210" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="t1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="38" y="12" class="t">YOUR SERVER</text>
  <text x="330" y="12" class="t">THE MODEL</text>
  <line class="a" x1="70" y1="18" x2="70" y2="196" stroke-dasharray="3 3"/>
  <line class="a" x1="368" y1="18" x2="368" y2="196" stroke-dasharray="3 3"/>

  <line class="a" x1="70" y1="38" x2="362" y2="38" marker-end="url(#t1)"/>
  <text x="216" y="33" class="s" text-anchor="middle">1. question + tool definitions</text>

  <line class="a" x1="368" y1="70" x2="76" y2="70" marker-end="url(#t1)"/>
  <text x="216" y="65" class="s" text-anchor="middle">2. stop_reason: tool_use, get_order(o_842)</text>

  <rect class="b" x="12" y="84" width="116" height="32" rx="4"/>
  <text x="70" y="97" class="l" text-anchor="middle">your code runs it</text>
  <text x="70" y="110" class="s" text-anchor="middle">auth, tenant, database</text>

  <line class="a" x1="70" y1="134" x2="362" y2="134" marker-end="url(#t1)"/>
  <text x="216" y="129" class="s" text-anchor="middle">3. everything again + tool_result</text>

  <line class="a" x1="368" y1="166" x2="76" y2="166" marker-end="url(#t1)"/>
  <text x="216" y="161" class="s" text-anchor="middle">4. stop_reason: end_turn, the answer</text>

  <text x="216" y="192" class="s" text-anchor="middle">an agent is this loop repeated until step 4 arrives</text>
</svg>
:::

- **Step 3 resends the whole conversation**, which is why an agent gets more expensive with every step
- **The box on the left is the only place authorization exists.** Nothing about the model decides who may read that order
