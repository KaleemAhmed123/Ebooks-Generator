# Module 4 - Caching

## Four caches, not one

- Caching means keeping an answer so the work does not have to be repeated. That part is simple
- What makes Next.js confusing is that it does this in four separate places, each with its own rules and its own way of being cleared
- They sit in front of one another, so a request stops at the first layer holding an answer
- That layering is why a fix often does nothing. Clearing the data does not help if the rendered HTML in front of it is still being served
- Knowing which four exist, and in what order, is most of what it takes to debug a page showing stale content

:::mint
<svg viewBox="0 0 470 190" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="a2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="8" y="12" class="t">BROWSER</text>
  <rect class="b" x="8" y="18" width="120" height="30" rx="4"/>
  <text x="68" y="32" class="l" text-anchor="middle">Router Cache</text>
  <text x="68" y="43" class="s" text-anchor="middle">in memory, per tab</text>

  <text x="176" y="12" class="t">SERVER</text>
  <rect class="b" x="176" y="18" width="120" height="30" rx="4"/>
  <text x="236" y="32" class="l" text-anchor="middle">Full Route Cache</text>
  <text x="236" y="43" class="s" text-anchor="middle">rendered HTML, build</text>

  <rect class="b" x="176" y="62" width="120" height="30" rx="4"/>
  <text x="236" y="76" class="l" text-anchor="middle">Data Cache</text>
  <text x="236" y="87" class="s" text-anchor="middle">survives deploys</text>

  <rect class="b" x="176" y="106" width="120" height="30" rx="4"/>
  <text x="236" y="120" class="l" text-anchor="middle">Request Memo</text>
  <text x="236" y="131" class="s" text-anchor="middle">one render only</text>

  <rect class="b" x="344" y="62" width="118" height="30" rx="4"/>
  <text x="403" y="81" class="l" text-anchor="middle">database / API</text>

  <line class="a" x1="130" y1="33" x2="172" y2="33" marker-end="url(#a2)"/>
  <line class="a" x1="236" y1="50" x2="236" y2="58" marker-end="url(#a2)"/>
  <line class="a" x1="236" y1="94" x2="236" y2="102" marker-end="url(#a2)"/>
  <line class="a" x1="298" y1="120" x2="403" y2="120"/>
  <line class="a" x1="403" y1="120" x2="403" y2="96" marker-end="url(#a2)"/>

  <text x="235" y="160" class="s" text-anchor="middle">a request stops at the first layer that has an answer</text>
  <text x="235" y="176" class="s" text-anchor="middle">a stale page usually means you cleared the wrong one</text>
</svg>
:::

- Clearing the Data Cache does nothing if the Full Route Cache still holds the HTML
