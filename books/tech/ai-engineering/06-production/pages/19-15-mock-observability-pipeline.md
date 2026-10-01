## Mock: LLM observability + eval pipeline — design

- **Prompt:** "Design the observability and evaluation platform for all our LLM products." **Clarify:** many products, need traces + cost + quality + safety per request, offline eval sets gated in CI, online eval on live traffic, dashboards and alerts, huge trace volume.
- This is the *meta-system* — the thing that watches everything else (17-45, 17-46a). Its design problem is **volume**: every LLM call across every product emits a trace, so ingestion and sampling dominate.

<svg viewBox="0 0 360 100" role="img" aria-label="Observability pipeline: products emit OTel traces to a collector, stored, then offline eval in CI and online sampled eval feed dashboards and alerts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888"><rect x="8" y="20" width="42" height="12" rx="2"/><rect x="8" y="42" width="42" height="12" rx="2"/><rect x="8" y="64" width="42" height="12" rx="2"/></g>
  <text x="29" y="29" text-anchor="middle" font-size="5.5">product</text><text x="29" y="51" text-anchor="middle" font-size="5.5">product</text><text x="29" y="73" text-anchor="middle" font-size="5.5">product</text>
  <rect x="64" y="40" width="54" height="16" rx="2" fill="#24405e"/><text x="91" y="48" text-anchor="middle" fill="#fff" font-size="6">OTel collector</text><text x="91" y="55" text-anchor="middle" fill="#cdd" font-size="5">+ sampling</text>
  <rect x="132" y="40" width="50" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="157" y="51" text-anchor="middle">trace store</text>
  <rect x="196" y="18" width="70" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="231" y="29" text-anchor="middle">offline eval (CI)</text>
  <rect x="196" y="42" width="70" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="231" y="53" text-anchor="middle">online eval (sample)</text>
  <rect x="196" y="66" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="231" y="77" text-anchor="middle">cost rollup</text>
  <rect x="280" y="42" width="72" height="16" rx="2" fill="#24405e"/><text x="316" y="53" text-anchor="middle" fill="#fff" font-size="6">dashboards+alerts</text>
  <path d="M50 26 L62 46" stroke="#888" marker-end="url(#ob)"/><path d="M50 48 L62 48" stroke="#888" marker-end="url(#ob)"/><path d="M50 70 L62 50" stroke="#888" marker-end="url(#ob)"/><path d="M118 48 L130 48" stroke="#888" marker-end="url(#ob)"/><path d="M182 46 L194 28" stroke="#888" marker-end="url(#ob)"/><path d="M182 49 L194 50" stroke="#888" marker-end="url(#ob)"/><path d="M182 52 L194 72" stroke="#888" marker-end="url(#ob)"/><path d="M266 50 L278 50" stroke="#888" marker-end="url(#ob)"/>
  <defs><marker id="ob" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The spine.** Products emit **OpenTelemetry GenAI** traces (Booklet 5, 17-45) to a **collector** that samples (keep all errors + a fraction of successes) → **trace store** → two eval paths: **offline** (a curated set, run in CI, gates every model/prompt change) and **online** (sample live traffic, LLM-judge + implicit signals, 17-46a) → **dashboards + alerts** on the seven golden signals (17-46).
- **Sampling is the scale lever.** You cannot store or LLM-judge every trace at volume, so keep all *errors and anomalies*, sample the rest, and always retain the prompt/output (redacted) for the sampled ones — because a quality bug is undebuggable without the actual text.

:::interview
"How do you evaluate LLM quality in production at scale?"

Two loops feeding one platform. **Offline**: a curated eval set (quality, safety, regression cases) run in **CI**, gating every model/prompt change before it ships. **Online**: since you can't grade every request, **sample** live traffic and score it with implicit signals (regenerations, thumbs) plus LLM-as-judge on a fraction, surfacing a **live quality SLO** that alerts on regression. Both write to a trace store keyed on OTel GenAI spans carrying tokens, cost, and the redacted prompt/output. The scale insight — sample-and-keep-all-errors, because you can neither store nor judge everything — is the design crux.
:::
