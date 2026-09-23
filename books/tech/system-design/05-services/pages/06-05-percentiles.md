## Percentiles, not averages

- Nine requests at 10 ms and one at 1 000 ms: the mean is 109 ms, a latency none of the ten experienced. The median is 10 ms and the slowest is 1 000 ms, and those two numbers describe what actually happened

<svg viewBox="0 0 460 120" role="img" aria-label="A latency distribution with a long tail. Most requests pile up in a narrow spike on the left, marked p50. A thin tail stretches far to the right, with p95 partway along it and p99 near the end. The arithmetic mean, marked in orange, falls out in the sparse tail between p95 and p99, at a latency almost no request actually had, and it is the number shown on most dashboards." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="44" y="86" width="12" height="4" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="60" y="76" width="12" height="14" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="76" y="52" width="12" height="38" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="92" y="28" width="12" height="62" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="108" y="20" width="12" height="70" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="124" y="38" width="12" height="52" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="140" y="56" width="12" height="34" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="156" y="68" width="12" height="22" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="172" y="75" width="12" height="15" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="188" y="79" width="12" height="11" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="204" y="82" width="12" height="8" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="220" y="84" width="12" height="6" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="236" y="85" width="12" height="5" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="252" y="86" width="12" height="4" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="268" y="87" width="12" height="3" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="284" y="87" width="12" height="3" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="300" y="88" width="12" height="2" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="316" y="88" width="12" height="2" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="332" y="88" width="12" height="2" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="348" y="89" width="12" height="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="364" y="89" width="12" height="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="380" y="89" width="12" height="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="396" y="89" width="12" height="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <rect x="412" y="89" width="12" height="1" fill="#e6f2ff" stroke="#1d4e89" stroke-width="0.5"/>
  <line x1="114" y1="14" x2="114" y2="90" stroke="#1d4e89" stroke-dasharray="2 2"/><text x="114" y="11" text-anchor="middle" font-size="7" fill="#1d4e89">p50</text>
  <line x1="290" y1="14" x2="290" y2="90" stroke="#1d4e89" stroke-dasharray="2 2"/><text x="290" y="11" text-anchor="middle" font-size="7" fill="#1d4e89">p95</text>
  <line x1="386" y1="14" x2="386" y2="90" stroke="#1d4e89" stroke-dasharray="2 2"/><text x="386" y="11" text-anchor="middle" font-size="7" fill="#1d4e89">p99</text>
  <line x1="322" y1="20" x2="322" y2="96" stroke="#bf4c28" stroke-dasharray="3 2"/><text x="322" y="105" text-anchor="middle" font-size="7" fill="#bf4c28">mean</text>
  <line x1="40" y1="90" x2="446" y2="90" stroke="#333"/>
  <text x="4" y="56" font-size="6.5">requests</text>
  <text x="446" y="103" text-anchor="end" font-size="6.5">latency →</text>
  <text x="4" y="117" font-size="7.5" fill="#bf4c28">✕ the mean lands in the sparse tail — a latency almost nobody had, and the number on most dashboards</text>
</svg>

- At fan-out the tail is the common case, not a rare inconvenience: one call in a hundred being slow becomes most requests being slow once a request touches a hundred services (Module 3, page 4)
- Percentiles do not average. A p99 of 100 ms and one of 300 ms do not make a fleet p99 of 200 ms; the number is unrecoverable from the two summaries. Instances emit histogram buckets and the percentile is computed once, centrally

:::interview
"Why report p99 rather than the average?" — The average is a single number over a distribution with two populations in it: the fast normal path and a slow tail with a different cause. It moves when either one moves and tells you nothing about which, and a few very slow requests drag it to a value no user experienced. p50 describes the typical request, p99 describes the request that makes someone leave, and the two move independently — a change that helps the median and hurts the tail looks like an improvement on the average.
:::

### The failure

- Averaging percentiles across instances, usually by accident: a dashboard set to `avg` over a per-instance p99 series. The curve is plausible, no statistic produces it, it understates the tail, and nothing on the graph says so
