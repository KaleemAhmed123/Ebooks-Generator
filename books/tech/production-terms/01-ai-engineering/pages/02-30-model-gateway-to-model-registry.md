## Model Gateway

One internal service every model call passes through. It holds the provider
credentials and owns routing, retries, fallback, caching, rate limiting and cost
accounting.

Without one, each service that calls a model reimplements those concerns, and
reimplements them differently. The differences get discovered during an
incident. It is also the only place a provider migration can be a configuration
change rather than a coordinated deploy across six repositories.

<svg viewBox="0 0 460 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three application services all call one gateway, which holds the provider credentials and forwards to three model providers">
  <rect x="4" y="8" width="74" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="21" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">search svc</text>
  <rect x="4" y="30" width="74" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="43" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">support svc</text>
  <rect x="4" y="52" width="74" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="65" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">batch job</text>

  <path d="M78 17 H108 V34" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M78 39 H112" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M78 61 H108 V44" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M114 39 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="116" y="24" width="126" height="30" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="128" y="37" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">gateway</text>
  <text x="128" y="48" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">keys · retries · spend</text>

  <path d="M242 39 H274" stroke="#1a1a1a" stroke-width="1.2"/><path d="M276 39 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="278" y="8" width="88" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="286" y="21" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">provider A</text>
  <rect x="278" y="30" width="88" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="286" y="43" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">provider B</text>
  <rect x="278" y="52" width="88" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="286" y="65" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">self-hosted</text>

  <text x="4" y="88" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">everything routes through it, so it is also a single point of failure with its own capacity headroom</text>
</svg>

**The cost accounting is usually what pays for it.** Without a gateway you get a
monthly invoice. With one, spend per feature, per tenant and per model is a
query. Keep it thin — routing, policy, accounting — or the gateway accumulates
business logic and every other team ends up blocked on the gateway team.

## Model Registry

A catalogue of model versions with their lineage, evaluation scores and
deployment status. It is what makes "which model produced this output?" a
question with an answer.

The catalogue is only half of it. Every inference has to log which registry
entry served it. A registry that nothing in production references tells you what
exists, not what happened, and those are different questions.

| If you | You need |
|---|---|
| Call third-party APIs | the version string, plus your eval results for it |
| Fine-tune your own | base model, training data, scores, approver, deployment |

**Scale it to what you actually run.** A training-grade registry for a system
that only calls an API is infrastructure nobody maintains, and an unmaintained
registry is worse than none — it answers questions confidently and wrongly.
