## Consumer groups

- A **consumer group** is a name shared by a set of consumers. Kafka assigns each partition of the subscribed topics to exactly one member of the group at a time, so the group reads every record once and in parallel across partitions

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

- Groups are independent. Billing, as group A with three members, reads six partitions two each; search, as group B with one member, reads all six. Each group stores its own offsets (page 4); neither sees the other's progress
- Membership is dynamic. A member joins or leaves, and the group's assignment changes (page 5). Scaling out is starting another process with the same `group.id`
- The unit of parallelism is the partition, not the consumer. Six partitions means at most six members do work

### The failure

- More consumers than partitions. Six partitions, ten pods: four pods hold no partition and process nothing, indefinitely. Autoscaling on CPU makes it worse, since idle pods look healthy. The ceiling is set when the topic is created (Module 4, page 6), or lifted with share groups (page 8)
