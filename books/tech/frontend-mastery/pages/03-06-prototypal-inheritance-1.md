## Prototypal Inheritance

If you come from Java, C#, or Python, you are used to Classical Inheritance. You define a blueprint (a `class`), and you instantiate objects from that blueprint.

JavaScript is completely different. **JavaScript does not have classes.** 
Instead, it has objects. And objects can inherit directly from other objects. This is called **Prototypal Inheritance**.

### The Prototype Chain

Every single object in JavaScript has a hidden internal property called `[[Prototype]]` (often accessed via `__proto__` in browsers). This property points to another object.

When you try to access a property or a method on an object, the JavaScript engine does the following:
1. It looks at the object itself. Does it have the property? If yes, return it.
2. If no, it looks at the object's `[[Prototype]]`. Does *that* object have the property? If yes, return it.
3. If no, it looks at *that* object's `[[Prototype]]`.
4. It repeats this process until it reaches the end of the chain, which is `null`. If it hits `null`, it returns `undefined`.

:::mint
<svg viewBox="0 0 470 178" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">rabbit.toString() WALKS THE CHAIN UNTIL IT FINDS toString</text>

  <rect class="bx" x="20" y="24" width="200" height="32" rx="4"/>
  <text x="120" y="39" class="lbl" text-anchor="middle">rabbit</text>
  <text x="120" y="51" class="sm"  text-anchor="middle">{ jumps: true }</text>

<rect class="bx" x="20" y="72" width="200" height="32" rx="4"/>
  <text x="120" y="87" class="lbl" text-anchor="middle">animal</text>
  <text x="120" y="99" class="sm"  text-anchor="middle">{ eats: true, walk() }</text>

  <rect class="bx" x="20" y="120" width="200" height="32" rx="4"/>
  <text x="120" y="135" class="lbl" text-anchor="middle">Object.prototype</text>
  <text x="120" y="147" class="sm"  text-anchor="middle">{ toString(), hasOwnProperty() }</text>

  <text x="120" y="172" class="lbl" text-anchor="middle">null</text>

  <line class="ar" x1="120" y1="56"  x2="120" y2="68"  marker-end="url(#a)"/>
  <line class="ar" x1="120" y1="104" x2="120" y2="116" marker-end="url(#a)"/>
  <line class="ar" x1="120" y1="152" x2="120" y2="163" marker-end="url(#a)"/>

  <text x="230" y="66"  class="tiny">[[Prototype]]</text>
  <text x="230" y="114" class="tiny">[[Prototype]]</text>
  <text x="230" y="161" class="tiny">end of the chain</text>

  <text x="300" y="40"  class="sm">1. not here</text>
  <text x="300" y="88"  class="sm">2. not here either</text>
  <text x="300" y="136" class="hot">3. found it</text>

  <text x="300" y="172" class="tiny">a miss on all three returns undefined</text>
</svg>
:::
