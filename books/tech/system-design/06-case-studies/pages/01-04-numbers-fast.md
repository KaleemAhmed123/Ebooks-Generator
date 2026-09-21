## Do the numbers in two minutes

- Three numbers, one order of magnitude each: requests per second, bytes stored, bytes per second on the wire. Everything else is derived from those and the latency table in booklet 01
- A day is 86 400 seconds. Divide by 100 000 instead; the answer is 14 % low and arrives in one step. Peak is 3–5× the average unless the requirements say otherwise
- Storage is writes per day × bytes per row × days kept. Bandwidth is requests per second × bytes per response. Round every input to one significant figure before multiplying, not after

```ts
const qps = (perDay: number) => perDay / 100_000;      // ≈ ÷ 86 400, 14 % low
const bytes = (writesPerDay: number, rowBytes: number, days: number) =>
  writesPerDay * rowBytes * days;

// 10 M users × 5 actions/day
qps(50e6);                       // 500 avg → 1 500–2 500 peak
qps(50e6 * 100);                 // 100 reads per write → 50 000 read QPS
bytes(50e6, 500, 365 * 5) / 1e12; // 500 B rows, 5 years → ≈ 46 TB
```

- Say the shape, not the digits: "about 500 writes a second, fifty thousand reads, tens of terabytes over five years". The number that matters is the one that changes the design: 50 000 reads a second is a cache; 46 TB is not one machine
- Each design module below opens with this page's arithmetic for its own inputs. The inputs are stated as assumptions ("say 10 M users"); the derived numbers are what the diagrams carry

### The failure

- Three significant figures on a whiteboard. Two minutes become ten, the arithmetic goes wrong in front of the interviewer, and the result was never going to change a decision. 579 and 500 buy the same cache
