## Deadlines and propagation

- A timeout is a duration ("wait 5 seconds"). A **deadline** is an absolute point in time ("fail at 14:02:05"). Deadlines are better because they can be passed down a chain of services
- If A gives B a 5-second timeout, B takes 3 seconds, and then B calls C, B should give C a **2-second** timeout. If B gives C 5 seconds, C might finish in 4, B succeeds, but A already timed out and dropped the connection

<svg viewBox="0 0 460 76" role="img" aria-label="Deadline propagation: Service A sets a 500ms deadline. It takes 100ms, calls B with 400ms remaining. B takes 200ms, calls C with 200ms remaining. C exceeds 200ms, so the whole chain cancels immediately rather than wasting work" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="24" width="40" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="24" y="38" text-anchor="middle">A</text>
  <path d="M44 32 L106 32" stroke="#1a1a1a"/><path d="M106 32 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="110" y="24" width="40" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="130" y="38" text-anchor="middle">B</text>
  <path d="M150 32 L212 32" stroke="#1a1a1a"/><path d="M212 32 l-5 -3 v6 z" fill="#1a1a1a"/>
  <rect x="216" y="24" width="40" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="236" y="38" text-anchor="middle">C</text>
  <text x="75" y="26" text-anchor="middle" font-size="8" fill="#1d4e89">deadline 500ms</text>
  <text x="181" y="26" text-anchor="middle" font-size="8" fill="#1d4e89">400ms left</text>
  <text x="280" y="26" text-anchor="middle" font-size="8" fill="#b8541a">C takes 300ms → cancels</text>
  <path d="M256 32 L340 32" stroke="#b8541a" stroke-dasharray="2 2"/>
</svg>

- gRPC does this automatically with `DEADLINE_EXCEEDED`. The deadline travels in the header. Every hop checks the clock, subtracts its own elapsed time, and cancels the request if the deadline is past

### The failure

- A caller gives up after 5 seconds and returns a 504 to the user. The callee keeps working on the request for 30 more seconds, locking a database row and doing expensive crypto, for a response nobody is waiting for
- Passing the deadline down prevents **orphan work**. When the root caller gives up, the cancellation signal should propagate all the way to the database
