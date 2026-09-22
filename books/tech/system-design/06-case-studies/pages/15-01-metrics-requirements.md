# Module 15 - Metrics and logging pipeline

## Requirements and numbers

- A metrics pipeline collects one number per series every few seconds from every process in the fleet, keeps a year of it, and answers "what is happening now" in under a second. The shape: writes that never stop, reads that want the last hour, and a volume only downsampling makes affordable
- Functional, in: collect samples from every service; query a series or an aggregate over a range; alert when a rule holds. Out: dashboards; tracing and logs beyond where they meet this pipeline (pages 3 and 6)
- Non-functional: queries over the last hour in under a second; a year of history at coarser resolution; alerts evaluated on the freshest data
- Inputs, as assumptions: 10 M active series; one sample per series every 10 s; a raw sample of 16 bytes, an 8-byte timestamp and an 8-byte float; one year of retention

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| write rate | 10 M ÷ 10 s | 1 M samples/s, every second of the year |
| volume | 1 M/s × 16 B × 86 400; then Gorilla's 1.37 B per point (page 4) | ≈ 1.4 TB a day raw, ≈ 500 TB a year; ≈ 120 GB a day compressed, ≈ 43 TB a year |
| downsampled | 10 s for 2 weeks, 1 min to 3 months, 1 h for the year (page 5) | ≈ 3.3 TB for the year; the 10-second tier is half of it |
| reads | Gorilla paper: ≥ 85 % of queries were for the past 26 hours | the hot window lives in memory; the rest on disk and cold |

- The numbers say three tiers: an in-memory window for what people actually query, compressed blocks on disk, rollups for the year. The data model (page 2) decides how many series there are, the number every row multiplies

### The failure

- Sizing storage without downsampling. 500 TB of raw samples a year is a budget line nobody approves, and 43 TB compressed is still 10-second resolution that no query over last March needs. The retention schedule is a requirement, not an optimisation added later
