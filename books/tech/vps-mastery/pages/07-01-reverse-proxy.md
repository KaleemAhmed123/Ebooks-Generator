## What a reverse proxy does

- Containers listen on private ports nobody outside can reach. One process holds 80 and 443 and forwards to them by hostname and path

:::mint
<svg viewBox="0 0 470 250" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="d1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="8" y="20" width="96" height="26" rx="4"/>
  <text x="56" y="37" class="l" text-anchor="middle">example.com</text>

  <rect class="b" x="8" y="60" width="96" height="26" rx="4"/>
  <text x="56" y="77" class="l" text-anchor="middle">api.example.com</text>

  <rect class="b" x="8" y="100" width="96" height="26" rx="4"/>
  <text x="56" y="117" class="l" text-anchor="middle">seller.example.com</text>

  <rect class="c" x="164" y="52" width="96" height="46" rx="4"/>
  <text x="212" y="72" class="l" text-anchor="middle">Nginx</text>
  <text x="212" y="87" class="s" text-anchor="middle">:80 :443</text>

  <line class="a" x1="104" y1="33" x2="160" y2="62" marker-end="url(#d1)"/>
  <line class="a" x1="104" y1="73" x2="160" y2="75" marker-end="url(#d1)"/>
  <line class="a" x1="104" y1="113" x2="160" y2="90" marker-end="url(#d1)"/>

  <text x="316" y="24" class="t">DOCKER NETWORK</text>
  <rect class="b" x="316" y="30" width="146" height="26" rx="4"/>
  <text x="389" y="47" class="l" text-anchor="middle">shop-ui:3000</text>

  <rect class="b" x="316" y="64" width="146" height="26" rx="4"/>
  <text x="389" y="81" class="l" text-anchor="middle">api-gateway:8080</text>

  <rect class="b" x="316" y="98" width="146" height="26" rx="4"/>
  <text x="389" y="115" class="l" text-anchor="middle">seller-ui:3001</text>

  <line class="a" x1="260" y1="66" x2="312" y2="43" marker-end="url(#d1)"/>
  <line class="a" x1="260" y1="75" x2="312" y2="77" marker-end="url(#d1)"/>
  <line class="a" x1="260" y1="86" x2="312" y2="111" marker-end="url(#d1)"/>

  <line class="a" x1="8" y1="150" x2="462" y2="150" stroke-dasharray="3 3"/>
  <text x="235" y="170" class="s" text-anchor="middle">only ports 80 and 443 are open in the firewall</text>
  <text x="235" y="186" class="s" text-anchor="middle">every container port is bound to 127.0.0.1 or not published at all</text>
  <text x="235" y="208" class="s" text-anchor="middle">Nginx also terminates TLS, so containers speak plain HTTP</text>
</svg>
:::

- One public entry point, many private services, and one place to add TLS, rate limits and headers
