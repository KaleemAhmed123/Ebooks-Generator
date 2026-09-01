## The retrieval funnel

- Every stage after the first is more accurate and more expensive per document, so each one gets fewer documents
- **Cheap and wide, then expensive and narrow.** That ordering is the whole design

:::mint
<svg viewBox="0 0 470 200" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .n { font: bold 9px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="f1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="55" y="10" width="360" height="24" rx="4"/>
  <text x="235" y="26" class="l" text-anchor="middle">the whole corpus, filtered by tenant and permissions</text>
  <text x="425" y="26" class="n">2M</text>

  <rect class="b" x="105" y="52" width="260" height="24" rx="4"/>
  <text x="235" y="68" class="l" text-anchor="middle">vector search + keyword search</text>
  <text x="425" y="68" class="n">80</text>

  <rect class="b" x="140" y="94" width="190" height="24" rx="4"/>
  <text x="235" y="110" class="l" text-anchor="middle">fused by reciprocal rank</text>
  <text x="425" y="110" class="n">40</text>

  <rect class="b" x="170" y="136" width="130" height="24" rx="4"/>
  <text x="235" y="152" class="l" text-anchor="middle">reranked</text>
  <text x="425" y="152" class="n">5</text>

  <line class="a" x1="235" y1="36" x2="235" y2="48" marker-end="url(#f1)"/>
  <line class="a" x1="235" y1="78" x2="235" y2="90" marker-end="url(#f1)"/>
  <line class="a" x1="235" y1="120" x2="235" y2="132" marker-end="url(#f1)"/>

  <text x="235" y="182" class="s" text-anchor="middle">a chunk dropped at any stage cannot be recovered by a later one</text>
  <text x="235" y="194" class="s" text-anchor="middle">which is why recall matters most at the widest stage</text>
</svg>
:::

- **Permission filtering happens first, not last.** Filtering after ranking returns fewer results than asked for, and sometimes none
