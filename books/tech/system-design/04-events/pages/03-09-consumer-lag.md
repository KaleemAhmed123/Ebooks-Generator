## Consumer lag

- **Lag** is the end offset of a partition minus the group's committed offset for it: how many records are written and not yet done. It is the one number that says whether the consumers are keeping up

<svg viewBox="0 0 460 140" role="img" aria-label="Consumer lag per partition. A bar chart showing lag. Partition 0 has 5 lag. Partition 1 has 10 lag. Partition 2 has 500,000 lag (stuck). Partition 3 has 2 lag." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 110 L400 110" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M50 110 L50 20" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  
  <text x="40" y="25" text-anchor="end" font-size="6">500k -</text>
  <text x="40" y="65" text-anchor="end" font-size="6">250k -</text>
  <text x="40" y="105" text-anchor="end" font-size="6">0 -</text>
  
  <rect x="80" y="105" width="40" height="5" fill="#1d4e89"/>
  <text x="100" y="125" text-anchor="middle" font-size="6">Partition 0</text>
  
  <rect x="150" y="100" width="40" height="10" fill="#1d4e89"/>
  <text x="170" y="125" text-anchor="middle" font-size="6">Partition 1</text>
  
  <rect x="220" y="25" width="40" height="85" fill="#b8541a"/>
  <text x="240" y="125" text-anchor="middle" font-weight="bold" fill="#b8541a">Partition 2</text>
  <text x="240" y="15" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">STUCK!</text>
  
  <rect x="290" y="108" width="40" height="2" fill="#1d4e89"/>
  <text x="310" y="125" text-anchor="middle" font-size="6">Partition 3</text>
</svg>

- Lag that rises during a burst and returns to zero is load levelling working (Module 1, page 2). Lag that rises and keeps rising means the consume rate is below the produce rate, and the arithmetic in Module 6, page 6 says how long until retention starts eating unread data
- Read it in time as well as records: lag of 4,000,000 on a partition draining 10,000 per second is seven minutes; lag of 500 on a partition draining nothing is forever. Kafka's tooling reports records; the useful alert converts to seconds using the recent consume rate
- Lag is per partition because assignment is per partition. One partition can be stuck while its neighbours are current

### The failure

- Alerting on the sum. Fifty partitions, an alert on total lag above 10,000. One poison record (Module 6, page 2) crashes the consumer of partition 2 on every attempt; its lag creeps to 5,000 while the other forty-nine sit at zero. The sum never crosses the line. One fiftieth of the keys are frozen, and the dashboard is green
