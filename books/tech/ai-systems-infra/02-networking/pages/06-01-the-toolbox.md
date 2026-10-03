# Debugging the Network

## The toolbox

- Module 1 said **localise the layer first**. The toolbox maps one tool to each layer, so once you know *where* the fault is, you know *what* to run:
  - **Reachability (IP):** `ping` (is the host up / ICMP allowed?), `traceroute` / `mtr` (which hop drops or slows — `mtr` shows per-hop loss live).
  - **Names (app):** `dig name` (what does DNS return, and what's the TTL?), `dig +trace` (walk the hierarchy).
  - **Ports & connections (transport):** `ss -tanp` (what's listening, connection states, how many in `TIME_WAIT`), `nc -vz host port` (is the port open from here?).
  - **HTTP & TLS (app):** `curl -v` (headers, redirects, TLS version), `curl -w` (timing breakdown — next page), `openssl s_client -connect` (cert chain and dates).
  - **Packets (all layers):** `tcpdump -ni any port 443` (capture and filter the actual bytes), Wireshark to read them.
- The discipline that separates fast debugging from flailing: **form a hypothesis about one layer, run the one tool that confirms or kills it, move on.** "It's DNS" → `dig`. "Port's not open" → `nc`. "TLS mismatch" → `openssl s_client`. Random `tcpdump` with no hypothesis just buries you in packets.

:::lab
Pick a service you can reach and walk the layers in order: `ping` it, `mtr` to see the path, `dig` its name (note the TTL), `nc -vz` its port, then `curl -v https://it/` and read the TLS line and status. You've just confirmed every layer from link to application with one command each — the exact sequence to run when something is "down".
:::
