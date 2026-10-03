# The Wire and the Packet

## The layered model, honestly

- Networking is taught as seven OSI layers; you **debug** with four — the TCP/IP model. Each does one job, and each failure you'll ever chase lives in exactly one of them:
  - **Link** — one physical hop: Ethernet/Wi-Fi, MAC addresses, ARP. "Can these two machines on the same wire reach each other at all?"
  - **Internet (IP)** — addressing and routing *across* networks. "Is there a route from this network to that one, and does a firewall allow it?"
  - **Transport (TCP/UDP)** — process-to-process: ports, reliability, ordering. "Is the port open; is the connection accepted?"
  - **Application** — HTTP, gRPC, DNS, TLS. "Did the request/handshake itself succeed?"
- Each layer **wraps** the one above it — **encapsulation**. Your HTTP bytes become a TCP segment, inside an IP packet, inside an Ethernet frame. Each layer adds a header it alone reads, and strips it on the way back up.

<svg viewBox="0 0 360 118" role="img" aria-label="Encapsulation: application data is wrapped in a TCP segment, then an IP packet, then an Ethernet frame, each layer adding its own header" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="16" width="332" height="20" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="24" y="29" font-size="6.5">Eth hdr</text><rect x="70" y="18" width="268" height="16" fill="#eef6f6" stroke="#0f6e6e"/>
  <rect x="78" y="40" width="252" height="20" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="88" y="53" font-size="6.5">IP hdr</text><rect x="126" y="42" width="196" height="16" fill="#eef6f6" stroke="#0f6e6e"/>
  <rect x="134" y="64" width="180" height="20" rx="2" fill="#e4f1f1" stroke="#0f6e6e"/><text x="144" y="77" font-size="6.5">TCP hdr</text><rect x="186" y="66" width="120" height="16" fill="#eef6f6" stroke="#0f6e6e"/>
  <rect x="194" y="88" width="104" height="18" rx="2" fill="#dfeeee" stroke="#0f6e6e"/><text x="246" y="100" text-anchor="middle" font-size="6.5">HTTP data</text>
  <text x="352" y="29" text-anchor="end" font-size="5.6" fill="#0f6e6e">link</text>
  <text x="352" y="53" text-anchor="end" font-size="5.6" fill="#0f6e6e">internet</text>
  <text x="352" y="77" text-anchor="end" font-size="5.6" fill="#0f6e6e">transport</text>
</svg>

- The practical payoff: **localise before you theorise.** "Service A can't reach B" is not one problem — it's a link problem (no route/ARP), an IP problem (routing or a firewall/security-group drop), a transport problem (wrong port, connection refused, no listener), or an application problem (TLS mismatch, HTTP 5xx). The whole next five modules give you a layer each, and Module 6 gives you the tools to prove which one it is.
