## Testing in Production

Verifying against the live system: canary releases, flags exposing a feature to a
slice of traffic, synthetic transactions (scripted requests run on a schedule
against the live system), shadow traffic mirrored to a new service.

It covers what staging cannot reproduce — real data shapes, real volume, real
third parties, and the configuration that exists nowhere else. It replaces none
of the testing done before release.

**It is only a practice if the blast radius is bounded first.** A canary or a flag needs one you can turn
off in seconds and a metric telling you to. Shadow traffic earns its safety
differently, by stubbing every side effect.

## The Observability Bill

Monitoring priced per host, per ingested GB and per metric series — so it grows
with the size of the estate, not with the value it returns. Datadog list price,
2026: $15 per host per month for Infrastructure Pro on annual billing, $31 per
host for APM, application performance monitoring, on top, with 100 custom metrics included per host on Pro.

**Cardinality, not host count, is what breaks the budget.** A metric tagged with
user ID or request ID becomes one billed time series per distinct value, so one
well-meant tag on a hot path turns one metric into one series per distinct value: hundreds of thousands, or
hundreds of millions.
Every vendor bills custom metrics per series, and none of them stop you adding
the tag.
