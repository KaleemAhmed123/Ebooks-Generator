## Backpressure

- A fast producer and a slow consumer. The data has to go somewhere

:::mint
<svg viewBox="0 0 470 168" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .bad { fill: #ef476e; font: bold 7.5px Consolas, monospace; }
    .buf { fill: #ffe3ea; stroke: #ef476e; stroke-width: 1; }
    .ok { fill: #e2fcf3; stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <defs>
    <marker id="bp" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="10" y="12" class="bad">WITHOUT backpressure</text>
  <rect class="b" x="10" y="20" width="92" height="28" rx="4"/>
  <text x="56" y="38" class="l" text-anchor="middle">disk read</text>
  <rect class="buf" x="140" y="16" width="150" height="36" rx="4"/>
  <text x="215" y="31" class="s" text-anchor="middle">memory buffer</text>
  <text x="215" y="45" class="bad" text-anchor="middle">grows without limit</text>
  <rect class="b" x="330" y="20" width="92" height="28" rx="4"/>
  <text x="376" y="38" class="l" text-anchor="middle">slow socket</text>
  <line class="a" x1="104" y1="34" x2="136" y2="34" marker-end="url(#bp)"/>
  <line class="a" x1="292" y1="34" x2="326" y2="34" marker-end="url(#bp)"/>
  <text x="215" y="66" class="bad" text-anchor="middle">process runs out of memory</text>

  <text x="10" y="98" class="s">WITH backpressure</text>
  <rect class="b" x="10" y="106" width="92" height="28" rx="4"/>
  <text x="56" y="124" class="l" text-anchor="middle">disk read</text>
  <rect class="ok" x="140" y="106" width="150" height="28" rx="4"/>
  <text x="215" y="124" class="s" text-anchor="middle">buffer capped, 64KB</text>
  <rect class="b" x="330" y="106" width="92" height="28" rx="4"/>
  <text x="376" y="124" class="l" text-anchor="middle">slow socket</text>
  <line class="a" x1="104" y1="120" x2="136" y2="120" marker-end="url(#bp)"/>
  <line class="a" x1="292" y1="120" x2="326" y2="120" marker-end="url(#bp)"/>

  <path class="a" d="M376 138 Q 376 158 215 158 Q 56 158 56 138" marker-end="url(#bp)"/>
  <text x="215" y="154" class="s" text-anchor="middle">"stop sending" travels back to the source</text>
</svg>
:::

- **Backpressure** is the slow end telling the fast end to wait
- Without it, the buffer between them grows until the process dies
