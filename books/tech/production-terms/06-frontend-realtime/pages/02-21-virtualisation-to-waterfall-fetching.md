## Virtualisation

*windowing*

Rendering only the visible slice of a long list, so the DOM stays small no
matter how much data there is.

A 50,000-row table with real DOM nodes freezes the tab for eight seconds.
Virtualised, about thirty rows exist at any moment and scrolling is smooth.

**The costs are real and rarely mentioned.** Browser find-in-page only searches
what exists, so `Ctrl+F` stops finding rows that are not rendered. Native scroll
anchoring and anchor links to off-screen content break for the same reason.

Reach for it when the list is genuinely large. Reaching for it at two hundred
rows buys the drawbacks and none of the benefit.

## Waterfall Fetching

Sequential dependent requests where each waits for the last. Common in
components that fetch their own data, because each one only knows about itself.

User, then organisation, then billing runs three requests serially for 900ms.
The same three in parallel take 320ms.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three sequential requests take nine hundred milliseconds while the same three in parallel take three hundred and twenty">
  <text x="4" y="18" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">serial</text>
  <rect x="62" y="8" width="96" height="13" fill="none" stroke="#b32d2b" stroke-width="1.1"/><text x="110" y="18" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#b32d2b">user</text>
  <rect x="160" y="8" width="96" height="13" fill="none" stroke="#b32d2b" stroke-width="1.1"/><text x="208" y="18" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#b32d2b">org</text>
  <rect x="258" y="8" width="96" height="13" fill="none" stroke="#b32d2b" stroke-width="1.1"/><text x="306" y="18" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#b32d2b">billing</text>
  <text x="362" y="18" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">900ms</text>
  <text x="4" y="42" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">parallel</text>
  <rect x="62" y="28" width="96" height="10" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.1"/>
  <rect x="62" y="40" width="96" height="10" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.1"/>
  <rect x="62" y="52" width="96" height="10" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.1"/>
  <text x="168" y="46" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">320ms</text>
</svg>

The fix is `Promise.all` where the requests are independent, or hoisting the
fetch to a parent that can start all of them at once.
