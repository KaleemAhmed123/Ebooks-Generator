## Partition mode: detect, degrade, recover

- Brewer's practical version of the theorem is a three-step loop. **Detect** the partition (a timeout, a missed heartbeat; Module 9 on what that proves). **Enter partition mode**: decide per operation what continues and what refuses, and log every write that went through. **Recover** when the network returns: merge the logs, fix the invariants that were broken, compensate where they cannot be fixed

<svg viewBox="0 0 460 100" role="img" aria-label="Three boxes in a loop: detect the partition, enter partition mode with per-operation rules, recover by merging logs and compensating. An arrow returns from recover to normal operation." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="20" width="110" height="56" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="65" y="38" text-anchor="middle" font-weight="bold">detect</text>
  <text x="65" y="52" text-anchor="middle" font-size="7">missed heartbeats,</text>
  <text x="65" y="62" text-anchor="middle" font-size="7">quorum lost</text>
  <rect x="175" y="20" width="110" height="56" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="38" text-anchor="middle" font-weight="bold">partition mode</text>
  <text x="230" y="52" text-anchor="middle" font-size="7">refuse: reserve, pay, lock</text>
  <text x="230" y="62" text-anchor="middle" font-size="7">allow + log: cart, likes, reads</text>
  <rect x="340" y="20" width="110" height="56" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="395" y="38" text-anchor="middle" font-weight="bold">recover</text>
  <text x="395" y="52" text-anchor="middle" font-size="7">merge logs, re-check</text>
  <text x="395" y="62" text-anchor="middle" font-size="7">invariants, compensate</text>
  <path d="M120 48 H175" stroke="#1a1a1a" fill="none"/><path d="M175 48 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <path d="M285 48 H340" stroke="#1a1a1a" fill="none"/><path d="M340 48 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <path d="M395 76 V90 H65 V76" stroke="#1d4e89" fill="none"/><path d="M65 76 l-2.5 5 h5 z" fill="#1d4e89"/>
  <text x="230" y="96" text-anchor="middle" font-size="7" fill="#1d4e89">normal operation</text>
</svg>

- The partition-mode table is a design artefact. For each operation: continue on both sides, continue on one side (the majority; consensus stores do this for you, Module 7), or refuse. Anything that continues on both sides must be mergeable (booklet 02's CRDTs) or must be compensated later (Module 4's sagas)
- Recovery is the step nobody designs. Two carts merge by union. Two reservations of the last seat do not merge; one customer gets an apology and a voucher, and that email is part of the system

### The failure

- No partition mode at all. The nodes lose each other, every side keeps serving as if it were alone, and the divergence is found weeks later by a reconciliation report. The theorem was never violated; the system simply chose A everywhere, silently, including for the operations that needed C
