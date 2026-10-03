## WebArena and OSWorld

- Two benchmarks test agents that **operate real software** — the computer-use frontier (14-109). They are the hardest and most predictive of "can this agent actually do knowledge work?"

### WebArena — agents on the web
- Tasks on **realistic, fully-functional web applications** (a mock e-commerce site, a forum, a wiki, a code host) hosted in a controlled environment. The agent must accomplish goals like "post a reply in the thread about X" or "find the cheapest product matching Y and add it to the cart" by navigating and acting in the browser.
- **Why it is hard:** real web UIs are messy — multi-step flows, forms, dynamic content, many ways to go wrong. Success is checked by the environment's resulting *state* (was the reply actually posted?), not a text answer — a strict, objective bar.

### OSWorld — agents on a computer
- Tasks in a **real operating system** with real desktop applications (file managers, editors, browsers, office apps). The agent controls the actual GUI — the full computer-use loop (14-109) — to complete tasks spanning multiple apps: "extract data from this PDF and put it in a spreadsheet."
- **Why it is the hardest:** the whole OS is the environment, apps behave unpredictably, and tasks are long and cross-application. It is the closest benchmark to "replace a human at a computer."

<svg viewBox="0 0 360 56" role="img" aria-label="WebArena tests browser tasks; OSWorld tests full desktop tasks, harder" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="89" y="27" text-anchor="middle">WebArena · browser</text><text x="89" y="37" text-anchor="middle" font-size="5.5" fill="#6b6b6b">real web apps</text>
  <rect x="196" y="16" width="150" height="26" rx="3" fill="#24405e"/><text x="271" y="27" text-anchor="middle" fill="#fff">OSWorld · whole OS</text><text x="271" y="37" text-anchor="middle" fill="#cdd" font-size="5.5">real desktop apps (hardest)</text>
</svg>

:::note
Scores on WebArena and OSWorld are **low** — often well below human levels as of 2026 — and that is the honest headline: operating real software reliably over many steps is *unsolved*. These benchmarks are the frontier's report card, and the gap between their scores and 100% is a direct measure of how far autonomous computer-operating agents still have to go. When someone claims agents can "do any computer task," these numbers are the reality check.
:::
