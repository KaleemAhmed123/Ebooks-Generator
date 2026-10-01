## METR and external evaluation

- Labs evaluating their own models have an obvious conflict of interest. **External evaluation** — independent third parties who test frontier models before or after release — is the check. **METR** (Model Evaluation & Threat Research) is the prominent independent evaluator, focused on autonomous-capability and dangerous-capability assessment. **[VERIFY]**
- METR's signature contribution is the **task-horizon** metric (Booklet 5): measure the *length* of task a model can complete autonomously, expressed as the human time the task would take, and track how it grows.

<svg viewBox="0 0 340 80" role="img" aria-label="Autonomous task horizon (human-time-equivalent a model can complete) rising over successive model generations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="64" x2="316" y2="64" stroke="#888"/><line x1="30" y1="10" x2="30" y2="64" stroke="#888"/>
  <text x="175" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">model generation / time →</text>
  <text x="16" y="40" font-size="5.5" fill="#6b6b6b" transform="rotate(-90 16 40)">task horizon (h)</text>
  <path d="M40 60 Q140 52 210 34 Q270 20 310 14" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <circle cx="40" cy="60" r="2" fill="#24405e"/><circle cx="210" cy="34" r="2" fill="#24405e"/><circle cx="310" cy="14" r="2" fill="#a03050"/>
  <text x="300" y="26" font-size="5.5" fill="#a03050">doubling trend</text>
</svg>

- **Why task-horizon matters.** It turns "how capable/autonomous is the model?" into a *trend you can extrapolate*: if the length of task a model can do unattended keeps doubling, you can forecast when models cross thresholds that make certain risks (autonomous cyber-attacks, self-directed AI R&D) plausible — before they arrive.
- **External eval is becoming institutional.** Government bodies (UK AISI, US CAISI) and independent orgs (METR, Apollo Research) now run pre-deployment access programs. This is the counterweight to the race dynamics (18-29): an outside party the public can trust more than the lab's own report.

:::interview
"Why can't a lab just certify its own model's safety?"

Conflict of interest and blind spots — the same team optimising for capability and ship-date is not the ideal judge of danger, and a model may sandbag evals it knows are internal. **External evaluation** (METR, Apollo, government AISIs) provides independent, adversarial testing, and metrics like **task-horizon** make autonomous capability a trackable, extrapolatable trend rather than a one-off claim. It is the same logic as external financial audits: self-assessment plus a credible independent check, especially where the stakes and the incentive to under-report are both high.
:::
