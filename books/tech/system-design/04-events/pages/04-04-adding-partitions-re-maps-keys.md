## Adding partitions re-maps keys

- Two partitions, keyed by user, for two years: `hash(user_42) % 2` has always been partition 1. Raise the count to four and `hash(user_42) % 4` is partition 3 from the next record on

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

- Kafka's operations guide says both halves plainly: the default partitioner's mapping changes when the count increases, and Kafka does not redistribute existing data. Old records for `user_42` stay in partition 1; new ones go to partition 3; a consumer reads both partitions with no knowledge that they are one key's history
- The count cannot be reduced. Kafka does not support it; the only way down is a new topic and a copy
- If ordering per key matters, the safe expansion is the expensive one: a new topic with the new count, producers switched over once the old topic is drained, consumers reading both in the right order until then

### The failure

- Ordering breaks for every in-flight key during the change. `user_42` has an `ItemAdded` unread in partition 1 and a `Checkout` newly written to partition 3. Partition 3's consumer is faster. Checkout applies with an empty cart. Every key with unread records at the moment of expansion has the same race, and there is no log line for it
