## On the node

- The control plane decides; the **node** runs. Every worker node runs three things that turn "this pod belongs here" into a live process (Booklet 1's container = namespaced, cgroup-limited process).

<svg viewBox="0 0 360 100" role="img" aria-label="On a node: kubelet watches the API server and drives the container runtime via CRI to start pods; kube-proxy programs the kernel for service routing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="40" width="80" height="20" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="46" y="53" text-anchor="middle" font-size="6.4">API server</text>
  <rect x="120" y="8" width="230" height="84" rx="4" fill="#f7f9fc" stroke="#2a5db0"/><text x="130" y="20" font-size="6.2" fill="#2a5db0">node</text>
  <rect x="132" y="26" width="92" height="20" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="178" y="39" text-anchor="middle" font-size="6.4">kubelet (agent)</text>
  <rect x="132" y="54" width="92" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="178" y="63" text-anchor="middle" font-size="5.8">containerd</text><text x="178" y="71" text-anchor="middle" font-size="5" fill="#777">(runtime, via CRI)</text>
  <rect x="244" y="54" width="94" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="291" y="63" text-anchor="middle" font-size="5.8">kube-proxy</text><text x="291" y="71" text-anchor="middle" font-size="5" fill="#777">(service routing)</text>
  <rect x="244" y="26" width="94" height="20" rx="3" fill="#fff" stroke="#888"/><text x="291" y="39" text-anchor="middle" font-size="6">pods (processes)</text>
  <path d="M86 50 L132 36" stroke="#999" marker-end="url(#n3)"/>
  <path d="M178 46 L178 54" stroke="#1a1a1a" marker-end="url(#n3)"/>
  <path d="M224 60 L244 36 L244 36" stroke="#999" marker-end="url(#n3)"/><path d="M224 36 L244 36" stroke="#999" marker-end="url(#n3)"/>
  <defs><marker id="n3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **kubelet** — the node's agent and its own little reconcile loop. It watches the API server for pods assigned to its node, then tells the container runtime to start them, mounts their volumes, runs their probes (Module 3), and reports status back. If a container dies, the kubelet restarts it per the pod's `restartPolicy` — node-local self-healing, below the Deployment.
- **Container runtime** — the thing that actually creates the container. The kubelet speaks to it through the **CRI** (Container Runtime Interface, a stable gRPC API), so the runtime is pluggable; **containerd** is the common default. (Docker-the-daemon was removed as a runtime in K8s 1.24; containerd runs the same OCI images.)
- **kube-proxy** — programs the node's kernel so that traffic to a Service's virtual IP is load-balanced to the right pod IPs (Module 4). Classic mode writes **iptables** rules — **O(n)** in Service count, evaluated in sequence.

:::note
kube-proxy has an **nftables** backend, **GA since Kubernetes 1.33**, that dispatches in roughly **O(1)** using verdict maps instead of a linear rule chain — a real win on clusters with thousands of Services. As of v1.36 **iptables is still the default** for compatibility; nftables is opt-in (`--proxy-mode nftables`). Many CNI plugins (Cilium — Module 4) replace kube-proxy with eBPF entirely.
:::
