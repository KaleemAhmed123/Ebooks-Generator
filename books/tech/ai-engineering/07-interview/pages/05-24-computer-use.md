## How do computer-use and browser agents work, and why are they hard?

- These agents operate a **GUI** — a browser or a whole desktop — by perceiving the screen and issuing clicks, types, and scrolls, to do tasks that have no API.
- Two perception approaches:
  - **Vision-based** — screenshot in, the model outputs coordinates/actions (often with **set-of-marks**: numbered boxes overlaid on UI elements to make targeting reliable).
  - **DOM/accessibility-based** — for browsers, read the structured page (DOM/a11y tree) instead of pixels; more precise, less general.
  - **Hybrid** combines both.
- Why they're hard: the action space is huge and brittle (a moved button breaks it), pages change and load asynchronously (needs waits/retries), long task horizons compound errors, and it's a **big attack surface** (injection from page content → the lethal trifecta).
- Reliability levers: constrain to specific sites/flows, verify after each action, strong timeouts/retries, and human approval on consequential clicks.

:::interview
What's really being tested: vision vs DOM perception (and set-of-marks), the brittleness/async/long-horizon difficulties, and the heightened injection risk of acting in a real browser.
:::
