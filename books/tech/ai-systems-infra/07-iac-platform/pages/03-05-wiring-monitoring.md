## Wiring monitoring in

- Observability (Booklet 8) is infrastructure, so it belongs **in the same code that builds the stack** — provisioned on day one, not bolted on after the first incident. If a resource exists, its alarms, dashboards, and log destinations should exist with it, created in the same `apply`. "We'll add monitoring later" is how systems run blind into production.
- What the IaC provisions alongside the resources:
  - **Metric alarms** — a CloudWatch alarm (or a Prometheus `PrometheusRule`) on the RDS CPU, the ALB 5xx rate, the SQS queue depth — defined next to the resource they watch, so you can't add a database without its alarm.
  - **Log destinations** — log groups with **retention set** (unbounded CloudWatch logs are a silent cost leak), and the collector shipping to your backend.
  - **The telemetry pipeline itself** — install the **OpenTelemetry Collector** and metrics stack (Booklet 8) into the cluster via the Helm provider, as code, so every environment emits the same signals the same way.

<svg viewBox="0 0 360 82" role="img" aria-label="The same IaC apply provisions resources and their observability together: each resource gets alarms, log groups with retention, and the OpenTelemetry collector, all versioned in code" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="96" height="24" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="56" y="42" text-anchor="middle" font-size="6">one apply</text><text x="56" y="51" text-anchor="middle" font-size="4.8" fill="#777">resources + telemetry</text>
  <rect x="150" y="8" width="110" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="205" y="20" text-anchor="middle" font-size="5.8">alarms (per resource)</text>
  <rect x="150" y="34" width="110" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="205" y="46" text-anchor="middle" font-size="5.8">log groups + retention</text>
  <rect x="150" y="60" width="110" height="18" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="205" y="72" text-anchor="middle" font-size="5.8">OTel collector (Helm)</text>
  <path d="M104 40 L150 17" stroke="#999" marker-end="url(#wm)"/><path d="M104 42 L150 43" stroke="#999" marker-end="url(#wm)"/><path d="M104 44 L150 69" stroke="#999" marker-end="url(#wm)"/>
  <defs><marker id="wm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- Doing it in code also makes observability **consistent and reviewable**: the same alarm thresholds across all environments, dashboards versioned in git (Grafana dashboards-as-code), and a pull request that *adds a service* and *adds its monitoring* in one reviewable change. When Booklet 8 defines SLOs, their alerts live here too.

### Module 3 — checkpoint
- **Key concepts:** build the Booklet 5 stack as composed modules — **VPC** (`for_each` AZs, `cidrsubnet`, consumer tags) → **EKS** (consumes subnet outputs; control plane + node groups/Karpenter + **OIDC for IRSA**; pin `cluster_version`) → **RDS/ElastiCache (private) + ALB (public) + S3 (block public)** wired by **SG-references** → **IAM least-privilege** via `aws_iam_policy_document` + **IRSA** (no static keys) → **monitoring in the same apply** (alarms, log retention, OTel collector). Split **state** per layer, keep **code** composed.
- **Task + questions:** compose vpc + eks + rds modules into one `envs/dev`, passing the VPC's subnet outputs down; add a least-privilege IRSA role for one pod and an alarm for the database. Why place RDS in private subnets with an SG that references the app SG rather than a CIDR? Why provision alarms in the same code as the resource?
- **Next:** Module 4 — platform engineering (golden paths, policy-as-code, CI/CD, IDPs).
