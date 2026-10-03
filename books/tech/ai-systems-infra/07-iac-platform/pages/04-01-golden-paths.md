# Platform Engineering

## Golden paths

- Once infra is code, a new problem appears: **every team writes their own**, and you get fifty subtly-different VPCs, ten ways to ship a service, and no one who understands all of them. **Platform engineering** treats the internal platform as a **product** whose customers are your own developers — and its core deliverable is the **golden path** (the "paved road"): the supported, opinionated, mostly self-service way to do a common thing.
- A golden path for "ship a new service" bundles the decisions a product team shouldn't have to re-make: a repo scaffold, a CI pipeline, a Deployment + Service + Gateway route (Booklet 6), observability wired in (Booklet 8), sensible IAM and network defaults (Booklet 5), and the modules from this booklet underneath. The developer fills in a name and their code; the platform supplies everything else, correctly.

<svg viewBox="0 0 360 86" role="img" aria-label="Without a golden path each team wires infra, CI, security and observability themselves, inconsistently; with a golden path the platform provides a paved road and teams fill in only their service" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="160" height="66" rx="4" fill="#f6f4fa" stroke="#c0392b"/><text x="88" y="25" text-anchor="middle" font-size="6.2" fill="#c0392b">no paved road</text><text x="88" y="40" text-anchor="middle" font-size="5.6">each team re-wires it all</text><text x="88" y="52" text-anchor="middle" font-size="5.6">50 snowflakes, no owner</text><text x="88" y="66" text-anchor="middle" font-size="5.2" fill="#777">high cognitive load</text>
  <rect x="192" y="12" width="160" height="66" rx="4" fill="#e6f0e9" stroke="#2f7d4f"/><text x="272" y="25" text-anchor="middle" font-size="6.2" fill="#2f7d4f">golden path</text><text x="272" y="40" text-anchor="middle" font-size="5.6">platform supplies the road</text><text x="272" y="52" text-anchor="middle" font-size="5.6">team fills in its service</text><text x="272" y="66" text-anchor="middle" font-size="5.2" fill="#777">consistent, secure by default</text>
</svg>

- The design principle is **"paved, not walled."** A golden path is the **easiest** way, not the only way — the 80% of cases it covers get speed and safety for free, and teams with a genuine edge case can step off the road (with support, and owning the consequences). Mandating the path for everything makes the platform a bottleneck everyone routes around; making it the path of least resistance makes teams *choose* it.
- The payoff is **cognitive load** (the real platform-engineering metric): a product engineer should reason about their service, not relearn VPC CIDRs, IAM trust policies, and Helm values to ship a CRUD API. The platform encodes that expertise once so every team inherits it.

:::note
Platform engineering is **DevOps' answer to its own failure mode**. "You build it, you run it" gave every team full-stack ownership — and buried product engineers under Kubernetes, Terraform, IAM, and observability. The platform team's job isn't to take ownership back (that's the old central-ops silo); it's to **build the paved road** so teams keep ownership but with far less to carry. The golden path is the product; developer experience is the metric.
:::
