## Replicated state machine

- The practical shape of consensus is not "agree on one value" but "agree on a **log**". Every node applies the log's entries in order to the same deterministic state machine; same entries, same order, same state on every node. Agreeing on entry n once is the consensus problem; the log is that problem solved once per entry

<svg viewBox="0 0 460 120" role="img" aria-label="A consensus module receives client commands and appends them to a replicated log on three servers. Each server applies the log in order to its state machine, so all three state machines hold the same state. Entry 4 is on the leader only and is not yet committed, so no state machine has applied it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="44" width="56" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="38" y="63" text-anchor="middle">client</text>
  <path d="M66 59 H100" stroke="#1a1a1a" fill="none"/><path d="M100 59 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="83" y="53" text-anchor="middle" font-size="7">set x=3</text>
  <g font-size="7.5">
    <text x="104" y="24">leader</text>
    <rect x="140" y="14" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="151" y="24" text-anchor="middle">x=1</text>
    <rect x="164" y="14" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="175" y="24" text-anchor="middle">y=7</text>
    <rect x="188" y="14" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="199" y="24" text-anchor="middle">x=2</text>
    <rect x="212" y="14" width="22" height="14" fill="#fff" stroke="#b8541a" stroke-dasharray="2 2"/><text x="223" y="24" text-anchor="middle">x=3</text>
    <text x="104" y="59">follower</text>
    <rect x="140" y="49" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="151" y="59" text-anchor="middle">x=1</text>
    <rect x="164" y="49" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="175" y="59" text-anchor="middle">y=7</text>
    <rect x="188" y="49" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="199" y="59" text-anchor="middle">x=2</text>
    <text x="104" y="94">follower</text>
    <rect x="140" y="84" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="151" y="94" text-anchor="middle">x=1</text>
    <rect x="164" y="84" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="175" y="94" text-anchor="middle">y=7</text>
    <rect x="188" y="84" width="22" height="14" fill="#e2fcf3" stroke="#1d4e89"/><text x="199" y="94" text-anchor="middle">x=2</text>
  </g>
  <line x1="211" y1="8" x2="211" y2="104" stroke="#1d4e89" stroke-dasharray="3 2"/>
  <text x="211" y="114" text-anchor="middle" font-size="7" fill="#1d4e89">commit index</text>
  <g font-size="7.5">
    <path d="M236 21 H300" stroke="#1a1a1a" fill="none"/><path d="M300 21 l-5 -2.5 v5 z" fill="#1a1a1a"/>
    <path d="M212 56 H300" stroke="#1a1a1a" fill="none"/><path d="M300 56 l-5 -2.5 v5 z" fill="#1a1a1a"/>
    <path d="M212 91 H300" stroke="#1a1a1a" fill="none"/><path d="M300 91 l-5 -2.5 v5 z" fill="#1a1a1a"/>
    <text x="256" y="17" text-anchor="middle" font-size="6.5">apply in order</text>
    <rect x="304" y="10" width="100" height="22" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="354" y="24" text-anchor="middle">state: x=2, y=7</text>
    <rect x="304" y="45" width="100" height="22" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="354" y="59" text-anchor="middle">state: x=2, y=7</text>
    <rect x="304" y="80" width="100" height="22" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="354" y="94" text-anchor="middle">state: x=2, y=7</text>
  </g>
  <text x="412" y="24" font-size="7" fill="#b8541a">x=3 not yet</text>
  <text x="412" y="33" font-size="7" fill="#b8541a">committed</text>
</svg>

- Two indexes matter. An entry is **committed** once the protocol guarantees it will never be removed from the log (in Raft: stored on a majority, page 5). An entry is **applied** once the state machine has executed it. Applied never runs ahead of committed
- The state machine must be deterministic: no wall-clock reads, no random numbers, no "current time" inside the command. Put the value in the entry, not the instruction to compute it
- Every consensus system in the stack is this shape. etcd's key space, ZooKeeper's tree, a Kafka controller's metadata: a log, and a state machine that replays it

### The failure

- Applying an entry the moment the leader appends it. A leader that crashes before the entry reaches a majority is replaced, and the new leader's log may not have that entry. The node that applied it now holds state that the cluster never agreed on and will never agree on
