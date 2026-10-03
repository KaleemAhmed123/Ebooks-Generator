## MTU and fragmentation

- Every link has a **MTU** (Maximum Transmission Unit) — the largest payload one frame can carry. Classic Ethernet is **1500 bytes**. Send more than the path allows and one of two things happens: the packet is **fragmented** into pieces (slower, fragile) or, if it says "don't fragment," it's **dropped** and an ICMP "too big" message is meant to come back telling the sender to shrink.
- **Path MTU Discovery** is that feedback loop: the sender probes with full-size packets and lowers its size when ICMP says to. It works — until something eats the ICMP.

:::warn
The nastiest, most confusing network bug: **small requests work, large ones hang.** A health check (`curl /healthz`) returns instantly; a real request with a big body or TLS certificate stalls and times out. Cause: packets exceed the path MTU, the "fragmentation needed" ICMP is **blocked by a firewall**, and Path MTU Discovery silently fails — an **MTU black hole**. It bites on VPNs, cloud tunnels, and **Kubernetes overlay networks** (VXLAN/Geneve add ~50 bytes of header, dropping the effective MTU below 1500). Fixes: let ICMP "too big" through, lower the interface/overlay MTU, or clamp TCP MSS.
:::

- The practical rule: when "it works for small payloads but not large ones," suspect MTU before anything in your application. It presents as an app timeout but lives two layers down, which is exactly why Module 1's "localise the layer" habit saves hours.

### Module 1 — checkpoint
- **Key concepts:** 4 debug layers + encapsulation · network/host split & CIDR math (`2^(32−n)`) · RFC 1918 ranges · routing by longest-prefix · default gateway & ARP · NAT (shared public IP) · MTU & the black-hole failure.
- **Task:** `ip addr` and `ip route` on any Linux box — identify your IP, your subnet's CIDR, and your default gateway. Then `ping -M do -s 1472 <host>` and shrink `-s` until it stops failing to find the path MTU.
- **Questions:** How many usable hosts in a `/26`? Why does your pod's outbound IP differ from the pod's own IP? Why would large requests hang while small ones succeed?
- **Next:** Module 2 — TCP, UDP, and flow control.
