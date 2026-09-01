## Give it a way to know

- An agent with no check produces one attempt and stops. **An agent with a failing test iterates until it passes**, which is a completely different quality of result
- This is the single most useful technique in this booklet, and it costs one command

```text
This test fails. Make it pass without changing the test.

  npx vitest run apps/api/payout.test.ts -t "retries a 503 three times"
```

### Why it works

- The specification is **executable**, so there is no ambiguity about done
- The feedback is immediate, so a wrong turn is corrected in the same session rather than in review
- **"Without changing the test" is required.** Making the test pass by weakening it is a common and quiet failure

### Write the test yourself

- **You write the test, it writes the implementation.** That division is the useful one
- The test encodes what you actually want, which is the part only you know
- Module 7 covers what goes wrong when the agent writes both

### When there is no test

| Signal | Nearly as good |
|---|---|
| `npx tsc --noEmit` | types catch a whole class of wrong |
| a lint rule | conventions enforced without a word |
| a script that reproduces the bug | the bug is the check |
| a `curl` that must return 201 | end to end, and unambiguous |

- **Any runnable check beats none.** The point is that it can tell whether it succeeded without asking you

### The rule

- **Never delegate a task with no way to verify it.** That is not delegation, it is guessing with extra steps
