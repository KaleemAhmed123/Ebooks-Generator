### 2. JSON Web Tokens (The Stateless Way)
A JWT is a self-contained token. The server does not need to store anything in a database to verify it.
1. The user sends their username and password.
2. The server verifies them, and creates a JSON payload: `{"userId": 1, "role": "admin"}`.
3. The server digitally signs this payload using a secret key (only the server knows the key). The combination of the payload and the signature is the JWT.
4. The server sends the JWT to the browser.
5. On the next request, the browser sends the JWT. The server recalculates the signature using its secret key. If the signature matches, the server *knows* the token hasn't been tampered with, and instantly trusts the payload.

:::mint
<svg viewBox="0 0 470 178" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="44"  y="12" class="sm">BROWSER</text>
  <text x="330" y="12" class="sm">SERVER</text>
  <line x1="60"  y1="18" x2="60"  y2="150" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="350" y1="18" x2="350" y2="150" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/>

  <line class="ar" x1="62" y1="34" x2="346" y2="34" marker-end="url(#a)"/>
  <text x="204" y="30" class="sm" text-anchor="middle">POST /login { email, password }</text>

  <rect class="soft" x="356" y="42" width="108" height="30" rx="3"/>
  <text x="410" y="55" class="tiny" text-anchor="middle">check credentials</text>
  <text x="410" y="66" class="tiny" text-anchor="middle">sign with the secret</text>

  <line class="ar" x1="348" y1="86" x2="64" y2="86" marker-end="url(#a)"/>
  <text x="204" y="82" class="sm" text-anchor="middle">Set-Cookie: token=eyJhbGci... HttpOnly</text>

  <line class="ar" x1="62" y1="112" x2="346" y2="112" marker-end="url(#a)"/>
  <text x="204" y="108" class="sm" text-anchor="middle">GET /orders   (cookie rides along)</text>

  <rect class="soft" x="356" y="118" width="108" height="26" rx="3"/>
  <text x="410" y="130" class="hot" text-anchor="middle">verify signature</text>
  <text x="410" y="140" class="tiny" text-anchor="middle">no database read</text>

  <line class="ar" x1="348" y1="150" x2="64" y2="150" marker-end="url(#a)"/>
  <text x="204" y="146" class="sm" text-anchor="middle">200 OK + data</text>

  <text x="6" y="170" class="hot">that skipped read is the whole trade: fast, and impossible to revoke early</text>
</svg>
:::

**Pros:** 
- Infinitely scalable. The server doesn't need to look up a database. It just runs a quick cryptographic math problem in memory to verify the token.
**Cons:** 
- You cannot easily revoke them. If an admin bans a user, the user's JWT is still mathematically valid until its built-in expiration date passes. To fix this, architectures often use short-lived JWTs (e.g., 15 minutes) combined with long-lived Refresh Tokens.
