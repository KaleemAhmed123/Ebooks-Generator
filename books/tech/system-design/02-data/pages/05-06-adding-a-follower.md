## Adding or rebuilding a follower

- A new follower cannot just start reading the stream: it has no data, and the stream only carries changes. It needs a **snapshot** plus every change since the snapshot's position
- The steps: take a consistent snapshot of the leader (without stopping writes); note the log position it corresponds to; copy the snapshot to the follower; connect the follower to the stream from that position; let it catch up

<svg viewBox="0 0 460 104" role="img" aria-label="Leader's log as a timeline. A snapshot is taken at position 1000. The new follower restores the snapshot, then streams changes from position 1000 onward while the leader continues past 1400." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="30" y1="40" x2="440" y2="40" stroke="#1a1a1a"/>
  <path d="M440 40 l-5 -3 v6 z" fill="#1a1a1a"/>
  <text x="30" y="30" font-size="7.5">leader's log</text>
  <g font-size="7" text-anchor="middle"><text x="120" y="54">pos 1000</text><text x="300" y="54">pos 1400</text><text x="420" y="54">now</text></g>
  <circle cx="120" cy="40" r="3" fill="#1d4e89"/><circle cx="300" cy="40" r="3" fill="#b8541a"/>
  <rect x="60" y="66" width="120" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="120" y="83" text-anchor="middle" font-size="7.5">snapshot @1000 → copy</text>
  <path d="M180 79 L240 79" stroke="#1a1a1a" fill="none"/><path d="M240 79 l-4 -3 v6 z" fill="#1a1a1a"/>
  <rect x="240" y="66" width="180" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="330" y="83" text-anchor="middle" font-size="7.5">replay 1000 → 1400 → now, then stream</text>
  <path d="M120 44 L120 66" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/>
</svg>

- Postgres: `pg_basebackup` takes the snapshot and the WAL position; the standby then streams WAL. Redis: a replica sends `PSYNC` with its last offset; if the master's **replication backlog** (a ring buffer of recent writes) still holds that offset it sends only the missing part, otherwise a full sync: an RDB snapshot, then the stream
- A rebuild after a crash is the same procedure. A follower that was down for a day is a new follower with a head start, if the log from where it stopped still exists

### The failure

- The backlog is too small for the outage. Every reconnecting replica misses the partial resync window and asks for a full sync at once; the master forks to write an RDB for each, and the load of rebuilding the replicas is what takes the master down. Size the backlog for the longest outage you expect to survive, not the median
