## NTP, drift and leap seconds

- A quartz clock drifts. Spanner's design budgets 200 µs per second of drift per machine, and its clocks are better than most. Left alone, two servers disagree by seconds within a day
- **NTP** (Network Time Protocol) corrects the drift from a reference. A small error is **slewed**: the clock runs slightly fast or slow until it catches up. A large one is **stepped**: the clock jumps, forwards or backwards. How accurate the result is depends on the network path to the reference and cannot be assumed; the HLC paper notes errors of 100 ms or more happen

<svg viewBox="0 0 460 120" role="img" aria-label="A graph of a machine's clock error against true time. The error grows linearly, drift, until NTP steps the clock and the error drops to near zero in an instant, then grows again. A second correction is a slew: the error slope bends back to zero gradually with no jump." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="40" y1="90" x2="440" y2="90" stroke="#1a1a1a"/>
  <line x1="40" y1="90" x2="40" y2="14" stroke="#1a1a1a"/>
  <text x="440" y="102" text-anchor="end" font-size="7">true time →</text>
  <text x="44" y="20" font-size="7">clock error</text>
  <path d="M40 90 L180 40" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M180 40 L180 88" stroke="#b8541a" fill="none" stroke-width="1.5" stroke-dasharray="3 2"/>
  <path d="M180 88 L330 36" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M330 36 C370 22, 400 60, 440 88" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <text x="100" y="52" font-size="7" fill="#1d4e89">drift: ~200 µs/s in Spanner's budget</text>
  <text x="186" y="66" font-size="7" fill="#b8541a">step: the clock jumps back;</text>
  <text x="186" y="75" font-size="7" fill="#b8541a">Date.now() goes backwards</text>
  <text x="352" y="30" font-size="7" fill="#1d4e89">slew: rate changed,</text>
  <text x="352" y="39" font-size="7" fill="#1d4e89">no jump, seconds vary in length</text>
</svg>

- **Leap seconds** are the scheduled jump. UTC inserts a 23:59:60 to stay aligned with the Earth's rotation; most kernels cannot represent it and either repeat 23:59:59 or step the clock; some operators smear the second across a longer window instead. Both ways, `now − before` can be zero or negative across the event
- Cloudflare, 1 January 2017: at the leap second Go's `time.Now()` went backwards; the DNS load balancer computed a negative duration; `rand.Int63n()` panics on a negative argument; DNS resolution failed for some customers until the fix, a check for negative differences, shipped by 06:45 UTC

### The failure

- Ordering events across machines by wall-clock timestamps at sub-second resolution. Two servers whose NTP paths differ can disagree by more than the events are apart, and one of them was stepped an hour ago. Page 3 is what that does to writes
