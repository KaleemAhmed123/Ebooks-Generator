## How do you sandbox an agent that executes code or takes real actions?

- An agent that runs code or hits real systems can do damage — delete files, exfiltrate data, run forever, or be hijacked by injection. **Sandboxing** limits what a given action *can* do, so a bad decision is contained.
- Layers:
  - **Isolated execution** — run code in a container/VM/microVM with no access to the host, secrets, or production systems.
  - **Least privilege** — minimal filesystem, network, and credential scope; deny by default, allow specific needs.
  - **Network egress control** — block or allow-list outbound traffic to cut exfiltration (breaks the lethal trifecta).
  - **Resource limits** — CPU/memory/time caps so runaway or malicious code can't exhaust the host.
  - **Ephemeral + reset** — fresh environment per task; nothing persists to leak into the next.
- Pair with approval gates on irreversible actions and full audit logging. The goal is **bounded blast radius**: assume a step may be wrong or hijacked, and make sure it can't reach beyond its box.

:::interview
What's really being tested: that you contain actions with isolation + least privilege + egress control + resource limits (not just "run in Docker"), explicitly to bound blast radius against errors and injection.
:::
