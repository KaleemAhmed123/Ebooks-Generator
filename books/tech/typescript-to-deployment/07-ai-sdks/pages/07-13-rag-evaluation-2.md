### Then measure the answer

| Check | Means |
|---|---|
| **faithfulness** | every claim is supported by a retrieved source |
| **relevance** | it actually answered the question asked |
| **refusal rate** | how often it correctly declined |

- Faithfulness is scored by a second model reading the answer against the sources, which is reliable enough to catch regressions

### The discipline

- **Run it in CI on every chunking, prompt or model change.** These are the changes that silently move quality
- **Add every reported failure to the set** as a permanent row. The set is the memory of what has already gone wrong
