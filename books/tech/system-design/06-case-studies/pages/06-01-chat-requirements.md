# Chat System

### Requirements and numbers

- Chat (WhatsApp, Discord, Messenger) operates on a massive scale of tiny writes
- **In scope:** 1:1 chat, group chat, online presence, message history
- **Out of scope:** Voice/Video calling, media uploads (→09)

| Metric | Requirement |
|---|---|
| **Write volume** | One write per message. Trillions of messages |
| **Delivery latency** | Real-time (under 100ms) |
| **Read/Write ratio** | 1:1 for DMs, 1:N for groups |

- The scale is enormous. Discord stores trillions of messages. Sizing group chats as if they are 1:1 chats is a mistake. A 100-person group chat receiving one message is 1 write and 100 reads. A 10,000-person Discord server receiving one message is 1 write and 10,000 reads

### The failure

- Treating chat like a standard CRUD app where clients poll a database for new messages. If 100 million users poll a database every second, your database will melt

:::interview
You design a chat app where users HTTP GET `/messages` every 5 seconds. The interviewer says this will cost millions of dollars in compute. Why?

Because 99% of those polls will return empty. You are paying for millions of TLS handshakes, network round-trips, and database queries just to confirm nothing happened. You must use push (WebSockets), not pull.
:::
