## ANN vs Exact Search

Approximate nearest neighbour trades a small amount of recall for an enormous
amount of speed. Exact search is correct and does not scale.

Exact search over ten million vectors takes seconds. HNSW returns in about eight
milliseconds at roughly 98% recall — and the missing 2% is invisible until
someone reports a bad answer.

### How it works

Exact nearest-neighbour search compares the query vector against every stored
vector. It is guaranteed correct and it is linear: ten million vectors means ten
million comparisons per query.

Approximate search builds an index that lets you skip nearly all of them.
Instead of checking everything you navigate a structure that reaches the right
neighbourhood quickly, and compare only what is there.

The word *approximate* is doing real work. You will sometimes miss a true
nearest neighbour. The proportion you do find is **recall**, and production
settings typically land between 95% and 99%.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exact search compares all ten million vectors for full recall in seconds; approximate search navigates an index for about 98 percent recall in 8 milliseconds">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="9" fill="#6b6b6b">10,000,000 vectors, one query</text>
  <rect x="4" y="24" width="216" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="38" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">exact — compare all 10M</text>
  <text x="212" y="38" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">100% · seconds</text>
  <rect x="240" y="24" width="216" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.3"/>
  <text x="250" y="38" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">ANN — navigate an index</text>
  <text x="448" y="38" text-anchor="end" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">~98% · ~8ms</text>
  <text x="4" y="60" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">the missing 2%: no error, no warning, no log line —</text>
  <text x="4" y="72" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">just a slightly worse answer that nobody can point at</text>
</svg>

### In practice

Recall is a dial, not a fixed property of the index. Every ANN implementation
exposes a parameter trading search effort against accuracy, and the right
setting depends on your data and your tolerance, not on the documentation's
default.

Measure it rather than assuming it. Take a few hundred real queries, compute
exact results as ground truth, and check what fraction your configuration
returns. Re-measure after every index rebuild and every parameter change — both
move recall, and neither announces it.
