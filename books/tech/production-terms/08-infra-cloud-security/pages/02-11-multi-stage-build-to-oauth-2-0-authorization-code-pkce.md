## Multi-Stage Build

One stage compiles with the full toolchain; the next copies out only the
artifacts. The compilers never reach the image you ship.

A Node build image carrying that toolchain is 1.2GB. Copying `dist` and the
production `node_modules` into an alpine runtime gives 180MB — quicker to pull,
with nothing left inside to build an attacker's payload with.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A build stage carrying the full toolchain weighs 1.2GB and is discarded; copying only the compiled output into an alpine runtime stage ships 180MB with no compilers in it">
  <text x="4" y="12" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">stage 1 — build</text>
  <rect x="4" y="18" width="170" height="46" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="11" y="33" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">FROM node AS build</text>
  <text x="11" y="46" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">npm ci &amp;&amp; npm run build</text>
  <text x="11" y="59" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">toolchain, sources, caches</text>
  <text x="4" y="80" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">1.2GB — discarded</text>
  <line x1="178" y1="41" x2="264" y2="41" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M270 41 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="180" y="35" font-family="Consolas,monospace" font-size="8" fill="#3f7a33">COPY --from=build</text>
  <text x="278" y="12" font-family="Georgia,serif" font-size="9" fill="#3f7a33">stage 2 — runtime</text>
  <rect x="278" y="18" width="178" height="46" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="285" y="33" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">FROM node:alpine</text>
  <text x="285" y="46" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">COPY dist, node_modules</text>
  <text x="285" y="59" font-family="Georgia,serif" font-size="8.5" fill="#3f7a33">no compilers, no sources</text>
  <text x="278" y="80" font-family="Georgia,serif" font-size="9.5" fill="#3f7a33">180MB — shipped</text>
</svg>

## OAuth 2.0 Authorization Code + PKCE

The browser and mobile flow. The authorization code comes back through the
redirect, then is exchanged for tokens over a direct call; PKCE binds that
exchange to a secret the app generated and never transmitted.

The implicit flow put tokens in the URL fragment, where browser history,
referrers and any script on the page can read them. Authorization code with
PKCE is the current recommendation for every client type, public ones included.

<svg viewBox="0 0 460 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The app sends a hashed challenge to the authorize endpoint, receives a code through the redirect, and redeems it at the token endpoint with the original verifier, which must hash to the challenge">
  <rect x="4" y="6" width="452" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="11" y="19" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">app  →  /authorize?code_challenge=SHA256(verifier)</text>
  <rect x="4" y="26" width="452" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="11" y="39" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">user logs in  →  redirect back with ?code=xyz</text>
  <rect x="4" y="46" width="452" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="11" y="59" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">app  →  POST /token   code=xyz + code_verifier</text>
  <rect x="4" y="66" width="452" height="18" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4"/>
  <text x="11" y="79" font-family="Consolas,monospace" font-size="9" fill="#3f7a33">server: SHA256(verifier) == challenge  →  tokens</text>
  <text x="4" y="96" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">a stolen code is worthless without the verifier that never left the app</text>
</svg>
