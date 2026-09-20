# Module 1 - What a system promises

## Reliable means correct, not up

- A **fault** is one component misbehaving: a disk returns garbage, a process hangs, a request is dropped
- A **failure** is the system breaking its promise to the user: a wrong balance, a lost order, an error page
- **Reliability** is the gap between the two. A reliable system absorbs faults so they never become failures
- "The server is up" is not the promise. A server that answers 200 with stale data has failed, and no health check will say so
- Faults cannot be prevented. Every design in this series is a way of tolerating one

<svg viewBox="0 0 460 96" role="img" aria-label="A fault either is tolerated, and the user sees a correct answer, or it propagates and becomes a failure the user sees" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <rect x="8" y="34" width="96" height="30" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="56" y="53" text-anchor="middle">fault</text>
  <text x="56" y="78" text-anchor="middle" font-size="8.5" fill="#6b6b6b">disk · net · bug · human</text>
  <path d="M104 44 L182 22" stroke="#1a1a1a" fill="none"/><path d="M182 22 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M104 54 L182 76" stroke="#1a1a1a" fill="none"/><path d="M182 76 l-7 -5 v6 z" fill="#1a1a1a"/>
  <rect x="186" y="8" width="104" height="28" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="238" y="26" text-anchor="middle">tolerated</text>
  <rect x="186" y="62" width="104" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="238" y="80" text-anchor="middle">propagates</text>
  <path d="M290 22 L350 22" stroke="#1a1a1a" fill="none"/><path d="M350 22 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M290 76 L350 76" stroke="#1a1a1a" fill="none"/><path d="M350 76 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="356" y="26" font-size="9.5">correct answer</text>
  <text x="356" y="80" font-size="9.5" fill="#6b6b6b">failure</text>
</svg>

### The failure nobody alerts on

- Monitoring watches for the loud failure: 500s, timeouts, a dead process
- The quiet one is a fault that was *not* tolerated but produced a plausible answer. A replica serving a balance from before the last deposit. A cache that outlived the row it copied
- Every alert says green. The user is the detector
- When you read "highly available" in a design, ask what it is available *for*. Available and wrong is the worst combination, because nobody is looking
