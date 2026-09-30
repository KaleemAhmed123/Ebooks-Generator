## LLM evaluation in practice

- You shipped a prompt. How do you know a change made it *better*, not just different? Vibes do not scale. Production evaluation is a small discipline that turns "feels good" into a number you can track.
- Build an **eval set**: 50–200 real inputs with known-good outputs or clear pass/fail criteria. This is your regression test for prompts, models, and RAG changes.

<svg viewBox="0 0 320 66" role="img" aria-label="Three grading methods: exact rules, LLM-as-judge, and human review, trading cost for nuance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="14" width="98" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="28" text-anchor="middle" font-size="7.5" fill="#24405e">rules / exact</text><text x="55" y="41" text-anchor="middle">regex, JSON valid</text><text x="55" y="50" text-anchor="middle" fill="#6b6b6b">cheap, narrow</text>
  <rect x="112" y="14" width="98" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="161" y="28" text-anchor="middle" font-size="7.5" fill="#24405e">LLM-as-judge</text><text x="161" y="41" text-anchor="middle">scores open answers</text><text x="161" y="50" text-anchor="middle" fill="#6b6b6b">scalable, noisy</text>
  <rect x="218" y="14" width="98" height="40" rx="3" fill="#24405e"/><text x="267" y="28" text-anchor="middle" font-size="7.5" fill="#fff">human</text><text x="267" y="41" text-anchor="middle" fill="#fff">the ground truth</text><text x="267" y="50" text-anchor="middle" fill="#ccd">costly, slow</text>
</svg>

- **Rule-based** — exact match, regex, "is it valid JSON?", "does it contain the required field?". Use wherever the answer is checkable. Free and reliable.
- **LLM-as-a-judge** — a strong model grades open-ended answers against a rubric (page 05-36). Scales to thousands of examples; calibrate it against human labels first, because judges are biased (favouring longer answers, their own style).
- **Human** — the gold standard for nuance and the final tie-breaker. Expensive, so spend it on a sample and on calibrating the automated graders.

:::note
**Online vs offline.** Offline evals run on your fixed set before shipping (regression). Online signals — thumbs up/down, edits, task completion, retries — tell you what really happens with users. You need both: offline to ship safely, online to learn what to fix.
:::

:::warn
The eval set rots. Real inputs drift away from your fixed examples, so a prompt that aces the old set can fail live. Refresh the set from real traffic, and never let a judge model grade its own family without human calibration — you will measure its preferences, not quality.
:::
