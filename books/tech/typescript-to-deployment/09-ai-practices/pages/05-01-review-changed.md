# Module 5 - Reviewing code you did not write

## Why review is different now

- Reviewing a colleague's pull request comes with information you no longer have: you know they understood the ticket, you know the shape of their thinking, and you can ask them why
- **Generated code arrives with none of that.** It is uniformly confident, uniformly plausible, and equally likely to be right or subtly wrong at any point in the diff
- Reviewers also read it differently. **A diff that looks professional gets less scrutiny**, and generated code always looks professional

### What review has to catch now

| Failure | A human colleague | An agent |
|---|---|---|
| misunderstood the requirement | rare, asks first | **common, proceeds confidently** |
| invented an API | almost never | **regularly** |
| unrequested extra changes | rare | **very common** |
| unnecessary abstraction | occasionally | **very common** |
| a test that asserts nothing | occasionally | **common** |
| a subtle logic inversion | occasionally | occasionally, and harder to spot |

### The one change in mindset

- **Assume it is wrong until the code shows you it is right.** With a colleague you extend trust and verify the risky parts; here there is no track record to extend trust from
- That sounds slow. It is faster than the alternative, which is finding it in production

### The measure

- Teams report far more pull requests and far longer review queues. **Review capacity is now the constraint on delivery**, which Module 9 takes up
- The response is not reviewing faster. It is **smaller diffs, automated first passes, and rejecting work that is too large to review**
