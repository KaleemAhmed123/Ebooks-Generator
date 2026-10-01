## Why did neural language models replace n-gram models?

- An **n-gram model** predicts the next word from the previous n−1 words using counts from a corpus. Simple and fast, but two hard walls:
  - **Sparsity / no generalisation:** unseen word combinations get zero probability. "purple elephant sang" never occurred → probability 0, even though it's valid. Smoothing patches this crudely.
  - **No long context:** memory and counts blow up exponentially with n, so n stays tiny (3–5). It can't model dependencies beyond a few words.
- **Neural LMs** embed words into a continuous space, so similar contexts share statistical strength — "purple elephant" benefits from having seen "purple cat." They generalise to unseen combinations and, with transformers, model long context.
- The jump from counting to **learned continuous representations** is the whole reason modern LMs generalise.

:::interview
What's really being tested:

the two n-gram failures (sparsity and short context) and that embeddings/generalisation are what neural models add.
:::
