## SQS, SNS, and EventBridge

- Three managed messaging services cover Booklet 4's models without running a broker:
  - **SQS** — a managed **queue** (work distribution, consumed-and-gone). **Standard** queues are at-least-once with best-effort ordering and massive throughput; **FIFO** queues give strict ordering and dedup (exactly-once *within SQS*) at lower throughput. Built-in **dead-letter queues** and visibility timeouts handle Booklet 4's poison-message and redelivery concerns for you.
  - **SNS** — managed **pub/sub**: publish once to a **topic**, and it **fans out** to many subscribers (SQS queues, Lambda, HTTP endpoints, email). One event, many independent consumers.
  - **EventBridge** — an **event bus** with **content-based routing rules**, schema registry, scheduled events (managed cron), and built-in integrations with AWS services and SaaS. It's the "route this event to the right handlers based on its contents" layer.

<svg viewBox="0 0 360 84" role="img" aria-label="SNS fan-out: one published event is delivered to several SQS queues, each feeding its own independent consumer, so billing, email, and analytics all react to the same event" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="32" width="70" height="20" rx="3" fill="#fbf0dc" stroke="#8a5a00"/><text x="45" y="45" text-anchor="middle" font-size="6">SNS topic</text>
  <rect x="150" y="8" width="70" height="16" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="185" y="19" text-anchor="middle" font-size="5.6">SQS → billing</text>
  <rect x="150" y="34" width="70" height="16" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="185" y="45" text-anchor="middle" font-size="5.6">SQS → email</text>
  <rect x="150" y="60" width="70" height="16" rx="2" fill="#fdfaf3" stroke="#8a5a00"/><text x="185" y="71" text-anchor="middle" font-size="5.6">SQS → analytics</text>
  <path d="M80 40 L150 16" stroke="#1a1a1a" marker-end="url(#sn)"/><path d="M80 42 L150 42" stroke="#1a1a1a" marker-end="url(#sn)"/><path d="M80 44 L150 68" stroke="#1a1a1a" marker-end="url(#sn)"/>
  <rect x="266" y="34" width="84" height="16" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="308" y="45" text-anchor="middle" font-size="5.6">independent consumers</text>
  <path d="M220 42 L266 42" stroke="#999" marker-end="url(#sn)"/>
  <defs><marker id="sn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The canonical pattern is **SNS fan-out → SQS per consumer**: publish an event once to SNS, and each consumer has its **own** SQS queue subscribed to the topic. Each consumer then gets the Booklet 4 **queue** guarantees (own retry, own DLQ, own pace) on a **copy** of every event — combining pub/sub's many-consumers with a queue's per-consumer reliability. EventBridge adds routing on top when *which* consumers get an event depends on its contents.

### Module 4 — checkpoint
- **Key concepts:** S3 (objects, 11-nines, strong consistency, storage classes/lifecycle, block-public-access, egress) · RDS Multi-AZ (HA standby) vs read replicas (scale) vs Aurora (storage/compute split, Serverless) · DynamoDB (serverless + Streams/Global Tables/DAX) · ElastiCache (Valkey default) · SQS (standard/FIFO, DLQ) · SNS fan-out · EventBridge routing.
- **Task + questions:** wire "order placed" to billing + email + analytics using SNS/SQS; then say when you'd pick Aurora over RDS, and DynamoDB over both.
- **Next:** Module 5 — operating and securing.
