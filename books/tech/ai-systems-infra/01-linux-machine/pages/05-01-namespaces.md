# A Container Is Just a Process

## Namespaces — what a process can see

- A **namespace** virtualises one global kernel resource so the processes inside it see their own private instance. Put a process in a fresh set of namespaces and it believes it has the machine to itself — its own process list, network, mounts, hostname — while it is still an ordinary process on the shared kernel.
- The kinds that matter, each answering "what does this process see?":

<svg viewBox="0 0 360 118" role="img" aria-label="A process inside namespaces sees its own PID tree, network stack, mounts, hostname, IPC, and user IDs, while running on the host's single shared kernel" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="8" width="340" height="74" rx="5" fill="#f7f8fb" stroke="#3a3f58"/>
  <text x="20" y="20" font-size="6.3" fill="#3a3f58">one process, fenced by namespaces</text>
  <rect x="20" y="26" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="58" y="37" text-anchor="middle" font-size="6">pid</text><text x="58" y="45" text-anchor="middle" font-size="5.2" fill="#777">own PID 1 + tree</text>
  <rect x="100" y="26" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="138" y="37" text-anchor="middle" font-size="6">net</text><text x="138" y="45" text-anchor="middle" font-size="5.2" fill="#777">own ifaces/routes</text>
  <rect x="180" y="26" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="218" y="37" text-anchor="middle" font-size="6">mnt</text><text x="218" y="45" text-anchor="middle" font-size="5.2" fill="#777">own filesystem tree</text>
  <rect x="260" y="26" width="80" height="22" rx="2" fill="#fff" stroke="#888"/><text x="300" y="37" text-anchor="middle" font-size="6">uts</text><text x="300" y="45" text-anchor="middle" font-size="5.2" fill="#777">own hostname</text>
  <rect x="20" y="52" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="58" y="63" text-anchor="middle" font-size="6">ipc</text><text x="58" y="71" text-anchor="middle" font-size="5.2" fill="#777">own shared mem</text>
  <rect x="100" y="52" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="138" y="63" text-anchor="middle" font-size="6">user</text><text x="138" y="71" text-anchor="middle" font-size="5.2" fill="#777">own uid map</text>
  <rect x="180" y="52" width="76" height="22" rx="2" fill="#fff" stroke="#888"/><text x="218" y="63" text-anchor="middle" font-size="6">cgroup</text><text x="218" y="71" text-anchor="middle" font-size="5.2" fill="#777">own cgroup view</text>
  <rect x="260" y="52" width="80" height="22" rx="2" fill="#fff" stroke="#888"/><text x="300" y="63" text-anchor="middle" font-size="6">time</text><text x="300" y="71" text-anchor="middle" font-size="5.2" fill="#777">own clock offset</text>
  <rect x="10" y="90" width="340" height="20" rx="3" fill="#eef0f5" stroke="#3a3f58"/><text x="180" y="103" text-anchor="middle" font-size="6.5">one shared kernel underneath — no guest OS</text>
</svg>

- They are created with the `clone`/`unshare` syscalls and are independent: you can give a process a new **net** namespace but share the host's **pid** namespace, in any mix. `docker run --network=host` is literally "don't give it a new net namespace."
- Namespaces decide *visibility*, not *resource limits*. A process alone in every namespace can still burn all the CPU and RAM on the box — fencing what it sees does nothing about what it uses. That second half is **cgroups**, next.
