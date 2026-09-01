## Frontend System Design - continued

:::mint
<svg viewBox="0 0 470 192" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">A DRAWING THE INTERVIEWER EXPECTS</text>

  <circle cx="30" cy="70" r="16" class="bx"/>
  <text x="30" y="73" class="sm" text-anchor="middle">user</text>

  <rect class="soft" x="70" y="28" width="118" height="88" rx="4"/>
  <text x="129" y="42" class="sm" text-anchor="middle">EDGE</text>
  <rect class="bx" x="80" y="50" width="98" height="26" rx="3"/>
  <text x="129" y="67" class="lbl" text-anchor="middle">CDN</text>
  <rect class="bx" x="80" y="84" width="98" height="26" rx="3"/>
  <text x="129" y="101" class="lbl" text-anchor="middle">proxy / rewrite</text>

<rect class="soft" x="204" y="28" width="118" height="88" rx="4"/>
  <text x="263" y="42" class="sm" text-anchor="middle">APP</text>
  <rect class="bx" x="214" y="50" width="98" height="26" rx="3"/>
  <text x="263" y="67" class="lbl" text-anchor="middle">SSR + stream</text>
  <rect class="bx" x="214" y="84" width="98" height="26" rx="3"/>
  <text x="263" y="101" class="lbl" text-anchor="middle">client bundle</text>

  <rect class="soft" x="338" y="28" width="126" height="130" rx="4"/>
  <text x="401" y="42" class="sm" text-anchor="middle">BACKEND</text>
  <rect class="bx" x="348" y="50" width="106" height="24" rx="3"/>
  <text x="401" y="66" class="lbl" text-anchor="middle">API gateway</text>
  <rect class="bx" x="348" y="82" width="106" height="24" rx="3"/>
  <text x="401" y="98" class="lbl" text-anchor="middle">cache</text>
  <rect class="bx" x="348" y="114" width="106" height="24" rx="3"/>
  <text x="401" y="130" class="lbl" text-anchor="middle">database</text>

  <line class="ar" x1="48"  y1="66" x2="76"  y2="63" marker-end="url(#a)"/>
  <line class="ar" x1="48"  y1="80" x2="76"  y2="97" marker-end="url(#a)"/>
  <line class="ar" x1="182" y1="63" x2="210" y2="63" marker-end="url(#a)"/>
  <line class="ar" x1="182" y1="97" x2="210" y2="97" marker-end="url(#a)"/>
  <path class="ar" d="M316,63 L330,63 L330,62 L344,62" marker-end="url(#a)"/>
  <path class="ar" d="M316,97 L328,97 L328,66 L344,66" marker-end="url(#a)"/>
  <line class="ar" x1="401" y1="74" x2="401" y2="78" marker-end="url(#a)"/>
  <line class="ar" x1="401" y1="106" x2="401" y2="110" marker-end="url(#a)"/>

  <text x="6" y="176" class="hot">say the trade at each arrow: what is cached, what it costs when it is wrong,</text>
  <text x="6" y="188" class="hot">and what the user sees while the slowest box is still thinking</text>
</svg>
:::
