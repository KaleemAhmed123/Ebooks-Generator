## The partitioned log model

- A fundamental problem with Queues and Pub/Sub is that messages are deleted once they are consumed. If a consumer team realizes they had a bug and wants to "replay" yesterday's messages, they cannot. The messages are gone
- The **Partitioned Log Model** changes the paradigm entirely. It models the broker as an append-only file on disk. The Producer writes to the end of the file. Messages are **never deleted** on read

<svg viewBox="0 0 460 140" role="img" aria-label="The partitioned log. A continuous log of messages on disk. Consumer A's offset points to message 4. Consumer B's offset points to message 2. Nothing is deleted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="60" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="84" text-anchor="middle" font-weight="bold">Producer</text>
  
  <rect x="130" y="50" width="180" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  
  <rect x="140" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="150" y="84" text-anchor="middle" font-weight="bold">1</text>
  <rect x="165" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="175" y="84" text-anchor="middle" font-weight="bold">2</text>
  <rect x="190" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="200" y="84" text-anchor="middle" font-weight="bold">3</text>
  <rect x="215" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="225" y="84" text-anchor="middle" font-weight="bold">4</text>
  <rect x="240" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="250" y="84" text-anchor="middle" font-weight="bold">5</text>
  <rect x="265" y="65" width="20" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="275" y="84" text-anchor="middle" font-weight="bold">6</text>
  
  <path d="M225 30 L225 60" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M225 60 l-3 -6 h6 z" fill="#b8541a"/>
  <text x="225" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">Offset 4 (Consumer A)</text>
  
  <path d="M175 130 L175 100" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M175 100 l-3 6 h6 z" fill="#1d4e89"/>
  <text x="175" y="140" text-anchor="middle" font-weight="bold" fill="#1d4e89">Offset 2 (Consumer B)</text>
  
  <path d="M80 80 L130 80" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 80 l-6 -3 v6 z" fill="#1d4e89"/>
</svg>

- Consumers read from the log. To track their progress, the broker simply stores an integer representing their position (the "Offset"). Consumer A has read up to message 4. Consumer B is lagging behind at message 2. If Consumer A wants to replay, it just asks the broker to reset its offset to 0
- **Examples:** Apache Kafka, Apache Pulsar, Amazon Kinesis, Redis Streams

### The failure

- Reading is cheap, so people forget retention deletes underneath them. Because messages are never deleted on read, the broker must delete them based on time (e.g., a 7-day retention period) or size. If your consumer crashes and is down for 8 days, when it wakes up, its old offset points to data that was deleted. It permanently loses those messages, and there is no error thrown
