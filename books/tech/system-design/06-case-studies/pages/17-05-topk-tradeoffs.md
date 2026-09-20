## What the interviewer probes

- **Ties:** How do you rank two videos with exactly 10,000 views? Sort lexicographically by Video ID to ensure deterministic results across replicas
- **Fast Path vs Slow Path:** Stream processors (Count-Min sketch) provide the real-time approximate Top-K for the live dashboard. A nightly MapReduce batch job (Hadoop) scans the raw logs to compute the 100% exact Top-K for historical reporting (The Lambda Architecture)
- **Decay:** Instead of hard tumbling windows, some systems use Exponential Decay. A view from 1 minute ago adds `1.0` to the score. A view from 10 minutes ago adds `0.5` to the score. This naturally surfaces trending content without discrete time boundaries

### The failure

- Sending the exact same data twice and expecting a different answer. Top-K systems must be idempotent. If a consumer restarts, it must deduplicate the raw events before feeding them into the sketch.

:::interview
Your real-time Top-10 dashboard is highly volatile and inaccurate. The product manager demands 100% mathematical accuracy. What is your response?

Real-time processing over infinite streams at scale forces a trade-off between accuracy and memory. I can provide 100% accuracy via a daily batch job (Hadoop), but the real-time stream must remain an approximation.
:::\n