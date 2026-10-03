## A model advertises a 1M-token context. What actually breaks as you use it?

- **Cost:** attention is O(n²); the KV cache is O(n). A million-token prompt is expensive in latency and memory even if it "fits." Long context is not free just because it's supported.
- **Lost in the middle:** models attend most reliably to the **start and end** of the context and can miss facts buried in the middle. Advertised length ≠ usable recall.
- **Positional extrapolation:** if context was extended by rescaling RoPE rather than training at full length, quality can degrade toward the far end.
- **Effective vs advertised context:** benchmarks like RULER / needle-in-a-haystack measure the length at which retrieval actually holds up — often well below the headline number.

:::warn
"Just stuff everything in the context window" is the trap. Beyond cost, recall sags in the middle. Retrieval (RAG) that puts the *right* 5k tokens in beats dumping 500k tokens in.
:::

:::interview
What's really being tested:

that you distinguish advertised from effective context, name lost-in-the-middle, and still prefer good retrieval over brute-force stuffing.
:::
