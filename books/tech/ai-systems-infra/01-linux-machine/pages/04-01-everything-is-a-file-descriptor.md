# Files, Descriptors, and the Event Loop

## Everything is a file descriptor

- Linux presents almost every resource a process talks to — an open file, a TCP socket, a pipe, a timer, even an epoll instance — as a **file descriptor (fd)**: a small non-negative integer that indexes into the process's fd table. You `read`/`write`/`close` all of them with the same syscalls. That uniformity is why the same event loop can wait on a socket and a file alike.
- Each fd points at a kernel object with its own state (file offset, socket buffers). Fds 0, 1, 2 are stdin/stdout/stderr by convention; everything you `open` or `accept` gets the next free integer.
- There is a **limit** on open fds, per process (`ulimit -n`, soft and hard) and system-wide. A busy server holds one fd per live connection, so the limit is a real ceiling on concurrency.

:::warn
`Too many open files` (`EMFILE`) is almost always an **fd leak**: sockets or files opened and never `close`d, so the count climbs until it hits `ulimit -n` and every new `accept`/`open` fails — the service stops taking connections while looking healthy on CPU and memory. Find it with `ls /proc/<pid>/fd | wc -l` trending up, or `lsof -p <pid>`. Fix the leak; raising the limit only delays the wall. Connection pools (Booklet 2) exist partly to bound this.
:::

- **In containers**, the limit is inherited from the runtime and often lower than you expect; a pod that works in load tests can hit `EMFILE` in production purely from a smaller `ulimit -n`. It's a config value, not a law — but you must set it deliberately.
