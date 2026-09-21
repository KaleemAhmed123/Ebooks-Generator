## High-level design

- The caller's request must not wait on a provider. A checkout that calls APNs in-line is a checkout that fails when Apple is slow. So the API writes one row and one message and replies 202; everything after that is asynchronous (booklet 04)

<svg viewBox="0 0 460 168" role="img" aria-label="Internal services call the notification API, which checks preferences, writes the notification row, and enqueues one message per channel onto three separate queues: push, email, SMS. Each queue has its own worker pool, calling its provider: APNs and FCM, an email provider, an SMS provider. Rates on the arrows: 100 per second in, 60 push, 30 email, 10 SMS. A dead-letter queue sits beside the workers. An orange cross marks the alternative of one shared queue, where a slow SMS provider delays every password-reset push behind it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="56" width="58" height="30" rx="3" fill="#fff" stroke="#333"/><text x="35" y="69" text-anchor="middle">internal</text><text x="35" y="80" text-anchor="middle">services</text>
  <rect x="96" y="46" width="84" height="50" rx="3" fill="#fff" stroke="#1d4e89"/><text x="138" y="60" text-anchor="middle">notification API</text><text x="138" y="72" text-anchor="middle" font-size="7.5">idempotency key</text><text x="138" y="83" text-anchor="middle" font-size="7.5">preferences · row</text><text x="138" y="93" text-anchor="middle" font-size="7.5">→ 202</text>
  <rect x="96" y="112" width="84" height="22" rx="3" fill="#e6f2ff" stroke="#333"/><text x="138" y="126" text-anchor="middle" font-size="7.5">notifications · deliveries</text>
  <line x1="138" y1="96" x2="138" y2="112" stroke="#333" marker-end="url(#d)"/>
  <line x1="64" y1="71" x2="96" y2="71" stroke="#333" marker-end="url(#d)"/>
  <text x="80" y="64" text-anchor="middle" font-size="7.5">100/s</text>
  <rect x="216" y="14" width="66" height="22" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="249" y="28" text-anchor="middle">push queue</text>
  <rect x="216" y="60" width="66" height="22" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="249" y="74" text-anchor="middle">email queue</text>
  <rect x="216" y="106" width="66" height="22" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="249" y="120" text-anchor="middle">SMS queue</text>
  <line x1="180" y1="60" x2="216" y2="26" stroke="#333" marker-end="url(#d)"/><text x="192" y="36" font-size="7">60/s</text>
  <line x1="180" y1="71" x2="216" y2="71" stroke="#333" marker-end="url(#d)"/><text x="192" y="66" font-size="7">30/s</text>
  <line x1="180" y1="82" x2="216" y2="116" stroke="#333" marker-end="url(#d)"/><text x="192" y="108" font-size="7">10/s</text>
  <rect x="304" y="14" width="56" height="22" rx="3" fill="#fff" stroke="#333"/><text x="332" y="28" text-anchor="middle">workers</text>
  <rect x="304" y="60" width="56" height="22" rx="3" fill="#fff" stroke="#333"/><text x="332" y="74" text-anchor="middle">workers</text>
  <rect x="304" y="106" width="56" height="22" rx="3" fill="#fff" stroke="#333"/><text x="332" y="120" text-anchor="middle">workers</text>
  <line x1="282" y1="25" x2="304" y2="25" stroke="#333" marker-end="url(#d)"/><line x1="282" y1="71" x2="304" y2="71" stroke="#333" marker-end="url(#d)"/><line x1="282" y1="117" x2="304" y2="117" stroke="#333" marker-end="url(#d)"/>
  <rect x="386" y="14" width="68" height="22" rx="3" fill="#fff" stroke="#b8541a"/><text x="420" y="28" text-anchor="middle" font-size="7.5">APNs · FCM</text>
  <rect x="386" y="60" width="68" height="22" rx="3" fill="#fff" stroke="#b8541a"/><text x="420" y="74" text-anchor="middle" font-size="7.5">email provider</text>
  <rect x="386" y="106" width="68" height="22" rx="3" fill="#fff" stroke="#b8541a"/><text x="420" y="120" text-anchor="middle" font-size="7.5">SMS provider</text>
  <line x1="360" y1="25" x2="386" y2="25" stroke="#b8541a" marker-end="url(#o)"/><line x1="360" y1="71" x2="386" y2="71" stroke="#b8541a" marker-end="url(#o)"/><line x1="360" y1="117" x2="386" y2="117" stroke="#b8541a" marker-end="url(#o)"/>
  <rect x="216" y="140" width="56" height="18" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="244" y="152" text-anchor="middle" font-size="7.5" fill="#bf4c28">dead letters</text>
  <text x="278" y="152" font-size="7.5">← after N attempts, page 4</text>
  <text x="6" y="152" font-size="7.5" fill="#bf4c28">✕ one shared queue: SMS provider at 2 s a call</text>
  <text x="6" y="163" font-size="7.5" fill="#bf4c28">puts every password-reset push behind it</text>
  <text x="420" y="9" text-anchor="middle" font-size="7">outside our control</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
  </defs>
</svg>

- One queue per channel, and within a channel one per priority (page 6). Isolation is the point: a provider that slows to two seconds a call fills its own queue and nobody else's. Each pool is sized to its provider's rate limit, not to the inbound rate
- The worker pool is where every hard problem in this module lives: retries and duplicates (page 4), a dead provider (page 5). The API and the queues are plain

### The failure

- One queue, one worker pool, all channels. The SMS provider degrades, the pool's workers all wait on it, and the push notifications behind them in the queue wait too. The cheapest, most urgent channel is delayed by the slowest one, and the outage is now visible in a channel that had no outage
