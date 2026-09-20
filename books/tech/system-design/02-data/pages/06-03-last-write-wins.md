## Last write wins

- **Last write wins (LWW)**: each write carries a timestamp; when two writes to the same key meet, the higher timestamp survives and the other is discarded. Simple, deterministic, and it converges: every replica ends up with the same value
- DynamoDB global tables (the default, multi-region eventual consistency) resolve conflicts this way, using "the latest internal timestamp on a per-item basis". Cassandra does the same with the write's timestamp, which the client may supply

<svg viewBox="0 0 460 96" role="img" aria-label="Two regions write the same key. Region 1 writes title=A at 10:00:00.120. Region 2 writes title=B at 10:00:00.090 by its own clock, which runs slow. Both converge on A. Region 2's user was acknowledged and then overwritten." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="14" width="150" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="95" y="31" text-anchor="middle" font-size="7.5">region 1: title = A @ .120</text>
  <rect x="20" y="56" width="150" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="95" y="73" text-anchor="middle" font-size="7.5">region 2: title = B @ .090</text>
  <path d="M170 27 L290 44" stroke="#1d4e89" fill="none"/><path d="M170 69 L290 52" stroke="#1d4e89" fill="none"/>
  <rect x="290" y="34" width="150" height="28" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="365" y="48" text-anchor="middle" font-size="7.5">everywhere: title = A</text><text x="365" y="58" text-anchor="middle" font-size="6.5">B acknowledged, then gone</text>
  <text x="95" y="93" text-anchor="middle" font-size="7" fill="#b8541a">region 2's clock ran 40 ms slow; B was actually later</text>
</svg>

- It is the right answer when the writes are independent replacements of a whole value (a profile's display name), and the wrong one whenever the loser mattered

### The failure

- The clock decides. Two clocks disagree by tens of milliseconds as a matter of course (booklet 03 is the clocks booklet); the write that was really later can lose, and a write that was acknowledged to its user disappears with no error anywhere. LWW does not lose data at random; it loses it on whichever region's clock is behind
