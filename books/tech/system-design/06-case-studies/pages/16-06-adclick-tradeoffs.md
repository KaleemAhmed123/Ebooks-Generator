## What the interviewer probes

- **Hot Ads:** What if the SuperBowl runs an ad, and it gets 100,000 clicks a second? If you partition Kafka purely by `Ad ID`, that single partition (and its single consumer) will melt. You must append a random salt to the Ad ID for ingestion (`Ad ID + Random(1..10)`), aggregate locally, and then sum the partial results (→17 Top-K)
- **OLAP Store:** The aggregated results (clicks per minute per ad) are stored in an OLAP database (ClickHouse, Pinot, Druid) designed for fast analytical queries by the advertiser dashboard
- **Fraud:** Where does the bot-detection filter run? Usually as a stream processor sitting *between* the raw ingest topic and the aggregation topic. It flags clicks as 'fraud' so the aggregator ignores them

### The failure

- Partitioning exclusively by Ad ID without a plan for viral events. A viral event creates a "Hot Partition" that destroys horizontal scalability.

:::interview
You partition your Kafka topic by Ad ID. A celebrity posts an ad, generating 50,000 clicks per second. The single Kafka partition is overwhelmed. How do you distribute the load?

Use a compound partition key, like `Hash(Ad ID + Random(1 to 10))`. This splits the celebrity's traffic across 10 partitions. The stream processors aggregate the sub-totals, and a final step sums them together.
:::\n