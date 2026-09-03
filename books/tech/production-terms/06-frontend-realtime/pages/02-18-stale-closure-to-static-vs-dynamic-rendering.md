## Stale Closure

An effect or callback capturing state from the render it was created in, and
never seeing an update.

A `setInterval` inside `useEffect(..., [])` logs the initial count forever,
because the closure captured `count` when it was 0 and the effect never ran
again.

Nothing warns you. The interval fires on schedule, the value is real, and it is
the value from a render that happened once, minutes ago.

**The fixes are a functional update — `setCount(c => c + 1)` — or a ref holding
the current value.** Adding the state to the dependency array also works and
tears down and recreates the interval on every change, which is usually not what
you wanted.

## Static vs Dynamic Rendering

Static pages are built once and served from cache. Dynamic pages render per
request. Touching cookies, headers or search params silently converts a route to
dynamic.

A marketing page reads one cookie for an A/B test and quietly leaves static
rendering. Time to first byte goes from 20ms at the CDN to 340ms at the origin.

| | Serves from | TTFB |
|---|---|---|
| Static | CDN | ~20ms |
| Dynamic | origin, per request | ~340ms |

**The word doing the work is "silently".** Nothing fails, no warning appears, and
the only symptom is a page that used to be instant and now is not. The triggers
are `cookies()`, `headers()`, `searchParams`, and any fetch marked `no-store`.
