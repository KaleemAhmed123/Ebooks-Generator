### Nonces, and why `unsafe-inline` defeats the point

`script-src 'self'` blocks inline `<script>` blocks. Frameworks need some inline script for hydration data, so the common shortcut is `'unsafe-inline'`, which permits every inline script including the injected one. That turns CSP into decoration.

The correct fix is a **nonce**: a random value generated per request, put on the header and on each legitimate script tag. An injected script has no way to know it.

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
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">ONE FRESH NONCE PER REQUEST</text>

  <rect class="bx" x="6" y="26" width="120" height="30" rx="4"/>
  <text x="66" y="45" class="lbl" text-anchor="middle">request arrives</text>

  <rect class="bx" x="160" y="26" width="140" height="30" rx="4"/>
  <text x="230" y="41" class="lbl" text-anchor="middle">proxy generates</text>
  <text x="230" y="52" class="sm"  text-anchor="middle">nonce-8f3a...</text>

  <rect class="bx" x="334" y="18" width="130" height="24" rx="4"/>
  <text x="399" y="34" class="sm" text-anchor="middle">CSP header</text>
  <rect class="bx" x="334" y="48" width="130" height="24" rx="4"/>
  <text x="399" y="64" class="sm" text-anchor="middle">&lt;script nonce="8f3a"&gt;</text>

  <line class="ar" x1="130" y1="41" x2="156" y2="41" marker-end="url(#a)"/>
  <path class="ar" d="M304,41 L318,41 L318,30 L330,30" marker-end="url(#a)"/>
  <path class="ar" d="M304,41 L318,41 L318,60 L330,60" marker-end="url(#a)"/>

  <line x1="6" y1="86" x2="464" y2="86" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="6" y="102" class="sm">IN THE BROWSER</text>

  <rect class="bx" x="6" y="112" width="216" height="26" rx="4"/>
  <text x="114" y="129" class="lbl" text-anchor="middle">your script, nonce matches</text>
  <text x="230" y="129" class="lbl">runs</text>

<rect class="hotbx" x="6" y="144" width="216" height="24" rx="4"/>
  <text x="114" y="160" class="hot" text-anchor="middle">injected script, no nonce</text>
  <text x="230" y="160" class="hot">blocked</text>

  <text x="290" y="129" class="tiny">the attacker cannot read the</text>
  <text x="290" y="140" class="tiny">nonce ahead of time, because</text>
  <text x="290" y="151" class="tiny">it did not exist until this request</text>
</svg>
:::
