## strace — watch the syscalls

- When a process misbehaves and the logs don't say why, **`strace`** shows the one thing it can't hide: the **syscalls** it makes to the kernel (Module 1's wall, in action). Every file opened, byte sent, lock waited on is a syscall, and `strace` prints them with arguments, return values, and errors as they happen.
- The three invocations worth memorising:
  - **`strace -f -p <pid>`** — attach to a running process (and its threads/children with `-f`) and watch live. The fastest way to see *what a stuck process is waiting on* — often a single `futex` (lock) or `read` that never returns.
  - **`strace -c <cmd>`** — run a command and print a **summary table**: count and time per syscall. A surprising count (a million `stat`s, a `read` per byte) is often the latency, laid bare.
  - **`strace -e trace=openat,connect <cmd>`** — filter to the syscalls you care about, e.g. "which files/hosts did it try to reach?"
- Reading failures is where it shines: a `connect(...) = -1 ECONNREFUSED` or `openat(...) = -1 ENOENT` names the exact missing dependency or wrong path, with no guessing.

:::warn
`strace` works by `ptrace`, which **stops the process on every syscall** — overhead can be 10–100×. It's a debugging scalpel, not a production monitor: never `strace -f` a hot, latency-sensitive service under real load, and attach to one process, briefly. For always-on, low-overhead tracing you want eBPF (two pages on). A missing syscall in the output can also mean the process is blocked *in* one — a lone `futex` or `epoll_wait` with no return is the signature of "waiting on something".
:::
