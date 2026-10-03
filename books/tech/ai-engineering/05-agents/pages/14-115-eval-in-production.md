## Evaluation in production

- Offline evals (next cluster) test an agent before release. **Online evaluation** watches it *in production*, on real traffic — because real users do things no test set anticipated, and quality drifts as data, models, and usage change.

<svg viewBox="0 0 360 84" role="img" aria-label="Production runs are scored by feedback, auto-graders, and sampling to detect drift" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="70" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="47" text-anchor="middle" font-size="6">live runs</text>
  <rect x="116" y="16" width="90" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="161" y="28" text-anchor="middle" font-size="6">user feedback</text>
  <rect x="116" y="40" width="90" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="161" y="52" text-anchor="middle" font-size="6">auto-grader (LLM)</text>
  <rect x="116" y="64" width="90" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="161" y="76" text-anchor="middle" font-size="6">sampled human review</text>
  <rect x="244" y="38" width="100" height="22" rx="3" fill="#24405e"/><text x="294" y="52" text-anchor="middle" fill="#fff" font-size="6">drift / quality dashboard</text>
  <path d="M80 44 L114 25" stroke="#888" marker-end="url(#ep2)"/><path d="M80 45 L114 49" stroke="#888" marker-end="url(#ep2)"/><path d="M80 46 L114 73" stroke="#888" marker-end="url(#ep2)"/><path d="M206 49 L242 49" stroke="#888" marker-end="url(#ep2)"/>
  <defs><marker id="ep2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Three online signals:**
  - **User feedback** — thumbs, corrections, abandonment, escalation to a human. The realest signal, but sparse and biased (unhappy users react more).
  - **Automated graders** — an LLM-as-judge (14-118) or rules score a *sample* of live runs continuously, giving a quality metric without waiting for user feedback.
  - **Sampled human review** — periodically have people rate a sample of production runs, the gold standard that calibrates your automated graders.
- **Watch for drift.** A model update, a change in user behavior, or stale data can silently degrade quality. Online eval catches the *trend* — success rate sliding from 92% to 85% over two weeks — before users churn. Alert on regressions.
- **Close the loop.** Feed failing production runs back into your offline test set (next cluster) so the next release is tested against real failures. Production is your richest source of hard test cases.

:::note
Offline and online evaluation are complementary, not alternatives. Offline gives fast, reproducible pre-release checks on a fixed set; online catches what the fixed set missed and tracks quality over time on real traffic. The mature loop runs both — ship on offline evals, monitor with online evals, and pipe production failures back into offline. An agent's quality is never "done"; it is a number you continuously measure and defend.
:::
