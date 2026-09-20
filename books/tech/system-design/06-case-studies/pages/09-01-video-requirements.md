## Video Streaming: Requirements and numbers

- The prompt "design YouTube" or "design Netflix" tests your understanding of massive data throughput, Content Delivery Networks (CDNs), and asynchronous processing pipelines
- The core requirements are uploading a video, processing it into multiple formats, and streaming it smoothly to users with varying internet speeds
- For numbers, video dominates the internet. If 1 million users upload a 50 MB video every day, that is 50 TB of inbound data. But reads outnumber writes by a massive margin. If 100 million users watch 1 GB of video every day, that is 100 PB (Petabytes) of outbound bandwidth per day

| Metric | Calculation | Result |
| :--- | :--- | :--- |
| **Inbound Storage** | 1M uploads × 50 MB | 50 TB / day |
| **Outbound Bandwidth** | 100M views × 1 GB | 100 PB / day |
| **Read/Write Ratio** | Bandwidth comparison | ~2000:1 |
| **Latency Budget** | Time to first byte | < 200 ms |

### The failure

- The failure mode is focusing entirely on storage and ignoring outbound bandwidth. A candidate will meticulously calculate how many hard drives they need for 50 TB, but miss the fact that serving 100 PB of video from a single datacenter will saturate the region's internet backbone
- Video streaming is fundamentally a network bandwidth problem, not a disk space problem

:::interview
**The bandwidth test**
If you do not immediately state that serving this much data from one central server is impossible and that you require a global CDN, you have failed the scale test.
:::