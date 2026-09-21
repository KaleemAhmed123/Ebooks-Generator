## Virtual waiting room

- A **waiting room** sits at the edge and turns 100 000 simultaneous arrivals into a rate the booking flow can take: each user gets a queue position, held in a cookie, and is admitted in order with a signed token once the flow has room. The position is a number the page re-fetches, not a connection the gateway holds open, so a million people waiting cost a million small requests a minute and no sockets

<svg viewBox="0 0 460 178" role="img" aria-label="Ticket booking, whole design. 100 000 users arrive at 9:00:00 at the waiting room at the edge, which gives each a queue position in a cookie, re-fetched every 10 seconds, and admits 1 000 a minute with a signed token. Admitted users read the seat map from a cache with a 2-second TTL, 20 000 reads a second, and call the booking API: hold on page 3, pay via Module 11, confirm. The API writes the seats table, one row per seat with a row lock, about 33 writes a second, and the seats table refreshes the map cache. Payment goes to the PSP, which confirms by signed webhook. Cloudflare's Waiting Room product exposes exactly these knobs: total active users and new users per minute, both above 200, and a session duration of 1 to 30 minutes, 5 by default. An orange cross marks all 100 000 going straight at the seat map: 20 000 reads a second on the table and 100 000 lock attempts on 10 000 rows in one second." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="48" width="58" height="34" rx="3" fill="#fff" stroke="#333"/><text x="35" y="61" text-anchor="middle">100 000</text><text x="35" y="73" text-anchor="middle" font-size="7">users at 9:00:00</text>
  <rect x="96" y="30" width="104" height="70" rx="3" fill="#fff" stroke="#1d4e89"/><text x="148" y="43" text-anchor="middle">waiting room, at the edge</text><text x="148" y="55" text-anchor="middle" font-size="7">position = a number in a cookie,</text><text x="148" y="65" text-anchor="middle" font-size="7">re-fetched every 10 s, no socket</text><text x="148" y="77" text-anchor="middle" font-size="7">admit, say, 1 000 per minute</text><text x="148" y="87" text-anchor="middle" font-size="7">with a signed token (page 6)</text>
  <line x1="64" y1="65" x2="96" y2="65" stroke="#333" marker-end="url(#d)"/><text x="80" y="60" text-anchor="middle" font-size="7">all at once</text>
  <rect x="240" y="10" width="92" height="36" rx="3" fill="#e6f2ff" stroke="#333"/><text x="286" y="23" text-anchor="middle">seat map cache</text><text x="286" y="34" text-anchor="middle" font-size="7">TTL 2 s; 20 000 reads/s</text><text x="286" y="43" text-anchor="middle" font-size="7">never the table (page 6)</text>
  <rect x="240" y="64" width="92" height="46" rx="3" fill="#fff" stroke="#1d4e89"/><text x="286" y="77" text-anchor="middle">booking API</text><text x="286" y="88" text-anchor="middle" font-size="7">hold (page 3) → pay</text><text x="286" y="98" text-anchor="middle" font-size="7">(Module 11) → confirm</text>
  <line x1="200" y1="50" x2="240" y2="30" stroke="#333" marker-end="url(#d)"/><text x="214" y="34" font-size="7">admitted</text>
  <line x1="200" y1="80" x2="240" y2="84" stroke="#333" marker-end="url(#d)"/><text x="220" y="94" text-anchor="middle" font-size="7">1 000/min</text>
  <rect x="366" y="64" width="88" height="46" rx="3" fill="#e6f2ff" stroke="#333"/><text x="410" y="77" text-anchor="middle">seats</text><text x="410" y="88" text-anchor="middle" font-size="7">one row per seat, row lock</text><text x="410" y="98" text-anchor="middle" font-size="7">≈ 33 writes/s (page 1)</text>
  <line x1="332" y1="87" x2="366" y2="87" stroke="#333" marker-end="url(#d)"/>
  <line x1="366" y1="70" x2="332" y2="34" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="356" y="46" font-size="7" text-anchor="end">refresh</text>
  <rect x="356" y="124" width="98" height="30" rx="3" fill="#fff" stroke="#b8541a"/><text x="405" y="136" text-anchor="middle" font-size="7.5">PSP (Module 11)</text><text x="405" y="147" text-anchor="middle" font-size="7">confirms by signed webhook</text>
  <line x1="300" y1="110" x2="356" y2="134" stroke="#b8541a" marker-end="url(#o)"/><text x="322" y="132" font-size="7" fill="#b8541a">pay</text>
  <text x="6" y="116" font-size="7">Cloudflare Waiting Room's knobs</text><text x="6" y="126" font-size="7">are exactly these: total active</text><text x="6" y="136" font-size="7">users, new users per minute</text><text x="6" y="146" font-size="7">(both &gt; 200), session 1–30 min,</text><text x="6" y="156" font-size="7">5 by default</text>
  <text x="6" y="172" font-size="7.5" fill="#bf4c28">✕ all 100 000 straight at the map: 20 000 reads/s on the table, 100 000 lock attempts on 10 000 rows in 1 s</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
  </defs>
</svg>

- The admission rate is a knob, set from what the hold-and-pay flow can serve, and the seat count: 10 000 seats do not need more than the first 20 000 people admitted. Cloudflare's Waiting Room product is configured by precisely these numbers, a cap on total active users and a rate of new users per minute, both above 200, plus a session length of 1 to 30 minutes, 5 by default, after which a user who left must queue again
- The token is signed so the booking API can refuse anyone who skipped the room, and it expires with the session, so a user who holds a seat and leaves for an hour comes back to the line. Module 3's rate limiter sheds excess; the waiting room queues it in order, which is the difference between "try again" and "you are 4 132nd"

### The failure

- Letting all 100 000 in at once. The seat map is read 20 000 times a second from the table, 10 users contend for every row within the first second, and the errors, timeouts and retries from that second become the load for the next. The room does not add capacity; it makes the burst a rate the capacity can meet
