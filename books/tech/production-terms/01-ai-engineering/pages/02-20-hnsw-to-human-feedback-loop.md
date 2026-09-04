## HNSW

*Hierarchical Navigable Small World*

The graph index most vector databases reach for by default. A proximity graph
built in layers: the top layer holds few nodes joined by long edges, each layer
below is denser, and every vector sits in the bottom one. A search enters at the
top, covers most of the distance in a handful of hops, then descends for the last
stretch. Malkov and Yashunin's paper claims logarithmic search scaling.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three-layer graph where the top layer makes long hops across the space and each lower layer refines the search until the nearest neighbours are reached">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">layer 2</text>
  <path d="M60 12 H430" stroke="#6b6b6b" stroke-width="0.4"/>
  <circle cx="70" cy="12" r="3.5" fill="#c25a35"/><circle cx="230" cy="12" r="3" fill="#1a1a1a"/><circle cx="400" cy="12" r="3" fill="#1a1a1a"/>
  <path d="M70 12 H230" stroke="#c25a35" stroke-width="1.4"/>
  <text x="4" y="46" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">layer 1</text>
  <path d="M60 42 H430" stroke="#6b6b6b" stroke-width="0.4"/>
  <circle cx="110" cy="42" r="3" fill="#1a1a1a"/><circle cx="230" cy="42" r="3.5" fill="#c25a35"/><circle cx="300" cy="42" r="3.5" fill="#c25a35"/><circle cx="380" cy="42" r="3" fill="#1a1a1a"/>
  <path d="M230 42 H300" stroke="#c25a35" stroke-width="1.4"/>
  <path d="M230 16 V38" stroke="#c25a35" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="4" y="76" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">layer 0</text>
  <path d="M60 72 H430" stroke="#6b6b6b" stroke-width="0.4"/>
  <circle cx="120" cy="72" r="2.6" fill="#1a1a1a"/><circle cx="200" cy="72" r="2.6" fill="#1a1a1a"/><circle cx="290" cy="72" r="2.6" fill="#1a1a1a"/><circle cx="312" cy="72" r="3.5" fill="#c25a35"/><circle cx="340" cy="72" r="2.6" fill="#1a1a1a"/><circle cx="400" cy="72" r="2.6" fill="#1a1a1a"/>
  <path d="M300 46 V68" stroke="#c25a35" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="330" y="60" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">every vector lives here</text>
</svg>

`m` fixes edges per node and therefore memory; `hnsw.ef_search` trades latency for
recall at query time. pgvector 0.8 defaults them to 16 and 40, and its README says
HNSW "has slower build times and uses more memory" than IVFFlat.

**Deletion is the operational tax.** Removing a node damages connectivity, so
implementations tombstone instead. A high-churn collection degrades until somebody
owns a rebuild job.

## Human Feedback Loop

The path from user signal to usable label. Implicit signals — did they copy the
answer, retry the question, abandon the session, escalate — are free and cover all
traffic, and are noisy. Explicit signals — a rating, an edit — are scarce and
strong.

The two grades are not worth the same. A thumbs-down says something was wrong; an
edited answer says what right would have been, and only the second is training
data. That settles the interface question. Offer thumbs and you collect the weak
signal; let people edit the output and save the edit, and labels arrive as a
byproduct of them doing their jobs.

**Explicit feedback samples your users, not your outputs.** People rate when
annoyed or delighted and never when things were merely fine. Quote a thumbs-up
percentage as a quality metric and you are quoting the extremes.
