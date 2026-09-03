## Circuit Breaker

Stops the caller hammering a service that is already failing. Failures are
counted, the breaker opens, and calls fail fast until a probe says the other side
is back.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circuit breaker moves from closed to open when a failure threshold is hit, to half-open after a cool-down, and back to closed when a single probe succeeds">
  <rect x="4" y="34" width="116" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="62" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5" fill="#1a1a1a">CLOSED</text>
  <text x="62" y="60" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">calls pass</text>
  <path d="M120 49 H166" stroke="#1a1a1a" stroke-width="1.3"/><path d="M168 49 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="144" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">threshold</text>
  <rect x="172" y="34" width="116" height="30" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="230" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5" fill="#d0212f">OPEN</text>
  <text x="230" y="60" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">fail fast</text>
  <path d="M288 49 H334" stroke="#1a1a1a" stroke-width="1.3"/><path d="M336 49 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="312" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">cool-down</text>
  <rect x="340" y="34" width="116" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="398" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5" fill="#1a1a1a">HALF-OPEN</text>
  <text x="398" y="60" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">one probe</text>
  <path d="M398 64 V84 H62 V66" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M62 64 l-4 7 h8 z" fill="#1a1a1a"/>
  <text x="230" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">probe succeeds → CLOSED · probe fails → OPEN</text>
</svg>

Half-open is where implementations go wrong. Releasing full traffic on the first
success re-breaks the service immediately; one request at a time is the entire
purpose of the state.

## Cold Start

The extra latency when a server, container or function starts from nothing after
sitting idle.

A Lambda idles for thirty minutes. The next request loads the runtime, imports
dependencies, loads the model and opens connections. The user waits six seconds
instead of 0.3.

The average hides it, because the average is dominated by warm requests. The cold
one is disproportionately someone's first — a new user, or a region with almost
no traffic, gets six seconds every time.

## Correlation ID

One identifier threaded through every log line, span and message produced by a
single user action.

A support ticket quotes the request ID printed on the error page. One query
returns every log line across seven services for that request.

Generate it at the edge, accept the caller's if they sent one, and put it in the
response headers and on error pages. An ID the user never sees leaves support
searching by timestamp.
