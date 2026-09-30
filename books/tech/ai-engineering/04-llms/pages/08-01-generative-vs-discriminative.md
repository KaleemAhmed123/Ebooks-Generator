# Generative Models & Sampling

## Generative vs discriminative

- Booklets 1–3 mostly built **discriminative** models: given an input, predict a label. Spam or not. Cat or dog. Which token comes next as a *classification*.
- A **discriminative model** learns the boundary between classes — `P(label | input)`, the probability of a label given the data.
- A **generative model** learns the data itself — `P(input)`, or `P(input | label)`. Once you can score how likely any input is, you can **sample new inputs** that look like the training data.

<svg viewBox="0 0 340 96" role="img" aria-label="Discriminative models draw a boundary between two clusters; generative models learn the shape of each cluster" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="85" y="12" text-anchor="middle" fill="#24405e">discriminative: the line</text>
  <g fill="#c0392b"><circle cx="40" cy="40" r="3"/><circle cx="52" cy="52" r="3"/><circle cx="34" cy="60" r="3"/></g>
  <g fill="#1a3a2a"><circle cx="110" cy="44" r="3"/><circle cx="124" cy="58" r="3"/><circle cx="116" cy="70" r="3"/></g>
  <line x1="78" y1="24" x2="78" y2="86" stroke="#24405e" stroke-dasharray="3 2"/>
  <text x="255" y="12" text-anchor="middle" fill="#24405e">generative: the shapes</text>
  <ellipse cx="215" cy="52" rx="26" ry="18" fill="none" stroke="#c0392b"/>
  <ellipse cx="290" cy="58" rx="26" ry="18" fill="none" stroke="#1a3a2a"/>
</svg>

- A spam classifier only answers "spam?". A generative model of email could *write* a plausible email. That extra power is the whole game for large language models: they are generative models of text.

:::note
Every large language model is a generative model trained on one task — predict the next token. Learn `P(next token | all previous tokens)` well enough and you can generate essays, code, and answers by sampling one token at a time.
:::

:::warn
Generative is harder than discriminative. Learning the full shape of data needs far more examples and compute than learning a single boundary. This is why frontier LLMs train on trillions of tokens, while a good spam classifier needs only thousands of emails.
:::
