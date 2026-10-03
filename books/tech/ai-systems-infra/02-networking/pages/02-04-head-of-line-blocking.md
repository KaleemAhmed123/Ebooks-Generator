## Head-of-line blocking

- **Head-of-line (HOL) blocking** is when one stuck item at the front of a queue stalls everything behind it, even though those items are ready to go. It shows up at several layers, and recognising it explains the whole HTTP/1→2→3 story.
- **At the TCP layer** it's structural: TCP guarantees **in-order** delivery, so if one segment is lost, the receiver must hold back **every later byte** until that one is retransmitted — even bytes that already arrived. The application sees a stall it can't avoid, because TCP won't hand over out-of-order data.

<svg viewBox="0 0 360 96" role="img" aria-label="Ordered delivery: a single lost segment at the front blocks later segments that already arrived, until it is retransmitted" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="20" y="34" width="46" height="24" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="43" y="46" text-anchor="middle" font-size="6">seg 1</text><text x="43" y="54" text-anchor="middle" font-size="5" fill="#c0392b">LOST</text>
  <rect x="74" y="34" width="46" height="24" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="97" y="49" text-anchor="middle" font-size="6">seg 2 ✓</text>
  <rect x="128" y="34" width="46" height="24" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="151" y="49" text-anchor="middle" font-size="6">seg 3 ✓</text>
  <rect x="182" y="34" width="46" height="24" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="205" y="49" text-anchor="middle" font-size="6">seg 4 ✓</text>
  <path d="M250 46 L300 46" stroke="#c0392b" marker-end="url(#h1)"/>
  <text x="325" y="42" text-anchor="middle" font-size="5.6" fill="#c0392b">all held</text>
  <text x="325" y="52" text-anchor="middle" font-size="5.6" fill="#c0392b">until seg 1</text>
  <text x="140" y="80" text-anchor="middle" font-size="5.8" fill="#777">2–4 arrived but can't be delivered — in-order rule</text>
  <defs><marker id="h1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- This is the hidden limit of **HTTP/2**: it multiplexes many request "streams" over **one** TCP connection, so a single lost packet stalls *all* of them at once — TCP can't tell the streams apart. HTTP/1.1 dodged it only by opening several separate connections (and paying several handshakes).
- **HTTP/3 removes it** by moving to **QUIC over UDP**, where streams are independent at the transport layer: a loss on one stream doesn't block the others. That's the single biggest reason HTTP/3 exists — Module 4 picks the thread back up.

### Module 2 — checkpoint
- **Key concepts:** 3-way handshake (1 RTT) · `TIME_WAIT` & port exhaustion · flow control (receiver window) vs congestion control (`cwnd`, slow start, CUBIC/BBR) · backpressure at the socket · UDP's trade · HOL blocking (TCP in-order rule).
- **Task:** `curl -w "connect=%{time_connect} ttfb=%{time_starttransfer}\n" -o /dev/null -s https://example.com` — see the handshake cost vs time-to-first-byte; run it twice to watch reuse help.
- **Questions:** Why is a brand-new TCP connection slow? Why does one lost packet stall all HTTP/2 streams? When is UDP the *correct* choice?
- **Next:** Module 3 — DNS, TLS, and mTLS.
