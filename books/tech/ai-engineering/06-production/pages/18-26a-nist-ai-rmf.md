## The NIST AI Risk Management Framework

- Alongside the lab frameworks (RSP/PF/FSF) and binding regulation (EU AI Act) sits a third governance layer: **voluntary standards** that organisations adopt to structure their AI risk work. The **NIST AI Risk Management Framework (AI RMF)** is the most influential — a US standard, widely referenced globally, non-binding but often contractually required. **[VERIFY current version]**
- It organises AI risk management into four functions, meant to run continuously across an AI system's lifecycle.

<svg viewBox="0 0 360 84" role="img" aria-label="NIST AI RMF four functions: govern surrounds map, measure, and manage in a continuous cycle" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="20" y="14" width="320" height="56" rx="6" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="26" text-anchor="middle" font-size="6.5" fill="#3b7a57">GOVERN — culture, roles, accountability (surrounds all)</text>
  <rect x="40" y="34" width="86" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="83" y="46" text-anchor="middle" font-size="6">MAP</text><text x="83" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">context + risks</text>
  <rect x="137" y="34" width="86" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="46" text-anchor="middle" font-size="6">MEASURE</text><text x="180" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">analyse + track</text>
  <rect x="234" y="34" width="86" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="277" y="46" text-anchor="middle" font-size="6">MANAGE</text><text x="277" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">prioritise + act</text>
</svg>

- **The four functions.** *Govern* (the wrapper) — establish accountability, roles, and culture for AI risk. *Map* — understand the system's context and enumerate its risks. *Measure* — analyse and track those risks (bias, robustness, security evals). *Manage* — prioritise and act on them. It is deliberately process-oriented, not a checklist of controls.
- **Why an engineer cares.** Enterprise and government customers increasingly *require* AI RMF (or ISO/IEC 42001, the AI management-system standard) alignment in procurement — so mapping your safety work (evals, cards, monitoring) onto the framework's functions is what turns "we do safety stuff" into a defensible, auditable posture.

:::note
The governance landscape has three tiers, and a mature answer distinguishes them: **voluntary lab frameworks** (RSP/PF/FSF) govern *frontier capability*; **voluntary standards** (NIST AI RMF, ISO 42001) give *any organisation* a process to manage AI risk; and **binding regulation** (EU AI Act, sectoral law) sets the *legal floor*. They compose — a company adopts NIST AI RMF as its internal process, complies with the EU AI Act as law, and (if it trains frontier models) publishes a lab-style framework. Knowing which tier a given name belongs to is the governance-literacy signal.
:::
