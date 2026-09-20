## Adding partitions re-maps keys

- Let's say you started with a Kafka topic of 2 partitions. You route by `userId`. 
- For two years, all events for `user_42` hashed to `Partition 1`. Now, traffic has doubled. You need more consumers, so you issue an admin command to increase the topic to 4 partitions. What happens to `user_42`?

<svg viewBox="0 0 460 140" role="img" aria-label="Adding partitions re-maps keys. Before: hash(user_42) % 2 lands on Partition 1. After: hash(user_42) % 4 lands on Partition 3. In-flight ordering breaks." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="20" text-anchor="middle" font-weight="bold">Before (2 Partitions)</text>
  
  <rect x="20" y="30" width="80" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="49" text-anchor="middle">hash(user_42) % 2</text>
  
  <rect x="150" y="20" width="80" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="190" y="34" text-anchor="middle">Partition 0</text>
  
  <rect x="150" y="50" width="80" height="20" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="190" y="64" text-anchor="middle" font-weight="bold">Partition 1 (Old)</text>
  
  <path d="M100 45 L150 60" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M150 60 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(15 150 60)"/>
  
  <path d="M240 70 L240 140" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  
  <text x="340" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">After (4 Partitions)</text>
  
  <rect x="250" y="70" width="80" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="89" text-anchor="middle">hash(user_42) % 4</text>
  
  <rect x="380" y="30" width="60" height="15" fill="#e6f2ff" stroke="#1d4e89"/>
  <rect x="380" y="55" width="60" height="15" fill="#e6f2ff" stroke="#1d4e89"/>
  <rect x="380" y="80" width="60" height="15" fill="#e6f2ff" stroke="#1d4e89"/>
  <rect x="380" y="105" width="60" height="15" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="410" y="41" text-anchor="middle" font-size="6">P 0</text>
  <text x="410" y="66" text-anchor="middle" font-size="6">P 1</text>
  <text x="410" y="91" text-anchor="middle" font-size="6">P 2</text>
  <text x="410" y="116" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">P 3 (New)</text>
  
  <path d="M330 85 L380 112" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M380 112 l-6 -3 v5 z" fill="#b8541a" transform="rotate(30 380 112)"/>
</svg>

- Kafka does **not** move existing data. The old data for `user_42` stays in Partition 1. But starting right now, new events for `user_42` will hash to Partition 3! 
- Even worse, you cannot undo this. Kafka does not support reducing the number of partitions for a topic.

### The failure

- Ordering for in-flight keys breaks during expansion. If `user_42` had an `ItemAdded` event sitting unread in Partition 1, and they immediately trigger a `Checkout` event which lands in Partition 3, you have a race condition. If the consumer reading Partition 3 is slightly faster than the consumer reading Partition 1, the `Checkout` event will be processed before the item was added. When you expand partitions in production, you temporarily break all ordering guarantees for active keys
