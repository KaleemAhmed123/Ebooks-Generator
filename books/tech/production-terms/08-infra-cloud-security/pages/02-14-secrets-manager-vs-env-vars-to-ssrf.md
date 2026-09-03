## Secrets Manager vs Env Vars

A managed store scopes secrets by IAM, rotates them, and records who read
which. An environment variable does none of that and is readable from `ps`,
from a crash dump, and by every child process the service spawns.

A database password in an env var reaches your third-party error tracker the
first time an exception serialises the process environment. It now lives in a
system you do not control, under a retention policy you did not set.

## Session vs Token Auth

A session is server-side state keyed by a cookie, so revoking it is one delete.
A JWT is self-contained, so verifying it needs no lookup — and revoking it
needs the lookup put back.

Most single-domain web apps want an HttpOnly session cookie and reach for JWTs
anyway. Tokens earn their complexity when several services must verify a caller
without sharing a session store.

| Session cookie | JWT |
|---|---|
| revoke instantly, one row | revocation is a denylist bolted on |
| needs a store every service can reach | verified anywhere from the signature |

## SSRF

*server-side request forgery*

Your server fetches a URL the attacker chose. The request then originates
inside your network, from an address your firewall and your cloud metadata
service already trust.

A "fetch the image at this URL" feature is enough. The defences are an
allowlist of destination hosts, blocked private ranges, and resolving the name
yourself before validating the address — a host that resolves publicly when you
check it can resolve to `127.0.0.1` when you fetch it.

| Attacker-supplied URL | What comes back |
|---|---|
| `http://169.254.169.254/latest/...` | the instance's IAM credentials |
| `http://localhost:6379/` | internal Redis, unauthenticated |
