## Booklet 5 — what you can now do

- **Secure the account properly**: read the shared-responsibility line per service, write least-privilege IAM, and run on **roles + temporary credentials / OIDC / IRSA** with **no long-lived keys or baked-in secrets**.
- **Design a VPC**: public/private subnets across AZs, IGW vs NAT (and its cost), SG (stateful) vs NACL (stateless) firewalling, and **endpoints/PrivateLink** to keep traffic private and off NAT.
- **Choose compute**: EC2 families + spot, and Lambda vs ECS/Fargate vs EKS — reaching for Kubernetes only when the need (incl. GPU/AI) is real.
- **Place the data & messaging layer**: S3, RDS Multi-AZ/replicas/Aurora, DynamoDB (+Streams/Global Tables), ElastiCache/Valkey, and SQS/SNS/EventBridge — the Booklet 3–4 models as managed services.
- **Operate and secure the baseline**: KMS + Secrets Manager, CloudWatch alarms, ECR scanning.
- **Model cost and design for scale**: resources × time × data-moved (watch **egress/NAT**), cut compute with right-sizing + savings plans + spot + Graviton, and architect a **10M-req/day** system with numbers (Little's Law) behind the boxes.

<svg viewBox="0 0 360 56" role="img" aria-label="The arc: identity, network, compute, data and messaging, operate and secure, cost and scale" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="5.8" fill="#1a1a1a">
  <rect x="6" y="20" width="52" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="32" y="31" text-anchor="middle">IAM</text>
  <rect x="64" y="20" width="52" height="16" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="90" y="31" text-anchor="middle">VPC</text>
  <rect x="122" y="20" width="56" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="150" y="31" text-anchor="middle">compute</text>
  <rect x="184" y="20" width="60" height="16" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="214" y="31" text-anchor="middle">data/msg</text>
  <rect x="250" y="20" width="48" height="16" rx="2" fill="#fbf0dc" stroke="#8a5a00"/><text x="274" y="31" text-anchor="middle">secure</text>
  <rect x="304" y="20" width="50" height="16" rx="2" fill="#dfe9d9" stroke="#2f7d4f"/><text x="329" y="31" text-anchor="middle">cost/scale</text>
</svg>

- **Next booklet:** *Kubernetes — How It Actually Works* — the EKS you just placed, opened up: the control plane and reconcile loop, pods→services→Gateway API, scheduling and autoscaling, operators, and debugging — the platform the AI-serving booklets build on.
