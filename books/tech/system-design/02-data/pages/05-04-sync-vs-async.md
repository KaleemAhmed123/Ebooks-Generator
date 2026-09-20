## Synchronous vs asynchronous

- The one question: does the leader wait for a follower before telling the client "committed"?
- **Asynchronous**: no. The client gets the fastest answer, and the leader alone holds the write until the followers catch up. **Synchronous**: yes. The commit costs a round trip to the follower, and a write acknowledged is a write on two machines

<svg viewBox="0 0 460 112" role="img" aria-label="Two timelines. Asynchronous: client write, leader commits and acknowledges, then streams to the follower. Synchronous: client write, leader streams to the follower, follower acknowledges, then the leader acknowledges the client." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="22" font-weight="bold">async</text>
  <line x1="60" y1="18" x2="450" y2="18" stroke="#ccc"/>
  <rect x="60" y="8" width="70" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="95" y="22" text-anchor="middle" font-size="7.5">client writes</text>
  <rect x="150" y="8" width="70" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="185" y="22" text-anchor="middle" font-size="7.5">leader commits</text>
  <rect x="240" y="8" width="70" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="275" y="22" text-anchor="middle" font-size="7.5" font-weight="bold">ack client</text>
  <rect x="330" y="8" width="110" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="385" y="22" text-anchor="middle" font-size="7.5">follower gets it … later</text>
  <text x="10" y="72" font-weight="bold">sync</text>
  <line x1="60" y1="68" x2="450" y2="68" stroke="#ccc"/>
  <rect x="60" y="58" width="70" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="95" y="72" text-anchor="middle" font-size="7.5">client writes</text>
  <rect x="150" y="58" width="70" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="185" y="72" text-anchor="middle" font-size="7.5">leader commits</text>
  <rect x="240" y="58" width="90" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="285" y="72" text-anchor="middle" font-size="7.5">follower flushes, acks</text>
  <rect x="350" y="58" width="70" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="385" y="72" text-anchor="middle" font-size="7.5" font-weight="bold">ack client</text>
  <text x="330" y="100" text-anchor="middle" font-size="7.5">a crash here loses an acknowledged write (async) or nothing (sync)</text>
  <path d="M330 90 L330 30" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/>
</svg>

- Postgres makes the wait a per-transaction setting, `synchronous_commit`, once `synchronous_standby_names` names a standby: `off` (do not even wait for the local WAL flush) · `local` (local flush only) · `remote_write` (standby received it) · `on` (standby flushed it, the default) · `remote_apply` (standby applied it, so a read there sees it)
- Redis replication is asynchronous, full stop. `WAIT` blocks until N replicas have the write, but the docs are explicit that it "does not turn a set of Redis instances into a CP system"

### The failure

- Failover on an async setup. Redis Cluster's docs describe it: master B "acknowledges the write, but crashes before being able to send the write to its replicas"; a replica is promoted; the write is gone, and the client was told it succeeded. Page 7 is that failover
