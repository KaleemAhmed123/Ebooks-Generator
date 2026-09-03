## CAP Theorem

During a network partition you choose consistency or availability. You do not
get to skip the partition — networks fail, and the theorem is about what you do
when they have.

Two data centres lose their link. A CP system rejects writes on the minority
side and stays correct. An AP system accepts them and reconciles afterwards,
which means someone eventually decides whose write loses.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A partition forces a choice between rejecting writes to stay correct, or accepting them and reconciling later">
  <text x="230" y="14" text-anchor="middle" font-family="Georgia,serif" font-size="10.5" fill="#1a1a1a">partition happens — this part is not a choice</text>
  <path d="M230 20 V34 M230 34 H120 M230 34 H340 M120 34 V44 M340 34 V44" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M120 46 l-4 -7 h8 z M340 46 l-4 -7 h8 z" fill="#1a1a1a"/>
  <rect x="24" y="48" width="192" height="38" fill="none" stroke="#2b5fa8" stroke-width="1.6"/>
  <text x="120" y="64" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#2b5fa8">CP</text>
  <text x="120" y="79" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">reject writes, stay correct</text>
  <rect x="244" y="48" width="192" height="38" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="340" y="64" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#1a1a1a">AP</text>
  <text x="340" y="79" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">accept writes, reconcile later</text>
</svg>

"CA" is not an option anyone gets to pick in production. It only describes a
system that has not been partitioned yet.

## Capacity Headroom

The gap between normal load and the point where things break. Running at 80%
looks efficient on a dashboard and leaves nothing to absorb a spike or a lost
node.

A cluster steady at 85% CPU cannot survive one node failing — the survivors
would each need more than 100%. Fifty to sixty percent is the number that
absorbs a node loss, a traffic spike, a deploy and a GC pause at the same time.

Headroom is not waste. It is the difference between a bad Tuesday and an
incident channel.
