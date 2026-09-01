## Where a request actually goes

:::mint
<svg viewBox="0 0 470 176" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 10px Georgia, serif; fill: #1a1a1a; }
    .s { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .p { fill: #ef476e; font: bold 8px Consolas, monospace; }
  </style>
  <defs>
    <marker id="ar" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="18" width="72" height="28" rx="4"/>
  <text x="42" y="36" class="l" text-anchor="middle">browser</text>

  <rect class="b" x="112" y="18" width="78" height="28" rx="4"/>
  <text x="151" y="36" class="l" text-anchor="middle">proxy.ts</text>
  <text x="151" y="58" class="s" text-anchor="middle">node runtime</text>
  <text x="151" y="70" class="s" text-anchor="middle">every request</text>

  <rect class="b" x="228" y="4" width="104" height="26" rx="4"/>
  <text x="280" y="21" class="l" text-anchor="middle">route.ts</text>

  <rect class="b" x="228" y="42" width="104" height="26" rx="4"/>
  <text x="280" y="59" class="l" text-anchor="middle">page.tsx</text>

  <rect class="b" x="228" y="80" width="104" height="26" rx="4"/>
  <text x="280" y="97" class="l" text-anchor="middle">server action</text>

  <rect class="b" x="370" y="42" width="92" height="28" rx="4"/>
  <text x="416" y="60" class="l" text-anchor="middle">database</text>

  <line class="a" x1="80" y1="32" x2="108" y2="32" marker-end="url(#ar)"/>
  <line class="a" x1="192" y1="30" x2="224" y2="18" marker-end="url(#ar)"/>
  <line class="a" x1="192" y1="34" x2="224" y2="55" marker-end="url(#ar)"/>
  <line class="a" x1="192" y1="38" x2="224" y2="92" marker-end="url(#ar)"/>
  <line class="a" x1="334" y1="18" x2="368" y2="48" marker-end="url(#ar)"/>
  <line class="a" x1="334" y1="56" x2="366" y2="56" marker-end="url(#ar)"/>
  <line class="a" x1="334" y1="94" x2="368" y2="66" marker-end="url(#ar)"/>

  <text x="280" y="128" class="p" text-anchor="middle">all three run on the server</text>
  <text x="280" y="142" class="s" text-anchor="middle">none of this code reaches the browser</text>

  <line class="a" x1="42" y1="48" x2="42" y2="160"/>
  <line class="a" x1="42" y1="160" x2="416" y2="160"/>
  <line class="a" x1="416" y1="160" x2="416" y2="74" marker-end="url(#ar)"/>
  <text x="229" y="172" class="s" text-anchor="middle">never a direct browser to database call</text>
</svg>
:::

- `proxy.ts` sees every request first, before routing
- A route handler answers with data. A page answers with HTML
- A Server Action is a POST that Next.js routes for you
