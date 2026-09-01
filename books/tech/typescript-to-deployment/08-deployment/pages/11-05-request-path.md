## The whole path, once

- Every layer in the last four pages, in the order a request meets them. **Knowing this order is how you know which layer to check**

:::mint
<svg viewBox="0 0 470 215" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="p1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="120" y="8" width="230" height="22" rx="4"/>
  <text x="235" y="23" class="l" text-anchor="middle">Route 53 resolves api.example.com</text>
  <rect class="c" x="120" y="38" width="230" height="22" rx="4"/>
  <text x="235" y="53" class="l" text-anchor="middle">CloudFront edge, TLS terminates here</text>
  <rect class="b" x="120" y="68" width="230" height="22" rx="4"/>
  <text x="235" y="83" class="l" text-anchor="middle">WAF evaluates the rules</text>
  <rect class="b" x="120" y="98" width="230" height="22" rx="4"/>
  <text x="235" y="113" class="l" text-anchor="middle">cache hit? answer here and stop</text>
  <rect class="c" x="120" y="128" width="230" height="22" rx="4"/>
  <text x="235" y="143" class="l" text-anchor="middle">ALB picks a healthy target</text>
  <rect class="b" x="120" y="158" width="230" height="22" rx="4"/>
  <text x="235" y="173" class="l" text-anchor="middle">Nginx, then node :3000</text>

  <line class="a" x1="235" y1="30" x2="235" y2="36" marker-end="url(#p1)"/>
  <line class="a" x1="235" y1="60" x2="235" y2="66" marker-end="url(#p1)"/>
  <line class="a" x1="235" y1="90" x2="235" y2="96" marker-end="url(#p1)"/>
  <line class="a" x1="235" y1="120" x2="235" y2="126" marker-end="url(#p1)"/>
  <line class="a" x1="235" y1="150" x2="235" y2="156" marker-end="url(#p1)"/>

  <text x="362" y="52" class="s">certificate in us-east-1</text>
  <text x="362" y="82" class="s">403 comes from here</text>
  <text x="362" y="112" class="s">x-cache header says which</text>
  <text x="362" y="142" class="s">502 and 504 come from here</text>

  <text x="235" y="200" class="s" text-anchor="middle">a 403 with no body is almost always WAF; a 504 is almost always a slow target</text>
  <text x="235" y="211" class="s" text-anchor="middle">curl each layer in turn to find where the response stops matching</text>
</svg>
:::
