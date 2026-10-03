## Runbooks, RCA, blameless postmortems

- Recovering fast and *not recurring* are separate skills with separate tools. **Runbooks** cut MTTR; **RCA** and **postmortems** stop repeats.
- **Runbook** — a short, pre-written procedure for a known failure: the symptom, the checks, and the exact mitigation steps. Attached to the alert (Module 3.4), it means the on-call engineer at 3am follows a tested checklist instead of inventing one under stress — the difference between a 5-minute and a 50-minute recovery. The best runbooks are **executable** (a script/button), which shades into automation that fixes it with no human at all.
- **RCA — Root Cause Analysis** — after mitigation, find the *real* cause, not the surface one. The **"5 Whys"** drills past symptoms: *the site was down → the pods OOM-killed → a memory leak in a release → the release skipped load testing → load testing isn't a required CI gate.* The root cause is usually a **process or systems gap**, and real incidents have **multiple contributing factors**, not one villain.

<svg viewBox="0 0 360 60" role="img" aria-label="Five whys drilling from symptom site down through OOM, memory leak, untested release, to the root cause that load testing is not a required gate" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="2" y="22" width="66" height="20" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="35" y="34" text-anchor="middle" font-size="5.2">site down</text>
  <rect x="74" y="22" width="60" height="20" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="104" y="34" text-anchor="middle" font-size="5.2">OOM-killed</text>
  <rect x="140" y="22" width="66" height="20" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="173" y="34" text-anchor="middle" font-size="5.2">memory leak</text>
  <rect x="212" y="22" width="68" height="20" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="246" y="31" text-anchor="middle" font-size="5.2">release skipped</text><text x="246" y="39" text-anchor="middle" font-size="5.2">load test</text>
  <rect x="286" y="22" width="70" height="20" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="321" y="31" text-anchor="middle" font-size="5" fill="#2f7d4f">root: no CI</text><text x="321" y="39" text-anchor="middle" font-size="5" fill="#2f7d4f">load gate</text>
  <path d="M68 32 L74 32" stroke="#999" marker-end="url(#rc)"/><path d="M134 32 L140 32" stroke="#999" marker-end="url(#rc)"/><path d="M206 32 L212 32" stroke="#999" marker-end="url(#rc)"/><path d="M280 32 L286 32" stroke="#999" marker-end="url(#rc)"/>
  <defs><marker id="rc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Blameless postmortem** — a written record: timeline, impact, root cause(s), and — the only part that matters long-term — **action items with owners** that remove the cause (here: make load testing a required gate, Booklet 7). "Blameless" means it targets **systems, not people**: a human error is treated as a *system* that *allowed* the error (no guardrail, a confusing UI, a missing check). Blame makes people hide information; blamelessness makes them share it, which is how the organisation actually learns.

### Module 5 — checkpoint
- **Key concepts:** incident method — detect → triage + **declare/roles (IC)** → **mitigate before diagnose** (rollback/scale/failover; "what changed?") → diagnose with USE/RED + bisect → resolve · **trace the request**: metric → trace (longest span) → logs → profile; `curl -w` at the network layer; then USE the suspect resource · **runbooks** cut MTTR (attach to alerts, make executable) · **RCA** (5 Whys → process/systems gap, multiple factors) · **blameless postmortems** = systems not people, action items with owners.
- **Task + questions:** write a runbook for one alert and a one-page blameless postmortem for a past incident with 3 action items. Why mitigate before finding the root cause? Why does blame reduce reliability?
- **Next:** the Booklet close.
