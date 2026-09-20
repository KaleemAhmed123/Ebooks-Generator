## The cost envelope

- Rough cloud prices (2026, order-of-magnitude)

| Resource | Cost | Unit |
|---|---|---|
| CPU | ~$15/mo | per vCPU |
| Memory | ~$2/mo | per GiB |
| Blob storage (S3-class) | ~$0.02/mo | per GiB |
| Zonal SSD | ~$0.20/mo | per GiB |
| Cross-zone / cross-region | ~$0.01–0.02 | per GiB |
| Internet egress | ~$0.10 | per GiB |
| CDN egress | ~$0.05 | per GiB |
| Logs ingestion | ~$0.50 | per GiB |

- The point is the ratios: blob is 100× cheaper than SSD; egress costs more than storage; logs at $0.50/GiB add up fast

### The failure

- Egress bill larger than compute. Streaming video without a CDN at $0.10/GiB. A CDN at $0.05/GiB halves the cost. The cost envelope catches this before launch

:::interview
"What would this cost?" — name CPU, storage, egress. Multiply with these numbers. The interviewer wants the order of magnitude.
:::

