# The CPU and the Scheduler

## How the scheduler shares the CPU

- A core runs **one thread at a time**. You have far more runnable threads than cores, so the kernel **time-slices**: run a thread briefly, pause it, run another, fast enough to look simultaneous. The **scheduler** picks who runs next and for how long.
- Each core has a **run queue** of runnable threads. The scheduler picks one; it runs until it blocks (waits for I/O), sleeps, or is **preempted** (slice ends, or a higher-priority thread wakes); then the scheduler picks again. Swapping one thread out for another is a **context switch** — the next page's cost.

<svg viewBox="0 0 360 118" role="img" aria-label="Runnable threads wait in a per-core run queue; the scheduler picks one at a time to run on the CPU, interleaving them over a shared timeline" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="12" y="14" font-size="6.3" fill="#3a3f58">run queue (per core)</text>
  <rect x="12" y="20" width="62" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="43" y="31" text-anchor="middle" font-size="6">thread A</text>
  <rect x="12" y="39" width="62" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="43" y="50" text-anchor="middle" font-size="6">thread B</text>
  <rect x="12" y="58" width="62" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="43" y="69" text-anchor="middle" font-size="6">thread C</text>
  <path d="M76 46 L108 46" stroke="#1a1a1a" marker-end="url(#s1)"/>
  <text x="92" y="42" text-anchor="middle" font-size="5.6" fill="#555">picks</text>
  <text x="150" y="14" font-size="6.3" fill="#3a3f58">CPU core — one thread at a time</text>
  <rect x="112" y="40" width="40" height="16" fill="#dfe6f2" stroke="#3a3f58"/><text x="132" y="51" text-anchor="middle" font-size="6">A</text>
  <rect x="152" y="40" width="54" height="16" fill="#eef0f5" stroke="#3a3f58"/><text x="179" y="51" text-anchor="middle" font-size="6">B</text>
  <rect x="206" y="40" width="34" height="16" fill="#dfe6f2" stroke="#3a3f58"/><text x="223" y="51" text-anchor="middle" font-size="6">A</text>
  <rect x="240" y="40" width="48" height="16" fill="#e7efe9" stroke="#3a3f58"/><text x="264" y="51" text-anchor="middle" font-size="6">C</text>
  <rect x="288" y="40" width="54" height="16" fill="#eef0f5" stroke="#3a3f58"/><text x="315" y="51" text-anchor="middle" font-size="6">B</text>
  <path d="M112 64 L342 64" stroke="#999" marker-end="url(#s1)"/>
  <text x="112" y="76" font-size="5.6" fill="#777">time → (each block = one slice; a switch between blocks costs)</text>
  <defs><marker id="s1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Since **Linux 6.6 (Oct 2023)** the default scheduler is **EEVDF** — Earliest Eligible Virtual Deadline First — replacing the long-serving CFS. Model it as: each thread earns a **fair share** of CPU set by its weight (`nice`), and EEVDF also tracks a **virtual deadline**, so a latency-sensitive thread that wakes rarely still runs promptly instead of waiting its turn. Fairness and responsiveness in one rule, with fewer ad-hoc knobs than CFS had.
- **`nice`** (−20…19) sets the weight: lower nice = bigger share. It is a *share*, not a reservation — a `nice 19` batch job still gets the CPU when nothing else wants it. Real-time classes (`SCHED_FIFO`/`RR`) sit above normal and can starve it; ordinary services should never need them.

:::note
This is why "CPU is 60% busy but p99 is bad" happens: the scheduler is fair *over time*, not instant. A latency-sensitive thread can still wait behind others for a slice. Fewer runnable threads, priorities, or pinning help — measured, never guessed.
:::
