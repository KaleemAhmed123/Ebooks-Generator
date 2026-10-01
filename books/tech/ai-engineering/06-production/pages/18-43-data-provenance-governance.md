## Data provenance and training governance

- A model is a function of its training data, so *not knowing what went into it* is a safety, legal, and quality risk all at once. **Data provenance** is the discipline of tracking where every piece of training data came from, its licence, its consent status, and its journey into the model.
- The risks provenance controls are concrete and current:

<svg viewBox="0 0 360 88" role="img" aria-label="Provenance tracks data from source through licence and consent checks into training, guarding against poisoning, copyright, PII, and contamination" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="36" width="52" height="20" rx="3" fill="#f4f4f4" stroke="#888"/><text x="38" y="49" text-anchor="middle" font-size="6">sources</text>
  <rect x="86" y="36" width="66" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="119" y="46" text-anchor="middle" font-size="5.5">licence + consent</text><text x="119" y="54" text-anchor="middle" font-size="5" fill="#6b6b6b">+ dedup + filter</text>
  <rect x="174" y="36" width="52" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="200" y="49" text-anchor="middle" font-size="6">training</text>
  <g font-size="5.5" fill="#a03050"><text x="250" y="26">✗ data poisoning</text><text x="250" y="40">✗ copyright</text><text x="250" y="54">✗ PII leakage</text><text x="250" y="68">✗ eval contamination</text></g>
  <path d="M64 46 L84 46" stroke="#888" marker-end="url(#dp)"/><path d="M152 46 L172 46" stroke="#888" marker-end="url(#dp)"/>
  <defs><marker id="dp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Four failure modes provenance guards.** *Data poisoning* — a bad actor plants triggers in scraped data (the sleeper-agent supply-chain risk, 18-09). *Copyright* — training on unlicensed work is now active litigation. *PII* — personal data that becomes extractable (18-39). *Eval contamination* — benchmark data leaking into training, so scores are inflated and meaningless.
- **Training governance** wraps this in process: documented data sources, licence and consent tracking, deduplication and filtering pipelines, and a record of *what data trained which model version* — so when a problem surfaces (a copyright claim, a poisoned trigger, a contaminated benchmark), you can trace and remediate it.

:::interview
"Why should you track where your training data came from?"

Four reasons, all live risks. **Security** — untrusted data can carry backdoors that survive safety training (sleeper agents), so provenance is a supply-chain control. **Legal** — unlicensed or non-consented data is active litigation and regulatory exposure. **Privacy** — untracked PII becomes extractable from the model. **Validity** — benchmark data leaking into training silently inflates your eval scores. Provenance is what lets you answer "what's in this model?" — and without that answer you cannot make a safety case, defend a lawsuit, or trust your own evals.
:::
