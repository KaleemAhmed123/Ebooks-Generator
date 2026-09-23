## Versioning between services

- A breaking change still has to happen sometimes. It is made survivable by never letting the old and new shapes exist apart: **parallel change**, also called expand and contract, documented as a refactoring strategy by Joshua Kerievsky in 2006. Expand the interface to serve both, migrate every caller, then contract

<svg viewBox="0 0 460 116" role="img" aria-label="Parallel change in three phases. Phase one, expand: the payments API serves a new field amount_minor alongside the old field amount, writing both and reading either. Phase two, migrate: callers move one at a time, web checkout done, mobile app done, nightly reporting still outstanding. Phase three, contract: the API serves amount_minor only and the old field is deleted once reads reach zero. The migrate phase lasts as long as the slowest caller's release cycle. An orange cross marks the alternative of running slash v1 beside slash v2: two code paths, two migration sets, and v1 never dies because retiring it is always another team's sprint." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="78" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">1 · expand</text>
  <rect x="14" y="19" width="128" height="44" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="78" y="33" text-anchor="middle" font-size="8">payments API</text>
  <text x="78" y="45" text-anchor="middle" font-size="7">amount_minor ← new</text>
  <text x="78" y="56" text-anchor="middle" font-size="7">amount ← old, still served</text>
  <text x="78" y="77" text-anchor="middle" font-size="7">writes both, reads either</text>
  <text x="230" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">2 · migrate</text>
  <rect x="166" y="19" width="128" height="44" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="176" y="33" font-size="7">✓ web checkout</text>
  <text x="176" y="45" font-size="7">✓ mobile app</text>
  <text x="176" y="57" font-size="7">… nightly reporting</text>
  <text x="230" y="77" text-anchor="middle" font-size="7">one caller at a time</text>
  <text x="382" y="13" text-anchor="middle" font-size="7.5" fill="#1d4e89">3 · contract</text>
  <rect x="318" y="19" width="128" height="44" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="382" y="35" text-anchor="middle" font-size="8">payments API</text>
  <text x="382" y="49" text-anchor="middle" font-size="7">amount_minor only</text>
  <text x="382" y="77" text-anchor="middle" font-size="7">delete when reads hit zero</text>
  <line x1="144" y1="41" x2="164" y2="41" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="296" y1="41" x2="316" y2="41" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="6" y="95" font-size="7">the migrate phase lasts as long as the slowest caller's release cycle; that is its cost, and also the whole point of it</text>
  <text x="6" y="109" font-size="7.5" fill="#bf4c28">✕ /v1 beside /v2: two code paths, two migration sets, and /v1 never dies — retiring it is another team's sprint</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Contract is the phase that gets skipped, so make it a scheduled task with a name on it. The exit condition is measurable: a counter on reads of the old field, and a dashboard showing it at zero for longer than the longest caller's deploy interval
- URL versioning is the same pattern at the coarsest possible grain — the whole API instead of one field. It is the last resort, not the default, because it multiplies the surface that has to stay alive

### The failure

- Expand with no contract. The service now serves both fields forever, and each one is a branch in the code and a column in the database. Three such migrations later, every read path has eight combinations and no test covers more than two of them
- A parallel change that never contracts is strictly worse than the breaking change it avoided, because the cost is permanent instead of one afternoon
