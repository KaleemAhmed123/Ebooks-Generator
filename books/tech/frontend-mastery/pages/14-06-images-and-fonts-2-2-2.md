## Images and Fonts, Where LCP Is Won - continued

:::mint
<svg viewBox="0 0 470 160" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">THE SAME PAGE, TWO WATERFALLS</text>

  <text x="6" y="30" class="sm">BEFORE</text>
  <rect class="bar" x="66" y="22" width="42" height="12"/>
  <text x="112" y="32" class="tiny">html</text>
  <rect class="bar" x="66" y="38" width="96" height="12"/>
  <text x="166" y="48" class="tiny">css</text>
  <rect class="bar" x="66" y="54" width="180" height="12"/>
  <text x="250" y="64" class="tiny">app.js</text>
  <rect class="bar" x="140" y="70" width="96" height="12"/>
  <text x="240" y="80" class="tiny">font (not preloaded)</text>
  <rect class="barh" x="252" y="86" width="150" height="12"/>
  <text x="406" y="96" class="hot">hero, lazy</text>
  <line class="hotln" x1="402" y1="18" x2="402" y2="102"/>
  <text x="402" y="114" class="hot" text-anchor="middle">LCP</text>

  <line x1="6" y1="120" x2="464" y2="120" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <text x="6" y="140" class="sm">AFTER</text>
  <rect class="bar" x="66" y="132" width="42" height="10"/>
  <rect class="barh" x="66" y="144" width="86" height="10"/>
  <text x="156" y="152" class="hot">hero, preloaded, avif, fetchpriority=high</text>
  <line class="hotln" x1="152" y1="128" x2="152" y2="156"/>
  <text x="152" y="126" class="hot" text-anchor="middle">LCP</text>
</svg>
:::

1. Find out **what the LCP element is**. Do not assume. PageSpeed Insights and
   the `web-vitals` library both report it.
2. If it is an image: is it lazy-loaded? Is it preloaded? Is it AVIF? Is `sizes`
   correct?
3. If it is text: is the font preloaded, subset, and metric-matched?
4. Is anything before it in the network waterfall that does not need to be?
