## EKS in code

- The EKS cluster (Booklet 5/6) is the next layer, and it **consumes the network module's outputs** — the control plane and node groups go in the private subnets you just exported. This is where module composition stops being theory: the cluster literally can't be written without the subnet IDs from the VPC module.
- Three things the cluster module must stand up:
  - **The control plane** — the managed API server + etcd (Booklet 6), placed across the private subnets' AZs for HA.
  - **Node capacity** — a **managed node group** (EKS-managed EC2 with rolling updates) for the baseline, and increasingly **Karpenter** (Booklet 6.5) for right-sized, spot-aware scaling. IaC provisions the node group *and* installs Karpenter's controller + its node-role IAM.
  - **The OIDC provider** — the cluster's identity issuer that makes **IRSA** (IAM Roles for Service Accounts, Booklet 5) work, so pods assume IAM roles with **no static keys**.

:::mint
```hcl
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "${var.env}-platform"
  cluster_version = "1.33"
  subnet_ids      = module.vpc.private_subnet_ids   # ← composition
  enable_irsa     = true
  eks_managed_node_groups = { default = { instance_types = ["m6i.large"], min_size = 2, max_size = 6 } }
}
```
:::

- The `terraform-aws-modules/eks` module is near-universal because standing up EKS by hand means wiring the cluster IAM role, the node IAM role, the OIDC provider, security groups, and the auth config correctly — a lot of sharp edges the module encodes. You pass version, subnets, and node groups; it returns the cluster name, endpoint, and OIDC ARN that the **Kubernetes/Helm providers** then use to install in-cluster components.

:::warn
Pin `cluster_version` and treat upgrades as deliberate. A control-plane upgrade is **one-way** (no downgrade), node groups must stay within the version-skew EKS allows, and bumping it carries API deprecations (Booklet 6's frozen/removed APIs). Letting the version float — or upgrading the control plane without planning the node groups and workload API changes — is how a routine `apply` turns into a cluster-wide incident. Separate state for the cluster (its own `key`, Module 2.4) keeps that blast radius off the network.
:::
