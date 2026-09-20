## Hybrid logical clocks

- A **hybrid logical clock (HLC)** (Kulkarni et al., 2014) is a Lamport clock that stays close to wall time. Each timestamp is a pair: `l`, the largest physical time this node has seen, and `c`, a counter that breaks ties when `l` does not move. Causality holds as on page 4; and `l` is always within the cluster's clock error of real time, so the stamp is also readable as a time

| Event on node j, with physical clock `pt` | New `l` | New `c` |
|---|---|---|
| local event or send | `max(l, pt)` | `c + 1` if `l` unchanged, else `0` |
| receive a message stamped `(l_m, c_m)` | `max(l, l_m, pt)` | if `l = l_m = old l`: `max(c, c_m) + 1`; if `l = old l`: `c + 1`; if `l = l_m`: `c_m + 1`; else `0` |
| compare two stamps | by `l` first, then `c` | a total order, consistent with causality |

- `c` only grows while `pt` is behind what the node has already seen, so it stays small, and the pair fits in 64 bits: the paper packs it into the NTP timestamp format. Nodes with a fast clock pull the others' `l` forward; a node whose clock is far behind mostly counts
- CockroachDB orders transactions with HLCs. Its clocks are allowed to disagree by a configured **maximum offset**, 500 ms by default; a node that finds its clock more than 80% of that offset away from half of its peers shuts itself down rather than risk a wrong order. Reads that fall inside another node's uncertainty window are restarted, which is the latency HLC costs
- What HLC does not give: an absolute order in real time. Two stamps from two nodes within the max offset are ordered, but the order may not be the wall-clock one. Only hardware-backed uncertainty bounds (Spanner's TrueTime) can promise that, at the price of waiting out the bound on every commit

### The failure

- A node whose clock runs past the cluster's max offset because NTP failed silently. CockroachDB's answer is to kill the node, which looks like an outage and is the safe choice: an HLC assumes the offset bound, and a node outside it can order a write before its own cause
