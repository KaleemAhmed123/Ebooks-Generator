## Prompt Registry

A central store where prompts live with metadata, so they can be updated without
a code deploy and stay consistent across services.

Three services each carrying their own copy of the classification prompt drift
apart within a month. One registry entry, fetched and cached, keeps them
identical.

### How it works

Once several services use the same prompt — a classifier, a summariser, an
extraction template — the copies drift. Someone improves one, the others keep
the old wording, and the same task now behaves differently depending on which
service handled it.

A registry stores prompts centrally so every consumer reads one definition, and
so a prompt can change without redeploying everything that uses it.

**That second property is the main reason to adopt one, and it is also the
risk.** A registry called on every request is a new hard dependency on the
request path. If it is slow, you are slow. If it is down, you are down.

The standard mitigation is to fetch and cache locally with a TTL, and to ship a
bundled fallback copy so that a cold start with an unreachable registry still
serves.

### In practice

Being able to change prompts without deploying is genuinely useful, and it
quietly removes prompts from your review process.

Keep the controls you would apply to code: an approval step, an evaluation run
before publish, and version history. Otherwise what you have built is a way to
change production behaviour with no review — which is exactly what it looks like
at six o'clock on a Friday, when somebody is fixing one last thing.
