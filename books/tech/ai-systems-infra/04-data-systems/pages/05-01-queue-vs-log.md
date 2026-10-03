# Messaging and Streaming

## A queue vs a log

- Both let services communicate **asynchronously** — a producer hands off a message and moves on, a consumer processes it later — which decouples services, absorbs bursts, and smooths load (Booklet 3's backpressure, as infrastructure). But there are **two fundamentally different models** underneath, and conflating them is the most common messaging mistake.
- **A queue** (RabbitMQ, SQS) distributes **work**. A message is handed to **one** consumer, which acknowledges it, and then it's **gone**. Multiple consumers share the load (each message to exactly one of them). It's a to-do list: once an item is done, it's crossed off and no longer exists.
- **A log** (Kafka) is an **append-only, ordered, retained** sequence. Consumers read at their **own position (offset)**, and a message is **not removed when read** — it stays for a retention period, so **many independent consumers** can each read the whole stream, and anyone can **replay** from an old offset. It's a ledger: entries stay, and each reader has its own bookmark.

<svg viewBox="0 0 360 96" role="img" aria-label="A queue delivers each message to one consumer and removes it; a log retains an ordered sequence that multiple consumer groups read independently by offset" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#6a4c93">queue — consumed & gone</text>
  <rect x="40" y="20" width="24" height="14" fill="#f1ecf6" stroke="#6a4c93"/><rect x="66" y="20" width="24" height="14" fill="#f1ecf6" stroke="#6a4c93"/><rect x="92" y="20" width="24" height="14" fill="#f1ecf6" stroke="#6a4c93"/>
  <path d="M116 27 L140 27" stroke="#1a1a1a" marker-end="url(#ql)"/>
  <rect x="140" y="20" width="36" height="14" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="158" y="30" text-anchor="middle" font-size="5.2">consumer</text>
  <text x="90" y="46" text-anchor="middle" font-size="5" fill="#777">one consumer gets each msg; ack → removed</text>
  <text x="270" y="60" text-anchor="middle" font-size="6.5" fill="#6a4c93">log — retained, offsets</text>
  <rect x="200" y="68" width="20" height="14" fill="#f7f4fa" stroke="#6a4c93"/><rect x="220" y="68" width="20" height="14" fill="#f7f4fa" stroke="#6a4c93"/><rect x="240" y="68" width="20" height="14" fill="#f7f4fa" stroke="#6a4c93"/><rect x="260" y="68" width="20" height="14" fill="#f7f4fa" stroke="#6a4c93"/>
  <text x="206" y="92" font-size="5" fill="#2f7d4f">group A offset→2</text><text x="300" y="74" font-size="5" fill="#1f487e">group B offset→0</text>
  <text x="330" y="66" text-anchor="end" font-size="5" fill="#777">retained</text>
  <defs><marker id="ql" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The one-line test that decides which you need: **"Does each message get processed once and then it's done (queue), or do multiple independent things need to react to it, now or later, possibly replaying history (log)?"** "Resize this uploaded image" is a queue; "an order was placed" that billing, inventory, email, and analytics all consume is a log. The next four pages make each concrete and close with the full decision.
