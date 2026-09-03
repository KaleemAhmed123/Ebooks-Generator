## Mutation Testing

Introducing small faults into the source — flipping `<` to `<=`, deleting a
statement — and re-running the suite. A mutant the tests catch is *killed*; one
that survives means no assertion depended on that line behaving correctly.

Stryker reports a mutation score of `detected / valid * 100`, where detected
counts killed mutants plus timeouts and valid excludes mutants that failed to
compile. It answers the question coverage cannot: did the tests notice?

**The cost is multiplicative.** Every mutant re-runs the tests covering it, so an
unfiltered run is the suite's runtime times the number of mutants — a nightly
job, never a pull-request gate.

## NAT Gateway Cost

Private subnets reach the internet through a NAT gateway, which charges an
hourly rate *and* a per-GB fee on everything passing through — $0.045 per hour
plus $0.045 per GB processed (AWS list price, us-east-2, 2026).

A service pulling 8 TB of container images a month pays roughly $360 in
processing alone, which can exceed the cost of the compute doing the pulling.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Traffic from a private subnet to the internet passes through a NAT gateway charged per hour and per gigabyte, while traffic to S3 and ECR can instead take a gateway VPC endpoint that carries no hourly or per-gigabyte charge.">
  <rect x="4" y="15" width="100" height="58" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="48" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">private subnet</text>
  <path d="M104 28 H132" stroke="#1a1a1a" stroke-width="1.2"/><path d="M132 28 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="136" y="15" width="150" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="146" y="26" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">NAT gateway</text>
  <text x="146" y="36" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">$0.045/hr + $0.045/GB</text>
  <path d="M286 28 H320" stroke="#1a1a1a" stroke-width="1.2"/><path d="M320 28 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="326" y="31" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">internet</text>
  <path d="M104 60 H132" stroke="#0d7a7a" stroke-width="1.2"/><path d="M132 60 l-7 -4 v8 z" fill="#0d7a7a"/>
  <rect x="136" y="47" width="150" height="26" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="146" y="58" font-family="Consolas,monospace" font-size="8.5" fill="#0d7a7a">gateway VPC endpoint</text>
  <text x="146" y="68" font-family="Georgia,serif" font-size="8.5" fill="#0d7a7a">no hourly, no per-GB charge</text>
  <path d="M286 60 H320" stroke="#0d7a7a" stroke-width="1.2"/><path d="M320 60 l-7 -4 v8 z" fill="#0d7a7a"/>
  <text x="326" y="63" font-family="Georgia,serif" font-size="9" fill="#0d7a7a">S3 · DynamoDB</text>
</svg>

**The per-GB fee applies to traffic that never leaves AWS.** Pulling from S3 or
ECR through NAT is billed as processed data exactly like internet traffic.
