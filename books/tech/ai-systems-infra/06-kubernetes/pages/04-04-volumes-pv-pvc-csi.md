## Volumes, PV/PVC, StorageClass, CSI

- A container's filesystem is **ephemeral** — it dies with the container, and even a restart starts fresh. Kubernetes volumes add persistence, and the key is **decoupling the claim from the storage** so app teams ask for disk without knowing what's underneath.
- The simplest volume, **`emptyDir`**, lives as long as the *pod* — scratch space shared between containers, gone when the pod is deleted. For data that must **outlive the pod**, Kubernetes splits the concern in two:
  - **PersistentVolume (PV)** — the *actual* storage (an EBS volume, an NFS share — Booklet 5), cluster-scoped.
  - **PersistentVolumeClaim (PVC)** — a *request* for storage ("I need 20Gi, ReadWriteOnce") that a pod mounts. The claim binds to a PV that satisfies it. The pod references the **claim**, never the disk.

<svg viewBox="0 0 360 80" role="img" aria-label="A pod mounts a PersistentVolumeClaim, which a StorageClass dynamically provisions into a PersistentVolume via a CSI driver that creates the real cloud disk" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="28" width="60" height="24" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="38" y="43" text-anchor="middle" font-size="6">pod</text>
  <rect x="88" y="28" width="68" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="122" y="40" text-anchor="middle" font-size="6">PVC</text><text x="122" y="49" text-anchor="middle" font-size="4.6" fill="#777">20Gi RWO</text>
  <rect x="176" y="28" width="80" height="24" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="216" y="40" text-anchor="middle" font-size="5.8">StorageClass</text><text x="216" y="49" text-anchor="middle" font-size="4.6" fill="#777">CSI driver</text>
  <rect x="276" y="28" width="76" height="24" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="314" y="40" text-anchor="middle" font-size="5.8">PV = EBS vol</text><text x="314" y="49" text-anchor="middle" font-size="4.6" fill="#777">real disk</text>
  <path d="M68 40 L88 40" stroke="#1a1a1a" marker-end="url(#pv)"/><path d="M156 40 L176 40" stroke="#999" marker-end="url(#pv)"/><path d="M256 40 L276 40" stroke="#999" marker-end="url(#pv)"/>
  <text x="180" y="70" text-anchor="middle" font-size="5.4" fill="#777">claim → provision on demand → bind</text>
  <defs><marker id="pv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **StorageClass + CSI** make this automatic. A **StorageClass** names a *kind* of storage (gp3 SSD, throughput-optimised). When a PVC asks for a class, a **CSI driver** (Container Storage Interface — the pluggable storage API, mirroring CNI for networking) **dynamically provisions** a real volume and creates the PV — no admin pre-creating disks. StatefulSets (Module 2) use this via `volumeClaimTemplates` to give each pod its own volume.
- Two fields decide behaviour: **access mode** — `ReadWriteOnce` (one node; most block storage, incl. EBS), `ReadWriteMany` (many nodes; needs a shared FS like EFS/NFS); and **reclaim policy** — `Delete` (volume dies with the PVC) vs `Retain` (kept for recovery).

### Module 4 — checkpoint
- **Key concepts:** flat pod network — **every pod routable, no NAT**, built by a **CNI** plugin (native routing vs overlay; **Cilium/eBPF** replaces kube-proxy) · **CoreDNS** resolves `svc.ns.svc.cluster.local`; **ndots:5** amplifies external lookups · **Gateway API** is the ingress standard (Ingress frozen; Ingress-NGINX retires Mar 31 2026) with role-split **GatewayClass/Gateway/HTTPRoute** · storage: **PVC** (claim) binds **PV** (disk) via **StorageClass + CSI**; access modes (RWO/RWX) and reclaim (Delete/Retain).
- **Task + questions:** expose a Deployment through a Gateway + HTTPRoute; mount a dynamically-provisioned PVC and prove data survives a pod delete. Why does `ndots:5` slow external DNS? Why can't two pods on different nodes share one RWO EBS volume?
- **Next:** Module 5 — scaling, packaging, and extending Kubernetes.
