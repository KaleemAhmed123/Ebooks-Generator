## What Node actually is

:::mint
<svg viewBox="0 0 470 176" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="n1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="70" y="8" width="330" height="28" rx="4"/>
  <text x="235" y="26" class="l" text-anchor="middle">your JavaScript</text>

  <rect class="b" x="70" y="48" width="330" height="28" rx="4"/>
  <text x="235" y="66" class="l" text-anchor="middle">node standard library    fs  http  net  crypto</text>

  <rect class="b" x="70" y="88" width="330" height="26" rx="4"/>
  <text x="235" y="105" class="s" text-anchor="middle">C++ bindings</text>

  <rect class="b" x="70" y="126" width="158" height="34" rx="4"/>
  <text x="149" y="141" class="l" text-anchor="middle">V8</text>
  <text x="149" y="153" class="s" text-anchor="middle">runs the JavaScript</text>

  <rect class="b" x="242" y="126" width="158" height="34" rx="4"/>
  <text x="321" y="141" class="l" text-anchor="middle">libuv</text>
  <text x="321" y="153" class="s" text-anchor="middle">event loop, IO, threadpool</text>

  <line class="a" x1="235" y1="38" x2="235" y2="46" marker-end="url(#n1)"/>
  <line class="a" x1="235" y1="78" x2="235" y2="86" marker-end="url(#n1)"/>
  <line class="a" x1="149" y1="116" x2="149" y2="124" marker-end="url(#n1)"/>
  <line class="a" x1="321" y1="116" x2="321" y2="124" marker-end="url(#n1)"/>

  <text x="16" y="66" class="t">node</text>
  <text x="16" y="145" class="t">C / C++</text>
</svg>
:::

- V8 knows nothing about files, sockets or timers. Those are all libuv
- `fs.readFile` is JavaScript calling into C++ calling into libuv
- The single thread everybody talks about is **your JavaScript**. libuv has its own threads underneath
