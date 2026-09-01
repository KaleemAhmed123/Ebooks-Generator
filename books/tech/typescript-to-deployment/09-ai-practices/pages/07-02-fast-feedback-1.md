## Making the checks fast

- A four minute test suite is an inconvenience for a person and a hard limit for an agent. **It will run it once or twice and then stop trying**

### What to make possible

```bash
npx vitest run path/to/one.test.ts          # one file, 3 seconds
npx vitest run -t "retries a 503"           # one test by name
npx tsc --noEmit                            # types only, no build
npx eslint path/to/one.ts --fix             # one file
```

- **Put every one of these in `AGENTS.md`.** An agent that does not know the narrow command uses the wide one

### What makes a suite slow

| Cause | Fix |
|---|---|
| a real database per test | one container for the run, a transaction per test |
| network calls in unit tests | record and replay, or a mock at the boundary |
| a build step before tests | run the tests from source with `tsx` or `vitest` |
| everything in one suite | split unit from integration, run unit by default |
| `beforeEach` doing setup work | do it once, reset cheaply |
