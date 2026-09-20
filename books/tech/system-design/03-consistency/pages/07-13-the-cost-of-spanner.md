## The cost of Spanner

- Spanner gave Figma exactly what they wanted: the scale of a sharded NoSQL database, with the transactional consistency of a single Postgres instance. But it came with massive trade-offs

| | Postgres | Google Cloud Spanner |
|---|---|---|
| **Cost** | Cheap. Runs on standard VMs. | Extremely expensive. Requires specialized Google hardware. |
| **Vendor Lock-in** | None. Open source. | Total. You cannot move off GCP without rewriting your data layer. |
| **Schema Design** | Standard SQL normalization. | Requires deep expertise in "Interleaving" (forcing related tables onto the same physical shard to avoid slow Paxos network calls). |
| **Local Testing** | Spin up a Docker container in 1 second. | Requires a specialized emulator that behaves differently than production. |

- Figma chose Spanner because their workload is incredibly unique and valuable enough to justify the price. The vast majority of companies do not have Figma's problems

### The failure

- Using Spanner for a generic web app. If you are building a standard B2B SaaS application (where each tenant only touches their own data), you do not need cross-shard linearizable transactions. If you choose Spanner, you are paying a massive premium for a feature your domain logic doesn't even use. A standard sharded Postgres cluster (or even a single beefy Postgres instance) is almost always a better choice
