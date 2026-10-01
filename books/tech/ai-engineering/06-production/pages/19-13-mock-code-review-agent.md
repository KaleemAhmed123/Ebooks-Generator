## Mock: code-review / PR agent — design

- **Prompt:** "Design an agent that reviews pull requests." **Clarify:** triggers on every PR, comments inline on real issues, low false-positive tolerance (noise gets it turned off), reads the repo for context, must not leak private code, scales to a large org's PR volume.
- The dominant requirement is **precision over recall**: a review agent that cries wolf gets muted, so the design optimises for *few, correct* comments, not coverage.

<svg viewBox="0 0 360 96" role="img" aria-label="PR agent: webhook triggers retrieval of diff and repo context, an analysis loop, a self-check filter, then inline comments" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="40" width="46" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="31" y="51" text-anchor="middle">PR webhook</text>
  <rect x="64" y="40" width="60" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="94" y="48" text-anchor="middle" font-size="6">gather context</text><text x="94" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">diff + repo RAG</text>
  <rect x="134" y="40" width="54" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="161" y="51" text-anchor="middle">analyse</text>
  <rect x="198" y="40" width="60" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="228" y="48" text-anchor="middle" font-size="6">self-check filter</text><text x="228" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">drop low-confidence</text>
  <rect x="268" y="40" width="66" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="301" y="51" text-anchor="middle">inline comments</text>
  <path d="M54 48 L62 48" stroke="#888" marker-end="url(#cr)"/><path d="M124 48 L132 48" stroke="#888" marker-end="url(#cr)"/><path d="M188 48 L196 48" stroke="#888" marker-end="url(#cr)"/><path d="M258 48 L266 48" stroke="#888" marker-end="url(#cr)"/>
  <text x="180" y="78" text-anchor="middle" font-size="6" fill="#a03050">the self-check filter is what keeps precision high — the whole product</text>
  <defs><marker id="cr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Flow.** PR webhook → **gather context** (the diff + relevant repo files via retrieval, since the whole repo won't fit context) → **analyse** (correctness, security, style against the team's conventions) → **self-check filter** (a second pass that drops low-confidence or nitpicky comments) → **inline comments** on the PR.
- **The self-check is the product.** Anyone can prompt a model to review a diff; the engineering is the *filter* that turns a wall of noise into three high-signal comments. This is the reviewer-agent + verification-gate craft from Booklet 5, made concrete.

:::interview
"How do you keep a review agent from being annoying?"

Optimise **precision, not recall** — a noisy reviewer gets disabled, so a missed issue is cheaper than a wrong comment. Concretely: a **self-check/critic pass** that drops low-confidence and style-nitpick comments, **grounding** each comment in the actual diff and repo context (retrieved, since the repo exceeds the context window) so it can't hallucinate a problem, a **confidence threshold** tuned toward silence, and **feedback learning** from which comments developers resolve vs dismiss. And it runs least-privilege on the code (no exfiltration path — Module 18). The framing — few correct comments beat broad coverage — is the whole answer.
:::
