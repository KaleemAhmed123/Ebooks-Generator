## Prototypes

- JavaScript objects inherit from **other objects**, not from classes
- Every object has a hidden link to another object, its **prototype**
- Ask for a property that is missing and the engine follows that link

:::mint
<svg viewBox="0 0 470 152" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .m { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #6b6b6b; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.2; fill: none; }
  </style>
  <defs>
    <marker id="p1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="p2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <rect class="b" x="14" y="104" width="112" height="30" rx="4"/>
  <text x="70" y="123" class="l" text-anchor="middle">order</text>

  <rect class="b" x="14" y="58" width="112" height="30" rx="4"/>
  <text x="70" y="72" class="l" text-anchor="middle">Order.prototype</text>
  <text x="70" y="83" class="s" text-anchor="middle">cancel()</text>

  <rect class="b" x="14" y="12" width="112" height="30" rx="4"/>
  <text x="70" y="26" class="l" text-anchor="middle">Object.prototype</text>
  <text x="70" y="37" class="s" text-anchor="middle">toString()</text>

  <line class="a" x1="70" y1="102" x2="70" y2="92" marker-end="url(#p1)"/>
  <line class="a" x1="70" y1="56" x2="70" y2="46" marker-end="url(#p1)"/>
  <text x="132" y="99" class="s">[[Prototype]]</text>
  <text x="132" y="53" class="s">[[Prototype]]</text>

  <text x="240" y="120" class="m">order.cancel()</text>
  <path class="hot" d="M300 116 Q 340 116 340 78" marker-end="url(#p2)"/>
  <text x="348" y="80" class="s">found here</text>

  <text x="240" y="34" class="m">order.toString()</text>
  <path class="hot" d="M310 30 Q 340 30 340 30" marker-end="url(#p2)"/>
  <text x="348" y="33" class="s">found here</text>

  <text x="240" y="148" class="s">missing everywhere returns undefined, it does not throw</text>
</svg>
:::

- The search goes up one link at a time and stops at the first match
- `Object.prototype` is the top. Its prototype is `null`
