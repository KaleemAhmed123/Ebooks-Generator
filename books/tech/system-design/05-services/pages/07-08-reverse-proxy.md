## The reverse proxy

- A balancer chooses between instances; a **reverse proxy** stands in front of them and does work on the way past. NGINX and Envoy are both, which is why the terms blur — but the jobs are separate and the proxy's job is to keep slow, repetitive work off the application

<svg viewBox="0 0 460 100" role="img" aria-label="A reverse proxy absorbing a slow client. A client on a 3G connection takes about ten seconds to receive a one-megabyte response. The proxy buffers the whole response, so the API hands over the same megabyte in about five milliseconds and its worker is free immediately rather than being held for ten seconds. That is the reason the proxy is there. An orange cross marks the same buffering applied to a server-sent-events stream: the proxy holds it until the stream ends, which never happens, so the user sees an endless spinner." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="215" y="22" text-anchor="middle" font-size="6.5" fill="#1d4e89">buffers the whole response</text>
  <rect x="4" y="30" width="80" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="44" y="46" text-anchor="middle" font-size="7.5">client on 3G</text>
  <rect x="170" y="30" width="90" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="215" y="46" text-anchor="middle" font-size="7.5">reverse proxy</text>
  <rect x="350" y="30" width="90" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="395" y="46" text-anchor="middle" font-size="7.5">API instance</text>
  <line x1="168" y1="43" x2="86" y2="43" stroke="#bf4c28" marker-end="url(#e)"/><text x="127" y="38" text-anchor="middle" font-size="6.5" fill="#bf4c28">1 MB over 10 s</text>
  <line x1="348" y1="43" x2="262" y2="43" stroke="#1d4e89" marker-end="url(#b)"/><text x="305" y="38" text-anchor="middle" font-size="6.5">1 MB in 5 ms</text>
  <text x="4" y="74" font-size="7">the API's worker is free after 5 ms instead of held for 10 s — the proxy owns the slow client, the application does not</text>
  <text x="4" y="90" font-size="7.5" fill="#bf4c28">✕ the same buffering on a server-sent-events stream: held until it ends, which it never does — an endless spinner</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker><marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker></defs>
</svg>

- The other jobs follow the same logic — do it once, at the edge, in C rather than in the application. TLS termination, so the crypto is not in every process. Compression. Static files straight from disk. And one place to set or strip a header, which is the only way a rule like "never leak this header outbound" can actually hold across forty services
- Termination has a consequence worth stating: past the proxy the traffic is plain HTTP, so the network between proxy and instance is now part of the trust boundary and has to be treated as one

### The failure

- Buffering applied to something that is not a response but a stream. Server-sent events, a download generated on the fly, a chat completion arriving token by token — the proxy waits for the end before forwarding the first byte, and for a stream the end is the point
- Nothing errors. The connection is open, the application is writing, the proxy is holding, and the user sees a spinner forever. Streaming routes need buffering turned off explicitly, either in the proxy's own config or by the application sending `X-Accel-Buffering: no`, which NGINX reads as an instruction for that response
