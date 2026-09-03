## Streams / Backpressure in Node

Reading a whole payload into memory is bounded by the payload. Streams process
it in chunks, and `pipeline()` propagates a slow consumer's backpressure back to
the producer so the buffer never grows without limit.

`readFileSync` on a 2GB upload needs 2GB of heap and takes the process with it.
`pipeline(read, transform, write)` holds around 64KB at a time regardless of
file size, and cleans up every stream in the chain when one of them errors.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reading a 2GB file into the heap exhausts memory, while a pipeline of source, gzip and destination streams holds only 64KB chunks and honours backpressure">
  <text x="4" y="18" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">readFileSync</text>
  <path d="M92 14 H140" stroke="#1a1a1a" stroke-width="1.2"/><path d="M140 14 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="148" y="18" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">2GB into the heap — OOM</text>
  <path d="M4 32 H456" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="4" y="44" width="76" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="42" y="60" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">source</text>
  <path d="M82 56 H108" stroke="#1a1a1a" stroke-width="1.2"/><path d="M108 56 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="112" y="44" width="76" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="150" y="60" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">gzip</text>
  <path d="M190 56 H216" stroke="#1a1a1a" stroke-width="1.2"/><path d="M216 56 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="220" y="44" width="76" height="24" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/><text x="258" y="60" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">dest</text>
  <path d="M258 72 H42" stroke="#5b2fa8" stroke-width="1.2" stroke-dasharray="3 2" fill="none"/><path d="M42 72 l7 -4 v8 z" fill="#5b2fa8"/>
  <text x="306" y="54" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">~64KB in flight</text>
  <text x="306" y="76" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">backpressure travels back</text>
</svg>

Use `pipeline`, not `.pipe()`. `.pipe()` does not forward errors or destroy the
other streams, which leaks a file descriptor every time something fails.

## Structural Typing

TypeScript compares shapes, not names. An object with the right properties is
assignable to an interface it has never heard of — no `implements` needed.

A plain object literal with `id` and `name` satisfies `interface User`
immediately. The cost of that convenience is that two unrelated types with the
same fields are interchangeable, so a `UserId` and an `OrderId` that are both
`string` will swap silently.

Branded types are the escape hatch: `type UserId = string & { __brand: 'UserId' }`
gives you nominal behaviour at zero runtime cost, and only where you need it.

## Test Coverage Requirement

Salesforce refuses a production deployment unless 75% of Apex lines org-wide have
been executed by a test. It is a gate on the deploy, not a statement about
correctness.

A test method that calls the class and asserts nothing passes, and every line it
touched counts. The gate opens on a suite that would not notice the class
returning the wrong records.

The number is the floor. A test earns its place by asserting on behaviour,
running the bulk case at 200 records, and hitting the governor limits the code
will meet in production.
