## When retrieval is the wrong answer

- Retrieval has become the default response to every question about custom data, and it is often the more complicated way to be wrong

### The corpus is small

- Under roughly 50,000 tokens, put the whole thing in the prompt and cache the prefix
- No chunking, no embeddings, no index, no staleness, and better answers because nothing was cut
- **Prompt caching changed this calculation.** A cached handbook costs a tenth of normal input price on every call after the first

### The answer is a database row

- `What is the status of order o_842` is a `SELECT`, not a similarity search
- **Give the model a tool that queries the database.** Vector search over structured records is a slower, less accurate query
- The rule: retrieval is for **unstructured text**. Structured data belongs behind a tool

### The question needs aggregation

- `How many refunds last quarter` cannot be answered by five retrieved chunks, because the answer is in none of them
- Counting, summing and ranking are SQL. Give it a tool, or a fixed set of parameterised queries it can choose between

### It needs everything, not a few passages

- `Summarize this contract` needs the whole contract. Retrieving five chunks of it produces a summary of five chunks
- Use the full document, or a map-reduce pass over sections, not top-k retrieval

### The test

- **Ask which passages a human expert would open to answer this.** If the answer is a few, retrieval fits. If it is all of them, or none, it does not
