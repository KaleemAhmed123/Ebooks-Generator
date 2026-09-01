### The Vite idea

Vite's insight was that modern browsers speak ES Modules natively, so **during development there is no need to bundle at all**.

Vite serves your files as separate modules. The browser asks for `App.tsx`, Vite transpiles that one file and returns it, the browser sees its imports and asks for those. Start-up is constant time no matter how large the project, because Vite only touches the files the current page actually imports.

:::mint
<svg viewBox="0 0 470 148" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">WEBPACK: BUNDLE FIRST, SERVE SECOND</text>

  <rect class="bx" x="6"   y="22" width="26" height="20" rx="2"/>
  <rect class="bx" x="36"  y="22" width="26" height="20" rx="2"/>
  <rect class="bx" x="66"  y="22" width="26" height="20" rx="2"/>
  <rect class="bx" x="96"  y="22" width="26" height="20" rx="2"/>
  <rect class="bx" x="126" y="22" width="26" height="20" rx="2"/>
  <text x="164" y="36" class="tiny">...2,400 more</text>

  <rect class="bx" x="252" y="20" width="90" height="24" rx="3"/>
  <text x="297" y="36" class="lbl" text-anchor="middle">bundle.js</text>
  <rect class="bx" x="380" y="20" width="84" height="24" rx="3"/>
  <text x="422" y="36" class="lbl" text-anchor="middle">browser</text>

  <line class="ar" x1="230" y1="32" x2="248" y2="32" marker-end="url(#a)"/>
  <line class="ar" x1="346" y1="32" x2="376" y2="32" marker-end="url(#a)"/>
  <text x="297" y="56" class="hot" text-anchor="middle">every file processed before the first byte is served</text>

  <line x1="6" y1="70" x2="464" y2="70" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="6" y="86" class="sm">VITE: SERVE FIRST, TRANSFORM ON DEMAND</text>

  <rect class="bx" x="380" y="96" width="84" height="24" rx="3"/>
  <text x="422" y="112" class="lbl" text-anchor="middle">browser</text>
  <rect class="bx" x="252" y="96" width="90" height="24" rx="3"/>
  <text x="297" y="112" class="lbl" text-anchor="middle">dev server</text>
  <rect class="soft" x="6" y="96" width="26" height="20" rx="2"/>
  <rect class="soft" x="36" y="96" width="26" height="20" rx="2"/>
  <rect class="bx"   x="66" y="96" width="26" height="20" rx="2"/>
  <rect class="soft" x="96" y="96" width="26" height="20" rx="2"/>
  <rect class="bx"   x="126" y="96" width="26" height="20" rx="2"/>
  <text x="164" y="110" class="tiny">only what this page imports</text>

  <line class="ar" x1="376" y1="108" x2="346" y2="108" marker-end="url(#a)"/>
  <line class="ar" x1="248" y1="108" x2="230" y2="108" marker-end="url(#a)"/>
  <text x="297" y="132" class="sm" text-anchor="middle">startup is constant time whatever the project size</text>
  <text x="6" y="144" class="tiny">Vite 8 uses Rolldown for both dev and the production build, so the two pipelines cannot disagree</text>
</svg>
:::

For production it still bundles, because hundreds of separate network requests are slow over real connections.

### Two bundlers was the flaw

Vite originally used esbuild for development and Rollup for production. Both are excellent. Using both was the problem.

Two bundlers meant two plugin systems, glue code between them, and a steady supply of bugs that appeared only in production because the two pipelines disagreed about something subtle. "Works in dev, breaks in build" was a Vite genre.

**Vite 8 ships Rolldown**, one Rust bundler for both. Rolldown keeps Rollup's plugin API, so most existing plugins work unchanged, and runs at roughly esbuild speed, ten to thirty times faster than Rollup. Development and production now go through the same code path, which removes the entire class of dev-only and build-only bugs.

Unifying the two also unlocked things the split could not do: module level persistent caching, more flexible chunk splitting, and Module Federation support.
