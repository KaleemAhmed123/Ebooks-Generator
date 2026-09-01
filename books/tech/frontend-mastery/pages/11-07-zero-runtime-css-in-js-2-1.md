### The zero-runtime idea

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">WHEN DO THE STYLES GET COMPUTED</text>

  <text x="6" y="32" class="sm">RUNTIME</text>
  <rect class="bx" x="70" y="22" width="76" height="24" rx="3"/>
  <text x="108" y="38" class="tiny" text-anchor="middle">your JSX</text>
  <rect class="bx" x="164" y="22" width="86" height="24" rx="3"/>
  <text x="207" y="38" class="tiny" text-anchor="middle">bundle + engine</text>
  <rect class="hotbx" x="268" y="22" width="110" height="24" rx="3"/>
  <text x="323" y="38" class="hot" text-anchor="middle">serialize + inject</text>
  <rect class="bx" x="396" y="22" width="68" height="24" rx="3"/>
  <text x="430" y="38" class="tiny" text-anchor="middle">painted</text>
  <line class="ar" x1="148" y1="34" x2="160" y2="34" marker-end="url(#a)"/>
  <line class="ar" x1="252" y1="34" x2="264" y2="34" marker-end="url(#a)"/>
  <line class="ar" x1="380" y1="34" x2="392" y2="34" marker-end="url(#a)"/>
  <text x="323" y="58" class="hot" text-anchor="middle">on every render, in every browser</text>
  <text x="323" y="70" class="hot" text-anchor="middle">and it cannot run in a Server Component</text>

  <line x1="6" y1="82" x2="464" y2="82" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <text x="6" y="104" class="sm">BUILD TIME</text>
  <rect class="bx" x="70" y="94" width="76" height="24" rx="3"/>
  <text x="108" y="110" class="tiny" text-anchor="middle">your JSX</text>
  <rect class="soft" x="164" y="94" width="86" height="24" rx="3"/>
  <text x="207" y="110" class="tiny" text-anchor="middle">extract, once</text>
  <rect class="bx" x="268" y="94" width="110" height="24" rx="3"/>
  <text x="323" y="110" class="tiny" text-anchor="middle">static .css, cached</text>
  <rect class="bx" x="396" y="94" width="68" height="24" rx="3"/>
  <text x="430" y="110" class="tiny" text-anchor="middle">painted</text>
  <line class="ar" x1="148" y1="106" x2="160" y2="106" marker-end="url(#a)"/>
  <line class="ar" x1="252" y1="106" x2="264" y2="106" marker-end="url(#a)"/>
  <line class="ar" x1="380" y1="106" x2="392" y2="106" marker-end="url(#a)"/>
  <text x="6" y="140" class="sm">Tailwind, CSS Modules, vanilla-extract, Panda and StyleX all sit on this row</text>
</svg>
:::

Write styles in TypeScript. A **build step** extracts them to a static `.css`
file. Nothing is left at runtime except class names.

You keep the two things people wanted from CSS-in-JS: colocation, and type
safety on your tokens. You lose the cost.
