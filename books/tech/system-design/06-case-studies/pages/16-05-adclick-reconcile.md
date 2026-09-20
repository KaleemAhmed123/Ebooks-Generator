## Reconciliation

- Stream processing engines are complex and can drift due to dropped state or bugs
- **The Lambda Architecture:** 
  1. **Speed Layer:** The Flink stream processor provides real-time counts to the advertiser dashboard with < 1 minute latency. These numbers are *provisional*
  2. **Batch Layer:** Every night, a massive Hadoop/Spark batch job re-reads the entire raw Kafka log for the day on cold storage, deduplicates perfectly, and computes the absolute final numbers
- The Batch result overwrites the Stream result. The Batch result is what you use to generate the actual financial invoice

### The failure

- Relying entirely on the streaming engine for the financial invoice. If a bug corrupts the streaming state, you bill the wrong amount. The batch path is the ultimate audit trail.

:::interview
Your real-time dashboard shows an advertiser received 1,000 clicks today. Your nightly batch job calculated 998 clicks. Which number goes on the invoice?

The batch job (998). Real-time streaming provides fast, provisional insights for the UI, but the daily batch job provides the definitive, fully-reconciled source of truth for billing.
:::\n