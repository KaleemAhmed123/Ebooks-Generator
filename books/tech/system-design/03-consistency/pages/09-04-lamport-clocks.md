## Lamport timestamps

- A **Lamport timestamp** (Lamport, 1978) is a counter that orders events by causality, with no clock at all. Each node keeps a counter. Every local event increments it. Every message carries the sender's counter, and the receiver sets its own to `max(own, received) + 1`. If event A could have caused event B, then `L(A) < L(B)`, always

<svg viewBox="0 0 460 110" role="img" aria-label="Two nodes. Node A's events are numbered 1, 2, 3. At its event 3 it sends a message carrying 3 to node B. Node B, at counter 1, receives it and sets its counter to max(1,3)+1 = 4. Node B's next local event is 5. A separate event on node A numbered 4 is concurrent with B's 4: same number, no causal link." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="34">node A</text>
  <line x1="60" y1="30" x2="440" y2="30" stroke="#1a1a1a"/>
  <text x="10" y="86">node B</text>
  <line x1="60" y1="82" x2="440" y2="82" stroke="#1a1a1a"/>
  <g font-size="7.5" text-anchor="middle">
    <circle cx="90" cy="30" r="5" fill="#fcfcfc" stroke="#1a1a1a"/><text x="90" y="18">1</text>
    <circle cx="140" cy="30" r="5" fill="#fcfcfc" stroke="#1a1a1a"/><text x="140" y="18">2</text>
    <circle cx="190" cy="30" r="5" fill="#e2fcf3" stroke="#1d4e89"/><text x="190" y="18">3: send</text>
    <circle cx="330" cy="30" r="5" fill="#fcfcfc" stroke="#1a1a1a"/><text x="330" y="18">4</text>
    <circle cx="120" cy="82" r="5" fill="#fcfcfc" stroke="#1a1a1a"/><text x="120" y="98">1</text>
    <circle cx="260" cy="82" r="5" fill="#e2fcf3" stroke="#1d4e89"/><text x="260" y="98">receive: max(1, 3) + 1 = 4</text>
    <circle cx="390" cy="82" r="5" fill="#fcfcfc" stroke="#1a1a1a"/><text x="390" y="98">5</text>
  </g>
  <path d="M194 34 L256 78" stroke="#1d4e89" fill="none"/><path d="M256 78 l-1.5 -5.5 l-3.5 3 z" fill="#1d4e89"/>
  <text x="235" y="52" font-size="7" fill="#1d4e89">carries 3</text>
  <text x="300" y="60" font-size="7" fill="#b8541a">A's 4 and B's 4: concurrent; same number,</text>
  <text x="300" y="69" font-size="7" fill="#b8541a">tie broken by node id, not by "when"</text>
</svg>

- The order is total once ties are broken by node id, and it is consistent with causality. It is not consistent with real time: A's event 4 may have happened an hour after B's 5. Equal numbers on two nodes mean neither caused the other; nearby numbers say nothing about which came first on a wall clock
- The reverse does not hold either: `L(A) < L(B)` does not mean A caused B. To know that, you need version vectors (booklet 02), which cost a number per node instead of one
- Raft terms (Module 7, page 3) and epochs are Lamport clocks with one increment per election. Any monotonic "which is later" question that must survive a paused node is answered by one of these, never by `Date.now()`

### The failure

- Reading a Lamport order as a time order. Two writes stamped 4 and 5 are shown to the user as "5 happened after 4". They may be concurrent, and 4 may have been typed later. The counter orders what could have influenced what; a wall clock is still the only thing that says "at 14:02"
