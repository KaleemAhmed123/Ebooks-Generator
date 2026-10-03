## eBPF — the x-ray

- **eBPF** lets you run small, sandboxed programs **inside the kernel**, attached to events — a syscall entry, a network packet, a function call, a tracepoint — without patching or rebooting the kernel. A verifier checks each program can't crash or loop forever before it loads, so it's safe to run on production. This is the biggest shift in Linux observability in a decade, and the thread that runs through the rest of this series.

<svg viewBox="0 0 360 112" role="img" aria-label="eBPF programs attach to kernel hooks such as syscalls, network, and functions; they run safely in the kernel and write results to maps that user-space tools read" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="12" y="13" font-size="6.3" fill="#3a3f58">kernel hooks</text>
  <rect x="12" y="18" width="78" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="51" y="29" text-anchor="middle" font-size="6">syscalls</text>
  <rect x="12" y="37" width="78" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="51" y="48" text-anchor="middle" font-size="6">network / XDP</text>
  <rect x="12" y="56" width="78" height="15" rx="2" fill="#eef0f5" stroke="#3a3f58"/><text x="51" y="67" text-anchor="middle" font-size="6">kprobes/uprobes</text>
  <rect x="124" y="30" width="96" height="30" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="172" y="42" text-anchor="middle" font-size="6.3">eBPF program</text><text x="172" y="52" text-anchor="middle" font-size="5.3" fill="#777">verified, in-kernel</text>
  <rect x="250" y="30" width="96" height="30" rx="4" fill="#dfe6f2" stroke="#3a3f58"/><text x="298" y="42" text-anchor="middle" font-size="6.3">map → user space</text><text x="298" y="52" text-anchor="middle" font-size="5.3" fill="#777">tools read results</text>
  <path d="M90 25 L124 40" stroke="#1a1a1a" marker-end="url(#b1)"/>
  <path d="M90 44 L124 45" stroke="#1a1a1a" marker-end="url(#b1)"/>
  <path d="M90 63 L124 50" stroke="#1a1a1a" marker-end="url(#b1)"/>
  <path d="M220 45 L250 45" stroke="#1a1a1a" marker-end="url(#b1)"/>
  <text x="180" y="82" text-anchor="middle" font-size="5.8" fill="#777">low overhead, always-on — unlike strace's per-syscall stop</text>
  <defs><marker id="b1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- You rarely write eBPF by hand; you use tools built on it. **bpftrace** one-liners and **bcc** scripts (`execsnoop` — every process launched; `opensnoop` — every file opened; `biolatency` — disk-latency histogram; `tcplife` — every TCP connection's lifetime) answer "what is actually happening right now" with near-zero overhead.
- The reason it matters for this series: the same technology reappears as **Cilium** (eBPF networking and policy, Booklet 2/6/11), **Falco** (runtime security, Booklet 11), and **OpenTelemetry profiling** (production continuous profiling, Booklet 8). Learn the idea once here; recognise it everywhere later.
