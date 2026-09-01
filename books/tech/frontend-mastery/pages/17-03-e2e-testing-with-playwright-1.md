## End-to-End Testing with Playwright

Unit and integration tests run inside `jsdom`, a JavaScript implementation of the DOM. It is fast because it is fake. It does not lay out the page, does not apply CSS, does not run a real network stack, and does not reproduce the differences between Safari and Chrome.

That means `jsdom` cannot catch: a button hidden behind a modal overlay, a form that submits twice on a slow connection, a layout that breaks at 375px, a cookie the browser refuses to set because `SameSite` is wrong.

End-to-end tests drive a real browser against a real build to catch exactly those.

### Playwright, and why it replaced Cypress

Cypress defined modern E2E testing and is still shipping at version 15. **Playwright**, from Microsoft, has become the default in most new projects for four concrete reasons.

- **Real cross browser.** Chromium, Firefox, and WebKit, which is the engine behind Safari, with no configuration. Cypress's WebKit support is still experimental.
- **Multiple tabs, origins, and users.** Playwright can open two browser contexts and drive a chat between two logged-in accounts in one test. Cypress runs inside the page under test, which makes that difficult by construction.
- **Auto-waiting that is built in.** Every action waits for the element to be attached, visible, stable, and able to receive events before it fires. Almost every arbitrary `sleep` in a test suite disappears.
- **Speed.** Tests run in parallel across workers by default.
