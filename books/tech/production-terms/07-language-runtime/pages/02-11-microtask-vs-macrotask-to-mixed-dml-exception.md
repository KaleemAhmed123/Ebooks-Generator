## Microtask vs Macrotask

Promise callbacks are microtasks; timers, I/O and `setImmediate` are macrotasks.
The entire microtask queue drains before the loop takes a single macrotask.

A `setTimeout(fn, 0)` still runs after every pending promise callback, which is
why zero delay does not mean next.

A promise chain that reschedules itself starves timers permanently: the queue
never empties, the loop never advances, and a `setTimeout` written years earlier
stops firing with no error at all.

## Middleware Chain

Express handlers run in registration order, each choosing whether to pass
control on. Order is behaviour, not formatting.

Register the rate limiter after the body parser and you parse a 10MB body before
deciding to reject the request. The attacker gets your CPU and your memory for
free, and the limiter still reports that it worked.

<svg viewBox="0 0 460 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A request passes through helmet, rate limiting, body parsing, authentication and the route handler in registration order, with the rate limiter placed before the body parser">
  <text x="4" y="24" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">req</text>
  <path d="M30 20 H50" stroke="#1a1a1a" stroke-width="1.1"/><path d="M50 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="54" y="8" width="58" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="83" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">helmet</text>
  <path d="M114 20 H130" stroke="#1a1a1a" stroke-width="1.1"/><path d="M130 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="134" y="8" width="70" height="24" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/><text x="169" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">rateLimit</text>
  <path d="M206 20 H222" stroke="#1a1a1a" stroke-width="1.1"/><path d="M222 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="226" y="8" width="76" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="264" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">bodyParser</text>
  <path d="M304 20 H320" stroke="#1a1a1a" stroke-width="1.1"/><path d="M320 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="324" y="8" width="48" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="348" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">auth</text>
  <path d="M374 20 H390" stroke="#1a1a1a" stroke-width="1.1"/><path d="M390 20 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="394" y="8" width="62" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="425" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">route</text>
  <text x="54" y="52" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">reject before you spend anything — the limiter goes before the parser</text>
</svg>

## Mixed DML Exception

Apex refuses to modify a setup object — `User`, `Group`, `PermissionSetAssignment`
— and a standard object in the same transaction. It is a platform rule about
transaction boundaries, not a permissions problem.

Almost every team meets it in a test that creates a `User` and an `Account`
together and gets `MixedDMLOperation`. The fix is `System.runAs(someUser)`,
which puts the second insert in a separate context.

Production code hits it too: a trigger on `Account` that also assigns a
permission set. Push one of the two into a Queueable so they land in different
transactions.
