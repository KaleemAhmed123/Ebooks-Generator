## API Gateway

One entry point in front of many services, holding the concerns none of them
should each reimplement: authentication, rate limiting, routing, request
shaping.

Six services stop carrying their own JWT validation. They also stop being
reachable except through the gateway, which is the part teams forget until
someone needs a direct call for a migration.

<svg viewBox="0 0 460 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clients reach one gateway that handles auth, rate limiting and routing, then forwards to internal services">
  <rect x="4" y="38" width="80" height="32" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="44" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1a1a1a">clients</text>
  <path d="M86 54 H126" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M126 54 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="130" y="10" width="132" height="88" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.8"/>
  <text x="196" y="27" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#2b5fa8">gateway</text>
  <text x="146" y="45" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">authn / authz</text>
  <text x="146" y="60" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">rate limit</text>
  <text x="146" y="75" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">route</text>
  <text x="146" y="90" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">aggregate</text>
  <path d="M264 54 H304" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M304 24 V84" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M304 24 H336 M304 54 H336 M304 84 H336" stroke="#1a1a1a" stroke-width="1.4"/>
  <path d="M336 24 l-7 -4 v8 z M336 54 l-7 -4 v8 z M336 84 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="340" y="12" width="116" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="340" y="42" width="116" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="340" y="72" width="116" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="398" y="28" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">orders</text>
  <text x="398" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">billing</text>
  <text x="398" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">identity</text>
</svg>

## API Versioning

Changing an API without breaking the clients already using it. Mobile apps you
cannot force-update turn this from a nice practice into a permanent obligation.

An old build stays installed for eighteen months. Removing a field is a crash
for those users, so v1 has to keep working while v2 exists beside it.

| Strategy | Reads as | Cost |
|---|---|---|
| URL — `/v1/orders` | explicit, obvious in logs | version leaks into every path |
| Header — `Accept-Version` | clean URLs | invisible in a browser or a curl paste |
| Field-level, additive only | no version at all | you may never remove anything |

Picking the scheme is the easy half. The rest is a deprecation window, a
`Sunset` header, and some way to know who is still on v1 before you turn it off.
