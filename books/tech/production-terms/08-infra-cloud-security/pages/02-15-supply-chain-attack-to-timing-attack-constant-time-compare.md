## Supply Chain Attack

The attacker compromises a dependency instead of your code. A `postinstall`
script runs with everything the build has: the source, the environment, the
registry token.

A popular package publishes a patch version that reads the environment and
posts it elsewhere. A committed lockfile, `npm ci` instead of `npm install`,
and `--ignore-scripts` in CI close most of the window. An SBOM — the list of
exactly what went into each build — is what tells you which releases were
affected once the compromise is public.

## TCP Handshake & TLS Handshake

Every new HTTPS connection pays a TCP round trip and then a TLS negotiation
before one byte of your request moves. On mobile networks that cost dominates
small requests.

Keep-alive spreads it across every later request on the same connection, which
is why a client opening a fresh connection per call is slow in a way no server
profile explains.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="At 80 milliseconds round-trip time, TCP plus TLS 1.2 costs 240 milliseconds before the request is sent, TLS 1.3 costs 160, and a resumed session costs 80">
  <text x="4" y="11" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">time before the request is sent, at 80ms RTT</text>
  <text x="4" y="29" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">TCP + TLS 1.2</text>
  <rect x="130" y="18" width="240" height="14" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <line x1="210" y1="18" x2="210" y2="32" stroke="#e0e0e4" stroke-width="1.2"/>
  <text x="376" y="29" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">240ms</text>
  <text x="4" y="51" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">TCP + TLS 1.3</text>
  <rect x="130" y="40" width="160" height="14" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <line x1="210" y1="40" x2="210" y2="54" stroke="#e0e0e4" stroke-width="1.2"/>
  <text x="296" y="51" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">160ms</text>
  <text x="4" y="73" font-family="Georgia,serif" font-size="9" fill="#3f7a33">resumed session</text>
  <rect x="130" y="62" width="80" height="14" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="216" y="73" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">80ms</text>
  <text x="4" y="89" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the first 80ms of each bar is the TCP handshake; the rest is TLS</text>
</svg>

## Timing Attack & Constant-Time Compare

String comparison returns at the first mismatching byte. How long the check
took leaks how much of the secret was correct.

Verifying an API key with `===` differs by microseconds between a key wrong at
the first character and one wrong at the sixth. Averaged over enough requests
that difference survives network noise, and the key is rebuilt a byte at a
time. `crypto.timingSafeEqual(a, b)` reads every byte whatever the input.
