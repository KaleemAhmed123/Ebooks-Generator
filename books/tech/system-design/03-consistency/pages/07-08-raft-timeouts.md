## Timeouts in numbers

- Raft's one timing rule: `broadcastTime ≪ electionTimeout ≪ MTBF`. Heartbeats must arrive well inside the election timeout or followers elect needlessly; the election timeout must be far shorter than the time between node failures or the cluster is always electing

| Parameter | Raft paper | etcd default | etcd's rule |
|---|---|---|---|
| heartbeat interval | broadcast time, 0.5–20 ms depending on storage | **100 ms** | about 0.5–1.5× the round-trip time between members |
| election timeout | **150–300 ms**, randomized | **1000 ms** | at least **10×** the round-trip time; hard upper limit 50 000 ms |
| election window | one timeout plus one election | ≈ 1 s plus the vote | the write outage a leader failure costs |

- The etcd defaults assume one data centre. Members across regions with a 100 ms round-trip need a heartbeat near 100 ms and an election timeout past 1 s, or each congested moment becomes an election. Raise both together; a large election timeout with a small heartbeat only lengthens the outage on a real failure
- Elections are where the cluster is unavailable for writes. An election timeout of 1 s means about a second of refused writes per leader loss, and any client retry budget (booklet 01) has to absorb that
- Randomization is not optional. Equal timeouts on every node turn every leader loss into repeated split votes

### The failure

- One set of defaults copied across a cross-region cluster. Heartbeats at 100 ms over a 120 ms round-trip arrive late every time; the 1000 ms election timeout is only eight round-trips away, and a burst of traffic crosses it. The cluster elects, the new leader has the same problem, and the on-call sees "leader changed" every few minutes with no node down
