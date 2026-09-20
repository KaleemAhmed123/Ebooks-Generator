## Correlated failure in practice

- AWS us-east-1, the night of 19–20 October 2025. AWS's own account: a race between two automated DNS updaters left the regional DynamoDB endpoint with an empty DNS record
- DynamoDB was unreachable by name for about three hours. Everything that depended on it, and everything that depended on *that*, followed

<svg viewBox="0 0 460 108" role="img" aria-label="Dependency graph: DynamoDB DNS at the root; DynamoDB, then EC2 launches, NLB health checks, Lambda, STS and customer services fan out below it, each failing because the one above did" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="170" y="4" width="120" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="230" y="19" text-anchor="middle">DynamoDB DNS record</text>
  <path d="M230 26 L230 38" stroke="#1a1a1a"/><path d="M230 38 l-4 -7 h8 z" fill="#1a1a1a"/>
  <rect x="180" y="40" width="100" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="230" y="54" text-anchor="middle">DynamoDB</text>
  <path d="M230 60 L60 74" stroke="#1a1a1a" fill="none"/><path d="M60 74 l7 -4 v6 z" fill="#1a1a1a"/>
  <path d="M230 60 L175 74" stroke="#1a1a1a" fill="none"/><path d="M175 74 l7 -4 v6 z" fill="#1a1a1a"/>
  <path d="M230 60 L285 74" stroke="#1a1a1a" fill="none"/><path d="M285 74 l-7 -4 v6 z" fill="#1a1a1a"/>
  <path d="M230 60 L400 74" stroke="#1a1a1a" fill="none"/><path d="M400 74 l-7 -4 v6 z" fill="#1a1a1a"/>
  <rect x="10" y="76" width="100" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="60" y="90" text-anchor="middle">EC2 launches</text>
  <rect x="125" y="76" width="100" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="175" y="90" text-anchor="middle">NLB health checks</text>
  <rect x="235" y="76" width="100" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="285" y="90" text-anchor="middle">Lambda · STS</text>
  <rect x="350" y="76" width="100" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="400" y="90" text-anchor="middle" fill="#6b6b6b">your service</text>
  <text x="230" y="106" text-anchor="middle" fill="#6b6b6b" font-size="8.5">one empty record · ~14 hours of knock-on impact</text>
</svg>

- The internal systems that launch EC2 instances kept state in DynamoDB. They fell behind, and launches failed until early afternoon
- Network load balancer health checks flapped for hours as the instances behind them came and went. Lambda, container services, and the identity service that issues credentials all degraded in turn

### What the graph shows

- Nobody who built on "EC2 plus a load balancer" thought they had a hard dependency on one DNS record for a database they did not use. They did
- Availability arithmetic needs the *whole* graph. Every edge is a multiplication. The edges you did not draw multiply anyway
- Multi-zone did not help: the failed component was regional. Independence has to be checked at every layer, not asserted at the top

### The failure

- "We're in three availability zones" as the complete answer to "what happens if AWS has a bad day". Three zones share a region's control plane. The 2025 event was a control-plane failure
- The fix is not "avoid AWS". It is knowing which of your dependencies are regional, and having an answer for the day one of them is gone
