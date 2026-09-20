## Why partition

- A Partition is the atomic unit of parallelism in a distributed log. 
- A Topic is just a logical name (e.g. `user-events`). Under the hood, the Topic is split into multiple Partitions (e.g. 10 partitions). Each partition is a physical, append-only file sitting on a hard drive somewhere in the cluster

<svg viewBox="0 0 460 140" role="img" aria-label="Why partition. A Topic is split into 3 partitions. Partition 0 is on Broker A, Partition 1 on Broker B, Partition 2 on Broker C. Shows horizontal scale." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="60" y="74" text-anchor="middle" font-weight="bold">Topic: Users</text>
  
  <rect x="180" y="20" width="100" height="25" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="36" text-anchor="middle" font-weight="bold">Partition 0</text>
  <text x="340" y="36" text-anchor="middle" font-size="6">Broker A (Disk 1)</text>
  
  <rect x="180" y="55" width="100" height="25" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="71" text-anchor="middle" font-weight="bold">Partition 1</text>
  <text x="340" y="71" text-anchor="middle" font-size="6">Broker B (Disk 2)</text>
  
  <rect x="180" y="90" width="100" height="25" rx="3" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="230" y="106" text-anchor="middle" font-weight="bold">Partition 2</text>
  <text x="340" y="106" text-anchor="middle" font-size="6">Broker C (Disk 3)</text>
  
  <path d="M100 65 L180 32" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 32 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-20 180 32)"/>
  <path d="M100 70 L180 67" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 67 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M100 75 L180 102" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 102 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(20 180 102)"/>
</svg>

- Because one partition lives on one server, the max throughput of a single partition is bounded by the disk I/O of that server. To scale beyond one machine, you simply increase the partition count. 
- Furthermore, because a partition is assigned to exactly one consumer, the partition count dictates the maximum number of parallel consumers you can deploy

### The failure

- One partition equals one consumer equals your ceiling. If you create a topic and forget to specify the partition count, many Kafka providers default to `partitions=1`. You deploy your app and everything runs fine for a month. Then Black Friday hits. You need to process 50x more orders. You scale your Kubernetes pods from 1 to 50. But because there is only 1 partition, 49 of those pods sit completely idle. Your entire system is bottlenecked by the single pod reading that single partition, and you suffer a massive outage
