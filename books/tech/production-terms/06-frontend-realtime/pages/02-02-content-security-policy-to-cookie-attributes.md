## Content Security Policy

*CSP*

A header listing which script, style and connection sources the browser will
accept. The strongest defence against an XSS payload actually running.

With `script-src 'self'`, an injected `<script src="evil.com">` is blocked by
the browser even when your sanitisation failed.

**`'unsafe-inline'` throws away most of the benefit**, because the common
injection is inline. Use a nonce or a hash instead — it is more work at build
time and it is the difference between a policy and a decoration.

## Cookie Attributes

*HttpOnly / SameSite / Secure*

The flags deciding whether JavaScript can read a cookie, whether it is sent
cross-site, and whether it will travel over plain HTTP.

A session cookie without `HttpOnly` can be read by any XSS payload. Without
`SameSite` it is attached to cross-site requests, which is what makes CSRF work.

`HttpOnly` stops JavaScript reading it, so XSS cannot steal the session.
`Secure` keeps it off plain HTTP. `SameSite=Lax` keeps it off cross-site POSTs.
`Path` and `Domain` stop it being sent where it is not needed.

A session cookie takes all three. Every attribute omitted is a defence you
declined without deciding to.
