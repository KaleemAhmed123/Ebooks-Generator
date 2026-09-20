## Windowing: Tumbling vs Hopping

- When aggregating continuous streams (e.g., "count the number of clicks"), you must slice the infinite stream into finite buckets. These are called **Windows**.
- **Tumbling Windows** are fixed-size, non-overlapping intervals (e.g., exactly 12:00 to 12:05, then 12:05 to 12:10).
- **Hopping Windows** (or Sliding Windows) are fixed-size, overlapping intervals (e.g., a 5-minute window that advances by 1 minute).

<svg viewBox="0 0 460 140" role="img" aria-label="Tumbling vs Hopping Windows. Tumbling shows three distinct 5m boxes next to each other. Hopping shows three 5m boxes overlapping each other, shifting by 1m." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="20" y="25" text-anchor="start" font-weight="bold">Tumbling Windows (5m)</text>
  <rect x="20" y="40" width="100" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <rect x="120" y="40" width="100" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <rect x="220" y="40" width="100" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="70" y="53" text-anchor="middle" font-size="6">12:00 - 12:05</text>
  <text x="170" y="53" text-anchor="middle" font-size="6">12:05 - 12:10</text>
  <text x="270" y="53" text-anchor="middle" font-size="6">12:10 - 12:15</text>
  
  <text x="20" y="85" text-anchor="start" font-weight="bold">Hopping Windows (5m size, 1m hop)</text>
  <rect x="20" y="100" width="100" height="10" fill="#e2fcf3" stroke="#1a1a1a" opacity="0.8"/>
  <rect x="40" y="110" width="100" height="10" fill="#e2fcf3" stroke="#1a1a1a" opacity="0.8"/>
  <rect x="60" y="120" width="100" height="10" fill="#e2fcf3" stroke="#1a1a1a" opacity="0.8"/>
  <rect x="80" y="130" width="100" height="10" fill="#e2fcf3" stroke="#1a1a1a" opacity="0.8"/>
</svg>

- Tumbling windows are perfect for daily reporting or hourly roll-ups. Hopping windows are perfect for real-time dashboards and moving averages.

### The failure

- Calculating a "rolling 5 minute average" using tumbling windows. A developer wants to alert if the error rate exceeds 5% in the last 5 minutes. They use a 5-minute Tumbling Window. A massive burst of errors occurs from 12:04 to 12:06. Because this burst is split perfectly across the 12:00-12:05 window and the 12:05-12:10 window, the average *within* each individual window is only 3%. The alert never fires, even though the rolling 5-minute average at 12:06 was actually 8%. You must use a Hopping Window for rolling metrics
