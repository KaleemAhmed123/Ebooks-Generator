## The Kappa Architecture

- Historically, data engineering used the **Lambda Architecture**: a fast streaming layer for real-time dashboards (which was often inaccurate), and a slow batch layer running at midnight to recalculate everything perfectly. You had to write all your logic twice (once in Flink, once in Spark).
- The modern alternative is the **Kappa Architecture**. You ditch the batch layer entirely. Everything is a stream.

| | Lambda Architecture | Kappa Architecture |
|---|---|---|
| **Codebases** | Two (Streaming code + Batch code). | One (Streaming code). |
| **Real-time path** | Stream processor reads live from Kafka. | Stream processor reads live from Kafka. |
| **Re-processing path**| Run the Batch job over HDFS/S3 data. | Point the Stream processor back to Offset 0 in Kafka. |

- In Kappa, if you find a bug in your revenue calculation, you deploy the fix, spin up a new stream processor, and tell it to replay the Kafka topic from the very beginning.

### The failure

- Kafka retention is 7 days, so you can't rebuild a 1-year materialized view. The Kappa Architecture completely breaks if your Kafka cluster is configured to delete old data. Many companies set their Kafka retention to 7 days to save disk space. If you try to do a Kappa replay to rebuild your `Total Lifetime Revenue` table, you will only get the revenue from the last 7 days. For Kappa to work, you must set your Kafka retention to `infinite`, which introduces a massive storage cost problem
