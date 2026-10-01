## Fine-tuning vs RAG vs prompting — how do you decide?

- They solve different problems; the mistake is treating them as rivals.
  - **Prompting** (incl. few-shot) — change *behaviour* cheaply, no training. Try first. Good when a well-crafted instruction + examples get you there.
  - **RAG** — inject *knowledge* that's large, changing, or private. Facts live in a store you can update without retraining; answers can cite sources. The default for "the model doesn't know our data."
  - **Fine-tuning** — change *behaviour/format/style/skill* that prompting can't reliably achieve, or bake in a narrow task at lower latency/cost per call. Teaches *how*, not *what facts*.
- Decision heuristics:
  - Need **fresh/private facts** → RAG (not fine-tuning — it's bad at injecting and updating knowledge).
  - Need a **consistent format, tone, or niche skill** → fine-tuning.
  - Need **a quick behaviour change** → prompting.
- They **compose**: fine-tune for format + RAG for facts + a good prompt is a common production stack.

:::interview
**What's really being tested:** the clean split — prompting/fine-tuning change behaviour, RAG changes knowledge — and that fine-tuning is the wrong tool for injecting facts.
:::
