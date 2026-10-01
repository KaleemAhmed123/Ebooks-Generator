## Rapid mock: translation / localization platform

- **Prompt:** "Build a translation/localization platform for a product's content." **Clarify:** many language pairs, domain terminology must be consistent (brand terms, product names), quality varies by language, human translators review, glossary enforcement.
- The insight: **raw LLM translation isn't enough** — the platform is about *consistency* and *terminology control*, which need infrastructure around the model.

- **The design.** Content → **glossary injection** (retrieve the approved translations for brand/product terms and force them into the prompt or via constrained decoding) → LLM translation → **quality estimation** (an LLM-judge or QE model scores each translation) → **route by score**: high-quality auto-publish, low-quality to human translators → a **translation memory** caches approved translations so identical segments never re-translate (prompt caching for text, 17-41).
- **Terminology consistency is the product.** A translation that renders your brand term three different ways across a page is worse than a slightly clunky consistent one. The glossary + translation memory enforce consistency the raw model won't; that infrastructure is the differentiator, not the model.

:::interview
"What makes a translation platform more than 'call the LLM to translate'?"

Consistency and control, which need infrastructure around the model. **Glossary enforcement** — inject or constrain approved translations for brand/product terms so they render identically everywhere (raw LLM translation drifts). **Translation memory** — cache approved segment translations so identical content never re-translates, cutting cost and guaranteeing consistency (text-level prompt caching). **Quality estimation** — score each translation and route low-quality ones to human reviewers, whose corrections feed the memory and glossary. **Per-language quality awareness** — the model is stronger on some pairs than others, so gate accordingly. The platform's value is the consistency layer (glossary + memory + QE routing), not the translation call itself.
:::
