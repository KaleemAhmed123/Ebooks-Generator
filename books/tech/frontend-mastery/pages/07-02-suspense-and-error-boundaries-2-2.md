### The two work together

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
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">WHICH BOUNDARY CATCHES WHAT</text>

  <rect class="hotbx" x="6" y="22" width="458" height="118" rx="4"/>
  <text x="16" y="36" class="hot">ErrorBoundary          catches a throw during render, below here</text>

  <rect class="bx" x="20" y="46" width="430" height="84" rx="4"/>
  <text x="30" y="60" class="sm">Suspense               catches a thrown promise, shows the fallback</text>

  <rect class="soft" x="34" y="70" width="200" height="50" rx="4"/>
  <text x="134" y="86" class="lbl" text-anchor="middle">&lt;Feed /&gt;</text>
  <text x="134" y="100" class="tiny" text-anchor="middle">reads data with use()</text>
  <text x="134" y="112" class="tiny" text-anchor="middle">no loading flag of its own</text>

  <rect class="soft" x="248" y="70" width="188" height="50" rx="4"/>
  <text x="342" y="86" class="lbl" text-anchor="middle">onClick handler</text>
  <text x="342" y="100" class="hot" text-anchor="middle">NOT caught by either</text>
  <text x="342" y="112" class="tiny" text-anchor="middle">needs its own try / catch</text>

  <text x="6" y="150" class="sm">loading is a state that resolves. failure is terminal, so the retry lives outside it.</text>
</svg>
:::

Wrap the Error Boundary outside the Suspense boundary. Loading is a normal state that resolves. Failure is a terminal state that needs a retry.

```jsx
<ErrorBoundary fallback={<RetryCard />}>
  <Suspense fallback={<FeedSkeleton />}>
    <Feed />
  </Suspense>
</ErrorBoundary>
```
