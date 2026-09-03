## Contract Testing

Checking that a provider still satisfies what its consumers actually depend on,
without running both systems together. The consumer's tests run against a mock
and emit the contract; the provider's pipeline replays it against the real
implementation.

Only the parts a consumer uses get tested. A field nobody reads can be renamed
freely; a field one consumer reads breaks the provider's build.

<svg viewBox="0 0 460 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Consumer tests running against a mock produce a contract file, which the provider's continuous integration replays against the real implementation, so a renamed field fails in the provider's pipeline instead of in production">
  <rect x="4" y="12" width="132" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="29" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">consumer tests + mock</text>
  <path d="M136 25 H168" stroke="#1a1a1a" stroke-width="1.2"/><path d="M168 25 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="170" y="12" width="96" height="26" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="196" y="29" font-family="Consolas,monospace" font-size="8.5" fill="#0d7a7a">contract</text>
  <path d="M266 25 H298" stroke="#1a1a1a" stroke-width="1.2"/><path d="M298 25 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="300" y="12" width="156" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="312" y="29" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">provider CI verifies</text>
  <path d="M378 38 V56" stroke="#0d7a7a" stroke-width="1.2"/><path d="M378 56 l-4 -7 h8 z" fill="#0d7a7a"/>
  <text x="112" y="72" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">a renamed field fails here — not in the consumer's production</text>
</svg>

**A contract test checks the shape of the conversation, not the truth of the
data.** A provider can satisfy every contract and still return the wrong balance.

## Cost Anomaly Detection

A model that learns normal spend per service, account or tag value and alerts
when actual diverges from expected. AWS's implementation is free, evaluates
daily billing data, and reports impact as actual spend minus expected spend.

Detection rides the billing pipeline, so alerts arrive within roughly a day
rather than within minutes — long enough for a runaway job to run an entire
weekend before anyone hears about it.

**It finds change, not waste.** Spend that has been wrong at a steady level
since launch *is* the model's baseline, so the over-sized cluster you have paid
for all year will never raise an anomaly. Anomaly detection and right-sizing
catch disjoint problems.
