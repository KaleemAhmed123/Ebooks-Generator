## The six phases

- Each turn of the loop walks the same phases in the same order

:::mint
<svg viewBox="0 0 470 200" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .s { font: 7.5px Georgia, serif; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 7.5px Consolas, monospace; }
  </style>
  <defs>
    <marker id="e1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="150" y="6" width="170" height="24" rx="4"/>
  <text x="235" y="22" class="l" text-anchor="middle">timers</text>
  <text x="330" y="22" class="s">setTimeout, setInterval</text>

  <rect class="b" x="150" y="36" width="170" height="24" rx="4"/>
  <text x="235" y="52" class="l" text-anchor="middle">pending callbacks</text>
  <text x="330" y="52" class="s">some TCP errors</text>

  <rect class="b" x="150" y="66" width="170" height="24" rx="4"/>
  <text x="235" y="82" class="l" text-anchor="middle">idle, prepare</text>
  <text x="330" y="82" class="s">internal</text>

  <rect class="b" x="150" y="96" width="170" height="24" rx="4"/>
  <text x="235" y="112" class="l" text-anchor="middle">poll</text>
  <text x="330" y="112" class="s">incoming IO, waits here</text>

  <rect class="b" x="150" y="126" width="170" height="24" rx="4"/>
  <text x="235" y="142" class="l" text-anchor="middle">check</text>
  <text x="330" y="142" class="s">setImmediate</text>

  <rect class="b" x="150" y="156" width="170" height="24" rx="4"/>
  <text x="235" y="172" class="l" text-anchor="middle">close callbacks</text>
  <text x="330" y="172" class="s">socket.on("close")</text>

  <line class="a" x1="235" y1="30" x2="235" y2="34" marker-end="url(#e1)"/>
  <line class="a" x1="235" y1="60" x2="235" y2="64" marker-end="url(#e1)"/>
  <line class="a" x1="235" y1="90" x2="235" y2="94" marker-end="url(#e1)"/>
  <line class="a" x1="235" y1="120" x2="235" y2="124" marker-end="url(#e1)"/>
  <line class="a" x1="235" y1="150" x2="235" y2="154" marker-end="url(#e1)"/>

  <path class="a" d="M148 168 Q 110 168 110 94 Q 110 18 148 18" marker-end="url(#e1)"/>
  <text x="60" y="96" class="hot">loops</text>

  <text x="18" y="118" class="s">microtasks run</text>
  <text x="18" y="130" class="s">between every</text>
  <text x="18" y="142" class="s">phase, not once</text>
</svg>
:::

- **poll** is where the loop spends most of its time, waiting for sockets and files
- Microtasks are drained after each phase, not once per full turn
