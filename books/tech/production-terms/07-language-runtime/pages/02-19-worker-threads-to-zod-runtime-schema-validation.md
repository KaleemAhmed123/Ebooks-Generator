## Worker Threads

Real OS threads inside a single Node process, for work that occupies the CPU.
Unlike child processes they share memory through `SharedArrayBuffer`, so a large
buffer moves between them without a copy.

Moving PDF page rasterisation onto a pool of four workers took the main thread's
P99 from 2.4s to 60ms. The rasterising took exactly as long; it stopped standing
in front of the event loop.

<svg viewBox="0 0 460 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The main thread keeps serving I/O and posts CPU work to a pool of four worker threads, which send results back without blocking the event loop">
  <rect x="4" y="24" width="122" height="34" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.5"/>
  <text x="65" y="39" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">main thread</text>
  <text x="65" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#5b2fa8">I/O, stays responsive</text>
  <text x="194" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">postMessage</text>
  <path d="M128 31 H258" stroke="#1a1a1a" stroke-width="1.2"/><path d="M258 31 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M258 51 H128" stroke="#1a1a1a" stroke-width="1.2"/><path d="M128 51 l7 -4 v8 z" fill="#1a1a1a"/>
  <text x="194" y="65" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">result</text>
  <rect x="262" y="12" width="122" height="58" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="323" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">worker pool ×4</text>
  <text x="323" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">rasterise, hash, parse</text>
  <text x="323" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">— CPU-bound only</text>
  <text x="392" y="36" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">P99</text>
  <text x="392" y="49" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">2.4s → 60ms</text>
</svg>

For CPU work only. I/O is already off the thread — wrapping a database call in a
worker adds a message hop and a serialisation and buys nothing back.

## Zod / Runtime Schema Validation

Parsing untrusted input against a schema that also produces the TypeScript type.
One declaration, so the validator and the type cannot come apart.

`const User = z.object({ email: z.string().email() })` yields both a parser and
`z.infer<typeof User>`. A hand-written interface beside a hand-written validator
gives you two things that agree until one of them is edited.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single Zod schema produces both a runtime parser that rejects invalid input at the boundary and a TypeScript type inferred at compile time">
  <rect x="4" y="28" width="132" height="28" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.5"/>
  <text x="70" y="46" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">z.object({ ... })</text>
  <path d="M138 42 H168 M168 16 V68 M168 16 H194 M168 68 H194" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M194 16 l-7 -4 v8 z M194 68 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="200" y="13" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">runtime</text>
  <text x="200" y="26" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">.parse(input) — rejects at the edge</text>
  <text x="200" y="65" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">compile time</text>
  <text x="200" y="78" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">z.infer&lt;typeof User&gt;</text>
</svg>

Types are erased before the code runs. An interface asserts nothing about what
arrived over the wire, so without the parse a missing field surfaces as
`undefined` four layers in, where the schema is no longer in view.
