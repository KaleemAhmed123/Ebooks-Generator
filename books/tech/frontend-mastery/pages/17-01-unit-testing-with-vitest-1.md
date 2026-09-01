# Module 17: Testing

## Unit Testing with Vitest

Ask ten developers how to test a React app and you get ten answers. The **Testing Pyramid** is the shape most teams settle on, because it sorts tests by what they cost.

1. **Unit tests.** Thousands of them, milliseconds each. One function, no dependencies.
2. **Integration tests.** Hundreds. Several components working together, rendered but not in a real browser.
3. **End to end tests.** Tens. A real browser, a real server, a real click path.

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
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">COST PER TEST GOES UP, COUNT GOES DOWN</text>

  <path class="bx" d="M235,24 L292,68 L178,68 z"/>
  <text x="235" y="52" class="lbl" text-anchor="middle">e2e</text>

  <path class="bx" d="M178,70 L292,70 L330,112 L140,112 z"/>
  <text x="235" y="96" class="lbl" text-anchor="middle">integration</text>

  <path class="bx" d="M140,114 L330,114 L370,156 L100,156 z"/>
  <text x="235" y="140" class="lbl" text-anchor="middle">unit</text>

  <text x="384" y="50" class="sm">tens</text>
  <text x="384" y="62" class="tiny">minutes, real browser</text>
  <text x="384" y="94" class="sm">hundreds</text>
  <text x="384" y="106" class="tiny">seconds, jsdom</text>
  <text x="384" y="138" class="sm">thousands</text>
  <text x="384" y="150" class="tiny">milliseconds, pure functions</text>

  <text x="6" y="50" class="hot">tells you</text>
  <text x="6" y="62" class="hot">checkout broke</text>
  <text x="6" y="96" class="sm">tells you the</text>
  <text x="6" y="108" class="sm">form broke</text>
  <text x="6" y="138" class="sm">tells you which</text>
  <text x="6" y="150" class="sm">line broke</text>
</svg>
:::

The pyramid is not a rule about counts. It is a statement about feedback speed. A unit test tells you exactly which function broke, immediately. An end to end test tells you the checkout is broken, twelve minutes later, somewhere.
