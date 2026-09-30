## Preparedness and Frontier Safety Frameworks

- Anthropic's RSP is one of three parallel frameworks; the other frontier labs published their own, broadly convergent in structure. Knowing all three by name is standard for anyone working near frontier models. **[VERIFY current versions]**

<svg viewBox="0 0 360 82" role="img" aria-label="Three lab frameworks sharing the same structure: evaluate capability, gate on thresholds, add safeguards" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="50" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="30" text-anchor="middle" font-size="6.5">Anthropic</text><text x="64" y="44" text-anchor="middle" font-size="6">RSP / ASL</text><text x="64" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">safety levels</text>
  <rect x="126" y="16" width="108" height="50" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="6.5">OpenAI</text><text x="180" y="44" text-anchor="middle" font-size="6">Preparedness</text><text x="180" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tracked categories</text>
  <rect x="242" y="16" width="108" height="50" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="30" text-anchor="middle" font-size="6.5">DeepMind</text><text x="296" y="44" text-anchor="middle" font-size="6">Frontier Safety</text><text x="296" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">critical levels</text>
</svg>

- **OpenAI — Preparedness Framework.** Tracks specific **risk categories** (e.g. cybersecurity, CBRN, model autonomy, persuasion), evaluates models against graded thresholds in each, and requires that risk be mitigated to acceptable levels before deployment — with governance (a safety board) that can block a release.
- **Google DeepMind — Frontier Safety Framework (FSF).** Defines **Critical Capability Levels (CCLs)** — capability thresholds that would pose serious risk — and commits to detecting when a model approaches one and applying mitigations (security, deployment controls) in response.
- **The shared skeleton** across all three: (1) name the dangerous capabilities, (2) **evaluate** models for them on a regular cadence, (3) define **thresholds** that trigger required safeguards, (4) gate training/deployment on meeting them. They differ in specifics and stringency but agree on the core loop — *measure capability, gate on thresholds, escalate safeguards.*
- **Common to all: model autonomy is a named risk category.** Every framework explicitly tracks the agent capabilities of this module — autonomous operation, self-replication, undermining oversight — as among the most serious to monitor.

:::note
The convergence of three independent labs on the same structure — capability evals tied to threshold-gated safeguards — is itself significant: it is the emerging *standard* for governing frontier AI, and likely the template for eventual regulation. For an AI engineer, the practical takeaway is that model releases increasingly come with capability assessments and usage constraints derived from these frameworks, and that "model autonomy" is officially recognized as a frontier risk — validating that the safety engineering in this module is not optional caution but industry-and-governance consensus.
:::
