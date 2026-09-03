## Multi-Provider Fallback

Failing over to another provider or model when the primary errors, rate limits
or times out. Provider outages are real and not rare.

A provider degradation took the primary path down for forty minutes. Automatic
fallback meant elevated latency instead of a dead feature.

### How it works

Model providers have outages, degradations and capacity limits like any other
service. If one provider failing takes your feature down, you have accepted
their availability as your ceiling — usually without deciding to.

Fallback means detecting failure — errors, rate limits, timeouts — and routing
to an alternative: another provider, a different model from the same provider,
or a self-hosted deployment.

**The requirement it imposes is prompt portability.** A prompt heavily tuned to
one model's quirks may perform noticeably worse elsewhere, so the fallback path
needs its own evaluation rather than the assumption that it works.

Which means it should be exercised regularly, not only during an incident. An
untested fallback discovered to be broken mid-outage is worse than none, because
you planned around it and stopped considering the alternatives.

### In practice

Define what **degraded** looks like below the fallback, before you need it.

If both providers are unavailable, the options are serving from cache, queueing
the request for later, or returning a clear and honest error. All three are
defensible. Deciding in advance is much better than discovering during the
incident that the actual behaviour is an unhandled exception and a blank screen.
