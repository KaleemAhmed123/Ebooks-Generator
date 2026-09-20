## QPS, storage, bandwidth

- Every estimate lands on three quantities. Each sizes a different part of the system

| Quantity | How to estimate | What it sizes |
|---|---|---|
| **QPS** — queries per second | DAU × actions per user ÷ 10⁵, then × 2–3 for peak | instances, thread pools, connection limits |
| **Storage** | writes per day × row size × retention | disks, and whether one machine is enough |
| **Bandwidth** | QPS × average payload | network cards, CDN, the egress bill |

### Worked: a photo feed

```
100 M DAU, 10 feed loads each, 20 photos per load, 100 KB per thumbnail

QPS        100 M × 10 ÷ 10⁵     = 10,000 loads/s   → peak ~30,000/s
Bandwidth  30,000 × 20 × 100 KB = 60 GB/s at peak
Storage    see the next page — it is the one that creeps
```

- 60 GB/s of thumbnails is not served from an application server. It is the number that puts a CDN on the whiteboard before anyone mentions one

### The failure

- Computing QPS and stopping. "How much storage after five years?" gets silence. QPS is bounded by users; storage is bounded by writes × retention, and it grows every day the product exists
- The other direction: a bandwidth number nobody checked. 60 GB/s through one region's egress at cloud list prices is a bill, not a design
