## Load average is not utilisation

- The most misread number on a box. **Load average** is the average count of threads that are **runnable or in uninterruptible sleep** — states **R** and **D** — over 1, 5, and 15 minutes. It is *not* a CPU percentage.
- So load can be high while the CPU is nearly idle. Load 20 on an 8-core box at 30% CPU usually means threads are stuck in **D**: blocked on disk, a slow mount (NFS), or a kernel lock — waiting, not computing.

<svg viewBox="0 0 360 120" role="img" aria-label="Thread state machine: running/runnable R and uninterruptible sleep D are counted in load average; interruptible sleep S and zombie Z are not" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="140" y="12" width="80" height="24" rx="4" fill="#dfe6f2" stroke="#3a3f58"/><text x="180" y="27" text-anchor="middle" font-size="7">R  run / ready</text>
  <rect x="18" y="66" width="86" height="24" rx="4" fill="#f4f4f4" stroke="#888"/><text x="61" y="78" text-anchor="middle" font-size="6.6">S  sleep</text><text x="61" y="87" text-anchor="middle" font-size="5.5" fill="#777">waiting on event</text>
  <rect x="256" y="66" width="86" height="24" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="299" y="78" text-anchor="middle" font-size="6.6">D  uninterruptible</text><text x="299" y="87" text-anchor="middle" font-size="5.5" fill="#777">waiting on I/O</text>
  <rect x="140" y="92" width="80" height="20" rx="4" fill="#fdf2f2" stroke="#c0392b"/><text x="180" y="105" text-anchor="middle" font-size="6.6">Z  zombie (exited)</text>
  <path d="M150 36 L80 64" stroke="#1a1a1a" marker-end="url(#l1)"/><text x="96" y="52" font-size="5.4" fill="#555">wait event</text>
  <path d="M96 64 L160 38" stroke="#1a1a1a" marker-end="url(#l1)"/><text x="120" y="60" font-size="5.4" fill="#555">wake</text>
  <path d="M210 36 L280 64" stroke="#1a1a1a" marker-end="url(#l1)"/><text x="250" y="52" font-size="5.4" fill="#555">block on I/O</text>
  <path d="M264 64 L204 40" stroke="#1a1a1a" marker-end="url(#l1)"/><text x="232" y="60" font-size="5.4" fill="#555">I/O done</text>
  <path d="M180 36 L180 90" stroke="#1a1a1a" marker-end="url(#l1)"/><text x="186" y="66" font-size="5.4" fill="#555">exit</text>
  <text x="12" y="104" font-size="6" fill="#3a3f58">load counts R + D</text><rect x="10" y="98" width="8" height="8" fill="#dfe6f2" stroke="#3a3f58"/>
  <defs><marker id="l1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Read load against **core count**: load ≈ cores = fully used; load ≫ cores = a queue is building (CPU-bound) *or* threads are stuck in D (I/O-bound). Load alone can't tell the two apart — you must check *why*.
- Tools: `uptime`/`top` show the three averages; `vmstat 1` splits running (`r`) from blocked (`b`); `top` shows each thread's **state** so you see R vs D directly.

:::incident
A box shows load 40, 8 cores, CPU 15%, latency terrible. The CPU graph says "not overloaded" — but `vmstat 1` shows `b` (blocked) climbing and `top` shows many threads in **D**. Where do you look next, and what does D-state almost always mean? (It is I/O or a lock: check `iostat`/disk and any slow mount — the CPU graph was the red herring.)
:::
