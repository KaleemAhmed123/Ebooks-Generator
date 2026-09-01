# Module 5 - Nginx

## What a reverse proxy is for

- Node can serve HTTP on port 443 with a certificate. It is capable of it, and it should not be the thing doing it
- A **reverse proxy** accepts every connection from the internet and forwards it to your application over the loopback interface
- **It exists to do the work Node is bad at**, in C, without touching the event loop that serves your requests

:::mint
<svg viewBox="0 0 470 180" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="n1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="8" y="58" width="78" height="28" rx="4"/>
  <text x="47" y="77" class="l" text-anchor="middle">internet</text>

  <rect class="c" x="128" y="22" width="140" height="110" rx="5"/>
  <text x="198" y="40" class="l" text-anchor="middle">Nginx :443</text>
  <text x="198" y="57" class="s" text-anchor="middle">TLS termination</text>
  <text x="198" y="70" class="s" text-anchor="middle">gzip and brotli</text>
  <text x="198" y="83" class="s" text-anchor="middle">static files</text>
  <text x="198" y="96" class="s" text-anchor="middle">rate limiting</text>
  <text x="198" y="109" class="s" text-anchor="middle">slow client buffering</text>
  <text x="198" y="122" class="s" text-anchor="middle">access logs</text>

  <rect class="b" x="310" y="44" width="148" height="30" rx="4"/>
  <text x="384" y="63" class="l" text-anchor="middle">node :3000</text>
  <rect class="b" x="310" y="84" width="148" height="30" rx="4"/>
  <text x="384" y="103" class="l" text-anchor="middle">node :3001</text>

  <line class="a" x1="86" y1="72" x2="124" y2="72" marker-end="url(#n1)"/>
  <line class="a" x1="268" y1="66" x2="306" y2="59" marker-end="url(#n1)"/>
  <line class="a" x1="268" y1="88" x2="306" y2="99" marker-end="url(#n1)"/>

  <text x="235" y="152" class="s" text-anchor="middle">plain HTTP over loopback, so Node never sees TLS or a slow client</text>
  <text x="235" y="166" class="s" text-anchor="middle">on AWS the ALB does most of this; Nginx still earns its place on an instance</text>
</svg>
:::

- **The slow client problem is the one worth naming.** Nginx buffers a request from a slow mobile connection and hands Node a complete one instantly, so a single event loop is not held open by network latency
