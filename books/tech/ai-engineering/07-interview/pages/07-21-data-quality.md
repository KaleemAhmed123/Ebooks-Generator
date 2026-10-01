## "How do you handle data quality and labeling problems?"

- **What they're screening for:** respect for data — most AI quality problems are data problems, and senior engineers know it.
- **A strong answer shows:**
  - **Data-first instinct** — before blaming the model, inspect the data: errors, imbalance, leakage, stale/irrelevant documents, inconsistent labels.
  - **Labeling rigor** — clear guidelines, measure **inter-annotator agreement** (low agreement = ill-defined task, not just lazy labellers), adjudicate disagreements, and spot-check quality.
  - **Practical tactics** — start small and high-quality over large and noisy; use LLMs to pre-label or flag suspect examples for human review; active learning to label the most informative cases.
  - **Close the loop** — mine production failures back into the dataset/eval set.
  - **For RAG/retrieval** — the "data" is your corpus: dedup, freshness, chunking, and coverage matter as much as model choice.
- The theme: **garbage in, garbage out** — invest in data, and measure its quality, not just the model's.

:::warn
Weak: "I'd try a bigger model." Strong: "First I'd audit the data — agreement, leakage, imbalance — because most quality gaps are data; fix guidelines and the worst labels before touching the model."
:::

:::interview
What's really being tested: a data-first mindset — diagnosing quality via data audits and labeling rigor (inter-annotator agreement, leakage) before reaching for a bigger model.
:::
