## Notification System Design

Fan-out to email, push, SMS and in-app, with per-user preferences,
deduplication, batching and quiet hours. Consistently underestimated.

"Send an email when someone comments" becomes: do not notify the author of their
own comment, collapse thirty comments into one digest, respect the recipient's
timezone and quiet hours, cap how many they can receive in an hour, and never
send twice when the job retries.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An event passes through preference checks, deduplication, batching, quiet hours and rate caps before reaching a delivery provider">
  <text x="4" y="26" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">event</text>
  <path d="M40 22 H62" stroke="#1a1a1a" stroke-width="1.1"/><path d="M62 22 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="66" y="10" width="72" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="102" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">preferences</text>
  <path d="M140 22 H158" stroke="#1a1a1a" stroke-width="1.1"/><path d="M158 22 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="162" y="10" width="64" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="194" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">dedupe</text>
  <path d="M228 22 H246" stroke="#1a1a1a" stroke-width="1.1"/><path d="M246 22 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="250" y="10" width="64" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="282" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">batch</text>
  <path d="M316 22 H334" stroke="#1a1a1a" stroke-width="1.1"/><path d="M334 22 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="338" y="10" width="118" height="24" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.3"/><text x="397" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#2b5fa8">quiet hours, rate cap</text>
  <text x="66" y="52" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the fan-out is easy; the suppression rules are the system</text>
</svg>

## Outbox Pattern

Writing the domain change and the event to publish inside the same database
transaction, then relaying the event separately. It removes the dual-write bug
rather than making it rarer.

Saving the order and then publishing to the broker is two writes to two systems
with no transaction between them. When the broker call fails, the order exists
and the event does not, and nothing downstream will ever know. Both rows
committing together makes that impossible; a relay then drains the outbox table
and marks each row sent.

The relay delivers at least once, so consumers still have to be idempotent. The
outbox fixes the atomicity problem, not the delivery-count one.
