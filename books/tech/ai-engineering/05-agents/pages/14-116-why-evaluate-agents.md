## Why you must evaluate agents

- You cannot improve, trust, or safely change what you do not measure. For agents this is acute: they are **non-deterministic** (the same input can give different outputs) and **multi-step** (many places to go wrong), so intuition and spot-checks are worthless at scale. **Evaluation** — scoring agent behavior on a test set — is the discipline that replaces vibes with numbers. **[VERIFY]**

<svg viewBox="0 0 360 80" role="img" aria-label="Without evals, changes are guesses; with evals, changes are measured against a test set" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="18" width="160" height="46" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="90" y="34" text-anchor="middle" font-size="6.5" fill="#a03050">without evals</text><text x="90" y="48" text-anchor="middle" font-size="6">change a prompt → "seems better?"</text><text x="90" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">guessing, regressions unseen</text>
  <rect x="190" y="18" width="160" height="46" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="270" y="34" text-anchor="middle" font-size="6.5" fill="#1a3a2a">with evals</text><text x="270" y="48" text-anchor="middle" font-size="6">change → run 200 cases → 84%→88%</text><text x="270" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">measured, regressions caught</text>
</svg>

- **The core problem evals solve:** every change to an agent — a new prompt, a swapped model, a tuned tool — helps some cases and hurts others. Without a test set you see only the cases you happen to check, miss the regressions, and "improve" the agent in circles. With a test set, a change is a measured delta: 84% → 88%, or a regression you catch before shipping.
- **This is the same rigor as software testing**, adapted: a suite of cases you run on every change, a pass/score you track, a gate on releases. The difference is that agent "correctness" is often fuzzy (was the answer *good*?), which is why the scoring methods (next pages) are the interesting part.
- **Eval-driven development** flips the workflow: build the eval set *first*, then develop the agent to pass it — like test-driven development. Your evals define what "good" means before you chase it.

:::interview
**"How do you know if a change to your agent is an improvement?"** You run it against an evaluation set and compare scores — not by eyeballing a few outputs. Agents are non-deterministic and multi-step, so any change helps some cases and hurts others; only a test suite reveals the net effect and catches regressions. Mature teams do eval-driven development: define the eval set first (it encodes what "good" means), then build to pass it, and gate releases on the score. Without evals you're guessing, and you'll "improve" the agent in circles.
:::
