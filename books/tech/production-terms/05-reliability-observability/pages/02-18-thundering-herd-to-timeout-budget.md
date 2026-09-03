## Thundering Herd

Many clients wake at the same instant and hit the same resource.

A popular cache key expires at 12:00:00. In that moment 8,000 in-flight requests
all miss, and all issue the identical database query.

<svg viewBox="0 0 460 42" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One cache key expiring at a fixed instant turns eight thousand concurrent misses into eight thousand identical database queries">
  <rect x="4" y="8" width="118" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="63" y="21" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">key expires</text>
  <text x="63" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">12:00:00</text>
  <path d="M122 21 H146" stroke="#1a1a1a" stroke-width="1.3"/><path d="M148 21 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="152" y="8" width="128" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="216" y="21" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">8,000 misses</text>
  <text x="216" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">same key, same instant</text>
  <path d="M280 21 H304" stroke="#1a1a1a" stroke-width="1.3"/><path d="M306 21 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="310" y="8" width="146" height="26" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="383" y="21" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#d0212f">8,000 identical queries</text>
  <text x="383" y="31" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">DB CPU 100%</text>
</svg>

Two cheap fixes: randomise the TTL so expiries scatter, and hold a single-flight
lock so one request refills the cache while the rest wait on its result. Neither
is on by default in any cache client you are likely to be using.

## Timeout Budget

Each layer in a call chain gets a slice of the caller's remaining time, so
nothing waits longer than the user already has.

The gateway's timeout is 3s. It passes 2.8s to the service, which passes 2.5s to
the database. Without a budget, a 30s database timeout keeps grinding on a
request the user abandoned 27 seconds ago.

<svg viewBox="0 0 460 94" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three second user deadline shrinks as it is passed down through gateway, service and database, each layer getting less time than the one above">
  <rect x="4" y="4" width="452" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="12" y="17" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">user 3.0s</text>
  <rect x="14" y="26" width="422" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="22" y="39" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">gateway 2.8s</text>
  <rect x="24" y="48" width="377" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="32" y="61" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">service 2.5s</text>
  <rect x="34" y="70" width="301" height="18" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="42" y="83" font-family="Consolas,monospace" font-size="9" fill="#d0212f">database 2.0s</text>
</svg>

The deadline has to travel with the request, not sit in each service's config.
Static per-hop timeouts that happen to sum under the gateway's are correct right
up until one hop retries.
