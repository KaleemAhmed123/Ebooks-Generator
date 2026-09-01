## Tests that cannot fail

- A green suite is the strongest signal a reviewer has, and **a test that cannot fail makes that signal a lie**
- Generated tests fail this way often, because a passing test looks like success to whatever produced it

### The signatures

```ts
expect(result).toBeDefined()               // almost everything is defined
expect(mockDb.save).toHaveBeenCalled()     // tests the mock, not the code
expect(() => fn()).not.toThrow()           // passes for any function that returns
expect(res.status).toBe(200)               // and nothing about the body
```

```ts
// the worst one: mocking the thing under test
vi.mock("./retryPayout")
// every assertion now describes the mock
```

### The test that tests nothing real

- Mocking every dependency, then asserting that the mocks were called in order
- **It passes when the implementation is rewritten wrongly**, because it only describes the shape of the calls

### How to check a test is real

- **Break the implementation deliberately and run it.** If it still passes, the test is decoration
- Invert a condition, return a constant, delete a line. A real test goes red immediately
- **This takes thirty seconds and it is the only reliable check**

### Asking for better ones

```text
Tests must assert on real values, not on mocks being called.
Use the real database via the test container, as in orders.test.ts.
Include a failing case and a boundary case, not just the happy path.
```

- **"Not just the happy path" is necessary.** Left alone it writes one passing case and stops
- Coverage percentage does not help here. **Tests that execute a line without asserting anything about it still count as coverage**
