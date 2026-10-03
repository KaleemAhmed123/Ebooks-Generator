## Booklet 6 — what you can now do

- **Reason from the loop, not the CLI**: explain any behaviour as a controller driving **actual → desired** (level-triggered, self-healing), with the **API server** as the only etcd writer and the **kubelet/runtime/kube-proxy** running it on each node.
- **Run workloads correctly**: pick **Deployment / Job / CronJob / DaemonSet / StatefulSet** by lifecycle, expose them with **Services** (ClusterIP → EndpointSlice → kube-proxy), and order helpers with **init** and **native sidecars** (stable 1.33).
- **Keep pods healthy and placed**: set **requests/limits** (CPU throttles, memory OOM-kills) and the **QoS** that follows, wire **readiness vs liveness** correctly, place pods with **affinity/taints/topology spread**, and protect them with a **PDB**.
- **Connect and persist**: the flat **CNI** pod network, **CoreDNS** discovery (mind `ndots`), **Gateway API** for L7 (Ingress is frozen), and **PVC → PV via StorageClass/CSI** for storage.
- **Scale, package, extend, deliver**: **HPA/KEDA** and **VPA**, **Karpenter** for right-sized nodes (the cost lever), **Helm/Kustomize**, **CRDs + operators** (the loop you write), and **GitOps** (git = desired state).
- **Operate it**: **canary/blue-green** rollouts, debug by **status → describe → logs**, and reason about **node and control-plane failure**.

<svg viewBox="0 0 360 54" role="img" aria-label="The arc of the booklet: the model, workloads, config and scheduling, networking and storage, scaling and extending, operating and debugging" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="5.6" fill="#1a1a1a">
  <rect x="4" y="20" width="54" height="16" rx="2" fill="#dde9f8" stroke="#2a5db0"/><text x="31" y="31" text-anchor="middle">the model</text>
  <rect x="62" y="20" width="56" height="16" rx="2" fill="#eaf1fb" stroke="#2a5db0"/><text x="90" y="31" text-anchor="middle">workloads</text>
  <rect x="122" y="20" width="64" height="16" rx="2" fill="#dde9f8" stroke="#2a5db0"/><text x="154" y="31" text-anchor="middle">health/sched</text>
  <rect x="190" y="20" width="62" height="16" rx="2" fill="#eaf1fb" stroke="#2a5db0"/><text x="221" y="31" text-anchor="middle">net/storage</text>
  <rect x="256" y="20" width="54" height="16" rx="2" fill="#dde9f8" stroke="#2a5db0"/><text x="283" y="31" text-anchor="middle">scale/extend</text>
  <rect x="314" y="20" width="42" height="16" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="335" y="31" text-anchor="middle">operate</text>
</svg>

- **Next booklet:** *Infrastructure as Code & Platform Engineering* — stop running `kubectl apply` and `eksctl` by hand. Describe the whole stack from Booklet 5 (VPC → EKS → RDS → LB → IAM) in **Terraform/OpenTofu**, manage state and drift, gate it with policy-as-code, and build the golden paths other teams deploy on. The cluster you now understand becomes a reviewed, versioned artifact.
