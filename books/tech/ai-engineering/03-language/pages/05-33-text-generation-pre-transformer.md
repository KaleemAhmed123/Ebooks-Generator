## Text generation, before the transformer

- Generating text is predicting the next token, over and over. Long before transformers, this was done with **n-gram language models**.
- An **n-gram model** estimates the probability of the next word from the previous *n−1* words, by counting how often that sequence appeared in a corpus. A trigram model uses the last two words: `P(word | previous two)`.

:::mint
```
P("mat" | "sat on") = count("sat on mat") / count("sat on")
# generate: pick the next word by these probabilities, append, repeat
```
:::

### Why counting hits a wall

- **The context is tiny.** A trigram sees two words back. It cannot know that a sentence started with a question, or that "it" refers to something ten words ago.
- **The table explodes.** A 4-gram over a 50,000-word vocabulary has 50,000⁴ possible entries — astronomically more than any corpus can fill.
- **Sparsity.** Most valid word sequences never appear in training, so the model assigns them probability zero. Elaborate *smoothing* tricks patch this, imperfectly.

:::note
n-gram models were the workhorse of speech recognition and autocomplete into the 2010s, and they still ship where speed and simplicity beat quality. Their two hard limits — a fixed, tiny window and no notion that words *mean* anything — are precisely what neural language models fixed: embeddings gave words meaning, and attention (next section) gave the model a window over the *entire* sequence at once.
:::
