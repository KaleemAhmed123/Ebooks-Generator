## Visibility timeout

- In cloud-native queues like Amazon SQS, the mechanics of Acks are slightly different. Because SQS is a distributed pull-based queue, it doesn't hold a persistent TCP connection to the consumer. Instead, it relies on a **Visibility Timeout**
- When a consumer pulls a message, SQS does not delete it. It simply "hides" it from other consumers for a default of 30 seconds

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

- If Consumer A finishes processing and sends the `DeleteMessage` command within 30 seconds, the message is permanently deleted. If it fails to do so, the message becomes visible again, and another consumer will pick it up

### The failure

- Processing outlives the timeout. If you are generating a heavy PDF that takes 40 seconds, but your SQS visibility timeout is 30 seconds, Consumer A will still be working when the message reappears on the queue. Consumer B will pull the same message and start generating the exact same PDF. You are now doing double the work, and eventually, Consumer A will try to Ack a message that is currently owned by Consumer B. You must tune the timeout to comfortably exceed your slowest possible processing time (up to the AWS max of 12 hours)
