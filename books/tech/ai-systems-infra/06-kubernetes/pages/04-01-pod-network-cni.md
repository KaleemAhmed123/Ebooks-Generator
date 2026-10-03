# Networking and Storage

## The pod network and CNI

- Kubernetes mandates one flat networking model, and everything else builds on it: **every pod gets its own routable IP**, and **every pod can reach every other pod directly — no NAT** (Booklet 2), across nodes. A pod sees the same IP that others use to reach it. No port-mapping, no "which host am I on" — the pod network is flat.
- Kubernetes doesn't *implement* this itself; it defines the **CNI** (Container Network Interface) and delegates to a **plugin** that wires each pod's network namespace to the cluster network when the pod starts. Swapping the plugin changes *how* the flat network is built without changing the model.

<svg viewBox="0 0 360 94" role="img" aria-label="Two nodes each run pods with their own IPs; the CNI plugin connects them so any pod reaches any pod directly, either by native routing or an overlay tunnel between nodes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="16" width="150" height="66" rx="5" fill="#f3f7fc" stroke="#2a5db0"/><text x="20" y="28" font-size="6" fill="#2a5db0">node A</text>
  <rect x="24" y="36" width="58" height="18" rx="2" fill="#fff" stroke="#888"/><text x="53" y="48" text-anchor="middle" font-size="5.6">pod 10.1.1.2</text>
  <rect x="88" y="36" width="58" height="18" rx="2" fill="#fff" stroke="#888"/><text x="117" y="48" text-anchor="middle" font-size="5.6">pod 10.1.1.3</text>
  <text x="85" y="72" text-anchor="middle" font-size="5.4" fill="#777">CNI plugin (bridge/eBPF)</text>
  <rect x="200" y="16" width="150" height="66" rx="5" fill="#f3f7fc" stroke="#2a5db0"/><text x="210" y="28" font-size="6" fill="#2a5db0">node B</text>
  <rect x="214" y="36" width="58" height="18" rx="2" fill="#fff" stroke="#888"/><text x="243" y="48" text-anchor="middle" font-size="5.6">pod 10.1.2.2</text>
  <rect x="278" y="36" width="58" height="18" rx="2" fill="#fff" stroke="#888"/><text x="307" y="48" text-anchor="middle" font-size="5.6">pod 10.1.2.3</text>
  <text x="275" y="72" text-anchor="middle" font-size="5.4" fill="#777">CNI plugin (bridge/eBPF)</text>
  <path d="M160 49 L200 49" stroke="#1a1a1a" marker-end="url(#cn)"/><text x="180" y="44" text-anchor="middle" font-size="5" fill="#777">route / overlay</text>
  <defs><marker id="cn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Two ways plugins connect nodes: **native routing** (pod CIDRs are real routes in the underlying network — the **AWS VPC CNI** gives pods actual VPC IPs, Booklet 5) or an **overlay** that encapsulates pod packets in node-to-node tunnels (VXLAN) when the underlay can't route pod IPs. Native is faster and visible to the cloud; overlay is portable and independent of the network.
- **Cilium** builds the network (and replaces kube-proxy) with **eBPF** (Booklet 1) — programs attached to kernel hooks do routing, load-balancing, and policy without iptables, which is why it scales and why its observability (Hubble) and NetworkPolicy (Booklet 11) are first-class. It's the de-facto direction for new clusters in 2026.

:::note
The flat "every pod routable, no NAT" model is what makes Services, DNS, and mesh work simply — but on a native-routing CNI it means **pods consume real IPs from your VPC**, and a big cluster can **exhaust a subnet's address space**. Sizing pod CIDRs / VPC subnets for peak pod count is a real planning step (Booklet 5/7), and "pods stuck `ContainerCreating` with IP-allocation errors" is the symptom of getting it wrong.
:::
