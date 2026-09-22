## Approximate heavy hitters

- A **count-min sketch** is a grid of counters, d rows by w columns, with one hash function per row. An event for item x adds one to one counter per row, the one its row's hash picks; x's estimated count is the minimum of those d counters. Memory is d × w counters whatever the number of distinct items, and the estimate is never below the truth, only above it, by whatever other items happened to share a counter

<svg viewBox="0 0 460 150" role="img" aria-label="A count-min sketch with 3 rows and 8 columns, plus a heap of K. A view of video x hashes to column 5 in row 1, column 2 in row 2 and column 7 in row 3; each of those counters is incremented. Video y shares row 1's column 5, so that counter holds both counts. The estimate for x is the minimum of its three counters, row 2's, which no other frequent item shares. The bounds from Cormode and Muthukrishnan 2005: with width w equal to the ceiling of e over epsilon and depth d equal to the ceiling of the natural log of 1 over delta, the estimate is at most the true count plus epsilon times the total count N, with probability at least 1 minus delta; epsilon and delta of one in a thousand give w 2 719, d 7, about 19 000 counters, 76 kilobytes. Beside the sketch a min-heap of K entries holds the current top 100: after each increment, if the estimate exceeds the heap's smallest, it replaces it. An orange cross marks a hash map of every id: 10 million entries an hour on one machine is fine, a day across partitions is not, and the map's size is the number of distinct items, which the sketch's is not." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">sketch: d = 3 rows × w = 8 columns (drawn small; real w = 2 719, d = 7)</text>
  <g font-size="7">
    <text x="6" y="34">h₁(x) = 5</text><text x="6" y="56">h₂(x) = 2</text><text x="6" y="78">h₃(x) = 7</text>
  </g>
  <g stroke="#333" fill="#fff">
    <rect x="60" y="22" width="22" height="16"/><rect x="82" y="22" width="22" height="16"/><rect x="104" y="22" width="22" height="16"/><rect x="126" y="22" width="22" height="16"/><rect x="148" y="22" width="22" height="16" fill="#fbe9e2"/><rect x="170" y="22" width="22" height="16"/><rect x="192" y="22" width="22" height="16"/><rect x="214" y="22" width="22" height="16"/>
    <rect x="60" y="44" width="22" height="16"/><rect x="82" y="44" width="22" height="16" fill="#e6f2ff"/><rect x="104" y="44" width="22" height="16"/><rect x="126" y="44" width="22" height="16"/><rect x="148" y="44" width="22" height="16"/><rect x="170" y="44" width="22" height="16"/><rect x="192" y="44" width="22" height="16"/><rect x="214" y="44" width="22" height="16"/>
    <rect x="60" y="66" width="22" height="16"/><rect x="82" y="66" width="22" height="16"/><rect x="104" y="66" width="22" height="16"/><rect x="126" y="66" width="22" height="16"/><rect x="148" y="66" width="22" height="16"/><rect x="170" y="66" width="22" height="16"/><rect x="192" y="66" width="22" height="16" fill="#e6f2ff"/><rect x="214" y="66" width="22" height="16"/>
  </g>
  <g font-size="7" text-anchor="middle">
    <text x="159" y="33">x + y</text><text x="93" y="55">x</text><text x="203" y="77">x</text>
  </g>
  <text x="6" y="100" font-size="7">estimate(x) = min over the rows = row 2's counter; row 1 also holds y, and the min ignores it</text>
  <text x="6" y="112" font-size="7">bounds (Cormode &amp; Muthukrishnan 2005): w = ⌈e/ε⌉, d = ⌈ln(1/δ)⌉; estimate ≤ true + ε·N with probability ≥ 1 − δ</text>
  <text x="6" y="122" font-size="7">ε = δ = 0.001 → w = 2 719, d = 7: ≈ 19 000 counters, 76 KB, for any number of videos</text>
  <rect x="260" y="22" width="194" height="60" rx="3" fill="#fff" stroke="#1d4e89"/><text x="357" y="35" text-anchor="middle">min-heap of K = 100</text><text x="357" y="47" text-anchor="middle" font-size="7">the current top 100 by estimate</text><text x="357" y="58" text-anchor="middle" font-size="7">after each increment: if estimate(x) > heap's</text><text x="357" y="69" text-anchor="middle" font-size="7">smallest, replace it; O(log K) per event</text><text x="357" y="79" text-anchor="middle" font-size="7">the answer is read from the heap, not the sketch</text>
  <line x1="236" y1="52" x2="260" y2="52" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="142" font-size="7.5" fill="#bf4c28">✕ a hash map of every id: its size is the number of distinct items, 10 M an hour, 100 M a day, per partition; the sketch's is 76 KB</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The sketch answers "how many" for any item; the heap of K beside it answers "which ones", updated on every increment. Together they are fixed memory per window and O(d + log K) per event, and the error is a bound to say out loud: an item's count is over by at most ε of all events in the window, with probability 1 − δ. Heavy hitters are exactly the items that error cannot hide
- A sketch cannot forget: there is no way to subtract last minute's events from it, so it lives for one window (page 4), and two sketches with the same hashes and sizes add cell by cell, which is what makes partitions mergeable

### The failure

- A hash map of every id. It is exact and it is the right tool for an hour on one machine (page 1); it fails on the day and on the partitions, because its size is the number of distinct items and nothing bounds that. The sketch trades an error you can state for a memory you can plan
