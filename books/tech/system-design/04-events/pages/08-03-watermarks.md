## Watermarks

- If you are aggregating data by Event Time, how do you know when you can safely output the result for 10:00 to 10:05? You have to wait for late data, but you can't wait forever.
- Stream processors use **Watermarks**. A watermark is a heuristic that declares: "I am confident that I will not see any more events with an Event Time older than $X$."

<svg viewBox="0 0 460 140" role="img" aria-label="Watermarks. A timeline showing Event Time. Events from 10:01 and 10:03 arrive. The Watermark is currently at 10:02. A late event from 10:01 arrives. The Watermark has already passed it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 70 L400 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="250" y="100" text-anchor="middle" font-weight="bold">Event Time Timeline</text>
  
  <circle cx="100" cy="70" r="4" fill="#1d4e89"/>
  <text x="100" y="55" text-anchor="middle" font-size="6">10:01</text>
  
  <circle cx="150" cy="70" r="4" fill="#1d4e89"/>
  <text x="150" y="55" text-anchor="middle" font-size="6">10:03</text>
  
  <circle cx="200" cy="70" r="4" fill="#1d4e89"/>
  <text x="200" y="55" text-anchor="middle" font-size="6">10:04</text>
  
  <path d="M125 40 L125 100" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="125" y="35" text-anchor="middle" font-weight="bold" fill="#b8541a">Watermark (10:02)</text>
  
  <circle cx="80" cy="40" r="4" fill="#b8541a"/>
  <text x="80" y="25" text-anchor="middle" font-size="6" fill="#b8541a">Late Event (10:01)</text>
  <path d="M80 45 L100 65" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M100 65 l-3 -6 h6 z" fill="#b8541a" transform="rotate(45 100 65)"/>
</svg>

- Watermarks are usually configured as `Current Max Event Time - Allowed Lateness`. If you see an event for 10:05, and your allowed lateness is 3 minutes, your watermark advances to 10:02. Any event older than 10:02 is now officially "late".

### The failure

- Setting a watermark too tight and dropping late arriving events. If you configure a stream processor to allow 0 seconds of lateness, your watermark advances immediately with the newest event. If a user's phone drops signal for 5 seconds, all their events will arrive *behind* the watermark. The stream processor will silently drop them because it has already closed the aggregation window for that time period. If you need 100% accuracy, you must tolerate higher latency by configuring a larger watermark delay
