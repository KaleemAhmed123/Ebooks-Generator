### The honest trade

:::mint
<svg viewBox="0 0 470 168" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
    .bar { fill: #d8ece4; stroke: #8fbfae; stroke-width: 0.8; }
    .barh{ fill: #fbdde5; stroke: #ef476e; stroke-width: 0.8; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">USER IN SYDNEY, DATABASE IN VIRGINIA</text>

  <text x="6" y="32" class="sm">GOOD FIT</text>
  <circle cx="70" cy="56" r="14" class="bx"/>
  <text x="70" y="59" class="tiny" text-anchor="middle">user</text>
  <rect class="bx" x="112" y="42" width="96" height="28" rx="4"/>
  <text x="160" y="60" class="lbl" text-anchor="middle">edge, Sydney</text>
  <line class="ar" x1="86" y1="56" x2="108" y2="56" marker-end="url(#a)"/>
  <line class="ar" x1="108" y1="64" x2="88" y2="64" marker-end="url(#a)"/>
  <text x="97" y="80" class="tiny" text-anchor="middle">5ms</text>
  <text x="224" y="52" class="sm">reads the cookie, redirects</text>
  <text x="224" y="64" class="tiny">nothing else is needed, so nothing else is fetched</text>

  <line x1="6" y1="90" x2="464" y2="90" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <text x="6" y="108" class="sm">BAD FIT</text>
  <circle cx="70" cy="132" r="14" class="bx"/>
  <text x="70" y="135" class="tiny" text-anchor="middle">user</text>
  <rect class="bx" x="112" y="118" width="96" height="28" rx="4"/>
  <text x="160" y="136" class="lbl" text-anchor="middle">edge, Sydney</text>
  <rect class="hotbx" x="300" y="118" width="120" height="28" rx="4"/>
  <text x="360" y="136" class="lbl" text-anchor="middle">Postgres, Virginia</text>

  <line class="ar" x1="86" y1="132" x2="108" y2="132" marker-end="url(#a)"/>
  <line class="hotln" x1="212" y1="132" x2="296" y2="132" marker-end="url(#r)"/>
  <text x="254" y="126" class="hot" text-anchor="middle">160ms each way</text>
  <text x="254" y="158" class="hot" text-anchor="middle">the round trip happened anyway, and you added a hop</text>
</svg>
:::

The edge is not universally faster. Your code runs near the user; **your
database usually does not**.

A request that runs at the edge in Sydney and then queries Postgres in Virginia
has made the round trip anyway, and added a hop. In that shape a regional
function next to the database beats the edge.

The rule:

| Needs | Run it |
|---|---|
| Only the request: headers, cookies, geo | at the edge |
| A read from a globally replicated store | at the edge |
| Your primary database | in the region the database is in |
| Heavy compute or a native dependency | in a normal Node server |

Measure before assuming. The most common self-inflicted regression here is
moving a database-backed route to the edge and making it slower for everyone.
