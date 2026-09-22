## Downsampling and alerting

- **Downsampling** replaces a run of samples with one summary per coarser interval, and the summary must keep more than the average: min, max, sum and count, so a spike survives the rollup and a rate can still be computed. **Alerting** evaluates rules on a schedule against the freshest window and fires when a condition has held for a duration

<svg viewBox="0 0 460 150" role="img" aria-label="Retention tiers and the alert path. Three tiers in a row: raw samples every 10 seconds kept 2 weeks, about 1.65 terabytes compressed; 1-minute rollups of min, max, sum and count kept 3 months, about 1.5 terabytes; 1-hour rollups kept the full year, about 90 gigabytes; total about 3.3 terabytes against 43 terabytes for a year at full resolution. A rollup job reads sealed blocks, page 4, and writes the next tier; the raw tier is dropped block by block when it ages out. Above the tiers, the alert evaluator runs every rule on a schedule against the head block in memory, the last two hours, and hands firing alerts to a notifier that groups and routes them, Module 5 for the delivery. An orange cross marks alert evaluation reading cold storage: a rule that scans a week of blocks every 15 seconds times out, and a silent timeout is a silent alert." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="8" width="130" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="71" y="21" text-anchor="middle">alert evaluator</text><text x="71" y="33" text-anchor="middle" font-size="7">every rule, every 15 s, hot window only</text>
  <rect x="166" y="8" width="90" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="211" y="21" text-anchor="middle">head block</text><text x="211" y="33" text-anchor="middle" font-size="7">last 2 h in memory (page 4)</text>
  <line x1="166" y1="25" x2="136" y2="25" stroke="#333" marker-end="url(#d)"/><text x="151" y="20" text-anchor="middle" font-size="7">read</text>
  <rect x="286" y="8" width="168" height="34" rx="3" fill="#fff" stroke="#b8541a"/><text x="370" y="21" text-anchor="middle">notifier: group, route, page someone</text><text x="370" y="33" text-anchor="middle" font-size="7">delivery is Module 5; "for 5m" is evaluated here first</text>
  <line x1="71" y1="42" x2="71" y2="52" stroke="#b8541a"/><line x1="71" y1="52" x2="370" y2="52" stroke="#b8541a"/><line x1="370" y1="52" x2="370" y2="43" stroke="#b8541a" marker-end="url(#o)"/><text x="220" y="50" text-anchor="middle" font-size="7" fill="#b8541a">firing</text>
  <text x="6" y="64" font-size="7.5" fill="#1d4e89">retention tiers for 10 M series (page 1's assumptions)</text>
  <rect x="6" y="72" width="140" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="76" y="85" text-anchor="middle">raw, every 10 s</text><text x="76" y="97" text-anchor="middle" font-size="7">kept 2 weeks: ≈ 1.65 TB compressed</text><text x="76" y="108" text-anchor="middle" font-size="7">dropped block by block as it ages</text>
  <rect x="166" y="72" width="140" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="236" y="85" text-anchor="middle">1-minute rollups</text><text x="236" y="97" text-anchor="middle" font-size="7">min, max, sum, count per series</text><text x="236" y="108" text-anchor="middle" font-size="7">kept 3 months: ≈ 1.5 TB</text>
  <rect x="326" y="72" width="128" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="390" y="85" text-anchor="middle">1-hour rollups</text><text x="390" y="97" text-anchor="middle" font-size="7">same four fields</text><text x="390" y="108" text-anchor="middle" font-size="7">kept the year: ≈ 90 GB</text>
  <line x1="146" y1="94" x2="166" y2="94" stroke="#333" marker-end="url(#d)"/><text x="156" y="89" text-anchor="middle" font-size="7">roll</text>
  <line x1="306" y1="94" x2="326" y2="94" stroke="#333" marker-end="url(#d)"/><text x="316" y="89" text-anchor="middle" font-size="7">roll</text>
  <text x="6" y="130" font-size="7">total ≈ 3.3 TB for the year, against ≈ 43 TB at full resolution; the rollup job reads sealed blocks and writes the next tier</text>
  <text x="6" y="144" font-size="7.5" fill="#bf4c28">✕ alert evaluation reading cold storage: a rule scanning a week of blocks every 15 s times out, and a timed-out rule is a silent alert</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
  </defs>
</svg>

- A rule is a query plus a duration: "error rate over 5 % for 5 minutes". The duration is what keeps a one-sample blip from paging anyone, and it is why the rule must read the hot window, where the last five minutes are; a rule that needs last week is a report, not an alert
- Prometheus's own docs draw the line this pipeline lives behind: it collects and aggregates, and if you need 100 % accuracy, such as for per-request billing, it is not a good choice. Counting money is Module 16, with a raw log and a reconciliation step; this pipeline drops a sample when it must and nobody is paged for it

### The failure

- Alert rules that read cold storage. The evaluator runs every rule every few seconds; one rule over a month of data turns each cycle into a scan of hundreds of blocks, the cycle overruns, later rules are skipped or time out, and the alert that would have fired does not. The evaluator reads memory, always
