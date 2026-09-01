## The Stacking Context (z-index)

Every frontend developer has experienced this nightmare: You build a dropdown menu, give it `z-index: 999999`, and it still renders *behind* a simple image on the page. You add more 9s, and nothing happens.

Why? Because `z-index` does not operate on a single global Z-axis. It operates within **Stacking Contexts**.

### What is a Stacking Context?

Think of a Stacking Context as a self-contained box in the Z-axis. 
Elements within a Stacking Context are layered according to their `z-index` values *relative to each other*. However, those elements can never, ever break out of their parent's Stacking Context to overlap an element in a higher Stacking Context.

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

  <text x="6" y="12" class="sm">WHY z-index: 999999 STILL LOSES</text>

  <rect class="bx" x="6" y="22" width="458" height="138" rx="4"/>
  <text x="14" y="36" class="lbl">Root stacking context</text>

  <rect class="bx" x="20" y="46" width="180" height="34" rx="4"/>
  <text x="110" y="61" class="lbl" text-anchor="middle">Main content</text>
  <text x="110" y="73" class="sm"  text-anchor="middle">z-index: 5, creates a context</text>

  <rect class="soft" x="34" y="90" width="152" height="34" rx="4"/>
  <text x="110" y="105" class="lbl" text-anchor="middle">Dropdown</text>
  <text x="110" y="117" class="hot" text-anchor="middle">z-index: 999999</text>

  <rect class="bx" x="256" y="46" width="180" height="34" rx="4"/>
  <text x="346" y="61" class="lbl" text-anchor="middle">Header</text>
  <text x="346" y="73" class="sm"  text-anchor="middle">z-index: 10, creates a context</text>

  <line class="ar" x1="110" y1="80" x2="110" y2="86" marker-end="url(#a)"/>

  <path class="hotln" d="M190,107 L228,107 L228,63 L252,63" marker-end="url(#r)"/>
  <text x="228" y="150" class="hot" text-anchor="middle">the dropdown is compared as part of Main (5), never as 999999</text>
  <text x="228" y="160" class="sm"  text-anchor="middle">5 loses to 10, so the header paints on top</text>
</svg>
:::
In the above diagram, the Dropdown has a massive `z-index` of 999999. But because it is trapped inside the "Main Content Context" (which has a `z-index` of 5), it will always render *behind* the Logo in the "Header Context" (which has a `z-index` of 10). 

999999 is local to its parent. 10 beats 5 at the root level.
