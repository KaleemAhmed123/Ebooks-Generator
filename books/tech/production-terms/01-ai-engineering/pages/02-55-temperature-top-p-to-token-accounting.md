## Temperature / Top-p

Two ways of sampling from the probability distribution a model produces over its
whole vocabulary at every step.

Temperature reshapes that distribution. At 0 the highest-probability token is
always taken; raising it flattens the curve so unlikely tokens get a real
chance. Top-p — nucleus sampling — discards the tail instead: options are sorted
in decreasing probability, the running total is cut off once it reaches p, and
sampling happens only among what survived.

<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Temperature flattens the whole probability curve while top-p keeps the original shape but cuts off the low-probability tail">
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">temperature: same tokens, flatter curve</text>
  <path d="M8 60 h12 v-38 h-12 z M24 60 h12 v-26 h-12 z M40 60 h12 v-16 h-12 z M56 60 h12 v-9 h-12 z M72 60 h12 v-5 h-12 z" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M108 60 h12 v-24 h-12 z M124 60 h12 v-20 h-12 z M140 60 h12 v-17 h-12 z M156 60 h12 v-14 h-12 z M172 60 h12 v-12 h-12 z" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M88 44 H100" stroke="#1a1a1a" stroke-width="1.2"/><path d="M100 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="256" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">top-p: same curve, fewer tokens</text>
  <path d="M260 60 h12 v-38 h-12 z M276 60 h12 v-26 h-12 z M292 60 h12 v-16 h-12 z M308 60 h12 v-9 h-12 z M324 60 h12 v-5 h-12 z" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M360 60 h12 v-38 h-12 z M376 60 h12 v-26 h-12 z M392 60 h12 v-16 h-12 z" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <path d="M340 44 H352" stroke="#1a1a1a" stroke-width="1.2"/><path d="M352 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="416" y="60" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">tail cut</text>
  <text x="4" y="82" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">one rescales every bar; the other deletes bars</text>
</svg>

**Both knobs are on the way out.** Anthropic's API reference ranges temperature
0.0–1.0 with a default of 1.0, calls top_p advanced-use-only, and marks both
deprecated: models released after Claude Opus 4.6 reject anything but the
default value with a 400.

## Token Accounting

Recording per-request usage with enough context to attribute it. The provider
returns the raw counts — Anthropic's `usage` object carries `input_tokens`,
`output_tokens`, `cache_creation_input_tokens` and `cache_read_input_tokens` —
and your gateway tags them with feature, tenant, user and trace ID.

Without the tags, a monthly invoice is one number you cannot act on. With them
you can answer which feature costs most, which tenants are unprofitable at their
current price, whether caching is working or merely configured, and whether last
week's prompt edit moved the bill.

The gateway is the right place, because every call already passes through it —
one implementation rather than one per service, and a new caller cannot forget
it.

**Instrument it before cost becomes a problem.** Retrofitting attribution leaves
the first month of data with nothing to be measured against.
