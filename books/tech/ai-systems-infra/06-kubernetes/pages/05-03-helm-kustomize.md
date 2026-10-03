## Helm and Kustomize

- Real apps are many objects (Deployment, Service, ConfigMap, HPA, Gateway…), and you deploy them to several environments that differ only slightly. Writing full YAML per environment means copy-paste drift. Two tools solve this in **opposite** ways.
- **Helm — templating + packaging.** A **chart** is a bundle of templated YAML plus a `values.yaml`; `helm install` renders the templates with your values and applies the result as a tracked **release** (so `helm upgrade`/`rollback` manage versions). Charts are shareable — most third-party software (Prometheus, cert-manager, ingress controllers) ships as a Helm chart, which is Helm's real strength: **install complex software with one command and a values file**.
- **Kustomize — overlays, no templating.** You write **plain YAML** (a `base`), then per-environment **overlays** that *patch* it — change the replica count for prod, add a label everywhere, swap an image tag. No template language, no `{{ }}`; the manifests are always valid YAML you can read. It's **built into `kubectl`** (`kubectl apply -k`), so there's nothing to install.

<svg viewBox="0 0 360 82" role="img" aria-label="Helm renders templated charts with values into manifests; Kustomize patches a plain-YAML base with per-environment overlays; both output manifests the API server applies" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="150" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="83" y="23" text-anchor="middle" font-size="6">Helm: chart + values.yaml</text><text x="83" y="32" text-anchor="middle" font-size="5" fill="#777">template {{ }} → render</text>
  <rect x="8" y="44" width="150" height="24" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="83" y="55" text-anchor="middle" font-size="6">Kustomize: base + overlay</text><text x="83" y="64" text-anchor="middle" font-size="5" fill="#777">patch plain YAML (no template)</text>
  <rect x="226" y="28" width="126" height="24" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="289" y="40" text-anchor="middle" font-size="6">manifests → API server</text><text x="289" y="49" text-anchor="middle" font-size="5" fill="#777">reconcile as usual</text>
  <path d="M158 24 L226 37" stroke="#999" marker-end="url(#hk)"/><path d="M158 56 L226 43" stroke="#999" marker-end="url(#hk)"/>
  <defs><marker id="hk" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The choice, honestly: **Helm** when you're **packaging software for others** or installing third-party charts — versioned releases and a values interface are worth the template complexity. **Kustomize** when you're **managing your own manifests** across environments and want readable, template-free YAML. They aren't exclusive — a common pattern is Helm for third-party dependencies and Kustomize for your own services, and GitOps tools (next pages) render both.

:::note
Both are just **manifest generators** — their output is the same ordinary objects the API server reconciles (Module 1). Nothing about Helm or Kustomize is "live" in the cluster (Helm's release metadata aside); they produce YAML, the cluster does the rest. That's why you can always `helm template` or `kustomize build` to **see the exact manifests before applying** — the single most useful habit for catching a bad render before it hits prod.
:::
