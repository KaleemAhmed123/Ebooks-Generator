## How do you turn a transformer into one vector for a whole sentence?

- You need a single fixed vector per sentence for retrieval/clustering, but a transformer outputs one vector **per token**. You must pool them.
- **CLS pooling:** take the special `[CLS]` token's vector (BERT). Works only if the model was trained so `[CLS]` summarises the sequence — raw BERT's `[CLS]` is a poor sentence embedding out of the box.
- **Mean pooling:** average all token vectors. Usually a stronger default than naive `[CLS]`.
- The real fix is **Sentence-BERT (SBERT)**: fine-tune the encoder with a **contrastive/siamese** objective so that similar sentences land near each other under cosine similarity. General-purpose embedding models are trained this way.
- Takeaway: a good sentence embedding comes from **training for similarity**, not from any single pooling trick on a vanilla LM.

:::interview
What's really being tested:

that pooling alone isn't enough — a usable embedding model is contrastively fine-tuned (SBERT-style) so distance reflects meaning.
:::
