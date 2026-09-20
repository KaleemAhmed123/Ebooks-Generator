## Semi-synchronous and quorum commit

- Waiting for every follower makes the slowest follower the commit latency, and one dead follower stops all writes. Waiting for none loses acknowledged writes on failover. The middle: wait for **some**
- MySQL calls it **semi-synchronous**: the source waits until at least one replica has written the event to its relay log and flushed it. Not applied; received and durable. `AFTER_SYNC` (the default) does that wait before the source's own commit is visible

<svg viewBox="0 0 460 106" role="img" aria-label="Leader commits, waits for any two of three followers to acknowledge, then acknowledges the client. The third follower is still receiving. Postgres: synchronous_standby_names = ANY 2 (s1, s2, s3)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="38" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="57" text-anchor="middle" fill="#1d4e89">leader</text>
  <g fill="#fcfcfc" stroke="#1a1a1a"><rect x="230" y="6" width="60" height="24" rx="3"/><rect x="230" y="41" width="60" height="24" rx="3"/><rect x="230" y="76" width="60" height="24" rx="3"/></g>
  <text x="260" y="22" text-anchor="middle">s1</text><text x="260" y="57" text-anchor="middle">s2</text><text x="260" y="92" text-anchor="middle">s3</text>
  <g stroke="#1d4e89" fill="none"><path d="M100 53 L230 18"/><path d="M100 53 L230 53"/><path d="M100 53 L230 88" stroke-dasharray="2 2"/></g>
  <text x="310" y="22" font-size="7.5">flushed, ack ✓</text><text x="310" y="57" font-size="7.5">flushed, ack ✓</text><text x="310" y="92" font-size="7.5" fill="#b8541a">still in flight: not waited for</text>
  <text x="60" y="88" text-anchor="middle" font-size="7.5">ack client after 2 of 3</text>
  <text x="380" y="57" font-size="7.5" font-family="Consolas,monospace">ANY 2 (s1,s2,s3)</text>
</svg>

- Postgres writes the rule into `synchronous_standby_names`: `FIRST 2 (s1, s2, s3)` waits for the two highest-priority standbys; `ANY 2 (s1, s2, s3)` waits for whichever two answer first. `ANY` is a **quorum commit**: no single follower can stall the leader
- A commit acknowledged by a quorum survives the loss of any one machine, and the write latency is the second-fastest follower, not the slowest

### The failure

- MySQL's timeout. If no replica acknowledges within `rpl_semi_sync_source_timeout` (10,000 ms by default), the source "reverts to asynchronous replication" and keeps accepting writes. Nothing stops; a status variable changes. "Semi-sync" silently became "async", and the next failover loses writes the dashboard said were safe. Alert on the mode, not just the lag
