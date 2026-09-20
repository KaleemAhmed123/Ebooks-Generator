## Bytes cost CPU

- Converting data between formats (serialisation) and shrinking it (compression) cost CPU time. That cost is invisible until the payload is large

| Operation | Throughput | Source |
|---|---|---|
| Fast binary serde (Protocol Buffers, MessagePack) | ~1 GiB/s | napkin-math, 2026-03 |
| Slow serde (JSON-class, XML) | ~100 MiB/s | napkin-math, 2026-03 |
| Compression (gzip-class) | ~500 MiB/s | napkin-math, 2026-03 |
| Decompression | ~1 GiB/s | napkin-math, 2026-03 |
| Typical compression ratio, text/HTML | 2–4× | napkin-math, 2026-03 |

- A **10 MB JSON response** at 100 MiB/s costs ~100 ms of CPU before it touches the network. A binary format at 1 GiB/s costs ~10 ms for the same data. That is a 10× difference in CPU per response
- Compression saves bandwidth but adds CPU. A 10 MB payload compressed 3× to 3.3 MB takes ~20 ms to compress and ~10 ms to decompress. Whether it is worth it depends on whether the bottleneck is bandwidth or CPU

### The failure

- An internal service-to-service API that returns 50 MB of JSON per call. Serialisation alone costs 500 ms. Switching to Protocol Buffers cut that to 50 ms and the payload to 8 MB. Nobody had profiled the serialisation because "it's just JSON"

:::interview
"What format would you use between services?" wants the trade-off: JSON for debugging and compatibility, binary for throughput. Name the CPU cost. Internal services that call each other thousands of times per second usually use binary.
:::
