### Checking a generated test is real

- **Break the implementation and run it.** Thirty seconds, and the only reliable check, as Module 5 says
- **Mutation testing automates exactly this.** Stryker mutates the code and reports which mutations no test caught

```bash
npx stryker run
```

- **A high mutation score is a real signal. A high coverage percentage is not**, because a line executed without an assertion still counts as covered
