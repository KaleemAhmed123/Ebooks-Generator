## The full stack on one box

:::mint
<svg viewBox="0 0 470 290" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .t { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="d1" markerWidth="6" markerHeight="6" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L5,2.5 L0,5 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="c" x="176" y="10" width="118" height="24" rx="4"/>
  <text x="235" y="26" class="l" text-anchor="middle">Nginx :80 :443</text>

  <text x="8" y="52" class="t">EDGE NETWORK</text>
  <rect class="b" x="8" y="58" width="86" height="22" rx="3"/>
  <text x="51" y="73" class="s" text-anchor="middle">shop-ui:3000</text>
  <rect class="b" x="100" y="58" width="86" height="22" rx="3"/>
  <text x="143" y="73" class="s" text-anchor="middle">seller-ui:3001</text>
  <rect class="b" x="192" y="58" width="86" height="22" rx="3"/>
  <text x="235" y="73" class="s" text-anchor="middle">admin-ui:3002</text>
  <rect class="c" x="284" y="58" width="98" height="22" rx="3"/>
  <text x="333" y="73" class="s" text-anchor="middle">api-gateway:8080</text>
  <rect class="b" x="388" y="58" width="74" height="22" rx="3"/>
  <text x="425" y="73" class="s" text-anchor="middle">chat:6010</text>

  <line class="a" x1="200" y1="34" x2="60" y2="54" marker-end="url(#d1)"/>
  <line class="a" x1="220" y1="34" x2="150" y2="54" marker-end="url(#d1)"/>
  <line class="a" x1="240" y1="34" x2="238" y2="54" marker-end="url(#d1)"/>
  <line class="a" x1="260" y1="34" x2="325" y2="54" marker-end="url(#d1)"/>
  <line class="a" x1="280" y1="34" x2="418" y2="54" marker-end="url(#d1)"/>

  <text x="8" y="100" class="t">INTERNAL NETWORK &nbsp;·&nbsp; no route to the internet</text>
  <rect class="b" x="8" y="106" width="88" height="20" rx="3"/>
  <text x="52" y="120" class="s" text-anchor="middle">auth</text>
  <rect class="b" x="100" y="106" width="88" height="20" rx="3"/>
  <text x="144" y="120" class="s" text-anchor="middle">catalog</text>
  <rect class="b" x="192" y="106" width="88" height="20" rx="3"/>
  <text x="236" y="120" class="s" text-anchor="middle">orders</text>
  <rect class="b" x="284" y="106" width="88" height="20" rx="3"/>
  <text x="328" y="120" class="s" text-anchor="middle">payments</text>
  <rect class="b" x="376" y="106" width="86" height="20" rx="3"/>
  <text x="419" y="120" class="s" text-anchor="middle">shipping</text>

  <rect class="b" x="8" y="132" width="88" height="20" rx="3"/>
  <text x="52" y="146" class="s" text-anchor="middle">sellers</text>
  <rect class="b" x="100" y="132" width="88" height="20" rx="3"/>
  <text x="144" y="146" class="s" text-anchor="middle">payouts</text>
  <rect class="b" x="192" y="132" width="88" height="20" rx="3"/>
  <text x="236" y="146" class="s" text-anchor="middle">notifications</text>
  <rect class="b" x="284" y="132" width="88" height="20" rx="3"/>
  <text x="328" y="146" class="s" text-anchor="middle">admin</text>
  <rect class="b" x="376" y="132" width="86" height="20" rx="3"/>
  <text x="419" y="146" class="s" text-anchor="middle">logger</text>

  <line class="a" x1="333" y1="80" x2="240" y2="102" marker-end="url(#d1)"/>
  <line class="a" x1="333" y1="80" x2="330" y2="102" marker-end="url(#d1)"/>
  <line class="a" x1="333" y1="80" x2="150" y2="102" marker-end="url(#d1)"/>

  <text x="8" y="176" class="t">STATEFUL &nbsp;·&nbsp; the only things worth backing up</text>
  <rect class="b" x="8" y="182" width="106" height="24" rx="3"/>
  <text x="61" y="198" class="s" text-anchor="middle">postgres:5432</text>
  <rect class="b" x="122" y="182" width="106" height="24" rx="3"/>
  <text x="175" y="198" class="s" text-anchor="middle">redis:6379</text>
  <rect class="b" x="236" y="182" width="106" height="24" rx="3"/>
  <text x="289" y="198" class="s" text-anchor="middle">rabbitmq:5672</text>
  <rect class="b" x="350" y="182" width="112" height="24" rx="3"/>
  <text x="406" y="198" class="s" text-anchor="middle">minio:9000</text>

  <line class="a" x1="236" y1="152" x2="90" y2="178" marker-end="url(#d1)"/>
  <line class="a" x1="236" y1="152" x2="180" y2="178" marker-end="url(#d1)"/>
  <line class="a" x1="236" y1="152" x2="285" y2="178" marker-end="url(#d1)"/>

  <text x="235" y="232" class="s" text-anchor="middle">15 application containers, 4 stateful ones, 1 proxy</text>
  <text x="235" y="246" class="s" text-anchor="middle">nothing but Nginx publishes a port to the host</text>
  <text x="235" y="260" class="s" text-anchor="middle">the internal network is marked internal, so a breach cannot call out</text>
  <text x="235" y="274" class="s" text-anchor="middle">needs 8 GB to run, 16 GB to deploy without stopping</text>
</svg>
:::
