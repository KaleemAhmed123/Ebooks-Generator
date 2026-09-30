## Machine translation

- Translation is the task that drove NLP's biggest jumps — every architecture in this booklet was tested on it first. Its history is a clean ladder of the ideas so far.

### The four eras

- **Rule-based (pre-2000s).** Hand-written grammar and dictionaries. Brittle; every language pair a new project.
- **Statistical MT (2000s).** Learn phrase-to-phrase probabilities from millions of translated sentence pairs (parallel corpora). Google Translate's first engine.
- **Neural MT (2014–2017).** seq2seq + attention. One model, trained end to end, beat decades of statistical pipelines.
- **Transformer MT (2017–now).** The transformer was *introduced in a translation paper* ("Attention Is All You Need") and set the standard it still holds.

### How quality is measured

- **BLEU** — the classic score: how much the machine's word sequences overlap with a human reference translation, from 0 to 100. Cheap, automatic, and the field's long-standing benchmark.

:::warn
BLEU rewards **word overlap, not meaning.** A translation that is fluent and correct but phrased differently from the reference scores low; a clumsy translation that reuses the reference's words scores high. It also cannot judge a single sentence reliably — it was designed for corpus averages. As of September 2026, teams pair it with meaning-aware metrics (COMET, BERTScore) or an LLM judge for anything user-facing. Never ship a translation system judged on BLEU alone.
:::
