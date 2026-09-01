## Tailwind Under the Hood

Tailwind is not a CSS framework in the way Bootstrap is. Bootstrap ships a stylesheet. Tailwind ships an **engine** that reads your source files, finds the class names you actually wrote, and generates only the CSS those class names need.

Understanding how that scan works explains most of the rules people learn the hard way.

:::mint
<svg viewBox="0 0 470 126" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">WHAT RUNS WHEN YOU HIT SAVE</text>

  <rect class="bx" x="6" y="26" width="86" height="30" rx="4"/>
  <text x="49" y="45" class="lbl" text-anchor="middle">your source</text>

  <rect class="bx" x="118" y="26" width="86" height="30" rx="4"/>
  <text x="161" y="41" class="lbl" text-anchor="middle">scan</text>
  <text x="161" y="52" class="tiny" text-anchor="middle">regex, no JS run</text>

  <rect class="bx" x="230" y="26" width="86" height="30" rx="4"/>
  <text x="273" y="41" class="lbl" text-anchor="middle">match</text>
  <text x="273" y="52" class="tiny" text-anchor="middle">against @theme</text>

  <rect class="bx" x="342" y="26" width="122" height="30" rx="4"/>
  <text x="403" y="45" class="lbl" text-anchor="middle">emit only those rules</text>

  <line class="ar" x1="94"  y1="41" x2="114" y2="41" marker-end="url(#a)"/>
  <line class="ar" x1="206" y1="41" x2="226" y2="41" marker-end="url(#a)"/>
  <line class="ar" x1="318" y1="41" x2="338" y2="41" marker-end="url(#a)"/>

  <text x="6" y="80" class="hot">the scanner never executes your code, so `bg-${color}-500` is invisible to it</text>
  <text x="6" y="96" class="sm">this is also why the output is tiny: nothing you did not literally type gets emitted</text>
  <text x="6" y="116" class="tiny">v4 does this in Rust, and finds the files itself instead of reading a content array</text>
</svg>
:::

### Three generations of the engine

**Ahead of time (v1 and v2).** Tailwind generated every possible combination of utility, breakpoint, and state at startup. Development stylesheets ran past 10MB. Shipping to production meant running PurgeCSS as a separate step to delete what you had not used.

**Just in time (v3).** The engine watched your files and generated each rule the first time it saw the class name. Development and production output became identical, and the file shrank to a few kilobytes. Tailwind was a PostCSS plugin, and configuration lived in `tailwind.config.js`.

**Oxide (v4).** The scanner and the parser were rewritten in Rust. Full builds are several times faster and incremental rebuilds, the ones that run on every keystroke, land in microseconds. More importantly for how you write code, configuration moved out of JavaScript and into CSS.
