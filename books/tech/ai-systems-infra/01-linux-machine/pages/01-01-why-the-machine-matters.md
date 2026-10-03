# What Your Program Stands On

## Why the machine matters

- You already ship services. This booklet changes **what you can see when they break**. A pod killed, a request hung, latency tripled, a box "out of memory" with gigabytes free — each resolves into something the OS was doing under your code. See that layer and you diagnose instead of guess.
- Your program never touches hardware. It asks the **kernel** — the privileged core that owns CPU, memory, and devices — and the kernel decides. That one indirection explains most of what follows.

<svg viewBox="0 0 360 150" role="img" aria-label="A program calls the kernel through syscalls; the kernel owns the scheduler, virtual memory, file descriptors and the network stack, which drive the hardware" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="40" y="6" width="280" height="20" rx="3" fill="#eef0f5" stroke="#3a3f58"/>
  <text x="180" y="19" text-anchor="middle">Your program — Node · Python · the service</text>
  <path d="M180 26 L180 46" stroke="#1a1a1a" marker-end="url(#a1)"/>
  <text x="194" y="39" font-size="6.2" fill="#3a3f58">syscalls: read, write, mmap, clone, epoll_wait…</text>
  <rect x="20" y="50" width="320" height="62" rx="4" fill="#f7f8fb" stroke="#3a3f58"/>
  <text x="28" y="61" font-size="6.2" fill="#3a3f58">the kernel — owns everything below</text>
  <rect x="28" y="66" width="70" height="40" rx="2" fill="#fff" stroke="#888"/>
  <text x="63" y="83" text-anchor="middle" font-size="7">Scheduler</text>
  <text x="63" y="95" text-anchor="middle" font-size="5.8" fill="#555">who runs now</text>
  <rect x="106" y="66" width="70" height="40" rx="2" fill="#fff" stroke="#888"/>
  <text x="141" y="83" text-anchor="middle" font-size="7">Virtual mem</text>
  <text x="141" y="95" text-anchor="middle" font-size="5.8" fill="#555">how much RAM</text>
  <rect x="184" y="66" width="70" height="40" rx="2" fill="#fff" stroke="#888"/>
  <text x="219" y="83" text-anchor="middle" font-size="7">File descr.</text>
  <text x="219" y="95" text-anchor="middle" font-size="5.8" fill="#555">sockets &amp; files</text>
  <rect x="262" y="66" width="70" height="40" rx="2" fill="#fff" stroke="#888"/>
  <text x="297" y="83" text-anchor="middle" font-size="7">Net stack</text>
  <text x="297" y="95" text-anchor="middle" font-size="5.8" fill="#555">packets in/out</text>
  <path d="M180 112 L180 126" stroke="#1a1a1a" marker-end="url(#a1)"/>
  <rect x="40" y="128" width="280" height="18" rx="3" fill="#eef0f5" stroke="#3a3f58"/>
  <text x="180" y="140" text-anchor="middle">Hardware — CPU · RAM · disk · NIC</text>
  <defs><marker id="a1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Four things the kernel controls, and the incident question each answers:
  - **Scheduler** — which thread runs now. ("Starved while CPU looks idle?")
  - **Virtual memory** — what a process thinks it has, and what happens when it's gone. ("Why OOM-killed?")
  - **File descriptors + I/O** — how it talks to sockets, files, pipes. ("Too many open files?")
  - **Namespaces + cgroups** — what it can see and use. ("What *is* a container?")
- A **container is not a small VM.** It is an ordinary Linux process the kernel fenced off with namespaces and capped with cgroups. Once that clicks (Module 5), Docker and Kubernetes stop being magic.

:::note
The method: when something breaks, don't start at your code. Start at the **process**, ask the kernel what it's doing — `/proc`, `strace`, `perf`, eBPF (Module 6) — and follow the evidence down the stack. Model first, tools last.
:::
