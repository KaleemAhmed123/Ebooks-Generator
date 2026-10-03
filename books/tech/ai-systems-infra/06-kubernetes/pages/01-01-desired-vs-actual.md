# The Model

## Desired vs actual state

- Kubernetes is one idea repeated everywhere: you **declare the state you want**, and a **controller** works continuously to make the world match it. You never tell it the steps ("start a container here, now here"); you hand it a target ("I want 3 replicas of this image") and it figures out the steps, over and over, forever. That loop — **observe actual → compare to desired → act to close the gap** — is the *reconcile loop*, and it is the whole system in one sentence.

<svg viewBox="0 0 360 104" role="img" aria-label="The reconcile loop: desired state in etcd, a controller observes actual state, compares, and acts to close the gap, then repeats continuously" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="120" y="6" width="120" height="20" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="180" y="19" text-anchor="middle">desired state (you declare)</text>
  <rect x="132" y="40" width="96" height="20" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="180" y="53" text-anchor="middle">controller</text>
  <rect x="16" y="76" width="96" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="64" y="89" text-anchor="middle" font-size="6.4">observe actual</text>
  <rect x="132" y="76" width="96" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="180" y="89" text-anchor="middle" font-size="6.4">diff: desired − actual</text>
  <rect x="248" y="76" width="96" height="20" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="296" y="89" text-anchor="middle" font-size="6.4">act (create/delete)</text>
  <path d="M180 26 L180 40" stroke="#1a1a1a" marker-end="url(#r1)"/>
  <path d="M132 50 L64 76" stroke="#999" marker-end="url(#r1)"/>
  <path d="M112 86 L132 86" stroke="#999" marker-end="url(#r1)"/>
  <path d="M228 86 L248 86" stroke="#999" marker-end="url(#r1)"/>
  <path d="M296 76 L296 50 L228 50" stroke="#999" marker-end="url(#r1)"/>
  <text x="300" y="46" font-size="5.6" fill="#777">repeat</text>
  <defs><marker id="r1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Declarative, not imperative.** `docker run` is a one-shot command — if the container dies, nothing brings it back. A Kubernetes Deployment is a *standing promise*: the desired count is stored, and a controller notices when actual drops below it and recreates the gap. **Self-healing is not a feature bolted on; it falls out of the loop running forever.**
- The loop is **level-triggered, not edge-triggered** — it reacts to the *current gap*, not to events. Miss an event (a crash while the controller was restarting) and it still heals, because the next pass simply sees actual ≠ desired and acts. This is why Kubernetes survives its own components restarting: nothing depends on catching a moment.

:::note
This is the same control-theory idea as a thermostat: you set 21°C (desired), it reads the room (actual), and it runs the heater until the gap closes — then keeps watching. Everything in this booklet — Deployments, HPA, operators you write yourself — is another controller running this same loop over a different resource. Learn the loop once and the rest is vocabulary.
:::
