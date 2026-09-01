## Mocking APIs with MSW

When you write Integration Tests (RTL) or E2E Tests (Playwright), your components are inevitably going to try and execute `fetch()` to grab data from your backend.

If you let your tests hit your *actual* production database:
1. Your tests will take forever because of network latency.
2. If the backend is down, your frontend tests will fail, which is a false negative.
3. Your test might accidentally execute a `POST` request and create 500 fake users in your production database!

To solve this, you must **Mock** the network requests.

### The Old Way: Mocking `fetch`
Historically, developers used `vi.mock()` (or `jest.mock()` before it) to overwrite the native `fetch` function, forcing it to return hardcoded JSON instead of going to the network.

```js
// The Old Nightmare
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ user: 'Admin' }),
  })
);
```
This is terrible because it couples your tests to your implementation details. What if you refactor your code to use `axios` instead of `fetch`? The UI is exactly the same, but the test will fail because it's specifically looking for `fetch`.

### The Modern Way: Mock Service Worker (MSW)
Mock Service Worker changes what a frontend test can cover.
Instead of replacing `fetch` or `axios`, MSW spins up an actual Service Worker in the browser, and an HTTP interceptor in Node during test runs. 

It acts as a literal proxy server sitting between your React code and the internet. Your React component executes a completely normal, un-mocked `fetch('/api/user')`. As the request tries to leave the browser, MSW intercepts it, checks its route handlers, and returns fake data!
