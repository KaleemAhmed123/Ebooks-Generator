# AI Engineering: From Scratch

## Word Embeddings

Language models do not read words; they process vectors. An embedding is a dense vector of numbers that captures the semantic meaning of a word. 

### From Bag-of-Words to Word2Vec

Before embeddings, we used One-Hot Encoding: an array of 10,000 zeros with a single `1` corresponding to the word's index. The problem: distance meant nothing. The distance between "Dog" and "Cat" was identical to "Dog" and "Laptop".

Word2Vec (2013) solved this by mapping words into a lower-dimensional continuous space (e.g., 300 dimensions). It trained a shallow neural network to predict a word based on its neighbors.

### Semantic Vector Math

Because the vectors capture meaning, arithmetic in the embedding space mirrors real-world logic:
`Vector("King") - Vector("Man") + Vector("Woman") ≈ Vector("Queen")`

Embeddings form the foundation of all modern NLP. When a prompt goes into an LLM, the very first layer translates each token into its semantic embedding vector before any attention operations occur.
