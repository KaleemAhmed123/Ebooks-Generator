## Jitter

- Exponential backoff paces the load, but it does not stop clients from synchronising. If a server goes down, 100 clients fail at the exact same moment. They all wait exactly 100 ms. They all retry at the exact same moment
- The solution is **jitter**: adding randomness to the sleep duration

<svg viewBox="0 0 460 100" role="img" aria-label="Top line: three clients retry at exactly 100ms, then 200ms, then 400ms, creating load spikes. Bottom line: the same clients use jitter, spreading their retries randomly within the bounds, flattening the load curve." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="10" y="25" fill="#6b6b6b">Without Jitter</text>
  <path d="M100 25 L400 25" stroke="#6b6b6b" stroke-dasharray="1 3"/>
  <circle cx="150" cy="25" r="4" fill="#b8541a"/><circle cx="150" cy="20" r="4" fill="#b8541a"/><circle cx="150" cy="15" r="4" fill="#b8541a"/>
  <text x="150" y="45" text-anchor="middle" font-size="8">1s</text>
  <circle cx="250" cy="25" r="4" fill="#b8541a"/><circle cx="250" cy="20" r="4" fill="#b8541a"/><circle cx="250" cy="15" r="4" fill="#b8541a"/>
  <text x="250" y="45" text-anchor="middle" font-size="8">2s</text>
  <circle cx="350" cy="25" r="4" fill="#b8541a"/><circle cx="350" cy="20" r="4" fill="#b8541a"/><circle cx="350" cy="15" r="4" fill="#b8541a"/>
  <text x="350" y="45" text-anchor="middle" font-size="8">4s</text>

  <text x="10" y="75" fill="#1d4e89">With Full Jitter</text>
  <path d="M100 75 L400 75" stroke="#6b6b6b" stroke-dasharray="1 3"/>
  <circle cx="120" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="170" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="140" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="210" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="260" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="230" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="310" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="380" cy="75" r="4" fill="#1d4e89"/>
  <circle cx="340" cy="75" r="4" fill="#1d4e89"/>
</svg>

- **Full jitter** is the standard. You calculate the exponential backoff, then pick a random number between zero and that value:
  `random(0, min(cap, base × 2^attempt))`

- With 100 contending clients, AWS measured full jitter cutting the total calls to finish the work by more than half against plain backoff. Equal and decorrelated variants exist; full is the default answer

### Jitter everything periodic

| Many clients do this on a clock | The spike | The fix |
|---|---|---|
| cache entries expire | 10,000 keys expire at midnight, the database takes every miss | `ttl = base + random(0, 10 min)` |
| cron at the top of the hour | 50 services clean up at `:00` | sleep `random(0, 5 min)` first |
| reconnect after a balancer restart | 5,000 sockets reconnect in the same second | reconnect with full jitter |
| tokens refresh after a fixed lifetime | every instance renews in the same millisecond | refresh at 75–90% of the lifetime, at random |

:::interview
"How do you prevent a retry storm?" — Exponential backoff to pace the load, plus full jitter to desynchronise the clients. Write the `random(0, backoff)` formula on the board.
:::
