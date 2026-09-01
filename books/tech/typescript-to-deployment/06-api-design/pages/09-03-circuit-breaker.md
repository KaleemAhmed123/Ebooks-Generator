## Circuit breakers

- Retries assume the dependency might work. Once it is definitively down, every call is a guaranteed wait for a timeout
- A **circuit breaker** notices that and fails instantly instead, which protects your service and lets theirs recover

:::mint
<svg viewBox="0 0 470 148" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.2; }
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .r { stroke: #ef476e; stroke-width: 1.1; fill: none; }
    .rt { font: 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="c1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="c2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <rect class="b" x="18" y="46" width="94" height="34" rx="4"/>
  <text x="65" y="62" class="l" text-anchor="middle">closed</text>
  <text x="65" y="74" class="s" text-anchor="middle">calls pass</text>

  <rect class="b" x="188" y="46" width="94" height="34" rx="4"/>
  <text x="235" y="62" class="l" text-anchor="middle">open</text>
  <text x="235" y="74" class="s" text-anchor="middle">fail instantly</text>

  <rect class="b" x="358" y="46" width="94" height="34" rx="4"/>
  <text x="405" y="62" class="l" text-anchor="middle">half open</text>
  <text x="405" y="74" class="s" text-anchor="middle">let one through</text>

  <path class="r" d="M114 58 L184 58" marker-end="url(#c2)"/>
  <text x="149" y="52" class="rt" text-anchor="middle">50% fail</text>

  <path class="a" d="M284 58 L354 58" marker-end="url(#c1)"/>
  <text x="319" y="52" class="s" text-anchor="middle">after 30s</text>

  <path class="a" d="M400 84 Q 300 128 68 84" marker-end="url(#c1)"/>
  <text x="235" y="118" class="s" text-anchor="middle">it worked, close again</text>

  <path class="r" d="M410 84 Q 340 108 284 76" marker-end="url(#c2)"/>
  <text x="352" y="104" class="rt" text-anchor="middle">still failing</text>

  <text x="235" y="142" class="s" text-anchor="middle">open means a 5 second timeout becomes a 1 millisecond failure</text>
</svg>
:::

- **A fallback must not manufacture success.** Returning a null shipment id that the code treats as real is worse than the outage
- Fail loudly, degrade honestly, or queue the work for later
