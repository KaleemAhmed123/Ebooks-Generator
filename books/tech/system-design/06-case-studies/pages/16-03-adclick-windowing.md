## Windowed aggregation

- A **tumbling window** is a fixed, non-overlapping interval, here one minute, and every click belongs to exactly one. Which one is decided by **event time**, when the click happened on the device, not **processing time**, when the aggregator saw it. Booklet 04 owns event time and watermarks; this page is what they do to an invoice

<svg viewBox="0 0 460 150" role="img" aria-label="Event-time windows with a watermark. A timeline shows three one-minute windows, 10:00, 10:01 and 10:02, on event time. Four clicks: A at 10:00:30 arrives at 10:00:31 and lands in 10:00; B at 10:01:10 arrives at 10:01:12 and lands in 10:01; C, clicked at 10:01:50 on a phone that lost signal, arrives at 10:03:20 and still lands in 10:01, because the watermark, defined as no click older than now minus 2 minutes will arrive, has not yet passed 10:02; the 10:01 window closes and is written when the watermark reaches 10:02, at about 10:04. D, clicked at 10:01:55 but arriving at 10:07, is later than the watermark: it goes to a late-clicks table and is added by the nightly batch, page 5, not to the closed window. Below, an orange cross marks processing-time windows: the aggregator is down from 10:01 to 10:06, the backlog drains at 10:06, and six minutes of clicks land in the 10:06 window; every per-minute count for that ad is wrong and the sum is right." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">event-time windows, one minute each, closed by the watermark = now − 2 min</text>
  <line x1="40" y1="40" x2="440" y2="40" stroke="#333"/>
  <rect x="40" y="22" width="130" height="18" fill="#e6f2ff" stroke="#333"/><text x="105" y="34" text-anchor="middle" font-size="7.5">window 10:00</text>
  <rect x="170" y="22" width="130" height="18" fill="#e6f2ff" stroke="#1d4e89" stroke-width="1.5"/><text x="235" y="34" text-anchor="middle" font-size="7.5">window 10:01</text>
  <rect x="300" y="22" width="130" height="18" fill="#e6f2ff" stroke="#333"/><text x="365" y="34" text-anchor="middle" font-size="7.5">window 10:02</text>
  <text x="105" y="54" text-anchor="middle" font-size="7">A: 10:00:30, arrived 10:00:31 → 10:00</text>
  <text x="235" y="54" text-anchor="middle" font-size="7">B: 10:01:10, arrived :12 → 10:01</text>
  <text x="235" y="66" text-anchor="middle" font-size="7" fill="#1d4e89">C: clicked 10:01:50, arrived 10:03:20 → still 10:01</text>
  <text x="235" y="76" text-anchor="middle" font-size="7" fill="#1d4e89">(watermark at 10:03:20 is 10:01:20, window still open)</text>
  
  <text x="6" y="96" font-size="7">10:01 closes and is written when the watermark passes 10:02, at ≈ 10:04</text>
  <text x="6" y="108" font-size="7">D: clicked 10:01:55, arrived 10:07 → after the close: late-clicks table, added by the batch (page 5), never into the closed window</text>
  <text x="6" y="128" font-size="7.5" fill="#bf4c28">✕ processing-time windows: aggregator down 10:01–10:06, backlog drains at 10:06, six minutes of clicks land in the</text>
  <text x="6" y="138" font-size="7.5" fill="#bf4c28">10:06 window; every per-minute count for the ad is wrong and the daily sum is right, so nobody notices</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The **watermark** is the aggregator's claim that no event older than a bound will still arrive; when it passes the end of a window, the window is closed, written and its state freed. The bound is a trade: two minutes catches most tunnels and keeps two minutes of windows open per ad; anything later is not lost, it is routed to the batch (page 5), which recomputes from the log without windows at all
- Per-minute windows are the reporting grain; hourly and daily counts are sums of closed minutes, so the minute is the only window the stream computes and the only one that carries dedupe state (page 4)

### The failure

- Processing-time windows. They are what a naive consumer does, they are right as long as nothing is ever delayed, and a five-minute outage moves five minutes of clicks into one bucket without changing the total, so the report looks plausible and every minute in it is wrong. The advertiser who bought 10:01 to 10:02 was billed for 10:06
