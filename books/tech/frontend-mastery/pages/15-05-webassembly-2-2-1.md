### The detail that decides whether it helps

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">THE COPY IS THE COST</text>

  <rect class="bx" x="6" y="26" width="150" height="70" rx="4"/>
  <text x="81" y="44" class="lbl" text-anchor="middle">JavaScript heap</text>
  <rect class="soft" x="18" y="56" width="126" height="28" rx="3"/>
  <text x="81" y="74" class="sm" text-anchor="middle">your typed array</text>

  <rect class="bx" x="314" y="26" width="150" height="70" rx="4"/>
  <text x="389" y="44" class="lbl" text-anchor="middle">Wasm linear memory</text>
  <rect class="soft" x="326" y="56" width="126" height="28" rx="3"/>
  <text x="389" y="74" class="sm" text-anchor="middle">a copy of it</text>

  <line class="hotln" x1="160" y1="60" x2="310" y2="60" marker-end="url(#r)"/>
  <text x="235" y="54" class="hot" text-anchor="middle">copy in</text>
  <line class="hotln" x1="310" y1="80" x2="160" y2="80" marker-end="url(#r)"/>
  <text x="235" y="94" class="hot" text-anchor="middle">copy out</text>

  <text x="6" y="118" class="sm">one 10MB image, one call: the copy is noise against the work saved</text>
  <text x="6" y="132" class="hot">a small array, sixty times a second: the copy IS the cost, and you made it slower</text>
  <text x="6" y="146" class="tiny">design for few calls with large payloads, never many calls with small ones
</svg>
:::

**Memory does not cross for free.** Wasm has its own linear memory, separate
from the JavaScript heap. Passing a large buffer means copying it in and copying
the result out.

For a 10MB image and one operation, that copy is noise against the work saved.
For a function called sixty times a second on a small array, the copying is the
entire cost and you have made things slower.

**Design for few calls with large payloads.** Never many calls with small ones.

### Put it in a worker

A Wasm computation blocks the main thread exactly like a JavaScript one. The
reason to use it is usually that the work is heavy, so it belongs in a Web
Worker for the same reason any heavy work does.

```js
// main thread
const worker = new Worker('/image-worker.js', { type: 'module' });
worker.postMessage({ bytes, width: 800 }, [bytes.buffer]);   // transferred, not copied
```

The second argument is a transfer list. It hands ownership of the underlying
buffer to the worker instead of cloning it, which turns a 10MB copy into a
pointer move. Pair that with the previous section and the memory cost mostly
disappears.
