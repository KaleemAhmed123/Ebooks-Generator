## Pattern: routing

- **Routing** classifies an input and sends it to a specialized handler. One model call decides *what kind* of request this is; a dedicated prompt (or model, or tool) handles each kind.

<svg viewBox="0 0 360 100" role="img" aria-label="A router classifies a request and dispatches it to a refund, technical, or billing handler" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="40" width="56" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="54" text-anchor="middle" font-size="6">request</text>
  <rect x="96" y="36" width="60" height="30" rx="4" fill="#24405e"/><text x="126" y="51" text-anchor="middle" fill="#fff" font-size="6.5">classify</text>
  <rect x="216" y="14" width="130" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="281" y="27" text-anchor="middle" font-size="6">refund handler</text>
  <rect x="216" y="42" width="130" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="281" y="55" text-anchor="middle" font-size="6">technical handler</text>
  <rect x="216" y="70" width="130" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="281" y="83" text-anchor="middle" font-size="6">billing handler</text>
  <path d="M66 51 L94 51" stroke="#888" marker-end="url(#pr2)"/><path d="M156 46 L214 24" stroke="#888" marker-end="url(#pr2)"/><path d="M156 51 L214 52" stroke="#888" marker-end="url(#pr2)"/><path d="M156 56 L214 80" stroke="#888" marker-end="url(#pr2)"/>
  <defs><marker id="pr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Example:** a support system routes each ticket — refunds to a refund flow, technical issues to a troubleshooting flow, billing to a billing flow. Each handler is tuned for its category, with the right tools and prompt.
- **Why route:** **separation of concerns.** One giant prompt trying to handle every request type is mediocre at all of them and hard to maintain. Split by category and each path is focused, testable, and independently improvable — and you can send easy categories to a cheap model (the routing layer of 13-45, applied to task type).
- **This is also the model-routing idea** generalized: route by *what the task needs*, not just difficulty. Simple classification up front, specialized handling after.
- **When to use:** the input falls into **distinct categories** that benefit from different handling. Add it when a monolithic handler is getting unwieldy or uneven in quality.

:::interview
"How would you structure a support bot handling very different request types?"

Routing. A first classification call labels the request (refund / technical / billing / …), then dispatches to a handler specialized for that category — its own prompt, tools, and even model size. It beats one monolithic prompt because each path is focused, testable, and independently tunable, and you can route cheap categories to cheap models. Keep the classifier simple and add an "unsure/escalate" path for inputs it can't confidently label.
:::
