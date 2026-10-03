## systemd and the journal

- On almost every Linux host, **PID 1 is `systemd`** — the first process the kernel starts, and the parent of everything else (Module 2's process tree, at its root). It decides what runs at boot, keeps services alive, and — crucially for us — runs each service in its **own cgroup**, so the resource control from Module 5 is already in force host-side, before any container.
- You describe things to it as **units**: `.service` (a daemon), `.socket` (socket activation), `.timer` (cron's replacement), `.mount`, `.target` (a group/stage). `systemctl status nginx` shows a service's state, its cgroup, recent logs, and the exact PID; `systemctl start/stop/enable` manage it. A service that crashes is restarted per its `Restart=` policy — the host-level version of what Kubernetes does for pods.
- Logs go to the **journal** (`journald`), a structured, indexed store — not flat text files. `journalctl -u nginx --since "10 min ago"` filters by unit and time; `-f` follows; `-p err` filters by priority; `-o json` emits structured fields. Because entries carry metadata (unit, PID, priority, boot id), you query instead of `grep`-ing — the same shift to structured logs you'll make cluster-wide in Booklet 8.

:::note
The symmetry to carry forward: **systemd : a host :: Kubernetes : a cluster.** Both keep declared workloads running, restart them on failure, confine them with cgroups, and collect their logs. Learn the single-node version here and Kubernetes (Booklet 6) reads as the same ideas scaled across many machines.
:::

### Module 6 — checkpoint
- **Key concepts:** `/proc` (source of truth) · `strace` (syscalls, high overhead) · `perf` + flame graphs (CPU, cheap) · **eBPF** (safe, in-kernel, always-on) · systemd units + cgroups · `journalctl`.
- **Task + questions:** `perf top -p <pid>` on a busy process, read the top frame; then say when you'd reach for `strace` vs `perf` vs eBPF, and why a flame graph's *width* is what you read.

### Booklet 1 — what you can now do
- Read a process's real state — CPU, memory, fds, syscalls — from the terminal, and tell **CPU-bound from I/O-bound from a leak** instead of guessing.
- Explain **why a pod is OOM-killed**, why CPU-limited pods get **throttled**, and why **load ≠ utilisation**.
- Describe, from the kernel up, **exactly what a container is** — and why Docker and Kubernetes behave as they do.
- **Next booklet:** *Networking for Infrastructure Engineers* — how processes talk across the wire, and how to answer "why can't A reach B" and "why is p99 4s across AZs".
