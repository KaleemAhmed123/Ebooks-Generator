## The monitoring stack

:::mint
<svg viewBox="0 0 470 250" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="8" y="20" class="t">SOURCES</text>
  <rect class="b" x="8" y="26" width="112" height="24" rx="4"/>
  <text x="64" y="42" class="s" text-anchor="middle">app /metrics</text>
  <rect class="b" x="8" y="58" width="112" height="24" rx="4"/>
  <text x="64" y="74" class="s" text-anchor="middle">node-exporter</text>
  <rect class="b" x="8" y="90" width="112" height="24" rx="4"/>
  <text x="64" y="106" class="s" text-anchor="middle">cadvisor</text>
  <rect class="b" x="8" y="130" width="112" height="24" rx="4"/>
  <text x="64" y="146" class="s" text-anchor="middle">container stdout</text>

  <rect class="c" x="168" y="50" width="106" height="34" rx="4"/>
  <text x="221" y="64" class="l" text-anchor="middle">Prometheus</text>
  <text x="221" y="77" class="s" text-anchor="middle">scrapes, stores</text>

  <rect class="c" x="168" y="126" width="106" height="34" rx="4"/>
  <text x="221" y="140" class="l" text-anchor="middle">Loki</text>
  <text x="221" y="153" class="s" text-anchor="middle">receives, indexes</text>

  <line class="a" x1="120" y1="38" x2="164" y2="58" marker-end="url(#d1)"/>
  <line class="a" x1="120" y1="70" x2="164" y2="67" marker-end="url(#d1)"/>
  <line class="a" x1="120" y1="102" x2="164" y2="76" marker-end="url(#d1)"/>
  <line class="a" x1="120" y1="142" x2="164" y2="142" marker-end="url(#d1)"/>

  <rect class="c" x="320" y="88" width="118" height="34" rx="4"/>
  <text x="379" y="102" class="l" text-anchor="middle">Grafana</text>
  <text x="379" y="115" class="s" text-anchor="middle">dashboards, alerts</text>

  <line class="a" x1="274" y1="70" x2="316" y2="96" marker-end="url(#d1)"/>
  <line class="a" x1="274" y1="142" x2="316" y2="114" marker-end="url(#d1)"/>

  <rect class="b" x="320" y="152" width="118" height="24" rx="4"/>
  <text x="379" y="168" class="s" text-anchor="middle">Discord / Slack</text>
  <line class="a" x1="379" y1="122" x2="379" y2="148" marker-end="url(#d1)"/>

  <text x="235" y="204" class="s" text-anchor="middle">Prometheus pulls. Loki is pushed to. Grafana reads both</text>
  <text x="235" y="218" class="s" text-anchor="middle">budget roughly 1 GB of RAM for the whole stack</text>
  <text x="235" y="232" class="s" text-anchor="middle">none of it is reachable from the internet except through Nginx with a password</text>
</svg>
:::
