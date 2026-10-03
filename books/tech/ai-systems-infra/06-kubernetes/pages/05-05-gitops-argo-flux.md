## GitOps

- `kubectl apply` from a laptop is **imperative drift waiting to happen** — no record of who changed what, no review, and the live cluster slowly diverges from any file. **GitOps** closes the loop: **git is the single source of desired state**, and a controller in the cluster continuously reconciles the live cluster to match the repo. It's Module 1's idea pushed up to the whole deployment: desired state lives in git, actual state is the cluster, a loop closes the gap.
- The mechanism is **pull, not push.** Instead of CI running `kubectl apply` *into* the cluster (push — needs cluster credentials in CI, no drift correction), an in-cluster agent — **Argo CD** or **Flux** — **watches the git repo**, renders the manifests (Helm/Kustomize — Module 5.3), and applies any difference. Merge to `main` → the agent notices → the cluster converges.

<svg viewBox="0 0 360 84" role="img" aria-label="GitOps: developers merge manifests to a git repo; an in-cluster agent like Argo CD pulls the repo, compares to live state, and applies the difference, continuously correcting drift" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="78" height="24" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="47" y="42" text-anchor="middle" font-size="6">dev → PR</text><text x="47" y="51" text-anchor="middle" font-size="4.8" fill="#777">review, merge</text>
  <rect x="108" y="30" width="78" height="24" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="147" y="42" text-anchor="middle" font-size="6">git repo</text><text x="147" y="51" text-anchor="middle" font-size="4.8" fill="#777">desired state</text>
  <rect x="208" y="30" width="86" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="251" y="42" text-anchor="middle" font-size="6">Argo CD / Flux</text><text x="251" y="51" text-anchor="middle" font-size="4.8" fill="#777">pull · diff · apply</text>
  <rect x="314" y="30" width="38" height="24" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="333" y="45" text-anchor="middle" font-size="6">cluster</text>
  <path d="M86 42 L108 42" stroke="#1a1a1a" marker-end="url(#gt)"/><path d="M186 42 L208 42" stroke="#1a1a1a" marker-end="url(#gt)"/><path d="M294 42 L314 42" stroke="#1a1a1a" marker-end="url(#gt)"/>
  <path d="M314 50 C280 72, 230 72, 251 56" stroke="#999" stroke-dasharray="2 2" marker-end="url(#gt)"/><text x="265" y="72" text-anchor="middle" font-size="5" fill="#777">detect &amp; correct drift</text>
  <defs><marker id="gt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- What this buys: **git is the audit log and the rollback** (revert the commit, the cluster follows), **review gates every change** (PR approval = deploy approval), and **drift is corrected automatically** — someone `kubectl edit`s the live cluster, the agent notices the divergence from git and reverts it (or flags it). The cluster can't silently drift from what's declared.

### Module 5 — checkpoint
- **Key concepts:** **HPA** (replica count, metric ratio; use **KEDA**/queue depth for events, not CPU) vs **VPA** (right-size requests, recreates pods) — **don't aim both at CPU** · **Cluster Autoscaler** (fixed node groups) vs **Karpenter** (right-sized, spot-aware nodes from pending pods; consolidation = cost lever) · **Helm** (templated, packaged releases) vs **Kustomize** (plain-YAML overlays, in `kubectl`) · **CRD** (new kind = data) + **operator** (controller = the verb; Go/controller-runtime) · **GitOps** (git = desired state; Argo CD/Flux **pull · diff · apply**, auto-correct drift).
- **Task + questions:** deploy via Argo CD from a git repo, then `kubectl edit` the live Deployment and watch it revert; add an HPA and load it to force a scale-out. Why scale a queue worker on depth, not CPU? Why is a CRD without an operator inert?
- **Next:** Module 6 — running it and debugging.
