## WMDP and dual-use evaluation

- Some capabilities are **dual-use**: the same knowledge that helps a chemist helps a bioterrorist, the same coding skill that patches a system exploits one. Safety here is not "don't say slurs" — it is "don't *uplift* a malicious actor toward mass harm." Measuring that needs a different kind of benchmark.
- **WMDP** (Weapons of Mass Destruction Proxy, 2024) is the standard: a public multiple-choice benchmark of *proxy* knowledge for biosecurity, chemistry, and cybersecurity harms — close enough to measure dangerous capability, sanitised so the benchmark itself is not a weapon.

<svg viewBox="0 0 360 82" role="img" aria-label="WMDP measures hazardous knowledge as a proxy; unlearning aims to lower that score without hurting general capability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="64" x2="200" y2="64" stroke="#888"/><line x1="30" y1="12" x2="30" y2="64" stroke="#888"/>
  <text x="115" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">WMDP hazardous-knowledge score</text>
  <rect x="44" y="24" width="28" height="40" fill="#a03050"/><text x="58" y="20" text-anchor="middle" font-size="5.5" fill="#a03050">before</text>
  <rect x="96" y="46" width="28" height="18" fill="#1a3a2a"/><text x="110" y="42" text-anchor="middle" font-size="5.5" fill="#1a3a2a">after unlearning</text>
  <text x="285" y="30" text-anchor="middle" font-size="6" fill="#1a1a1a">goal: lower hazard score,</text><text x="285" y="42" text-anchor="middle" font-size="6" fill="#1a1a1a">keep general capability</text><text x="285" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">measured on MMLU etc.</text>
</svg>

- **What it enables: unlearning.** WMDP was built alongside methods that *remove* hazardous knowledge from a model (e.g. RMU) while preserving general capability — you measure success as the hazard score dropping while MMLU stays flat. This is the *incapability* safety-case pillar (18-26): you cannot misuse what the model no longer knows.
- **The limits are real.** A multiple-choice proxy is a lower bound on capability, not the true risk; unlearning can often be partially reversed by fine-tuning; and there is a genuine tension with open-weight release, where you cannot un-ship knowledge once the weights are public.

:::note
Dual-use evaluation is where safety meets national security, and it changes the deployment calculus: a model that crosses a CBRN (chemical, biological, radiological, nuclear) capability threshold triggers the highest tier of the frontier safety frameworks (18-25) — extra safeguards, restricted deployment, sometimes not releasing weights at all. WMDP is the *measuring stick* those thresholds are defined against, which is why it is the benchmark named in the frameworks rather than a generic safety score.
:::
