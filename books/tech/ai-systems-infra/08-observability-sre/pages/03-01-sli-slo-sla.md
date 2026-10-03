# SRE Discipline

## SLI, SLO, SLA

- **Site Reliability Engineering (SRE)** is the practice of running services to **explicit reliability targets** instead of a vague "keep it up." The targets are built from three terms people blur, and getting them straight is the foundation of everything in this module.
- **SLI — Service Level Indicator** — a *measured* number that reflects user experience: the fraction of requests served **successfully** and **under 300 ms**, say. A good SLI is **user-centric** (does it capture what a user feels?) and a **ratio** of good events to total.
- **SLO — Service Level Objective** — your *internal target* for an SLI over a window: "99.9% of requests succeed under 300 ms, measured over 30 days." This is the number that defines "good enough" and drives decisions (error budgets, next page).
- **SLA — Service Level Agreement** — a *contractual* promise to customers, with **penalties** (refunds) if breached. It's deliberately **looser** than your SLO, so you detect and fix problems internally before you ever breach the contract.

<svg viewBox="0 0 360 84" role="img" aria-label="SLI is the measured indicator, the SLO is your stricter internal target on it, and the SLA is the looser external promise with penalties; the SLO sits inside the SLA as a safety margin" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="110" height="60" rx="4" fill="#fbe9ee" stroke="#a63d57"/><text x="63" y="26" text-anchor="middle" font-size="6.2" fill="#a63d57">SLI (measured)</text><text x="63" y="42" text-anchor="middle" font-size="5.6">% reqs &lt;300ms</text><text x="63" y="54" text-anchor="middle" font-size="5.6">&amp; successful</text><text x="63" y="66" text-anchor="middle" font-size="5" fill="#777">the number itself</text>
  <rect x="126" y="12" width="110" height="60" rx="4" fill="#f6dce3" stroke="#a63d57"/><text x="181" y="26" text-anchor="middle" font-size="6.2" fill="#a63d57">SLO (internal)</text><text x="181" y="42" text-anchor="middle" font-size="5.6">99.9% / 30d</text><text x="181" y="54" text-anchor="middle" font-size="5.6">stricter target</text><text x="181" y="66" text-anchor="middle" font-size="5" fill="#777">drives decisions</text>
  <rect x="244" y="12" width="108" height="60" rx="4" fill="#eef2f8" stroke="#1f487e"/><text x="298" y="26" text-anchor="middle" font-size="6.2" fill="#1f487e">SLA (external)</text><text x="298" y="42" text-anchor="middle" font-size="5.6">99.5% + penalty</text><text x="298" y="54" text-anchor="middle" font-size="5.6">looser promise</text><text x="298" y="66" text-anchor="middle" font-size="5" fill="#777">margin before breach</text>
</svg>

- The ordering **SLO stricter than SLA** is the safety margin: aim internally for 99.9%, promise 99.5%, and you have room to notice and recover before a customer-facing breach. Flip them and you're paying penalties the moment you miss your own target.
- **Don't chase 100%.** Every extra nine costs exponentially more (redundancy, review, slower shipping), and users can't tell 99.99% from 100% through their own flaky networks and devices (Booklet 2–3). The right SLO is the **lowest reliability users won't notice** — high enough to keep them happy, low enough to leave room to ship. That leftover room has a name: the error budget.

:::note
Pick **few SLIs that match the user journey**, not a wall of them. For a request API: availability (success ratio) and latency (p99 under a threshold). For a pipeline: freshness and correctness. For an LLM endpoint (Booklet 10): time-to-first-token and error rate. A handful of user-centric SLIs you actually defend beats fifty machine metrics nobody owns — the SLO is a *decision tool*, and decisions need signal, not noise.
:::
