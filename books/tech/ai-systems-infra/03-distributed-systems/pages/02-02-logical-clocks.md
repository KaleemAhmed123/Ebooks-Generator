## Logical clocks

- Since physical time can't be trusted across machines, **Lamport clocks** drop physical time entirely and track **causality** — what provably happened before what. Each node keeps a single integer counter and follows three rules:
  - increment the counter before each local event;
  - attach the counter to every message you send;
  - on receiving a message, set your counter to `max(local, received) + 1`.

<svg viewBox="0 0 360 100" role="img" aria-label="Two nodes with Lamport counters: local events increment the counter, and a received message sets the counter to one more than the max of local and received, so causally earlier events get lower numbers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="20" y="18" font-size="6.5" fill="#1f487e">node A</text><line x1="20" y1="24" x2="340" y2="24" stroke="#bbb"/>
  <text x="20" y="74" font-size="6.5" fill="#1f487e">node B</text><line x1="20" y1="80" x2="340" y2="80" stroke="#bbb"/>
  <circle cx="60" cy="24" r="3" fill="#1f487e"/><text x="60" y="16" text-anchor="middle" font-size="6">1</text>
  <circle cx="110" cy="24" r="3" fill="#1f487e"/><text x="110" y="16" text-anchor="middle" font-size="6">2</text>
  <path d="M110 24 L210 80" stroke="#1a1a1a" marker-end="url(#g1)"/><text x="150" y="54" font-size="5.6" fill="#555">send (ts=2)</text>
  <circle cx="210" cy="80" r="3" fill="#1f487e"/><text x="210" y="92" text-anchor="middle" font-size="6">3 = max(0,2)+1</text>
  <circle cx="90" cy="80" r="3" fill="#1f487e"/><text x="90" y="92" text-anchor="middle" font-size="6">1</text>
  <circle cx="270" cy="80" r="3" fill="#1f487e"/><text x="270" y="92" text-anchor="middle" font-size="6">4</text>
  <defs><marker id="g1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The guarantee: if event *a* **happened-before** *b* (a is a's cause, directly or through a chain of messages), then `L(a) < L(b)`. Causally earlier always gets a smaller number, so you can build a **total order** of events (break ties by node id) that never contradicts causality — exactly what wall clocks couldn't promise.
- The limit: the converse is **not** true. `L(a) < L(b)` does **not** mean *a* caused *b* — they might be unrelated events that simply got those numbers. Lamport clocks give you a consistent ordering, but they **can't tell you whether two events were concurrent or causal.** When that distinction matters — detecting conflicting writes — you need more information per event, which is vector clocks.

:::note
Why an infra engineer cares: this is the machinery under version ordering, log sequencing, and "which update is newer" in systems that refuse to trust wall clocks. Kafka offsets, database log sequence numbers, and Raft's log indices are all Lamport-flavoured: a monotonic counter that encodes order without pretending to know the time.
:::
