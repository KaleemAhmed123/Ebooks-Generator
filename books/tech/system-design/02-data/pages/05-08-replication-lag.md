## Replication lag

- A follower is the leader as it was some time ago. That time is **replication lag**, and it is never zero under async replication; it is usually milliseconds, and under load or a long transaction it can be minutes
- Measure it as bytes (how much log the follower has not applied) and as seconds (how old the follower's newest change is). Alert on both; a follower that has received everything but applied nothing is caught up in bytes and hours behind in time

<svg viewBox="0 0 460 96" role="img" aria-label="Leader's log at position 1400. Follower A has applied to 1398, a few milliseconds behind. Follower B is stuck at 900, behind by a long transaction. Reads from B see the past." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="40" y1="30" x2="430" y2="30" stroke="#1a1a1a"/><text x="40" y="20" font-size="7.5">leader: pos 1400</text>
  <circle cx="430" cy="30" r="3" fill="#1d4e89"/>
  <line x1="40" y1="58" x2="424" y2="58" stroke="#1d4e89"/><circle cx="424" cy="58" r="3" fill="#1d4e89"/><text x="40" y="48" font-size="7.5">follower A: pos 1398 · lag ms</text>
  <line x1="40" y1="86" x2="270" y2="86" stroke="#b8541a"/><circle cx="270" cy="86" r="3" fill="#b8541a"/><text x="40" y="76" font-size="7.5" fill="#b8541a">follower B: pos 900 · lag minutes · every read here is the past</text>
  <path d="M270 82 L424 62" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/>
</svg>

- Postgres has a conflict built in. `VACUUM` on the primary removes row versions a standby query may still be reading. The standby waits up to `max_standby_streaming_delay` (30 s) then cancels the query. `hot_standby_feedback = on` tells the primary to keep those versions, at a cost the docs name: it "can cause database bloat on the primary"

### The failure

- Lag that grows without anyone knowing. A long-running report on the follower, or one large transaction on the leader, and the follower falls minutes behind. Every read routed there is minutes stale, and nothing on the write path shows it. The next two pages are what a stale read does to a user
