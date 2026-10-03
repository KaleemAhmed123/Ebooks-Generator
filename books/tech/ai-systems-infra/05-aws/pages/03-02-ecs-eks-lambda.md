## ECS vs EKS vs Lambda

- Three ways to run your code, trading **control** against **operational burden**:
  - **Lambda** — upload a function; AWS runs it on demand, **scales to zero** when idle and out to thousands on a burst, and you pay per invocation + duration. No servers to manage at all. Limits: a max execution time (**15 minutes**), **cold starts** (first call after idle pays startup latency), and an event-driven model. Perfect for glue, event handlers, cron, spiky/bursty APIs.
  - **ECS** — AWS's own container orchestrator. Simpler than Kubernetes, deeply integrated, and with **Fargate** it's **serverless containers**: you give it a container and CPU/memory, no nodes to patch or scale. Great when you want containers with **minimum ops** and don't need Kubernetes' ecosystem.
  - **EKS** — managed **Kubernetes** (Booklet 6). The most powerful and portable (runs the same anywhere Kubernetes runs), with the richest ecosystem — but the most to operate and learn. The right choice when you need Kubernetes' orchestration, portability, or its ecosystem (operators, service mesh, GPU scheduling for AI — Booklet 9).

<svg viewBox="0 0 360 80" role="img" aria-label="A decision: event-driven or spiky short tasks to Lambda; simple containers low-ops to ECS/Fargate; need Kubernetes portability or ecosystem to EKS" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.6" fill="#1a1a1a">
  <rect x="120" y="6" width="120" height="15" rx="3" fill="#fbf0dc" stroke="#8a5a00"/><text x="180" y="16" text-anchor="middle">what are you running?</text>
  <rect x="8" y="42" width="104" height="30" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="60" y="53" text-anchor="middle">event / spiky / short</text><text x="60" y="63" text-anchor="middle" font-size="6">→ Lambda</text>
  <rect x="128" y="42" width="104" height="30" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="180" y="53" text-anchor="middle">containers, low-ops</text><text x="180" y="63" text-anchor="middle" font-size="6">→ ECS / Fargate</text>
  <rect x="248" y="42" width="104" height="30" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="300" y="53" text-anchor="middle">need Kubernetes</text><text x="300" y="63" text-anchor="middle" font-size="6">→ EKS</text>
  <path d="M160 21 L70 42" stroke="#999" marker-end="url(#ce)"/><path d="M180 21 L180 42" stroke="#999" marker-end="url(#ce)"/><path d="M205 21 L295 42" stroke="#999" marker-end="url(#ce)"/>
  <defs><marker id="ce" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The honest guidance: **don't reach for EKS by default.** Kubernetes is a large operational commitment (Booklet 6 is a whole booklet for a reason). If Lambda or ECS/Fargate covers the need, you ship faster and operate less. Choose **EKS when you genuinely need Kubernetes** — multi-cloud portability, its operator/mesh ecosystem, fine-grained scheduling, or **GPU/AI serving** (Booklets 9–10). This series goes deep on EKS *because* AI infrastructure lives there, not because it's the right tool for every service.
