## A review checklist

- Run it in this order. **The early items reject a diff quickly**, before you spend time reading line by line

### First, before reading any code

- [ ] Is the diff small enough to actually review? If not, **send it back to be split**
- [ ] Does it match the plan or the spec? Anything extra is a question
- [ ] Are there new dependencies? Each one needs a reason
- [ ] Are there new files? Each one needs a reason
- [ ] Did tests change? **Weakened tests are the highest-priority thing to check**

### Then, correctness

- [ ] Every boundary condition and negation, read individually
- [ ] Every external call: does that method exist, with those arguments
- [ ] Error paths: is anything swallowed, is anything left unhandled
- [ ] Async: is anything unawaited, is anything sequential that should be parallel
- [ ] Money, dates and identifiers: types, units, and time zones

### Then, fit

- [ ] Does it use the existing helper, or a new one beside it
- [ ] Does it follow the conventions in `AGENTS.md`
- [ ] Is there an abstraction that only one thing uses
- [ ] Would you have written it this way, and if not, is the difference an improvement
