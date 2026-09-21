## Backlog math

- Lag (Module 3, page 9) is a number of records. Whether it is a problem is arithmetic: drain time = backlog ÷ (consume rate − produce rate), with both rates measured over the same recent window

| Backlog | Consume | Produce | Net | Drain time |
|---|---|---|---|---|
| 600,000 | 1,000/s | 800/s | +200/s | 3,000 s, 50 minutes |
| 600,000 | 1,000/s | 200/s | +800/s | 750 s |
| 600,000 | 700/s | 800/s | −100/s | never; growing 100/s |
| 600,000 | 1,000/s | 800/s, 6 partitions, 6 consumers, 10 pods | +200/s | still 50 minutes: 4 pods idle |

- A negative net rate means no amount of waiting helps. The choices are: raise the consume rate (more consumers, up to the partition count; less work per record; batched writes), cut the produce rate (the producer's problem, or the edge's: booklet 05), or drop records on purpose, by age or by priority, and say so
- The consume rate is per partition. Six partitions at 170/s each is 1,020/s and no pod count changes it; the next step is a new topic with more partitions (Module 4, page 4)
- Drain time has a hard deadline: retention (Module 7, page 1). A backlog that drains in nine days on a seven-day topic loses two days of records with no error

:::interview
"Consumers are falling behind. What do you do?" — Measure lag per partition and the two rates; compute the net. Positive net: it is a burst, wait, and confirm the drain time beats retention. Negative net: add consumers up to the partition count, then cut work per record (batching, async I/O, fewer round trips), then more partitions via a new topic. Say what gets dropped if none of that lands in time.
:::

### The failure

- Scaling pods past the partition count. Lag climbs; the on-call scales the deployment from 6 to 30; lag keeps climbing at the same rate. Twenty-four pods hold no partition. The graph looks like the scaling did nothing, because it did
