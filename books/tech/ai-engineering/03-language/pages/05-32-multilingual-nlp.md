## Multilingual NLP

- English is ~5% of the world's speakers but the majority of most training corpora. **Multilingual NLP** is the work of making models serve the other thousands of languages.
- The modern approach: one model, many languages, a **shared subword vocabulary and embedding space**. Models like mBERT, XLM-R, and today's large multilingual LLMs train on 100+ languages at once.

### Why one shared space helps

- Languages that share structure or script reinforce each other. Facts learned in a high-resource language can **transfer** to a low-resource one that shares the space — *cross-lingual transfer*.
- Ask in Swahili, retrieve a fact the model mostly learned in English: possible only because both map into the same vectors.

:::warn
Two failure modes dominate. **The resource cliff** — quality drops sharply for languages with little training text; a model fluent in French can be near-useless in Yoruba. **The tokenizer tax** — a BPE vocabulary trained mostly on English (page 05-24) splits other languages, especially non-Latin scripts, into far more tokens. The same sentence in Thai or Burmese can cost 5–10× the tokens of its English translation — meaning slower responses, smaller effective context, and higher bills for exactly the users already least served. Check your tokenizer's behavior on your target languages before promising coverage.
:::
