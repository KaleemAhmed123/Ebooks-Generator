## What is cross-attention, and where is it used?

- In **self-attention**, Q, K, and V all come from the same sequence. In **cross-attention**, the **queries come from one sequence and the keys/values from another**.
- In an encoder-decoder (translation, summarisation), the decoder's tokens form the queries; the encoder's output supplies the keys and values. So each generated token looks back at the full source text to decide what to produce next.
- It's the bridge that lets output condition on input: the decoder "asks" (query) the encoded source "what's relevant here?" (keys), and pulls in the answer (values).
- Cross-attention also appears in multimodal models — text queries attending to image patch keys/values (e.g. in VLM connectors like Flamingo's gated cross-attention).

:::interview
What's really being tested:

that the only change from self-attention is *where Q vs K,V come from*, and that this is how a decoder conditions on an encoder (and how modalities fuse).
:::
