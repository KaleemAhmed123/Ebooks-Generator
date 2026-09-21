## Transcoding as a DAG

- Transcoding is a **DAG**, a directed acyclic graph of tasks where each task's inputs are earlier tasks' outputs: split the source into segments, encode each segment into each rendition in parallel, package each rendition into a manifest plus its segments. Every task is idempotent and keyed by `(video, segment, rendition)`, so a crashed worker's task is simply run again by another (booklet 04)

<svg viewBox="0 0 460 178" role="img" aria-label="The transcode pipeline. The source, 2 hours and 4.5 gigabytes, sits in blob storage after upload. A split task cuts it into 4-second segments, 1 800 of them. Encode tasks, one per segment per rendition, go onto a queue and run in parallel across a worker pool: encode segment 1 at 1080p, segment 1 at 720p, and so on, 10 800 tasks in all, each idempotent by video, segment and rendition. A package task per rendition writes the manifest and its segments to blob storage as six renditions, from which the CDN serves playback. A copyright fingerprint task is one more node in the same graph. Arithmetic: 2 hours divided by 4 seconds is 1 800 segments times 6 renditions is 10 800 tasks, about 11 each across 1 000 workers, minutes not hours. An orange cross marks one job on one worker: the whole file encoded serially six times, and a crash at hour 3 restarts from zero." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="40" width="62" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="37" y="53" text-anchor="middle">source</text><text x="37" y="64" text-anchor="middle" font-size="7">in blob, page 2</text><text x="37" y="74" text-anchor="middle" font-size="7">2 h · 4.5 GB</text>
  <rect x="96" y="40" width="60" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="126" y="53" text-anchor="middle">split</text><text x="126" y="64" text-anchor="middle" font-size="7">4 s segments</text><text x="126" y="74" text-anchor="middle" font-size="7">1 800 of them</text>
  <line x1="68" y1="60" x2="96" y2="60" stroke="#333" marker-end="url(#d)"/>
  <rect x="190" y="8" width="88" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="234" y="23" text-anchor="middle" font-size="7.5">encode seg 1 · 1080p</text>
  <rect x="190" y="40" width="88" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="234" y="55" text-anchor="middle" font-size="7.5">encode seg 1 · 720p</text>
  <rect x="190" y="72" width="88" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="234" y="87" text-anchor="middle" font-size="7.5">… 10 800 tasks</text>
  <line x1="156" y1="52" x2="190" y2="22" stroke="#333" marker-end="url(#d)"/>
  <line x1="156" y1="60" x2="190" y2="52" stroke="#333" marker-end="url(#d)"/>
  <line x1="156" y1="68" x2="190" y2="82" stroke="#333" marker-end="url(#d)"/>
  <text x="234" y="108" text-anchor="middle" font-size="7">tasks on a queue, in parallel across the pool</text><text x="234" y="117" text-anchor="middle" font-size="7">idempotent by (video, segment, rendition)</text>
  <rect x="302" y="40" width="74" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="339" y="53" text-anchor="middle">package</text><text x="339" y="64" text-anchor="middle" font-size="7">per rendition:</text><text x="339" y="74" text-anchor="middle" font-size="7">manifest + segments</text>
  <line x1="278" y1="20" x2="302" y2="50" stroke="#333" marker-end="url(#d)"/>
  <line x1="278" y1="52" x2="302" y2="58" stroke="#333" marker-end="url(#d)"/>
  <line x1="278" y1="84" x2="302" y2="68" stroke="#333" marker-end="url(#d)"/>
  <rect x="396" y="10" width="58" height="38" rx="3" fill="#e6f2ff" stroke="#333"/><text x="425" y="23" text-anchor="middle">renditions</text><text x="425" y="34" text-anchor="middle" font-size="7">in blob, 6 of them</text><text x="425" y="44" text-anchor="middle" font-size="7">≈ 10 GB for 2 h</text>
  <line x1="376" y1="52" x2="396" y2="36" stroke="#333" marker-end="url(#d)"/>
  <rect x="396" y="74" width="58" height="26" rx="3" fill="#fff" stroke="#333"/><text x="425" y="85" text-anchor="middle" font-size="7.5">CDN</text><text x="425" y="95" text-anchor="middle" font-size="7">playback, page 5</text>
  <line x1="425" y1="48" x2="425" y2="74" stroke="#333" marker-end="url(#d)"/>
  <text x="308" y="108" font-size="7">fingerprint for copyright: one more</text><text x="308" y="117" font-size="7">node in the same graph (page 6)</text>
  <text x="6" y="140" font-size="7.5">2 h ÷ 4 s = 1 800 segments × 6 renditions = 10 800 tasks; ≈ 11 each on 1 000 workers: minutes, not hours</text>
  <text x="6" y="158" font-size="7.5" fill="#bf4c28">✕ one job, one worker: the whole 2 h file encoded serially, six times over,</text>
  <text x="6" y="169" font-size="7.5" fill="#bf4c28">and a crash at hour 3 starts again from zero</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
  </defs>
</svg>

- Segments are the unit of retry and of parallelism at once: a 4 s segment encodes in seconds, so a lost worker costs seconds, and 1 000 workers finish a film in the time one would take for a few minutes of it. The package step waits on all of a rendition's segments; it is the only join in the graph
- The queue's visibility timeout and the task key are what make a retry safe: a duplicate delivery re-encodes a segment and overwrites an identical object (booklet 04)

### The failure

- One queue message per video. A worker takes a 4-hour source and encodes it end to end, six renditions in a row, for most of a day; the machine restarts at hour nine and the job starts again. Parallelism and retry safety both come from splitting first
