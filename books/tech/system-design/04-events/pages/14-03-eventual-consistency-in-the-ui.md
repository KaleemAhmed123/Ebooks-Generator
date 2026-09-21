## Eventual consistency meets the UI

- A client writes, the write is accepted asynchronously, and a projection or read model needs time to catch up (Module 9, page 5) — the same **read-your-writes** gap booklet 03 names as a consistency guarantee a system either provides or does not. An async write path does not provide it by default

<svg viewBox="0 0 460 90" role="img" aria-label="A client writes and gets 202 accepted, but a poll or list still shows the old state until the read model eventually catches up." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="15" y="30" width="70" height="26" fill="none" stroke="#333"/>
  <text x="50" y="47" text-anchor="middle" font-size="7">client</text>
  <path d="M85 40 L150 40" stroke="#333" marker-end="url(#uc14)"/>
  <text x="115" y="33" text-anchor="middle" font-size="6.5">write</text>
  <rect x="150" y="27" width="90" height="26" fill="none" stroke="#333"/>
  <text x="195" y="44" text-anchor="middle" font-size="7">202 accepted</text>
  <path d="M240 40 L320 40" stroke="#bf4c28" stroke-dasharray="3 2" marker-end="url(#uc14)"/>
  <text x="280" y="33" text-anchor="middle" font-size="6.5" fill="#bf4c28">list still old</text>
  <rect x="320" y="27" width="120" height="26" fill="none" stroke="#333"/>
  <text x="380" y="44" text-anchor="middle" font-size="6.5">read model catches up</text>
  <defs><marker id="uc14" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Three fixes, in order of how much they change the client: return the full written result in the write response itself, so the client never needs to re-read to know what it just wrote; have the client poll the read path until the write shows up; or push the update once the projection catches up. All three are more work than pretending the read model is instantly current, which is the one option that is not actually available
- The failure mode is specific and recognisable: a user acts, sees no confirmation in the list they expect to see it in, and repeats the action — not because the first one failed, but because the read they checked was stale

### The failure

- A "create" flow that redirects to a list view immediately after a `202 Accepted`, and the list queries a projection that has not caught up. The user sees an empty list, assumes the create failed, and creates the same thing again — now there are two
