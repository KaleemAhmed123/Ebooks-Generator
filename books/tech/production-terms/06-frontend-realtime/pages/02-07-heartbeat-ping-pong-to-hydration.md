## Heartbeat / Ping-Pong

Periodic frames confirming the connection is alive, because a dead TCP
connection can look perfectly open for minutes.

A phone loses signal in a tunnel. The server holds the socket and keeps writing
to it until a ping goes unanswered at twenty seconds and the connection is
finally cleaned up.

Without heartbeats the server's socket count drifts upward all day, and the
number of "connected users" on your dashboard becomes fiction.

**They also stop proxies idling you out.** Load balancers and reverse proxies
close connections that have been silent too long, and a heartbeat under that
threshold is what keeps a legitimately quiet connection open.

## Hydration

Attaching React event handlers to server-rendered HTML. The page looks ready
before it is actually interactive.

A 400KB bundle means the page paints at 800ms and stays unresponsive until
3.2 seconds. Clicks in that window do nothing — so users click again.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Server HTML paints early while the JavaScript downloads and React attaches handlers, leaving a gap in which the page looks ready but does not respond">
  <path d="M40 34 H440" stroke="#1a1a1a" stroke-width="1.1"/>
  <circle cx="90" cy="34" r="4" fill="#1f6f8b"/>
  <text x="90" y="22" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">800ms</text>
  <text x="90" y="50" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">paints</text>
  <rect x="94" y="30" width="220" height="8" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1"/>
  <text x="204" y="50" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">looks ready, ignores every click</text>
  <circle cx="318" cy="34" r="4" fill="#1a1a1a"/>
  <text x="318" y="22" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">3.2s</text>
  <text x="340" y="38" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">interactive</text>
</svg>

That gap is the metric people miss, because both ends of it look fine: the paint
is fast and the page eventually works.
