## A process is the unit

- The kernel schedules **processes** and the **threads** in them — not "your app." A process is the box the OS accounts for: CPU, memory, and open files are all tracked per process.
- Three parts: an **address space** (private memory — code, heap, stack), one or more **threads** (what actually runs on a CPU, sharing that memory), and a **file-descriptor table** (integer handles to every open socket, file, pipe).

<svg viewBox="0 0 360 120" role="img" aria-label="A process contains a private address space of stack heap and code, one or more threads that run on CPUs, and a file descriptor table" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="6" width="340" height="108" rx="5" fill="#f7f8fb" stroke="#3a3f58"/>
  <text x="20" y="18" font-size="7" fill="#3a3f58">Process — PID 4821 (your service)</text>
  <rect x="20" y="24" width="96" height="84" rx="3" fill="#fff" stroke="#888"/>
  <text x="68" y="35" text-anchor="middle" font-size="6.3" fill="#555">address space</text>
  <rect x="28" y="40" width="80" height="16" fill="#eef0f5" stroke="#aab"/><text x="68" y="51" text-anchor="middle" font-size="6">stack ↓</text>
  <rect x="28" y="59" width="80" height="22" fill="#eef0f5" stroke="#aab"/><text x="68" y="73" text-anchor="middle" font-size="6">heap ↑ (malloc)</text>
  <rect x="28" y="84" width="80" height="18" fill="#eef0f5" stroke="#aab"/><text x="68" y="96" text-anchor="middle" font-size="6">code (text)</text>
  <rect x="132" y="24" width="104" height="84" rx="3" fill="#fff" stroke="#888"/>
  <text x="184" y="35" text-anchor="middle" font-size="6.3" fill="#555">threads (run on CPUs)</text>
  <rect x="142" y="42" width="84" height="15" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="184" y="52" text-anchor="middle" font-size="6">thread 1</text>
  <rect x="142" y="61" width="84" height="15" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="184" y="71" text-anchor="middle" font-size="6">thread 2</text>
  <rect x="142" y="80" width="84" height="15" rx="2" fill="#e7efe9" stroke="#2f7d4f"/><text x="184" y="90" text-anchor="middle" font-size="6">thread 3</text>
  <rect x="252" y="24" width="88" height="84" rx="3" fill="#fff" stroke="#888"/>
  <text x="296" y="35" text-anchor="middle" font-size="6.3" fill="#555">fd table</text>
  <text x="262" y="50" font-size="6">0 → stdin</text>
  <text x="262" y="62" font-size="6">1 → stdout</text>
  <text x="262" y="74" font-size="6">2 → stderr</text>
  <text x="262" y="86" font-size="6">3 → socket</text>
  <text x="262" y="98" font-size="6">4 → logfile</text>
</svg>

- **Born by `fork` then `exec`.** `fork` clones the process (memory copied copy-on-write, so it's cheap); `exec` replaces the clone's program with a new one. Your shell does this for every command. (Linux builds both on `clone`.)
- **The process tree.** Every process has a parent; kill it and the children re-parent. At the root sits **PID 1** — systemd on a host, **your app** inside a container. PID 1 must reap dead children and handle signals.

:::warn
Your app as PID 1 with no child-reaping or signal handling leaves **zombies** and **ignores `SIGTERM`**, so every deploy waits the full grace period (often 30s) before a force-kill. Fix: a tiny init as PID 1 (`tini` / `docker run --init`), or handle `SIGTERM` and reap children yourself.
:::

:::interview
**What happens when you run `./server` from a shell?**

The shell `fork`s itself; the child calls `exec` to replace its memory with the `server` binary. The kernel builds a fresh address space, maps the binary, makes one thread, and gives it an fd table with 0/1/2 inherited from the shell. The parent `wait`s on the child's PID for the exit code. Running a program is just clone-then-replace.
:::
