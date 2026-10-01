## The smallest testable slice

- The most reliable way to get an agent to do a big thing is to make it do a **small, verifiable thing** — repeatedly. The **smallest testable slice** is the discipline of decomposing work into pieces each of which can be *checked* before moving on.

<svg viewBox="0 0 360 82" role="img" aria-label="A big task split into small slices, each verified before the next, versus one big unverifiable leap" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">one big leap</text>
  <rect x="20" y="18" width="140" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="90" y="31" text-anchor="middle">huge step → ✗ (unverifiable)</text>
  <text x="270" y="12" text-anchor="middle" font-size="6.5" fill="#1a3a2a">small verified slices</text>
  <g><rect x="200" y="18" width="30" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="236" y="18" width="30" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="272" y="18" width="30" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="308" y="18" width="30" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/></g>
  <text x="270" y="52" text-anchor="middle" font-size="5.5" fill="#1a3a2a">✓ ✓ ✓ ✓ each checked</text>
</svg>

- **The principle:** a slice is the *smallest* change that (a) makes progress and (b) can be **verified** on its own (14-135). Rather than "build the whole feature," it is "add the function and its test → check it passes → add the next → check." Each slice is a short chain (low compounding, 14-125) ending in a gate.
- **Why it works:**
  - **Contains errors.** A mistake in a small slice is caught by its check immediately, not discovered ten steps later as a mysterious failure.
  - **Keeps the agent oriented.** A small, clear next step resists goal drift (14-126) far better than a vast open task.
  - **Composes reliably.** Many verified small steps yield a trustworthy whole; one big leap yields an unverifiable maybe.
- **It mirrors TDD and incremental engineering** — for the same reason: verifiable increments beat big-bang integration, and doubly so for a non-deterministic worker that compounds errors.

:::interview
"An agent fails on a large task but you can't use a smaller model — what do you change?"

Shrink the *tasks*, not the model. Decompose the work into the smallest slices that each make progress and can be independently verified, and gate each one before proceeding. Small slices mean short reasoning chains (less error compounding), immediate error detection (the check catches a bad slice before it corrupts later ones), and less goal drift (a clear next step). It's TDD-style incrementalism applied to agents: many verified small steps compose into a reliable whole, where one big unverifiable leap does not.
:::
