## Point-in-Time Recovery

*PITR*

Restoring a base backup and replaying the write-ahead log up to an exact moment.
The only real answer to "someone ran a `DELETE` without a `WHERE` at 14:32".

Bad migration at 14:32:10. Restore last night's base backup, replay WAL to
14:32:09, and you have lost nine minutes instead of a day.

<svg viewBox="0 0 460 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A base backup taken at two in the morning is replayed forward through the write-ahead log to one second before the mistake at 14:32">
  <path d="M60 30 H400" stroke="#1a1a1a" stroke-width="1.2"/>
  <circle cx="60" cy="30" r="4" fill="#1a1a1a"/>
  <text x="60" y="18" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">02:00</text>
  <text x="60" y="48" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">base backup</text>
  <rect x="64" y="26" width="272" height="8" fill="#e2fcf3" stroke="#2a5673" stroke-width="1"/>
  <text x="200" y="48" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#2a5673">WAL replayed forward</text>
  <circle cx="340" cy="30" r="4" fill="#2a5673"/>
  <text x="340" y="18" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#2a5673">14:32:09</text>
  <circle cx="380" cy="30" r="4" fill="#b32d2b"/>
  <text x="392" y="22" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">14:32:10</text>
  <text x="392" y="34" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">the mistake</text>
</svg>

**Untested backups are not backups.** The restore is a procedure with its own
failure modes, and the first time you run it should not be the time it matters.

## Poison Message

A message that always fails, is always requeued, and blocks the queue in a loop
that never ends.

A malformed payload nacked with requeue enabled reprocesses thousands of times a
second — burning CPU, drowning the logs, and starving every valid message behind
it.

The fix is a counter and a destination. Count attempts in a header, and after
the third send it to a dead letter queue rather than back to the queue it just
failed on.

**Never requeue blindly.** `requeue=true` on an unconditional error handler is
the line that creates this, and it looks like resilience when it is written.
