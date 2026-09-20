## Stateful processing

- If you are aggregating data across a 1-hour window, where does the intermediate data live? 
- It lives in **State**. To sum up the total revenue for an hour, the stream processor must hold the running total in memory until the window closes. 

<svg viewBox="0 0 460 140" role="img" aria-label="Stateful processing in Flink. The Worker Node keeps State in local RocksDB (RAM/SSD). Every 10 seconds, it Checkpoints this state to Amazon S3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Stream Worker</text>
  
  <rect x="70" y="45" width="80" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="110" y="60" text-anchor="middle" font-weight="bold" fill="#1d4e89">State</text>
  <text x="110" y="70" text-anchor="middle" font-size="6" fill="#1d4e89">(Embedded RocksDB)</text>
  
  <path d="M170 60 L280 60" stroke="#1a1a1a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M280 60 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="225" y="55" text-anchor="middle" font-weight="bold">Checkpoint</text>
  <text x="225" y="75" text-anchor="middle" font-size="6">Every 10 seconds</text>
  
  <rect x="290" y="20" width="100" height="100" rx="10" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="340" y="65" text-anchor="middle" font-weight="bold" fill="#1d4e89">Amazon S3</text>
  <text x="340" y="75" text-anchor="middle" font-size="6" fill="#1d4e89">(Durable Storage)</text>
</svg>

- Heavy-duty stream processors like Apache Flink use an embedded database (like RocksDB) inside the worker pod to hold this state with millisecond latency. To prevent data loss if the pod crashes, Flink periodically writes a "Checkpoint" of the state to durable storage (like S3).

### The failure

- Doing stateful aggregations in a stateless Node.js consumer. A developer doesn't want to deploy Flink. They write a Node.js script that consumes a Kafka topic and maintains a `let revenue = 0` variable in memory. Every hour, it logs the revenue. After 45 minutes, Kubernetes kills the pod to deploy a patch. The pod restarts. The `revenue` variable resets to 0. The developer has just lost 45 minutes of data. If you are aggregating data across time, you must use a framework that provides durable, checkpointed state management
