## Prompt Caching

Provider-side reuse of the KV cache for a stable prompt prefix, cutting both
latency and input cost sharply on repeated calls.

A 12k-token system prompt plus tool definitions is cached. Subsequent calls
within the TTL bill the cached portion at a large discount and start faster.

### How it works

Prompt caching is the provider doing the KV-cache trick *across* separate
requests instead of within one.

If every request starts with the same ten thousand tokens of system prompt and
tool definitions, the provider is redoing identical work every time. Caching
lets it keep the processed form of that prefix and reuse it.

**The mechanism has one rule that governs how you write prompts:** it matches
from the very beginning of the input and only up to the first difference. One
changed character near the start invalidates everything after it.

So: **most stable content first, most variable content last.** Put a timestamp
at the top of your system prompt and you have disabled caching entirely without
noticing — the prompt still works, the bill simply never improves.

### In practice

Caches expire, typically after a few minutes of disuse. Low-traffic endpoints
may never benefit at all, because each request arrives after the previous cache
has already gone.

It is most valuable on a hot path with a large fixed preamble — which is exactly
the shape of a retrieval or agent system, and exactly where the bill is largest.
The two line up conveniently, which is unusual enough to be worth exploiting
deliberately.
