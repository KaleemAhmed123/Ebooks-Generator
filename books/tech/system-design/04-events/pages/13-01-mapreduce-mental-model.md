# Module 13 - Batch vs stream

## MapReduce

- **MapReduce** (Dean & Ghemawat, OSDI 2004): "a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key." Map runs in parallel across the input; a shuffle groups intermediate pairs by key; reduce runs in parallel across the groups

<svg viewBox="0 0 460 90" role="img" aria-label="MapReduce. Many map tasks run in parallel, a shuffle groups their output by key, and fewer reduce tasks merge each group." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <text x="70" y="12" text-anchor="middle" font-weight="bold">map</text>
  <rect x="30" y="20" width="35" height="16" fill="none" stroke="#333"/><rect x="70" y="20" width="35" height="16" fill="none" stroke="#333"/><rect x="110" y="20" width="35" height="16" fill="none" stroke="#333"/>
  <text x="230" y="12" text-anchor="middle" font-weight="bold">shuffle</text>
  <path d="M47 36 Q230 75 362 45" fill="none" stroke="#999"/><path d="M47 36 Q230 60 412 45" fill="none" stroke="#999"/>
  <path d="M87 36 Q230 80 362 45" fill="none" stroke="#999"/><path d="M87 36 Q230 55 412 45" fill="none" stroke="#999"/>
  <path d="M127 36 Q230 85 362 45" fill="none" stroke="#999"/><path d="M127 36 Q230 50 412 45" fill="none" stroke="#999"/>
  <text x="380" y="12" text-anchor="middle" font-weight="bold">reduce</text>
  <rect x="340" y="45" width="45" height="18" fill="none" stroke="#bf4c28"/><rect x="390" y="45" width="45" height="18" fill="none" stroke="#bf4c28"/>
</svg>

- A failed map or reduce task simply re-runs — the paper's own resilience story — because each task is a pure function over its input slice with no shared mutable state to corrupt on a partial failure
- The model underlies most batch engines that came after it, and the same grouping-by-key idea reappears in stream processing's own keyed state (Module 12) — a stream job's key does the same job a reduce's key does, just without waiting for the input to end first

### The failure

- One key holding most of the data — a giant customer, a default value used everywhere a real one is missing. One reduce task gets a group orders of magnitude larger than the rest, runs long after every other task has finished, and the whole job's completion time is that one task's completion time
