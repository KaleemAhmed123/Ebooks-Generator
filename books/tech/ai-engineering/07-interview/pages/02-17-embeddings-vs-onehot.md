## Why learn dense embeddings instead of using one-hot vectors?

- A **one-hot** vector has one 1 and the rest 0s — a word in a 50,000-token vocabulary is a 50,000-long vector. Every pair is equidistant: "cat" is as far from "dog" as from "democracy". No notion of similarity.
- An **embedding** maps each token to a short dense vector (e.g. 768 numbers) learned so that similar meanings land nearby. Similarity becomes a dot product.
- Three concrete wins: **compact** (768 vs 50,000), **generalising** (the model shares statistical strength across similar tokens), and **composable** (you can do arithmetic and feed them to downstream layers).
- One-hot also makes the first weight matrix enormous and mostly wasted; the embedding table *is* that matrix, factored into something learnable and small.

:::interview
What's really being tested:

that one-hot destroys similarity structure and wastes dimensions, while a learned embedding puts meaning into geometry — the foundation of everything from word2vec to RAG.
:::
