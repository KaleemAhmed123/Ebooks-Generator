## Distributed locks and fencing

- A **distributed lock** coordinates exclusive access across machines — "only one worker processes this job / writes this file / runs this migration." It sounds simple and is a famous source of data corruption, because of the one fact from Module 1: **you cannot tell a crashed lock-holder from a slow one.**
- The naive lock (e.g. Redis `SET key worker1 NX PX 30000` — acquire if absent, auto-expire in 30 s) fails like this:

<svg viewBox="0 0 360 90" role="img" aria-label="A worker acquires a lock, pauses for a long GC past the TTL, the lock expires and a second worker acquires it, then the first worker wakes and both write — corruption" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="30" x2="340" y2="30" stroke="#bbb"/><text x="20" y="18" font-size="6" fill="#1f487e">worker 1</text>
  <rect x="40" y="24" width="60" height="12" fill="#dfe9d9" stroke="#2f7d4f"/><text x="70" y="33" text-anchor="middle" font-size="5">holds lock</text>
  <rect x="100" y="24" width="120" height="12" fill="#fdecea" stroke="#c0392b"/><text x="160" y="33" text-anchor="middle" font-size="5">long GC pause (&gt; TTL)</text>
  <rect x="230" y="24" width="60" height="12" fill="#fdecea" stroke="#c0392b"/><text x="260" y="33" text-anchor="middle" font-size="5">wakes, WRITES</text>
  <line x1="20" y1="66" x2="340" y2="66" stroke="#bbb"/><text x="20" y="78" font-size="6" fill="#1f487e">worker 2</text>
  <rect x="150" y="60" width="140" height="12" fill="#dfe9d9" stroke="#2f7d4f"/><text x="220" y="69" text-anchor="middle" font-size="5">lock expired → acquires, WRITES</text>
  <text x="300" y="50" text-anchor="middle" font-size="5.6" fill="#c0392b">two writers!</text>
</svg>

- Worker 1 holds the lock, then **stalls** — a stop-the-world GC, a VM pause, a slow disk — for longer than the TTL. The lock **expires**, worker 2 legitimately acquires it, and then worker 1 **wakes up still believing it holds the lock** and writes. Now two workers write at once: the exact thing the lock was supposed to prevent. No bug in the lock service — the holder simply couldn't tell it had been paused past the deadline.
- The fix is a **fencing token**: the lock service hands out a **monotonically increasing number** with each grant, and the **protected resource** (the database, the file store) records the highest token it has seen and **rejects any write carrying a lower one**. Worker 2 holds token 34; worker 1 wakes holding the stale token 33; its write is rejected at the resource. ZooKeeper, etcd, and Chubby provide exactly such monotonic tokens.

:::warn
The lesson generalises past locks: **a lock alone cannot make a paused process safe — only the resource rejecting stale actions can.** Any "leader does X" design (a leader writing to storage, a singleton cron) needs fencing at the resource, or a long pause silently produces two actors. If the resource can't check a token, a distributed lock is not actually protecting you — it's giving false confidence.
:::

### Module 6 — checkpoint
- **Key concepts:** consensus (agree a value / ordered log) · etcd/ZooKeeper as a service (K8s state) · Raft terms, randomized timeouts, log matching, election restriction · quorum = majority, odd N, overlap · split-brain & the even-split halt · fencing tokens.
- **Task + questions:** why does a 5-node cluster tolerate 2 failures but a 4-node one only 1? Why is a TTL lock unsafe, and how does a fencing token fix it?
- **Next:** Module 7 — transactions and delivery.
