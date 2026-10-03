## RDS, ElastiCache, ALB, S3 in code

- The data and edge layers (Booklet 5's RDS, ElastiCache, load balancers, S3) complete the stack, and they all **hang off the same network outputs** — private subnets for the stateful services, security groups for who-can-reach-what. Written as code, the whole system becomes one reviewable graph instead of a dozen consoles.
- The wiring that matters:
  - **RDS** — a `db_subnet_group` built from the **private** subnet IDs (never public), **Multi-AZ** for failover, and the password handled by `manage_master_user_password` so it lives in Secrets Manager, not state (Module 2.6).
  - **ElastiCache (Valkey/Redis)** — same private-subnet placement, its own subnet group and SG.
  - **ALB** — in the **public** subnets, with a security group and target groups; or, in a Kubernetes world, created *for* you by the AWS Load Balancer Controller reacting to a Gateway/Service (Booklet 6).
  - **S3** — buckets with versioning, encryption, and public-access-block **on by default** in code, so "a public bucket" (Booklet 5's top incident) can't happen by accident.

<svg viewBox="0 0 360 96" role="img" aria-label="The network module's outputs feed the cluster, database, cache, load balancer and S3 modules, composing one dependency graph; security groups gate traffic between tiers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="6" width="100" height="18" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="180" y="18" text-anchor="middle" font-size="6">module.vpc (outputs)</text>
  <rect x="8" y="42" width="78" height="20" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="47" y="55" text-anchor="middle" font-size="5.8">EKS (private)</text>
  <rect x="94" y="42" width="78" height="20" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="133" y="52" text-anchor="middle" font-size="5.8">RDS Multi-AZ</text><text x="133" y="60" text-anchor="middle" font-size="4.6" fill="#777">private</text>
  <rect x="180" y="42" width="78" height="20" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="219" y="52" text-anchor="middle" font-size="5.8">ElastiCache</text><text x="219" y="60" text-anchor="middle" font-size="4.6" fill="#777">private</text>
  <rect x="266" y="42" width="86" height="20" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="309" y="52" text-anchor="middle" font-size="5.8">ALB (public)</text>
  <rect x="266" y="70" width="86" height="18" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="309" y="82" text-anchor="middle" font-size="5.8">S3 (block public)</text>
  <path d="M160 24 L60 42" stroke="#999" marker-end="url(#rc)"/><path d="M168 24 L133 42" stroke="#999" marker-end="url(#rc)"/><path d="M192 24 L219 42" stroke="#999" marker-end="url(#rc)"/><path d="M205 24 L300 42" stroke="#999" marker-end="url(#rc)"/>
  <defs><marker id="rc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Security groups are the edges of this graph, and they're easy to express well in code.** Reference one SG from another — "the DB SG allows 5432 **only from the app SG**" (`source_security_group_id`) — instead of hardcoding CIDRs. The least-privilege network from Booklet 5 becomes a few readable rules a reviewer can verify, and there's no "temporarily opened 0.0.0.0/0 and forgot."

:::note
This is the whole stack as **one `apply`**: network → cluster → data → edge, each layer consuming the last's outputs. Split the *state* by layer (Module 2.4) so a database change can't endanger the network, but keep the *code* composed so standing up a new environment (or a new region for DR, Booklet 12) is running the same modules with a different `.tfvars`. That reproducibility — a second region in an afternoon — is the payoff IaC exists for.
:::
