## The signalling flow

:::mint
<svg viewBox="0 0 470 174" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .l { font: 8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .m { stroke: #ef476e; stroke-width: 1.6; fill: none; }
    .mt { font: bold 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="w1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="w2" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="#ef476e"/>
    </marker>
  </defs>

  <rect class="b" x="10" y="66" width="78" height="28" rx="4"/>
  <text x="49" y="84" class="l" text-anchor="middle">browser A</text>

  <rect class="b" x="382" y="66" width="78" height="28" rx="4"/>
  <text x="421" y="84" class="l" text-anchor="middle">browser B</text>

  <rect class="b" x="176" y="10" width="118" height="28" rx="4"/>
  <text x="235" y="28" class="l" text-anchor="middle">your signalling server</text>

  <rect class="b" x="196" y="132" width="78" height="24" rx="4"/>
  <text x="235" y="148" class="s" text-anchor="middle">STUN / TURN</text>

  <line class="a" x1="60" y1="64" x2="172" y2="32" marker-end="url(#w1)"/>
  <text x="104" y="46" class="s">offer</text>
  <line class="a" x1="298" y1="32" x2="408" y2="64" marker-end="url(#w1)"/>
  <text x="346" y="46" class="s">offer</text>
  <line class="a" x1="408" y1="70" x2="298" y2="38" marker-end="url(#w1)"/>
  <text x="346" y="64" class="s">answer</text>
  <line class="a" x1="172" y1="38" x2="62" y2="70" marker-end="url(#w1)"/>
  <text x="104" y="64" class="s">answer</text>

  <line class="a" x1="49" y1="96" x2="192" y2="138" marker-end="url(#w1)"/>
  <line class="a" x1="421" y1="96" x2="278" y2="138" marker-end="url(#w1)"/>
  <text x="235" y="168" class="s" text-anchor="middle">what does this peer look like from outside, and relay if nothing else works</text>

  <path class="m" d="M90 80 L378 80" marker-end="url(#w2)"/>
  <text x="235" y="74" class="mt" text-anchor="middle">media flows directly, your server never sees it</text>
</svg>
:::

```ts
socket.on("rtc:offer",  ({ to, sdp }) => io.to(to).emit("rtc:offer",  { from: socket.id, sdp }))
socket.on("rtc:answer", ({ to, sdp }) => io.to(to).emit("rtc:answer", { from: socket.id, sdp }))
socket.on("rtc:ice",    ({ to, candidate }) => io.to(to).emit("rtc:ice", { from: socket.id, candidate }))
```

- The server relays three message types and understands none of them. That is the whole backend
