## Threads, processes, and the context-switch tax

- Switching a core from one thread to another is not free. A **context switch** saves one thread's registers and restores another's; if they're in different processes it also swaps the address space, which flushes TLB entries and leaves the CPU caches cold for the newcomer. The direct cost is ~1–few µs; the *indirect* cost — cache misses afterwards — is often larger.
- So **more threads is not more speed.** Past the core count, extra runnable threads mostly add switching and cache thrash. Tens of thousands of context switches per second (`vmstat`, the `cs` column) under modest load usually means over-threading or lock contention.

<svg viewBox="0 0 360 96" role="img" aria-label="A context switch saves thread A's registers and restores thread B's, then B runs with cold caches, costing microseconds plus cache-miss recovery" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="150" y="12" width="60" height="20" rx="3" fill="#dfe6f2" stroke="#3a3f58"/><text x="180" y="25" text-anchor="middle" font-size="7">one core</text>
  <rect x="18" y="40" width="86" height="20" rx="3" fill="#eef0f5" stroke="#3a3f58"/><text x="61" y="53" text-anchor="middle" font-size="6.3">thread A running</text>
  <rect x="256" y="40" width="86" height="20" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="299" y="53" text-anchor="middle" font-size="6.3">thread B running</text>
  <path d="M104 50 L150 30" stroke="#1a1a1a" marker-end="url(#c1)"/><text x="106" y="44" font-size="5.4" fill="#555">save A regs</text>
  <path d="M210 30 L256 50" stroke="#1a1a1a" marker-end="url(#c1)"/><text x="214" y="44" font-size="5.4" fill="#555">restore B regs</text>
  <text x="180" y="78" text-anchor="middle" font-size="6" fill="#c0392b">cost = ~1–few µs + cold TLB/cache after the switch</text>
  <defs><marker id="c1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- This is why runtime models matter. **Node** uses one thread + an event loop (`epoll`, Module 4): thousands of connections, almost no switching — but CPU-bound work blocks the loop, so offload it to workers. **Thread-per-request** (classic sync servers) is simpler but switches hard at high concurrency, which is why bounded thread pools exist.

### Module 2 — checkpoint
- **Key concepts:** run queue · time slice · preemption · EEVDF (fair share + virtual deadline, since 6.6) · load = R + D · the context-switch tax.
- **Task:** run `vmstat 1` on a box under load; watch `r`, `b`, and `cs`, and tie a latency blip to blocked threads or a switch spike.
- **Questions:** Why can load be 20 while CPU is 30%? What does EEVDF's virtual deadline buy over plain fair-share? When does adding threads make a service *slower*?
- **Next:** Module 3 — virtual memory, and why a pod gets OOM-killed.
