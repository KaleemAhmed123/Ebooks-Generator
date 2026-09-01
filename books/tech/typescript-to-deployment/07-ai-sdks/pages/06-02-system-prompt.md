## The system prompt

- The system prompt holds what is true for every request: identity, rules, capabilities, and the boundaries of the job
- Keeping it separate from user text is not cosmetic. It is what makes the next three things possible

| Because it is separate | You get |
|---|---|
| it never changes between requests | prompt caching, so it is nearly free after the first call |
| it is not user input | a defensible boundary against injection |
| it is one string in one file | a diff, a review and a rollback |

### A structure that holds up

```text
1. Who you are and what job you do
2. What you have access to, and what you do not
3. Rules, ordered by how much a violation costs
4. How to behave when you do not know
5. The output format, if a schema is not being used
```

### The rules that matter

- **Say what to do, not only what to avoid.** "If the order id is missing, ask for it" beats "do not guess order ids"
- **Give it an exit.** Without an instruction covering ignorance, a model fills the gap with something plausible
- **Put the rule that costs most first.** Attention is not uniform, and the middle of a long prompt is where instructions go to be ignored
- **Never put user data in it.** The moment a customer's message reaches the system prompt, the boundary the last table depends on is gone

### Length

- A long system prompt is not automatically worse, and it is always more expensive to write badly
- Every rule added constrains every request, including the ones it was not written for. Prefer removing an ambiguity to adding a paragraph
