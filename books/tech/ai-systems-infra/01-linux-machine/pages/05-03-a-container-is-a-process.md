## A container is a process

- Put the pieces together and the magic disappears. A **container** is an ordinary Linux process (and its children) that the runtime has wrapped in five kernel features:

<svg viewBox="0 0 360 118" role="img" aria-label="A container equals one host process plus namespaces for isolation, cgroups for limits, an overlay filesystem for its root, dropped capabilities and a seccomp syscall filter" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="130" y="8" width="100" height="24" rx="4" fill="#dfe6f2" stroke="#3a3f58"/><text x="180" y="23" text-anchor="middle" font-size="7">a host process</text>
  <rect x="8" y="48" width="104" height="26" rx="3" fill="#fff" stroke="#888"/><text x="60" y="60" text-anchor="middle" font-size="6">namespaces</text><text x="60" y="69" text-anchor="middle" font-size="5.2" fill="#777">what it sees</text>
  <rect x="128" y="48" width="104" height="26" rx="3" fill="#fff" stroke="#888"/><text x="180" y="60" text-anchor="middle" font-size="6">cgroups</text><text x="180" y="69" text-anchor="middle" font-size="5.2" fill="#777">what it uses</text>
  <rect x="248" y="48" width="104" height="26" rx="3" fill="#fff" stroke="#888"/><text x="300" y="60" text-anchor="middle" font-size="6">overlayfs</text><text x="300" y="69" text-anchor="middle" font-size="5.2" fill="#777">layered root fs</text>
  <rect x="70" y="84" width="104" height="26" rx="3" fill="#fff" stroke="#888"/><text x="122" y="96" text-anchor="middle" font-size="6">capabilities</text><text x="122" y="105" text-anchor="middle" font-size="5.2" fill="#777">trimmed root</text>
  <rect x="186" y="84" width="104" height="26" rx="3" fill="#fff" stroke="#888"/><text x="238" y="96" text-anchor="middle" font-size="6">seccomp</text><text x="238" y="105" text-anchor="middle" font-size="5.2" fill="#777">syscall filter</text>
  <path d="M150 32 L80 46" stroke="#1a1a1a" marker-end="url(#k1)"/>
  <path d="M180 32 L180 46" stroke="#1a1a1a" marker-end="url(#k1)"/>
  <path d="M210 32 L300 46" stroke="#1a1a1a" marker-end="url(#k1)"/>
  <path d="M165 34 L122 82" stroke="#1a1a1a" marker-end="url(#k1)"/>
  <path d="M196 34 L238 82" stroke="#1a1a1a" marker-end="url(#k1)"/>
  <defs><marker id="k1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Namespaces** isolate what it sees, **cgroups** cap what it uses, **overlayfs** gives it a private root filesystem assembled from read-only image layers plus a thin writable layer, **capabilities** hand it a trimmed subset of root's powers, and **seccomp** filters which syscalls it may even make. Docker/containerd/CRI-O just orchestrate these; the kernel does the work.
- **The thing that is NOT there: a guest OS.** A VM runs a second kernel on virtual hardware; a container shares the host's one kernel. That is why a container starts in milliseconds and costs almost nothing — and also why a kernel bug or a too-broad capability is a shared risk, which is the whole subject of container security (Booklet 11).

:::lab
Prove it on any Docker host. Run `docker run -d --name demo nginx`, then on the **host** run `ps aux | grep nginx` and `sudo cat /proc/$(pgrep -n nginx)/cgroup` — the container's processes are right there in the host's process list, sitting in their cgroup. Then `docker run --rm -it --pid=host alpine ps aux` shows the container seeing the *host's* whole process tree, because you declined the pid namespace. Isolation is a choice, toggled per namespace.
:::
