## Agent benchmarks

- Your own eval set (14-116) measures *your* agent on *your* task. **Benchmarks** are shared, standardized tests that measure agents on common tasks — how the field compares models and tracks progress. Knowing the major ones tells you what "state of the art" means and what to expect.

<svg viewBox="0 0 360 92" role="img" aria-label="Four agent benchmarks by domain: coding, general assistant, web, and computer use" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="82" height="60" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="51" y="32" text-anchor="middle" font-size="6.5">SWE-bench</text><text x="51" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">fix real</text><text x="51" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">GitHub issues</text><text x="51" y="68" text-anchor="middle" font-size="5.5">coding</text>
  <rect x="98" y="16" width="82" height="60" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="139" y="32" text-anchor="middle" font-size="6.5">GAIA</text><text x="139" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">real-world</text><text x="139" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">questions</text><text x="139" y="68" text-anchor="middle" font-size="5.5">assistant</text>
  <rect x="186" y="16" width="82" height="60" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="227" y="32" text-anchor="middle" font-size="6.5">WebArena</text><text x="227" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tasks on real</text><text x="227" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">web apps</text><text x="227" y="68" text-anchor="middle" font-size="5.5">web</text>
  <rect x="274" y="16" width="82" height="60" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="315" y="32" text-anchor="middle" font-size="6.5">OSWorld</text><text x="315" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">real desktop</text><text x="315" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">apps/OS</text><text x="315" y="68" text-anchor="middle" font-size="5.5">computer</text>
</svg>

- **Why agent benchmarks are different from model benchmarks:** MMLU (Booklet 3) tests knowledge in one shot. Agent benchmarks test *doing* — multi-step tasks with tools in real or realistic environments, scored on whether the task was *completed*, not whether an answer was recalled. They measure the whole loop: reasoning, tool use, recovery, persistence.
- **The four that matter,** by domain: **SWE-bench** (coding), **GAIA** (general assistant), **WebArena** (web navigation), **OSWorld** (operating a computer) — the next pages take each. Together they cover the high-value agent applications of 2026.

:::note
Agent benchmarks are hard in a way knowledge benchmarks are not: a single mistake in a 20-step task fails the whole task, so scores are low and hard-won (a benchmark where the best agents score 30–70% is normal, where knowledge benchmarks saturate near 90%). That difficulty is honest — it reflects that *reliable multi-step autonomy* is genuinely unsolved. Rapid benchmark progress is the clearest public signal of how fast real agent capability is advancing.
:::
