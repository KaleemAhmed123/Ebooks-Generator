### The three tools that make failures debuggable

```bash
npx playwright test --ui       # step through a run, see the DOM at each step
npx playwright codegen         # click through the app, get a test written for you
npx playwright show-trace      # open the recorded trace from a CI failure
```

The trace is the one that saves days. With `trace: 'on-first-retry'`, any test that fails in CI leaves behind a file containing a DOM snapshot at every step, the console, and the network log. You open it locally and watch the failure instead of guessing at it.

### How many to write

E2E tests are slow and they break for reasons that are not bugs. Keep them for the paths that lose money when they break: sign up, log in, add to cart, check out, the one report the customer runs every morning. Everything else is cheaper and more precise as an integration test.
