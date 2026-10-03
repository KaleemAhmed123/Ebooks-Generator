## How can you tell if content was AI-generated — watermarking and provenance?

- Two broad approaches, both imperfect:
  - **Watermarking** — embed a hidden, detectable signal at generation time. For text, bias token sampling toward a secret pattern (e.g. SynthID-Text) detectable statistically; for images/audio, imperceptible signals (SynthID, Stable Signature). Robust-ish but can be weakened by heavy editing/paraphrasing, and only works if the generator cooperated.
  - **Provenance / content credentials** — cryptographically sign metadata about how content was made and edited (**C2PA**). Tells you the *origin/history* rather than detecting generation; breaks if metadata is stripped.
- **Post-hoc detectors** (classifiers that guess "AI or human") are **unreliable** — high false-positive rates, especially on non-native English, and easily evaded. Don't make consequential decisions (e.g. accusing a student) on them.
- Honest stance: there's no robust universal detector. Watermarking + provenance **reduce** uncertainty for cooperating generators; detection of arbitrary AI text is not a solved problem.

:::interview
What's really being tested: that you distinguish watermarking (embedded signal) from provenance (signed history, C2PA), know both are evadable, and that post-hoc AI-text detectors are unreliable — so you don't over-trust them.
:::
