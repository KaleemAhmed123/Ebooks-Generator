## KV Cache

*key-value cache*

During generation the model stores computed attention keys and values, so
previous tokens are not reprocessed for every new token.

An 8,000-token system prompt reprocessed on every request costs 3.2 seconds.
Cached, subsequent requests reuse it and begin generating in 0.4.

### How it works

One idea about generation makes this obvious. The model produces one token at a
time, and for each new token it looks back at every previous token to decide
what comes next. That looking-back computes two intermediate values per earlier
token — conventionally the *key* and the *value*.

Here is the waste. Those keys and values depend only on the tokens **before**
them, so they are identical every time. Recomputing them for token 501 when they
were already computed for token 500 is pure repetition.

The cache simply stores them. Generate a token, keep its key and value, reuse
them for every token after.

This is why generation gets faster after the first token rather than slower,
despite the sequence growing longer — an observation that otherwise looks
backwards.

### In practice

**The cost is memory, and it is larger than people expect.** The cache grows
with sequence length multiplied by how many requests are in flight at once.

On self-hosted infrastructure this — not the model weights — is usually what
caps concurrency. It explains a result that surprises teams the first time they
hit it: a server handling sixty-four short conversations comfortably will fall
over on eight long ones, with the same model on the same hardware.
