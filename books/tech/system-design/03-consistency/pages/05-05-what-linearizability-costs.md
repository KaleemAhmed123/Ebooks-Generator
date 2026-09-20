## What linearizability costs

- One order in real time means one place that knows the order. Every linearizable read either reaches a **majority** of replicas or reaches a leader that has just confirmed it is still the leader (Module 7, page 7). Either way, a round-trip to other nodes before the answer

<svg viewBox="0 0 460 140" role="img" aria-label="A client sends a linearizable read to the leader. The leader sends a heartbeat to two followers and waits for one ack to confirm it still leads before answering. A serializable read skips the heartbeat and answers from local state." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="50" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="69" text-anchor="middle">client</text>
  <rect x="150" y="50" width="70" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="185" y="69" text-anchor="middle" font-weight="bold">leader</text>
  <rect x="330" y="14" width="70" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="365" y="31" text-anchor="middle">follower</text>
  <rect x="330" y="100" width="70" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="365" y="117" text-anchor="middle">follower</text>
  <path d="M70 58 H150" stroke="#1a1a1a" fill="none"/><path d="M150 58 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="110" y="52" text-anchor="middle" font-size="7">1 read x</text>
  <path d="M220 58 L330 30" stroke="#1d4e89" fill="none"/><path d="M330 30 l-5.5 -0.5 v5 z" fill="#1d4e89"/>
  <path d="M220 72 L330 110" stroke="#1d4e89" fill="none"/><path d="M330 110 l-5.5 -3.5 v5 z" fill="#1d4e89"/>
  <text x="270" y="38" font-size="7" fill="#1d4e89">2 "still leader?"</text>
  <path d="M330 38 L222 66" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/><path d="M222 66 l5.5 -3 v5 z" fill="#1d4e89"/>
  <text x="248" y="92" font-size="7" fill="#1d4e89">3 ack from a majority</text>
  <path d="M150 74 H70" stroke="#1a1a1a" fill="none"/><path d="M70 74 l5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="110" y="88" text-anchor="middle" font-size="7">4 x = 1</text>
  <text x="10" y="132" font-size="7" fill="#b8541a">stale-tolerant read: step 1 then 4, from any node; no round-trip</text>
</svg>

- The floor is the slowest majority round-trip. Across regions that is tens of milliseconds per read, and no cache can remove it without giving up the model
- Under a partition, the minority side must refuse: it cannot know whether the majority has moved on. Linearizability is not available under partition; that is CAP (Module 6)
- It is never a free flag. DynamoDB `ConsistentRead: true` is billed at twice the read units of an eventually consistent read and is refused on global secondary indexes; etcd's default read is linearizable and its `--consistency=s` (serializable) option exists precisely to skip the quorum step and return possibly stale data

### The failure

- Every read in the service marked linearizable "to be safe". The leader now serves all reads; the followers are idle copies; the p99 is the cross-region round-trip. Page 11 is the per-operation split that avoids this
