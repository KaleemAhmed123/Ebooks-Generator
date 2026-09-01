### What to alert on

An alert should mean a human needs to act now. A channel that fires forty times
a day gets muted, and then it stays muted through the one that mattered.

| Alert | Why |
|---|---|
| Error rate above baseline for 5 minutes | something broke |
| A **new** error group spiking | almost always the release you just shipped |
| p75 INP or LCP crossing the threshold | user-visible slowdown |
| JavaScript bundle size up more than 10% on a release | a dependency got fat |
| **Checkout or sign-up completions dropping** | the only alert that catches failures that throw nothing |

That last row is the one teams miss. A form that silently stops submitting
produces no exception, no slow metric, and no log line. Only the funnel moves.

### Privacy is not optional here

Frontend telemetry carries whatever was on the page. URLs with tokens in the
query string, form values, `localStorage` contents, and the text of the element
that was clicked.

Scrub before it leaves the browser, not after it arrives. Sentry's `beforeSend`
hook and the equivalent processor in any OpenTelemetry pipeline are the right
place. Under GDPR this is a legal requirement, not a nicety, and the fine is
calculated on global turnover.
