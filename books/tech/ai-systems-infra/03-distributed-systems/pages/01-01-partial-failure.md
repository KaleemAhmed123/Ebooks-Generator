# Why Distributed Is Hard

## Partial failure

- On one machine a component is **up or down**, and if the machine dies your program dies with it — simple. A distributed system has a crueller property: **parts fail independently**, and the healthy parts keep running without knowing which other parts just died. That is **partial failure**, and it is the single fact every later topic exists to handle.
- Worse, you usually **cannot tell "failed" from "slow."** You send a request and no reply comes. Three different worlds produce that same silence, and you cannot distinguish them from where you stand:

<svg viewBox="0 0 360 96" role="img" aria-label="A request with no reply has three indistinguishable causes: the server crashed, the network dropped the message, or the server is slow and the reply is still coming" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="38" width="64" height="22" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="42" y="52" text-anchor="middle" font-size="6.3">client</text>
  <path d="M74 49 L150 49" stroke="#1a1a1a" marker-end="url(#f1)"/><text x="112" y="45" text-anchor="middle" font-size="5.6">request</text>
  <path d="M150 49 L74 49" stroke="#c0392b" stroke-dasharray="3 3"/><text x="112" y="60" text-anchor="middle" font-size="5.6" fill="#c0392b">no reply — but why?</text>
  <rect x="160" y="14" width="190" height="18" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="255" y="26" text-anchor="middle" font-size="6">① server crashed (never ran it)</text>
  <rect x="160" y="40" width="190" height="18" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="255" y="52" text-anchor="middle" font-size="6">② network dropped the message</text>
  <rect x="160" y="66" width="190" height="18" rx="3" fill="#fdf2e9" stroke="#b5651d"/><text x="255" y="78" text-anchor="middle" font-size="6">③ server slow — ran it, reply en route</text>
  <defs><marker id="f1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The three are not equivalent: in ① and ② the work didn't happen; in ③ it **did**, and retrying runs it **twice**. This is exactly why idempotency (Module 7) is non-negotiable, and why a timeout is a **guess**, not a fact.
- Underlying all of it are the **eight fallacies of distributed computing** — the false assumptions that bite every newcomer: the network is reliable; latency is zero; bandwidth is infinite; the network is secure; topology doesn't change; there's one administrator; transport cost is zero; the network is homogeneous. Every one is wrong, and this booklet is largely a tour of what goes wrong when you forget it.

:::note
The mindset shift: stop designing for "up or down" and start designing for **"I don't know."** A node that can't be reached is in an *unknown* state, not a dead one — it might still be doing work, holding a lock, or about to wake up and act on a stale view. Systems that assume "unreachable = dead" are how split-brain (Module 6) and double-processing (Module 7) happen.
:::
