## Integration vs End-to-End

An integration test runs your code against one real dependency — the actual
database, the actual broker — with the rest stubbed. An end-to-end test drives
the deployed system the way a user would.

Google's published guidance puts the mix near 70% unit, 20% integration, 10%
end-to-end, on the grounds that an end-to-end failure reports a symptom.

| | Integration | End-to-end |
|---|---|---|
| Real components | one | all of them |
| A failure tells you | which boundary broke | that something broke |
| Feedback | seconds | minutes |

**The cost of an end-to-end suite is triage, not runtime.**

## Load vs Stress vs Soak

Three tests asking three questions. Load runs expected traffic and checks normal
still holds. Stress pushes past expected until something gives, and names what
gives first. Soak holds ordinary traffic for hours. k6 puts load and stress at
5-60 minutes and soak in hours.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three load profiles over time: a load test ramps to a plateau and back down, a stress test ramps past the capacity line, and a soak test holds flat traffic for hours while memory climbs steadily">
  <text x="8" y="10" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">LOAD</text>
  <path d="M8 72 H138" stroke="#e0e0e4" stroke-width="1"/>
  <path d="M8 72 L40 30 L106 30 L138 72" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="8" y="86" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">expected traffic</text>
  <text x="164" y="10" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">STRESS</text>
  <path d="M164 72 H294" stroke="#e0e0e4" stroke-width="1"/>
  <path d="M164 26 H294" stroke="#6b6b6b" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="248" y="22" font-family="Georgia,serif" font-size="8" fill="#6b6b6b">capacity</text>
  <path d="M164 72 L294 16" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="164" y="86" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">past the limit</text>
  <text x="320" y="10" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">SOAK</text>
  <path d="M320 72 H450" stroke="#e0e0e4" stroke-width="1"/>
  <path d="M320 72 L332 48 L450 48" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <path d="M332 66 L450 24" fill="none" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="400" y="20" font-family="Georgia,serif" font-size="8.5" fill="#0d7a7a">memory</text>
  <text x="320" y="86" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">hours at normal</text>
</svg>

**Soak is the one that gets cut for time and the one that finds leaks.** A slow
allocation leak or a connection never returned to the pool is invisible at
thirty minutes and fatal by hour six.
