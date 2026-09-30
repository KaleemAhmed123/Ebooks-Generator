## Multi-session handoff

- Big tasks outlast a single agent run — a context window, a budget, a working session. **Multi-session handoff** is passing enough state from one run to the next that the second continues cleanly instead of starting over. It is memory (the memory cluster) applied to an agent's *own work-in-progress*.

<svg viewBox="0 0 360 82" role="img" aria-label="Session one writes a handoff document that session two reads to continue the task" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="80" height="26" rx="4" fill="#24405e"/><text x="54" y="46" text-anchor="middle" fill="#fff" font-size="6.5">session 1</text>
  <rect x="140" y="26" width="80" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="40" text-anchor="middle" font-size="6">handoff doc</text><text x="180" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">goal·done·next·gotchas</text>
  <rect x="266" y="30" width="80" height="26" rx="4" fill="#24405e"/><text x="306" y="46" text-anchor="middle" fill="#fff" font-size="6.5">session 2</text>
  <path d="M94 43 L138 43" stroke="#888" marker-end="url(#mh)"/><text x="116" y="38" text-anchor="middle" font-size="5.5">writes</text>
  <path d="M220 43 L264 43" stroke="#888" marker-end="url(#mh)"/><text x="242" y="38" text-anchor="middle" font-size="5.5">reads</text>
  <defs><marker id="mh" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The handoff artifact** is a structured summary the finishing session writes and the next reads: the **goal**, what is **done**, what is **left**, key **decisions and their reasons**, **gotchas discovered**, and the **current state** (which files changed, where things stand). It is a compressed, high-signal briefing — not the raw transcript (too long, 14-29), but the *distilled* state (14-24's consolidation).
- **Why it beats resuming the raw context:** the raw transcript is huge, noisy, and may not even fit; a good handoff doc is small and *curated* for what the next session needs to act. It also survives a crash or a fresh model — the next run reconstructs *understanding*, not just history.
- **This is how humans hand off**, too — a shift-change note, a PR description, a design doc. The same artifact that lets a colleague pick up your work lets the next agent run pick up the last one's. Frameworks help (checkpoints, 14-50; the Store, 14-56), but the *content* of the handoff is a design choice you make.

:::note
Multi-session handoff is what turns agents from "one-shot task solvers" into "workers on projects that span days." The skill is deciding *what* to carry forward — enough to continue, little enough to stay legible. Over-carry and you reload the noise you were trying to escape; under-carry and the next session repeats work or loses a hard-won insight. A crisp handoff doc — goal, progress, next steps, gotchas — is the highest-leverage artifact for long, multi-run agent work.
:::
