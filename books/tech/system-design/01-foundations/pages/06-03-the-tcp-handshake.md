## One round trip before the first byte

- **TCP** establishes a connection with a three-way handshake: SYN, SYN-ACK, ACK. One round trip before any data

<svg viewBox="0 0 460 72" role="img" aria-label="TCP three-way handshake: client sends SYN, server replies SYN-ACK, client sends ACK, then data can flow" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="80" y1="8" x2="80" y2="66" stroke="#1a1a1a"/>
  <line x1="380" y1="8" x2="380" y2="66" stroke="#1a1a1a"/>
  <text x="80" y="6" text-anchor="middle" font-size="8" fill="#6b6b6b">client</text>
  <text x="380" y="6" text-anchor="middle" font-size="8" fill="#6b6b6b">server</text>
  <path d="M80 16 L374 28" stroke="#1d4e89"/><path d="M374 28 l-7 -4 v6 z" fill="#1d4e89"/>
  <text x="230" y="16" text-anchor="middle" font-size="8" fill="#1d4e89">SYN</text>
  <path d="M380 32 L86 44" stroke="#1d4e89"/><path d="M86 44 l7 -4 v6 z" fill="#1d4e89"/>
  <text x="230" y="36" text-anchor="middle" font-size="8" fill="#1d4e89">SYN-ACK</text>
  <path d="M80 48 L374 60" stroke="#1a1a1a"/><path d="M374 60 l-7 -4 v6 z" fill="#1a1a1a"/>
  <text x="230" y="52" text-anchor="middle" font-size="8">ACK + data</text>
  <text x="44" y="38" text-anchor="end" font-size="8" fill="#6b6b6b">1 RTT</text>
</svg>

- On a same-zone link (250 µs RTT) that is negligible. On a cross-continent link (80 ms RTT) it is 80 ms of setup
- If the connection fails, Linux retries the SYN with exponential backoff: 6 retries by default, totalling about 127 seconds before `connect()` gives up

### The failure

- No connect timeout set. The remote host is unreachable (firewall drops the SYN silently). The client waits **two minutes** per connection attempt before the kernel returns an error. Meanwhile the thread or event loop is blocked
- Always set a connect timeout shorter than the kernel's default. 1–3 seconds is typical
