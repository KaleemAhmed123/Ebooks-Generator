## Batch vs Stream processing

- In data engineering, there are two fundamental ways to process data. 
- **Batch Processing** deals with *bounded* data. You know exactly where the data starts and ends. You run a massive Spark job at 2:00 AM over yesterday's logs, and when the job finishes, it turns off. 
- **Stream Processing** deals with *unbounded* data. The data never ends. The processor runs 24/7, ingesting events as they arrive, and continuously updating a result.

| | Batch Processing | Stream Processing |
|---|---|---|
| **Data Scope** | Bounded (a file, a day's worth of data). | Unbounded (an infinite stream). |
| **Latency** | Hours or days (runs on a schedule). | Milliseconds or seconds. |
| **Cost Profile** | Spiky. High CPU usage for 1 hour, then zero. | Flat. Continuous moderate CPU usage 24/7. |
| **Tools** | Hadoop, Spark, BigQuery, Snowflake. | Apache Flink, Kafka Streams, ksqlDB. |

- Stream processing is required when you need real-time answers: fraud detection, dynamic pricing, or live operational dashboards.

### The failure

- Running a batch job every 5 minutes to simulate streaming. A team needs a "real-time" dashboard of total sales. They don't know Flink, so they write a cron job that runs `SELECT SUM(amount)` on their Postgres database every 5 minutes. As the database grows to 100 million rows, the query takes 6 minutes to run. The cron jobs overlap, the database CPU hits 100%, and the primary application crashes. You cannot achieve real-time streaming by running expensive batch queries on a tight loop
