### 2. Self-host it

The stronger move. Download the vendor's script, commit it or fetch it at build
time, and serve it from your own origin.

You get: a diff on every version bump, SRI for free, no third-party DNS lookup
or TLS handshake in the critical path, and immunity to the vendor being
compromised between your deploys.

You take on: manually updating it, and breaking if the vendor requires a live
connection to their own domain.

For anything performance-sensitive this is worth it on speed alone. A
third-party origin costs a DNS lookup, a TCP connection, and a TLS handshake
before a single byte arrives.

### 3. Content Security Policy as the backstop

Assume one of them is compromised anyway. CSP decides what the compromised
script can then do.

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM}' 'strict-dynamic';
  connect-src 'self' https://api.example.com https://o1234.ingest.sentry.io;
  frame-src https://js.stripe.com;
  object-src 'none';
  base-uri 'self';
```

**`connect-src` is the line that matters most here.** A malicious script can
read your login form, but it has to send the data somewhere. If the only
destinations the browser will allow are your own API and your error monitor, the
data has nowhere to go.

Add reporting so you find out when something tries:

```
report-to csp-endpoint
```

Run in `Content-Security-Policy-Report-Only` mode first for a week. The reports
will list every origin the page actually talks to, which is usually the first
accurate inventory the team has ever had.
