## Type Hints Are Not Enforced

Python annotations are metadata. The interpreter records them on the function
object and checks nothing. Every tool that does check them is a separate thing
you have to run.

A function annotated `-> int` that returns `"oops"` runs happily and breaks three
call sites later, where the value is finally used as a number. The traceback
points at the arithmetic, not at the function that lied.

| Checker | Runs | Sees |
|---|---|---|
| CPython itself | never | nothing |
| `mypy` / `pyright` | in CI, before merge | your own code paths |
| Pydantic | on each request | data crossing the boundary |

Neither happens by accident. An annotated codebase with no `mypy` step in CI has
documentation, not types.

## Type Narrowing

TypeScript shrinking a union to one member because of a runtime check it can
follow: `typeof`, `instanceof`, `in`, a comparison against a literal, or a
user-defined guard.

`if (typeof v === 'string')` gives `v` the string type inside that branch. For
your own shapes, `function isUser(x: unknown): x is User` does the same job — the
`x is User` return type is what carries the information out of the function.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A discriminated union with an ok flag narrows to the data member inside the if branch and to the error member inside the else branch">
  <rect x="4" y="28" width="152" height="30" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.5"/>
  <text x="80" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">{ ok: true, data: X }</text>
  <text x="80" y="53" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">| { ok: false, err: E }</text>
  <path d="M158 43 H188 M188 16 V70 M188 16 H214 M188 70 H214" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M214 16 l-7 -4 v8 z M214 70 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="220" y="13" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">if (r.ok)</text>
  <text x="220" y="26" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">r.data exists, r.err does not</text>
  <text x="220" y="67" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">else</text>
  <text x="220" y="80" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">r.err exists, r.data does not</text>
</svg>

Pulling the check out into a helper that returns plain `boolean` throws the
narrowing away. The compiler no longer connects the true result to the value it
was about.
