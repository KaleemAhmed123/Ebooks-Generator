## Blue-green deployment

- Two full production environments, one live. Fowler's 2010 description is the whole mechanism: final testing happens in the idle environment, then "you switch the router so that all incoming requests go to the green environment", and "if anything goes wrong you switch the router back to your blue environment"
- What is bought is a rollback that takes as long as a routing change and does not depend on the new version being able to shut down cleanly

<svg viewBox="0 0 460 124" role="img" aria-label="Blue-green deployment. Before the switch, the router sends all traffic to the blue environment running version one, while the green environment running version two sits idle. After the switch, the router sends all traffic to green running version two and blue running version one sits idle, ready to take traffic back. Both environments use one shared database; the switch does not duplicate it. Rollback is the same action as the release run in reverse, which is the property being bought. An orange cross marks a forward-only migration: green drops a column, and the flip back starts blue against a schema it can no longer read." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="93" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">before</text>
  <rect x="10" y="22" width="44" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="32" y="35" text-anchor="middle" font-size="7">router</text>
  <rect x="76" y="18" width="100" height="18" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="126" y="30" text-anchor="middle" font-size="7.5">blue  v1  live</text>
  <rect x="76" y="44" width="100" height="18" rx="3" fill="#fff" stroke="#999"/><text x="126" y="56" text-anchor="middle" font-size="7.5" fill="#666">green  v2  idle</text>
  <line x1="54" y1="27" x2="74" y2="27" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="325" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">after the switch</text>
  <rect x="242" y="22" width="44" height="20" rx="3" fill="#fff" stroke="#1d4e89"/><text x="264" y="35" text-anchor="middle" font-size="7">router</text>
  <rect x="308" y="18" width="100" height="18" rx="3" fill="#fff" stroke="#999"/><text x="358" y="30" text-anchor="middle" font-size="7.5" fill="#666">blue  v1  idle</text>
  <rect x="308" y="44" width="100" height="18" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="358" y="56" text-anchor="middle" font-size="7.5">green  v2  live</text>
  <line x1="286" y1="53" x2="306" y2="53" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="76" y="74" width="340" height="18" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="246" y="86" text-anchor="middle" font-size="7.5">one database, shared by both — the switch does not duplicate it</text>
  <text x="6" y="106" font-size="7">rollback is the release action run in reverse: point the router back. That is the property being bought</text>
  <text x="6" y="120" font-size="7.5" fill="#bf4c28">✕ a forward-only migration: green drops a column, the flip back starts blue against a schema it cannot read</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The database is the part the diagram exists to show. Two application environments, one store — so every migration has to work against both versions at once, which is parallel change (page 3) applied to schema: add the column, deploy code that writes both, drop the old column in a later release
- The price is running two environments. Fowler notes the variation of sharing more than the database, but the closer the two get, the less of the instant rollback survives

### The failure

- A migration that only works forward. Green boots, drops `amount`, serves fine. A bug appears twenty minutes later, the router flips back, and blue immediately fails on every query because the column it selects is gone
- The rollback was never real; it was a rollback of the application only, in a system where the risky change was in the schema. Blue-green is a guarantee about code, and it silently converts schema changes into the one thing that cannot be undone
