## Prompt Versioning

Treating prompt text as a versioned artifact: every change carries a diff, a
timestamp, an author, and ideally the evaluation delta it produced. Independent
of where the prompts are stored at runtime.

The cheapest implementation that works is keeping them in the repository as
files, which inherits history, review and rollback from git and adds no system
to maintain. "It got worse sometime last week" is an unanswerable sentence
without that record; with it, the answer is one line somebody edited while
fixing something else.

**A prompt version alone does not describe a reproducible system.** The same
text behaves differently against a different model version and a different
index. Version the prompt, the model identifier and the retrieval settings as
one unit, so what you restore — and what you point at when asked what changed —
is the whole configuration.

## Provider Rate Limit Handling

Providers cap requests and tokens per minute per account. Cross the line and you
get 429s, and retrying naively extends the throttling rather than escaping it.

Three things, in the order they are usually missed. Honour the response:
rate-limit headers report your remaining budget and when it resets, and
`Retry-After` states exactly how long to wait — better than any backoff you
would invent. Limit on your own side before calling, so you shape traffic
instead of finding the ceiling by hitting it. Separate workloads, because batch
and interactive share one account budget by default.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One shared account budget lets a batch job crowd out interactive traffic, while separate keys give the batch job a hard ceiling below the total">
  <text x="4" y="20" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">shared</text>
  <rect x="58" y="10" width="290" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="66" y="22" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">backfill</text>
  <rect x="348" y="10" width="34" height="16" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <text x="388" y="22" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">429</text>

  <text x="4" y="54" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">separate</text>
  <rect x="58" y="44" width="180" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="66" y="56" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">batch key — hard ceiling</text>
  <rect x="242" y="44" width="184" height="16" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="250" y="56" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">interactive key — headroom kept free</text>

  <text x="4" y="80" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the split is configuration, and it is what stops a bulk job becoming an outage</text>
</svg>

**A backfill can consume the whole quota and take down the user-facing product
while doing nothing wrong.** Give background work its own key and a ceiling well
below the total. It can wait; users cannot.
