## Edge compute at a glance

- The PoP can run code, not just return bytes. A small function executes where the user is, so a decision that would have cost a transcontinental round trip costs almost nothing

<svg viewBox="0 0 460 106" role="img" aria-label="Edge compute. A user reaches a point of presence running a small worker that verifies a token, picks an A/B variant or routes by geography. A rejection is answered from the edge in a few milliseconds; anything that needs the application travels on to the origin at 162 milliseconds. An orange band marks the failure: if the worker queries a single Postgres in New York, the Tokyo point of presence still waits 162 milliseconds and nothing has been gained. Edge compute is fast only when the data it needs is also at the edge, or when it needs no data at all." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">a small function runs at the PoP, before the request travels anywhere</text>
  <rect x="4" y="34" width="56" height="22" rx="3" fill="#fff" stroke="#1d4e89"/><text x="32" y="48" text-anchor="middle" font-size="7.5">user</text>
  <rect x="100" y="28" width="110" height="34" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="155" y="42" text-anchor="middle" font-size="7.5">PoP + worker</text><text x="155" y="54" text-anchor="middle" font-size="6">verify a token · A/B · geo</text>
  <line x1="60" y1="45" x2="98" y2="45" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="254" y="22" width="130" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="319" y="34" text-anchor="middle" font-size="6.5">401 from the edge · ~5 ms</text>
  <rect x="254" y="48" width="130" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="319" y="60" text-anchor="middle" font-size="6.5">on to the origin · 162 ms</text>
  <line x1="210" y1="40" x2="252" y2="31" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="210" y1="50" x2="252" y2="57" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="4" y="72" width="446" height="16" rx="3" fill="#fbe9e2" stroke="#bf4c28"/>
  <text x="10" y="83" font-size="6.5" fill="#bf4c28">✕ the worker queries one Postgres in New York: the Tokyo PoP still waits 162 ms, and nothing was gained</text>
  <text x="4" y="101" font-size="7">it is fast only when the data it needs is at the edge too, or when the decision needs no data at all</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The work that fits shares one property: it decides using what the request already carries. Verifying a signed token needs a public key, not a database. Picking an A/B variant needs a cookie and a hash. Routing by country needs a header the CDN already added
- The constraints are real and shape what can be written. Short CPU budgets, cold starts on an unpopular PoP, no local disk, and no connection pool worth having — a few hundred PoPs each opening database connections is a denial-of-service attack on your own primary

### The failure

- Moving the code to the edge and leaving the data at home. A worker deployed to every PoP that must `SELECT` from one regional database has not removed the round trip, it has added a hop to it: the Tokyo PoP waits the same 162 ms, plus the worker's own startup
- The honest version of the trade is that edge compute relocates *computation*, and latency is dominated by *data*. It pays when the data is replicated to the edge as well, or when the decision is stateless. Otherwise the origin was already the right place, and the only thing distributed is the bill
