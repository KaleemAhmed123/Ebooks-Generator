## Push vs pull

- Pull: the collector fetches `/metrics` from every target on a schedule. Push: every target sends to the collector. Prometheus pulls over HTTP, and each server is autonomous with its own local storage, no distributed storage between them; logs go the other way, pushed from the host through a broker

<svg viewBox="0 0 460 170" role="img" aria-label="Metrics and logging pipeline, whole design. Top, the pull path: services expose an HTTP endpoint slash metrics; service discovery lists the targets; a Prometheus server scrapes each target every 10 seconds, 1 million samples a second across the servers, appends to its own local time-series storage, page 4, evaluates alert rules on the hot window, page 5, and answers queries. A short-lived job that ends before a scrape pushes its final values to a Pushgateway, which the server scrapes like any target. Bottom, the log path: each process writes structured log lines; an agent on the host tails them and pushes to a Kafka topic, booklet 04; an indexer indexes a few labels and stores the lines in a log store with cold copies in object storage; the same agent can forward traces. An orange cross marks pulling a 5-second batch job: the scrape every 10 seconds never sees it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">pull path: metrics</text>
  <rect x="6" y="20" width="84" height="40" rx="3" fill="#fff" stroke="#333"/><text x="48" y="33" text-anchor="middle">services</text><text x="48" y="44" text-anchor="middle" font-size="7">expose GET /metrics</text><text x="48" y="54" text-anchor="middle" font-size="7">counters, gauges (page 2)</text>
  <rect x="6" y="66" width="84" height="26" rx="3" fill="#fff" stroke="#333"/><text x="48" y="77" text-anchor="middle" font-size="7">short job → Pushgateway</text><text x="48" y="87" text-anchor="middle" font-size="7">pushes its final values</text>
  <rect x="120" y="20" width="70" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="155" y="31" text-anchor="middle" font-size="7.5">service discovery</text><text x="155" y="41" text-anchor="middle" font-size="7">the target list</text>
  <rect x="220" y="20" width="124" height="72" rx="3" fill="#fff" stroke="#1d4e89"/><text x="282" y="33" text-anchor="middle">Prometheus servers</text><text x="282" y="45" text-anchor="middle" font-size="7">scrape every target every 10 s</text><text x="282" y="55" text-anchor="middle" font-size="7">1 M samples/s in total (page 1)</text><text x="282" y="66" text-anchor="middle" font-size="7">each autonomous: own local storage,</text><text x="282" y="76" text-anchor="middle" font-size="7">no distributed store between them</text><text x="282" y="87" text-anchor="middle" font-size="7">rules on the hot window (page 5)</text>
  <line x1="190" y1="33" x2="220" y2="33" stroke="#333" marker-end="url(#d)"/>
  <line x1="220" y1="50" x2="90" y2="40" stroke="#1d4e89" marker-end="url(#b)"/><text x="150" y="58" text-anchor="middle" font-size="7" fill="#1d4e89">scrape (pull)</text>
  <line x1="220" y1="80" x2="90" y2="80" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="374" y="20" width="80" height="32" rx="3" fill="#e6f2ff" stroke="#333"/><text x="414" y="33" text-anchor="middle">local TSDB</text><text x="414" y="44" text-anchor="middle" font-size="7">blocks on disk (page 4)</text>
  <line x1="344" y1="36" x2="374" y2="36" stroke="#333" marker-end="url(#d)"/>
  <rect x="374" y="60" width="80" height="32" rx="3" fill="#fff" stroke="#333"/><text x="414" y="73" text-anchor="middle">alerts, queries</text><text x="414" y="84" text-anchor="middle" font-size="7">page 5</text>
  <line x1="344" y1="76" x2="374" y2="76" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="112" font-size="7.5" fill="#1d4e89">push path: logs (and traces)</text>
  <rect x="6" y="120" width="84" height="30" rx="3" fill="#fff" stroke="#333"/><text x="48" y="132" text-anchor="middle">process log lines</text><text x="48" y="143" text-anchor="middle" font-size="7">structured, with the ids</text>
  <rect x="120" y="120" width="70" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="155" y="132" text-anchor="middle">host agent</text><text x="155" y="143" text-anchor="middle" font-size="7">tails, batches, pushes</text>
  <line x1="90" y1="135" x2="120" y2="135" stroke="#333" marker-end="url(#d)"/>
  <rect x="220" y="120" width="70" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="255" y="132" text-anchor="middle">Kafka</text><text x="255" y="143" text-anchor="middle" font-size="7">booklet 04</text>
  <line x1="190" y1="135" x2="220" y2="135" stroke="#333" marker-end="url(#d)"/>
  <rect x="320" y="120" width="134" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="387" y="132" text-anchor="middle">indexer → log store</text><text x="387" y="143" text-anchor="middle" font-size="7">few labels indexed (page 6)</text>
  <line x1="290" y1="135" x2="320" y2="135" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="166" font-size="7.5" fill="#bf4c28">✕ pulling a 5-second batch job: it starts and ends between two scrapes and is never seen; hence the Pushgateway</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Pull gives the collector the rate and a built-in liveness check: a scrape that fails is itself the signal that the target is down, and a target needs no address to send to. Push fits what a scrape cannot catch: a job that lives for seconds, and logs, which are events with ids, not samples of a number

:::interview
"Push or pull for metrics, and why?" — Pull. The server owns the schedule, so a fleet cannot flood it; a failed scrape is the down-detector for free; and targets carry no config about where to send. Push where there is nothing to scrape: short-lived jobs, through a gateway the server scrapes instead, and logs, which are pushed through a broker because they are events, not samples. The rule is "samples are pulled, events are pushed".
:::

### The failure

- Pull for a short-lived job. A batch that runs five seconds every hour starts and ends between two 10-second scrapes; its counters exist for no scrape, and the dashboard shows a job that never ran. The job pushes its final values to a gateway that outlives it, and the gateway is scraped like anything else
