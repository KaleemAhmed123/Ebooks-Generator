## Server State: React Query (TanStack)

If you fetch data from an API using a standard `useEffect` and store it in `useState`, you are responsible for handling a tremendous amount of manual logic:
- How do you show a loading spinner while it fetches?
- How do you show an error state if it fails?
- If the user leaves the page and comes back, do you fetch it again?
- What if the user switches tabs, should you refetch in the background to ensure data isn't stale?
- How do you prevent 3 components on the same page from fetching the exact same `/api/user` endpoint 3 times simultaneously?

**React Query (TanStack Query)** solves all of this automatically.

### The Mental Model
React Query treats Server Data like a heavily optimized cache. When you ask it for data, it checks its cache first. If it has it, it gives it to you instantly. If the data is deemed "stale," it gives you the stale data instantly so the user sees *something*, and then secretly refetches the fresh data in the background and updates the UI automatically.

:::mint
<svg viewBox="0 0 470 160" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">THE LIFE OF ONE QUERY KEY</text>

  <rect class="bx" x="6"   y="34" width="92" height="30" rx="4"/>
  <text x="52"  y="53" class="lbl" text-anchor="middle">fetching</text>

  <rect class="bx" x="146" y="34" width="92" height="30" rx="4"/>
  <text x="192" y="53" class="lbl" text-anchor="middle">fresh</text>

  <rect class="bx" x="286" y="34" width="92" height="30" rx="4"/>
  <text x="332" y="53" class="lbl" text-anchor="middle">stale</text>

  <rect class="bx" x="286" y="106" width="92" height="30" rx="4"/>
  <text x="332" y="125" class="lbl" text-anchor="middle">inactive</text>

  <rect class="soft" x="392" y="106" width="72" height="30" rx="4"/>
  <text x="428" y="125" class="lbl" text-anchor="middle">deleted</text>

  <line class="ar" x1="102" y1="49" x2="142" y2="49" marker-end="url(#a)"/>
  <text x="122" y="43" class="tiny" text-anchor="middle">ok</text>

  <line class="ar" x1="242" y1="49" x2="282" y2="49" marker-end="url(#a)"/>
  <text x="262" y="30" class="tiny" text-anchor="middle">staleTime</text>
  <text x="262" y="43" class="tiny" text-anchor="middle">expires</text>

  <path class="ar" d="M332,34 L332,20 L52,20 L52,30" marker-end="url(#a)"/>
  <text x="192" y="16" class="tiny" text-anchor="middle">refocus, remount, or invalidate</text>

  <line class="ar" x1="332" y1="68" x2="332" y2="102" marker-end="url(#a)"/>
  <text x="338" y="88" class="tiny">last observer unmounts</text>

  <line class="ar" x1="382" y1="121" x2="388" y2="121" marker-end="url(#a)"/>
  <text x="428" y="150" class="tiny" text-anchor="middle">gcTime expires</text>

  <path class="ar" d="M286,121 L60,121 L60,68" marker-end="url(#a)"/>
  <text x="168" y="133" class="tiny" text-anchor="middle">remounts before gcTime: cached data shows instantly, refetch runs behind it</text>
</svg>
:::
