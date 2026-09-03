## Server Actions

Functions marked `"use server"` that a client component calls directly, with the
framework generating the HTTP endpoint.

A form submits straight to a server action with no API route and no `fetch` in
sight.

**It is still a public endpoint.** The URL is generated rather than chosen,
which is not the same as private — anyone can call it with any payload.
Authentication, authorisation and input validation are as necessary here as in
any route you wrote by hand.

The convenience is that you did not have to write the plumbing. It was never
that you could skip the checks.

## Server Components

*RSC*

Components that run only on the server and ship serialised output instead of
JavaScript. They can query the database directly and never hydrate.

A markdown renderer with a 90KB parser as a server component ships none of that
parser to the browser — the client receives rendered output.

| Can | Cannot |
|---|---|
| read the database or filesystem directly | use `useState` or `useEffect` |
| keep secrets in scope | attach an `onClick` |
| ship zero JavaScript | re-render in response to interaction |

The mental shift is that these are not components that render fast. They are
components that **do not exist on the client at all**, which is why the
restrictions are absolute rather than performance advice.
