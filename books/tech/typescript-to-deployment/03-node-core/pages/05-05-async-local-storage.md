## AsyncLocalStorage

- The problem: a correlation id known at the edge, needed in a log line six calls deep
- Threading it through every function signature pollutes everything

:::mint
<svg viewBox="0 0 470 148" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .ctx { fill: #e2fcf3; stroke: #1a1a1a; stroke-width: 1; stroke-dasharray: 3 2; }
    .t { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="al" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="ctx" x="76" y="6" width="386" height="96" rx="5"/>
  <text x="269" y="20" class="t" text-anchor="middle">store: { requestId: "r-42" }  runs for this whole chain</text>

  <rect class="b" x="8" y="44" width="60" height="26" rx="4"/>
  <text x="38" y="61" class="s" text-anchor="middle">request</text>

  <rect class="b" x="90" y="44" width="80" height="26" rx="4"/>
  <text x="130" y="61" class="s" text-anchor="middle">handler</text>

  <rect class="b" x="194" y="44" width="80" height="26" rx="4"/>
  <text x="234" y="61" class="s" text-anchor="middle">service</text>

  <rect class="b" x="298" y="44" width="80" height="26" rx="4"/>
  <text x="338" y="61" class="s" text-anchor="middle">repository</text>

  <rect class="b" x="394" y="44" width="60" height="26" rx="4"/>
  <text x="424" y="61" class="s" text-anchor="middle">logger</text>

  <line class="a" x1="70" y1="57" x2="86" y2="57" marker-end="url(#al)"/>
  <line class="a" x1="172" y1="57" x2="190" y2="57" marker-end="url(#al)"/>
  <line class="a" x1="276" y1="57" x2="294" y2="57" marker-end="url(#al)"/>
  <line class="a" x1="380" y1="57" x2="390" y2="57" marker-end="url(#al)"/>

  <text x="269" y="92" class="s" text-anchor="middle">no function signature carries the id, and every one can read it</text>
  <text x="269" y="122" class="s" text-anchor="middle">a second request runs in its own store at the same time</text>
  <text x="269" y="136" class="s" text-anchor="middle">a module-level variable would mix the two together</text>
</svg>
:::

- It survives `await`, callbacks, timers and promise chains
