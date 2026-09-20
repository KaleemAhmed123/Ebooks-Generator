## Coordinated omission

- Most load generators are **closed-loop**: send a request, wait for the reply, send the next
- When the system stalls, the generator stalls with it. It records one slow request for the whole pause, then resumes as if nothing happened
- The requests that *should* have been sent during the pause are never sent, so they are never measured. Gil Tene named this **coordinated omission**: the load generator cooperates with the system in hiding the stall

<svg viewBox="0 0 460 92" role="img" aria-label="Timeline: intended sends every 10 ms continue through a 1 second stall; actual sends stop during the stall and record a single slow sample" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="8" y="24">intended</text>
  <line x1="70" y1="20" x2="450" y2="20" stroke="#e0e0e4"/>
  <g fill="#1d4e89">
    <rect x="70" y="16" width="2" height="8"/><rect x="90" y="16" width="2" height="8"/><rect x="110" y="16" width="2" height="8"/><rect x="130" y="16" width="2" height="8"/>
    <rect x="150" y="16" width="2" height="8"/><rect x="170" y="16" width="2" height="8"/><rect x="190" y="16" width="2" height="8"/><rect x="210" y="16" width="2" height="8"/><rect x="230" y="16" width="2" height="8"/><rect x="250" y="16" width="2" height="8"/><rect x="270" y="16" width="2" height="8"/><rect x="290" y="16" width="2" height="8"/><rect x="310" y="16" width="2" height="8"/><rect x="330" y="16" width="2" height="8"/>
    <rect x="350" y="16" width="2" height="8"/><rect x="370" y="16" width="2" height="8"/><rect x="390" y="16" width="2" height="8"/><rect x="410" y="16" width="2" height="8"/><rect x="430" y="16" width="2" height="8"/>
  </g>
  <text x="8" y="58">actual</text>
  <line x1="70" y1="54" x2="450" y2="54" stroke="#e0e0e4"/>
  <g fill="#1a1a1a">
    <rect x="70" y="50" width="2" height="8"/><rect x="90" y="50" width="2" height="8"/><rect x="110" y="50" width="2" height="8"/><rect x="130" y="50" width="2" height="8"/>
    <rect x="350" y="50" width="2" height="8"/><rect x="370" y="50" width="2" height="8"/><rect x="390" y="50" width="2" height="8"/><rect x="410" y="50" width="2" height="8"/><rect x="430" y="50" width="2" height="8"/>
  </g>
  <rect x="132" y="46" width="216" height="16" fill="none" stroke="#6b6b6b" stroke-dasharray="3 2"/>
  <text x="240" y="82" text-anchor="middle" fill="#6b6b6b">1 s stall · 100 requests owed · 1 sample recorded</text>
</svg>

### How wrong it gets

- One request every 10 ms, each answered in 1 ms, then one 1-second pause. A hundred requests were owed during the pause; one was recorded. Naive p99: 1 ms. Truth: a hundred requests waited up to a second, and a 100-second run reports one of them
- The benchmark reports a system with no tail. Production has a tail. The benchmark was the thing that was broken

### The fix

- An **open-loop** generator sends on schedule whether or not the last reply came back. It measures what users would have experienced, and it loads the system the way real traffic does
- Or correct after the fact: HdrHistogram, the latency-recording library, has `recordValueWithExpectedInterval`, which fills in the missing samples from the intended send interval
- When someone quotes a p99 from a load test, ask which loop it was. A closed-loop p99 is a lower bound on the truth
