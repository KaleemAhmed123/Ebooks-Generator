## Capabilities and rootless containers

- Classic Unix had a cliff: you were either **root** (uid 0, can do anything) or an unprivileged user. **Capabilities** break root's power into ~40 independent pieces you can grant one at a time — `CAP_NET_BIND_SERVICE` (bind ports below 1024), `CAP_NET_ADMIN` (configure networking), `CAP_SYS_ADMIN` (a dangerously broad catch-all), and so on. A process can hold exactly the slivers of root it needs and none of the rest.
- Container runtimes use this to tame "root in a container." By default Docker **drops most capabilities**, so even a process running as uid 0 inside the container cannot reconfigure the host network or load kernel modules. The right posture for your own images: **drop all, add back only what's required.**

:::warn
Running a container as root with default capabilities, then bind-mounting the Docker socket or adding `--privileged`, hands effective host root to anything that compromises the process — `--privileged` disables the capability drop, seccomp, and most isolation at once. Treat `--privileged` and a mounted `docker.sock` as "this container can own the node." Booklet 11 returns to this as a top container-escape path.
:::

- **Rootless** goes one level safer using the **user namespace**: it maps container-uid-0 to an **unprivileged host uid**. Inside, the process thinks it's root; on the host it's user 100000-something with no real privilege. A breakout lands you as a nobody, not as host root. Rootless Docker/Podman make this the default stance.
- The through-line of Module 5: a container's safety is a *sum of deliberate limits* — namespaces, cgroups, capabilities, seccomp, user-mapping — not a hard VM wall. Weaken any one (host namespaces, `--privileged`, root + broad caps) and the isolation leaks.

### Module 5 — checkpoint
- **Key concepts:** namespaces (see) vs cgroups (use) · cgroup v2 cpu/memory/io/pids · overlayfs · a container = process + 5 kernel features · no guest kernel · capabilities · seccomp · rootless via user namespaces.
- **Task:** run a container with `--memory=128m --cpus=0.5`, then read its `memory.max` and `cpu.max` under `/sys/fs/cgroup`; confirm they match what you asked for.
- **Questions:** Why does a container start in ms but a VM in seconds? What does `--privileged` actually switch off? Why is rootless safer after a breakout?
- **Next:** Module 6 — the tools that let you see all of this in a running system.
