## Graceful shutdown

- A deploy sends `SIGTERM`. Without a handler, in-flight requests are dropped

:::mint
<svg viewBox="0 0 470 156" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="g1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="34" width="82" height="30" rx="4"/>
  <text x="47" y="53" class="l" text-anchor="middle">SIGTERM</text>

  <rect class="b" x="110" y="34" width="96" height="30" rx="4"/>
  <text x="158" y="47" class="l" text-anchor="middle">stop accepting</text>
  <text x="158" y="59" class="s" text-anchor="middle">server.close()</text>

  <rect class="b" x="228" y="34" width="96" height="30" rx="4"/>
  <text x="276" y="47" class="l" text-anchor="middle">finish in flight</text>
  <text x="276" y="59" class="s" text-anchor="middle">drain</text>

  <rect class="b" x="346" y="34" width="112" height="30" rx="4"/>
  <text x="402" y="47" class="l" text-anchor="middle">close resources</text>
  <text x="402" y="59" class="s" text-anchor="middle">db, redis, queue</text>

  <line class="a" x1="90" y1="49" x2="106" y2="49" marker-end="url(#g1)"/>
  <line class="a" x1="208" y1="49" x2="224" y2="49" marker-end="url(#g1)"/>
  <line class="a" x1="326" y1="49" x2="342" y2="49" marker-end="url(#g1)"/>

  <text x="235" y="90" class="t" text-anchor="middle">a hard timer runs alongside all of this</text>
  <rect class="b" x="150" y="98" width="170" height="26" rx="4"/>
  <text x="235" y="115" class="s" text-anchor="middle">10s later, exit anyway</text>
  <line class="a" x1="47" y1="66" x2="47" y2="111" />
  <line class="a" x1="47" y1="111" x2="146" y2="111" marker-end="url(#g1)"/>

  <text x="235" y="144" class="s" text-anchor="middle">without the timer, one stuck request holds the deploy forever</text>
</svg>
:::

- Readiness must fail **before** the server closes, or the load balancer keeps sending traffic
