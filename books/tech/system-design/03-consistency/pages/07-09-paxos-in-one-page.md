## Paxos in one page

- Paxos (Lamport) decides one value with three roles: **proposers** suggest values, **acceptors** vote, **learners** find out. Each proposal has a unique, increasing **ballot number**; a majority of acceptors decides

<svg viewBox="0 0 460 120" role="img" aria-label="Two phases. Phase 1: the proposer sends prepare with ballot n to the acceptors; each acceptor promises to ignore ballots below n and reports the highest-ballot value it has already accepted, if any. Phase 2: on a majority of promises, the proposer sends accept with ballot n and either the reported value or its own; acceptors accept unless they have promised a higher ballot. A value on a majority of acceptors is chosen." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="40" width="70" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="63" text-anchor="middle" font-weight="bold">proposer</text>
  <rect x="300" y="10" width="70" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="335" y="27" text-anchor="middle">acceptor</text>
  <rect x="300" y="47" width="70" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="335" y="64" text-anchor="middle">acceptor</text>
  <rect x="300" y="84" width="70" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="335" y="101" text-anchor="middle">acceptor</text>
  <path d="M80 48 L300 20" stroke="#1a1a1a" fill="none"/><path d="M300 20 l-5.5 0 v5 z" fill="#1a1a1a"/>
  <path d="M80 52 L300 56" stroke="#1a1a1a" fill="none"/><path d="M300 56 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <path d="M80 56 L300 92" stroke="#1a1a1a" fill="none"/><path d="M300 92 l-5.5 -3 v5 z" fill="#1a1a1a"/>
  <text x="120" y="38" font-size="7">1 prepare(n)</text>
  <text x="120" y="47" font-size="6.5">promise: ignore ballots &lt; n;</text>
  <text x="120" y="55" font-size="6.5">here is what I already accepted</text>
  <path d="M300 30 L82 66" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/><path d="M82 66 l5.5 -3 v5 z" fill="#1d4e89"/>
  <path d="M300 66 L82 70" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/><path d="M82 70 l5 -2.5 v5 z" fill="#1d4e89"/>
  <text x="120" y="88" font-size="7">2 accept(n, v)</text>
  <text x="120" y="97" font-size="6.5">v = highest-ballot value any</text>
  <text x="120" y="105" font-size="6.5">promise reported, else my own</text>
  <path d="M80 74 L300 104" stroke="#b8541a" fill="none"/><path d="M300 104 l-5.5 -3 v5 z" fill="#b8541a"/>
  <path d="M80 70 L300 68" stroke="#b8541a" fill="none"/><path d="M300 68 l-5 -2.5 v5 z" fill="#b8541a"/>
  <text x="380" y="27" font-size="7">accept unless a higher</text>
  <text x="380" y="36" font-size="7">ballot was promised</text>
  <text x="380" y="64" font-size="7">chosen: one value on</text>
  <text x="380" y="73" font-size="7">a majority of acceptors</text>
</svg>

- The safety trick is in phase 2: a proposer that learns any acceptor already accepted a value must propose **that** value, not its own. So once a value is on a majority, every later ballot carries it forward; the decision cannot change, only be re-confirmed
- Single-decree Paxos costs two round-trips per value and can livelock when proposers keep outbidding each other. **Multi-Paxos** elects a stable leader that runs phase 1 once for a whole sequence of slots and then only runs phase 2 per value: one round-trip, a leader, a log. At that point it is Raft's shape; the Raft paper describes its result as equivalent to Multi-Paxos, arranged to be understood
- What it is used for: Spanner runs Paxos per data split; Chubby, the lock service, is a Paxos cell. Raft and Zab own most new systems because the leader is built in from the start

### The failure

- Reading Paxos as "Raft without a leader" and building the single-decree version for a log. Every entry pays two round-trips, competing proposers stall each other, and the missing leader gets reinvented badly. If you need a log, start from Raft; Paxos is the proof that it is possible
