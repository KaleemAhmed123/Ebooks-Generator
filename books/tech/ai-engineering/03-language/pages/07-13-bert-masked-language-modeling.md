## BERT and masked language modeling

- **BERT** (Google, 2018) is an **encoder-only** transformer — the understanding half. It reshaped NLP by pretraining on unlabeled text, then fine-tuning cheaply for any task.
- Its pretraining trick is **masked language modeling (MLM)**: hide ~15% of the tokens at random and train the model to fill them back in, using context from **both sides**.

:::mint
```
input:   the cat [MASK] on the mat
target:              sat
# bidirectional context: "cat" (left) + "on the mat" (right) → "sat"
```
:::

- Because it sees left and right, BERT builds deeply contextual token vectors — the fix for word2vec's one-vector-per-word limit, finally realized.

### Pretrain once, fine-tune many

- Pretraining on billions of words is expensive and done once. Then you bolt a tiny task head on top and fine-tune on a small labeled set — sentiment, NER, QA — for cheap. This **pretrain-then-fine-tune** recipe is BERT's lasting contribution.

:::warn
BERT **cannot generate text.** MLM teaches it to fill gaps with full context, not to write left to right, so there is no next word to sample — asking BERT to "continue this sentence" is a category error. Its home is understanding: classification, retrieval embeddings, token labeling. For generation you need a causal decoder — GPT, next page. Picking the wrong family for the task is a common and costly mistake.
:::
