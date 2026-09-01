### The rule

**Validate at the edges, trust the middle.** Every place data enters your program

:::mint
<svg viewBox="0 0 470 158" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">ONE CHECKPOINT, NOT A HUNDRED DEFENSIVE IFS</text>

  <rect class="bx" x="6" y="26" width="104" height="20" rx="3"/>
  <text x="58" y="40" class="tiny" text-anchor="middle">fetch response</text>
  <rect class="bx" x="6" y="52" width="104" height="20" rx="3"/>
  <text x="58" y="66" class="tiny" text-anchor="middle">URL params</text>
  <rect class="bx" x="6" y="78" width="104" height="20" rx="3"/>
  <text x="58" y="92" class="tiny" text-anchor="middle">localStorage</text>
  <rect class="bx" x="6" y="104" width="104" height="20" rx="3"/>
  <text x="58" y="118" class="tiny" text-anchor="middle">postMessage, env</text>

  <rect class="hotbx" x="164" y="52" width="96" height="46" rx="4"/>
  <text x="212" y="72" class="lbl" text-anchor="middle">schema.parse</text>
  <text x="212" y="88" class="hot" text-anchor="middle">throws here</text>

  <rect class="bx" x="316" y="40" width="148" height="70" rx="4"/>
  <text x="390" y="58" class="lbl" text-anchor="middle">everything else</text>
  <text x="326" y="76" class="sm">types are true</text>
  <text x="326" y="90" class="sm">no defensive checks</text>
  <text x="326" y="104" class="tiny">type derived from the same schema</text>

  <path class="ar" d="M114,36 L140,36 L140,75 L160,75" marker-end="url(#a)"/>
  <path class="ar" d="M114,62 L140,62 L140,75 L160,75" marker-end="url(#a)"/>
  <path class="ar" d="M114,88 L140,88 L140,79 L160,79" marker-end="url(#a)"/>
  <path class="ar" d="M114,114 L140,114 L140,83 L160,83" marker-end="url(#a)"/>
  <line class="ar" x1="264" y1="75" x2="312" y2="75" marker-end="url(#a)"/>

  <text x="6" y="140" class="hot">an annotation is a promise. res.json() is any, and any assigns to anything.</text>
  <text x="6" y="152" class="sm">parse instead, and the failure names the field instead of crashing six components deep
</svg>
:::
from outside gets a schema: HTTP responses, `localStorage`, URL search
parameters, `postMessage`, environment variables, webhook bodies. Inside that
boundary the compiler is telling the truth and you can write ordinary code
without defensive checks.

```ts
// URL params are strings from a stranger, every time
const Filters = z.object({
  page: z.coerce.number().int().positive().default(1),
  sort: z.enum(['newest', 'price']).default('newest'),
});

const filters = Filters.parse(Object.fromEntries(searchParams));
```
