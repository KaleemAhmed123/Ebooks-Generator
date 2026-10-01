## Synthetic media and detection

- Watermarking and provenance (18-40) exist because generative models can produce **synthetic media** — deepfakes — indistinguishable from real. The harms are concrete and current: non-consensual imagery, fraud (voice-cloned "CEO" authorising a wire), election disinformation, and fabricated evidence.
- **Detection is a losing arms race on its own.** Detectors trained to spot generation artifacts are beaten by the next generation of models, which learn to avoid those artifacts — so *post-hoc detection* ("is this image AI?") is unreliable against a current, motivated adversary.

<svg viewBox="0 0 360 78" role="img" aria-label="Detection and provenance as complementary: detection guesses after the fact, provenance proves origin at creation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="20" width="150" height="42" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="89" y="34" text-anchor="middle" font-size="6.5" fill="#a03050">detection (after)</text><text x="89" y="48" text-anchor="middle" font-size="5.5">guess from artifacts →</text><text x="89" y="57" text-anchor="middle" font-size="5.5">loses the arms race</text>
  <rect x="184" y="20" width="162" height="42" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="265" y="34" text-anchor="middle" font-size="6.5" fill="#3b7a57">provenance (at creation)</text><text x="265" y="48" text-anchor="middle" font-size="5.5">sign origin at source (C2PA) +</text><text x="265" y="57" text-anchor="middle" font-size="5.5">watermark output (SynthID)</text>
</svg>

- **Provenance shifts the strategy** from "detect the fake" to "authenticate the real." Instead of guessing whether content is generated, you *sign genuine content at creation* (C2PA in the camera/editor) and *watermark generated content at the model* (SynthID) — so the question becomes "does this have valid provenance?" rather than "does this look fake?"
- **Neither is a silver bullet** (18-40): watermarks weaken under editing, C2PA metadata is strippable, detectors are evadable. The realistic goal is *friction and labelling at scale* for the non-adversarial majority — platforms tagging likely-AI content, models refusing certain generations — not defeating a determined forger.

:::interview
"Can you detect AI-generated content reliably?"

Not by post-hoc detection against a motivated adversary — it's an arms race the detector loses, because each model generation learns to avoid the artifacts detectors look for. The durable strategy inverts the question: **authenticate the real** via signed provenance at creation (C2PA) and **watermark the generated** at the model (SynthID), so you check for valid provenance rather than guess at fakeness. Even then it's friction, not proof — watermarks survive only non-adversarial handling, metadata strips easily. So the honest answer is: reliable detection of a determined forgery, no; scalable labelling and provenance for the ordinary majority, yes — and that's what platforms and regulation are building toward.
:::
