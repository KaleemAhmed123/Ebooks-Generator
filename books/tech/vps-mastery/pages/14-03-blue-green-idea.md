## Blue-green, the shape

:::mint
<svg viewBox="0 0 470 275" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .g { stroke: #1a1a1a; stroke-width: 1.1; fill: none; stroke-dasharray: 3 3; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="d1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="180" y="8" width="110" height="24" rx="4"/>
  <text x="235" y="24" class="l" text-anchor="middle">users</text>

  <rect class="c" x="164" y="52" width="142" height="40" rx="4"/>
  <text x="235" y="69" class="l" text-anchor="middle">Nginx</text>
  <text x="235" y="83" class="s" text-anchor="middle">reads active-color.conf</text>

  <line class="a" x1="235" y1="32" x2="235" y2="48" marker-end="url(#d1)"/>

  <text x="16" y="118" class="t">BLUE &nbsp;·&nbsp; live &nbsp;·&nbsp; 6b2d40e</text>
  <rect class="b" x="16" y="124" width="180" height="70" rx="4"/>
  <text x="106" y="142" class="s" text-anchor="middle">api-gateway-blue:8080</text>
  <text x="106" y="158" class="s" text-anchor="middle">orders-blue  catalog-blue</text>
  <text x="106" y="174" class="s" text-anchor="middle">shop-ui-blue  +11 more</text>

  <text x="274" y="118" class="t">GREEN &nbsp;·&nbsp; warming &nbsp;·&nbsp; 7f3a91c</text>
  <rect class="b" x="274" y="124" width="180" height="70" rx="4"/>
  <text x="364" y="142" class="s" text-anchor="middle">api-gateway-green:8080</text>
  <text x="364" y="158" class="s" text-anchor="middle">orders-green  catalog-green</text>
  <text x="364" y="174" class="s" text-anchor="middle">shop-ui-green  +11 more</text>

  <line class="a" x1="200" y1="92" x2="106" y2="120" marker-end="url(#d1)"/>
  <text x="140" y="110" class="s">all traffic</text>
  <line class="g" x1="270" y1="92" x2="364" y2="120" marker-end="url(#d1)"/>
  <text x="322" y="110" class="s">health only</text>

  <rect class="b" x="140" y="212" width="190" height="30" rx="4"/>
  <text x="235" y="231" class="s" text-anchor="middle">postgres · redis · rabbitmq · minio</text>

  <line class="a" x1="106" y1="194" x2="180" y2="208" marker-end="url(#d1)"/>
  <line class="a" x1="364" y1="194" x2="290" y2="208" marker-end="url(#d1)"/>

  <text x="235" y="262" class="s" text-anchor="middle">the data layer never restarts and is shared by both colors</text>
</svg>
:::

- Blue serves. Green is pulled, started, and health-checked. One config change points Nginx at green. Blue is stopped once it is quiet
