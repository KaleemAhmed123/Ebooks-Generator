# Module 1: How The Browser Works

## Browser Architecture: The Rendering Pipeline

React, Vue, Solid. Every modern frontend framework is an abstraction over the browser. To master the frontend, you must first master the engine that runs it. The browser is not a black box; it is a complex, deterministic state machine that takes HTML, CSS, and JavaScript and converts them into pixels on a screen.

If you don’t understand the critical rendering path, your React optimizations are just guessing.

### The Critical Rendering Path

When a user navigates to a URL, the browser executes a strict sequence of steps to display the page. This is the **Critical Rendering Path (CRP)**.

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
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">THE CRITICAL RENDERING PATH</text>

  <rect class="bx" x="6"   y="24" width="78" height="26" rx="4"/>
  <text x="45" y="41" class="lbl" text-anchor="middle">HTML bytes</text>
  <rect class="bx" x="6"   y="62" width="78" height="26" rx="4"/>
  <text x="45" y="79" class="lbl" text-anchor="middle">CSS bytes</text>

  <rect class="bx" x="116" y="24" width="78" height="26" rx="4"/>
  <text x="155" y="41" class="lbl" text-anchor="middle">DOM tree</text>
  <rect class="bx" x="116" y="62" width="78" height="26" rx="4"/>
  <text x="155" y="79" class="lbl" text-anchor="middle">CSSOM tree</text>

  <rect class="bx" x="226" y="43" width="78" height="26" rx="4"/>
  <text x="265" y="60" class="lbl" text-anchor="middle">Render tree</text>

  <rect class="bx" x="336" y="12" width="80" height="24" rx="4"/>
  <text x="376" y="28" class="lbl" text-anchor="middle">Layout</text>
  <rect class="bx" x="336" y="44" width="80" height="24" rx="4"/>
  <text x="376" y="60" class="lbl" text-anchor="middle">Paint</text>
  <rect class="bx" x="336" y="76" width="80" height="24" rx="4"/>
  <text x="376" y="92" class="lbl" text-anchor="middle">Composite</text>

  <line class="ar" x1="86"  y1="37" x2="112" y2="37" marker-end="url(#a)"/>
  <line class="ar" x1="86"  y1="75" x2="112" y2="75" marker-end="url(#a)"/>
  <path class="ar" d="M196,37 L212,37 L212,56 L222,56" marker-end="url(#a)"/>
  <path class="ar" d="M196,75 L212,75 L212,56 L222,56" marker-end="url(#a)"/>
  <path class="ar" d="M306,56 L320,56 L320,24 L332,24" marker-end="url(#a)"/>
  <line class="ar" x1="376" y1="36" x2="376" y2="42" marker-end="url(#a)"/>
  <line class="ar" x1="376" y1="68" x2="376" y2="74" marker-end="url(#a)"/>

<text x="99"  y="33" class="tiny" text-anchor="middle">parse</text>
  <text x="99"  y="71" class="tiny" text-anchor="middle">parse</text>
  <text x="265" y="80" class="tiny" text-anchor="middle">visible nodes only</text>

  <line x1="6" y1="112" x2="464" y2="112" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="6"   y="127" class="hot">changing width or top</text>
  <text x="6"   y="139" class="hot">re-runs all three</text>
  <text x="200" y="127" class="sm">changing color</text>
  <text x="200" y="139" class="sm">re-runs paint and composite</text>
  <text x="352" y="127" class="sm">transform and opacity</text>
  <text x="352" y="139" class="sm">composite only</text>
</svg>
:::
