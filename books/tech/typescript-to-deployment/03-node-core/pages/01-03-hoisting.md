## Hoisting

- Declarations are moved to the top of their scope before any code runs
- Assignments are not

:::mint
<svg viewBox="0 0 470 132" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .c { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .t { font: bold 8.5px Consolas, monospace; fill: #ef476e; }
    .h { font: 8px Georgia, serif; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .a { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="h1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="12" y="14" class="h">what you wrote</text>
  <rect class="b" x="12" y="20" width="196" height="72" rx="3"/>
  <text x="24" y="40" class="c">console.log(total)</text>
  <text x="24" y="58" class="c">var total = 10</text>
  <text x="24" y="82" class="c">count()</text>

  <text x="262" y="14" class="h">what the engine runs</text>
  <rect class="b" x="262" y="20" width="196" height="72" rx="3"/>
  <text x="274" y="36" class="t">var total</text>
  <text x="274" y="52" class="c">console.log(total)</text>
  <text x="371" y="52" class="t">undefined</text>
  <text x="274" y="68" class="c">total = 10</text>
  <text x="274" y="86" class="c">count()</text>

  <path class="a" d="M212 56 Q 236 56 258 36" marker-end="url(#h1)"/>

  <text x="235" y="112" class="h" text-anchor="middle">the declaration moves up, the value stays where you put it</text>
  <text x="235" y="126" class="h" text-anchor="middle">function declarations are hoisted whole, body included</text>
</svg>
:::

```js
console.log(total)   // undefined, no error
var total = 10

count()              // 5, the whole function was hoisted
function count() { console.log(5) }

sum()                // TypeError: sum is not a function
var sum = function () {}
```

- A function **declaration** is hoisted with its body
- A function **expression** assigned to `var` is only hoisted as `undefined`
