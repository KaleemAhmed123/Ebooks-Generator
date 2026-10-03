## Blocking vs non-blocking I/O

- A **blocking** `read` on a socket with no data yet parks the calling thread until data arrives. Simple, and fine when you have a handful of connections — one thread each, each mostly asleep. It falls apart at scale: 10,000 connections would need 10,000 threads, and you already know the cost (context-switch tax, Module 2).
- A **non-blocking** fd behaves differently: if there's no data, `read` returns immediately with `EAGAIN` ("try again") instead of sleeping. Now one thread can check many fds without getting stuck on any one — but it has a new problem: **which fds are ready right now?** Spinning in a loop asking every fd burns a whole CPU for nothing.
- That is the **readiness problem**: with many non-blocking fds you need the kernel to *tell you* which ones are ready, so you wait once and wake only for work. The answer is a **readiness interface** — `select`, `poll`, and the one that scales, **`epoll`** (next page).

:::note
This is the fork in the road behind every server architecture. **Thread-per-connection + blocking I/O** (classic sync servers): easy to write, limited by thread count. **One (or few) threads + non-blocking I/O + a readiness interface** (Node, nginx, Redis, Envoy): a handful of threads serve enormous concurrency, because threads wait on *events*, not on individual sockets. Neither is "better" — they trade simplicity for scale.
:::
