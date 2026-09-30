## Browser agents

- A **browser agent** autonomously operates a web browser to accomplish tasks — book a flight, fill a form, gather data across sites, complete a purchase. It is computer-use (14-109) narrowed to the browser, the most common and commercially important autonomous-agent surface after coding. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="A browser agent loop: perceive the page, decide an action, act, observe the new page" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="36" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="48" text-anchor="middle" font-size="6">perceive page</text><text x="55" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">DOM or pixels</text>
  <rect x="150" y="34" width="60" height="28" rx="4" fill="#24405e"/><text x="180" y="51" text-anchor="middle" fill="#fff" font-size="6.5">decide</text>
  <rect x="270" y="36" width="72" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="306" y="48" text-anchor="middle" font-size="6">act: click/type</text><text x="306" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">navigate</text>
  <path d="M90 48 L148 48" stroke="#888" marker-end="url(#ba)"/><path d="M210 48 L268 48" stroke="#888" marker-end="url(#ba)"/><path d="M306 60 Q306 84 55 80 L55 62" stroke="#888" fill="none" marker-end="url(#ba)"/>
  <defs><marker id="ba" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop** is the agent loop over a browser: perceive the current page → decide the next action (click a link, fill a field, scroll, navigate) → act → observe the new page → repeat until the goal is met (the WebArena task shape, 14-122).
- **Why the browser specifically:** it is the universal interface to the world's services — most consumer and business tasks live behind a web UI, often with no API. A reliable browser agent automates the enormous long tail of "things you do in a browser," which is why every major lab ships one.
- **Why it is hard:** web pages are adversarial to automation — they change layout, load asynchronously, throw popups and captchas, and detect/block bots. And the tasks are often **consequential and irreversible** (a purchase, a booking), so the safety stack (permissions, human gates, 15-14) is essential. The reliability techniques of 14-110 (verify each action, wait for load, recover from surprises) apply directly.
- The central technical choice — *how* the agent perceives the page — is the next page: **DOM vs vision.**

:::note
Browser agents are where autonomous agents most directly touch the real economy and real money, which raises the stakes on both reliability and safety. A coding agent's mistake fails a test; a browser agent's mistake books the wrong flight or buys the wrong thing. This is why browser agents are the sharpest test of the whole module: they need long-horizon reliability (error compounding), the safety stack (irreversible actions), and robust perception (adversarial pages) all at once.
:::
