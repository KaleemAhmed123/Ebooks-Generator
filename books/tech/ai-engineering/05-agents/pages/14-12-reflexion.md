## Reflexion: learning from failure

- **Reflexion** (Shinn et al., 2023) gives an agent a memory of its own mistakes. When it fails a task, it writes a **verbal reflection** on *why* it failed, stores that reflection, and retries — the reflection in its context steering it away from the same error.
- It is "verbal reinforcement learning": no weights change (unlike RL in Booklet 4), yet the agent improves across attempts because the lesson from failure is fed back as text.

<svg viewBox="0 0 360 104" role="img" aria-label="An agent attempts, fails an evaluation, reflects in words, and retries with the reflection in memory" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="20" width="66" height="24" rx="3" fill="#24405e"/><text x="47" y="35" text-anchor="middle" fill="#fff" font-size="6.5">attempt</text>
  <rect x="110" y="20" width="66" height="24" rx="3" fill="#f4f4f4" stroke="#888"/><text x="143" y="32" text-anchor="middle" font-size="6">evaluate</text><text x="143" y="41" text-anchor="middle" font-size="5.5" fill="#a03050">fail</text>
  <rect x="206" y="20" width="80" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="246" y="32" text-anchor="middle" font-size="6">reflect (why?)</text><text x="246" y="41" text-anchor="middle" font-size="5.5" fill="#6b6b6b">store lesson</text>
  <rect x="150" y="70" width="120" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="210" y="84" text-anchor="middle" font-size="6">retry with reflection in context</text>
  <path d="M80 32 L108 32" stroke="#888" marker-end="url(#rf)"/><path d="M176 32 L204 32" stroke="#888" marker-end="url(#rf)"/><path d="M246 44 Q246 72 272 78" stroke="#888" fill="none" marker-end="url(#rf)"/><path d="M150 80 Q47 78 47 46" stroke="#888" fill="none" marker-end="url(#rf)"/>
  <defs><marker id="rf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop:** attempt → an evaluator judges success/failure (a test, a checker, or the model itself) → on failure, the agent reflects ("I failed because I assumed the file was JSON; it was CSV") → the reflection joins its memory → retry. Each attempt carries the accumulated lessons.
- **Where it shines:** tasks with a clear success signal and room to retry — coding (run the tests), games, puzzles. The evaluator is essential: without a reliable "did it work?" signal, the reflection has nothing true to learn from.

:::interview
**"How can an agent improve without any training/fine-tuning?"** Reflexion. After a failed attempt (judged by an evaluator — tests, a checker, or self-critique), the agent writes a natural-language reflection on *why* it failed and stores it, then retries with that reflection in context. No weights change; the improvement is entirely in-context "verbal reinforcement." It needs a trustworthy success signal and the ability to retry, which is why it fits coding and puzzles better than open-ended one-shot tasks.
:::
