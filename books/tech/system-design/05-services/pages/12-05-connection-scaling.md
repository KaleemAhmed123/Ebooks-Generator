## Scaling stateful connections

- Scaling stateless HTTP requests is easy: just add more servers. Scaling WebSockets is very hard, because every connection is stateful. It is glued to a specific server
- This is known as the C10M problem (Concurrent 10 Million). If you want to hold 10 million WebSockets open, the bottleneck is usually RAM, not CPU. Every open TCP socket consumes memory in the OS Kernel and in the application runtime

| Language / Runtime | Concurrency Model | RAM per 10k Sockets |
|---|---|---|
| **Java (Thread-per-request)** | 1 OS Thread per socket. Very heavy. | ~10 GB |
| **Node.js** | Single event loop. 1 object per socket. | ~300 MB |
| **Go** | 1 Goroutine per socket. Very lightweight. | ~80 MB |
| **Erlang / Elixir** | 1 Actor per socket. Built for telecom. | ~40 MB |

### The failure

- The failure is deploying WebSockets in a standard cloud environment without tuning the OS Kernel. By default, Linux only allows about 65,000 ephemeral ports, and heavily restricts file descriptors (sockets are files)
- If you write highly optimized Go code capable of holding 1 million connections, but you deploy it on a default Linux server, it will crash exactly at 65,535 connections with a `Too many open files` error. You must explicitly configure `ulimit` and `sysctl` to allow millions of sockets
