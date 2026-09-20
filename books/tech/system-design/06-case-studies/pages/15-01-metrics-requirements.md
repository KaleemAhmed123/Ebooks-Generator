# Metrics Pipeline

### Requirements and numbers

- A metrics pipeline (Prometheus, Datadog) ingests massive amounts of operational data
- **In scope:** Data ingestion, storage, querying, alerting
- **Out of scope:** The UI dashboard rendering engine

| Metric | Requirement |
|---|---|
| **Volume** | 10M time series, scraped every 10 seconds |
| **Write/Read** | Write-heavy (99%), but reads must be fast |
| **Retention** | Hot data for 7 days, cold data for 1 year |

- **The core constraint:** 10M metrics updated every 10 seconds is 1 million writes per second. You cannot store 1 million writes per second in a standard database for a year. You must aggressively compress and downsample the data over time

### The failure

- Sizing storage based on raw ingestion rates without calculating downsampling. If you keep 10-second resolution data for a year, your storage costs will bankrupt the company.

:::interview
You design a metrics system for 10 million servers. You calculate it requires 500 PB of storage per year. The interviewer says this is unaffordable. How do you fix it?

You must implement downsampling. You keep 10-second resolution for 7 days, then roll it up into 1-minute averages for 30 days, and 1-hour averages for a year, drastically reducing the storage requirement.
:::\n