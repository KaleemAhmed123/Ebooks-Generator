## Route Handler vs Server Action

Route handlers are real HTTP endpoints for external callers. Server actions are
remote procedure calls for your own interface.

A Stripe webhook needs a route handler: a stable URL, a documented method, and
signature verification. A form submitted from your own page is better as a
server action.

| | Route handler | Server action |
|---|---|---|
| Called by | anyone, including third parties | your own components |
| URL | one you chose and can publish | generated |
| Best for | webhooks, public APIs, integrations | forms and mutations in your UI |

The rule of thumb: **if something outside your codebase needs to know the URL,
it is a route handler.**

## Same-Origin Policy

The browser rule that a script from one origin cannot read a response from
another. Origin means scheme, host and port — all three.

`https://app.com` cannot read from `https://api.app.com` by default, because the
host differs. Nor can `http://app.com`, because the scheme differs, or
`https://app.com:8080`, because the port does.

CORS is the opt-in that relaxes this, and it is granted by the *receiving*
server. That is the part that confuses people: a CORS error appears in your
frontend and is fixed in someone else's backend.
