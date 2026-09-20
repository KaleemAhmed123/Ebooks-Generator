## Event notification

- The simplest pattern in Event-Driven Architecture (EDA) is **Event Notification**. 
- A service emits a tiny, lightweight message announcing that *something* happened, containing only the ID of the entity. Any service that cares about this event must then turn around and make a synchronous API call back to the source to fetch the actual data.

<svg viewBox="0 0 460 140" role="img" aria-label="Event notification. Producer emits a tiny event to Kafka. Three consumers receive it, and all three immediately fire synchronous HTTP GET requests back to the Producer's API." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="100" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="40" text-anchor="middle" font-weight="bold">Orders API</text>
  
  <rect x="150" y="20" width="40" height="100" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="170" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Topic</text>
  <text x="170" y="70" text-anchor="middle" font-size="6">ID: 123</text>
  
  <path d="M100 65 L150 65" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M150 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="280" y="20" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="320" y="34" text-anchor="middle" font-size="6">Consumer A (Billing)</text>
  
  <rect x="280" y="60" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="320" y="74" text-anchor="middle" font-size="6">Consumer B (Shipping)</text>
  
  <rect x="280" y="100" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="320" y="114" text-anchor="middle" font-size="6">Consumer C (Fraud)</text>
  
  <path d="M190 30 L280 30" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M280 30 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M190 70 L280 70" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M280 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <path d="M190 110 L280 110" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M280 110 l-6 -3 v6 z" fill="#1d4e89"/>
  
  <path d="M280 25 L100 25" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M100 25 l6 -3 v6 z" fill="#b8541a"/>
  <path d="M280 65 L100 65" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M100 65 l6 -3 v6 z" fill="#b8541a"/>
  <path d="M280 105 L100 105" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/><path d="M100 105 l6 -3 v6 z" fill="#b8541a"/>
  
  <text x="390" y="65" text-anchor="middle" font-size="6" fill="#b8541a">HTTP GET /orders/123</text>
</svg>

- This pattern is fantastic for decoupling. The Orders API doesn't know who is listening. It also guarantees that consumers always fetch the most up-to-date state from the database.

### The failure

- 50 consumers DDoS-ing the producer. A major e-commerce site processes 1,000 orders per second during a sale. The Orders API emits 1,000 tiny events. But there are 15 different microservices subscribed to the `orders` topic. Suddenly, those 15 microservices all turn around and fire HTTP `GET /orders/:id` requests. The Orders API is hit with 15,000 requests per second. The database CPU maxes out at 100%, and the system crashes. By trying to decouple asynchronously, you accidentally created a massive synchronous bottleneck
