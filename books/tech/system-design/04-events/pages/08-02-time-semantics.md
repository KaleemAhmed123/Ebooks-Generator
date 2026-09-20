## Event time vs Processing time

- In a streaming system, "Time" is surprisingly complicated. There are two distinct timestamps you must care about.
- **Event Time** is when the event actually happened in the real world (e.g., when the user clicked the button on their phone).
- **Processing Time** is when your stream processor (like Flink) actually sees the event.

<svg viewBox="0 0 460 140" role="img" aria-label="Event time vs Processing time. A user clicks at 10:00 (Event Time). Their phone loses signal. At 10:05 they regain signal. The server processes the click at 10:05 (Processing Time)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Mobile App</text>
  
  <rect x="380" y="50" width="60" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="410" y="74" text-anchor="middle" font-weight="bold">Server</text>
  
  <path d="M80 70 L200 70" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <path d="M260 70 L380 70" stroke="#1d4e89" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M380 70 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <circle cx="90" cy="70" r="4" fill="#1d4e89"/>
  <text x="90" y="45" text-anchor="middle" font-weight="bold" fill="#1d4e89">Event Time</text>
  <text x="90" y="35" text-anchor="middle" font-size="6">10:00:00</text>
  
  <rect x="200" y="60" width="60" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="74" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">No Signal (Lag)</text>
  
  <circle cx="370" cy="70" r="4" fill="#1d4e89"/>
  <text x="370" y="45" text-anchor="middle" font-weight="bold" fill="#1d4e89">Processing Time</text>
  <text x="370" y="35" text-anchor="middle" font-size="6">10:05:00</text>
</svg>

- Because of network lag, retries, and offline mobile devices, Processing Time is almost always later than Event Time. 

### The failure

- Aggregating by processing time when a mobile app was offline. A gaming company runs a promotion: "Double XP between 10:00 and 11:00". A player plays offline from 10:30 to 10:50. They reconnect to WiFi at 11:15. Their phone dumps 20 minutes of gameplay events to the server. If the stream processor calculates XP using *Processing Time* (11:15), the player gets normal XP and complains. If the stream processor calculates using *Event Time* (10:30), the player gets Double XP. You must almost always build aggregations using Event Time, which introduces a new problem: how long do you wait for late data?
