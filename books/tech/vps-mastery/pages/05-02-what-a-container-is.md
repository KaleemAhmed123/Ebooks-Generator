## What a container actually is

- A container is a normal Linux process. The kernel is told to lie to it about what it can see

| Kernel feature | What it hides |
|---|---|
| **Namespaces** | Process list, network interfaces, mount table, hostname, users |
| **cgroups** | Limits CPU, memory, and disk throughput |
| **Union filesystem** | Stacks read-only image layers under one writable layer |

- `ps aux` inside a container shows one or two processes. On the host, those same processes appear in the full list with different IDs

### Against a virtual machine

| | Virtual machine | Container |
|---|---|---|
| Boots | A full operating system and kernel | A process |
| Start time | Tens of seconds | Milliseconds |
| Memory floor | Hundreds of megabytes before the app | Only what the app uses |
| Isolation | Strong. Separate kernel | Weaker. Shared kernel |

### The consequence of a shared kernel

- A container runs the **host's** kernel. `node:24-alpine` on Ubuntu 26.04 uses the Ubuntu kernel, not an Alpine one
- A kernel exploit inside a container is a host compromise. This is why page 05-14 runs application processes as a non-root user even inside the image

### The practical summary

- Containers are process isolation with a packaged filesystem. Treating them as small virtual machines leads to bad decisions, starting with running an SSH daemon inside one
