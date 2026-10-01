## Machine unlearning

- The strongest safety case is **incapability** (18-28): you cannot misuse what the model does not know. **Machine unlearning** tries to *remove* specific knowledge or capability from a trained model — hazardous CBRN know-how, copyrighted text, a person's private data — without retraining from scratch and without wrecking the model's general ability.
- The target is a clean cut: the hazardous knowledge drops toward chance, general capability stays flat.

<svg viewBox="0 0 340 80" role="img" aria-label="Before unlearning both hazardous and general scores are high; after, hazardous drops while general is preserved" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="62" x2="316" y2="62" stroke="#888"/>
  <text x="90" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">before</text><text x="240" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">after unlearning</text>
  <rect x="60" y="20" width="24" height="42" fill="#a03050"/><text x="72" y="16" text-anchor="middle" font-size="5" fill="#a03050">hazard</text>
  <rect x="92" y="18" width="24" height="44" fill="#1a3a2a"/><text x="104" y="14" text-anchor="middle" font-size="5" fill="#1a3a2a">general</text>
  <rect x="210" y="50" width="24" height="12" fill="#a03050"/><text x="222" y="46" text-anchor="middle" font-size="5" fill="#a03050">hazard↓</text>
  <rect x="242" y="20" width="24" height="42" fill="#1a3a2a"/><text x="254" y="16" text-anchor="middle" font-size="5" fill="#1a3a2a">general=</text>
</svg>

- **How.** Methods like **RMU** (Representation Misdirection for Unlearning, paired with WMDP, 18-23) perturb the model's internal representations on the hazardous topic so it can no longer produce that knowledge, while leaving representations for everything else intact. Success is measured exactly as the diagram: hazard score down, MMLU flat.
- **The limits are serious.** Unlearning is often *shallow* — the knowledge can be partially recovered by fine-tuning or clever prompting, so it raises the cost of misuse rather than eliminating it. And for **open weights** it is undermined entirely: anyone can fine-tune the capability back, so unlearning is a much weaker guarantee for released models than for gated ones.

:::interview
"How would you stop a model from helping with bioweapons?"

Layer it, because no single method is sufficient. **Incapability first** — unlearn the hazardous knowledge (RMU-style), measured on a proxy benchmark like WMDP with general capability held flat. **Then guardrails** — a safety classifier on inputs/outputs and refusal training as defence-in-depth. **Then access controls** — gating, KYC, monitoring for the residual risk. I'd flag the honest caveat: unlearning is often reversible by fine-tuning, so for *open* weights it's weak and the deployment decision itself (release or not) becomes the real control. Naming that unlearning raises cost rather than guaranteeing removal is the mature point.
:::
