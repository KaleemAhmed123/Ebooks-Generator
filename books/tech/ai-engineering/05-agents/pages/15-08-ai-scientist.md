## The AI Scientist

- **The AI Scientist** (Sakana AI, 2024–2025) automates the *entire research loop*: generate a hypothesis, write the code to test it, run experiments, analyze results, and write up a paper — end to end, autonomously. It is self-improvement's cousin: an agent doing open-ended *knowledge creation*, not just optimizing a metric.

<svg viewBox="0 0 360 92" role="img" aria-label="The research loop: idea, code, experiment, analyze, write paper, review" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="40" width="52" height="20" rx="3" fill="#24405e"/><text x="34" y="53" text-anchor="middle" fill="#fff">idea</text>
  <rect x="68" y="40" width="52" height="20" rx="3" fill="#24405e"/><text x="94" y="53" text-anchor="middle" fill="#fff">code</text>
  <rect x="128" y="40" width="60" height="20" rx="3" fill="#24405e"/><text x="158" y="53" text-anchor="middle" fill="#fff">experiment</text>
  <rect x="196" y="40" width="56" height="20" rx="3" fill="#24405e"/><text x="224" y="53" text-anchor="middle" fill="#fff">analyze</text>
  <rect x="260" y="40" width="52" height="20" rx="3" fill="#24405e"/><text x="286" y="53" text-anchor="middle" fill="#fff">write up</text>
  <rect x="320" y="40" width="32" height="20" rx="3" fill="#a03050"/><text x="336" y="53" text-anchor="middle" fill="#fff">review</text>
  <path d="M60 50 L66 50" stroke="#888" marker-end="url(#as)"/><path d="M120 50 L126 50" stroke="#888" marker-end="url(#as)"/><path d="M188 50 L194 50" stroke="#888" marker-end="url(#as)"/><path d="M252 50 L258 50" stroke="#888" marker-end="url(#as)"/><path d="M312 50 L318 50" stroke="#888" marker-end="url(#as)"/>
  <path d="M336 40 Q336 20 34 22 L34 38" stroke="#bbb" fill="none" stroke-dasharray="3,2" marker-end="url(#as)"/>
  <defs><marker id="as" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The pipeline:** the agent brainstorms research ideas, implements experiments as code, runs them, interprets the results, writes a full paper (with figures), and even runs an automated **reviewer** to critique it (14-136). It can iterate — a promising result seeds the next idea — approximating the scientific method in a loop.
- **Why it is both impressive and limited:** impressive because it closes the *whole* loop autonomously, at low cost per paper. Limited because the "evaluator" here — is this research *good and true*? — is far weaker than a test suite. Automated review is fallible, experiments can be subtly flawed, and "novel" ideas are often incremental or already known. It shows the *machinery* of autonomous science works, while the *judgment* remains shaky.
- **The through-line to self-improvement:** if agents can do research, they can do *AI* research — which is the recursive-improvement pathway (next page). The AI Scientist is a small, current, real step toward AI accelerating AI.

:::note
The AI Scientist marks the boundary of current autonomy: agents can now execute the *form* of open-ended intellectual work — the full research loop — but the *quality gate* (is this actually good, novel, correct?) is where they are weakest, because that judgment resists automation the way code correctness does not. This is the same lesson as all of self-improvement, at the hardest end: **autonomy is bounded by verification**, and verifying good science is far harder than verifying passing tests. Where the evaluator is strong (AlphaEvolve), results are real; where it is weak (open research), results are shaky.
:::
