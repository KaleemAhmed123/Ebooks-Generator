## The model keeps repeating itself. What causes it and what are the fixes?

- Repetition/looping comes from the model assigning high probability to continuing a pattern it already started — greedy and low-temperature decoding amplify it, and it's a known failure of likelihood-maximising decoders.
- Decoding-time fixes:
  - **Repetition penalty** — divide the logits of already-seen tokens by a factor (>1) so they're less likely to recur.
  - **Frequency/presence penalties** — subtract a penalty proportional to how often (frequency) or whether (presence) a token already appeared.
  - **No-repeat n-gram** — forbid repeating any n-gram outright.
  - **Raise temperature / use top-p** — add diversity so it doesn't lock onto one path.
- Deeper causes to mention: too-low temperature, a model under-trained for the length, or a prompt that invites list-like repetition. Tune penalties lightly — too strong and the model avoids necessary words.

:::interview
What's really being tested:

that you know repetition is a decoding pathology, can name the specific penalties and their knobs, and the caveat that over-penalising harms fluency.
:::
