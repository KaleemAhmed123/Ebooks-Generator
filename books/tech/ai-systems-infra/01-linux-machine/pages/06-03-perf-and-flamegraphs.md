## perf and flame graphs

- `strace` tells you which syscalls happen; **`perf`** tells you where **CPU time** goes. It works by **sampling**: dozens or hundreds of times per second it interrupts the CPU and records the current call stack. Stacks that show up in many samples were on-CPU often — that's your hot path. `perf record -F 99 -p <pid> -g -- sleep 30` captures 30 seconds at 99 Hz.
- Raw samples are unreadable; a **flame graph** turns them into one picture. Each box is a function; **width = share of CPU time** (how often it was sampled); stacked **upward = call depth** (caller below, callee above). You read it by scanning for the **widest boxes** — those are where the time is. Depth is just context.

<svg viewBox="0 0 360 112" role="img" aria-label="A flame graph: wide boxes are functions that consumed the most CPU time, stacked by call depth; the widest top box is the hot spot to optimise" xmlns="http://www.w3.org/2000/svg" font-family="Consolas,monospace" font-size="6" fill="#1a1a1a">
  <rect x="10" y="92" width="340" height="16" fill="#f3d9a0" stroke="#b5651d"/><text x="180" y="103" text-anchor="middle">main()  (100%)</text>
  <rect x="10" y="74" width="150" height="16" fill="#f0c674" stroke="#b5651d"/><text x="85" y="85" text-anchor="middle">handleRequest (44%)</text>
  <rect x="164" y="74" width="186" height="16" fill="#f0c674" stroke="#b5651d"/><text x="257" y="85" text-anchor="middle">serialize (55%)</text>
  <rect x="164" y="56" width="150" height="16" fill="#eab543" stroke="#b5651d"/><text x="239" y="67" text-anchor="middle">json_encode (44%)</text>
  <rect x="164" y="38" width="120" height="16" fill="#e5a838" stroke="#b5651d"/><text x="224" y="49" text-anchor="middle">utf8_validate (35%) ← hot</text>
  <text x="10" y="20" font-size="6.5" fill="#3a3f58" font-family="Georgia,serif">widest box on top = the function to fix first</text>
</svg>

- The payoff: instead of guessing which function is slow, you *see* it. Here `serialize → json_encode → utf8_validate` is most of the CPU — optimise there, ignore the narrow boxes however clever they look. This is the single most useful CPU-debugging skill, and the view returns in Booklet 8 (continuous profiling in production).
- `perf` samples far more cheaply than `strace` traces, so it's safe to run briefly on production. For off-CPU time (blocked on I/O or locks — the D-state from Module 2), you pair it with eBPF-based off-CPU profiling, next.
