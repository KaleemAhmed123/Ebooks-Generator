# Module 4: Asynchronous JavaScript

## Asynchronous JavaScript: Escaping Callback Hell

:::mint
<svg viewBox="0 0 470 190" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">ONE THREAD, THREE QUEUES, ONE LOOP</text>

  <rect class="bx" x="6" y="24" width="130" height="102" rx="4"/>
  <text x="71" y="38" class="lbl" text-anchor="middle">call stack</text>
  <rect class="soft" x="16" y="46" width="110" height="18" rx="2"/>
  <text x="71" y="59" class="sm" text-anchor="middle">inner()</text>
  <rect class="soft" x="16" y="68" width="110" height="18" rx="2"/>
  <text x="71" y="81" class="sm" text-anchor="middle">outer()</text>
  <rect class="soft" x="16" y="90" width="110" height="18" rx="2"/>
  <text x="71" y="103" class="sm" text-anchor="middle">main()</text>
  <text x="71" y="120" class="tiny" text-anchor="middle">must be empty to continue</text>

  <rect class="bx" x="162" y="24" width="140" height="40" rx="4"/>
  <text x="232" y="39" class="lbl" text-anchor="middle">web APIs</text>
  <text x="232" y="53" class="tiny" text-anchor="middle">timers, fetch, DOM events</text>

  <rect class="hotbx" x="162" y="80" width="140" height="34" rx="4"/>
  <text x="232" y="95" class="lbl" text-anchor="middle">microtask queue</text>
  <text x="232" y="108" class="hot" text-anchor="middle">promises, drained fully</text>

  <rect class="bx" x="162" y="130" width="140" height="34" rx="4"/>
  <text x="232" y="145" class="lbl" text-anchor="middle">macrotask queue</text>
  <text x="232" y="158" class="tiny" text-anchor="middle">setTimeout, I/O, one per tick</text>

  <circle cx="392" cy="82" r="34" class="bx"/>
  <text x="392" y="80" class="lbl" text-anchor="middle">event</text>
  <text x="392" y="92" class="lbl" text-anchor="middle">loop</text>

  <line class="ar" x1="140" y1="44" x2="158" y2="44" marker-end="url(#a)"/>
  <path class="ar" d="M302,44 L340,44 L340,60" marker-end="url(#a)"/>
  <line class="ar" x1="306" y1="97" x2="354" y2="90" marker-end="url(#a)"/>
  <line class="ar" x1="306" y1="147" x2="358" y2="108" marker-end="url(#a)"/>
  <path class="ar" d="M392,48 L392,16 L71,16 L71,20" marker-end="url(#a)"/>
  <text x="232" y="12" class="tiny" text-anchor="middle">pushed back onto the stack</text>

  <text x="6" y="180" class="hot">every microtask runs before the next macrotask, which is why an await resumes</text>
  <text x="6" y="190" class="hot">before a setTimeout(0) queued earlier</text>
</svg>
:::

- JavaScript is single-threaded. It can only do one thing at a time. If a network request takes 2 seconds, synchronous execution would freeze the entire browser
- **Callbacks** were the original solution. You passed a function to execute *after* the network request finished. This led to deeply nested, unreadable code known as "Callback Hell"

### Promises

- A **Promise** is a proxy for a value that is not known yet
- It has three states: `Pending`, `Fulfilled` (success), or `Rejected` (error)
- Promises flattened callback hell by allowing you to chain `.then()` and catch errors gracefully with `.catch()`

```js
fetch('/api/user')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
