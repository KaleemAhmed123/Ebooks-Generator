## How does tokenization create a fairness and cost gap across languages?

- Tokenizers are trained mostly on English-heavy data, so English words map to few tokens. The same meaning in Hindi, Thai, or Burmese can take **3–5× more tokens** — sometimes one token per byte.
- Consequences:
  - **Cost:** per-token billing means non-English users pay more for the same request.
  - **Latency:** more tokens → slower responses.
  - **Effective context shrinks:** an "8k-token" window holds far less actual content in a token-inflated language.
  - **Quality:** heavily fragmented text is harder to model, compounding the disadvantage.
- Mitigations: more balanced multilingual tokenizer training, larger/byte-level vocabularies, and language-specific models. It's a concrete equity issue an interviewer may raise under "responsible AI."

:::interview
What's really being tested:

awareness that tokenization isn't neutral — it imposes real cost, context, and quality penalties on under-represented languages.
:::
