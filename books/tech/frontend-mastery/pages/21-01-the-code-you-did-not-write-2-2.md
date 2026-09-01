### Two questions worth being able to answer

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

  <text x="6" y="12" class="sm">EVERY WAY THIRD-PARTY CODE REACHES YOUR USERS</text>

  <rect class="bx" x="6" y="24" width="96" height="26" rx="4"/>
  <text x="54" y="41" class="lbl" text-anchor="middle">direct deps</text>
  <rect class="bx" x="6" y="56" width="96" height="26" rx="4"/>
  <text x="54" y="73" class="lbl" text-anchor="middle">transitive deps</text>
  <rect class="bx" x="6" y="88" width="96" height="26" rx="4"/>
  <text x="54" y="105" class="lbl" text-anchor="middle">CI actions</text>
  <rect class="bx" x="6" y="120" width="96" height="26" rx="4"/>
  <text x="54" y="137" class="lbl" text-anchor="middle">editor plugins</text>

  <rect class="hotbx" x="152" y="56" width="112" height="58" rx="4"/>
  <text x="208" y="76" class="lbl" text-anchor="middle">your build</text>
  <text x="208" y="90" class="hot" text-anchor="middle">repo, env vars,</text>
  <text x="208" y="102" class="hot" text-anchor="middle">CI secrets</text>

  <rect class="hotbx" x="316" y="56" width="148" height="58" rx="4"/>
  <text x="390" y="76" class="lbl" text-anchor="middle">the user's browser</text>
  <text x="390" y="90" class="hot" text-anchor="middle">the DOM, cookies,</text>
  <text x="390" y="102" class="hot" text-anchor="middle">the login form, the network</text>

  <path class="ar" d="M106,37 L128,37 L128,80 L148,80" marker-end="url(#a)"/>
  <path class="ar" d="M106,69 L128,69 L128,80 L148,80" marker-end="url(#a)"/>
  <path class="ar" d="M106,101 L128,101 L128,84 L148,84" marker-end="url(#a)"/>
  <path class="ar" d="M106,133 L128,133 L128,88 L148,88" marker-end="url(#a)"/>
  <line class="ar" x1="268" y1="85" x2="312" y2="85" marker-end="url(#a)"/>
  <text x="290" y="78" class="tiny" text-anchor="middle">ships</text>

  <text x="6" y="164" class="sm">narrowing the left column is dependency hygiene</text>
  <text x="6" y="176" class="hot">narrowing what the two right boxes allow is CSP, SRI, and scoped tokens
</svg>
:::

Every mitigation in the next two pages is an answer to one of these.

1. **How does new third-party code get into my build?** Direct dependencies,
   transitive dependencies, the CI runner image, GitHub Actions, editor
   extensions, and the design tool plugin someone installed last Tuesday.
2. **What can it reach once it is there?** Build secrets, the repository, the
   published artifact, and the user's browser.

Narrowing the first is dependency hygiene. Narrowing the second is what CSP,
subresource integrity, and least-privilege CI tokens are for.
