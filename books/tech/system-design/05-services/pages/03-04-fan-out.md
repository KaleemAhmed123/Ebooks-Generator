## Fan-out and the tail

- **Fan-out**: one request sent to N backends in parallel, answered when the last reply arrives. The latency is the maximum of N, not the sum, which is the point; but the maximum of N draws is a tail sample, which is the trap. Dean and Barroso, "The Tail at Scale" (2013): with one server in a hundred being slow and a fan-out of 100, 63 % of user requests hit the slow case; at one in ten thousand and a fan-out of 2 000, almost one in five

<svg viewBox="0 0 460 140" role="img" aria-label="A root service fans one search request out to 100 leaf servers, shown as a row of small boxes, and waits for all replies. 99 leaves reply in about 10 milliseconds; one, shaded orange, is in a garbage-collection pause and replies at 1 second. The root's answer is the slowest reply, 1 second. Below, the arithmetic: if each leaf is slow with probability 1 in 100, the chance that none of 100 is slow is 0.99 to the 100, about 37 percent, so 63 percent of root requests see a slow leaf; the leaf's p99 is the root's median. Three fixes named: a per-leaf timeout with a partial answer, a hedged second request after the p95 delay, Module 4 page 6, and a cache in front of the leaves, Module 8." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="190" y="6" width="80" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="230" y="17" text-anchor="middle">root</text><text x="230" y="28" text-anchor="middle" font-size="7">waits for all 100</text>
  <g fill="#fff" stroke="#333">
    <rect x="6" y="52" width="16" height="12"/><rect x="26" y="52" width="16" height="12"/><rect x="46" y="52" width="16" height="12"/><rect x="66" y="52" width="16" height="12"/><rect x="86" y="52" width="16" height="12"/><rect x="106" y="52" width="16" height="12"/><rect x="126" y="52" width="16" height="12"/><rect x="146" y="52" width="16" height="12"/><rect x="166" y="52" width="16" height="12"/><rect x="186" y="52" width="16" height="12"/><rect x="206" y="52" width="16" height="12"/><rect x="226" y="52" width="16" height="12"/><rect x="246" y="52" width="16" height="12"/><rect x="266" y="52" width="16" height="12"/><rect x="286" y="52" width="16" height="12"/><rect x="306" y="52" width="16" height="12" fill="#fbe9e2" stroke="#bf4c28"/><rect x="326" y="52" width="16" height="12"/><rect x="346" y="52" width="16" height="12"/><rect x="366" y="52" width="16" height="12"/><rect x="386" y="52" width="16" height="12"/><rect x="406" y="52" width="16" height="12"/><rect x="426" y="52" width="16" height="12"/>
  </g>
  <text x="446" y="62" font-size="7">…</text>
  <line x1="230" y1="32" x2="14" y2="52" stroke="#333"/><line x1="230" y1="32" x2="120" y2="52" stroke="#333"/><line x1="230" y1="32" x2="230" y2="52" stroke="#333"/><line x1="230" y1="32" x2="340" y2="52" stroke="#333"/><line x1="230" y1="32" x2="434" y2="52" stroke="#333"/>
  <text x="120" y="78" text-anchor="middle" font-size="7">99 leaves reply in ≈ 10 ms</text>
  <text x="314" y="78" text-anchor="middle" font-size="7" fill="#bf4c28">one leaf in a GC pause: 1 s</text>
  <text x="230" y="92" text-anchor="middle" font-size="7.5" fill="#bf4c28">root answers at 1 s: the slowest leaf sets the latency</text>
  <text x="6" y="110" font-size="7">1 slow in 100, fan-out 100: P(no slow leaf) = 0.99¹⁰⁰ ≈ 37 %, so 63 % of requests see it (Dean &amp; Barroso); the leaf's p99 is the root's median</text>
  <text x="6" y="124" font-size="7">fixes: a per-leaf timeout and a partial answer · a hedged second request after the p95 delay (Module 4, page 6) · a cache in front (Module 8)</text>
  <text x="6" y="136" font-size="7">at 1 in 10 000 slow and a fan-out of 2 000: almost one in five requests, from the same paper</text>
</svg>

- The root's p50 is the leaf's p99 at a fan-out of 100: variance that is rare per server is routine per request. That is why leaf tail latency, not leaf average, is the number to engineer (Module 6, page 5), and why the tail is fought at the root as well: a timeout per leaf with a partial answer returned, a hedged request to a second replica after the p95 delay, cancelled when the first replies (Module 4, page 6), or a cache that keeps most requests off the leaves at all
- Fan-out and chain compose: a chain of three where the middle hop fans out to 100 has the chain's sum and the fan-out's maximum. Drawing the request once, with its counts, is the only way to see it

### The failure

- Designing to the leaf's median. A leaf with a 10 ms median and a 1 s p99 looks fine on its dashboard; behind a fan-out of 100 it delivers 1 s to most users, and the root's dashboard is the one that goes red. The tail is a property of the fan-out, not of any leaf, and no leaf's owner will find it
