## Zero-shot vs few-shot prompting — and how do you choose the examples?

- **Zero-shot:** just the instruction. **Few-shot:** the instruction plus a handful of input→output examples that demonstrate the task by pattern.
- Few-shot helps most when: the **output format** is specific, the task is **niche** or easily misread, or you need a consistent style. It leverages in-context learning.
- Choosing examples matters more than people expect:
  - **Representative & diverse** — cover the input variety, including tricky cases, not three near-identical easy ones.
  - **Correct and consistently formatted** — the model copies your format *and* your mistakes.
  - **Order matters** — recency and ordering bias outputs; the last example has outsized influence.
  - **Dynamic selection** — retrieve the examples most similar to the current input (kNN few-shot) rather than a fixed set.
- Cost: examples eat context/tokens on every call. If a fixed task runs at volume, consider fine-tuning instead of permanent few-shot overhead.

:::interview
What's really being tested: that few-shot teaches format/pattern via ICL, that example quality/diversity/order are the levers, and the cost tradeoff vs fine-tuning at volume.
:::
