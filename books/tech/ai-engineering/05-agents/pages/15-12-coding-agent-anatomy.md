## Anatomy of a coding agent

- Under the form factors, all coding agents share the same organs — the Module 14 workbench, specialized for code. Knowing the anatomy explains why some agents are reliable and others flail.

<svg viewBox="0 0 360 100" role="img" aria-label="Coding agent components: navigation, edit, execution/tests, context management, and review" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="104" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="27" text-anchor="middle">navigate: grep/glob</text><text x="62" y="36" text-anchor="middle" font-size="5.5" fill="#6b6b6b">find the code</text>
  <rect x="126" y="16" width="104" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="178" y="27" text-anchor="middle">edit: targeted diffs</text><text x="178" y="36" text-anchor="middle" font-size="5.5" fill="#6b6b6b">change it</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="27" text-anchor="middle">execute: run tests</text><text x="296" y="36" text-anchor="middle" font-size="5.5" fill="#6b6b6b">verify it</text>
  <rect x="60" y="48" width="110" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="115" y="59" text-anchor="middle">context: compaction</text><text x="115" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">handle big repos</text>
  <rect x="186" y="48" width="110" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="241" y="59" text-anchor="middle">review + gate</text><text x="241" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">human merges</text>
</svg>

- **Navigation** — find the relevant code in a large repo without loading it all (grep/glob, 14-85). Weak navigation means the agent edits the wrong place or misses context; strong navigation is half the battle.
- **Editing** — make **targeted diffs**, not whole-file rewrites, so changes are surgical, reviewable, and cheap (14-85). A good coding agent changes exactly what it must.
- **Execution + verification** — run the tests/build/linter and read the output (14-135). This is the verifier that makes autonomous coding trustworthy; an agent that cannot run its code is guessing.
- **Context management** — compact the long transcript of a real debugging session (14-86) so it does not overflow on a big task.
- **Review + gate** — propose a diff a human approves (propose-then-commit, 15-26), and optionally a reviewer agent (14-136) first.
- **Why some coding agents flail:** almost always a weak organ — poor navigation (edits blind), no execution (cannot verify), or bad context management (loses the thread). The model is rarely the bottleneck; the *harness* is.

:::interview
"Two coding agents use the same model but one is far more reliable — why?"

The harness, not the model. Reliability comes from the scaffolding: strong code navigation (finding the right place to edit in a big repo), targeted diff-based editing (surgical, reviewable changes), and above all execution — running the tests/build and feeding results back so the agent verifies its work and self-corrects. Add good context management for long sessions and a review gate. A weak agent usually has a weak organ — it edits blind, can't run its code, or loses the thread — and no model quality compensates for a missing verifier.
:::
