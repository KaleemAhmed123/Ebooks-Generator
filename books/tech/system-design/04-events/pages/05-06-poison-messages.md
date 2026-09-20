## Poison messages

- A **Poison Message** is a payload that consistently crashes the consumer trying to read it. 
- It might be malformed JSON, it might have a missing required field, or it might trigger an unexpected Null Pointer Exception in your code. Because the consumer crashes, it never Acks the message. 

<svg viewBox="0 0 460 140" role="img" aria-label="Poison message blocking a queue. A red skull message is at the front of the partition. 10,000 valid messages are backed up behind it. The consumer repeatedly crashes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="250" height="40" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="145" y="45" text-anchor="middle" font-weight="bold">Partition 0</text>
  
  <rect x="30" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="55" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="80" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="73" text-anchor="middle" font-size="6">... 10,000 valid messages</text>
  
  <rect x="180" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="205" y="55" width="20" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="230" y="55" width="30" height="30" fill="#fce4e2" stroke="#b8541a" stroke-width="2"/>
  
  <circle cx="245" cy="70" r="5" fill="#b8541a"/>
  <text x="245" y="73" text-anchor="middle" font-size="6" font-weight="bold" fill="#ffffff">X</text>
  
  <path d="M270 70 L340 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="305" y="65" text-anchor="middle" font-size="6">Polls Poison</text>
  
  <rect x="340" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="74" text-anchor="middle" font-weight="bold">Consumer</text>
  
  <path d="M380 90 L380 120" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="380" y="130" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">CRASH &amp; REBOOT</text>
  
  <path d="M360 120 C 320 120 290 100 290 80" stroke="#b8541a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <path d="M290 80 l-3 6 h6 z" fill="#b8541a"/>
  <text x="325" y="110" text-anchor="middle" font-size="6" fill="#b8541a">Infinite Retry Loop</text>
</svg>

- Because you are using At-least-once delivery, the broker will redeliver the un-Acked message. The consumer will crash again. And again. And again. 

### The failure

- Infinite retry loops block the partition forever. Because ordering is strictly enforced within a partition, the consumer cannot simply skip the bad message and read the next one. It must process the message at offset 1 before it is allowed to see the message at offset 2. A single poison message created by a typo from an upstream service will instantly bring consumption of that partition to a complete halt, backing up tens of thousands of valid messages behind it indefinitely
