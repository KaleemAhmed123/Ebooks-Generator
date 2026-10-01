## Prompting VLMs in practice

- A VLM is still an LLM: the same prompting levers apply, plus a few visual-specific ones. Knowing them is the difference between a model that "sort of sees" and one that answers reliably.

### Levers that carry over from text
- **Structured output.** Ask for JSON and constrain it (Booklet 4) so answers are machine-usable and comparable.
- **Chain-of-thought.** "Describe what you see, then answer" often beats a bare answer — the model grounds its reasoning in an explicit description first.
- **Few-shot.** Interleaved image-text examples (Flamingo's gift) steer format and behavior.

### Levers unique to vision
- **Point, don't describe.** For UI/robot tasks, ask for coordinates or a set-of-marks number, not prose.
- **Zoom / crop.** If detail matters, crop to the region and send it at high resolution rather than the whole low-res image — you control the token budget *and* the detail.
- **Ask it to read first.** For documents, "transcribe the table, then answer" forces the model to actually read the cells before reasoning.

<svg viewBox="0 0 360 72" role="img" aria-label="Describe-then-answer grounds the model before it reasons" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="24" width="90" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="59" y="34" text-anchor="middle" font-size="6">bare: "how many?"</text><text x="59" y="44" text-anchor="middle" font-size="5.5" fill="#a03050">guesses</text>
  <rect x="130" y="24" width="216" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="238" y="34" text-anchor="middle" font-size="6">"list each person you see, then count them"</text><text x="238" y="44" text-anchor="middle" font-size="5.5" fill="#1a3a2a">reads, then answers → more reliable</text>
</svg>

:::interview
"A VLM keeps miscounting objects. Fixes?"

In order of effort: (1) prompt it to enumerate before counting ("list each item, then give the total") so counting becomes explicit; (2) raise resolution/crop so small items are actually resolved; (3) request structured output to force a definite list; (4) if it still fails, the encoder likely cannot resolve the objects — change the model or the input, not the prompt. Counting failures are usually perception or reasoning-format problems, rarely the LLM being "too small."
:::
