## Vitest - continued

describe("wallet", () => {
  beforeEach(() => vi.clearAllMocks())

it("refuses a payout above the balance", async () => {
    const repo = { balance: vi.fn().mockResolvedValue(100) }
    await expect(requestPayout(repo, 500)).rejects.toThrow("insufficient")
  })
})
```

- `vi` is the mocking API, the same shape as `jest`
- ESM works natively, which is the thing that makes Jest painful on a modern TypeScript codebase

### The features worth knowing

```bash
vitest              # watch mode, reruns only affected tests
vitest run          # single pass, for CI
vitest --ui         # browser UI showing the test graph
vitest --coverage
```

- Watch mode traces the import graph and reruns only what your edit touched
- On a large suite that is the difference between seconds and minutes

### jest 30.5.0

- Still the largest ecosystem, still the standard in older codebases
- Choose Vitest for anything new, and only move an existing Jest suite when it is actually hurting
