## Embedding arithmetic

- The famous result that proved embeddings capture *meaning*, not just similarity: you can do **arithmetic on word vectors** and land on a sensible word.
- `king − man + woman ≈ queen`. Subtract "male", add "female", and the nearest vector is the female royal.
- This works because directions in the space encode **relationships**. There is roughly a "gender" direction and a "royalty" direction, and words sit at their combination.

:::mint
```python
# vectors from any trained model (gensim shown)
result = model["king"] - model["man"] + model["woman"]
model.most_similar(result)      # -> [('queen', 0.71), ...]

# the same trick captures many relations:
# paris - france + italy       -> rome        (capital-of)
# walking - walk + swim         -> swimming    (verb tense)
```
:::

### How to measure "near"

- Closeness is **cosine similarity** — the angle between two vectors, ignoring their length (Booklet 1). Two vectors pointing the same way score 1; perpendicular scores 0.
- Angle, not distance, because what matters is *direction of meaning*, not how long the vector happens to be.

:::warn
The analogy demo is real but oversold. It works cleanly only for frequent words and well-represented relations; pick an obscure word and the "nearest" result is often noise. Worse, embeddings absorb the **bias** in their training text — *"doctor − man + woman"* has returned *"nurse"*. The vectors learn whatever the corpus contains, prejudices included. Never treat an embedding as a neutral fact about the world.
:::
