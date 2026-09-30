# AI Engineering: From Scratch

## Production Infrastructure

Deploying an LLM is unlike deploying a standard microservice. Requests take seconds, connections drop, and GPUs are vastly more expensive than CPUs. 

### AI Gateways

Never expose an LLM API (OpenAI or self-hosted) directly to a client frontend. Route traffic through an **AI Gateway** (like LiteLLM or Cloudflare AI Gateway).
- **Fallbacks:** If Azure OpenAI goes down, the gateway instantly routes to AWS Anthropic.
- **Cost Tracking:** The gateway logs exactly how many tokens User A and User B consumed.
- **Rate Limiting:** Protects against abuse and malicious DDOS loops.

### Semantic Caching

If 1,000 users ask "What is your refund policy?", generating the answer 1,000 times wastes money. A Semantic Cache embeds the user's query and checks the Vector DB. If someone asked a semantically identical question recently, it returns the cached answer instantly, bypassing the LLM entirely.

### Load Balancing

LLM load balancing cannot be simple Round Robin. Because a 100-token prompt and a 10,000-token prompt require vastly different compute times, requests must be routed based on the active KV Cache utilization of the target GPU nodes (Least Outstanding Tokens routing).
