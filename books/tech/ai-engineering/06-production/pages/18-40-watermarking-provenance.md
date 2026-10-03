## Watermarking and content provenance

- As AI output becomes indistinguishable from human work, *"was this generated?"* becomes a question with real stakes — misinformation, fraud, academic integrity, training on AI slop. Two complementary answers: **watermarking** (mark the output at generation) and **provenance** (attach verifiable origin metadata).

| Approach | What | Example |
|---|---|---|
| **text watermark** | bias token sampling to a detectable pattern | SynthID-Text (Google) |
| **image watermark** | embed an imperceptible signal in pixels | SynthID, Stable Signature |
| **content provenance** | signed metadata of origin + edits | C2PA / Content Credentials |

- **Watermarking** hides a statistical signal *in the output itself*. For text, the generator subtly biases which tokens it samples toward a secret pattern a detector can later spot, without changing meaning; for images, an imperceptible pattern survives resizing and compression. The signal rides *inside* the content, so it travels with a copy.
- **Provenance (C2PA)** takes the opposite tack: cryptographically *sign* metadata describing how a piece of media was created and edited, attached at the source (camera, model, editor). It proves origin when present — but metadata can be stripped, whereas a watermark is embedded.

:::warn
Neither is robust against a determined adversary, and claiming otherwise is the trap. Text watermarks weaken under paraphrasing and heavy editing; image watermarks can be attacked or degraded; C2PA metadata is trivially removed by a screenshot. They *raise the cost* of passing off AI content and enable *good-faith* labelling at scale — a platform tagging AI images, a model refusing to train on watermarked output — but they are not a reliable "is this AI?" detector for an adversary trying to evade them. Treat them as provenance hygiene, not proof.
:::
