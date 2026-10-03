## cgroups — what a process can use

- If namespaces are what a process can *see*, **cgroups** (control groups) are what it can *use*. A cgroup is a group of processes with kernel-enforced **limits and accounting** on CPU, memory, I/O, and process count. The kernel does the enforcing — there is no way for a process to spend past its cgroup's cap.
- Modern systems use **cgroup v2**, the unified hierarchy (default on Ubuntu 21.10+, Debian 11+, Fedora 31+, RHEL/Rocky 9+). One tree, with controllers enabled per node:
  - **cpu** — `cpu.weight` (relative share when contended) and `cpu.max` (a hard ceiling, e.g. "50 ms of CPU per 100 ms" = half a core). The ceiling is where **CPU throttling** comes from.
  - **memory** — `memory.max` (the hard cap whose breach triggers the cgroup OOM from Module 3) and `memory.high` (a soft throttle that reclaims before killing).
  - **io** — weights and bandwidth caps on block devices.
  - **pids** — a cap on process/thread count, so a fork bomb in one cgroup can't take the node.

:::warn
`cpu.max` throttling is a quieter killer than OOM. A container with a tight CPU **limit** that briefly needs more is **throttled** — paused until its next quota window — adding tens of milliseconds of latency that never shows as high CPU usage (it shows as *not scheduled*). In Kubernetes this is the classic "p99 spikes but CPU looks low" from an aggressive CPU limit; `cat /sys/fs/cgroup/.../cpu.stat` shows `nr_throttled` climbing. Booklet 6 ties this to requests vs limits.
:::

- This is the direct mechanism behind Kubernetes resource management: a pod's `limits` become its cgroup's `memory.max` and `cpu.max`; its `requests` inform the scheduler and `cpu.weight`. `systemd` also runs every service in a cgroup — the same machinery, host-side (Module 6).
