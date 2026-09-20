## Consumer groups

- When reading from a partitioned log, we need a way to distribute the work among multiple servers (consumers) while guaranteeing that no two servers read the exact same message.
- This is achieved using **Consumer Groups**. A Consumer Group is a logical label (e.g. `billing-service`) shared by a fleet of workers

<svg viewBox="0 0 460 140" role="img" aria-label="Consumer groups. A Topic with 6 partitions. Group A has 3 consumers (each gets 2 partitions). Group B has 1 consumer (gets all 6 partitions)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="10" width="80" height="120" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="60" y="25" text-anchor="middle" font-weight="bold">Topic</text>
  
  <rect x="30" y="30" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="40" text-anchor="middle" font-size="6">Partition 0</text>
  
  <rect x="30" y="45" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="55" text-anchor="middle" font-size="6">Partition 1</text>
  
  <rect x="30" y="60" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="70" text-anchor="middle" font-size="6">Partition 2</text>
  
  <rect x="30" y="75" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="85" text-anchor="middle" font-size="6">Partition 3</text>
  
  <rect x="30" y="90" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="100" text-anchor="middle" font-size="6">Partition 4</text>
  
  <rect x="30" y="105" width="60" height="12" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="60" y="115" text-anchor="middle" font-size="6">Partition 5</text>
  
  <rect x="180" y="10" width="100" height="120" rx="3" fill="#fcfcfc" stroke="#b8541a"/>
  <text x="230" y="25" text-anchor="middle" font-weight="bold" fill="#b8541a">Group A (Billing)</text>
  
  <rect x="190" y="40" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="53" text-anchor="middle" font-size="6">Consumer 1</text>
  
  <rect x="190" y="70" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="83" text-anchor="middle" font-size="6">Consumer 2</text>
  
  <rect x="190" y="100" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="113" text-anchor="middle" font-size="6">Consumer 3</text>
  
  <rect x="340" y="30" width="100" height="80" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="390" y="45" text-anchor="middle" font-weight="bold" fill="#1d4e89">Group B (Search)</text>
  
  <rect x="350" y="60" width="80" height="40" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="390" y="83" text-anchor="middle" font-size="6">Consumer 1</text>
  
  <path d="M90 40 L190 45" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M90 55 L190 55" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M90 70 L190 75" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M90 85 L190 85" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M90 100 L190 105" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M90 115 L190 115" stroke="#1a1a1a" fill="none" stroke-width="1"/>
</svg>

- **The Golden Rule:** Each partition is read by *exactly one* consumer in a group at any given time.
- Groups are entirely independent. Group A (`Billing`) processes the data at its own pace. Group B (`Search`) maintains its own offsets and processes the data independently

### The failure

- More consumers than partitions equals idle consumers. If you have 6 partitions, the maximum number of active consumers you can have in a group is 6. If you scale your Kubernetes deployment to 10 pods, 4 of those pods will be assigned zero partitions. They will sit idle forever, burning money. You cannot parallelize consumption beyond the partition count
