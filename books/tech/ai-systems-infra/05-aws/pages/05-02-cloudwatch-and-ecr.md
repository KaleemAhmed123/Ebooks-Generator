## CloudWatch and ECR

- **CloudWatch** is AWS's built-in observability service — Booklet 8's three pillars, AWS-flavoured:
  - **Metrics** — every AWS service emits them (CPU, latency, queue depth, error counts), and you publish custom ones. **Alarms** watch a metric and fire an action when it crosses a threshold — typically notify an **SNS** topic (paging, Slack) or trigger auto-scaling.
  - **Logs** — log groups collect output from Lambda, ECS/EKS, and your apps; **Logs Insights** queries them. **Container Insights** adds per-pod/container metrics for EKS/ECS.
  - **Dashboards** — assemble metrics into views.
- It's the zero-setup option, and it's where AWS services *already* send their telemetry, so you use it for infrastructure signals regardless. For richer application observability you'll often pair or replace it with the open stack from Booklet 8 — **OpenTelemetry** exporting to CloudWatch **or** to **Amazon Managed Prometheus/Grafana (AMP/AMG)** — but CloudWatch alarms on infra metrics (plus billing alarms, Module 6) are table stakes on day one.
- **ECR** (Elastic Container Registry) is AWS's private **container registry** — where your built images live for ECS/EKS/Lambda to pull. It's **IAM-controlled** (pulls use a role, not a shared password — Module 1), does **image vulnerability scanning** (Booklet 11's supply-chain concern), and supports **lifecycle policies** to prune old tags so the registry doesn't grow without bound. Your CI builds an image and pushes it here (via OIDC, no stored keys — Module 1), and your cluster pulls from here.

:::note
Minimum operational baseline on any real AWS account, assembled from this module and the cost one: **CloudWatch alarms** on the metrics that predict user pain (error rate, p99 latency, queue depth, unhealthy targets) wired to **SNS** paging; a **billing alarm** (Module 6) so a runaway cost is caught in hours, not at the invoice; **ECR scanning** on every pushed image; and secrets from **Secrets Manager**, never from env. None of this is the sophisticated observability of Booklet 8 — it's the floor you set up before launch so the system is operable and won't surprise you on cost or security.
:::

### Module 5 — checkpoint
- **Key concepts:** KMS (managed keys, envelope encryption, behind S3/EBS/RDS encryption) · Secrets Manager (runtime secrets + rotation) vs SSM Parameter Store · fetch-secret-via-role pattern (no baked-in creds) · CloudWatch (metrics/logs/alarms/dashboards, OTel→AMP/AMG) · ECR (private registry, IAM, scanning, lifecycle).
- **Task + questions:** describe how a pod gets a DB password with no secret in its image; then list the four CloudWatch alarms you'd set before launch.
- **Next:** Module 6 — cost and designing for scale.
