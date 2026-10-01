## Glossary: C

| Term | Means | In |
|---|---|---|
| **chunked prefill** | Slicing a long prompt's prefill into token-budgeted chunks interleaved with ongoing decode steps, so a big prompt does not stall other users | B6 |
| **Chunking** | splitting a long document into smaller pieces before embedding them for retrieval | B3 |
| **circuit breaker** | A reliability pattern that stops calling a failing dependency and fails fast to a fallback, probing periodically for recovery | B6 |
| **Claude Agent SDK** | Anthropic's batteries-included runtime (behind Claude Code) with loop, MCP, skills, subagents, permission modes, and context management | B5 |
| **client (MCP)** | Connector inside a host, one per server, that speaks the MCP protocol | B5 |
| **CLIP** | a model mapping images and text into one shared space, enabling zero-shot recognition | B2 |
| **CLIP (Contrastive Language-Image Pre-training)** | Trains an image encoder and a text encoder into one shared space so matching image-text pairs are close; enables zero-shot classification | B5 |
| **Clustering** | grouping unlabelled data by similarity | B1 |
| **CNN (convolutional neural network)** | a network built from convolutions, suited to grid data like images | B2 |
| **codebook (visual)** | The fixed set of learned discrete entries a VQ tokenizer snaps each image patch to, turning an image into integer token IDs | B5 |
| **code interpreter** | A tool that lets an agent write and run code in a sandbox; one general tool covering a huge task space | B5 |
| **coding agent** | An agent that edits code and runs commands; comes as terminal/CLI, IDE-integrated, or cloud/async shapes | B5 |
