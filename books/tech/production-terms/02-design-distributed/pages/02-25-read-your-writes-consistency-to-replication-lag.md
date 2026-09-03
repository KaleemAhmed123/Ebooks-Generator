## Read-Your-Writes Consistency

The weakest consistency guarantee users actually notice: after I write
something, I see it. Somebody else seeing it a second later is fine.

A user edits a comment, the next request lands on a lagging replica, and their
edit is gone. They edit it again. Now there are two edits in flight and a
support ticket that will be impossible to reproduce.

<svg viewBox="0 0 460 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="After a write, the same user reads from a lagging replica and sees the old value, unless their session is pinned to the primary">
  <rect x="4" y="8" width="96" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="52" y="23" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">user writes</text>
  <path d="M102 19 H124" stroke="#1a1a1a" stroke-width="1.2"/><path d="M124 19 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="128" y="8" width="76" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="166" y="23" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">primary</text>
  <path d="M52 34 V46 H236" stroke="#b32d2b" stroke-width="1.1" fill="none" stroke-dasharray="3 2"/><path d="M236 46 l-5 -3 v6 z" fill="#b32d2b"/>
  <text x="86" y="55" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">same user reads a lagging replica — their own edit is missing</text>
  <rect x="240" y="8" width="216" height="22" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.3"/><text x="348" y="23" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#2b5fa8">fix: pin this session to the primary briefly</text>
</svg>

The alternative to a sticky window is passing the write position back to the
client and requiring the replica to have reached it.

## Replication Lag

How far behind the primary a replica currently is, measured in time or in bytes.
It is zero in the design document and never zero in production.

A batch job writes two million rows and lag climbs to forty-five seconds. For
the next minute every read-replica query returns stale data, dashboards show
orders that have "disappeared", and a support agent tells a customer their
payment did not go through.

Alert on the lag itself, not on whether the replica process is running. A
healthy replica that is four minutes behind is serving wrong answers with a
green status light.
