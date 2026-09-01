## Measuring retrieval

- Retrieval quality cannot be judged by reading answers. It feels fine until a user asks the question you never tried
- **Evaluate the retrieval step separately from the answer step**, because they fail independently and have different fixes

### Build the set first

```ts
// eval/retrieval.json, 50 to 200 rows, grown from real questions
[
  { "question": "how long does a refund take", "mustRetrieve": ["returns-policy#refunds"] },
  { "question": "who pays return shipping",   "mustRetrieve": ["returns-policy#shipping"] }
]
```

| Metric | Answers |
|---|---|
| **recall at k** | was the right chunk in the top k at all |
| **MRR** | how high up it was |
| **precision at k** | how much of what was returned was noise |

- **Recall at k is the one to optimize first.** Nothing downstream can recover a chunk that was never retrieved
