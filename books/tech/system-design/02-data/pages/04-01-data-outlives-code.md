# Module 4 - Encoding and schema evolution

## Data outlives code

- **Encoding** is the byte form of a value: what a row looks like on disk, what a request body looks like on the wire, what a message looks like in a queue. Those are the three places it matters
- The code that wrote the bytes and the code that reads them are rarely the same version. A rolling deploy replaces instances one at a time, so v1 and v2 serve traffic against the same database for the whole rollout. A queue holds messages written days ago. A row written in 2024 is read by every release since

<svg viewBox="0 0 460 132" role="img" aria-label="Two versions of the code, v1 and v2, both live during a rolling deploy, read and write the same three byte stores: rows on disk, request bodies, queued messages." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="34" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="34" text-anchor="middle">v1 code</text><text x="60" y="47" text-anchor="middle" font-size="7">still serving</text>
  <rect x="20" y="78" width="80" height="34" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="92" text-anchor="middle" fill="#1d4e89">v2 code</text><text x="60" y="105" text-anchor="middle" font-size="7">rolling out</text>
  <rect x="200" y="10" width="110" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="255" y="29" text-anchor="middle">rows on disk</text>
  <rect x="200" y="51" width="110" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="255" y="70" text-anchor="middle">request bodies</text>
  <rect x="200" y="92" width="110" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="255" y="111" text-anchor="middle">queued messages</text>
  <g stroke="#1a1a1a" fill="none"><path d="M100 37 L200 25"/><path d="M100 37 L200 66"/><path d="M100 37 L200 107"/></g>
  <g stroke="#1d4e89" fill="none"><path d="M100 95 L200 25"/><path d="M100 95 L200 66"/><path d="M100 95 L200 107"/></g>
  <text x="340" y="29" font-size="7.5">written by v0, v1, v2 …</text>
  <text x="340" y="70" font-size="7.5">v1 client → v2 server, and back</text>
  <text x="340" y="111" font-size="7.5">written last week, read today</text>
</svg>

- So every encoding decision is a compatibility decision. The rest of this module is the two questions that follow: can new code read old bytes, and can old code read new bytes

### The failure

- Assuming everyone upgrades at the same instant. Blue/green switches the traffic in one step, but the rows and the queued messages written by the old version are still there, and a rollback puts old code in front of bytes it has never seen
- The rule is not "deploy carefully". It is: the bytes must be readable by every version that can be running, in either direction, until the last one is gone
