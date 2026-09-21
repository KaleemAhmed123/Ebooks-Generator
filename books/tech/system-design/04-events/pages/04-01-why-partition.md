# Module 4 - Partitions, keys, ordering

## Why partition

- A **partition** is one append-only log on one broker's disk. A topic is a set of them. The partition is the unit of two things at once: parallelism, because partitions spread across brokers and consumers, and ordering, because within one partition records are read in the order they were written

<svg viewBox="0 0 460 140" role="img" aria-label="Global ordering kills scale. SVG showing one lane (Total Order) bottlenecking all producers into one disk and one consumer, compared to multiple lanes (Partial Order by Key) scaling horizontally." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="110" y="20" text-anchor="middle" font-weight="bold" fill="#b8541a">Total Order (1 Partition)</text>
  
  <rect x="20" y="30" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="20" y="60" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="20" y="90" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="35" y="44" text-anchor="middle" font-size="6">P1</text>
  <text x="35" y="74" text-anchor="middle" font-size="6">P2</text>
  <text x="35" y="104" text-anchor="middle" font-size="6">P3</text>
  
  <path d="M50 40 L80 65" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M80 65 l-6 -3 v5 z" fill="#b8541a" transform="rotate(35 80 65)"/>
  <path d="M50 70 L80 70" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M80 70 l-6 -3 v6 z" fill="#b8541a"/>
  <path d="M50 100 L80 75" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M80 75 l-6 -1 v5 z" fill="#b8541a" transform="rotate(-35 80 75)"/>
  
  <rect x="90" y="60" width="60" height="20" rx="3" fill="#e6f2ff" stroke="#b8541a" stroke-width="2"/>
  <text x="120" y="74" text-anchor="middle" font-size="6" font-weight="bold">Single Lane</text>
  
  <path d="M150 70 L180 70" stroke="#b8541a" fill="none" stroke-width="1"/><path d="M180 70 l-6 -3 v6 z" fill="#b8541a"/>
  
  <rect x="190" y="60" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="205" y="74" text-anchor="middle" font-size="6">C1</text>
  
  <text x="340" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">Partial Order by Key (N Partitions)</text>
  
  <rect x="250" y="30" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="250" y="60" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="250" y="90" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  
  <path d="M280 40 L310 40" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M310 40 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M280 70 L310 70" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M310 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M280 100 L310 100" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M310 100 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <rect x="320" y="30" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="320" y="60" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <rect x="320" y="90" width="60" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  
  <path d="M380 40 L410 40" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M410 40 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M380 70 L410 70" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M410 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M380 100 L410 100" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M410 100 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <rect x="420" y="30" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="420" y="60" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="420" y="90" width="30" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
</svg>

- Total order is one lane. If every event in the system must be ordered against every other, there is one log, one leader writing it, one disk, and one consumer reading it. That is the ceiling, and it is a single machine
- Almost no system needs total order. Order matters between events about the same thing: user A's `AddToCart` before user A's `Checkout`. Nobody cares whether user A or user B checked out first. Partition by the thing whose events must stay in order, and each lane is ordered while the lanes scale
- This is also booklet 03's single-writer partition: route every event for key K to one partition, and one consumer at a time applies K's events in sequence, with no lock

### The failure

- One partition "until it cannot keep up". A topic created with a single partition is ordered by construction, so nobody worries about keys. Traffic grows; one consumer is the limit; adding partitions now re-maps every key (page 4) and there is no going back. Decide the lanes on day one (page 6)
