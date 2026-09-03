## Optimistic Update

Updating the interface before the server confirms, then reconciling. The app
feels instant, and you now own rollback.

A like button fills immediately and reverts with a toast if the request fails
400ms later.

Three paths, and the third is the one that gets skipped: apply the change
locally, send the request, and on failure revert **and tell the user**. A silent
revert is worse than no optimism, because the interface has now lied twice.

**The failure to design for is not an error response — it is no response.** A
request that never resolves leaves the optimistic state permanently applied, so
the rollback needs a timeout and not just a `catch`.

## Preload / Prefetch / Preconnect

Resource hints. They look interchangeable and are not.

| Hint | Means | Priority |
|---|---|---|
| `preconnect` | warm DNS, TCP and TLS to this origin | before the request exists |
| `preload` | I need this for *this* navigation | high |
| `prefetch` | I will probably need this next | idle |

Preconnecting to a font CDN removes about 180ms of DNS and TLS from the critical
path before the font request is even made.

**Over-preloading is the common mistake.** Everything marked high priority
competes with everything else marked high priority, and a page that preloads
twelve resources has told the browser nothing about which one matters.
