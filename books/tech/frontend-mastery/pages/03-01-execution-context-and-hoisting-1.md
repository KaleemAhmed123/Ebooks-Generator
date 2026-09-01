# Module 3: JavaScript Under The Hood

## Execution Context

To master JavaScript, you must understand how the JavaScript engine reads and executes your code. It doesn't just run code line-by-line; it runs it in a specific environment called an **Execution Context**.

Whenever you run JavaScript, an **Global Execution Context** is created. This context has two phases:
1. **Creation Phase (Memory Allocation):** The engine scans the code, sets up memory space for variables and functions, and creates the `window` object (in browsers) and the `this` keyword.
2. **Execution Phase:** The engine runs the code line-by-line, assigning values to variables and executing function calls.

Every time you invoke a function, a **brand new Local Execution Context** is created and pushed onto the **Call Stack**.

:::mint
<svg viewBox="0 0 470 176" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">EVERY EXECUTION CONTEXT RUNS IN TWO PASSES</text>

  <rect class="bx" x="6" y="22" width="286" height="140" rx="4"/>

  <rect class="soft" x="18" y="34" width="128" height="116" rx="4"/>
  <text x="82" y="48" class="lbl" text-anchor="middle">1. Creation</text>
  <text x="26" y="66" class="sm">scope set up</text>
  <text x="26" y="80" class="sm">function decls</text>
  <text x="26" y="90" class="sm">  fully in memory</text>
  <text x="26" y="106" class="sm">var  = undefined</text>
  <text x="26" y="120" class="hot">let, const</text>
  <text x="26" y="130" class="hot">  in the TDZ</text>
  <text x="26" y="144" class="sm">this is bound</text>

<rect class="soft" x="156" y="34" width="126" height="116" rx="4"/>
  <text x="219" y="48" class="lbl" text-anchor="middle">2. Execution</text>
  <text x="164" y="66" class="sm">runs line by line</text>
  <text x="164" y="80" class="sm">assigns values</text>
  <text x="164" y="94" class="sm">calls functions</text>
  <text x="164" y="112" class="sm">each call pushes</text>
  <text x="164" y="122" class="sm">a new context</text>

  <line class="ar" x1="148" y1="92" x2="154" y2="92" marker-end="url(#a)"/>

  <text x="308" y="34" class="sm">CALL STACK</text>
  <rect class="bx" x="308" y="42" width="156" height="26" rx="3"/>
  <text x="386" y="59" class="lbl" text-anchor="middle">second()</text>
  <rect class="bx" x="308" y="74" width="156" height="26" rx="3"/>
  <text x="386" y="91" class="lbl" text-anchor="middle">first()</text>
  <rect class="bx" x="308" y="106" width="156" height="26" rx="3"/>
  <text x="386" y="123" class="lbl" text-anchor="middle">Global</text>
  <text x="386" y="148" class="tiny" text-anchor="middle">pops from the top, one thread</text>

  <text x="6" y="174" class="hot">hoisting is not code moving up. it is pass 1 finishing before pass 2 starts.</text>
</svg>
:::
