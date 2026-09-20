## The queue model

- Not all message brokers are the same. The first and oldest model is the **Queue Model**. In this model, messages are placed into a single queue. Consumers connect to the queue, and the broker hands each message to exactly one consumer
- The broker tracks the delivery state of every single message. When the consumer finishes processing the message, it sends an Acknowledgement (Ack). The broker then deletes the message from the queue forever

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

- **Use case:** Distributed work distribution. If you have 10,000 PDF invoices to generate, you spin up 50 consumers. The queue guarantees that each invoice is handed to exactly one consumer. It is perfectly horizontally scalable
- **Examples:** RabbitMQ, Amazon SQS, ActiveMQ

### The failure

- Competing consumers destroy ordering. Because messages are handed out concurrently, Consumer B might finish processing Message 2 before Consumer A finishes Message 1. The result hits your database as `2` then `1`. In a standard message queue, if you attach more than one consumer, you immediately forfeit all ordering guarantees
