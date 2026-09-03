## Working Set

The data and indexes you actually touch regularly. If it does not fit in RAM,
MongoDB goes to disk and latency collapses.

A 200GB collection with an 8GB working set is comfortable on a 16GB machine.
Reads are sub-millisecond because everything hot is cached.

<svg viewBox="0 0 460 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small hot working set fits in RAM while most of the collection stays cold; one full scan evicts the hot data and every query slows">
  <rect x="4" y="14" width="88" height="22" fill="#e2fcf3" stroke="#2a5673" stroke-width="1.4"/>
  <text x="48" y="29" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2a5673">hot 8GB</text>
  <rect x="92" y="14" width="336" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="260" y="29" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">cold 192GB</text>
  <text x="4" y="50" font-family="Georgia,serif" font-size="9" fill="#2a5673">fits in 16GB RAM — sub-millisecond reads</text>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9" fill="#b32d2b">one full scan evicts the hot 8GB — every user query slows, not just the report</text>
</svg>

A single analytics query scanning the whole collection pushes the working set
out of cache, and the damage lands on everybody else.

**Watch cache eviction rate and page faults**, not collection size.

## Write Concern

*w / j*

How many nodes must confirm a write before it is acknowledged. `w:1` is fast and
can lose data on failover; `w:"majority"` survives it.

With `w:1`, a write acknowledged by a primary that then crashes before
replicating is rolled back. The user saw success and the data is gone, with no
error anywhere to connect the two.

| Setting | Guarantee |
|---|---|
| `w:1` | primary only — fast, lossy on failover |
| `w:"majority"` | survives a failover |
| `j:true` | fsynced to the journal before acknowledging |

Anything involving money takes `majority` and journalling. The latency cost is
small and the alternative is unexplainable.
