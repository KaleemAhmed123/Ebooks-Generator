## TLS 1.3 and PKI

- TLS gives a connection three things: **confidentiality** (eavesdroppers see ciphertext), **integrity** (tampering is detected), and **authentication** (you're really talking to `example.com`). **TLS 1.3** does the setup in **one round trip** (1.2 needed two), supports **0-RTT** resumption for repeat visits, and makes **forward secrecy** mandatory — stealing today's key can't decrypt yesterday's captured traffic.

<svg viewBox="0 0 360 104" role="img" aria-label="TLS 1.3 one-round-trip handshake and the certificate chain of trust from leaf to intermediate to a trusted root CA" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="48" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">client</text><text x="168" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">server</text>
  <line x1="48" y1="16" x2="48" y2="86" stroke="#bbb"/><line x1="168" y1="16" x2="168" y2="86" stroke="#bbb"/>
  <path d="M50 26 L166 36" stroke="#1a1a1a" marker-end="url(#p1)"/><text x="108" y="29" text-anchor="middle" font-size="5.6">ClientHello + key share</text>
  <path d="M166 48 L50 58" stroke="#1a1a1a" marker-end="url(#p1)"/><text x="108" y="51" text-anchor="middle" font-size="5.6">ServerHello + cert</text>
  <path d="M50 70 L166 78" stroke="#0f6e6e" marker-end="url(#p1)"/><text x="104" y="73" text-anchor="middle" font-size="5.6" fill="#0f6e6e">encrypted data (1 RTT)</text>
  <rect x="236" y="14" width="112" height="18" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="292" y="26" text-anchor="middle" font-size="5.8">root CA (trusted)</text>
  <rect x="236" y="40" width="112" height="18" rx="3" fill="#eef6f6" stroke="#0f6e6e"/><text x="292" y="52" text-anchor="middle" font-size="5.8">intermediate</text>
  <rect x="236" y="66" width="112" height="18" rx="3" fill="#e4f1f1" stroke="#0f6e6e"/><text x="292" y="78" text-anchor="middle" font-size="5.8">leaf = example.com</text>
  <path d="M292 66 L292 58" stroke="#1a1a1a" marker-end="url(#p1)"/><path d="M292 40 L292 32" stroke="#1a1a1a" marker-end="url(#p1)"/>
  <defs><marker id="p1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Authentication rests on **PKI** (Public Key Infrastructure). The server presents a **certificate** binding its public key to its domain, signed by a **Certificate Authority**. Your client walks the **chain** — leaf → intermediate → **root CA** — and trusts it only if the root is in its trust store. A valid chain plus a matching domain (the cert's SAN) is what turns the padlock on.
- For an infra engineer, TLS is mostly about **not getting the chain wrong**: serve the full chain (leaf + intermediates), match the hostname, and keep it unexpired.

:::warn
Two certificate outages you will cause at least once. **(1) Expiry** — a cert lapses and *every* client rejects the service at the same instant; monitor expiry and automate renewal (cert-manager, Booklet 11). **(2) Name/chain mismatch** — the cert's SAN doesn't cover the hostname (e.g. `api.example.com` vs `example.com`), or you served the leaf without its intermediate, so some clients fail and others (with the intermediate cached) succeed — a maddening "works for me" bug. `openssl s_client -connect host:443` prints the chain and dates.
:::
