## Fine-tune, RAG, or prompt?

- The most common applied-AI decision: to change a model's behavior, do you **prompt**, add **RAG**, or **fine-tune**? Each fixes a different problem, and choosing wrong wastes weeks. This is the decision the fine-tuning flagship (Flagship 2) exists to inform.

<svg viewBox="0 0 360 92" role="img" aria-label="Decision: prompt for behavior tweaks, RAG for knowledge, fine-tune for consistent format/style/skill" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="16" width="108" height="60" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="66" y="28" text-anchor="middle" font-size="6.5" fill="#24405e">prompt</text><text x="66" y="42" text-anchor="middle" font-size="5.5">behavior, format,</text><text x="66" y="52" text-anchor="middle" font-size="5.5">few-shot examples</text><text x="66" y="66" text-anchor="middle" font-size="5" fill="#6b6b6b">try FIRST, cheapest</text>
  <rect x="126" y="16" width="108" height="60" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="28" text-anchor="middle" font-size="6.5" fill="#3b7a57">RAG</text><text x="180" y="42" text-anchor="middle" font-size="5.5">KNOWLEDGE the model</text><text x="180" y="52" text-anchor="middle" font-size="5.5">lacks / that changes</text><text x="180" y="66" text-anchor="middle" font-size="5" fill="#6b6b6b">fresh, citable</text>
  <rect x="240" y="16" width="108" height="60" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="294" y="28" text-anchor="middle" font-size="6.5" fill="#8a6d3b">fine-tune</text><text x="294" y="42" text-anchor="middle" font-size="5.5">consistent style/format,</text><text x="294" y="52" text-anchor="middle" font-size="5.5">a learned skill</text><text x="294" y="66" text-anchor="middle" font-size="5" fill="#6b6b6b">last, when prompt can't</text>
</svg>

- **Prompt first** — it's instant and free to iterate. Most "the model won't do X" problems are solved by a better prompt or a few examples. Only move on when prompting provably can't get there.
- **RAG for knowledge** — the model lacks facts, or the facts change. RAG injects fresh, citable knowledge without retraining (Flagship 3). Fine-tuning knowledge in is the classic mistake: it's stale the day training ends and can't cite.
- **Fine-tune for behavior** — a consistent format/style/tone the prompt can't reliably enforce, a specialized skill, or to make a small model do one task as well as a big one (then serve it cheaply, 17-17b). Fine-tuning teaches *how to respond*, not *what facts to know*.

:::interview
"The model isn't doing what we need. Fine-tune it?"

Almost never first. Diagnose what kind of gap it is. **Behavior/format gap** → prompt engineering + few-shot; instant, free, solves most cases. **Knowledge gap** (missing or changing facts) → RAG, because fine-tuning knowledge in makes it stale and uncitable — the #1 mistake. **Consistency/style/skill gap** the prompt can't reliably hold, or wanting a *small cheap* model to match a big one on one task → *then* fine-tune (Flagship 2), which teaches *how to respond*, not *what to know*. Often it's a combination (fine-tune for format + RAG for knowledge). The senior instinct is to reach for the cheapest layer that fixes the *specific* gap, and to know fine-tuning is for behavior, not facts.
:::
