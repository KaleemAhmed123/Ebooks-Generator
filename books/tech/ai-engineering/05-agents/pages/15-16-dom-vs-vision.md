## Browser agents: DOM vs vision

- The defining architecture choice for a browser agent is *how it sees the page*: read the **DOM** (the page's underlying HTML structure) or look at a **screenshot** (pixels, like a human). Each has sharp tradeoffs, and modern agents increasingly combine them. **[VERIFY]**

<svg viewBox="0 0 360 96" role="img" aria-label="DOM approach reads HTML structure; vision approach reads a screenshot; hybrid uses both" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="64" y="30" text-anchor="middle" font-size="6.5">DOM</text><text x="64" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">read HTML tree</text><text x="64" y="54" text-anchor="middle" font-size="5.5" fill="#1a3a2a">precise, cheap</text><text x="64" y="66" text-anchor="middle" font-size="5.5" fill="#a03050">brittle, huge, hidden UI</text>
  <rect x="126" y="16" width="108" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="6.5">vision</text><text x="180" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">read screenshot</text><text x="180" y="54" text-anchor="middle" font-size="5.5" fill="#1a3a2a">robust, human-like</text><text x="180" y="66" text-anchor="middle" font-size="5.5" fill="#a03050">grounding, tokens</text>
  <rect x="242" y="16" width="108" height="60" rx="4" fill="#24405e"/><text x="296" y="30" text-anchor="middle" fill="#fff" font-size="6.5">hybrid</text><text x="296" y="44" text-anchor="middle" fill="#cdd" font-size="5.5">DOM + pixels +</text><text x="296" y="54" text-anchor="middle" fill="#cdd" font-size="5.5">set-of-marks</text><text x="296" y="66" text-anchor="middle" fill="#cec" font-size="5.5">best of both</text>
</svg>

- **DOM approach** — parse the HTML: the agent sees elements, their text, and their attributes, and acts by selecting an element (click element with id X). **Pros:** precise (exact elements, no pixel guessing), cheap (text, not image tokens), reliable clicks. **Cons:** brittle (breaks when markup changes), the DOM can be enormous and noisy (huge token cost, hard to find the right element), and it misses what is *rendered* — canvas, images, visual-only cues, or content hidden in complex JS.
- **Vision approach** — screenshot the page and let a VLM decide where to click by coordinates (the computer-use grounding of 12-44). **Pros:** robust to markup changes, works on *anything* rendered (canvas, images, custom widgets), and matches how a human perceives the page. **Cons:** grounding errors (off-by-a-few-pixels clicks, 12-44), high token cost (image tokens, 12-21), and no access to hidden structure.
- **Hybrid is the 2026 default:** use the DOM/accessibility tree to enumerate elements and overlay **set-of-marks** (14-110) numbered labels on the screenshot, so the agent *sees* the page (vision, robust) but *acts* by picking a labeled element (DOM-precise, no pixel guessing). You get vision's robustness and DOM's precision.

:::interview
"DOM-based vs vision-based browser agents — tradeoffs?"

DOM reads the HTML: precise element selection, cheap (text tokens), reliable clicks — but brittle to markup changes, drowning in huge noisy DOMs, and blind to canvas/visual-only content. Vision reads a screenshot: robust to markup changes, works on anything rendered, human-like — but suffers pixel-level grounding errors and high image-token cost. The strong 2026 answer is hybrid: enumerate elements via the DOM/accessibility tree, overlay numbered set-of-marks on the screenshot, so the agent perceives visually but acts by choosing a labeled element — vision's robustness with DOM's precision.
:::
