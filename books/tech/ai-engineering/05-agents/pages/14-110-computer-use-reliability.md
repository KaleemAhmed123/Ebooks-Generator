## Computer-use: making it reliable

- Computer-use demos dazzle and computer-use products struggle, because the real world of screens is hostile to a naive loop. The techniques that close the gap: **[VERIFY]**

<svg viewBox="0 0 360 88" role="img" aria-label="Reliability techniques: set-of-marks, verification, waiting, and recovery" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="64" y="31" text-anchor="middle">set-of-marks</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="31" text-anchor="middle">verify each action</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="31" text-anchor="middle">wait for load</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="122" y="63" text-anchor="middle">recover from errors</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="238" y="63" text-anchor="middle">human approval gates</text>
</svg>

- **Set-of-marks over raw coordinates.** Overlay numbered labels on UI elements (from the accessibility tree or a detector) so the model picks "element 7" instead of predicting exact pixels (12-44). This sidesteps off-by-a-few-pixels grounding errors — the single biggest reliability win.
- **Verify each action.** After a click, check the *next* screenshot confirms the expected change ("did the dialog open?"). If not, retry or re-plan rather than blindly continuing into a wrong state (the compounding-error problem, Module 15).
- **Wait for the UI.** Screens load asynchronously; acting before the page is ready clicks the wrong thing. Detect readiness (element present, spinner gone) before the next action.
- **Recover from surprises.** Popups, cookie banners, session timeouts appear unpredictably. Give the agent explicit handling ("dismiss unexpected dialogs") and a re-orientation step when the screen is not what it expected.
- **Gate consequential actions.** Purchases, sends, deletes go through human approval (14-52) — a wrong autonomous click here has real cost.

:::warn
The gap between a computer-use *demo* and a computer-use *product* is reliability, and it is enormous. A demo shows the happy path once; a product must handle a popup on step 12 of a 30-step task without derailing. Budget most of your engineering for the unhappy paths — verification, waiting, recovery — not the core loop. And never let it act destructively without a human gate: at pixel-level control, the blast radius of a single mistake is a real transaction.
:::
