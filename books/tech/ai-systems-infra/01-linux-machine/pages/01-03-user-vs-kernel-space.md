## User space vs kernel space

- The CPU runs code at two privilege levels. Your program runs in **user space** — restricted: it cannot touch hardware or another process's memory. The kernel runs in **kernel space** — full privilege over everything. The CPU enforces this wall in hardware (protection rings), so a bug in your code cannot scribble on the kernel or a neighbour.
- The only legal door through the wall is a **syscall**. Your program puts a syscall number and its arguments in registers, runs one special instruction, and the CPU jumps to a fixed kernel entry point. The kernel does the work, returns a result, and the CPU drops back to user mode. Opening a file, sending a packet, allocating memory, creating a thread — all of it is syscalls.

<svg viewBox="0 0 360 128" role="img" aria-label="User space and kernel space are separated by a hardware wall; the only crossing is a syscall gate, with a request going in and a result returning" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="20" width="150" height="88" rx="4" fill="#eef0f5" stroke="#3a3f58"/>
  <text x="89" y="34" text-anchor="middle" font-size="7" fill="#3a3f58">user space (restricted)</text>
  <text x="89" y="52" text-anchor="middle" font-size="6.4" fill="#444">your service</text>
  <text x="89" y="66" text-anchor="middle" font-size="6.4" fill="#444">libc / runtime</text>
  <text x="89" y="86" text-anchor="middle" font-size="5.8" fill="#777">cannot touch hardware</text>
  <rect x="196" y="20" width="150" height="88" rx="4" fill="#f7f8fb" stroke="#3a3f58"/>
  <text x="271" y="34" text-anchor="middle" font-size="7" fill="#3a3f58">kernel space (privileged)</text>
  <text x="271" y="52" text-anchor="middle" font-size="6.4" fill="#444">scheduler · memory</text>
  <text x="271" y="66" text-anchor="middle" font-size="6.4" fill="#444">drivers · filesystems</text>
  <text x="271" y="86" text-anchor="middle" font-size="5.8" fill="#777">owns the hardware</text>
  <rect x="176" y="14" width="8" height="100" fill="#3a3f58"/>
  <rect x="172" y="54" width="16" height="22" rx="2" fill="#fff" stroke="#3a3f58"/>
  <text x="180" y="50" text-anchor="middle" font-size="5.6" fill="#3a3f58">syscall</text>
  <path d="M150 60 L206 60" stroke="#1a1a1a" marker-end="url(#a2)"/>
  <text x="166" y="58" font-size="5.6" fill="#1a1a1a">request</text>
  <path d="M206 70 L150 70" stroke="#999" marker-end="url(#a3)"/>
  <text x="166" y="80" font-size="5.6" fill="#777">result</text>
  <defs>
    <marker id="a2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker>
    <marker id="a3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker>
  </defs>
</svg>

- **Why you care: a syscall is not free.** Each one is a **mode switch** — hundreds of nanoseconds of pure overhead — plus whatever work it asks for. A service that does one tiny `write` per log line, or one `read` per byte, spends its life crossing the wall instead of doing work.
- That cost is the reason for three things you already half-know: **buffering** (collect many bytes, cross once — `write` a 4 KB block, not 4096 single bytes); **`epoll`** (one syscall watches thousands of sockets, not one check each — Module 4); and **`io_uring`** (submit many operations through a shared ring *without* a syscall each — the modern async interface, Linux 5.1+, though `epoll` is still the right default for most services today).

:::lab
On any Linux box or container, run `strace -c -f ls` and read the table: which syscall was called most, and where did the time go? Then `strace -c -f curl -s example.com -o /dev/null` and compare — the network syscalls appear (`socket`, `connect`, `sendto`, `recvfrom`, `epoll_*`). You've watched a program talk to the kernel, one crossing at a time. (`strace` in depth: Module 6.)
:::
