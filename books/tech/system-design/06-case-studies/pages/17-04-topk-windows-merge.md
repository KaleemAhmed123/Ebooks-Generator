## Windows and merging

- Each partition computes a top-K per minute; a merger combines the partitions' lists into the minute board; the hour and day boards are built from minute boards. The whole design is which of those merges is exact, and the answer is: the one across partitions can be, the one across time cannot

<svg viewBox="0 0 460 172" role="img" aria-label="Top-K, whole design. Views arrive as events in a Kafka topic partitioned by video id, booklet 04, about 11 600 a second, from the video service, Module 9. Each of four partitions runs one consumer with a count-min sketch and a heap of 100 per minute, page 3, and at the end of each minute emits its top 100 with estimates. A merger takes the four lists, sums estimates for ids that appear in more than one, sorts and cuts to 100, and writes the minute board to a store keyed by minute. Because a video's views all land on one partition, a video in the global top 100 is in its partition's top 100, so this merge is exact given exact counts, and the sketch's epsilon is the only error. The hour board is built by summing the 60 minute boards' entries and cutting to 100; a video at 101st place every minute is on no minute board and can be first for the hour, so this merge is approximate, and the design says so on the board. The day board is the 24 hour boards the same way. A nightly batch over the raw log computes the exact daily top 100, booklet 04. An orange cross marks calling the merged hour board exact." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="84" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="48" y="23" text-anchor="middle">views topic</text><text x="48" y="34" text-anchor="middle" font-size="7">by video id (booklet 04)</text><text x="48" y="44" text-anchor="middle" font-size="7">≈ 11 600/s (Module 9)</text>
  <g font-size="7">
    <rect x="104" y="6" width="96" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="152" y="15" text-anchor="middle">partition 0: sketch + heap</text>
    <rect x="104" y="22" width="96" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="152" y="31" text-anchor="middle">partition 1: sketch + heap</text>
    <rect x="104" y="38" width="96" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="152" y="47" text-anchor="middle">partition 2: sketch + heap</text>
    <rect x="104" y="54" width="96" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="152" y="63" text-anchor="middle">partition 3: sketch + heap</text>
  </g>
  <line x1="90" y1="32" x2="104" y2="32" stroke="#333" marker-end="url(#d)"/>
  <text x="152" y="78" text-anchor="middle" font-size="7">one sketch and heap per minute each (page 3)</text>
  <rect x="228" y="14" width="92" height="52" rx="3" fill="#fff" stroke="#1d4e89"/><text x="274" y="27" text-anchor="middle">merger, per minute</text><text x="274" y="38" text-anchor="middle" font-size="7">union of 4 top-100 lists,</text><text x="274" y="48" text-anchor="middle" font-size="7">sum shared ids, sort, cut to 100</text><text x="274" y="59" text-anchor="middle" font-size="7" fill="#1d4e89">exact, given exact counts</text>
  <line x1="200" y1="36" x2="228" y2="36" stroke="#333" marker-end="url(#d)"/><text x="214" y="31" text-anchor="middle" font-size="7">4 lists</text>
  <rect x="348" y="14" width="106" height="52" rx="3" fill="#e6f2ff" stroke="#333"/><text x="401" y="27" text-anchor="middle">minute boards</text><text x="401" y="38" text-anchor="middle" font-size="7">one per minute, keyed by time</text><text x="401" y="48" text-anchor="middle" font-size="7">(sorted set, page 2, or a table)</text><text x="401" y="59" text-anchor="middle" font-size="7">error = the sketch's ε only</text>
  <line x1="320" y1="40" x2="348" y2="40" stroke="#333" marker-end="url(#d)"/>
  <rect x="214" y="96" width="134" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="281" y="109" text-anchor="middle">hour board = 60 minute boards</text><text x="281" y="120" text-anchor="middle" font-size="7">sum entries per id, sort, cut to 100</text><text x="281" y="131" text-anchor="middle" font-size="7" fill="#bf4c28">approximate: a steady 101st is lost</text>
  <line x1="401" y1="66" x2="330" y2="96" stroke="#333" marker-end="url(#d)"/>
  <rect x="372" y="96" width="82" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="413" y="109" text-anchor="middle">day board</text><text x="413" y="120" text-anchor="middle" font-size="7">24 hour boards, same</text><text x="413" y="131" text-anchor="middle" font-size="7">way; exact daily: batch</text>
  <line x1="348" y1="118" x2="372" y2="118" stroke="#333" marker-end="url(#d)"/>
  <rect x="6" y="96" width="150" height="44" rx="3" fill="#fff" stroke="#333"/><text x="81" y="109" text-anchor="middle">nightly batch over the raw log</text><text x="81" y="120" text-anchor="middle" font-size="7">exact top 100 for the day (booklet 04);</text><text x="81" y="131" text-anchor="middle" font-size="7">replaces the merged day board when it lands</text>
  <line x1="48" y1="54" x2="48" y2="96" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <text x="6" y="158" font-size="7.5" fill="#bf4c28">✕ calling the hour board exact: it merges winners; a steady 101st-place video that would top the hour was on no list</text>
  <text x="6" y="170" font-size="7">boards carry their error as data: "sketch, ε = 0.001" on the minute, "merged from minutes" on the hour, "exact, batch" on the day</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

:::interview
"You merge the partitions' top-100 lists. Is the result exact?" — Across partitions, yes, if the topic is keyed by video id: every view of a video lands on one partition, so a video in the global top 100 is in its own partition's top 100, and the union contains it; the only error is the sketch's, and with an exact map for the minute there is none. Across time, no: the hour built from 60 minute boards can miss a video that was 101st every minute and first overall. So the minute is exact-or-bounded, the hour is labelled approximate, and the day is recomputed by a batch.
:::

### The failure

- Promising the hourly answer is exact. The partition merge looks exact, so the time merge is assumed to be, and the product ships a "top 100 this hour" that a steady video never enters. Say which merge lost information; a board with its error written next to it is an engineering answer, a board without is a guess with a rank
