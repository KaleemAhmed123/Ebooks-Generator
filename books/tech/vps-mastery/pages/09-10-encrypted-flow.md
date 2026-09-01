## The complete request path

:::mint
<svg viewBox="0 0 470 265" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="d1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="8" y="16" width="80" height="26" rx="4"/>
  <text x="48" y="33" class="l" text-anchor="middle">browser</text>

  <rect class="b" x="150" y="16" width="88" height="26" rx="4"/>
  <text x="194" y="33" class="l" text-anchor="middle">resolver</text>

  <line class="a" x1="88" y1="24" x2="146" y2="24" marker-end="url(#d1)"/>
  <text x="117" y="18" class="s" text-anchor="middle">1</text>
  <line class="a" x1="146" y1="35" x2="90" y2="35" marker-end="url(#d1)"/>
  <text x="117" y="48" class="s" text-anchor="middle">2 · 203.0.113.10</text>

  <text x="8" y="76" class="t">THE VPS</text>
  <rect class="a" x="8" y="82" width="454" height="120" rx="5" fill="none" stroke-dasharray="3 3"/>

  <rect class="c" x="24" y="98" width="110" height="46" rx="4"/>
  <text x="79" y="116" class="l" text-anchor="middle">Nginx :443</text>
  <text x="79" y="131" class="s" text-anchor="middle">terminates TLS</text>

  <rect class="b" x="24" y="156" width="110" height="28" rx="4"/>
  <text x="79" y="174" class="s" text-anchor="middle">letsencrypt/live</text>

  <line class="a" x1="79" y1="152" x2="79" y2="152"/>
  <line class="a" x1="79" y1="144" x2="79" y2="152" stroke-dasharray="2 2"/>

  <rect class="b" x="188" y="94" width="120" height="26" rx="4"/>
  <text x="248" y="111" class="l" text-anchor="middle">api-gateway:8080</text>

  <rect class="b" x="188" y="128" width="120" height="26" rx="4"/>
  <text x="248" y="145" class="l" text-anchor="middle">shop-ui:3000</text>

  <rect class="b" x="344" y="94" width="102" height="26" rx="4"/>
  <text x="395" y="111" class="l" text-anchor="middle">postgres:5432</text>

  <rect class="b" x="344" y="128" width="102" height="26" rx="4"/>
  <text x="395" y="145" class="l" text-anchor="middle">redis:6379</text>

  <line class="a" x1="134" y1="112" x2="184" y2="107" marker-end="url(#d1)"/>
  <line class="a" x1="134" y1="126" x2="184" y2="141" marker-end="url(#d1)"/>
  <line class="a" x1="308" y1="107" x2="340" y2="107" marker-end="url(#d1)"/>
  <line class="a" x1="308" y1="112" x2="340" y2="141" marker-end="url(#d1)"/>

  <line class="a" x1="48" y1="42" x2="48" y2="94" marker-end="url(#d1)"/>
  <text x="8" y="70" class="s">3 · https</text>

  <text x="235" y="222" class="s" text-anchor="middle">encrypted from the browser to Nginx only</text>
  <text x="235" y="236" class="s" text-anchor="middle">everything inside the dashed box is plain HTTP on a private network</text>
  <text x="235" y="250" class="s" text-anchor="middle">that traffic never leaves the machine, so re-encrypting it buys nothing here</text>
</svg>
:::
