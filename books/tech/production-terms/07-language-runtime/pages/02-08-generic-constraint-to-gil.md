## Generic Constraint

*extends*

Limiting what a type parameter is allowed to be, so the body of the generic can
safely use its properties. `<T>` alone knows nothing about `T`.

`function pick<T, K extends keyof T>(obj: T, key: K): T[K]` returns the exact
type of that one field — `pick(user, 'email')` is a `string`, not `unknown` —
and `pick(user, 'nope')` fails at compile time rather than returning
`undefined`.

Constraints are also where inference goes wrong. `K extends keyof T` infers the
literal `'email'`; drop the constraint and `K` widens to `string`, which takes
the return type back to a union of everything.

## GIL

*Global Interpreter Lock*

Only one thread executes Python bytecode at a time in CPython. Threads still
help I/O-bound work, because the lock is released while a thread waits on a
socket or a disk. They do nothing at all for CPU-bound work.

Eight threads parsing documents run at the speed of one, taking turns holding
the lock, plus the cost of the switching. `multiprocessing` gives real parallel
CPU; so does a native extension — NumPy and Polars release the GIL while they
compute in C or Rust.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three CPU-bound threads take turns holding the single interpreter lock and finish no faster than one thread, while an I/O-bound thread releases the lock while it waits">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">CPU-bound</text>
  <path d="M76 12 H452" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="76" y="6" width="60" height="12" fill="#1a1a1a"/><rect x="140" y="6" width="60" height="12" fill="#6b6b6b"/><rect x="204" y="6" width="60" height="12" fill="#1a1a1a"/><rect x="268" y="6" width="60" height="12" fill="#6b6b6b"/><rect x="332" y="6" width="60" height="12" fill="#1a1a1a"/>
  <text x="76" y="34" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">three threads, one lock — total time unchanged</text>
  <text x="4" y="60" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">I/O-bound</text>
  <path d="M76 56 H452" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="76" y="50" width="26" height="12" fill="#5b2fa8"/><rect x="120" y="50" width="26" height="12" fill="#5b2fa8"/><rect x="164" y="50" width="26" height="12" fill="#5b2fa8"/><rect x="208" y="50" width="26" height="12" fill="#5b2fa8"/>
  <text x="76" y="78" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">lock released while waiting — threads genuinely overlap</text>
</svg>
