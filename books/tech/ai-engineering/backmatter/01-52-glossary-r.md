## Glossary: R

| Term | Means | In |
|---|---|---|
| **readiness probe** | A health check that reports a pod as servable only after the model is loaded and a test generation succeeds, gating traffic routing | B6 |
| **reasoning model** | A model that emits a long hidden reasoning trace before its answer, inflating output-token cost and latency far beyond the visible reply | B6 |
| **Recall** | of the truly positive cases, the fraction the model caught | B1 |
| **Receptive field** | how much of the input one output value can see | B2 |
| **reciprocal rank fusion (RRF)** | Merging multiple rankings by summing 1/(k+rank) per document, robustly combining dense and sparse retrieval without score calibration | B6 |
| **Rectified flow** | training a generator to follow near-straight noise-to-data paths, needing fewer steps | B2 |
| **recursive self-improvement (RSI)** | An agent improving its own ability to improve, potentially uncapped; theoretical, not demonstrated | B5 |
| **red-teaming** | Adversarially attacking a model or agent to find the ceiling of harm before an attacker does | B5 · B6 |
| **reducer (LangGraph)** | A function defining how a node's returned update merges into state (e.g. add_messages appends) | B5 |
| **reflection** | Distilling raw observations into higher-level insights; core to generative agents and long-term memory | B5 |
| **Reflexion** | Learning from failure in words: after a failed attempt the model writes a self-reflection the retry reads | B5 |
| **registry (MCP)** | A catalogue of MCP servers with metadata and versions; a discovery and supply-chain layer | B5 |
