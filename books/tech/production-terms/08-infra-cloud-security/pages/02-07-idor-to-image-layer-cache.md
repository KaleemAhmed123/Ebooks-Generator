## IDOR

*insecure direct object reference*

An endpoint exposes a record ID and trusts the client not to change it.
Authentication passed; authorisation was never written.

`GET /api/invoices/4471` returns the invoice to any logged-in user. Incrementing
the number walks the whole table, and every one of those requests looks
legitimate in the access log.

The fix is one clause applied everywhere: `WHERE id = ? AND owner_id = :current_user`.
Ownership belongs inside the query, not in a check above it that one handler
will eventually forget.

## Image Layer & Cache

Every Dockerfile instruction produces a layer. Change one and every layer after
it is rebuilt, so instruction order decides build time.

Copying the whole source before `npm ci` invalidates the install on every commit
— a three-minute build where twenty seconds would do. Dependencies change
weekly; source changes hourly. Order the file accordingly.

<svg viewBox="0 0 460 94" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Copying all source before installing rebuilds the dependency layer on every commit, while copying the manifests first keeps that layer cached">
  <text x="4" y="12" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">source first — install rebuilt every commit</text>
  <rect x="4" y="17" width="206" height="19" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="11" y="30" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">COPY . .</text>
  <rect x="4" y="36" width="206" height="19" fill="#f0f0f0" stroke="#6b6b6b" stroke-width="1.2"/>
  <text x="11" y="49" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">RUN npm ci</text>
  <text x="4" y="72" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">3 minutes</text>
  <text x="250" y="12" font-family="Georgia,serif" font-size="9" fill="#3f7a33">manifests first — install stays cached</text>
  <rect x="250" y="17" width="206" height="19" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="257" y="30" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">COPY package*.json ./</text>
  <rect x="250" y="36" width="206" height="19" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="257" y="49" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">RUN npm ci</text>
  <rect x="250" y="55" width="206" height="19" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="257" y="68" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">COPY . .</text>
  <text x="250" y="90" font-family="Georgia,serif" font-size="9.5" fill="#3f7a33">20 seconds</text>
</svg>
