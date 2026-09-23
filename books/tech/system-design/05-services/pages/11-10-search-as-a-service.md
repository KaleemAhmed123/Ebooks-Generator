## Search as a separate system

- The index is a derived copy, not a second source of truth. The database owns the data; the index is fed from it, may be rebuilt from it at any time, and is allowed to be slightly behind

<svg viewBox="0 0 460 98" role="img" aria-label="Search fed from the database. Postgres remains the source of truth; a change data capture stream carries every committed change into the search index, and queries read the index through an alias which can be swapped from one index version to the next. A write becomes searchable after the refresh, one second by default, and only on indices that have received a search in the last thirty seconds. An orange cross marks reading your own write from search: the refresh has not run, so the user is shown the value they just replaced." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="13" font-size="7.5">the database stays the source of truth; the index is derived and rebuildable</text>
  <rect x="4" y="30" width="84" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="46" y="42" text-anchor="middle" font-size="7">Postgres</text><text x="46" y="53" text-anchor="middle" font-size="6">source of truth</text>
  <rect x="134" y="30" width="84" height="28" rx="3" fill="#f3f3f3" stroke="#666"/><text x="176" y="42" text-anchor="middle" font-size="7">CDC stream</text><text x="176" y="53" text-anchor="middle" font-size="6">booklet 04</text>
  <rect x="264" y="30" width="90" height="28" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="309" y="42" text-anchor="middle" font-size="7">index v2</text><text x="309" y="53" text-anchor="middle" font-size="6">rebuilt beside v1</text>
  <rect x="392" y="30" width="62" height="28" rx="3" fill="#fff" stroke="#1d4e89"/><text x="423" y="42" text-anchor="middle" font-size="7">alias</text><text x="423" y="53" text-anchor="middle" font-size="6">v1 → v2</text>
  <line x1="88" y1="44" x2="132" y2="44" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="218" y1="44" x2="262" y2="44" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="354" y1="44" x2="390" y2="44" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="4" y="76" font-size="7">a write is searchable after the refresh — 1 s by default, and only on indices searched in the last 30 s</text>
  <text x="4" y="92" font-size="7.5" fill="#bf4c28">✕ reading your own write from search: the refresh has not run, so the user sees the value they replaced</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- "Near real-time" has a precise meaning. Elasticsearch's default refresh interval is **1 second**, and it applies only to indices that have received at least one search in the last 30 seconds — so an index nobody is querying may be much further behind than its configured interval suggests
- Rebuilding is not an edit. Changing the analyser — adding a language, altering stemming — changes how every document was tokenised, so the existing index cannot be updated in place. Build a new index beside the live one, backfill it, and move the alias when it has caught up

### The failure

- Reading your own write from search. The user renames something, the application immediately queries the index to show the result, and the refresh has not run — so the old name is displayed and the save appears to have failed, which is Module 8, page 12's read-your-writes problem arriving through a different door
- The rule is the same: after a write, read the record from the database. Search answers "which records match", never "what does this record say now". Conflating the two is comfortable because the index usually catches up inside the time it takes to render a page, which makes the bug intermittent rather than absent
