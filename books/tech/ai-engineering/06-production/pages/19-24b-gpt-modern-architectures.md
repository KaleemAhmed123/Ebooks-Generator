## GPT from scratch: to the modern frontier

- The GPT you built (Flagship 1) is GPT-2's architecture. The frontier is the *same block* (19-21) with a handful of upgrades — knowing them connects your from-scratch model to a 2026 model card. **[VERIFY]**

| Upgrade | Changes | Why |
|---|---|---|
| **GQA/MQA** (19-20a) | fewer KV heads | shrink KV cache → cheaper serving |
| **RoPE** | rotary position, not learned table | better long-context extension |
| **RMSNorm** | simpler normalization | slightly faster, stable |
| **SwiGLU** | gated MLP activation | better quality per parameter |
| **MoE** (Booklet 3) | many expert FFNs, route top-k | more params, flat per-token compute |
| **longer context** | 128k–1M+ tokens | via RoPE scaling, efficient attention |

- **None change the core.** It's still embeddings → stacked (attention + MLP) blocks with residuals → output projection — the model you assembled. The upgrades tune *efficiency* (GQA, RMSNorm, MoE) and *capability* (RoPE for context, SwiGLU for quality), each a localized edit to the block, not a new paradigm.
- **MoE is the biggest structural change** (Booklet 3): replace the single MLP with many expert MLPs and a router that fires the top-k per token — so total parameters grow (more knowledge) while per-token compute stays flat (the active parameters). It's why frontier models advertise "total vs active" parameters, and it's a swap of the MLP in your block for a routed bank of MLPs.

:::note
The reassuring truth this reveals: a 2026 frontier model is not architecturally alien to the GPT you built — it's the same transformer with efficiency and context upgrades and (usually) MoE, scaled far bigger and trained far longer. When you read a model card ("64 layers, GQA with 8 KV heads, RoPE, SwiGLU, MoE 8×22B with 2 active"), every term now maps to a tensor or a small modification of the mechanism in Flagship 1. That's the payoff of building from scratch: the frontier stops being a black box and becomes a *configuration* of parts you understand — which is exactly the intuition that lets you reason about any model's memory, cost, and behavior from first principles.
:::
