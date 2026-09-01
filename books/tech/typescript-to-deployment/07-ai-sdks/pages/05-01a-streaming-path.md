## The path a token takes

- Streaming fails in production more often than it fails locally, because two things sit between your process and the browser that were not there on a laptop

:::mint
<svg viewBox="0 0 470 175" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .w { fill: #ffe8ee; stroke: #ef476e; stroke-width: 1.2; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="s1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="28" width="78" height="28" rx="4"/>
  <text x="45" y="46" class="l" text-anchor="middle">provider</text>

  <rect class="b" x="104" y="28" width="78" height="28" rx="4"/>
  <text x="143" y="46" class="l" text-anchor="middle">your Node</text>

  <rect class="w" x="202" y="28" width="78" height="28" rx="4"/>
  <text x="241" y="46" class="l" text-anchor="middle">Nginx</text>

  <rect class="w" x="300" y="28" width="78" height="28" rx="4"/>
  <text x="339" y="46" class="l" text-anchor="middle">ALB / CDN</text>

  <rect class="b" x="398" y="28" width="66" height="28" rx="4"/>
  <text x="431" y="46" class="l" text-anchor="middle">browser</text>

  <line class="a" x1="84" y1="42" x2="100" y2="42" marker-end="url(#s1)"/>
  <line class="a" x1="182" y1="42" x2="198" y2="42" marker-end="url(#s1)"/>
  <line class="a" x1="280" y1="42" x2="296" y2="42" marker-end="url(#s1)"/>
  <line class="a" x1="378" y1="42" x2="394" y2="42" marker-end="url(#s1)"/>

  <text x="241" y="78" class="s" text-anchor="middle">buffers the whole body</text>
  <text x="241" y="89" class="s" text-anchor="middle">X-Accel-Buffering: no</text>

  <text x="339" y="78" class="s" text-anchor="middle">idle timeout kills it</text>
  <text x="339" y="89" class="s" text-anchor="middle">send a heartbeat</text>

  <text x="235" y="124" class="s" text-anchor="middle">the two pink boxes are why streaming works locally and not in production</text>
  <text x="235" y="140" class="s" text-anchor="middle">both are silent: no error, just a response that arrives all at once, or not at all</text>
  <text x="235" y="156" class="s" text-anchor="middle">Cache-Control: no-transform stops a CDN rewriting the frames</text>
</svg>
:::
