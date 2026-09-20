## Linearizability

- **Linearizable**: every operation appears to take effect atomically at one instant between its call and its return, and the order of those instants respects real time. Once any client has seen a write, every later read, from any client, sees it or something newer. Herlihy and Wing, 1990
- The instant is the **linearization point**. It can be anywhere inside the call's duration; the system chooses, but it must choose one

<svg viewBox="0 0 460 140" role="img" aria-label="Three clients on a timeline. Client A writes x=1 between t1 and t4. Client B reads x during A's write and gets 1, so the linearization point is before B's read. Client C reads after B returned and gets 0: not linearizable, because C started after B had already seen 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="60" y1="120" x2="440" y2="120" stroke="#1a1a1a"/>
  <text x="440" y="132" text-anchor="end" font-size="7">real time →</text>
  <text x="14" y="34">A</text>
  <rect x="60" y="24" width="200" height="14" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="34" text-anchor="middle">write x = 1</text>
  <line x1="150" y1="18" x2="150" y2="44" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="150" y="14" text-anchor="middle" font-size="7" fill="#1d4e89">linearization point</text>
  <text x="14" y="66">B</text>
  <rect x="170" y="56" width="80" height="14" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="210" y="66" text-anchor="middle">read x → 1</text>
  <text x="14" y="98">C</text>
  <rect x="290" y="88" width="80" height="14" rx="2" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="98" text-anchor="middle">read x → 0</text>
  <text x="380" y="98" fill="#b8541a">not allowed: B already saw 1</text>
  <text x="380" y="66" font-size="7">allowed: A's write may have</text>
  <text x="380" y="75" font-size="7">taken effect before B read</text>
</svg>

- B's read overlaps A's write, so either answer is fine. C's read starts after B has returned with 1, so C must see 1. Overlap gives freedom; "happened after" gives none
- The test is on the whole system, not on one node. A leader with async followers is not linearizable the moment a read is served by a follower, however fast replication is
- Booklet 02's line holds here: a `W + R > N` quorum is not linearizable either. Two concurrent writes can leave replicas disagreeing about which is newer, and a read during a partially applied write can return the new value while a later read returns the old one

### The failure

- "Read after write from a replica" as a proof of linearizability. It proves the replica had caught up at that moment. The model is about every read, including the one during the 30 ms of lag the test never hit
