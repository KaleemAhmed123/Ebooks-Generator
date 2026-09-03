## Retry Storm

Retries meant to help finish the service off. Every layer multiplies load on
something that was only slightly sick.

The database slows by 20%. Service A retries five times, B retries five times, C
retries five times. Traffic arrives at fifteen times its normal volume, and a
database that would have recovered on its own collapses.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three services each retrying five times multiply the load on a slightly slow database by fifteen until it fails">
  <rect x="4" y="6" width="120" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="64" y="20" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Service A × 5</text>
  <rect x="4" y="33" width="120" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="64" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Service B × 5</text>
  <rect x="4" y="60" width="120" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="64" y="74" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Service C × 5</text>
  <path d="M124 16 H160 V43 M124 70 H160 V43 M124 43 H176" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M178 43 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="182" y="31" width="104" height="24" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="234" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#d0212f">traffic × 15</text>
  <path d="M286 43 H316" stroke="#1a1a1a" stroke-width="1.3"/><path d="M318 43 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="322" y="31" width="134" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="389" y="47" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">database collapses</text>
</svg>

Per-call retry counts compose multiplicatively, so cap them as a fraction of
total requests instead — a retry budget of 10% cannot become 15x however many
layers there are.

## Rolling Deployment

Replace instances a few at a time so capacity never drops to zero. The
Kubernetes default.

| Setting | Effect on 12 pods |
|---|---|
| `maxSurge: 2` | up to 14 pods exist mid-roll |
| `maxUnavailable: 1` | at least 11 stay ready |
| readiness gate | a new pod takes traffic only after it passes |

Both versions serve traffic for the length of the roll, so v2 must read what v1
writes and v1 must not choke on what v2 writes. A readiness probe that only
checks the port is open will ship a broken version to every pod, one batch at a
time, without ever failing.

## Sampling

*head vs tail*

Head sampling decides at the start of a request. Tail sampling buffers the trace
and decides after seeing all of it, so errors and slow requests can always be
kept.

1% head sampling misses 99% of the rare eight-second requests you were looking
for. Tail sampling keeps every error, every slow trace and 1% of the rest — and
pays for it with infrastructure that has to buffer every in-flight trace.
