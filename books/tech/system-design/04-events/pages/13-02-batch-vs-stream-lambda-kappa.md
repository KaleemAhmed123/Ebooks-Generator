## Batch vs stream, and Lambda vs Kappa

- **Batch**: bounded input, a complete answer, computed with latency measured in minutes to hours. **Stream**: unbounded input, an incremental answer that keeps updating, computed with latency measured in milliseconds to seconds. A stream engine can replay a bounded slice of a retained log to produce a batch-style answer — the distinction is about the shape of the computation, not a property of the engine running it
- A job that runs every five minutes on a fixed slice is still batch, however often it runs; calling it "streaming" because the interval is short does not change that the answer only exists once each run finishes

<svg viewBox="0 0 460 100" role="img" aria-label="Lambda architecture runs a batch pipeline and a stream pipeline side by side, reconciled. Kappa architecture runs one log, replayed at batch speed for a full recompute and at stream speed for live updates." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <text x="110" y="14" text-anchor="middle" font-weight="bold">lambda</text>
  <rect x="30" y="24" width="80" height="22" fill="none" stroke="#333"/><text x="70" y="38" text-anchor="middle" font-size="6.5">batch pipeline</text>
  <rect x="30" y="60" width="80" height="22" fill="none" stroke="#333"/><text x="70" y="74" text-anchor="middle" font-size="6.5">stream pipeline</text>
  <path d="M110 35 L150 50" stroke="#333"/><path d="M110 71 L150 50" stroke="#333"/>
  <rect x="150" y="38" width="55" height="22" fill="none" stroke="#bf4c28"/><text x="177" y="52" text-anchor="middle" font-size="6.5" fill="#bf4c28">reconcile</text>
  <line x1="235" y1="10" x2="235" y2="95" stroke="#ccc" stroke-dasharray="2 2"/>
  <text x="350" y="14" text-anchor="middle" font-weight="bold">kappa</text>
  <rect x="270" y="42" width="80" height="18" fill="none" stroke="#333"/><text x="310" y="55" text-anchor="middle" font-size="6.5">one log</text>
  <path d="M350 46 L410 30" stroke="#333"/><text x="456" y="26" text-anchor="end" font-size="6">replay: batch speed</text>
  <path d="M350 56 L410 75" stroke="#333"/><text x="456" y="83" text-anchor="end" font-size="6">live: stream speed</text>
</svg>

- **Lambda architecture** runs two pipelines side by side — a batch path for the complete, correct answer and a stream path for a fast approximate one — and reconciles them. **Kappa architecture** runs one: a single log, replayed at batch speed for a full recompute and at stream speed for live updates, so there is only ever one implementation to keep correct
- Lambda's two pipelines are two chances for the same metric to drift, because a batch job and a stream job computing "the same" aggregate rarely stay bit-for-bit identical as both evolve independently. Kappa's trade is depending on retention deep enough to replay from, which is exactly what Module 7, page 1 prices out

### The failure

- A Lambda setup where the batch pipeline's daily total and the stream pipeline's running total silently diverge after a bug fix lands in one but not the other. Nobody notices until a customer's invoice does not match either number, and the after-the-fact chase is deciding which of the two was ever right
