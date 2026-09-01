### The Reconciliation Algorithm (Diffing)

When a component's state changes, React does not touch the real DOM immediately. 
Instead, it follows a strict process called **Reconciliation**:

1. **Render Phase:** React calls your component function again with the new state. It generates a brand new Virtual DOM tree representing the new UI.
2. **Diffing:** React takes this new Virtual DOM tree and compares it against the old Virtual DOM tree from the previous render. It looks for the exact differences.
3. **Commit Phase:** Once React has mapped out the absolute minimum number of changes required (e.g., "Change the text of node #4" and "Delete node #9"), it batches all of these instructions together and updates the Real DOM in one single, highly-optimized operation.

This guarantees that the browser only performs one single Layout and Paint, no matter how many state changes occurred!

:::mint
<svg viewBox="0 0 470 142" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">RENDER PHASE (interruptible)</text>
  <text x="326" y="12" class="sm">COMMIT (never interrupted)</text>
  <line x1="312" y1="4" x2="312" y2="118" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <rect class="bx" x="6" y="26" width="106" height="30" rx="4"/>
  <text x="59" y="45" class="lbl" text-anchor="middle">previous tree</text>

  <rect class="bx" x="6" y="76" width="106" height="30" rx="4"/>
  <text x="59" y="95" class="lbl" text-anchor="middle">new tree</text>

  <rect class="bx" x="160" y="50" width="112" height="34" rx="4"/>
  <text x="216" y="65" class="lbl" text-anchor="middle">diff</text>
  <text x="216" y="78" class="sm"  text-anchor="middle">O(n), keyed by type</text>

  <rect class="bx" x="336" y="50" width="118" height="34" rx="4"/>
  <text x="395" y="65" class="lbl" text-anchor="middle">real DOM</text>
  <text x="395" y="78" class="sm"  text-anchor="middle">one batched write</text>

  <path class="ar" d="M116,41 L138,41 L138,63 L156,63" marker-end="url(#a)"/>
  <path class="ar" d="M116,91 L138,91 L138,63 L156,63" marker-end="url(#a)"/>
  <line class="ar" x1="276" y1="67" x2="332" y2="67" marker-end="url(#a)"/>
  <text x="304" y="60" class="tiny" text-anchor="middle">minimal</text>
  <text x="304" y="97" class="tiny" text-anchor="middle">patch list</text>

  <text x="6" y="132" class="hot">one layout and one paint, no matter how many state changes happened</text>
</svg>
:::
