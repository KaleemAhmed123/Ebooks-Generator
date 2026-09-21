## A buffer between two clocks

- With a broker in between, the producer's work ends when the broker has the message. The consumer reads it when it is ready: now, in a minute, after a redeploy. The two sides no longer share a clock
- That one property does two jobs
  - **Outage absorption.** The email service is down for four hours. The order service keeps writing `SendReceipt` messages; the broker keeps them on disk; the email service drains them when it returns. A dead consumer is a **backlog**, a count of unread messages, not an outage
  - **Load levelling.** A midnight job emits 100,000 invoice requests in one second. The queue takes them at that rate; the worker reads at 500 per second and is done in about 200 s without ever seeing the spike

<svg viewBox="0 0 460 140" role="img" aria-label="Load levelling. A spiky input of 100,000 events/sec hits the queue. The queue drains at a flat output of 500 events/sec, protecting the fragile worker." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M20 100 L50 100 L60 20 L70 100 L120 100" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="70" y="40" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">100k events / sec</text>
  
  <rect x="150" y="40" width="100" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="55" text-anchor="middle" font-weight="bold">Message Queue</text>
  <text x="200" y="70" text-anchor="middle" font-size="6">Absorbs the spike</text>
  <text x="200" y="85" text-anchor="middle" font-size="6">into RAM/Disk</text>
  
  <path d="M280 100 L400 100" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="340" y="90" text-anchor="middle" font-size="6" fill="#1d4e89" font-weight="bold">Flat output: 500 events / sec</text>
  
  <rect x="400" y="40" width="40" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="420" y="70" text-anchor="middle" font-weight="bold">Worker</text>
  
  <path d="M120 100 L150 100" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M150 100 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M250 100 L280 100" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M280 100 l-6 -3 v6 z" fill="#1a1a1a"/>
</svg>

- One buffer serves both because the broker does not care why the consumer is behind. Slow, dead or busy, the messages wait
- Waiting is the cost. The invoice that used to exist when the request returned now exists 200 s later. Page 4 is the full bill; Module 6, page 6 is the arithmetic for a backlog that never drains

### The failure

- "The queue is now the outage." The broker that lets consumers fail alone cannot fail alone: every producer writes to it. A consumer dead for a week fills the broker's disk without a sound, and the next symptom is every producer erroring at once. A broker is tier-1 infrastructure from the day it is introduced. Alert on consumer lag (Module 3, page 9), not only on broker health
