## The shape of a deployed service

- Almost every service in this booklet has the same layout. Knowing it makes each later piece a labelled box rather than a new idea

:::mint
<svg viewBox="0 0 470 235" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <rect class="b" x="8" y="14" width="74" height="24" rx="4"/>
  <text x="45" y="30" class="l" text-anchor="middle">browser</text>

  <rect class="b" x="104" y="14" width="74" height="24" rx="4"/>
  <text x="141" y="30" class="l" text-anchor="middle">Route 53</text>

  <rect class="b" x="200" y="14" width="84" height="24" rx="4"/>
  <text x="242" y="30" class="l" text-anchor="middle">CloudFront</text>

  <rect class="b" x="306" y="14" width="74" height="24" rx="4"/>
  <text x="343" y="30" class="l" text-anchor="middle">WAF</text>

  <rect class="c" x="402" y="14" width="60" height="24" rx="4"/>
  <text x="432" y="30" class="l" text-anchor="middle">ALB</text>

  <line class="a" x1="82" y1="26" x2="100" y2="26" marker-end="url(#d1)"/>
  <line class="a" x1="178" y1="26" x2="196" y2="26" marker-end="url(#d1)"/>
  <line class="a" x1="284" y1="26" x2="302" y2="26" marker-end="url(#d1)"/>
  <line class="a" x1="380" y1="26" x2="398" y2="26" marker-end="url(#d1)"/>

  <text x="8" y="62" class="t">PRIVATE SUBNETS</text>
  <rect class="b" x="8" y="70" width="128" height="38" rx="4"/>
  <text x="72" y="85" class="l" text-anchor="middle">Nginx + Node</text>
  <text x="72" y="99" class="s" text-anchor="middle">two or more instances</text>

  <rect class="b" x="8" y="122" width="128" height="32" rx="4"/>
  <text x="72" y="142" class="l" text-anchor="middle">queue workers</text>

  <rect class="b" x="172" y="70" width="110" height="28" rx="4"/>
  <text x="227" y="89" class="l" text-anchor="middle">RDS Postgres</text>

  <rect class="b" x="172" y="110" width="110" height="28" rx="4"/>
  <text x="227" y="129" class="l" text-anchor="middle">ElastiCache</text>

  <rect class="b" x="172" y="150" width="110" height="28" rx="4"/>
  <text x="227" y="169" class="l" text-anchor="middle">SQS</text>

  <rect class="b" x="318" y="70" width="144" height="28" rx="4"/>
  <text x="390" y="89" class="l" text-anchor="middle">S3, Secrets Manager</text>

  <rect class="b" x="318" y="110" width="144" height="28" rx="4"/>
  <text x="390" y="129" class="l" text-anchor="middle">CloudWatch, X-Ray</text>

  <line class="a" x1="432" y1="38" x2="432" y2="52"/>
  <line class="a" x1="432" y1="52" x2="72" y2="52"/>
  <line class="a" x1="72" y1="52" x2="72" y2="66" marker-end="url(#d1)"/>
  <line class="a" x1="136" y1="84" x2="168" y2="84" marker-end="url(#d1)"/>
  <line class="a" x1="136" y1="138" x2="168" y2="124" marker-end="url(#d1)"/>
  <line class="a" x1="282" y1="84" x2="314" y2="84" marker-end="url(#d1)"/>

  <text x="235" y="206" class="s" text-anchor="middle">only the load balancer is reachable from the internet</text>
  <text x="235" y="220" class="s" text-anchor="middle">every box below the line lives in a private subnet with no public address</text>
</svg>
:::
