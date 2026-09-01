## When to just write it

- Delegation has a fixed cost: describing the task, waiting, reading the result, correcting it. **Below a certain size that cost exceeds the work**

### Write it yourself when

| Situation | Why |
|---|---|
| **you can type it in two minutes** | the prompt takes longer than the code |
| **the design is the hard part** | that is the part you cannot delegate |
| **it is core domain logic** | this is the code that must be understood |
| **you are learning this area** | delegating skips the learning |
| **it needs context only you have** | a conversation last week, a customer complaint |
| **two attempts have already failed** | the third will fail too |

### Delegate when

- It is **mechanical**: a repetitive edit, a migration, a set of similar tests
- It is **verifiable**: there is a test, a type check, or a script that says yes or no
- It is **unfamiliar**: a library, a language or a config format you would otherwise be reading docs for
- It is **the first draft** of something you will heavily edit

### The middle path, which is the common one

- **Write the interface and the test yourself. Delegate the implementation.** The parts requiring judgement stay with you, and the typing does not
- Or the reverse: let it draft, then rewrite the parts that matter. A draft is genuinely useful even when little of it survives

### The honest measure

- **Did that take less total time, including the review?** Not less typing. Less total time
- For a large share of small tasks the honest answer is no, and noticing that is a skill worth having
