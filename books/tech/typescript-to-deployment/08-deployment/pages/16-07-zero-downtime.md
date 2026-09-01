## Deploying without dropping a request

- A rolling deploy replaces instances one at a time. **Every request lost during it is lost because one of five steps is missing**

:::mint
<svg viewBox="0 0 470 200" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="z1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="c" x="70" y="8" width="330" height="22" rx="4"/>
  <text x="235" y="23" class="l" text-anchor="middle">1. start the new task, wait for its health check</text>
  <rect class="b" x="70" y="38" width="330" height="22" rx="4"/>
  <text x="235" y="53" class="l" text-anchor="middle">2. register it, and only then deregister the old one</text>
  <rect class="b" x="70" y="68" width="330" height="22" rx="4"/>
  <text x="235" y="83" class="l" text-anchor="middle">3. drain: no new requests, existing ones finish</text>
  <rect class="b" x="70" y="98" width="330" height="22" rx="4"/>
  <text x="235" y="113" class="l" text-anchor="middle">4. SIGTERM: stop accepting, finish in-flight work</text>
  <rect class="c" x="70" y="128" width="330" height="22" rx="4"/>
  <text x="235" y="143" class="l" text-anchor="middle">5. the process exits by itself, before the kill timeout</text>

  <line class="a" x1="235" y1="30" x2="235" y2="36" marker-end="url(#z1)"/>
  <line class="a" x1="235" y1="60" x2="235" y2="66" marker-end="url(#z1)"/>
  <line class="a" x1="235" y1="90" x2="235" y2="96" marker-end="url(#z1)"/>
  <line class="a" x1="235" y1="120" x2="235" y2="126" marker-end="url(#z1)"/>

  <text x="412" y="22" class="s">grace period</text>
  <text x="412" y="52" class="s">min 100%</text>
  <text x="412" y="82" class="s">dereg delay</text>
  <text x="412" y="112" class="s">stopTimeout</text>

  <text x="235" y="176" class="s" text-anchor="middle">drain time must exceed the longest request; stopTimeout must exceed drain time</text>
  <text x="235" y="190" class="s" text-anchor="middle">get either ordering wrong and the deploy quietly cuts requests in half</text>
</svg>
:::
