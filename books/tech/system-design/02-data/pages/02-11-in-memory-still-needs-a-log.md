## In-memory still needs a log

- An in-memory database like Redis stores its entire dataset in RAM, bypassing the disk entirely for reads. This provides microsecond latency
- However, if the server restarts, RAM is wiped. To prevent catastrophic data loss, in-memory databases still write to disk in the background

<svg viewBox="0 0 460 140" role="img" aria-label="Redis persistence options. RDB takes a slow snapshot. AOF appends to a log. On restart, the log is replayed into RAM." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="37" text-anchor="middle">RDB (Snapshot)</text>
  <text x="100" y="52" text-anchor="middle" font-size="7">Save every 5 minutes</text>
  
  <rect x="250" y="20" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="300" y="37" text-anchor="middle">AOF (Append Log)</text>
  <text x="300" y="52" text-anchor="middle" font-size="7">fsync every second</text>
  
  <rect x="150" y="90" width="100" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="200" y="107" text-anchor="middle">RAM (Restarted)</text>
  <text x="200" y="122" text-anchor="middle" font-size="7">Replay file to restore</text>
  
  <path d="M100 60 L180 90" stroke="#1d4e89" fill="none"/><path d="M180 90 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-15 180 90)"/>
  <path d="M300 60 L220 90" stroke="#b8541a" fill="none"/><path d="M220 90 l-3 -6 h6 z" fill="#b8541a" transform="rotate(-60 220 90)"/>
</svg>

- **RDB**: Redis dumps a full snapshot of memory to disk every few minutes. If it crashes, you lose the last few minutes of writes
- **AOF**: Redis acts like a WAL, appending every command to an Append Only File. By default (`appendfsync everysec`), it flushes to disk once per second. You may lose exactly 1 second of writes

### The failure

- A Redis master configured with persistence turned completely off (to maximize write throughput). It crashes and auto-restarts via a systemd script. It wakes up completely empty
- Because it is the master, it immediately syncs its new, empty state to all its replicas. The replicas delete all their data to match the master. The entire dataset is wiped out in less than a second (a documented Redis failure mode)
