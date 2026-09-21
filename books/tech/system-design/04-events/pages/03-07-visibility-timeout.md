## Visibility timeout

- SQS has no channel to close and no offset to commit. A consumer receives a message and the queue hides it from everyone else for the **visibility timeout**: 30 s by default, up to 12 h. Delete it before the timeout ends and it is gone; do nothing and it reappears for the next receiver

<svg viewBox="0 0 460 140" role="img" aria-label="Visibility timeout. SQS hides a message for 30s. Consumer A takes 40s to process. At 30s, the message becomes visible again and Consumer B picks it up. Both consumers are now processing the same message." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L400 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="20" y="43" text-anchor="middle" font-weight="bold">SQS</text>
  
  <rect x="100" y="20" width="150" height="40" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="175" y="35" text-anchor="middle" font-weight="bold" fill="#1d4e89">Message Hidden</text>
  <text x="175" y="48" text-anchor="middle" font-size="6" fill="#1d4e89">Visibility Timeout (30s)</text>
  
  <path d="M100 80 L350 80" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="50" y="83" text-anchor="middle" font-weight="bold">Consumer A</text>
  <text x="225" y="75" text-anchor="middle" font-size="6">Processing takes 40s...</text>
  <path d="M350 80 L350 40" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="350" y="95" text-anchor="middle" font-size="6" fill="#b8541a">Ack (Too late!)</text>
  
  <path d="M250 120 L400 120" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="50" y="123" text-anchor="middle" font-weight="bold">Consumer B</text>
  
  <path d="M250 40 L250 120" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="325" y="115" text-anchor="middle" font-size="6" fill="#b8541a">Message becomes visible.</text>
  <text x="325" y="125" text-anchor="middle" font-size="6" fill="#b8541a">Consumer B pulls it.</text>
</svg>

- The hidden window is the ack deadline. Delete is the ack. There is no nack; letting the timeout lapse is the requeue
- Work that may run long extends its own deadline with `ChangeMessageVisibility` while it runs, rather than setting a queue-wide timeout of an hour, which would delay every retry by an hour
- AWS says it plainly: the delivery model is at-least-once, and no timeout setting removes the chance of a second delivery. The consumer is idempotent or it is wrong

### The failure

- Processing outlives the timeout. A PDF takes 40 s; the timeout is 30 s; at 30 s consumer B receives the same message and starts the same PDF. A finishes at 40 s and deletes a message B is still holding. Two PDFs, one delete, and a log line that says nothing was wrong
