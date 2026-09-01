## Where each kind of memory lives

:::mint
<svg viewBox="0 0 470 200" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="m1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="8" y="12" class="t">YOUR STORAGE</text>
  <rect class="b" x="8" y="20" width="150" height="24" rx="4"/>
  <text x="83" y="36" class="l" text-anchor="middle">messages table</text>
  <text x="163" y="36" class="s">working</text>

  <rect class="b" x="8" y="54" width="150" height="24" rx="4"/>
  <text x="83" y="70" class="l" text-anchor="middle">past runs, embedded</text>
  <text x="163" y="70" class="s">episodic</text>

  <rect class="b" x="8" y="88" width="150" height="24" rx="4"/>
  <text x="83" y="104" class="l" text-anchor="middle">user_facts table</text>
  <text x="163" y="104" class="s">semantic</text>

  <rect class="b" x="8" y="122" width="150" height="24" rx="4"/>
  <text x="83" y="138" class="l" text-anchor="middle">prompts + tools in git</text>
  <text x="163" y="138" class="s">procedural</text>

  <rect class="c" x="296" y="40" width="166" height="88" rx="5"/>
  <text x="379" y="62" class="l" text-anchor="middle">the request</text>
  <text x="379" y="78" class="s" text-anchor="middle">system + facts</text>
  <text x="379" y="92" class="s" text-anchor="middle">summary of older turns</text>
  <text x="379" y="106" class="s" text-anchor="middle">last N messages</text>
  <text x="379" y="120" class="s" text-anchor="middle">retrieved episodes</text>

  <line class="a" x1="215" y1="36" x2="292" y2="70" marker-end="url(#m1)"/>
  <line class="a" x1="215" y1="70" x2="292" y2="84" marker-end="url(#m1)"/>
  <line class="a" x1="215" y1="104" x2="292" y2="98" marker-end="url(#m1)"/>
  <line class="a" x1="215" y1="138" x2="292" y2="112" marker-end="url(#m1)"/>

  <text x="235" y="170" class="s" text-anchor="middle">nothing on the right persists. it is rebuilt on every single turn</text>
  <text x="235" y="184" class="s" text-anchor="middle">only the left survives, which is why memory is a schema decision</text>
</svg>
:::
