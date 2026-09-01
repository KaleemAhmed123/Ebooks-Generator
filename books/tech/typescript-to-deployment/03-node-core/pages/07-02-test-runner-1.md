## The built-in test runner

- Testing a Node service used to mean installing a runner, a transform step and a config file before writing a single assertion
- Node now ships its own, so a service with plain assertions needs nothing installed at all
- It reads test files, runs them in parallel by default, and reports results in a standard format CI understands
- Combined with Node running TypeScript directly, a `.test.ts` file runs with no build step anywhere in the chain
- What it does not have is snapshot testing and the large plugin ecosystem, which is where Jest is still ahead

```js
// order.test.js
import { test, describe, mock } from "node:test"
import assert from "node:assert/strict"

describe("orders", () => {
  test("totals the items", () => {
    assert.equal(total([{ amount: 100 }, { amount: 50 }]), 150)
  })

  test("rejects a missing order", async () => {
    await assert.rejects(() => loadOrder("nope"), { code: "not_found" })
  })
})
```

```bash
node --test
node --test --watch
node --test --experimental-test-coverage
```

- No config file, no transform step, no `jest.config.js`
- With Node stripping types, it runs `.test.ts` files directly

### Mocking

```js
const sendEmail = mock.fn(() => Promise.resolve())
mock.timers.enable({ apis: ["setTimeout"] })
mock.timers.tick(5000)
```
