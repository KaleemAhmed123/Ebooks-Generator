## The Redis execution model

- Redis is, in its own documentation's words, "mostly single threaded". I/O threads read and write sockets and parse the protocol; every command still executes on one thread, one at a time, to completion

<svg viewBox="0 0 460 110" role="img" aria-label="The Redis execution model. Three I/O threads read and write sockets and parse the protocol, and all of them feed a single command execution thread, which is the only thing that touches the keyspace. I/O threading is disabled by default, and the I/O threads never execute a command. An orange cross marks running KEYS star: it scans the keyspace on that single thread, so every other client waits for it however many cores the machine has." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">I/O threads parse and write sockets; one thread executes every command</text>
  <rect x="4" y="24" width="110" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="59" y="34" text-anchor="middle" font-size="6.5">I/O thread 1</text>
  <rect x="4" y="42" width="110" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="59" y="52" text-anchor="middle" font-size="6.5">I/O thread 2</text>
  <rect x="4" y="60" width="110" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="59" y="70" text-anchor="middle" font-size="6.5">I/O thread 3</text>
  <line x1="114" y1="31" x2="168" y2="45" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="114" y1="49" x2="168" y2="49" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="114" y1="67" x2="168" y2="53" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="170" y="24" width="140" height="50" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="240" y="44" text-anchor="middle" font-size="7.5">command execution</text><text x="240" y="58" text-anchor="middle" font-size="6.5">one thread, one command</text>
  <line x1="310" y1="49" x2="348" y2="49" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="350" y="34" width="100" height="30" rx="3" fill="#f3f3f3" stroke="#666"/><text x="400" y="52" text-anchor="middle" font-size="7.5">keyspace</text>
  <text x="4" y="92" font-size="7">io-threads is disabled by default, and an I/O thread never executes a command — only moves bytes</text>
  <text x="4" y="105" font-size="7.5" fill="#bf4c28">✕ one KEYS * scans the keyspace on that thread: every other client waits, however many cores the box has</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Single-threaded execution is why Redis operations are atomic without locks, and why its latency is so predictable: there is no contention to be unlucky with. It is also why one slow command is a fleet-wide outage rather than one slow request
- `io-threads` is off by default and the documentation's advice is to enable it only with four or more cores and a measured CPU problem. It raises throughput on the network side; it does not make command execution parallel, so it does not help with a slow command

### The failure

- `KEYS *` in production. It walks every key in the keyspace on the execution thread, so for the seconds it runs every other client — every service, every instance — is blocked. The command is usually typed by someone debugging, which means it lands during an incident
- `SCAN` exists for this and returns a cursor, doing a small amount of work per call and letting other commands interleave. The same trap is set by any unbounded operation on a large value: `SMEMBERS` on a million-member set, a `DEL` of a huge structure, a Lua script with a loop in it. The rule is per command, not per key: nothing that runs in time proportional to the data should touch a shared execution thread
