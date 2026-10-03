## epoll and the event loop

- `select` and `poll` answer "which fds are ready?" by taking the *whole* list every call and scanning it — **O(n)** in the number of fds, every time. At 100,000 connections that scan dominates. **`epoll`** fixes the complexity: you register interest in each fd **once** (`epoll_ctl`), then call `epoll_wait`, and the kernel returns only the fds that are **actually ready** — work proportional to the number of *ready* fds, not the total.
- The loop underneath Node, nginx, Redis, and Envoy is exactly this:

<svg viewBox="0 0 360 120" role="img" aria-label="The event loop registers fds once with epoll_ctl, calls epoll_wait to get only ready fds, handles each without blocking, and loops" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="18" y="20" width="92" height="26" rx="3" fill="#eef0f5" stroke="#3a3f58"/><text x="64" y="34" text-anchor="middle" font-size="6.3">epoll_ctl: add fds</text><text x="64" y="43" text-anchor="middle" font-size="5.4" fill="#777">(register once)</text>
  <rect x="134" y="20" width="92" height="26" rx="3" fill="#dfe6f2" stroke="#3a3f58"/><text x="180" y="34" text-anchor="middle" font-size="6.3">epoll_wait</text><text x="180" y="43" text-anchor="middle" font-size="5.4" fill="#777">sleep until ready</text>
  <rect x="250" y="20" width="96" height="26" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="298" y="34" text-anchor="middle" font-size="6.3">handle ready fds</text><text x="298" y="43" text-anchor="middle" font-size="5.4" fill="#777">read/write, no block</text>
  <path d="M110 33 L134 33" stroke="#1a1a1a" marker-end="url(#e1)"/>
  <path d="M226 33 L250 33" stroke="#1a1a1a" marker-end="url(#e1)"/>
  <path d="M298 46 L298 70 L180 70 L180 48" stroke="#999" fill="none" marker-end="url(#e1)"/>
  <text x="212" y="80" text-anchor="middle" font-size="5.6" fill="#777">loop — one thread, thousands of connections, almost no context switches</text>
  <defs><marker id="e1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Two readiness modes: **level-triggered** (keep notifying while data remains — forgiving, the common default) and **edge-triggered** (notify once on the transition — faster, but you must drain the fd fully or you hang waiting for an edge that won't repeat). Edge-triggered bugs are a classic "stuck connection" cause.
- The newer **`io_uring`** (Linux 5.1+) goes further: instead of asking *readiness* and then doing the I/O, you submit the actual operations to a shared ring and collect completions — fewer syscalls still. It's the modern direction for I/O-heavy services, but `epoll` remains the right, widely-supported default for most network servers in 2026.

### Module 4 — checkpoint
- **Key concepts:** fd as universal handle · `ulimit -n` & `EMFILE` leaks · blocking vs non-blocking · the readiness problem · `select`/`poll` O(n) vs **`epoll`** O(ready) · level vs edge trigger · `io_uring`.
- **Task:** `ls /proc/<pid>/fd` on your service and count fds; hold the number under load to prove you aren't leaking.
- **Questions:** Why does one Node thread serve thousands of sockets? What does `EAGAIN` mean and who sees it? When would edge-triggered epoll hang a connection?
- **Next:** Module 5 — namespaces and cgroups: what a container actually is.
