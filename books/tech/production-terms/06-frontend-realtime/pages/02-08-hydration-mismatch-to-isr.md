## Hydration Mismatch

The server HTML differs from what the client renders, so React discards it and
re-renders from scratch — throwing away the work server rendering was for.

Rendering `new Date().toLocaleTimeString()` produces one string on the server and
a different one a second later on the client.

The culprits are always the same: `Date`, `Math.random`, anything reading
`window` or `localStorage`, and locale or timezone differences between your
server and the visitor.

**Render browser-dependent output after mount**, so the server emits nothing and
the client fills it in. `suppressHydrationWarning` silences the message and does
not stop the re-render, which makes it the wrong fix nearly every time it is
used.

## ISR

*incremental static regeneration*

Serving a static page while regenerating it in the background after a
revalidation window. CDN speed with content that is fresh enough.

A product page with `revalidate: 60` serves instantly from cache. After sixty
seconds the next visitor still gets the stale copy and triggers a rebuild for
everyone after them.

**That visitor is the detail people miss.** The revalidation window does not
mean the page is fresh after sixty seconds — it means the first request past
sixty seconds pays the staleness and everybody behind them gets the new one.

It is stale-while-revalidate applied to a whole page, and the correct question
is not "how fresh" but "who is allowed to see the old one".
