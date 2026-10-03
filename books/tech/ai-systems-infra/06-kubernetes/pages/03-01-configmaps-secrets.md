# Config, Health, Scheduling

## ConfigMaps and Secrets

- Config doesn't belong in the image — you'd rebuild to change a flag, and you'd bake credentials into a layer. Kubernetes keeps config as **separate API objects** you inject at runtime, so the same image runs in dev, stage, and prod with different config.
- **ConfigMap** — non-secret key/value config. A pod consumes it **two ways**: as **environment variables**, or **mounted as files** in a directory (each key becomes a file). The difference matters for updates: a **mounted** ConfigMap is **updated in place** when you change it (the kubelet refreshes the file, with a short delay), but **env vars are fixed at container start** — they only change on a pod restart.
- **Secret** — the same shape, for sensitive values (tokens, keys, certs). The critical caveat: a Secret is only **base64-encoded, not encrypted** — base64 is encoding, trivially reversible, not security. By default it sits in etcd readable by anyone with etcd or API access.

<svg viewBox="0 0 360 82" role="img" aria-label="A ConfigMap and Secret are injected into a pod as environment variables or mounted files; secrets are base64 in etcd unless encryption at rest and RBAC are enabled" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="96" height="22" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="56" y="28" text-anchor="middle" font-size="6.2">ConfigMap</text>
  <rect x="8" y="46" width="96" height="22" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="56" y="60" text-anchor="middle" font-size="6.2">Secret (base64)</text>
  <rect x="150" y="14" width="96" height="22" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="198" y="28" text-anchor="middle" font-size="6">env vars (fixed at start)</text>
  <rect x="150" y="46" width="96" height="22" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="198" y="60" text-anchor="middle" font-size="6">mounted files (hot update)</text>
  <rect x="286" y="30" width="66" height="22" rx="3" fill="#fff" stroke="#888"/><text x="319" y="44" text-anchor="middle" font-size="6">pod</text>
  <path d="M104 25 L150 25" stroke="#999" marker-end="url(#g1)"/><path d="M104 57 L150 57" stroke="#999" marker-end="url(#g1)"/>
  <path d="M246 25 L286 38" stroke="#999" marker-end="url(#g1)"/><path d="M246 57 L286 44" stroke="#999" marker-end="url(#g1)"/>
  <defs><marker id="g1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

:::warn
Treating Secrets as secure out of the box is the mistake. To actually protect them you must: enable **encryption at rest** for Secrets in etcd (a KMS provider, Booklet 5/11), lock down **RBAC** so few principals can read them, and avoid committing them to git. Teams increasingly skip native Secrets for an **external store** (Vault, AWS Secrets Manager) pulled in via the Secrets Store CSI driver or External Secrets Operator — covered in Booklet 11. For now: **base64 is not encryption.**
:::
