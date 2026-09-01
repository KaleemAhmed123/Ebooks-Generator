## Embeddings

- An **embedding** is a list of numbers representing the meaning of a piece of text, produced by a model built for that job alone
- Two texts about the same thing land close together in that number space, even with no words in common
- That closeness is what makes semantic search possible, and it is the foundation of everything in Module 7
- It is a different model, a different endpoint and a far cheaper one than a chat call

```ts
const { data } = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: ["How do I cancel an order?", "Order cancellation policy"],
})

data[0].embedding.length   // 1536
```

### Comparing two of them

```ts
function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}
```

- **Cosine similarity** measures the angle between two vectors, ignoring length. `1` is identical, `0` unrelated
- In practice a database does this, not your code. The formula is here so the query in Module 7 is not a black box

### The rules

- **The same model must produce every vector you compare.** Vectors from two models are not comparable at all, so changing the model means re-embedding everything
- Batch the input array. One request for a hundred texts is far cheaper and faster than a hundred requests
- `dimensions` can shorten the vector, trading a little accuracy for a lot of storage
