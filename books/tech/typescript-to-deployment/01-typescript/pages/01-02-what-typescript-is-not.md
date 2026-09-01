## What TypeScript is not

- TypeScript is **not** a runtime safety net
- Types are erased during the build - nothing checks them while the server runs
- A JSON body that lies about its shape sails straight past every type you wrote

:::mint
<svg viewBox="0 0 470 112" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 11px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 9px Consolas, monospace; fill: #4a4a4a; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 9px Consolas, monospace; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="8" y="14" class="sm">BUILD TIME</text>
  <text x="292" y="14" class="sm">RUNTIME</text>
  <line x1="278" y1="4" x2="278" y2="108" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>

  <rect class="bx" x="8"   y="30" width="76" height="30" rx="4"/>
  <text x="46" y="49" class="lbl" text-anchor="middle">app.ts</text>

  <rect class="bx" x="112" y="30" width="60" height="30" rx="4"/>
  <text x="142" y="49" class="lbl" text-anchor="middle">tsc</text>

  <rect class="bx" x="200" y="30" width="62" height="30" rx="4"/>
  <text x="231" y="49" class="lbl" text-anchor="middle">app.js</text>

  <rect class="bx" x="300" y="30" width="76" height="30" rx="4"/>
  <text x="338" y="49" class="lbl" text-anchor="middle">Node</text>

  <line class="ar" x1="86"  y1="45" x2="108" y2="45" marker-end="url(#a)"/>
  <line class="ar" x1="174" y1="45" x2="196" y2="45" marker-end="url(#a)"/>
  <line class="ar" x1="264" y1="45" x2="296" y2="45" marker-end="url(#a)"/>

  <text x="142" y="82" class="hot" text-anchor="middle">types checked here</text>
  <text x="142" y="96" class="hot" text-anchor="middle">then thrown away</text>
  <line class="ar" x1="142" y1="86" x2="142" y2="64" marker-end="url(#a)"/>

  <text x="338" y="82" class="sm" text-anchor="middle">no types left</text>
  <text x="338" y="96" class="sm" text-anchor="middle">nothing is checked</text>
</svg>
:::

- Below, `body` is *declared* as `User`, but nothing ever verified it
- `body.age.toFixed(2)` compiles cleanly and crashes in production

```ts
type User = { name: string; age: number }

app.post("/users", (req, res) => {
  const body = req.body as User   // a promise, not a check
  res.send(body.age.toFixed(2))   // TypeError if age is a string
})
```

- This is the most important idea in the booklet
- Module 5 exists entirely to close this gap
