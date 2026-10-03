## Internal developer platforms

- The golden path (Module 4.1) needs a **front door** — somewhere developers *use* it without reading the platform team's docs. An **Internal Developer Platform (IDP)** is that self-service layer: a portal to scaffold a service, see what you own, and reach the paved road through a UI instead of a wiki. **Backstage** — open-sourced by Spotify, now a **CNCF incubating** project — is the common implementation.
- Three capabilities do the real work:
  - **Software templates (the scaffolder)** — pick "new service," answer a few prompts, and it **generates a git repo** pre-wired to the golden path: the CI pipeline, the Terraform/Helm wiring, observability, and ownership metadata — the Module 4.1 bundle, instantiated in one click.
  - **Service catalog** — a live inventory of every service, owner, dependencies, and health: the answer to "what do we run and who's on call," which no console gives you.
  - **TechDocs** — docs-as-code rendered next to each service.

<svg viewBox="0 0 360 80" role="img" aria-label="A developer uses the portal to pick a template, which scaffolds a repo wired to the golden path and registers it in the service catalog with ownership and docs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="72" height="22" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="44" y="41" text-anchor="middle" font-size="6">developer</text><text x="44" y="49" text-anchor="middle" font-size="4.8" fill="#777">portal</text>
  <rect x="104" y="30" width="86" height="22" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="147" y="41" text-anchor="middle" font-size="6">template</text><text x="147" y="49" text-anchor="middle" font-size="4.8" fill="#777">scaffold repo</text>
  <rect x="216" y="8" width="136" height="18" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="284" y="20" text-anchor="middle" font-size="5.8">repo on golden path (CI, IaC, obs)</text>
  <rect x="216" y="32" width="136" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="284" y="44" text-anchor="middle" font-size="5.8">catalog: owner, deps, health</text>
  <rect x="216" y="56" width="136" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="284" y="68" text-anchor="middle" font-size="5.8">TechDocs</text>
  <path d="M80 41 L104 41" stroke="#1a1a1a" marker-end="url(#id)"/><path d="M190 38 L216 17" stroke="#999" marker-end="url(#id)"/><path d="M190 41 L216 41" stroke="#999" marker-end="url(#id)"/><path d="M190 44 L216 65" stroke="#999" marker-end="url(#id)"/>
  <defs><marker id="id" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The honest caveat: **an IDP is only worth it once the paved road exists.** Backstage is a portal *over* your golden paths and automation — stand it up first and you get an empty catalog and a maintenance burden. Small orgs get most of the value from a good template repo; the portal earns its keep when team count makes "which services exist and who owns them" genuinely hard to answer.

### Module 4 — checkpoint
- **Key concepts:** **platform engineering** = internal platform as a **product**, metric = **cognitive load** · **golden path** = paved (easiest), not walled (only); bundles CI + IaC + obs + security defaults · **policy as code** (OPA/Rego, Conftest, Checkov/tfsec) = guardrails that **fail the PR** between plan and apply; same OPA at K8s admission · **CI/CD for infra** = **plan-on-PR → apply-on-merge**, pipeline assumes a **scoped role via OIDC** (no static keys), scheduled **drift detection**, human gate on prod · **IDP/Backstage** (CNCF incubating) = portal over the road (scaffolder, catalog, TechDocs), worth it only once the road exists.
- **Task + questions:** add the Module 4.2 policy check and a plan-on-PR workflow to your Module 3 stack; scaffold a second service from a template. Why is "paved, not walled" the design rule? Why must the pipeline role use OIDC, not stored keys?
- **Next:** the Booklet close.
