# Module 6 - Chat

## Requirements and numbers

- WhatsApp, Messenger, Discord: the prompt is asked at Meta and at most product companies. Two things make it unlike Modules 2–5: the connection has state, and a group turns one write into many deliveries
- Functional, three in: 1:1 and group messages, delivered live to connected recipients; message history per conversation; online presence. Out: voice and video, media beyond a URL (Module 9 owns upload), end-to-end encryption's key exchange
- Non-functional: a message reaches a connected recipient in under a second; messages in one conversation appear in one order on every device; history is never lost once the sender sees "sent"
- Inputs, as assumptions: say 50 M daily users, 40 messages sent per user per day, groups average 10 members, a message row of 200 bytes

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| messages written | 50 M × 40 ÷ 100 000 | ≈ 20 000/s average, 60 000/s peak |
| deliveries pushed | writes × average group size 10 | ≈ 200 000/s average, 600 000/s peak |
| open connections | 50 M daily, say 20 % connected at once | ≈ 10 M WebSockets held open |
| storage | 2 B × 200 B per day | ≈ 400 GB/day, ≈ 150 TB/year, before media |

- The write rate is ordinary; the delivery rate and the connection count are not. Delivery is fan-out (page 5), and connections need servers that hold state (page 2). Discord's scale, trillions of stored messages, is the same shape with more zeros
- Two read patterns: "everything since I was last here", which is the hot path, and "scroll back to last year", which is cold. The key design on page 3 serves both from one table

### The failure

- Polling. Every client asks `GET /messages` every few seconds; 10 M clients is 2 M requests a second of which nearly all return nothing. The cost is the TLS handshake and the query, paid to learn that nothing happened. Chat is push, and the whole design follows from holding the connection open
