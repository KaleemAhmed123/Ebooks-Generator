## Glossary: D

| Term | Means | In |
|---|---|---|
| **Darwin-Gödel Machine (DGM)** | Agent that rewrites its own code and keeps an archive of improved versions, tested empirically | B5 |
| **Data augmentation** | creating new training examples by label-preserving transforms of existing data | B2 |
| **Data leakage** | letting test information reach training, inflating scores | B1 |
| **DataLoader** | the PyTorch utility that feeds a model shuffled, batched data | B2 |
| **data parallelism (DP)** | Running full model replicas in parallel for throughput; the horizontal scale-out axis of distributed inference and training | B6 |
| **data poisoning** | Planting malicious data (e.g. backdoor triggers) in a training set so the resulting model misbehaves on a chosen trigger | B6 |
| **data provenance** | Tracking where training data came from, its licence and consent, and its path into a model, for security, legal, privacy, and validity reasons | B6 |
| **Data / tensor / pipeline parallel** | three ways to split training across GPUs: copy the model and split the batch; split one layer's matrices; put different layers on different GPUs | B4 |
| **DBSCAN** | clustering that grows groups from dense regions and marks sparse points as noise | B1 |
| **DDP (Distributed Data Parallel)** | Data parallelism that replicates the whole model per GPU and all-reduces gradients each step; scales throughput when the model fits one GPU | B6 |
| **deadlock** | Coordination failure where each agent waits for another, so none proceeds | B5 |
| **debate (multi-agent)** | Agents arguing opposing positions over rounds, with a judge deciding; improves accuracy and enables scalable oversight | B5 |
