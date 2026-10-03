## IP and CIDR

- An IP address has two parts: a **network** part and a **host** part. **CIDR** notation (`10.0.0.0/24`) says where the split is — the `/24` means the first **24 bits** name the network, the remaining 8 bits name hosts within it. So `10.0.0.0/24` is one network of 256 addresses (`10.0.0.0`–`10.0.0.255`); `/16` is 65,536; `/8` is ~16 million. Smaller number after the slash = bigger block.
- The arithmetic you actually use: a `/n` block holds `2^(32−n)` addresses (IPv4). `/24` = 256, `/20` = 4,096, `/28` = 16. Two of each block are unusable (network + broadcast), and cloud providers reserve a few more.

:::mint
```text
10.0.4.0/22  →  network bits = 22,  host bits = 10
             →  2^10 = 1024 addresses
             →  range 10.0.4.0  …  10.0.7.255
             →  "is 10.0.6.50 inside?"  yes (4.0–7.255)
```
:::

- **Private ranges (RFC 1918)** never route on the public internet and are what every VPC and home network uses: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. When you design a VPC (Booklet 5) you carve one of these into per-subnet CIDRs; when you write a Kubernetes **NetworkPolicy** or a security-group rule, you're allowing or denying CIDR ranges.
- This is also why overlapping CIDRs are a real outage: peer two VPCs that both use `10.0.0.0/16` and the router can't tell which `10.0.1.5` you mean. Pick non-overlapping ranges up front — renumbering a live network is miserable.
