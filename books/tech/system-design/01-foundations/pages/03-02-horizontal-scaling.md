## Add boxes behind a balancer

- **Horizontal scaling** means adding more machines of the same size and spreading the work across them
- Capacity grows with N. The failure of one node is survivable — the others keep going
- A load balancer sits in front and routes each request to one of the N nodes

<svg viewBox="0 0 460 90" role="img" aria-label="A load balancer routes requests to N identical nodes, all of which talk to a single database; the database is the part that did not scale" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="8" y="48">requests</text>
  <path d="M60 44 L88 44" stroke="#1a1a1a"/><path d="M88 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="92" y="30" width="56" height="28" rx="3" fill="none" stroke="#1a1a1a"/><text x="120" y="48" text-anchor="middle" font-size="9">balancer</text>
  <path d="M148 38 L196 16" stroke="#1a1a1a" fill="none"/><path d="M196 16 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M148 44 L196 44" stroke="#1a1a1a" fill="none"/><path d="M196 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M148 50 L196 72" stroke="#1a1a1a" fill="none"/><path d="M196 72 l-7 -5 v6 z" fill="#1a1a1a"/>
  <rect x="200" y="4" width="68" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="234" y="19" text-anchor="middle">node 1</text>
  <rect x="200" y="34" width="68" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="234" y="49" text-anchor="middle">node 2</text>
  <rect x="200" y="62" width="68" height="22" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="234" y="77" text-anchor="middle">node N</text>
  <path d="M268 15 L326 40" stroke="#1a1a1a" fill="none"/><path d="M326 40 l-7 -5 v6 z" fill="#1a1a1a"/>
  <path d="M268 45 L326 45" stroke="#1a1a1a" fill="none"/><path d="M326 45 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M268 73 L326 50" stroke="#1a1a1a" fill="none"/><path d="M326 50 l-7 -1 v6 z" fill="#1a1a1a"/>
  <rect x="330" y="32" width="80" height="28" rx="3" fill="none" stroke="#6b6b6b"/><text x="370" y="50" text-anchor="middle" fill="#6b6b6b">one DB</text>
</svg>

- The diagram is the point. The compute tier scaled out. The database did not. The question that horizontal scaling raises is **where does the state live**

### What it buys and what it asks

- **Buys:** capacity that grows by adding machines; survival when one dies; smaller blast radius per node
- **Asks:** the nodes must agree on what "the data" is. That is the subject of booklets 02 and 03 — replication and consistency
- If the process on each node is stateless, adding nodes is trivial. If each node holds state, adding nodes is a distributed-systems problem. The next page draws the line

### The failure

- Scaling out the web tier to twenty **pods** (Kubernetes' unit of one running copy) and watching throughput plateau. The bottleneck was never CPU — it was the single database behind them, now with twenty connection pools instead of one
