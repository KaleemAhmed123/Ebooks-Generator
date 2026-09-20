## Consumer lag

- In an asynchronous system, "Is it healthy?" is answered by a single metric: **Consumer Lag**. 
- In Kafka, the lag is simply the math equation: `End Offset` minus `Committed Offset`. If the partition's end offset is 10,000 and your consumer has committed up to 9,000, your lag is 1,000 messages. If the lag is constantly growing, your system is failing

<svg viewBox="0 0 460 140" role="img" aria-label="Consumer lag per partition. A bar chart showing lag. Partition 0 has 5 lag. Partition 1 has 10 lag. Partition 2 has 500,000 lag (stuck). Partition 3 has 2 lag." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 110 L400 110" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  <path d="M50 110 L50 20" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  
  <text x="40" y="25" text-anchor="end" font-size="6">500k -</text>
  <text x="40" y="65" text-anchor="end" font-size="6">250k -</text>
  <text x="40" y="105" text-anchor="end" font-size="6">0 -</text>
  
  <rect x="80" y="105" width="40" height="5" fill="#1d4e89"/>
  <text x="100" y="125" text-anchor="middle" font-size="6">Partition 0</text>
  
  <rect x="150" y="100" width="40" height="10" fill="#1d4e89"/>
  <text x="170" y="125" text-anchor="middle" font-size="6">Partition 1</text>
  
  <rect x="220" y="25" width="40" height="85" fill="#b8541a"/>
  <text x="240" y="125" text-anchor="middle" font-weight="bold" fill="#b8541a">Partition 2</text>
  <text x="240" y="15" text-anchor="middle" font-size="6" font-weight="bold" fill="#b8541a">STUCK!</text>
  
  <rect x="290" y="108" width="40" height="2" fill="#1d4e89"/>
  <text x="310" y="125" text-anchor="middle" font-size="6">Partition 3</text>
</svg>

- A healthy system will see lag spike during traffic bursts (load levelling) and then trend back down to zero. A system where the lag trends upwards linearly is one where the consumption rate is strictly less than the production rate. 

### The failure

- Alerting on the sum hides one stuck partition. When configuring Datadog or CloudWatch, developers often create an alert for `Sum(Consumer Lag) > 10,000`. This is dangerous. If you have 50 partitions, and a single "poison message" crashes the consumer reading Partition 2 every time it tries to process it, Partition 2 will stop advancing. Its lag will slowly grow to 5,000. But the other 49 partitions are perfectly healthy and have 0 lag. Your sum is 5,000, so the alert doesn't fire. Meanwhile, 1/50th of your customers are completely frozen. You must always alert on lag *per partition*
