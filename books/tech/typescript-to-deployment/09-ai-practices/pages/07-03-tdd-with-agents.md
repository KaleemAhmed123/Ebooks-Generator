## Test first, genuinely

- Test-driven development was always a reasonable discipline that many people skipped. **With agents it stopped being optional and became the mechanism**
- The reason is mechanical: a failing test is an unambiguous, executable specification, and it converts a guess into a loop

### The loop that works

```text
1. You write the failing test
2. You confirm it fails, for the right reason
3. It writes the implementation until the test passes
4. You review the implementation
5. It refactors, with the test as the safety net
```

- **Step 2 is skipped constantly and it is the important one.** A test that fails because of a typo in the import teaches nothing when it passes

```text
Here is a failing test. Make it pass.
Do not modify the test. Do not modify any other test.
Run: npx vitest run apps/api/payout.test.ts -t "retries a 503 three times"
```

### Why this ordering matters more than before

| Without the test first | With it |
|---|---|
| the spec is a sentence | the spec is executable |
| done is a judgement | done is green |
| review checks correctness from scratch | review checks the test, then the code |
| it may weaken a test to pass | you wrote the test, and it may not touch it |

### Where it does not apply

- **Exploration.** You do not know the interface yet, so there is nothing to assert
- **Pure refactors.** The existing tests are the safety net, and that is exactly the case agents are best at
- **Anything visual.** A screenshot comparison is the closest equivalent, and it is worth having for a frontend
