## Watermarks

- A **watermark** is a claim about progress, not a fact about the world — Flink's own definition: "a Watermark(t) declares that event time has reached time t in that stream, meaning that there should be no more elements from the stream with a timestamp t' <= t." An operator's own watermark is the minimum watermark across all of its input partitions

<svg viewBox="0 0 460 100" role="img" aria-label="Watermarks. Three input lines each advance a watermark, but one line has stalled. The operator's combined watermark is pinned to the stalled line's value." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="15" y="18" font-size="7">partition A</text>
  <path d="M100 15 L300 15" stroke="#333"/>
  <circle cx="260" cy="15" r="3" fill="#333"/>
  <text x="15" y="43" font-size="7">partition B</text>
  <path d="M100 40 L150 40" stroke="#bf4c28"/>
  <circle cx="150" cy="40" r="3" fill="#bf4c28"/>
  <text x="160" y="43" font-size="6" fill="#bf4c28">stalled</text>
  <text x="15" y="68" font-size="7">partition C</text>
  <path d="M100 65 L280 65" stroke="#333"/>
  <circle cx="240" cy="65" r="3" fill="#333"/>
  <path d="M150 78 L150 90" stroke="#bf4c28" stroke-dasharray="2 2"/>
  <text x="150" y="98" text-anchor="middle" font-size="6.5" fill="#bf4c28">operator watermark = min = B's</text>
</svg>

- That minimum is the trap: one partition with no traffic — a quiet key, a paused producer, an idle shard — holds the operator's watermark at whatever it last reported, because the operator cannot know time has moved on a partition that has gone silent. Every downstream window waiting on that watermark waits with it
- Watermarks are what let a window close at all under out-of-order arrival: without one, "is this window done" has no answer, because a late record could always still be coming

### The failure

- One partition holding zero traffic for an hour during a low-volume period. Every window in the job that depends on the combined watermark stops closing, output stalls system-wide, and the dashboard reads "no data" for reasons that have nothing to do with the ninety-nine other partitions still flowing normally
