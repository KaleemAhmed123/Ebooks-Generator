## Speculation Rules: Loading the Page Before the Click

Every optimization in this module makes a page load faster. Speculation Rules
make it load **before the user asks for it**, so the perceived time is zero.

The idea is old. `<link rel="prefetch">` has existed for years and only fetched
the HTML. The Speculation Rules API goes further: the browser can fetch the
page, **run its JavaScript, and render it into a hidden tab** ahead of the click.
When the click comes, it swaps the prerendered page in. Navigation is instant
because the work already finished.

### The numbers

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

  <text x="6" y="12" class="sm">WHAT THE USER WAITS FOR</text>

  <text x="6" y="30" class="sm">NORMAL</text>
  <line class="ar" x1="64" y1="26" x2="64" y2="46"/>
  <text x="64" y="24" class="tiny" text-anchor="middle">click</text>
  <rect class="bar" x="64" y="30" width="70" height="14"/>
  <text x="99" y="40" class="tiny" text-anchor="middle">request</text>
  <rect class="bar" x="134" y="30" width="86" height="14"/>
  <text x="177" y="40" class="tiny" text-anchor="middle">parse + render</text>
  <rect class="bar" x="220" y="30" width="80" height="14"/>
  <text x="260" y="40" class="tiny" text-anchor="middle">hydrate</text>
  <line class="ar" x1="300" y1="26" x2="300" y2="46"/>
  <text x="330" y="41" class="hot">usable</text>

  <line x1="6" y1="58" x2="464" y2="58" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <text x="6" y="76" class="sm">PREFETCH</text>
  <rect class="soft" x="64" y="66" width="70" height="14"/>
  <text x="99" y="76" class="tiny" text-anchor="middle">request</text>
  <line class="ar" x1="134" y1="62" x2="134" y2="82"/>
  <text x="134" y="94" class="tiny" text-anchor="middle">click</text>
  <rect class="bar" x="134" y="66" width="86" height="14"/>
  <text x="177" y="76" class="tiny" text-anchor="middle">parse + render</text>
  <rect class="bar" x="220" y="66" width="80" height="14"/>
  <text x="260" y="76" class="tiny" text-anchor="middle">hydrate</text>
  <text x="330" y="77" class="sm">the network hop is gone</text>

  <text x="6" y="120" class="sm">PRERENDER</text>
  <rect class="soft" x="64" y="110" width="236" height="14"/>
  <text x="182" y="120" class="tiny" text-anchor="middle">request, parse, render, hydrate, all before the click</text>
  <line class="hotln" x1="300" y1="106" x2="300" y2="126"/>
  <text x="300" y="138" class="hot" text-anchor="middle">click</text>
  <text x="330" y="121" class="hot">already usable</text>

  <line x1="6" y1="148" x2="464" y2="148" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="6" y="164" class="tiny">the work did not get faster. it moved to before the user asked. the cost is doing it for visits that never happen.
</svg>
:::

This is unusually well measured for a web performance feature.

- Sites using **moderate** eagerness see roughly **28% of navigations** already
  prefetched or prerendered by the time the user clicks.
- **Ray-Ban** cut mobile LCP from **4.69 seconds to 2.66 seconds**, a 43%
  reduction.
- **Monrif** improved desktop LCP by 17.9% and engagement by 8.9%.

Chromium only. Other browsers ignore the rules entirely, so there is no
fallback to write and no cost to being wrong.
