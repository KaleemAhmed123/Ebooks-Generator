## Consistent Hashing

Mapping keys to nodes around a ring, so adding or removing a node remaps only
one Nth of the keys instead of nearly all of them.

With `hash % N`, going from eight cache nodes to nine invalidates about 89% of
keys at once — which arrives at the origin as a stampede. On a ring, roughly
11% move and the rest never notice.

<svg viewBox="0 0 460 116" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Keys placed on a hash ring walk clockwise to the next node, so adding a node moves only the keys between two neighbours">
  <circle cx="86" cy="58" r="44" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <circle cx="86" cy="14" r="4.5" fill="#1a1a1a"/><text x="86" y="8" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">A</text>
  <circle cx="130" cy="58" r="4.5" fill="#1a1a1a"/><text x="142" y="61" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">B</text>
  <circle cx="86" cy="102" r="4.5" fill="#1a1a1a"/><text x="86" y="114" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">C</text>
  <circle cx="42" cy="58" r="4.5" fill="#1a1a1a"/><text x="22" y="61" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">D</text>
  <circle cx="55" cy="27" r="3" fill="#2b5fa8"/>
  <path d="M58 24 A44 44 0 0 1 82 12" stroke="#2b5fa8" stroke-width="1.4" fill="none"/>
  <path d="M82 12 l-6 -1 l3 5 z" fill="#2b5fa8"/>
  <text x="196" y="30" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">each key walks clockwise to the next node</text>
  <text x="196" y="52" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">hash % N   8 to 9 nodes remaps 89%</text>
  <text x="196" y="70" font-family="Consolas,monospace" font-size="9" fill="#2b5fa8">the ring   8 to 9 nodes remaps 11%</text>
  <text x="196" y="94" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">virtual nodes even out the gaps</text>
</svg>

One node's slice of the ring can still be far larger than another's. Virtual
nodes — many ring positions per physical node — are what makes the distribution
even.

## Coupling vs Cohesion

Coupling is how much modules depend on each other. Cohesion is how much the
things inside one module belong together. Good design maximises the second and
minimises the first.

A `utils` module is the standard example of low cohesion: nothing in it relates
to anything else in it. Two services that must always deploy together are high
coupling, and are really one service that has been given two pipelines.

"These always ship together" is the most reliable test either way.

## CQRS

Separating the write model from the read model so each is shaped for its own
job, rather than one schema compromising between them.

Writes land in a normalised schema. Reads come from a denormalised projection
built off the write stream. Read latency drops sharply, and you have taken on a
permanent new obligation: the lag between the two, and what a user sees inside
it.

The pattern gets introduced for reads that were never actually slow. Measure
first — a well-indexed join beats a projection you have to keep honest.
