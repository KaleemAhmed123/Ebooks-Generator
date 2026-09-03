## Presigned URL

A signed URL with an expiry that lets a client read or write one S3 object
directly. Your server issues it and never handles the bytes.

Proxying a 500MB upload through the API spends your memory, your bandwidth and
your request timeout on a file you only wanted to store. A presigned PUT — 15
minutes, size-capped — moves it from the browser to S3.

The expiry is the entire control. A URL with a week on it is a credential
pasted into a chat thread.

## proxy_pass & Trailing Slash

A trailing slash on `proxy_pass` decides whether the matched location prefix is
stripped before the request is forwarded. One character, completely different
routing.

The backend answers 404 and its log shows a path nobody wrote, so the bug is
almost always found from the wrong end.

| Inside `location /api/` | Backend receives |
|---|---|
| `proxy_pass http://backend;` | `/api/users` |
| `proxy_pass http://backend/;` | `/users` |

## Region vs Availability Zone

A region is a geographic area. An availability zone is an isolated datacentre
inside it with its own power and network. Multi-AZ survives a datacentre
failure; multi-region survives a region failure and prices itself accordingly.

Three replicas in one AZ is one replica with extra steps — a single zone outage
takes all three. Spread across three zones you pay cross-AZ transfer on every
byte of replication and stay up.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One region contains three isolated availability zones, each holding one replica, so losing a zone leaves two replicas serving">
  <text x="4" y="12" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">Region ap-south-1</text>
  <rect x="4" y="18" width="452" height="44" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="14" y="28" width="138" height="24" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="24" y="44" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">AZ a — replica 1</text>
  <rect x="161" y="28" width="138" height="24" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="171" y="44" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">AZ b — replica 2</text>
  <rect x="308" y="28" width="138" height="24" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="318" y="44" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">AZ c — replica 3</text>
  <text x="4" y="80" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">separate power, cooling and network — one zone failing leaves two serving</text>
</svg>
