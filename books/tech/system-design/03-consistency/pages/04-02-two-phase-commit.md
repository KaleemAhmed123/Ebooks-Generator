## Two-phase commit (2PC)

- **Two-phase commit** makes several databases commit or abort together by adding a **coordinator** and splitting commit in two
- **Phase 1, prepare**: the coordinator asks each participant to prepare. A participant writes the transaction's changes and its "yes" durably to its own log, keeps its locks, and answers. From then on it may not abort on its own
- **Phase 2, commit**: when every vote is yes, the coordinator writes the decision to its own log; that write is the commit point. It then tells every participant to commit, and they release their locks. One "no", or one timeout, and the decision is abort

<svg viewBox="0 0 460 140" role="img" aria-label="Two-Phase Commit. Phase 1: Prepare (databases acquire locks and promise to commit). Phase 2: Commit (coordinator logs the decision and tells them to execute)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="200" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="35" text-anchor="middle" font-weight="bold">Phase 1: Prepare</text>
  
  <circle cx="120" cy="60" r="15" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="63" text-anchor="middle" font-size="7">Coord</text>
  
  <rect x="40" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="104" text-anchor="middle" font-size="7">DB A: "Yes"</text>
  
  <rect x="140" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="170" y="104" text-anchor="middle" font-size="7">DB B: "Yes"</text>
  
  <path d="M110 70 L70 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M130 70 L170 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  
  <rect x="240" y="20" width="200" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="340" y="35" text-anchor="middle" font-weight="bold">Phase 2: Commit</text>
  
  <circle cx="340" cy="60" r="15" fill="#fff" stroke="#1d4e89"/>
  <text x="340" y="63" text-anchor="middle" font-size="7">Coord</text>
  
  <rect x="260" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="290" y="104" text-anchor="middle" font-size="7">DB A commits</text>
  
  <rect x="360" y="90" width="60" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="390" y="104" text-anchor="middle" font-size="7">DB B commits</text>
  
  <path d="M330 70 L290 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M290 90 l6 -1 v5 z" fill="#1d4e89" transform="rotate(30 290 90)"/>
  <path d="M350 70 L390 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M390 90 l-6 -1 v5 z" fill="#1d4e89" transform="rotate(-30 390 90)"/>
</svg>

- The vote is the expensive part. A prepared participant has surrendered the right to decide: it holds its row locks until the coordinator tells it what happened, however long that takes

### The failure

- Reading 2PC as two network calls. Between prepare and commit every participant holds pessimistic locks across a network round-trip, and a slow coordinator or a slow peer stretches that window for everybody. Latency in one service becomes lock contention in all of them
