# Module 2 - Three broker models

## The queue model

- The oldest model. A producer puts a message in a queue; the broker hands it to **one** consumer; the consumer acknowledges when done; the broker deletes it. RabbitMQ and SQS are queues
- The broker holds delivery state per message: unsent, in flight to consumer B, acknowledged. That state is what makes "exactly one consumer" possible, and what makes redelivery possible when consumer B dies mid-message

<svg viewBox="0 0 460 140" role="img" aria-label="The queue model. A producer writes to a queue. The broker hands Message 1 to Consumer A, and Message 2 to Consumer B. Messages are deleted on Ack." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="50" y="74" text-anchor="middle" font-weight="bold">Producer</text>
  
  <rect x="130" y="20" width="160" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="210" y="35" text-anchor="middle" font-weight="bold">Message Queue</text>
  <text x="210" y="45" text-anchor="middle" font-size="6">RabbitMQ / SQS</text>
  
  <rect x="150" y="60" width="30" height="30" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="165" y="78" text-anchor="middle" font-weight="bold">3</text>
  
  <rect x="190" y="60" width="30" height="30" fill="#e6f2ff" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="205" y="78" text-anchor="middle" font-weight="bold" fill="#999999">2</text>
  <text x="205" y="55" text-anchor="middle" font-size="5" fill="#999999">In flight</text>
  
  <rect x="230" y="60" width="30" height="30" fill="#e6f2ff" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="245" y="78" text-anchor="middle" font-weight="bold" fill="#999999">1</text>
  
  <rect x="360" y="20" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="39" text-anchor="middle" font-weight="bold">Consumer A</text>
  <text x="400" y="50" text-anchor="middle" font-size="6">Processing [1]</text>
  
  <rect x="360" y="80" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="99" text-anchor="middle" font-weight="bold">Consumer B</text>
  <text x="400" y="110" text-anchor="middle" font-size="6">Processing [2]</text>
  
  <path d="M80 70 L130 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M130 70 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <path d="M290 60 L360 40" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M360 40 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(-15 360 40)"/>
  <path d="M290 80 L360 100" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M360 100 l-6 -3 v5 z" fill="#1a1a1a" transform="rotate(15 360 100)"/>
</svg>

- The broker **pushes**: it sends to a connected consumer as soon as it has something. The brake is **prefetch**, the maximum number of unacknowledged deliveries a consumer may hold; the broker stops pushing until acks arrive. RabbitMQ's docs put the usual sweet spot at 100 to 300, and treat 0 as unlimited
- The job it is built for is work distribution: 10,000 invoices, 50 workers, each invoice handled once. Add a worker, throughput rises; nothing is repartitioned

### The failure

- Competing consumers destroy ordering. Message 1 goes to consumer A, message 2 to B; B is faster; the database sees 2 then 1. The moment a queue has a second consumer it promises delivery, not order. Anything that must apply in sequence needs a single consumer or a partitioned log (page 3)
