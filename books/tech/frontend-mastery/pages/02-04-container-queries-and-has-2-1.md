### Container queries

Declare an element a container, then query the container instead of the viewport.

:::mint
<svg viewBox="0 0 470 146" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">THE SAME COMPONENT, THREE SLOTS, NO PROPS</text>

  <rect class="soft" x="6" y="24" width="110" height="96" rx="4"/>
  <text x="61" y="38" class="sm" text-anchor="middle">sidebar, 260px</text>
  <rect class="bx" x="18" y="46" width="86" height="26" rx="3"/>
  <text x="61" y="63" class="tiny" text-anchor="middle">image</text>
  <rect class="bx" x="18" y="76" width="86" height="18" rx="3"/>
  <text x="61" y="89" class="tiny" text-anchor="middle">title</text>
  <rect class="bx" x="18" y="98" width="86" height="14" rx="3"/>

  <rect class="soft" x="132" y="24" width="150" height="96" rx="4"/>
  <text x="207" y="38" class="sm" text-anchor="middle">grid cell, 340px</text>
  <rect class="bx" x="144" y="46" width="56" height="52" rx="3"/>
  <text x="172" y="75" class="tiny" text-anchor="middle">image</text>
  <rect class="bx" x="206" y="46" width="64" height="18" rx="3"/>
  <text x="238" y="59" class="tiny" text-anchor="middle">title</text>
  <rect class="bx" x="206" y="68" width="64" height="30" rx="3"/>

  <rect class="soft" x="298" y="24" width="166" height="96" rx="4"/>
  <text x="381" y="38" class="sm" text-anchor="middle">main column, 900px</text>
  <rect class="bx" x="310" y="46" width="66" height="62" rx="3"/>
  <text x="343" y="80" class="tiny" text-anchor="middle">image</text>
  <rect class="bx" x="382" y="46" width="70" height="18" rx="3"/>
  <text x="417" y="59" class="tiny" text-anchor="middle">title</text>
  <rect class="bx" x="382" y="68" width="70" height="40" rx="3"/>

<text x="6" y="136" class="hot">a media query sees one viewport and cannot tell these apart. @container measures the slot.</text>
</svg>
:::
