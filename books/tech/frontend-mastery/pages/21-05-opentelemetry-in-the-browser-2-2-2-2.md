### Where it fits beside what you already have

| Tool | Use it for |
|---|---|
| Sentry or similar | exceptions, stack traces, session replay on error |
| `web-vitals` | the Core Web Vitals numbers, at p75, by segment |
| OpenTelemetry | traces that cross the browser and server boundary |
| Lighthouse CI | catching a regression before it merges |

These overlap and that is fine. Most teams add them in that order, and reach for
OpenTelemetry when "the frontend says slow, the backend says fast" becomes a
recurring argument nobody can settle.
