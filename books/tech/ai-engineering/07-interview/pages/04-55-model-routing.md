## What is model routing / a model cascade, and why use it?

- Not every request needs the biggest model. **Routing** sends each request to the cheapest model that can handle it; a **cascade** tries a small model first and escalates only when needed.
- Routing approaches:
  - **Rules** — route by task type, length, or user tier (cheap, transparent).
  - **Classifier** — a small model predicts difficulty and picks a tier.
  - **Cascade** — small model answers; if its **confidence** (or a verifier/judge) is low, retry on the bigger model. Pays the big cost only for the hard fraction.
- Payoff: large cost/latency savings when most traffic is easy, with quality preserved on the hard tail.
- Risks to manage: a misroute sends a hard query to a weak model (quality dip), the router/judge adds latency, and confidence estimation is itself imperfect — so monitor the escalation rate and quality by tier.

:::interview
What's really being tested: that you can serve most traffic cheaply and escalate the hard minority (cascade), plus the failure mode — misrouting and router overhead — you must monitor.
:::
