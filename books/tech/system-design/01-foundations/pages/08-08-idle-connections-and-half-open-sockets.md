## Idle connections and half-open sockets

- A TCP connection is just state stored in memory at both ends. If the network between them goes down, or one side's power is cut, no "close" packet is sent
- The surviving side still thinks the socket is open. This is a **half-open socket**
- Silence is not a signal. The OS cannot distinguish a perfectly healthy idle connection from one where the other end is dead

### TCP Keepalive

- To tell the difference, the kernel can send empty probe packets. But Linux TCP keepalive defaults to **2 hours** before it sends the first probe
- For two hours, an application reading from that socket will hang, waiting for data that will never arrive

### The failure

- A database connection pool keeps 50 idle connections open. The firewall between the app and the database reboots, dropping its state. The firewall comes back up, but it no longer recognises the TCP sessions
- The database thinks the connections are alive. The app thinks the connections are alive. When the app sends a query, the firewall drops it. The app waits for the response (which needs an app-level timeout, page 3). After the timeout, the app grabs the *next* connection from the pool. That one is dead too
- The fix: enable application-level keepalives (like Postgres's `tcp_keepalives_idle`), set to 60 seconds, not 2 hours
