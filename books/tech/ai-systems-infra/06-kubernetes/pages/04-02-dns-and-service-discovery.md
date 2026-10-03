## Cluster DNS and service discovery

- Pods find each other **by name**, not by IP, because IPs change and Services are stable (Module 2.3). A cluster DNS server — **CoreDNS**, running as a Deployment with its own Service — gives every Service a predictable name, and the kubelet points every pod's `/etc/resolv.conf` at it.
- The name scheme is mechanical: a Service `api` in namespace `shop` is **`api.shop.svc.cluster.local`**. Same namespace? just **`api`**. Cross-namespace? **`api.shop`**. CoreDNS resolves that to the Service's ClusterIP, and kube-proxy (Module 1) takes it from there to a pod. A **headless** Service (Module 2) instead returns the pod IPs directly — how `db-0.db.shop.svc.cluster.local` addresses one StatefulSet member.

<svg viewBox="0 0 360 78" role="img" aria-label="A pod resolves a service name through CoreDNS to a ClusterIP, which kube-proxy routes to a pod; the resolv.conf search domains and ndots setting shape the lookup" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="26" width="70" height="24" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="43" y="38" text-anchor="middle" font-size="6">pod</text><text x="43" y="47" text-anchor="middle" font-size="4.8" fill="#777">resolv.conf</text>
  <rect x="104" y="26" width="80" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="144" y="38" text-anchor="middle" font-size="6">CoreDNS</text><text x="144" y="47" text-anchor="middle" font-size="4.8" fill="#777">name → ClusterIP</text>
  <rect x="210" y="26" width="70" height="24" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="245" y="38" text-anchor="middle" font-size="5.6">ClusterIP</text><text x="245" y="47" text-anchor="middle" font-size="4.8" fill="#777">kube-proxy</text>
  <rect x="300" y="26" width="52" height="24" rx="3" fill="#fff" stroke="#888"/><text x="326" y="40" text-anchor="middle" font-size="6">pod</text>
  <path d="M78 38 L104 38" stroke="#1a1a1a" marker-end="url(#dn)"/><path d="M184 38 L210 38" stroke="#1a1a1a" marker-end="url(#dn)"/><path d="M280 38 L300 38" stroke="#1a1a1a" marker-end="url(#dn)"/>
  <text x="180" y="66" text-anchor="middle" font-size="5.4" fill="#777">ndots:5 → short names try search domains first (extra lookups)</text>
  <defs><marker id="dn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The pod's `resolv.conf` has **search domains** (`shop.svc.cluster.local`, `svc.cluster.local`, …) and **`ndots:5`**. `ndots:5` means a name with fewer than 5 dots is treated as *partial* and the search domains are appended and tried **first**. So resolving `api` may try `api.shop.svc.cluster.local`, then `api.svc.cluster.local`, and so on — several queries for one name.

:::warn
That `ndots:5` default (Booklet 2's DNS incident, now in context) is a classic latency and load trap: an **external** name like `api.stripe.com` (3 dots) gets the cluster search domains appended first — four failing cluster lookups before the real one succeeds — multiplying DNS traffic and adding latency to every outbound call. Fixes: use a **fully-qualified name with a trailing dot** (`api.stripe.com.`) to skip the search list, tune `ndots` per pod, or add **NodeLocal DNSCache** to cut CoreDNS load. Under load, CoreDNS is a dependency that can take the cluster down with it.
:::
